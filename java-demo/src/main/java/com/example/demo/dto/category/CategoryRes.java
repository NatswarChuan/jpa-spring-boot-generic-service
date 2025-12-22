package com.example.demo.dto.category;

import com.example.demo.domain.Category;
import com.natswarchuan.genericservice.dto.IDto;
import lombok.Data;

/**
 * DTO tóm tắt Category.
 */
@Data
public class CategoryRes implements IDto<Category> {
    /**
     * ID danh mục.
     */
    private Long id;

    /**
     * Tên danh mục.
     */
    private String name;
}
