package com.example.demo.service;

import com.example.demo.domain.Model;
import com.example.demo.repository.ModelRepository;
import com.natswarchuan.genericservice.service.AbService;
import org.springframework.stereotype.Service;

import org.springframework.lang.NonNull;

/**
 * Service xử lý nghiệp vụ cho Model.
 * <p>
 * Đóng vai trò lớp logic trung gian, kế thừa từ {@link AbService} để giảm thiểu
 * code lặp lại.
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
public class ModelService extends AbService<Model, Long> {

    /**
     * Khởi tạo ModelService.
     *
     * @param repository Repository truy xuất dữ liệu Model.
     */
    public ModelService(@NonNull ModelRepository repository) {
        super(repository);
    }
}
