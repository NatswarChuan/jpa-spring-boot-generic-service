package com.example.demo.dto.brand;

import java.util.Set;

/**
 * Interface định nghĩa các phương thức truy cập quan hệ cho Brand Request.
 * <p>
 * Dùng cho các Validator để kiểm tra tính hợp lệ chéo giữa các trường quan hệ
 * (ví dụ: Model và Category).
 */
public interface BrandRequestWithRelations {
    /**
     * Lấy Model ID.
     * 
     * @return Model ID.
     */
    Long getModelId();

    /**
     * Lấy danh sách Category ID.
     * 
     * @return Set Category ID.
     */
    Set<Long> getCategoryIds();
}
