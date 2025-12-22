package com.example.demo.service;

import com.example.demo.domain.Store;
import com.example.demo.repository.StoreRepository;
import com.natswarchuan.genericservice.service.AbService;
import org.springframework.stereotype.Service;

import org.springframework.lang.NonNull;

/**
 * Service xử lý nghiệp vụ cho Store.
 * <p>
 * Kế thừa {@link AbService}, cung cấp các chức năng quản lý cửa hàng chuẩn hóa:
 * <ul>
 * <li>create: Tạo mới Store</li>
 * <li>findById: Tìm kiếm Store theo ID</li>
 * <li>update: Cập nhật Store</li>
 * <li>delete: Xóa Store</li>
 * <li>findAll: Tìm kiếm danh sách Store</li>
 * </ul>
 */
@Service
public class StoreService extends AbService<Store, Long> {

    /**
     * Khởi tạo StoreService.
     *
     * @param repository Repository truy xuất dữ liệu Store.
     */
    public StoreService(@NonNull StoreRepository repository) {
        super(repository);
    }
}
