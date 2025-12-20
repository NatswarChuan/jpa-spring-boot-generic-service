package com.natswarchuan.genericservice.validation;

import com.natswarchuan.genericservice.IDto;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import java.lang.reflect.Field;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.core.ResolvableType;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

/**
 * Lớp Validator cho annotation {@link DtoSpecValidation}.
 *
 * <p>
 * Thực hiện kiểm tra tính hợp lệ của một đối tượng DTO dựa trên các quy tắc
 * được định nghĩa bởi một
 * {@link SpecificationLoader}.
 *
 * <p>
 * Validator này sử dụng reflection để lấy giá trị của tất cả các trường trong
 * DTO, sau đó chuyển
 * chúng vào {@code SpecificationLoader} để tạo ra một {@link Specification}
 * JPA. Cuối cùng, nó thực
 * hiện truy vấn đếm (count) trên database để xác định tính hợp lệ.
 *
 * @author NatswarChuan
 */
@Component
public class DtoSpecValidationValidator
    implements ConstraintValidator<DtoSpecValidation, Object> {

  @PersistenceContext
  private EntityManager entityManager;

  /** Context ứng dụng Spring để lấy bean (nếu Loader là bean). */
  @Autowired
  private ApplicationContext applicationContext;

  /** Lớp loader được chỉ định trong annotation để tạo Specification. */
  private Class<? extends SpecificationLoader<?, ?>> loaderClass;

  /**
   * Cờ xác định logic validation: - true: Dữ liệu PHẢI tồn tại (count > 0). -
   * false: Dữ liệu KHÔNG
   * ĐƯỢC tồn tại (count == 0).
   */
  private boolean mustExist;

  /**
   * Khởi tạo validator từ annotation.
   *
   * @param annotation Annotation {@link DtoSpecValidation} chứa cấu hình.
   */
  @Override
  public void initialize(DtoSpecValidation annotation) {
    this.loaderClass = annotation.loader();
    this.mustExist = annotation.mustExist();
  }

  /**
   * Thực hiện validation chính.
   *
   * @param value   Đối tượng DTO cần validate.
   * @param context Context của quá trình validation.
   * @return {@code true} nếu hợp lệ, {@code false} nếu không hợp lệ hoặc có lỗi.
   */
  @Override
  @Transactional(readOnly = true)
  @SuppressWarnings("unchecked")
  public boolean isValid(Object value, ConstraintValidatorContext context) {
    if (value == null) {
      return true;
    }

    if (!(value instanceof IDto)) {
      throw new IllegalArgumentException(
          "Object validated by @DtoSpecValidation must implement IDto interface. Type: "
              + value.getClass().getName());
    }

    try {

      Class<?> entityClass = ResolvableType.forClass(value.getClass()).as(IDto.class).getGeneric(0).resolve();

      if (entityClass == null) {
        throw new IllegalArgumentException(
            "Could not resolve generic Entity type from IDto for class: "
                + value.getClass().getName());
      }

      SpecificationLoader<Object, Object> loader = (SpecificationLoader<Object, Object>) getLoaderInstance();

      Field[] fields = value.getClass().getDeclaredFields();
      Object[] params = new Object[fields.length];
      for (int i = 0; i < fields.length; i++) {
        fields[i].setAccessible(true);
        params[i] = fields[i].get(value);
      }

      Specification<Object> spec = (Specification<Object>) loader.getSpecification(params);
      if (spec == null) {
        return true;
      }

      CriteriaBuilder cb = entityManager.getCriteriaBuilder();
      CriteriaQuery<Long> query = cb.createQuery(Long.class);
      Root<Object> root = (Root<Object>) query.from(entityClass);

      Predicate predicate = spec.toPredicate(root, query, cb);

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
      if (e instanceof IllegalArgumentException) {
        throw (IllegalArgumentException) e;
      }
      e.printStackTrace();

      return false;
    }
  }

  /**
   * Lấy instance của {@link SpecificationLoader}.
   *
   * <p>
   * Ưu tiên lấy từ Spring ApplicationContext (nếu là Bean). Nếu không tìm thấy,
   * sẽ tạo instance mới
   * bằng constructor mặc định.
   *
   * @return Instance của SpecificationLoader.
   * @throws RuntimeException Nếu không thể khởi tạo instance.
   */
  private SpecificationLoader<?, ?> getLoaderInstance() {
    try {
      return applicationContext.getBean(loaderClass);
    } catch (Exception e) {
      try {
        return loaderClass.getDeclaredConstructor().newInstance();
      } catch (Exception ex) {
        throw new RuntimeException(
            "Cannot instantiate SpecificationLoader: " + loaderClass.getName(), ex);
      }
    }
  }
}
