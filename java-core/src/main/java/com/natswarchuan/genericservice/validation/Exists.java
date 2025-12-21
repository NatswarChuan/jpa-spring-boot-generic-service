package com.natswarchuan.genericservice.validation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * Annotation đảm bảo giá trị tham chiếu phải TỒN TẠI trong Database.
 * Thường dùng cho khóa ngoại (Category ID, Role ID...).
 *
 * <pre>
 * {@code
 * @Exists(entity = Category.class, field = "id", message = "Category không tồn tại")
 * private Long categoryId;
 * }
 * </pre>
 *
 * @author NatswarChuan
 */
@Documented
@Constraint(validatedBy = ExistsValidator.class)
@Target({ ElementType.FIELD, ElementType.PARAMETER })
@Retention(RetentionPolicy.RUNTIME)
public @interface Exists {

  /**
   * Class Entity cần kiểm tra tồn tại.
   *
   * @return Class của Entity (ví dụ: User.class).
   */
  Class<?> entity();

  /**
   * Tên trường trong Entity dùng để truy vấn (thường là "id").
   *
   * @return Tên trường (mặc định là "id").
   */
  String field() default "id";

  /**
   * Thông báo lỗi nếu giá trị không tồn tại.
   *
   * @return Chuỗi thông báo lỗi.
   */
  String message() default "Dữ liệu không tồn tại trong hệ thống";

  /**
   * Nhóm validation.
   *
   * @return Mảng các class nhóm.
   */
  Class<?>[] groups() default {};

  /**
   * Payload bổ sung.
   *
   * @return Mảng các class payload.
   */
  Class<? extends Payload>[] payload() default {};
}
