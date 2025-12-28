package com.example.demo.repository;

import com.example.demo.domain.Category;
import com.natswarchuan.genericservice.repository.IRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository cho Category.
 * <p>
 * Quản lý truy xuất dữ liệu cho bảng categories.
 */
@Repository
public interface CategoryRepository extends IRepository<Category, Long> {
}
