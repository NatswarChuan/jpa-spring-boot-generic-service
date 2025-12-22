package com.example.demo.dto.product;

import com.example.demo.domain.Product;
import com.natswarchuan.genericservice.dto.IDto;
import lombok.Data;
import java.math.BigDecimal;

import com.example.demo.domain.Brand;
import com.example.demo.domain.Model;
import com.example.demo.domain.Store;
import com.example.demo.domain.Category;
import com.example.demo.validation.specs.IdsInSpecLoader;
import com.natswarchuan.genericservice.validation.Exists;
import com.natswarchuan.genericservice.validation.SpecValidation;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * DTO cập nhật Product.
 */
@Data
public class ProductUpdateReq implements IDto<Product> {
    /**
     * Tên sản phẩm.
     */
    private String name;

    /**
     * Giá sản phẩm.
     */
    private BigDecimal price;

    /**
     * ID của Brand liên kết.
     */
    @Exists(entity = Brand.class)
    private Long brandId;

    /**
     * ID của Model liên kết.
     */
    @Exists(entity = Model.class)
    private Long modelId;

    /**
     * ID của Store liên kết.
     */
    @Exists(entity = Store.class)
    private Long storeId;

    /**
     * Danh sách Category liên kết.
     */
    @SpecValidation(entity = Category.class, loader = IdsInSpecLoader.class, message = "Given categories do not exist")
    private Set<Long> categoryIds;

    /**
     * Cập nhật Entity.
     * <p>
     * Lý giải triển khai:
     * 1. Gọi `IDto.super.updateEntity(entity)`: Tận dụng default method trong
     * interface để copy các field cơ bản.
     * 2. Xử lý riêng `categoryIds`:
     * - Collection này cần được convert từ ID sang Entity.
     * - Sử dụng `entity.setCategories(...)` (là method transient trong Product) để
     * trigger logic
     * `clear()` + `addAll()`, giúp Hibernate update đúng bảng trung gian.
     *
     * @param entity Entity cần update.
     * @return Entity đã update.
     */
    @Override
    public Product updateEntity(Product entity) {
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
