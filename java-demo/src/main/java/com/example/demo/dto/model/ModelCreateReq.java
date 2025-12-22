package com.example.demo.dto.model;

import com.example.demo.domain.Model;
import com.natswarchuan.genericservice.dto.IDto;
import com.natswarchuan.genericservice.validation.Unique;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import com.example.demo.domain.Category;
import com.example.demo.validation.specs.IdsInSpecLoader;
import com.natswarchuan.genericservice.validation.SpecValidation;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.BeanUtils;

/**
 * DTO tạo mới Model.
 * <p>
 * Ngoài các thông tin cơ bản, DTO này còn chịu trách nhiệm nhận danh sách
 * Category IDs.
 */
@Data
public class ModelCreateReq implements IDto<Model> {

    /**
     * Tên Model, yêu cầu duy nhất.
     */
    @Unique(entity = Model.class, field = "name", message = "Model name already exists")
    @NotBlank(message = "Name is required")
    private String name;

    /**
     * Năm sản xuất.
     */
    @jakarta.validation.constraints.NotNull(message = "Year is required")
    private Integer year;

    /**
     * Danh sách Category liên kết.
     */
    @SpecValidation(entity = Category.class, loader = IdsInSpecLoader.class, message = "Given categories do not exist")
    private Set<Long> categoryIds;

    /**
     * Chuyển đổi sang Entity.
     * <p>
     * Thực hiện mapping thủ công cho danh sách Categories.
     *
     * @return Model entity.
     */
    @Override
    public Model toEntity() {
        Model model = new Model();
        BeanUtils.copyProperties(this, model, "categoryIds");
        model.setYear(this.year);
        if (this.categoryIds != null) {
            // Tại sao cần map thủ công?
            // BeanUtils không thể tự động convert từ List<Long> (IDs) sang Set<Category>
            // (Entities).
            // Do đó cần stream và tạo các proxy object Category với ID tương ứng.
            Set<Category> categories = this.categoryIds.stream()
                    .map(id -> Category.builder().id(id).build())
                    .collect(Collectors.toSet());
            model.setCategories(categories);
        }
        return model;
    }
}
