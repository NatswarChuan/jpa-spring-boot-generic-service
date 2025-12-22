package com.example.demo.dto.product;

import com.example.demo.domain.Product;
import com.natswarchuan.genericservice.dto.IDto;
import lombok.Data;
import java.math.BigDecimal;

/**
 * DTO tóm tắt Product.
 */
@Data
public class ProductRes implements IDto<Product> {
    /**
     * ID của Product.
     */
    private Long id;

    /**
     * Tên Product.
     */
    private String name;

    /**
     * Giá Product.
     */
    private BigDecimal price;
}
