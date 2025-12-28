package com.example.demo.service;

import com.example.demo.domain.Product;
import com.example.demo.repository.ProductRepository;
import com.natswarchuan.genericservice.repository.IRepository;
import com.natswarchuan.genericservice.service.IService;
import org.springframework.stereotype.Service;

import org.springframework.lang.NonNull;

/**
 * Service xử lý nghiệp vụ cho Product.
 * <p>
 * Quản lý các logic xoay quanh sản phẩm, implement {@link IService} để có sẵn
 * CRUD cơ bản qua default methods:
 * <ul>
 * <li>create: Tạo mới Product</li>
 * <li>findById: Tìm kiếm Product theo ID</li>
 * <li>update: Cập nhật Product</li>
 * <li>delete: Xóa Product</li>
 * <li>findAll: Tìm kiếm danh sách Product</li>
 * </ul>
 * Nếu cần validation phức tạp hoặc xử lý giao dịch đặc thù for Product, hãy cài
 * đặt tại đây.
 */
@Service
public class ProductService implements IService<Product, Long> {

    private final ProductRepository repository;

    /**
     * Khởi tạo ProductService.
     *
     * @param repository ProductRepository để thao tác DB.
     */
    public ProductService(@NonNull ProductRepository repository) {
        this.repository = repository;
    }

    @Override
    public IRepository<Product, Long> getRepository() {
        return repository;
    }
}
