package com.example.demo.dto.product;

import java.math.BigDecimal;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.BeanUtils;

import com.example.demo.domain.Brand;
import com.example.demo.domain.Model;
import com.example.demo.domain.Product;
import com.example.demo.domain.Store;
import com.natswarchuan.genericservice.dto.IDto;
import com.natswarchuan.genericservice.validation.Exists;
import com.natswarchuan.genericservice.validation.SpecValidation;
import com.natswarchuan.genericservice.validation.DtoSpecValidation;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import com.example.demo.domain.Category;
import com.example.demo.validation.specs.IdsInSpecLoader;
import com.example.demo.validation.specs.ProductUniqueSpec;

/**
 * DTO tạo mới Product.
 */
@Data
@DtoSpecValidation(loader = ProductUniqueSpec.class, message = "Product with this name already exists in the selected store")
public class ProductCreateReq implements IDto<Product> {

    /**
     * Tên sản phẩm, bắt buộc.
     */
    @NotBlank(message = "Name is required")
    private String name;

    /**
     * Giá sản phẩm, phải không âm.
     */
    @DecimalMin(value = "0.0", message = "Price must be non-negative")
    private BigDecimal price;

    /**
     * Brand liên kết (bắt buộc tồn tại).
     */
    @Exists(entity = Brand.class)
    private Long brandId;

    /**
     * Model liên kết (bắt buộc tồn tại).
     */
    @Exists(entity = Model.class)
    private Long modelId;

    /**
     * Store liên kết (bắt buộc tồn tại).
     */
    @Exists(entity = Store.class)
    private Long storeId;

    /**
     * Danh sách Category liên kết (nếu có).
     */
    @SpecValidation(entity = Category.class, loader = IdsInSpecLoader.class, message = "Given categories do not exist")
    private Set<Long> categoryIds;

    /**
     * Chuyển đổi sang Entity.
     * <p>
     * Tại sao lại triển khai như vậy?
     * 1. Sử dụng {@link BeanUtils#copyProperties} giúp giảm bớt code map thủ công
     * cho các field đơn giản.
     * 2. Tuy nhiên, với field quan hệ phức tạp như `categoryIds`, `copyProperties`
     * không thể tự động
     * chuyển đổi từ `Set<Long>` sang `Set<Category>`.
     * 3. Do đó, ta cần viết logic thủ công: bỏ qua copy field `categoryIds`, sau đó
     * xử lý stream
     * để tạo đối tượng Category từ ID và gán vào entity.
     *
     * @return Product entity.
     */
    @Override
    public Product toEntity() {
        Product product = new Product();
        BeanUtils.copyProperties(this, product, "categoryIds");
        if (this.categoryIds != null) {
            Set<Category> categories = this.categoryIds.stream()
                    .map(id -> Category.builder().id(id).build())
                    .collect(Collectors.toSet());
            product.setCategories(categories);
        }
        return product;
    }
}
