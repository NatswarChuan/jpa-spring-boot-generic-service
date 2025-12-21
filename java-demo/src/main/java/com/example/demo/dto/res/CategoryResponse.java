package com.example.demo.dto.res;

import org.springframework.beans.BeanUtils;

import com.example.demo.entity.Category;
import com.natswarchuan.genericservice.dto.IDto;

import jakarta.annotation.Nonnull;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CategoryResponse implements IDto<Category> {
    private Long id;
    private String name;
    private String description;
    private BrandResponse brand;

    @Override
    @SuppressWarnings("null")
    public void fromEntity(@Nonnull Category entity) {
        BeanUtils.copyProperties(entity, this);

        if (entity.getBrand() != null) {
            BrandResponse brandRes = new BrandResponse();
            brandRes.fromEntity(entity.getBrand());
            this.brand = brandRes;
        }
    }
}
