package com.example.demo.dto.res;

import com.example.demo.entity.Model;
import com.natswarchuan.genericservice.dto.IDto;

import jakarta.annotation.Nonnull;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.BeanUtils;

@Data
@NoArgsConstructor
public class ModelResponse implements IDto<Model> {
    private Long id;
    private String name;
    private Integer year;
    private BrandResponse brand;
    private Set<CategoryResponse> categories = new HashSet<>();

    @Override
    @SuppressWarnings("null")
    public void fromEntity(@Nonnull Model entity) {
        BeanUtils.copyProperties(entity, this);

        if (entity.getBrand() != null) {
            BrandResponse brandRes = new BrandResponse();
            brandRes.fromEntity(entity.getBrand());
            this.brand = brandRes;
        }

        if (entity.getCategories() != null && !entity.getCategories().isEmpty()) {
            this.categories = entity.getCategories().stream()
                    .map(category -> {
                        CategoryResponse categoryRes = new CategoryResponse();
                        categoryRes.setId(category.getId());
                        categoryRes.setName(category.getName());
                        categoryRes.setDescription(category.getDescription());
                        return categoryRes;
                    })
                    .collect(Collectors.toSet());
        }
    }
}
