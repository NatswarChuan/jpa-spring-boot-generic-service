package com.natswarchuan.genericservice.validation;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Root;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

/**
 * Validator cho {@link IdsExist}.
 *
 * <p>
 * Kiểm tra xem tất cả các ID trong danh sách/mảng có tồn tại trong database
 * không.
 *
 * @author NatswarChuan
 */
@Component
public class IdsExistValidator implements ConstraintValidator<IdsExist, Object> {

  @PersistenceContext
  private EntityManager entityManager;

  private Class<?> entityClass;
  private String fieldName;

  @Override
  public void initialize(IdsExist annotation) {
    this.entityClass = annotation.entity();
    this.fieldName = annotation.field();
  }

  @Override
  @Transactional(readOnly = true)
  public boolean isValid(Object value, ConstraintValidatorContext context) {
    if (value == null) {
      return true;
    }

    Collection<?> ids;
    if (value instanceof Collection) {
      ids = (Collection<?>) value;
    } else if (value.getClass().isArray()) {
      // Chuyển đổi mảng thành collection xử lý đơn giản nếu là mảng Object
      // Xử lý primitive arrays nếu cần, nhưng ở đây giả sử Object[] hoặc List/Set
      try {
        ids = java.util.Arrays.asList((Object[]) value);
      } catch (ClassCastException e) {
        // Fallback cho primitive arrays nếu cần thiết,
        // nhưng JPA ID thường là wrapper types (Long, Integer, String, UUID)
        return false;
      }
    } else {
      // Nếu không phải collection/array, coi như 1 phần tử (tương tự @Exists)
      // Nhưng @IdsExist chủ yếu dùng cho tập hợp.
      // Trả về true để tránh conflict với @Exists nếu user lỡ dùng sai type
      return true;
    }

    if (ids.isEmpty()) {
      return true;
    }

    // Loại bỏ duplicate và null trong input để đếm chính xác
    Set<Object> uniqueIds = new HashSet<>();
    for (Object id : ids) {
      if (id != null)
        uniqueIds.add(id);
    }

    if (uniqueIds.isEmpty())
      return true;

    CriteriaBuilder cb = entityManager.getCriteriaBuilder();
    CriteriaQuery<Long> query = cb.createQuery(Long.class);
    Root<?> root = query.from(entityClass);

    query.select(cb.count(root));
    query.where(root.get(fieldName).in(uniqueIds));

    try {
      Long count = entityManager.createQuery(query).getSingleResult();
      // Số lượng bản ghi tìm thấy phải bằng số lượng ID unique truyền vào
      return count == uniqueIds.size();
    } catch (Exception e) {
      e.printStackTrace();
      return false;
    }
  }
}
