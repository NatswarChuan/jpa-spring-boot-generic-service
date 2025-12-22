package com.example.demo.repository;

import com.example.demo.domain.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

/**
 * Repository cho Product.
 * <p>
 * Hỗ trợ các thao tác database với sản phẩm.
 * Có thể mở rộng thêm các query method (ví dụ: findByName,
 * findByPriceBetween...) nếu cần thiết,
 * tuy nhiên hiện tại đang tận dụng Specification cho các nhu cầu lọc phức tạp.
 */
@Repository
public interface ProductRepository extends JpaRepository<Product, Long>, JpaSpecificationExecutor<Product> {
}
