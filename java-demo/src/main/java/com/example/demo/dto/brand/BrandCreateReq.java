package com.example.demo.dto.brand;

import com.example.demo.domain.Brand;
import com.example.demo.domain.Model;
import com.natswarchuan.genericservice.dto.IDto;
import com.natswarchuan.genericservice.validation.Exists;
import com.example.demo.validation.BrandModelCategoryValid;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import com.example.demo.domain.Category;
import com.example.demo.validation.specs.IdsInSpecLoader;
import com.natswarchuan.genericservice.validation.SpecValidation;
import java.util.Set;
import java.util.stream.Collectors;

import com.natswarchuan.genericservice.validation.Unique;

import org.springframework.beans.BeanUtils;

/**
 * DTO dùng cho yêu cầu tạo mới Brand.
 * <p>
 * Implement {@link IDto} để tương thích với generic service.
 * Sử dụng các annotation validation để đảm bảo tính toàn vẹn dữ liệu ngay từ
 * đầu vào.
 */
@Data
@BrandModelCategoryValid
public class BrandCreateReq implements IDto<Brand>, BrandRequestWithRelations {

    /**
     * Tên thương hiệu. Bắt buộc có và không được trùng lặp.
     * Sử dụng {@link Unique} để kiểm tra trùng lặp trong cơ sở dữ liệu.
     */
    @NotBlank(message = "Name is required")
    @Unique(entity = Brand.class, field = "name", message = "Brand name already exists")
    private String name;

    /**
     * Mô tả thương hiệu.
     */
    private String description;

    /**
     * ID của Model liên kết.
     * Sử dụng {@link Exists} để đảm bảo Model tồn tại.
     */
    @Exists(entity = Model.class)
    private Long modelId;

    /**
     * Danh sách ID của Category liên kết.
     * Sử dụng {@link SpecValidation} với {@link IdsInSpecLoader} để kiểm tra danh
     * sách ID có tồn tại hay không.
     */
    @SpecValidation(entity = Category.class, loader = IdsInSpecLoader.class, message = "Given categories do not exist")
    private Set<Long> categoryIds;

    /**
     * Chuyển đổi từ DTO sang Entity.
     * <p>
     * Sử dụng {@link BeanUtils} để copy các trường cơ bản.
     * Tự động map các quan hệ (như Categories) một cách thủ công để đảm bảo tính
     * chính xác.
     *
     * @return Brand entity đã được populate dữ liệu.
     */
    @Override
    public Brand toEntity() {
        Brand brand = new Brand();
        BeanUtils.copyProperties(this, brand, "categoryIds");
        if (this.categoryIds != null) {
            // Tại sao map thủ công?
            // Tương tự Model, ta cần chuyển đổi danh sách ID sang danh sách Entity.
            // Việc này giúp Hibernate nhận diện được các liên kết ManyToMany khi save.
            Set<Category> categories = this.categoryIds.stream()
                    .map(id -> Category.builder().id(id).build())
                    .collect(Collectors.toSet());
            brand.setCategories(categories);
        }
        return brand;
    }
}
