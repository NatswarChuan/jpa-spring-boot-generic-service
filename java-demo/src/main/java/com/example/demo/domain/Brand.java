package com.example.demo.domain;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Nationalized;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * Entity đại diện cho Thương hiệu (Brand).
 */
@Entity
@Table(name = "brands")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Brand {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * Tên thương hiệu.
     */
    @Nationalized
    @Column(nullable = false)
    private String name;

    /**
     * Mô tả thương hiệu.
     */
    @Column
    private String description;

    /**
     * Model liên kết với Brand này.
     * <p>
     * Quan hệ Many-to-One: Nhiều Brand có thể thuộc về một Model (ví dụ logic
     * nghiệp vụ).
     * FetchType.LAZY: Tải lười dữ liệu Model.
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "model_id")
    private Model model;

    /**
     * Danh sách Categories liên kết với Brand này.
     * <p>
     * Quan hệ Many-to-Many: Một Brand có thể thuộc nhiều Category và ngược lại.
     * Hiện thực thông qua entity trung gian `BrandCategory`.
     * <p>
     * Các thuộc tính cascade và orphanRemoval đảm bảo tính toàn vẹn dữ liệu của
     * bảng trung gian
     * khi cập nhật danh sách này từ phía Brand.
     */
    @OneToMany(mappedBy = "brand", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private Set<BrandCategory> brandCategories = new HashSet<>();

    /**
     * Helper method: Lấy danh sách Category objects trực tiếp từ bảng trung gian.
     *
     * @return Set các Category.
     */
    @Transient
    public Set<Category> getCategories() {
        return brandCategories.stream()
                .map(BrandCategory::getCategory)
                .collect(Collectors.toSet());
    }

    /**
     * Helper method: Set Model thông qua ID.
     *
     * @param modelId ID của model.
     */
    @Transient
    public void setModelId(Long modelId) {
        if (modelId != null) {
            this.model = Model.builder().id(modelId).build();
        }
    }

    /**
     * Helper method: Cập nhật danh sách Categories thông qua danh sách IDs.
     * <p>
     * Tại sao phải dùng `clear()` và `addAll()`?
     * - Để đảm bảo Hibernate theo dõi được sự thay đổi của collection
     * (PersistentSet).
     * - Nếu gán đè (`this.brandCategories = ...`), Hibernate có thể coi là mất tham
     * chiếu
     * và thực hiện xóa/thêm không đúng dự kiến (liên quan đến orphanRemoval).
     *
     * @param categoryIds Danh sách ID category mới.
     */
    @Transient
    public void setCategoryIds(Set<Long> categoryIds) {
        if (this.brandCategories == null) {
            this.brandCategories = new HashSet<>();
        }
        this.brandCategories.clear();
        if (categoryIds != null) {
            this.brandCategories.addAll(categoryIds.stream()
                    .map(catId -> BrandCategory.builder()
                            .brand(this)
                            .category(Category.builder().id(catId).build())
                            .build())
                    .collect(Collectors.toSet()));
        }
    }

    /**
     * Helper method: Cập nhật danh sách Categories thông qua danh sách objects.
     *
     * @param categories Danh sách Category mới.
     */
    @Transient
    public void setCategories(Set<Category> categories) {
        if (this.brandCategories == null) {
            this.brandCategories = new HashSet<>();
        }
        this.brandCategories.clear();
        if (categories != null) {
            this.brandCategories.addAll(categories.stream()
                    .map(cat -> BrandCategory.builder()
                            .brand(this)
                            .category(cat)
                            .build())
                    .collect(Collectors.toSet()));
        }
    }
}
