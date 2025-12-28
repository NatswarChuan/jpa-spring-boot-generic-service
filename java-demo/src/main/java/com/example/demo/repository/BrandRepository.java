package com.example.demo.repository;

import com.example.demo.domain.Brand;
import com.natswarchuan.genericservice.repository.IRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository cho Brand.
 * <p>
 * Cung cấp các phương thức truy xuất dữ liệu từ database cho entity Brand.
 * Kế thừa {@link IRepository} cho các thao tác CRUD và Specification.
 */
@Repository
public interface BrandRepository extends IRepository<Brand, Long> {
}
