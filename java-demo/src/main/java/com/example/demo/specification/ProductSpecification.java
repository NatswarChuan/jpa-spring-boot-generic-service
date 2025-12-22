package com.example.demo.specification;

import com.example.demo.domain.Brand;
import com.example.demo.domain.Product;
import com.example.demo.dto.product.ProductFilterParam;
import com.natswarchuan.genericservice.specification.GenericSpecification;
import jakarta.persistence.criteria.*;

import java.util.ArrayList;
import java.util.List;

/**
 * Specification tùy chỉnh cho Product.
 * <p>
 * **Mục đích:**
 * - Xử lý các logic lọc nâng cao mà `GenericSpecification` (lọc bình đẳng
 * field) chưa hỗ trợ đủ.
 * - Cụ thể: Lọc theo khoảng giá (Price Range) và Tìm kiếm theo tên Brand (Join
 * Query).
 * <p>
 * **Tại sao triển khai như vậy? (Why & How):**
 * 1. Kế thừa {@link GenericSpecification}: Để tận dụng logic lọc cơ bản có sẵn
 * (ví dụ lọc theo name, status...).
 * 2. Override `toPredicate`:
 * - Gọi `super.toPredicate` để lấy các điều kiện lọc cơ bản.
 * - Tạo thêm các `Predicate` thủ công cho `minPrice`, `maxPrice` (dùng
 * `greaterThan`, `lessThan`).
 * - Sử dụng `root.join("brand")` để query sang bảng Brand, giúp lọc Product
 * theo tên Brand.
 * 3. Kết hợp tất cả bằng `criteriaBuilder.and(...)`.
 */
public class ProductSpecification extends GenericSpecification<Product> {

    /**
     * Tham số lọc đầu vào.
     * <p>
     * Chứa các thông tin filter như minPrice, maxPrice, brandName...
     */
    private final ProductFilterParam productParam;

    /**
     * Constructor.
     *
     * @param requestParam Object chứa tham số lọc từ Controller (Query Params).
     */
    public ProductSpecification(ProductFilterParam requestParam) {
        super(requestParam);
        this.productParam = requestParam;
    }

    /**
     * Tạo câu query (Predicate) dựa trên tham số lọc.
     * <p>
     * **Logic chi tiết:**
     * 1. Lấy Predicate cơ bản từ {@code super.toPredicate} (search chung, soft
     * delete...).
     * 2. Kiểm tra {@code minPrice}: Nếu có -> thêm điều kiện
     * {@code price >= minPrice}.
     * 3. Kiểm tra {@code maxPrice}: Nếu có -> thêm điều kiện
     * {@code price <= maxPrice}.
     * 4. Kiểm tra {@code brandName}: Nếu có -> JOIN bảng Brand -> filter LIKE theo
     * tên Brand.
     *
     * @param root            Root object (Product).
     * @param query           CriteriaQuery.
     * @param criteriaBuilder Builder để tạo các mệnh đề.
     * @return Predicate tổng hợp (AND logic).
     */
    @Override
    public Predicate toPredicate(Root<Product> root, CriteriaQuery<?> query,
            CriteriaBuilder criteriaBuilder) {
        Predicate basePredicate = super.toPredicate(root, query, criteriaBuilder);

        List<Predicate> predicates = new ArrayList<>();
        predicates.add(basePredicate);

        if (productParam.getMinPrice() != null) {
            predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("price"), productParam.getMinPrice()));
        }
        if (productParam.getMaxPrice() != null) {
            predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("price"), productParam.getMaxPrice()));
        }

        if (productParam.getBrandName() != null && !productParam.getBrandName().isEmpty()) {
            Join<Product, Brand> brandJoin = root.join("brand", JoinType.INNER);
            predicates.add(criteriaBuilder.like(
                    criteriaBuilder.lower(brandJoin.get("name")),
                    "%" + productParam.getBrandName().toLowerCase() + "%"));
        }

        return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
    }
}
