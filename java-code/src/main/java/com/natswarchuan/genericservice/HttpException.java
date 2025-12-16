package com.natswarchuan.genericservice;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;

/**
 * Lớp ngoại lệ tùy chỉnh đại diện cho các lỗi HTTP. Kế thừa từ {@link RuntimeException}, cho phép
 * ném ra mà không cần khai báo `throws`.
 *
 * @author NatswarChuan
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Slf4j
public class HttpException extends RuntimeException {
  private static final long serialVersionUID = 1L;

  /** Mã trạng thái HTTP. */
  private final HttpStatus status;

  /** Thông điệp lỗi chi tiết. */
  private final String message;

  /** Dữ liệu bổ sung đi kèm với ngoại lệ (tùy chọn). */
  private final Object data;

  /**
   * Khởi tạo một {@code HttpException} mới với trạng thái và thông điệp được chỉ định. Thông điệp
   * cũng được truyền cho superclass {@link RuntimeException}.
   *
   * @param status {@link HttpStatus} liên quan đến ngoại lệ này.
   * @param message Thông điệp chi tiết cho ngoại lệ này.
   */
  public HttpException(HttpStatus status, String message) {
    super(message);
    this.status = status;
    this.message = message;
    this.data = null;
  }

  /**
   * Khởi tạo một {@code HttpException} mới với trạng thái, thông điệp và dữ liệu được chỉ định.
   *
   * @param status {@link HttpStatus} liên quan đến ngoại lệ này.
   * @param message Thông điệp chi tiết cho ngoại lệ này.
   * @param data Dữ liệu bổ sung đi kèm với ngoại lệ.
   */
  public HttpException(HttpStatus status, String message, Object data) {
    super(message);
    this.status = status;
    this.message = message;
    this.data = data;
  }

  /**
   * Khởi tạo một {@code HttpException} mới với trạng thái được chỉ định và một thông điệp được định
   * dạng. Thông điệp được định dạng cũng được truyền cho superclass {@link RuntimeException}.
   *
   * @param status {@link HttpStatus} liên quan đến ngoại lệ này.
   * @param format Chuỗi định dạng cho thông điệp ngoại lệ (xem {@link String#format(String,
   *     Object...)}).
   * @param args Các đối số được tham chiếu bởi các chỉ định định dạng trong chuỗi định dạng.
   */
  public HttpException(HttpStatus status, String format, Object... args) {
    super(String.format(format, args));
    this.status = status;
    this.message = super.getMessage();
    this.data = null;
  }

  /**
   * Khởi tạo một {@code HttpException} mới từ một ngoại lệ gốc, với trạng thái và thông điệp được
   * định dạng.
   *
   * <p>Ngoại lệ gốc {@code e} được truyền vào superclass để bảo toàn chuỗi nguyên nhân (cause
   * chain), giúp cho việc gỡ lỗi.
   *
   * @param status {@link HttpStatus} liên quan đến ngoại lệ này.
   * @param e Ngoại lệ gốc (cause).
   * @param format Chuỗi định dạng cho thông điệp ngoại lệ.
   * @param args Các đối số được tham chiếu bởi các chỉ định định dạng trong chuỗi định dạng.
   */
  public HttpException(HttpStatus status, Exception e, String format, Object... args) {
    super(String.format(format, args), e);
    log.error(String.format(format, args), e);
    this.status = status;
    this.message = super.getMessage();
    this.data = null;
  }

  /**
   * Phương thức factory để tạo một {@code HttpException} với trạng thái {@link HttpStatus#OK}.
   *
   * @param data Dữ liệu cần trả về.
   * @return một instance của {@code HttpException} với trạng thái OK và dữ liệu được cung cấp.
   */
  public static HttpException ok(Object data) {
    return new HttpException(HttpStatus.OK, null, data);
  }
}
