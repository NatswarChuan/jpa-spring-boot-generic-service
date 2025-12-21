package com.example.demo.dto.res;

import org.springframework.beans.BeanUtils;

import com.example.demo.entity.Product;
import com.natswarchuan.genericservice.dto.IDto;

import jakarta.annotation.Nonnull;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ProductResponse implements IDto<Product> {
    private Long id;
    private String name;
    private Double price;
    private String description;

    private CategoryResponse category;
    private BrandResponse brand;
    private ModelResponse model;

    @Override
    @SuppressWarnings("null")
    public void fromEntity(@Nonnull Product entity) {
        BeanUtils.copyProperties(entity, this);

        if (entity.getCategory() != null) {
            CategoryResponse categoryRes = new CategoryResponse();
            categoryRes.fromEntity(entity.getCategory());
            this.category = categoryRes;
        }

        if (entity.getBrand() != null) {
            BrandResponse brandRes = new BrandResponse();
            brandRes.fromEntity(entity.getBrand());
            this.brand = brandRes;
        }

        if (entity.getModel() != null) {
            ModelResponse modelRes = new ModelResponse();
            modelRes.fromEntity(entity.getModel());
            this.model = modelRes;
        }
    }
}
