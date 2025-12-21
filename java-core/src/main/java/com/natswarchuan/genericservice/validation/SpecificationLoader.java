package com.natswarchuan.genericservice.validation;

import org.springframework.data.jpa.domain.Specification;

/**
 * Functional Interface để tạo ra {@link Specification} từ giá trị cần validate.
 * <p>
 * Người dùng cần implement interface này (thường là một Spring Bean) để truyền
 * vào
 * annotation {@code @SpecValidation}.
 *
 * @param <T> Kiểu dữ liệu của giá trị cần validate.
 * @param <E> Kiểu Entity tương ứng.
 * @author NatswarChuan
 */
@FunctionalInterface
public interface SpecificationLoader<T, E> {

  /**
   * Tạo {@link Specification} dựa trên giá trị input.
   *
   * @param value Giá trị (hoặc mảng giá trị) đang được validate.
   * @return {@link Specification} tương ứng để query database.
   */
  @SuppressWarnings("unchecked")
  Specification<E> getSpecification(T... value);
}
