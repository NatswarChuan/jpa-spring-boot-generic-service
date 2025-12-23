package com.natswarchuan.genericservice.validation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * Annotation validation tùy chỉnh cho phép sử dụng
 * {@link org.springframework.data.jpa.domain.Specification}
 * để kiểm tra tính hợp lệ của dữ liệu phức tạp.
 *
 * <p>
 * Khác với các annotation đơn giản (như {@code @NotNull}, {@code @Size}),
 * annotation này cho phép
 * thực hiện truy vấn database với logic tùy biến để xác định tính hợp lệ.
 *
 * <p>
 * Ví dụ: Kiểm tra User phải thuộc 1 bộ phận cụ thể và active = true.
 *
 * <pre>{@code
 * @SpecValidation(entity = User.class, loader = ActiveUserInDeptSpecLoader.class, message = "User không hợp lệ hoặc không có quyền")
 * private Long userId;
 * }</pre>
 *
 * @author NatswarChuan
 */
@Documented
@Constraint(validatedBy = SpecValidationValidator.class)
@Target({ ElementType.FIELD, ElementType.PARAMETER })
@Retention(RetentionPolicy.RUNTIME)
public @interface SpecValidation {

  /**
   * Class Entity JPA sẽ được sử dụng trong truy vấn.
   *
   * @return Class của Entity.
   */
  Class<?> entity();

  /**
   * Class triển khai interface {@link SpecificationLoader} để cung cấp logic tạo
   * Specification.
   *
   * <p>
   * Nếu class này được định nghĩa là một Spring Bean, nó sẽ được inject tự động.
   * Nếu không, nó
   * sẽ được khởi tạo bằng constructor mặc định.
   *
   * @return Class của loader.
   */
  Class<? extends SpecificationLoader<?, ?>> loader();

  /**
   * Quy định kết quả mong muốn của truy vấn đếm (count).
   *
   * <ul>
   * <li>{@code true}: Yêu cầu dữ liệu PHẢI tồn tại (Count > 0). Thường dùng để
   * kiểm tra khóa
   * ngoại hợp lệ.
   * <li>{@code false}: Yêu cầu dữ liệu KHÔNG ĐƯỢC tồn tại (Count == 0). Thường
   * dùng để kiểm tra
   * tính duy nhất (unique).
   * </ul>
   *
   * @return {@code true} nếu yêu cầu tồn tại, ngược lại {@code false}. Mặc định
   *         là {@code true}.
   */
  boolean mustExist() default true;

  /**
   * Thông điệp lỗi trả về khi validation thất bại.
   *
   * @return Chuỗi thông báo lỗi.
   */
  String message() default "Dữ liệu không thỏa mãn điều kiện phức tạp";

  /**
   * Nhóm các ràng buộc validation.
   *
   * @return Mảng các class nhóm.
   */
  Class<?>[] groups() default {};

  /**
   * Payload bổ sung cho validation.
   *
   * @return Mảng các class payload.
   */
  Class<? extends Payload>[] payload() default {};
}
