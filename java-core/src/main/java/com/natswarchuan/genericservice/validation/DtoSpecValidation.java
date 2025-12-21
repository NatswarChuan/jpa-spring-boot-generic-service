package com.natswarchuan.genericservice.validation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * Annotation validation ở mức class (Type Level).
 * <p>
 * Yêu cầu class được assign phải implement
 * {@link com.natswarchuan.genericservice.dto.IDto}.
 * Validator sẽ tự động lấy class Entity từ generic của IDto để thực hiện query.
 */
@Documented
@Constraint(validatedBy = DtoSpecValidationValidator.class)
@Target({ ElementType.TYPE })
@Retention(RetentionPolicy.RUNTIME)
public @interface DtoSpecValidation {

  String message() default "Dữ liệu không hợp lệ";

  Class<?>[] groups() default {};

  Class<? extends Payload>[] payload() default {};

  /**
   * Class implement SpecificationLoader để tạo query từ DTO.
   */
  Class<? extends SpecificationLoader<?, ?>> loader();

  /**
   * true: bắt buộc phải tồn tại bản ghi match với spec (Count > 0).
   * false: bắt buộc KHÔNG tồn tại bản ghi (Count == 0), thường dùng check unique.
   */
  boolean mustExist() default true;
}
