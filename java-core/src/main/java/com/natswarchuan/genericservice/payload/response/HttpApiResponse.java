package com.natswarchuan.genericservice.payload.response;

import org.springframework.http.HttpStatus;

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
public class HttpApiResponse<T> {
    /** Mã trạng thái HTTP (ví dụ: 200, 400, 500). */
    private int status;

    /** Thông điệp đi kèm với phản hồi (ví dụ: "Success", "Error description"). */
    private String message;

    /** Dữ liệu phản hồi thực tế. */
    private T data;

    /**
     * Khởi tạo mặc định.
     */
    public HttpApiResponse() {
    }

    /**
     * Khởi tạo với đầy đủ thông tin.
     *
     * @param status  Mã trạng thái.
     * @param message Thông điệp.
     * @param data    Dữ liệu.
     */
    public HttpApiResponse(int status, String message, T data) {
        this.status = status;
        this.message = message;
        this.data = data;
    }

    /**
     * Lấy mã trạng thái.
     *
     * @return Mã trạng thái.
     */
    public int getStatus() {
        return status;
    }

    /**
     * Thiết lập mã trạng thái.
     *
     * @param status Mã trạng thái.
     */
    public void setStatus(int status) {
        this.status = status;
    }

    /**
     * Lấy thông điệp.
     *
     * @return Thông điệp.
     */
    public String getMessage() {
        return message;
    }

    /**
     * Thiết lập thông điệp.
     *
     * @param message Thông điệp.
     */
    public void setMessage(String message) {
        this.message = message;
    }

    /**
     * Lấy dữ liệu phản hồi.
     *
     * @return Dữ liệu.
     */
    public T getData() {
        return data;
    }

    /**
     * Thiết lập dữ liệu phản hồi.
     *
     * @param data Dữ liệu.
     */
    public void setData(T data) {
        this.data = data;
    }

    /**
     * Tạo Builder cho HttpApiResponse.
     *
     * @param <T> Kiểu dữ liệu.
     * @return Builder.
     */
    public static <T> HttpApiResponseBuilder<T> builder() {
        return new HttpApiResponseBuilder<>();
    }

    /**
     * Lớp Builder giúp xây dựng đối tượng HttpApiResponse dễ dàng hơn.
     *
     * @param <T> Kiểu dữ liệu.
     */
    public static class HttpApiResponseBuilder<T> {
        private int status;
        private String message;
        private T data;

        /**
         * Thiết lập mã trạng thái.
         *
         * @param status Mã trạng thái.
         * @return Builder.
         */
        public HttpApiResponseBuilder<T> status(int status) {
            this.status = status;
            return this;
        }

        /**
         * Thiết lập thông điệp.
         *
         * @param message Thông điệp.
         * @return Builder.
         */
        public HttpApiResponseBuilder<T> message(String message) {
            this.message = message;
            return this;
        }

        /**
         * Thiết lập dữ liệu.
         *
         * @param data Dữ liệu.
         * @return Builder.
         */
        public HttpApiResponseBuilder<T> data(T data) {
            this.data = data;
            return this;
        }

        /**
         * Xây dựng đối tượng HttpApiResponse.
         *
         * @return HttpApiResponse.
         */
        public HttpApiResponse<T> build() {
            return new HttpApiResponse<>(status, message, data);
        }
    }

    /**
     * Tạo phản hồi thành công với dữ liệu.
     *
     * @param <T>  Kiểu dữ liệu.
     * @param data Dữ liệu trả về.
     * @return HttpApiResponse thành công (200 OK).
     */
    public static <T> HttpApiResponse<T> success(T data) {
        return HttpApiResponse.<T>builder().status(HttpStatus.OK.value()).message("Success").data(data).build();
    }

    /**
     * Tạo phản hồi thành công với dữ liệu và mã trạng thái tùy chỉnh.
     *
     * @param <T>    Kiểu dữ liệu.
     * @param data   Dữ liệu trả về.
     * @param status Mã trạng thái HTTP.
     * @return HttpApiResponse thành công.
     */
    public static <T> HttpApiResponse<T> success(T data, HttpStatus status) {
        return HttpApiResponse.<T>builder().status(status.value()).message("Success").data(data).build();
    }

    /**
     * Tạo phản hồi lỗi với thông điệp.
     *
     * @param <T>     Kiểu dữ liệu.
     * @param message Thông điệp lỗi.
     * @return HttpApiResponse lỗi (400 Bad Request).
     */
    public static <T> HttpApiResponse<T> error(String message) {
        return HttpApiResponse.<T>builder().status(HttpStatus.BAD_REQUEST.value()).message(message).build();
    }

    /**
     * Tạo phản hồi lỗi với thông điệp và mã trạng thái tùy chỉnh.
     *
     * @param <T>     Kiểu dữ liệu.
     * @param message Thông điệp lỗi.
     * @param status  Mã trạng thái HTTP.
     * @return HttpApiResponse lỗi.
     */
    public static <T> HttpApiResponse<T> error(String message, HttpStatus status) {
        return HttpApiResponse.<T>builder().status(status.value()).message(message).build();
    }

    /**
     * Tạo phản hồi lỗi với thông điệp, mã trạng thái và dữ liệu bổ sung.
     *
     * @param <T>     Kiểu dữ liệu.
     * @param message Thông điệp lỗi.
     * @param status  Mã trạng thái HTTP.
     * @param data    Dữ liệu bổ sung (nếu có).
     * @return HttpApiResponse lỗi.
     */
    public static <T> HttpApiResponse<T> error(String message, HttpStatus status, T data) {
        return HttpApiResponse.<T>builder().status(status.value()).message(message).data(data).build();
    }
}
