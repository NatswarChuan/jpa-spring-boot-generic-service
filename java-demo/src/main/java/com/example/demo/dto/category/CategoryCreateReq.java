package com.example.demo.dto.category;

import com.example.demo.domain.Category;
import com.natswarchuan.genericservice.dto.IDto;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import org.springframework.beans.BeanUtils;

import com.natswarchuan.genericservice.validation.Unique;

/**
 * DTO tạo mới Category.
 */
@Data
public class CategoryCreateReq implements IDto<Category> {

    /**
     * Tên danh mục, yêu cầu bắt buộc và duy nhất.
     */
    @NotBlank(message = "Name is required")
    @Unique(entity = Category.class, field = "name", message = "Category name already exists")
    private String name;

    /**
     * Mô tả danh mục.
     */
    private String description;

    /**
     * Chuyển đổi sang Entity.
     * Sử dụng BeanUtils để copy các trường.
     *
     * @return Category entity.
     */
    @Override
    public Category toEntity() {
        Category category = new Category();
        BeanUtils.copyProperties(this, category);
        return category;
    }
}
