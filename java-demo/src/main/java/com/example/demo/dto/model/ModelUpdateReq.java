package com.example.demo.dto.model;

import com.example.demo.domain.Model;
import com.natswarchuan.genericservice.dto.IDto;
import lombok.Data;

import com.example.demo.domain.Category;
import com.example.demo.validation.specs.IdsInSpecLoader;
import com.natswarchuan.genericservice.validation.SpecValidation;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * DTO cập nhật Model.
 */
@Data
public class ModelUpdateReq implements IDto<Model> {
    /**
     * Tên Model.
     */
    private String name;

    /**
     * Năm sản xuất.
     */
    private Integer year;

    /**
     * Danh sách Category liên kết.
     */
    @SpecValidation(entity = Category.class, loader = IdsInSpecLoader.class, message = "Given categories do not exist")
    private Set<Long> categoryIds;

    /**
     * Cập nhật Entity.
     * <p>
     * Xử lý cập nhật danh sách Categories nếu có thay đổi.
     *
     * @param entity Entity cần update.
     * @return Entity đã update.
     */
    @Override
    public Model updateEntity(Model entity) {
        IDto.super.updateEntity(entity);
        entity.setYear(this.year);
        if (this.categoryIds != null) {
            Set<Category> categories = this.categoryIds.stream()
                    .map(id -> Category.builder().id(id).build())
                    .collect(Collectors.toSet());
            entity.setCategories(categories);
        }
        return entity;
    }
}
