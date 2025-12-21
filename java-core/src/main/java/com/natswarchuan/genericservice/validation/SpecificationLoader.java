package com.natswarchuan.genericservice.validation;

import org.springframework.data.jpa.domain.Specification;

/**
 * Functional Interface để tạo ra Specification từ giá trị cần validate.
 * User cần implement class này (có thể là Spring Bean) để truyền vào
 * annotation @SpecValidation.
 *
 * @param <T> Kiểu dữ liệu của value cần validate.
 * @param <E> Kiểu Entity.
 */
@FunctionalInterface
public interface SpecificationLoader<T, E> {

  /**
   * Tạo Specification dựa trên giá trị input.
   *
   * @param value Dynamic variable (or Array) Giá trị đang được validate.
   * @return Specification tương ứng.
   */
  @SuppressWarnings("unchecked")
  Specification<E> getSpecification(T... value);
}
