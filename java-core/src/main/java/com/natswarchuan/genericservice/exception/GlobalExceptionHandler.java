package com.natswarchuan.genericservice.exception;

import com.natswarchuan.genericservice.payload.response.HttpApiResponse;
import org.springframework.http.HttpStatus;
import java.util.HashMap;
import java.util.Map;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

/**
 * Lớp xử lý ngoại lệ tập trung cho toàn bộ ứng dụng.
 *
 * <p>
 * Lớp này sử dụng {@link RestControllerAdvice} để bắt các ngoại lệ xảy ra trong
 * các Controller
 * và trả về phản hồi chuẩn hóa dưới dạng {@link HttpApiResponse}.
 *
 * @author NatswarChuan
 */
@RestControllerAdvice
@SuppressWarnings("null")
public class GlobalExceptionHandler {

    /**
     * Xử lý ngoại lệ {@link HttpException}.
     *
     * <p>
     * Trích xuất mã trạng thái, thông điệp và dữ liệu từ ngoại lệ để tạo phản hồi
     * lỗi tương ứng.
     *
     * @param ex Đối tượng ngoại lệ {@link HttpException} bị bắt.
     * @return {@link ResponseEntity} chứa thông tin lỗi chuẩn hóa.
     */
    @ExceptionHandler(HttpException.class)
    public ResponseEntity<HttpApiResponse<Object>> handleHttpException(HttpException ex) {
        HttpApiResponse<Object> response = HttpApiResponse.error(
                ex.getMessage(),
                ex.getStatus(),
                ex.getData());
        return new ResponseEntity<>(response, ex.getStatus());
    }

    /**
     * Xử lý ngoại lệ validation (khi input không hợp lệ).
     *
     * <p>
     * Bắt lỗi từ @Valid và trả về danh sách lỗi chi tiết theo từng field.
     *
     * @param ex Ngoại lệ {@link MethodArgumentNotValidException}.
     * @return {@link ResponseEntity} chứa danh sách các lỗi validation.
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<HttpApiResponse<Object>> handleValidationExceptions(
            MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });

        HttpApiResponse<Object> response = HttpApiResponse.error(
                "Dữ liệu đầu vào không hợp lệ",
                HttpStatus.BAD_REQUEST,
                errors);
        return ResponseEntity.badRequest().body(response);
    }

    /**
     * Xử lý các ngoại lệ không xác định khác.
     *
     * <p>
     * Bắt tất cả các loại ngoại lệ kế thừa từ {@link Exception} mà không được xử lý
     * cụ thể ở nơi khác,
     * trả về mã trạng thái 500 (Internal Server Error).
     *
     * @param ex Đối tượng ngoại lệ bị bắt.
     * @return {@link ResponseEntity} chứa thông báo lỗi hệ thống.
     */
    @ExceptionHandler(Exception.class)
    public ResponseEntity<HttpApiResponse<Object>> handleGeneralException(Exception ex) {
        HttpApiResponse<Object> response = HttpApiResponse.error(
                "Đã xảy ra lỗi hệ thống không mong muốn: " + ex.getMessage(),
                HttpStatus.INTERNAL_SERVER_ERROR);
        return ResponseEntity.internalServerError().body(response);
    }
}
