package com.example.demo.controller;

import com.example.demo.domain.Brand;
import com.example.demo.dto.brand.BrandCreateReq;
import com.example.demo.dto.brand.BrandDetailRes;
import com.example.demo.dto.brand.BrandRes;
import com.example.demo.dto.brand.BrandUpdateReq;
import com.example.demo.service.BrandService;
import com.natswarchuan.genericservice.controller.AbController;
import com.natswarchuan.genericservice.dto.IDto;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Controller quản lý thương hiệu (Brand).
 * <p>
 * Lớp này kế thừa từ {@link AbController} của thư viện java-core, giúp tự động
 * hóa các thao tác CRUD cơ bản.
 * Bằng cách kế thừa, chúng ta không cần viết lại các endpoint như:
 * <ul>
 * <li>POST /api/v1/brands: Tạo mới thương hiệu</li>
 * <li>GET /api/v1/brands/{id}: Lấy chi tiết thương hiệu</li>
 * <li>PUT /api/v1/brands/{id}: Cập nhật thương hiệu</li>
 * <li>DELETE /api/v1/brands/{id}: Xóa thương hiệu</li>
 * <li>GET /api/v1/brands: Lấy danh sách phân trang</li>
 * </ul>
 */
@RestController
@RequestMapping("/api/v1/brands")
public class BrandController extends AbController<Brand, Long, BrandCreateReq, BrandUpdateReq> {

    /**
     * Khởi tạo controller với service tương ứng.
     *
     * @param service Service xử lý nghiệp vụ cho Brand, được inject tự động bởi
     *                Spring.
     */
    public BrandController(BrandService service) {
        super(service);
    }

    /**
     * Định nghĩa lớp DTO dùng cho danh sách (summary view).
     * <p>
     * Phương thức này được {@link AbController} sử dụng để map entity sang DTO khi
     * trả về danh sách.
     * Sử dụng {@link BrandRes} để chỉ trả về các thông tin cơ bản cần thiết cho
     * danh sách, giúp tối ưu hiệu năng.
     *
     * @return Class của DTO tóm tắt (BrandRes).
     */
    @Override
    @SuppressWarnings("unchecked")
    protected <R extends IDto<Brand>> Class<R> getResponseSummaryDtoClass() {
        return (Class<R>) BrandRes.class;
    }

    /**
     * Định nghĩa lớp DTO dùng cho chi tiết (detail view).
     * <p>
     * Phương thức này được {@link AbController} sử dụng để map entity sang DTO khi
     * trả về chi tiết một bản ghi.
     * Sử dụng {@link BrandDetailRes} để trả về đầy đủ thông tin, bao gồm cả các
     * quan hệ (nếu có).
     *
     * @return Class của DTO chi tiết (BrandDetailRes).
     */
    @Override
    @SuppressWarnings("unchecked")
    protected <R extends IDto<Brand>> Class<R> getResponseDetailDtoClass() {
        return (Class<R>) BrandDetailRes.class;
    }
}
