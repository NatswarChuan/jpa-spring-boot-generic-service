package com.example.demo.dto.product;

import com.natswarchuan.genericservice.payload.request.BaseRequestParam;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * Object chứa các tham số lọc cho Product.
 * <p>
 * Kế thừa {@link BaseRequestParam} để có các tham số phân trang chuẩn (page,
 * size, sort).
 * Thêm các trường lọc đặc thù của Product (giá, brand).
 */
@Data
@EqualsAndHashCode(callSuper = true)
public class ProductFilterParam extends BaseRequestParam {

    /**
     * Giá tối thiểu.
     */
    private Double minPrice;

    /**
     * Giá tối đa.
     */
    private Double maxPrice;

    /**
     * Tên thương hiệu.
     * <p>
     * Dùng để filter qua JOIN table (Product -> Brand).
     * Search theo cơ chế Contains (LIKE %name%).
     */
    private String brandName;
}
