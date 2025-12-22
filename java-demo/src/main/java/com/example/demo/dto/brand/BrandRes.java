package com.example.demo.dto.brand;

import com.example.demo.domain.Brand;
import com.natswarchuan.genericservice.dto.IDto;
import lombok.Data;

/**
 * DTO tóm tắt thông tin Brand.
 * <p>
 * Được sử dụng trong các phản hồi danh sách (List API) để tối ưu dung lượng
 * payload.
 */
@Data
public class BrandRes implements IDto<Brand> {
    /**
     * ID của Brand.
     */
    private Long id;

    /**
     * Tên của Brand.
     */
    private String name;
}
