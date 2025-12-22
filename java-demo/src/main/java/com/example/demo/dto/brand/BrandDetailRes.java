package com.example.demo.dto.brand;

import com.example.demo.domain.Brand;
import com.natswarchuan.genericservice.dto.IDto;
import lombok.Data;

/**
 * DTO chi tiết thông tin Brand.
 * <p>
 * Bao gồm cả thông tin các quan hệ liên kết (như Model thông qua modelId và
 * modelName).
 */
@Data
public class BrandDetailRes implements IDto<Brand> {
    /**
     * ID của Brand.
     */
    private Long id;

    /**
     * Tên của Brand.
     */
    private String name;

    /**
     * Mô tả của Brand.
     */
    private String description;

    /**
     * ID của Model mà Brand thuộc về.
     */
    private Long modelId;

    /**
     * Tên của Model mà Brand thuộc về.
     */
    private String modelName;

    /**
     * Chuyển đổi từ Entity sang DTO.
     * <p>
     * Thực hiện mapping thủ công các trường quan hệ để đảm bảo đúng cấu trúc mong
     * muốn.
     *
     * @param entity Entity nguồn.
     */
    @Override
    public void fromEntity(Brand entity) {
        if (entity != null) {
            this.id = entity.getId();
            this.name = entity.getName();
            this.description = entity.getDescription();
            if (entity.getModel() != null) {
                this.modelId = entity.getModel().getId();
                this.modelName = entity.getModel().getName();
            }
        }
    }
}
