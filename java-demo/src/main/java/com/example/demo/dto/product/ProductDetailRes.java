package com.example.demo.dto.product;

import com.example.demo.domain.Product;
import com.natswarchuan.genericservice.dto.IDto;
import lombok.Data;
import java.math.BigDecimal;

/**
 * DTO chi tiết Product.
 * <p>
 * Bao gồm thông tin chi tiết các quan hệ (Brand, Model, Store, Categories).
 */
@Data
public class ProductDetailRes implements IDto<Product> {
    /**
     * ID của Product.
     */
    private Long id;

    /**
     * Tên Product.
     */
    private String name;

    /**
     * Giá Product.
     */
    private BigDecimal price;

    /**
     * ID của Brand liên kết.
     */
    private Long brandId;

    /**
     * Tên Brand liên kết.
     */
    private String brandName;

    /**
     * ID của Model liên kết.
     */
    private Long modelId;

    /**
     * Tên Model liên kết.
     */
    private String modelName;

    /**
     * ID của Store liên kết.
     */
    private Long storeId;

    /**
     * Tên Store liên kết.
     */
    private String storeName;

    /**
     * Danh sách ID Category liên kết.
     */
    private java.util.Set<Long> categoryIds;

    /**
     * Chuyển đổi từ Entity sang DTO.
     * <p>
     * Thực hiện mapping thủ công để lấy các thông tin chi tiết từ các quan hệ.
     *
     * @param entity Entity nguồn.
     */
    @Override
    public void fromEntity(Product entity) {
        if (entity != null) {
            this.id = entity.getId();
            this.name = entity.getName();
            this.price = entity.getPrice();

            if (entity.getBrand() != null) {
                this.brandId = entity.getBrand().getId();
                this.brandName = entity.getBrand().getName();
            }
            if (entity.getModel() != null) {
                this.modelId = entity.getModel().getId();
                this.modelName = entity.getModel().getName();
            }
            if (entity.getStore() != null) {
                this.storeId = entity.getStore().getId();
                this.storeName = entity.getStore().getName();
            }
            if (entity.getCategories() != null) {
                this.categoryIds = entity.getCategories().stream()
                        .map(com.example.demo.domain.Category::getId)
                        .collect(java.util.stream.Collectors.toSet());
            }
        }
    }
}
