package com.example.demo.domain;

import jakarta.persistence.*;
import lombok.*;

/**
 * Entity bảng trung gian cho quan hệ Many-to-Many giữa Model và Category.
 */
@Entity
@Table(name = "model_categories", uniqueConstraints = {
                @UniqueConstraint(columnNames = { "model_id", "category_id" })
}, indexes = {
                // Index cho model_id giúp tăng tốc độ tìm kiếm Category theo Model.
                @Index(name = "idx_model_cat_model", columnList = "model_id"),
                // Index cho category_id giúp tăng tốc độ tìm kiếm Model theo Category.
                @Index(name = "idx_model_cat_category", columnList = "category_id")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ModelCategory {

        /**
         * ID của liên kết.
         */
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        /**
         * Model liên kết.
         */
        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "model_id", nullable = false)
        private Model model;

        /**
         * Category liên kết.
         */
        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "category_id", nullable = false)
        private Category category;
}
