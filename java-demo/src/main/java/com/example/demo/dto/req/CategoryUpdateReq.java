package com.example.demo.dto.req;

import com.example.demo.entity.Brand;
import com.example.demo.entity.Category;
import com.natswarchuan.genericservice.dto.IDto;
import com.natswarchuan.genericservice.validation.Exists;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.annotation.Nonnull;

@Data
@NoArgsConstructor
public class CategoryUpdateReq implements IDto<Category> {
    private String name;
    private String description;

    @Exists(entity = Brand.class, message = "Thương hiệu không tồn tại", field = "id")
    private Long brandId;

    @SuppressWarnings("null")
    @Override
    public Category updateEntity(@Nonnull Category entity) {
        org.springframework.beans.BeanUtils.copyProperties(this, entity);

        if (brandId != null) {
            com.example.demo.entity.Brand brand = new com.example.demo.entity.Brand();
            brand.setId(brandId);
            entity.setBrand(brand);
        }

        return entity;
    }
}
