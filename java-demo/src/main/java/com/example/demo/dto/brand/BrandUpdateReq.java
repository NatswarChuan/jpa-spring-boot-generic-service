package com.example.demo.dto.brand;

import com.example.demo.domain.Brand;
import com.example.demo.domain.Category;
import com.natswarchuan.genericservice.dto.IDto;
import lombok.Data;

import com.example.demo.domain.Model;
import com.example.demo.validation.BrandModelCategoryValid;
import com.natswarchuan.genericservice.validation.Exists;
import com.natswarchuan.genericservice.validation.SpecValidation;
import com.example.demo.validation.specs.IdsInSpecLoader;

import java.util.Set;
import java.util.stream.Collectors;

/**
 * DTO dùng cho yêu cầu cập nhật Brand.
 * <p>
 * Cho phép cập nhật từng phần (partial update). Trường nào null sẽ không được
 * cập nhật vào entity.
 */
@Data
@BrandModelCategoryValid
public class BrandUpdateReq implements IDto<Brand>, BrandRequestWithRelations {
    /**
     * Tên thương hiệu.
     */
    private String name;

    /**
     * Mô tả thương hiệu.
     */
    private String description;

    /**
     * ID của Model liên kết.
     * Sử dụng @Exists để kiểm tra tồn tại nếu có giá trị.
     */
    @Exists(entity = Model.class)
    private Long modelId;

    /**
     * Danh sách ID của Category liên kết.
     */
    @SpecValidation(entity = Category.class, loader = IdsInSpecLoader.class, message = "Given categories do not exist")
    private Set<Long> categoryIds;

    /**
     * Cập nhật thông tin từ DTO vào Entity hiện có.
     * <p>
     * Ghi đè để xử lý logic cập nhật quan hệ (Categories).
     *
     * @param entity Entity cần cập nhật.
     * @return Entity đã được cập nhật.
     */
    @Override
    public Brand updateEntity(Brand entity) {
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
