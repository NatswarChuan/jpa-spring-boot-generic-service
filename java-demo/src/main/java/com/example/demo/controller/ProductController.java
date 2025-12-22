package com.example.demo.controller;

import com.example.demo.domain.Product;
import com.example.demo.dto.product.ProductCreateReq;
import com.example.demo.dto.product.ProductDetailRes;
import com.example.demo.dto.product.ProductRes;
import com.example.demo.dto.product.ProductUpdateReq;
import com.example.demo.service.ProductService;
import com.natswarchuan.genericservice.controller.AbController;
import com.natswarchuan.genericservice.dto.IDto;
import com.example.demo.dto.product.ProductFilterParam;
import com.example.demo.specification.ProductSpecification;
import com.natswarchuan.genericservice.payload.request.BaseRequestParam;
import com.natswarchuan.genericservice.payload.response.HttpApiResponse;
import com.natswarchuan.genericservice.payload.response.PagedResponse;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Controller quản lý Sản phẩm (Product).
 * <p>
 * Ngoài các CRUD chuẩn từ {@link AbController} như:
 * <ul>
 * <li>POST /api/v1/products</li>
 * <li>GET /api/v1/products/{id}</li>
 * <li>PUT /api/v1/products/{id}</li>
 * <li>DELETE /api/v1/products/{id}</li>
 * <li>GET /api/v1/products</li>
 * </ul>
 * Controller này còn mở rộng thêm tính năng lọc nâng cao qua endpoint:
 * <ul>
 * <li>GET /api/v1/products/filter: Lọc sản phẩm theo nhiều tiêu chí (Dynamic
 * Search).</li>
 * </ul>
 * Sử dụng {@link ProductSpecification} để xây dựng các điều kiện lọc động.
 */
@RestController
@RequestMapping("/api/v1/products")
public class ProductController extends AbController<Product, Long, ProductCreateReq, ProductUpdateReq> {

    /**
     * Khởi tạo ProductController.
     *
     * @param service ProductService cho các nghiệp vụ sản phẩm.
     */
    public ProductController(ProductService service) {
        super(service);
    }

    /**
     * Endpoint API riêng biệt cho việc lọc nâng cao.
     * <p>
     * Chúng ta tạo endpoint `/filter` riêng để tránh xung đột hoặc nhầm lẫn với
     * endpoint `findAll` mặc định của {@link AbController}.
     * Endpoint này hỗ trợ lọc theo khoảng giá, tên thương hiệu, v.v. thông qua
     * {@link ProductFilterParam}.
     *
     * @param requestParam Các tham số lọc được truyền từ client (Query Params).
     * @param language     Ngôn ngữ người dùng mong muốn (tùy chọn).
     * @return Danh sách sản phẩm đã được lọc và phân trang.
     */
    @GetMapping("/filter")
    public ResponseEntity<HttpApiResponse<PagedResponse<ProductRes>>> filterProducts(
            ProductFilterParam requestParam,
            @RequestHeader(name = "Accept-Language", defaultValue = "en") String language) {
        return super.findAll(requestParam, language);
    }

    /**
     * Ghi đè phương thức tạo Specification để hỗ trợ bộ lọc riêng của Product.
     * <p>
     * Nếu request param là {@link ProductFilterParam}, chúng ta sử dụng
     * {@link ProductSpecification} để tạo câu truy vấn.
     * Ngược lại, sử dụng mặc định của lớp cha.
     *
     * @param requestParam Tham số tìm kiếm chung.
     * @return Specification (câu điều kiện WHERE trong JPA).
     */
    @Override
    protected Specification<Product> getSpecification(
            BaseRequestParam requestParam) {
        if (requestParam instanceof ProductFilterParam) {
            return new ProductSpecification(
                    (ProductFilterParam) requestParam);
        }
        return super.getSpecification(requestParam);
    }

    /**
     * Trả về DTO tóm tắt ProductRes cho danh sách.
     */
    @Override
    @SuppressWarnings("unchecked")
    protected <R extends IDto<Product>> Class<R> getResponseSummaryDtoClass() {
        return (Class<R>) ProductRes.class;
    }

    /**
     * Trả về DTO chi tiết ProductDetailRes cho xem chi tiết.
     */
    @Override
    @SuppressWarnings("unchecked")
    protected <R extends IDto<Product>> Class<R> getResponseDetailDtoClass() {
        return (Class<R>) ProductDetailRes.class;
    }
}
