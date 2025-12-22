package com.example.demo.domain;

import jakarta.persistence.*;
import lombok.*;

/**
 * Entity bảng trung gian cho quan hệ Many-to-Many giữa Product và Category.
 * <p>
 * Sử dụng entity thay vì @ManyToMany trực tiếp để có thể mở rộng thêm cột (ví
 * dụ: ngày tạo liên kết, thứ tự ưu tiên) sau này.
 * Đảm bảo tính duy nhất của cặp (product_id, category_id).
 */
@Entity
@Table(name = "product_categories", uniqueConstraints = {
                @UniqueConstraint(columnNames = { "product_id", "category_id" })
}, indexes = {
                // Index product_id: Truy xuất nhanh danh mục của sản phẩm.
                @Index(name = "idx_product_cat_product", columnList = "product_id"),
                // Index category_id: Truy xuất nhanh danh sách sản phẩm thuộc danh mục.
                @Index(name = "idx_product_cat_category", columnList = "category_id")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductCategory {

        /**
         * ID của liên kết.
         */
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        /**
         * Product liên kết.
         */
        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "product_id", nullable = false)
        private Product product;

        /**
         * Category liên kết.
         */
        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "category_id", nullable = false)
        private Category category;
}
