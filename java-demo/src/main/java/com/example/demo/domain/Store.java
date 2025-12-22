package com.example.demo.domain;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Nationalized;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * Entity đại diện cho Store (Cửa hàng).
 */
@Entity
@Table(name = "stores")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Store {

    /**
     * ID cửa hàng.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * Tên cửa hàng.
     */
    @Nationalized
    @Column(nullable = false)
    private String name;

    /**
     * Địa chỉ cửa hàng.
     */
    @Column
    private String address;

    /**
     * Danh sách Category liên kết (Many-to-Many).
     * <p>
     * Quan hệ Many-to-Many với Category thông qua entity trung gian
     * `StoreCategory`.
     * Sử dụng join entity để quản lý linh hoạt hơn.
     */
    @OneToMany(mappedBy = "store", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private Set<StoreCategory> storeCategories = new HashSet<>();

    /**
     * Helper method: Lấy list Category của store.
     */
    @Transient
    public Set<Category> getCategories() {
        return storeCategories.stream()
                .map(StoreCategory::getCategory)
                .collect(Collectors.toSet());
    }

    /**
     * Helper method: Set Categories cho store bằng ID.
     * <p>
     * Logic cập nhật an toàn:
     * 1. Kiểm tra null.
     * 2. Clear danh sách hiện tại.
     * 3. AddAll từ danh sách ID mới (chuyển đổi sang StoreCategory entity).
     */
    @Transient
    public void setCategoryIds(Set<Long> categoryIds) {
        if (this.storeCategories == null) {
            this.storeCategories = new HashSet<>();
        }
        this.storeCategories.clear();
        if (categoryIds != null) {
            this.storeCategories.addAll(categoryIds.stream()
                    .map(catId -> StoreCategory.builder()
                            .store(this)
                            .category(Category.builder().id(catId).build())
                            .build())
                    .collect(Collectors.toSet()));
        }
    }

    /**
     * Helper method: Set Categories cho store bằng Object.
     */
    @Transient
    public void setCategories(Set<Category> categories) {
        if (this.storeCategories == null) {
            this.storeCategories = new HashSet<>();
        }
        this.storeCategories.clear();
        if (categories != null) {
            this.storeCategories.addAll(categories.stream()
                    .map(cat -> StoreCategory.builder()
                            .store(this)
                            .category(cat)
                            .build())
                    .collect(Collectors.toSet()));
        }
    }
}
