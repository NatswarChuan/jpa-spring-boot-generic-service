package com.example.demo.domain;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Nationalized;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * Entity đại diện cho Danh mục (Category).
 */
@Entity
@Table(name = "categories")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Category {

    /**
     * ID danh mục.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * Tên danh mục, duy nhất.
     */
    @Nationalized
    @Column(nullable = false, unique = true)
    private String name;

    /**
     * Mô tả.
     */
    @Column(length = 500)
    private String description;

    /**
     * Danh sách liên kết với Product (Many-to-Many).
     * <p>
     * Quản lý các bản ghi trong bảng trung gian `products_categories` mà Category
     * này tham gia.
     */
    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private Set<ProductCategory> productCategories = new HashSet<>();

    /**
     * Danh sách liên kết với Brand (Many-to-Many).
     * <p>
     * Quản lý các bản ghi trong bảng trung gian `brands_categories`.
     */
    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private Set<BrandCategory> brandCategories = new HashSet<>();

    /**
     * Danh sách liên kết với Model (Many-to-Many).
     * <p>
     * Quản lý các bản ghi trong bảng trung gian `models_categories`.
     */
    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private Set<ModelCategory> modelCategories = new HashSet<>();

    /**
     * Danh sách liên kết với Store (Many-to-Many).
     * <p>
     * Quản lý các bản ghi trong bảng trung gian `stores_categories`.
     */
    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private Set<StoreCategory> storeCategories = new HashSet<>();

    /**
     * Helper methods: Truy xuất nhanh danh sách các entity liên quan từ bảng trung
     * gian.
     * <p>
     * **Mục đích:**
     * - Hibernate chỉ mapping trực tiếp vào List<JoinEntity>.
     * - Các hàm này giúp lấy ra List<CoreEntity> (Product/Brand/...) để tiện sử
     * dụng
     * ở tầng Service/Controller mà không cần stream thủ công lặp lại.
     */
    @Transient
    public Set<Product> getProducts() {
        return productCategories.stream()
                .map(ProductCategory::getProduct)
                .collect(Collectors.toSet());
    }

    @Transient
    public Set<Brand> getBrands() {
        return brandCategories.stream()
                .map(BrandCategory::getBrand)
                .collect(Collectors.toSet());
    }

    @Transient
    public Set<Model> getModels() {
        return modelCategories.stream()
                .map(ModelCategory::getModel)
                .collect(Collectors.toSet());
    }

    @Transient
    public Set<Store> getStores() {
        return storeCategories.stream()
                .map(StoreCategory::getStore)
                .collect(Collectors.toSet());
    }
}
