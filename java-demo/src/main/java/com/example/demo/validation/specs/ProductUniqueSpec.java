package com.example.demo.validation.specs;

import com.example.demo.domain.Product;
import com.example.demo.dto.product.ProductCreateReq;
import com.natswarchuan.genericservice.validation.SpecificationLoader;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

/**
 * Loader tạo Specification kiểm tra trùng lặp Product.
 * <p>
 * **Tại sao cần lớp này?**
 * - Validation cơ bản như `@Unique` chỉ check trên 1 field đơn lẻ (ví dụ: name
 * unique toàn hệ thống).
 * - Trong nghiệp vụ thực tế, ràng buộc unique thường phức tạp hơn (Composite
 * Key).
 * - Ví dụ: "Sản phẩm A" có thể tồn tại ở "Cửa hàng 1" và "Cửa hàng 2", nhưng
 * "Cửa hàng 1" không được có 2 "Sản phẩm A".
 * <p>
 * **Cơ chế hoạt động:**
 * - Implement {@link SpecificationLoader}: Interface này giúp DTO cung cấp
 * logic tạo query động.
 * - `@DtoSpecValidation` (trong DTO) sẽ gọi lớp này để lấy Specification.
 * - Specification trả về sẽ được dùng để query `count > 0` -> Nếu có record ->
 * Vi phạm Unique rule.
 */
@Component
public class ProductUniqueSpec implements SpecificationLoader<ProductCreateReq, Product> {

    /**
     * Tạo Specification từ request.
     * <p>
     * Logic chi tiết:
     * 1. Lấy `name` và `storeId` từ request.
     * 2. Tạo query: WHERE product.name = ? AND product.store_id = ?
     * 3. Query này tìm xem "đã có sản phẩm nào cùng tên trong cùng cửa hàng chưa".
     *
     * @param value request (ProductCreateReq).
     * @return Specification check unique (composite: name + store).
     */
    @Override
    public Specification<Product> getSpecification(ProductCreateReq... value) {
        if (value == null || value.length == 0) {
            return null;
        }
        ProductCreateReq req = value[0];

        return (root, query, cb) -> cb.and(
                cb.equal(root.get("name"), req.getName()),
                cb.equal(root.get("store").get("id"), req.getStoreId()));
    }
}
