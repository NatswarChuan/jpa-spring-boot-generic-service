package com.example.demo.service;

import com.example.demo.domain.Product;
import com.example.demo.repository.ProductRepository;
import com.natswarchuan.genericservice.service.AbService;
import org.springframework.stereotype.Service;

import org.springframework.lang.NonNull;

/**
 * Service xử lý nghiệp vụ cho Product.
 * <p>
 * Quản lý các logic xoay quanh sản phẩm, kế thừa {@link AbService} để có sẵn
 * CRUD cơ bản:
 * <ul>
 * <li>create: Tạo mới Product</li>
 * <li>findById: Tìm kiếm Product theo ID</li>
 * <li>update: Cập nhật Product</li>
 * <li>delete: Xóa Product</li>
 * <li>findAll: Tìm kiếm danh sách Product</li>
 * </ul>
 * Nếu cần validation phức tạp hoặc xử lý giao dịch đặc thù cho Product, hãy cài
 * đặt tại đây.
 */
@Service
public class ProductService extends AbService<Product, Long> {

    /**
     * Khởi tạo ProductService.
     *
     * @param repository ProductRepository để thao tác DB.
     */
    public ProductService(@NonNull ProductRepository repository) {
        super(repository);
    }
}
