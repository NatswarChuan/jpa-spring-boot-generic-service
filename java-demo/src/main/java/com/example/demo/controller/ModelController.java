package com.example.demo.controller;

import com.example.demo.domain.Model;
import com.example.demo.dto.model.ModelCreateReq;
import com.example.demo.dto.model.ModelDetailRes;
import com.example.demo.dto.model.ModelRes;
import com.example.demo.dto.model.ModelUpdateReq;
import com.example.demo.service.ModelService;
import com.natswarchuan.genericservice.controller.AbController;
import com.natswarchuan.genericservice.dto.IDto;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Controller quản lý Model.
 * <p>
 * Kế thừa {@link AbController} để cung cấp các API RESTful chuẩn cho Model.
 * Các endpoint mặc định bao gồm:
 * <ul>
 * <li>POST /api/v1/models: Tạo mới Model</li>
 * <li>GET /api/v1/models/{id}: Xem chi tiết Model</li>
 * <li>PUT /api/v1/models/{id}: Cập nhật Model</li>
 * <li>DELETE /api/v1/models/{id}: Xóa Model</li>
 * <li>GET /api/v1/models: Xem danh sách Model (có phân trang)</li>
 * </ul>
 * Hỗ trợ các thao tác Create, Read, Update, Delete (CRUD) và tìm kiếm/lọc cơ
 * bản.
 */
@RestController
@RequestMapping("/api/v1/models")
public class ModelController extends AbController<Model, Long, ModelCreateReq, ModelUpdateReq> {

    /**
     * Khởi tạo ModelController.
     *
     * @param service ModelService xử lý logic nghiệp vụ.
     */
    public ModelController(ModelService service) {
        super(service);
    }

    /**
     * Trả về DTO tóm tắt cho danh sách.
     * {@link ModelRes} chứa thông tin cơ bản: id, name, year.
     *
     * @return Class của ModelRes.
     */
    @Override
    @SuppressWarnings("unchecked")
    protected <R extends IDto<Model>> Class<R> getResponseSummaryDtoClass() {
        return (Class<R>) ModelRes.class;
    }

    /**
     * Trả về DTO chi tiết cho endpoint xem một bản ghi.
     * {@link ModelDetailRes} chứa đầy đủ thông tin hơn.
     *
     * @return Class của ModelDetailRes.
     */
    @Override
    @SuppressWarnings("unchecked")
    protected <R extends IDto<Model>> Class<R> getResponseDetailDtoClass() {
        return (Class<R>) ModelDetailRes.class;
    }
}
