package com.natswarchuan.genericservice.validation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * Annotation dùng để xác thực giá trị của trường hoặc tham số phải nằm trong
 * tập hợp các hằng số
 * của một Enum cụ thể.
 *
 * <p>
 * Hữu ích khi bạn nhận dữ liệu dưới dạng String hoặc Integer nhưng muốn đảm bảo
 * nó map chính xác
 * vào một giá trị Enum trong hệ thống.
 *
 * <p>
 * Ví dụ sử dụng:
 *
 * <pre>{@code
 * @EnumValue(enumClass = Status.class, message = "Status không hợp lệ")
 * private String status;
 * }</pre>
 *
 * @author NatswarChuan
 */
@Documented
@Constraint(validatedBy = EnumValueValidator.class)
@Target({ ElementType.FIELD, ElementType.PARAMETER })
@Retention(RetentionPolicy.RUNTIME)
public @interface EnumValue {

  /**
   * Class Enum chứa các giá trị hợp lệ.
   *
   * @return Class của Enum.
   */
  Class<? extends Enum<?>> enumClass();

  /**
   * Thông báo lỗi hiển thị khi validation thất bại.
   *
   * @return Chuỗi thông báo lỗi.
   */
  String message() default "Giá trị không hợp lệ (không nằm trong danh sách Enum)";

  /**
   * Nhóm các ràng buộc validation (Groups).
   *
   * @return Mảng các class đại diện cho nhóm.
   */
  Class<?>[] groups() default {};

  /**
   * Payload bổ sung cho validation (thường dùng để gắn metadata).
   *
   * @return Mảng các class payload.
   */
  Class<? extends Payload>[] payload() default {};
}
