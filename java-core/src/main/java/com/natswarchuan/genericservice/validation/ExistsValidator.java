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

/**
 * Validator cho {@link Exists}. Logic ngược lại với {@link Unique}.
 *
 * @author NatswarChuan
 */
@Component
public class ExistsValidator implements ConstraintValidator<Exists, Object> {

  @PersistenceContext
  private EntityManager entityManager;

  private Class<?> entityClass;
  private String fieldName;

  @Override
  public void initialize(Exists annotation) {
    this.entityClass = annotation.entity();
    this.fieldName = annotation.field();
  }

  @Override
  @Transactional(readOnly = true)
  public boolean isValid(Object value, ConstraintValidatorContext context) {
    if (value == null)
      return true;

    CriteriaBuilder cb = entityManager.getCriteriaBuilder();
    CriteriaQuery<Long> query = cb.createQuery(Long.class);
    Root<?> root = query.from(entityClass);

    query.select(cb.count(root));
    query.where(cb.equal(root.get(fieldName), value));

    try {
      Long count = entityManager.createQuery(query).getSingleResult();
      return count > 0;
    } catch (Exception e) {
      return false;
    }
  }
}
