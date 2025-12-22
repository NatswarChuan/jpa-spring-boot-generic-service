package com.example.demo.service;

import com.example.demo.domain.Category;
import com.example.demo.repository.CategoryRepository;
import com.natswarchuan.genericservice.service.AbService;
import org.springframework.stereotype.Service;

import org.springframework.lang.NonNull;

/**
 * Service xử lý nghiệp vụ cho Category.
 * <p>
 * Kế thừa {@link AbService} giúp tận dụng logic CRUD có sẵn:
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
public class CategoryService extends AbService<Category, Long> {

    /**
     * Khởi tạo CategoryService.
     *
     * @param repository Repository truy xuất dữ liệu Category.
     */
    public CategoryService(@NonNull CategoryRepository repository) {
        super(repository);
    }
}
