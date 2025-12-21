package com.example.demo.dto.req;

import com.example.demo.entity.Brand;
import com.example.demo.entity.Category;
import com.natswarchuan.genericservice.dto.IDto;
import com.natswarchuan.genericservice.validation.Exists;
import com.natswarchuan.genericservice.validation.Unique;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CategoryCreateReq implements IDto<Category> {
    @NotBlank(message = "Tên danh mục không được để trống")
    @Unique(entity = Category.class, message = "Tên danh mục đã tồn tại", field = "name")
    private String name;

    private String description;

    @Exists(entity = Brand.class, message = "Danh mục cha không tồn tại", field = "id")
    private Long brandId;

    @Override
    public Category toEntity() {
        Category category = new Category();
        org.springframework.beans.BeanUtils.copyProperties(this, category);

        if (brandId != null) {
            com.example.demo.entity.Brand brand = new com.example.demo.entity.Brand();
            brand.setId(brandId);
            category.setBrand(brand);
        }

        return category;
    }
}
