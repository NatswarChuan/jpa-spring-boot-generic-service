package com.natswarchuan.genericservice.validation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import org.springframework.data.jpa.domain.Specification;

/**
 * Annotation validation ở mức class (Type Level) sử dụng {@link Specification}
 * để kiểm tra logic
 * phức tạp.
 *
 * <p>
 * Yêu cầu:
 * <ul>
 * <li>Class được gán annotation phải implement
 * {@link com.natswarchuan.genericservice.dto.IDto}.
 * <li>Cần cung cấp một implementation của {@link SpecificationLoader} để xác
 * định logic query.
 * </ul>
 *
 * @author NatswarChuan
 */
@Documented
@Constraint(validatedBy = DtoSpecValidationValidator.class)
@Target({ ElementType.TYPE })
@Retention(RetentionPolicy.RUNTIME)
public @interface DtoSpecValidation {

  /**
   * Thông báo lỗi mặc định nếu validation thất bại.
   *
   * @return Chuỗi thông báo lỗi.
   */
  String message() default "Dữ liệu không hợp lệ";

  /**
   * Nhóm validation (được sử dụng để phân nhóm các ràng buộc).
   *
   * @return Mảng các class nhóm.
   */
  Class<?>[] groups() default {};

  /**
   * Payload bổ sung (thường dùng để gắn metadata vào lỗi).
   *
   * @return Mảng các class payload.
   */
  Class<? extends Payload>[] payload() default {};

  /**
   * Class implement {@link SpecificationLoader} để tạo query từ DTO.
   *
   * <p>
   * Logic tạo {@link Specification} sẽ nằm ở đây.
   *
   * @return Class của loader.
   */
  Class<? extends SpecificationLoader<?, ?>> loader();

  /**
   * Xác định điều kiện hợp lệ dựa trên số lượng bản ghi tìm được.
   * <ul>
   * <li><b>true</b> (Mặc định): Bắt buộc phải TỒN TẠI bản ghi (count > 0).</li>
   * <li><b>false</b>: Bắt buộc KHÔNG ĐƯỢC tồn tại bản ghi (count == 0). Thường
   * dùng để check
   * trùng lặp (Unique).</li>
   * </ul>
   *
   * @return {@code true} nếu yêu cầu tồn tại, {@code false} nếu yêu cầu không tồn
   *         tại.
   */
  boolean mustExist() default true;
}