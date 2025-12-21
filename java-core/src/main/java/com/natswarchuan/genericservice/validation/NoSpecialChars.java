package com.natswarchuan.genericservice.validation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * Annotation để đảm bảo chuỗi không chứa ký tự đặc biệt.
 *
 * <p>
 * Chỉ cho phép chữ cái (a-z, A-Z), chữ số (0-9) và khoảng trắng.
 *
 * @author NatswarChuan
 */
@Documented
@Constraint(validatedBy = NoSpecialCharsValidator.class)
@Target({ ElementType.FIELD, ElementType.PARAMETER })
@Retention(RetentionPolicy.RUNTIME)
public @interface NoSpecialChars {

  /**
   * Thông báo lỗi mặc định.
   *
   * @return Thông báo lỗi.
   */
  String message() default "Không được chứa ký tự đặc biệt";

  /**
   * Nhóm các ràng buộc.
   *
   * @return Mảng các class group.
   */
  Class<?>[] groups() default {};

  /**
   * Payload bổ sung.
   *
   * @return Mảng các class payload.
   */
  Class<? extends Payload>[] payload() default {};
}
