package com.example.demo.controller;

import com.example.demo.domain.Brand;
import com.example.demo.dto.brand.BrandDetailRes;
import com.example.demo.dto.brand.BrandRes;
import com.example.demo.service.BrandService;
import com.natswarchuan.genericservice.controller.IReadDetailController;
import com.natswarchuan.genericservice.controller.IReadSummaryController;
import com.natswarchuan.genericservice.dto.IDto;
import com.natswarchuan.genericservice.service.IBaseService;

import org.springframework.lang.NonNull;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Controller quản lý thương hiệu (Brand).
 * <p>
 * Lớp này implement {@link IReadDetailController} và
 * {@link IReadSummaryController}
 * để chỉ cung cấp các thao tác đọc dữ liệu (Read-only). Các thao tác thay đổi
 * dữ liệu (Create, Update, Delete) bị hạn chế ở controller này.
 * </p>
 * Các endpoint có sẵn:
 * <ul>
 * <li>GET /api/v1/brands/{id}: Lấy chi tiết thương hiệu</li>
 * <li>GET /api/v1/brands: Lấy danh sách phân trang</li>
 * </ul>
 */
@RestController
@RequestMapping("/api/v1/brands")
public class BrandController implements IReadDetailController<Brand, Long>, IReadSummaryController<Brand, Long> {

    private final BrandService service;

    /**
     * Khởi tạo controller với service tương ứng.
     *
     * @param service Service xử lý nghiệp vụ cho Brand, được inject tự động bởi
     *                Spring.
     */
    public BrandController(BrandService service) {
        this.service = service;
    }

    @Override
    @SuppressWarnings("unchecked")
    public <S extends IBaseService<Brand, Long>> S getBaseService() {
        return (S) service;
    }

    /**
     * Định nghĩa lớp DTO dùng cho danh sách (summary view).
     * <p>
     * Phương thức này được {@link IController} sử dụng để map entity sang DTO khi
     * trả về danh sách.
     * Sử dụng {@link BrandRes} để chỉ trả về các thông tin cơ bản cần thiết cho
     * danh sách, giúp tối ưu hiệu năng.
     *
     * @return Class của DTO tóm tắt (BrandRes).
     */
    @Override
    public Class<? extends IDto<Brand>> getResponseSummaryDtoClass() {
        return BrandRes.class;
    }

    /**
     * Định nghĩa lớp DTO dùng cho chi tiết (detail view).
     * <p>
     * Phương thức này được {@link IController} sử dụng để map entity sang DTO khi
     * trả về chi tiết một bản ghi.
     * Sử dụng {@link BrandDetailRes} để trả về đầy đủ thông tin, bao gồm cả các
     * quan hệ (nếu có).
     *
     * @return Class của DTO chi tiết (BrandDetailRes).
     */
    @Override
    @NonNull
    public Class<? extends IDto<Brand>> getResponseDetailDtoClass() {
        return BrandDetailRes.class;
    }
}
