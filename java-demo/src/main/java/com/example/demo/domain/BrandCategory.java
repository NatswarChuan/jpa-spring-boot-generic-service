package com.example.demo.domain;

import jakarta.persistence.*;
import lombok.*;

/**
 * Entity bảng trung gian cho quan hệ Many-to-Many giữa Brand và Category.
 */
@Entity
@Table(name = "brand_categories", uniqueConstraints = {
                @UniqueConstraint(columnNames = { "brand_id", "category_id" })
}, indexes = {
                // Index cho brand_id để tối ưu hóa việc query các Category của một Brand.
                @Index(name = "idx_brand_cat_brand", columnList = "brand_id"),
                // Index cho category_id để tối ưu hóa việc query các Brand thuộc một Category.
                @Index(name = "idx_brand_cat_category", columnList = "category_id")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BrandCategory {

        /**
         * ID của liên kết.
         */
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        /**
         * Brand liên kết.
         */
        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "brand_id", nullable = false)
        private Brand brand;

        /**
         * Category liên kết.
         */
        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "category_id", nullable = false)
        private Category category;
}
