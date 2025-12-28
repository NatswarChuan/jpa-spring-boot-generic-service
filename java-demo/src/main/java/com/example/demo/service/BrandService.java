package com.example.demo.service;

import com.example.demo.domain.Brand;
import com.example.demo.repository.BrandRepository;
import com.natswarchuan.genericservice.repository.IRepository;
import com.natswarchuan.genericservice.service.IReadDetailService;
import com.natswarchuan.genericservice.service.IReadSummaryService;
import com.natswarchuan.genericservice.service.IService;
import org.springframework.stereotype.Service;

import org.springframework.lang.NonNull;

/**
 * Service xử lý nghiệp vụ cho Brand.
 * <p>
 * Implement {@link IService} từ thư viện java-core để có sẵn các phương thức
 * nghiệp vụ chuẩn qua default methods:
 * <ul>
 * <li>create: Tạo mới entity</li>
 * <li>findById: Tìm kiếm theo ID</li>
 * <li>update: Cập nhật entity</li>
 * <li>delete: Xóa entity</li>
 * <li>findAll: Tìm kiếm danh sách (có phân trang)</li>
 * </ul>
 * Service này đóng vai trò cầu nối giữa Controller và Repository, nơi chứa các
 * logic validation hoặc xử lý dữ liệu (nếu có).
 */
@Service
public class BrandService implements IReadDetailService<Brand, Long>, IReadSummaryService<Brand, Long> {

    private final BrandRepository repository;

    /**
     * Khởi tạo BrandService.
     *
     * @param repository Repository truy xuất dữ liệu Brand.
     */
    public BrandService(@NonNull BrandRepository repository) {
        this.repository = repository;
    }

    @Override
    public IRepository<Brand, Long> getRepository() {
        return repository;
    }
}
