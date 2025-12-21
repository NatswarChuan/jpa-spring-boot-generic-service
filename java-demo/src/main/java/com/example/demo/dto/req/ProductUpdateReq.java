package com.example.demo.dto.req;

import org.springframework.beans.BeanUtils;

import com.example.demo.entity.Product;
import com.natswarchuan.genericservice.dto.IDto;
import com.natswarchuan.genericservice.validation.Exists;
import com.natswarchuan.genericservice.validation.NoSpecialChars;
import jakarta.annotation.Nonnull;
import jakarta.validation.constraints.Min;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ProductUpdateReq implements IDto<Product> {
    @NoSpecialChars(message = "Tên sản phẩm không được chứa ký tự đặc biệt")
    private String name;

    @Min(value = 0, message = "Giá sản phẩm phải lớn hơn 0")
    private Double price;

    private String description;

    @Exists(entity = com.example.demo.entity.Category.class, message = "Danh mục không tồn tại", field = "id")
    private Long categoryId;

    @Exists(entity = com.example.demo.entity.Brand.class, message = "Thương hiệu không tồn tại", field = "id")
    private Long brandId;

    @Exists(entity = com.example.demo.entity.Model.class, message = "Model không tồn tại", field = "id")
    private Long modelId;

    @Override
    @SuppressWarnings("null")
    public Product updateEntity(@Nonnull Product entity) {
        BeanUtils.copyProperties(this, entity);

        if (categoryId != null) {
            com.example.demo.entity.Category category = new com.example.demo.entity.Category();
            category.setId(categoryId);
            entity.setCategory(category);
        }

        if (brandId != null) {
            com.example.demo.entity.Brand brand = new com.example.demo.entity.Brand();
            brand.setId(brandId);
            entity.setBrand(brand);
        }

        if (modelId != null) {
            com.example.demo.entity.Model model = new com.example.demo.entity.Model();
            model.setId(modelId);
            entity.setModel(model);
        }
        return entity;
    }
}
