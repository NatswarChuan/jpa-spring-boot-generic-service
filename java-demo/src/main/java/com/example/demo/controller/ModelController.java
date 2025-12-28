package com.example.demo.controller;

import com.example.demo.domain.Model;
import com.example.demo.dto.model.ModelDetailRes;
import com.example.demo.dto.model.ModelRes;
import com.example.demo.dto.model.ModelCreateReq;
import com.example.demo.dto.model.ModelUpdateReq;
import com.example.demo.service.ModelService;
import com.natswarchuan.genericservice.controller.IController;
import com.natswarchuan.genericservice.dto.IDto;
import com.natswarchuan.genericservice.service.IBaseService;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Controller quản lý Model.
 * <p>
 * Implement {@link IController} để cung cấp các API RESTful chuẩn cho Model
 * thông qua default methods.
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
public class ModelController implements IController<Model, Long, ModelCreateReq, ModelUpdateReq> {

    private final ModelService service;

    /**
     * Khởi tạo ModelController.
     *
     * @param service ModelService xử lý logic nghiệp vụ.
     */
    public ModelController(ModelService service) {
        this.service = service;
    }

    @Override
    @SuppressWarnings("unchecked")
    public <S extends IBaseService<Model, Long>> S getBaseService() {
        return (S) service;
    }

    /**
     * Trả về DTO tóm tắt cho danh sách.
     * {@link ModelRes} chứa thông tin cơ bản: id, name, year.
     *
     * @return Class của ModelRes.
     */
    @Override
    public Class<? extends IDto<Model>> getResponseSummaryDtoClass() {
        return ModelRes.class;
    }

    /**
     * Trả về DTO chi tiết cho endpoint xem một bản ghi.
     * {@link ModelDetailRes} chứa đầy đủ thông tin hơn.
     *
     * @return Class của ModelDetailRes.
     */
    @Override
    @NonNull
    public Class<? extends IDto<Model>> getResponseDetailDtoClass() {
        return ModelDetailRes.class;
    }
}
