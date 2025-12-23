package com.natswarchuan.genericservice.validation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * Annotation để xác thực số điện thoại hợp lệ (quốc tế).
 *
 * <p>Chấp nhận định dạng số điện thoại quốc tế:
 * <ul>
 *   <li>Có thể bắt đầu bằng dấu + (tùy chọn).</li>
 *   <li>Chứa từ 9 đến 15 chữ số.</li>
 *   <li>Ví dụ: +84912345678, 0912345678, 1234567890</li>
 * </ul>
 *
 * @author NatswarChuan
 */
@Documented
@Constraint(validatedBy = PhoneNumberValidator.class)
@Target({ ElementType.FIELD, ElementType.PARAMETER })
@Retention(RetentionPolicy.RUNTIME)
public @interface PhoneNumber {

  /**
   * Thông báo lỗi mặc định.
   *
   * @return Thông báo lỗi.
   */
  String message() default "Số điện thoại không hợp lệ (yêu cầu 9-15 chữ số)";

  /**
   * Nhóm các ràng buộc (groups).
   *
   * @return Mảng các class group.
   */
  Class<?>[] groups() default {};

  /**
   * Payload bổ sung cho client.
   *
   * @return Mảng các class payload.
   */
  Class<? extends Payload>[] payload() default {};
}
