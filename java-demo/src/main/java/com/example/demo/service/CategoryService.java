package com.example.demo.service;

import com.example.demo.domain.Category;
import com.example.demo.repository.CategoryRepository;
import com.natswarchuan.genericservice.repository.IRepository;
import com.natswarchuan.genericservice.service.IService;
import org.springframework.stereotype.Service;

import org.springframework.lang.NonNull;

/**
 * Service xử lý nghiệp vụ cho Category.
 * <p>
 * Implement {@link IService} giúp tận dụng logic CRUD có sẵn qua default
 * methods:
 * <ul>
 * <li>create: Tạo mới Category</li>
 * <li>findById: Tìm kiếm Category theo ID</li>
 * <li>update: Cập nhật thông tin Category</li>
 * <li>delete: Xóa Category</li>
 * <li>findAll: Tìm kiếm danh sách Category (có phân trang)</li>
 * </ul>
 * Các logic đặc thù cho Category có thể được thêm vào đây.
 */
@Service
public class CategoryService implements IService<Category, Long> {

    private final CategoryRepository repository;

    /**
     * Khởi tạo CategoryService.
     *
     * @param repository Repository truy xuất dữ liệu Category.
     */
    public CategoryService(@NonNull CategoryRepository repository) {
        this.repository = repository;
    }

    @Override
    public IRepository<Category, Long> getRepository() {
        return repository;
    }
}
