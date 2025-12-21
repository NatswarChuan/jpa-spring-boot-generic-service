package com.example.demo.dto.req;

import org.springframework.beans.BeanUtils;

import com.example.demo.entity.Brand;
import com.example.demo.entity.Category;
import com.example.demo.entity.Model;
import com.natswarchuan.genericservice.dto.IDto;
import com.natswarchuan.genericservice.validation.Exists;
import com.natswarchuan.genericservice.validation.NoSpecialChars;
import jakarta.annotation.Nonnull;
import jakarta.validation.constraints.Min;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

@Data
@NoArgsConstructor
public class ModelUpdateReq implements IDto<Model> {
    @NoSpecialChars(message = "Tên model không được chứa ký tự đặc biệt")
    private String name;

    @Min(value = 1900, message = "Năm sản xuất phải lớn hơn hoặc bằng 1900")
    private Integer year;

    @Exists(entity = Brand.class, message = "Thương hiệu không tồn tại", field = "id")
    private Long brandId;

    private Set<Long> categoryIds = new HashSet<>();

    @Override
    @SuppressWarnings("null")
    public Model updateEntity(@Nonnull Model entity) {
        BeanUtils.copyProperties(this, entity);

        if (brandId != null) {
            Brand brand = new Brand();
            brand.setId(brandId);
            entity.setBrand(brand);
        }

        if (categoryIds != null) {
            Set<Category> categories = new HashSet<>();
            for (Long categoryId : categoryIds) {
                Category category = new Category();
                category.setId(categoryId);
                categories.add(category);
            }
            entity.setCategories(categories);
        }

        return entity;
    }
}
