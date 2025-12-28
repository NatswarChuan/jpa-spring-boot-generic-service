package com.example.demo.service;

import com.example.demo.domain.Model;
import com.example.demo.repository.ModelRepository;
import com.natswarchuan.genericservice.repository.IRepository;
import com.natswarchuan.genericservice.service.IService;
import org.springframework.stereotype.Service;

import org.springframework.lang.NonNull;

/**
 * Service xử lý nghiệp vụ cho Model.
 * <p>
 * Đóng vai trò lớp logic trung gian, implement {@link IService} để giảm thiểu
 * code lặp lại qua default methods.
 * Các phương thức chính:
 * <ul>
 * <li>create: Tạo mới Model</li>
 * <li>findById: Tìm kiếm Model theo ID</li>
 * <li>update: Cập nhật Model</li>
 * <li>delete: Xóa Model</li>
 * <li>findAll: Tìm kiếm danh sách Model</li>
 * </ul>
 */
@Service
public class ModelService implements IService<Model, Long> {

    private final ModelRepository repository;

    /**
     * Khởi tạo ModelService.
     *
     * @param repository Repository truy xuất dữ liệu Model.
     */
    public ModelService(@NonNull ModelRepository repository) {
        this.repository = repository;
    }

    @Override
    public IRepository<Model, Long> getRepository() {
        return repository;
    }
}
