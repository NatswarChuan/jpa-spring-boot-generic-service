package com.example.demo.dto.brand;

import com.example.demo.domain.Brand;
import com.example.demo.domain.Category;
import com.natswarchuan.genericservice.dto.IDto;
import lombok.Data;

import com.example.demo.domain.Model;
import com.natswarchuan.genericservice.validation.Exists;
import com.natswarchuan.genericservice.validation.IdsExist;

import java.util.Set;
import java.util.stream.Collectors;

import com.natswarchuan.genericservice.validation.SqlConstraint;

/**
 * DTO dùng cho yêu cầu cập nhật Brand.
 * <p>
 * Cho phép cập nhật từng phần (partial update). Trường nào null sẽ không được
 * cập nhật vào entity.
 */
@Data
@SqlConstraint(sql = """
        SELECT CASE WHEN (SELECT count(*) FROM model_categories
        WHERE model_id = :mid) = (SELECT count(*) FROM model_categories WHERE
        model_id = :mid AND category_id IN (:cids)) THEN 1 ELSE 0 END""", dependencies = {
        "mid:field/modelId",
        "cids:field/categoryIds" }, message = "Brand does not support all categories of the selected Model")
public class BrandUpdateReq implements IDto<Brand> {
    /**
     * Tên thương hiệu.
     */
    private String name;

    /**
     * Mô tả thương hiệu.
     */
    private String description;

    /**
     * ID của Model liên kết.
     * Sử dụng @Exists để kiểm tra tồn tại nếu có giá trị.
     */
    @Exists(entity = Model.class)
    private Long modelId;

    /**
     * Danh sách ID của Category liên kết.
     */
    @IdsExist(entity = Category.class, message = "Given categories do not exist")
    private Set<Long> categoryIds;

    /**
     * Cập nhật thông tin từ DTO vào Entity hiện có.
     * <p>
     * Ghi đè để xử lý logic cập nhật quan hệ (Categories).
     *
     * @param entity Entity cần cập nhật.
     * @return Entity đã được cập nhật.
     */
    @Override
    public Brand updateEntity(Brand entity) {
        IDto.super.updateEntity(entity);
        if (this.categoryIds != null) {
            Set<Category> categories = this.categoryIds.stream()
                    .map(id -> Category.builder().id(id).build())
                    .collect(Collectors.toSet());
            entity.setCategories(categories);
        }
        return entity;
    }
}
