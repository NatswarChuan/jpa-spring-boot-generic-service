package com.example.demo.dto.category;

import com.example.demo.domain.Category;
import com.natswarchuan.genericservice.dto.IDto;
import lombok.Data;

/**
 * DTO cập nhật Category.
 */
@Data
public class CategoryUpdateReq implements IDto<Category> {

    /**
     * Tên danh mục.
     */
    private String name;

    /**
     * Mô tả danh mục.
     */
    private String description;

    /**
     * Cập nhật Entity.
     * <p>
     * Sử dụng default implementation của {@link IDto} (BeanUtils copy).
     *
     * @param entity Entity cần update.
     * @return Entity đã update.
     */
    @Override
    public Category updateEntity(Category entity) {
        return IDto.super.updateEntity(entity);
    }
}
