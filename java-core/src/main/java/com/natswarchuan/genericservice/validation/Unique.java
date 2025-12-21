package com.natswarchuan.genericservice.validation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * Annotation để đảm bảo giá trị của field là duy nhất trong Database.
 * 
 * <p>
 * Ví dụ:
 * 
 * <pre>
 * {@code
 * @Unique(entity = User.class, field = "email", message = "Email đã tồn tại")
 * private String email;
 * }
 * </pre>
 *
 * @author NatswarChuan
 */
@Documented
@Constraint(validatedBy = UniqueValidator.class)
@Target({ ElementType.FIELD, ElementType.PARAMETER })
@Retention(RetentionPolicy.RUNTIME)
public @interface Unique {

  /**
   * Entity Class cần kiểm tra (ví dụ: User.class).
   *
   * @return Class của Entity.
   */
  Class<?> entity();

  /**
   * Tên field trong Entity cần kiểm tra (ví dụ: "email", "phoneNumber").
   *
   * @return Tên field.
   */
  String field();

  /**
   * Thông báo lỗi mặc định.
   *
   * @return Thông báo lỗi.
   */
  String message() default "Giá trị đã tồn tại trong hệ thống";

  /**
   * Nhóm các ràng buộc (groups).
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
