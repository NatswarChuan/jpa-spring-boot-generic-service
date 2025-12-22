package com.example.demo.domain;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Nationalized;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * Entity đại diện cho Model (Dòng sản phẩm).
 */
@Entity
@Table(name = "models")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Model {

    /**
     * ID model.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * Tên Model.
     */
    @Nationalized
    @Column(nullable = false)
    private String name;

    /**
     * Năm sản xuất.
     */
    @Column(name = "model_year")
    private Integer year;

    /**
     * Danh sách Brand liên kết với Model này.
     * <p>
     * Quan hệ One-to-Many: Một Model có thể có nhiều Brand.
     * - `mappedBy = "model"`: Field `model` bên entity `Brand` giữ khóa ngoại.
     * - `cascade = CascadeType.ALL`: Thao tác cascade từ Model sang Brand.
     */
    @OneToMany(mappedBy = "model", cascade = CascadeType.ALL)
    @Builder.Default
    private Set<Brand> brands = new HashSet<>();

    /**
     * Danh sách Category liên kết (Many-to-Many).
     * <p>
     * Quan hệ Many-to-Many với Category thông qua entity trung gian
     * `ModelCategory`.
     */
    @OneToMany(mappedBy = "model", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private Set<ModelCategory> modelCategories = new HashSet<>();

    /**
     * Helper method: Lấy list Category.
     */
    @Transient
    public Set<Category> getCategories() {
        return modelCategories.stream()
                .map(ModelCategory::getCategory)
                .collect(Collectors.toSet());
    }

    /**
     * Helper method: Set Categories bằng ID.
     * <p>
     * **Logic cập nhật an toàn:**
     * 1. {@code clear()}: Xóa referene cũ -> Kích hoạt orphanRemoval -> Xóa records
     * cũ trong DB.
     * 2. {@code addAll()}: Thêm reference mới -> Kích hoạt persist -> Thêm records
     * mới.
     * - Nếu gán đè ({@code = newSet}), Hibernate sẽ mất tracking và không xóa được
     * records cũ (gây lỗi foreign key hoặc rác dữ liệu).
     */
    @Transient
    public void setCategoryIds(Set<Long> categoryIds) {
        if (this.modelCategories == null) {
            this.modelCategories = new HashSet<>();
        }
        this.modelCategories.clear();
        if (categoryIds != null) {
            this.modelCategories.addAll(categoryIds.stream()
                    .map(catId -> ModelCategory.builder()
                            .model(this)
                            .category(Category.builder().id(catId).build())
                            .build())
                    .collect(Collectors.toSet()));
        }
    }

    /**
     * Helper method: Set Categories bằng Object.
     */
    @Transient
    public void setCategories(Set<Category> categories) {
        if (this.modelCategories == null) {
            this.modelCategories = new HashSet<>();
        }
        this.modelCategories.clear();
        if (categories != null) {
            this.modelCategories.addAll(categories.stream()
                    .map(cat -> ModelCategory.builder()
                            .model(this)
                            .category(cat)
                            .build())
                    .collect(Collectors.toSet()));
        }
    }
}
