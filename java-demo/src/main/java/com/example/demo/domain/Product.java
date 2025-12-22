package com.example.demo.domain;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Nationalized;

import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * Entity đại diện cho Sản phẩm (Product).
 * <p>
 * Đây là entity trung tâm, có liên kết với nhiều entity khác như Brand, Model,
 * Store, Category.
 */
@Entity
@Table(name = "products", indexes = {
        @Index(name = "idx_product_brand", columnList = "brand_id"),
        @Index(name = "idx_product_model", columnList = "model_id"),
        @Index(name = "idx_product_store", columnList = "store_id")
})
/**
 * Lý giải về việc đánh Index (@Index):
 * <p>
 * 1. columnList = "brand_id": Product thường xuyên được tìm kiếm hoặc join theo
 * Brand.
 * Việc đánh index giúp tối ưu tốc độ truy vấn SELECT * FROM products WHERE
 * brand_id = ?.
 * <p>
 * 2. columnList = "model_id": Tương tự, tối ưu cho các query lọc theo Model.
 * <p>
 * 3. columnList = "store_id": Tương tự, tối ưu cho các query lọc theo Store.
 * <p>
 * Lưu ý: Index giúp đọc nhanh hơn nhưng làm chậm thao tác ghi
 * (INSERT/UPDATE/DELETE)
 * do phải cập nhật cây index. Tuy nhiên với bảng Product, tần suất đọc thường
 * nhiều
 * hơn ghi nên index là cần thiết.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * Tên sản phẩm.
     */
    @Nationalized
    @Column(nullable = false)
    private String name;

    /**
     * Giá sản phẩm.
     */
    @Column(precision = 19, scale = 4)
    private BigDecimal price;

    /**
     * Brand liên kết với sản phẩm này.
     * <p>
     * Quan hệ Many-to-One: Một Brand có nhiều Product, nhưng một Product chỉ thuộc
     * về một Brand.
     * Sử dụng FetchType.LAZY để chỉ load dữ liệu Brand khi cần thiết (hiệu năng).
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "brand_id")
    private Brand brand;

    /**
     * Model liên kết với sản phẩm này.
     * <p>
     * Quan hệ Many-to-One: Một Model có nhiều Product.
     * FetchType.LAZY: Lazy loading.
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "model_id")
    private Model model;

    /**
     * Store liên kết với sản phẩm này.
     * <p>
     * Quan hệ Many-to-One: Một Store có thể bán nhiều Product.
     * FetchType.LAZY: Lazy loading.
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "store_id")
    private Store store;

    /**
     * Danh sách các Category mà sản phẩm này thuộc về.
     * <p>
     * Quan hệ Many-to-Many được hiện thực hóa thông qua entity trung gian
     * `ProductCategory`.
     * <p>
     * - `mappedBy = "product"`: Field `product` trong `ProductCategory` sở hữu quan
     * hệ này.
     * - `cascade = CascadeType.ALL`: Mọi thao tác (Persist, Merge, Remove...) trên
     * Product sẽ được lan truyền sang ProductCategory.
     * - `orphanRemoval = true`: Nếu một ProductCategory bị xóa khỏi Set này, nó sẽ
     * bị xóa khỏi database.
     */
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private Set<ProductCategory> productCategories = new HashSet<>();

    /**
     * Helper method: Lấy list Category.
     */
    @Transient
    public Set<Category> getCategories() {
        return productCategories.stream()
                .map(ProductCategory::getCategory)
                .collect(Collectors.toSet());
    }

    /**
     * Helper method: Set Brand ID.
     */
    @Transient
    public void setBrandId(Long brandId) {
        if (brandId != null) {
            this.brand = Brand.builder().id(brandId).build();
        }
    }

    /**
     * Helper method: Set Model ID.
     */
    @Transient
    public void setModelId(Long modelId) {
        if (modelId != null) {
            this.model = Model.builder().id(modelId).build();
        }
    }

    /**
     * Helper method: Set Store ID.
     */
    @Transient
    public void setStoreId(Long storeId) {
        if (storeId != null) {
            this.store = Store.builder().id(storeId).build();
        }
    }

    /**
     * Helper method: Set Categories bằng IDs.
     * <p>
     * Tại sao lại implement như vậy?
     * 1. Hibernate theo dõi các collection (PersistentSet). Nếu ta gán
     * `this.productCategories = newSet`,
     * Hibernate sẽ coi đó là một collection hoàn toàn mới và có thể gây lỗi
     * `orphanRemoval` hoặc
     * không tracking được các thay đổi đúng cách.
     * 2. Giải pháp: Ta giữ nguyên tham chiếu của collection hiện tại
     * (`this.productCategories`),
     * sau đó dùng `clear()` để xóa hết phần tử cũ và `addAll()` để thêm phần tử
     * mới.
     * 3. Điều này đảm bảo Hibernate nhận biết chính xác các record nào bị xóa và
     * record nào được thêm vào
     * trong bảng trung gian `products_categories`.
     */
    @Transient
    public void setCategoryIds(Set<Long> categoryIds) {
        if (this.productCategories == null) {
            this.productCategories = new HashSet<>();
        }
        this.productCategories.clear();
        if (categoryIds != null) {
            this.productCategories.addAll(categoryIds.stream()
                    .map(catId -> ProductCategory.builder()
                            .product(this)
                            .category(Category.builder().id(catId).build())
                            .build())
                    .collect(Collectors.toSet()));
        }
    }

    /**
     * Helper method: Set Categories bằng Objects.
     * <p>
     * Tương tự logic của `setCategoryIds`. Sử dụng cơ chế `clear` + `addAll` để tôn
     * trọng
     * sự quản lý của Hibernate đối với PersistentCollection.
     */
    @Transient
    public void setCategories(Set<Category> categories) {
        if (this.productCategories == null) {
            this.productCategories = new HashSet<>();
        }
        this.productCategories.clear();
        if (categories != null) {
            this.productCategories.addAll(categories.stream()
                    .map(cat -> ProductCategory.builder()
                            .product(this)
                            .category(cat)
                            .build())
                    .collect(Collectors.toSet()));
        }
    }
}
