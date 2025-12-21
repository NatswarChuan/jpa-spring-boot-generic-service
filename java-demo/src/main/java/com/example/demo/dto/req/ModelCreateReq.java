package com.example.demo.dto.req;

import com.example.demo.dto.req.spec.ModelCategoriesBelongToBrandSpec;
import com.example.demo.entity.Brand;
import com.example.demo.entity.Category;
import com.example.demo.entity.Model;
import com.natswarchuan.genericservice.dto.IDto;
import com.natswarchuan.genericservice.validation.DtoSpecValidation;
import com.natswarchuan.genericservice.validation.Exists;
import com.natswarchuan.genericservice.validation.NoSpecialChars;
import com.natswarchuan.genericservice.validation.Unique;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

@Data
@NoArgsConstructor
@DtoSpecValidation(loader = ModelCategoriesBelongToBrandSpec.class, mustExist = true, message = "Các danh mục được chọn phải thuộc thương hiệu được chọn")
public class ModelCreateReq implements IDto<Model> {
    @NotBlank(message = "Tên model không được để trống")
    @Unique(entity = Model.class, message = "Tên model đã tồn tại", field = "name")
    @NoSpecialChars(message = "Tên model không được chứa ký tự đặc biệt")
    private String name;

    @NotNull(message = "Năm sản xuất không được để trống")
    @Min(value = 1900, message = "Năm sản xuất phải lớn hơn hoặc bằng 1900")
    private Integer year;

    @Exists(entity = Brand.class, message = "Thương hiệu không tồn tại", field = "id")
    private Long brandId;

    private Set<Long> categoryIds = new HashSet<>();

    @Override
    public Model toEntity() {
        Model model = new Model();
        org.springframework.beans.BeanUtils.copyProperties(this, model);

        if (brandId != null) {
            Brand brand = new Brand();
            brand.setId(brandId);
            model.setBrand(brand);
        }

        if (categoryIds != null && !categoryIds.isEmpty()) {
            Set<Category> categories = new HashSet<>();
            for (Long categoryId : categoryIds) {
                Category category = new Category();
                category.setId(categoryId);
                categories.add(category);
            }
            model.setCategories(categories);
        }

        return model;
    }
}
