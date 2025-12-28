package com.natswarchuan.genericservice.validation;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import com.natswarchuan.genericservice.exception.HttpException;
import org.springframework.http.HttpStatus;

/**
 * Lớp Validator cho annotation {@link SpecValidation}.
 *
 * <p>
 * Thực hiện kiểm tra tính hợp lệ của một giá trị đơn lẻ (field hoặc parameter)
 * bằng cách sử dụng
 * {@link SpecificationLoader} để tạo ra truy vấn JPA Specification.
 *
 * <p>
 * Validator này thích hợp để kiểm tra các điều kiện phức tạp liên quan đến cơ
 * sở dữ liệu mà các
 * annotation validation đơn giản không đáp ứng được (ví dụ: kiểm tra sự tồn tại
 * có điều kiện, kiểm
 * tra quan hệ...).
 *
 * @author NatswarChuan
 */
@Slf4j
@Component
public class SpecValidationValidator implements ConstraintValidator<SpecValidation, Object> {

  @PersistenceContext
  private EntityManager entityManager;

  @Autowired
  private ApplicationContext applicationContext;

  private Class<?> entityClass;
  private Class<? extends SpecificationLoader<?, ?>> loaderClass;
  private boolean mustExist;

  /**
   * Khởi tạo các giá trị cấu hình từ annotation.
   *
   * @param annotation Annotation {@link SpecValidation} chứa thông tin cấu hình.
   */
  @Override
  public void initialize(SpecValidation annotation) {
    this.entityClass = annotation.entity();
    this.loaderClass = annotation.loader();
    this.mustExist = annotation.mustExist();
  }

  /**
   * Kiểm tra tính hợp lệ của giá trị.
   *
   * @param value   Giá trị cần kiểm tra.
   * @param context Context validation.
   * @return {@code true} nếu hợp lệ (hoặc null), {@code false} nếu không hợp lệ
   *         hoặc có lỗi.
   */
  @Override
  @Transactional(readOnly = true)
  @SuppressWarnings({ "unchecked" })
  public boolean isValid(Object value, ConstraintValidatorContext context) {
    if (value == null) {
      return true;
    }

    try {

      SpecificationLoader<?, ?> loader = getLoaderInstance();

      Specification<?> spec = ((SpecificationLoader<Object, ?>) loader).getSpecification(value);
      if (spec == null) {
        return true;
      }

      CriteriaBuilder cb = entityManager.getCriteriaBuilder();
      CriteriaQuery<Long> query = cb.createQuery(Long.class);
      Root<Object> root = (Root<Object>) query.from(entityClass);
      if (root == null) {
        throw new HttpException(HttpStatus.INTERNAL_SERVER_ERROR,
            "Không thể tạo Root từ Entity: " + entityClass.getName());
      }
      Predicate predicate = ((Specification<Object>) spec).toPredicate(root, query, cb);

      if (predicate != null) {
        query.where(predicate);
      }

      query.select(cb.count(root));

      Long count = entityManager.createQuery(query).getSingleResult();

      if (mustExist) {
        return count > 0;
      } else {
        return count == 0;
      }

    } catch (Exception e) {
      if (e instanceof HttpException) {
        throw (HttpException) e;
      }
      log.error("Error executing SpecValidation for entity: {}, loader: {}, value: {}. Error: {}",
          entityClass.getSimpleName(), loaderClass.getSimpleName(), value, e.getMessage(), e);
      return false;
    }
  }

  /**
   * Lấy instance của {@link SpecificationLoader}, ưu tiên từ Spring Context.
   *
   * @return Instance hợp lệ của SpecificationLoader.
   * @throws RuntimeException Nếu không thể khởi tạo instance.
   */
  private SpecificationLoader<?, ?> getLoaderInstance() {
    Class<? extends SpecificationLoader<?, ?>> currentLoaderClass = this.loaderClass;
    if (currentLoaderClass == null) {
      throw new HttpException(HttpStatus.INTERNAL_SERVER_ERROR,
          "Không thể khởi tạo SpecificationLoader: loaderClass is null");
    }
    try {
      return applicationContext.getBean(currentLoaderClass);
    } catch (Exception e) {
      try {
        return loaderClass.getDeclaredConstructor().newInstance();
      } catch (Exception ex) {
        throw new HttpException(HttpStatus.INTERNAL_SERVER_ERROR, ex,
            "Không thể khởi tạo SpecificationLoader: " + loaderClass.getName());
      }
    }
  }
}
