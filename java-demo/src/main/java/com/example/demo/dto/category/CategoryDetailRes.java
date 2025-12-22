package com.example.demo.dto.category;

import com.example.demo.domain.Category;
import com.natswarchuan.genericservice.dto.IDto;
import lombok.Data;

/**
 * DTO chi tiết Category.
 */
@Data
public class CategoryDetailRes implements IDto<Category> {
    /**
     * ID danh mục.
     */
    private Long id;

    /**
     * Tên danh mục.
     */
    private String name;

    /**
     * Mô tả danh mục.
     */
    private String description;
}
