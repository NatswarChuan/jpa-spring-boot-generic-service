package com.example.demo.dto.store;

import com.example.demo.domain.Store;
import com.natswarchuan.genericservice.dto.IDto;
import lombok.Data;

import com.example.demo.domain.Category;
import com.example.demo.validation.specs.IdsInSpecLoader;
import com.natswarchuan.genericservice.validation.SpecValidation;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * DTO cập nhật Store.
 */
@Data
public class StoreUpdateReq implements IDto<Store> {
    /**
     * Tên Store.
     */
    private String name;

    /**
     * Địa chỉ Store.
     */
    private String address;

    /**
     * Danh sách Category liên kết.
     */
    @SpecValidation(entity = Category.class, loader = IdsInSpecLoader.class, message = "Given categories do not exist")
    private Set<Long> categoryIds;

    /**
     * Cập nhật Entity.
     *
     * @param entity Entity cần update.
     * @return Entity đã update.
     */
    @Override
    public Store updateEntity(Store entity) {
        IDto.super.updateEntity(entity);
        if (this.categoryIds != null) {
            Set<Category> categories = this.categoryIds.stream()
                    .map(id -> Category.builder().id(id).build())
                    .collect(Collectors.toSet());
            entity.setCategories(categories);
        }
        return entity;
    }
}
