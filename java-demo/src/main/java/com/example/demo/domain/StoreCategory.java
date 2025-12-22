package com.example.demo.domain;

import jakarta.persistence.*;
import lombok.*;

/**
 * Entity bảng trung gian cho quan hệ Many-to-Many giữa Store và Category.
 */
@Entity
@Table(name = "store_categories", uniqueConstraints = {
                @UniqueConstraint(columnNames = { "store_id", "category_id" })
}, indexes = {
                // Index store_id: Tối ưu query "Lấy danh mục của cửa hàng X".
                @Index(name = "idx_store_cat_store", columnList = "store_id"),
                // Index category_id: Tối ưu query "Lấy cửa hàng bán danh mục Y".
                @Index(name = "idx_store_cat_category", columnList = "category_id")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StoreCategory {

        /**
         * ID của liên kết.
         */
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        /**
         * Store liên kết.
         */
        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "store_id", nullable = false)
        private Store store;

        /**
         * Category liên kết.
         */
        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "category_id", nullable = false)
        private Category category;
}
