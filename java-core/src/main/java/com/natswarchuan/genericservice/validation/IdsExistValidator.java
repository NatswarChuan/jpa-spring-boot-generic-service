package com.natswarchuan.genericservice.validation;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Root;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import java.util.Collection;
import java.util.HashSet;
import java.util.Set;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

/**
 * Validator cho {@link IdsExist}.
 *
 * <p>Kiểm tra xem tất cả các ID trong danh sách/mảng có tồn tại trong database không.
 *
 * @author NatswarChuan
 */
@Slf4j
@Component
public class IdsExistValidator implements ConstraintValidator<IdsExist, Object> {

  @PersistenceContext private EntityManager entityManager;

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
      try {
        ids = java.util.Arrays.asList((Object[]) value);
      } catch (ClassCastException e) {
        return false;
      }
    } else {
      return true;
    }

    if (ids.isEmpty()) {
      return true;
    }

    Set<Object> uniqueIds = new HashSet<>();
    for (Object id : ids) {
      if (id != null) uniqueIds.add(id);
    }

    if (uniqueIds.isEmpty()) return true;

    CriteriaBuilder cb = entityManager.getCriteriaBuilder();
    CriteriaQuery<Long> query = cb.createQuery(Long.class);
    Root<?> root = query.from(entityClass);

    query.select(cb.count(root));
    query.where(root.get(fieldName).in(uniqueIds));

    try {
      Long count = entityManager.createQuery(query).getSingleResult();
      return count == uniqueIds.size();
    } catch (Exception e) {
      log.error(
          "Error validating IDs existence for entity: {}. IDs: {}. Error: {}",
          entityClass.getSimpleName(),
          uniqueIds,
          e.getMessage(),
          e);
      return false;
    }
  }
}
