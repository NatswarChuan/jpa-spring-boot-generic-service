package com.example.demo.controller;

import com.example.demo.domain.Category;
import com.example.demo.dto.category.CategoryDetailRes;
import com.example.demo.dto.category.CategoryRes;
import com.example.demo.dto.category.CategoryCreateReq;
import com.example.demo.dto.category.CategoryUpdateReq;
import com.example.demo.service.CategoryService;
import com.natswarchuan.genericservice.controller.IController;
import com.natswarchuan.genericservice.dto.IDto;
import com.natswarchuan.genericservice.service.IBaseService;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Controller quản lý Danh mục (Category).
 * <p>
 * Implement {@link IController} để có sẵn các API CRUD chuẩn cho entity
 * Category thông qua các default methods.
 * Các endpoint mặc định bao gồm:
 * <ul>
 * <li>POST /api/v1/categories: Tạo mới Category</li>
 * <li>GET /api/v1/categories/{id}: Xem chi tiết Category</li>
 * <li>PUT /api/v1/categories/{id}: Cập nhật Category</li>
 * <li>DELETE /api/v1/categories/{id}: Xóa Category</li>
 * <li>GET /api/v1/categories: Xem danh sách Category (có phân trang)</li>
 * </ul>
 * Giúp giảm thiểu code boilerplate khi phát triển API.
 */
@RestController
@RequestMapping("/api/v1/categories")
public class CategoryController implements IController<Category, Long, CategoryCreateReq, CategoryUpdateReq> {

    private final CategoryService service;

    /**
     * Khởi tạo controller với CategoryService.
     *
     * @param service Service được inject bởi Spring để xử lý nghiệp vụ.
     */
    public CategoryController(CategoryService service) {
        this.service = service;
    }

    @Override
    @SuppressWarnings("unchecked")
    public <S extends IBaseService<Category, Long>> S getBaseService() {
        return (S) service;
    }

    /**
     * Chỉ định DTO dùng cho phản hồi dạng danh sách.
     * {@link CategoryRes} chứa ít trường hơn so với entity đầy đủ, giúp response
     * nhẹ hơn.
     *
     * @return Class của CategoryRes.
     */
    @Override
    public Class<? extends IDto<Category>> getResponseSummaryDtoClass() {
        return CategoryRes.class;
    }

    /**
     * Chỉ định DTO dùng cho phản hồi chi tiết.
     * {@link CategoryDetailRes} có thể chứa thêm thông tin chi tiết hoặc các danh
     * sách con.
     *
     * @return Class của CategoryDetailRes.
     */
    @Override
    @NonNull
    public Class<? extends IDto<Category>> getResponseDetailDtoClass() {
        return CategoryDetailRes.class;
    }
}
