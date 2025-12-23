package com.natswarchuan.genericservice.validation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * Annotation cho phép kiểm tra tính hợp lệ bằng câu lệnh SQL native.
 *
 * <p>
 * Lưu ý: Việc sử dụng native SQL có thể ảnh hưởng đến khả năng portability của
 * ứng dụng (ví dụ
 * chuyển từ MySQL sang PostgreSQL).
 *
 * <p>
 * Ví dụ: Kiểm tra không trùng lặp tên trong bảng users trừ bản ghi hiện tại:
 *
 * <pre>{@code
 * @SqlConstraint(sql = "SELECT count(*) FROM users WHERE username = :value AND id != :currentId", dependencies = {
 *     "currentId:path/id" }, message = "Username đã tồn tại")
 * private String username;
 * }</pre>
 *
 * <p>
 * Lưu ý: Tham số {@code :value} sẽ được tự động bind với giá trị của field được
 * validate.
 *
 * @author NatswarChuan
 */
@Documented
@Constraint(validatedBy = SqlConstraintValidator.class)
@Target({ ElementType.FIELD, ElementType.PARAMETER, ElementType.TYPE })
@Retention(RetentionPolicy.RUNTIME)
public @interface SqlConstraint {

  /**
   * Câu lệnh SQL native để kiểm tra.
   *
   * <p>
   * Truy vấn phải trả về một kết quả đơn lẻ (single result), thường là count hoặc
   * boolean.
   *
   * <p>
   * Binding tham số:
   * <ul>
   * <li>{@code :value} -> Giá trị của field hiện tại (nếu validate field).</li>
   * <li>{@code :paramName} -> Giá trị được định nghĩa trong
   * {@link #dependencies()}.</li>
   * </ul>
   *
   * @return Câu lệnh SQL.
   */
  String sql();

  /**
   * Tên tham số dùng trong câu SQL để bind giá trị cần validate. Mặc định là
   * "value".
   *
   * @return Tên tham số bind.
   */
  String valueParam() default "value";

  /**
   * Định nghĩa các nguồn dữ liệu phụ thuộc cần bind vào câu SQL.
   *
   * <p>
   * Format: {@code "sqlParamName:sourceType/sourceKey"}
   *
   * <p>
   * Các loại source:
   * <ul>
   * <li><b>path</b>: Lấy từ PathVariable. Ví dụ: {@code "userId:path/id"} -> bind
   * giá trị của
   * path variable 'id' vào tham số {@code :userId}</li>
   * <li><b>param</b>: Lấy từ RequestParam. Ví dụ: {@code "status:param/status"}
   * -> bind giá trị
   * của request param 'status' vào {@code :status}</li>
   * <li><b>header</b>: Lấy từ Header. Ví dụ: {@code "tenant:header/X-Tenant-ID"}
   * -> bind header
   * vào {@code :tenant}</li>
   * <li><b>field</b>: Lấy từ field của object được validate (khi validate ở mức
   * Class). Ví dụ: {@code "modelId:field/modelId"} -> bind giá trị của field
   * modelId vào {@code :modelId}</li>
   * </ul>
   *
   * <p>
   * Ví dụ đầy đủ: {@code dependencies = {"currentId:path/id", "type:param/type"}}
   *
   * @return Mảng các định nghĩa dependency.
   */
  String[] dependencies() default {};

  /**
   * Thông báo lỗi.
   *
   * @return Chuỗi thông báo lỗi.
   */
  String message() default "Dữ liệu không thỏa mãn ràng buộc dữ liệu";

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
