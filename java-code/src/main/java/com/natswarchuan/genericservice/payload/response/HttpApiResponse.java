package com.natswarchuan.genericservice.payload.response;

import lombok.Builder;
import lombok.Data;

/**
 * Lớp đại diện cho phản hồi HTTP chuẩn hóa của ứng dụng.
 *
 * <p>
 * Lớp này bao bọc dữ liệu trả về cùng với mã trạng thái và thông điệp, giúp tạo
 * ra một cấu trúc JSON đồng nhất cho API.
 *
 * @param <T> Kiểu dữ liệu của nội dung phản hồi (body).
 * @author NatswarChuan
 */
@Data
@Builder
public class HttpApiResponse<T> {
    /** Mã trạng thái HTTP (ví dụ: 200, 400, 500). */
    private int status;

    /** Thông điệp đi kèm với phản hồi (ví dụ: "Success", "Error description"). */
    private String message;

    /** Dữ liệu phản hồi thực tế. */
    private T data;

    /**
     * Tạo một phản hồi thành công với dữ liệu được cung cấp và mã trạng thái mặc
     * định là 200 (OK).
     *
     * @param <T>  Kiểu của dữ liệu.
     * @param data Dữ liệu cần bao bọc trong phản hồi.
     * @return Một instance của {@link HttpApiResponse} đại diện cho phản hồi thành
     *         công.
     */
    public static <T> HttpApiResponse<T> success(T data) {
        return HttpApiResponse.<T>builder().status(200).message("Success").data(data).build();
    }

    /**
     * Tạo một phản hồi thành công với dữ liệu và mã trạng thái tùy chỉnh.
     *
     * @param <T>    Kiểu của dữ liệu.
     * @param data   Dữ liệu cần bao bọc trong phản hồi.
     * @param status Mã trạng thái HTTP tùy chỉnh.
     * @return Một instance của {@link HttpApiResponse} đại diện cho phản hồi thành
     *         công.
     */
    public static <T> HttpApiResponse<T> success(T data, int status) {
        return HttpApiResponse.<T>builder().status(status).message("Success").data(data).build();
    }

    /**
     * Tạo một phản hồi lỗi với thông điệp được chỉ định và mã trạng thái mặc định
     * là 400 (Bad Request).
     *
     * @param <T>     Kiểu generic (thường là null cho phản hồi lỗi).
     * @param message Thông điệp mô tả lỗi.
     * @return Một instance của {@link HttpApiResponse} đại diện cho phản hồi lỗi.
     */
    public static <T> HttpApiResponse<T> error(String message) {
        return HttpApiResponse.<T>builder().status(400).message(message).build();
    }

    /**
     * Tạo một phản hồi lỗi với thông điệp và mã trạng thái tùy chỉnh.
     *
     * @param <T>     Kiểu generic.
     * @param message Thông điệp mô tả lỗi.
     * @param status  Mã trạng thái HTTP tùy chỉnh (ví dụ: 404, 500).
     * @return Một instance của {@link HttpApiResponse} đại diện cho phản hồi lỗi.
     */
    public static <T> HttpApiResponse<T> error(String message, int status) {
        return HttpApiResponse.<T>builder().status(status).message(message).build();
    }

    /**
     * Tạo một phản hồi lỗi với thông điệp, mã trạng thái và dữ liệu bổ sung.
     *
     * @param <T>     Kiểu dữ liệu đính kèm.
     * @param message Thông điệp mô tả lỗi.
     * @param status  Mã trạng thái HTTP tùy chỉnh.
     * @param data    Dữ liệu bổ sung đi kèm với lỗi.
     * @return Một instance của {@link HttpApiResponse} đại diện cho phản hồi lỗi.
     */
    public static <T> HttpApiResponse<T> error(String message, int status, T data) {
        return HttpApiResponse.<T>builder().status(status).message(message).data(data).build();
    }
}
