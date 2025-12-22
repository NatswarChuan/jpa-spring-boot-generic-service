package com.example.demo.repository;

import com.example.demo.domain.Brand;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

/**
 * Repository cho Brand.
 * <p>
 * Cung cấp các phương thức truy xuất dữ liệu từ database cho entity Brand.
 * Kế thừa {@link JpaRepository} cho các thao tác CRUD cơ bản.
 * Kế thừa {@link JpaSpecificationExecutor} để hỗ trợ tìm kiếm linh động theo
 * tiêu chí.
 */
@Repository
public interface BrandRepository extends JpaRepository<Brand, Long>, JpaSpecificationExecutor<Brand> {
}
