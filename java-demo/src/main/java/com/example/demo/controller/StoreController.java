package com.example.demo.controller;

import com.example.demo.domain.Store;
import com.example.demo.dto.store.StoreDetailRes;
import com.example.demo.dto.store.StoreRes;
import com.example.demo.dto.store.StoreCreateReq;
import com.example.demo.dto.store.StoreUpdateReq;
import com.example.demo.service.StoreService;
import com.natswarchuan.genericservice.controller.IController;
import com.natswarchuan.genericservice.dto.IDto;
import com.natswarchuan.genericservice.service.IBaseService;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Controller quản lý Cửa hàng (Store).
 * <p>
 * Cung cấp các endpoint API để quản lý thông tin cửa hàng.
 * Implement {@link IController} để có sẵn các chức năng CRUD qua default
 * methods:
 * <ul>
 * <li>POST /api/v1/stores: Tạo mới Store</li>
 * <li>GET /api/v1/stores/{id}: Xem chi tiết Store</li>
 * <li>PUT /api/v1/stores/{id}: Cập nhật Store</li>
 * <li>DELETE /api/v1/stores/{id}: Xóa Store</li>
 * <li>GET /api/v1/stores: Xem danh sách Store (có phân trang)</li>
 * </ul>
 */
@RestController
@RequestMapping("/api/v1/stores")
public class StoreController implements IController<Store, Long, StoreCreateReq, StoreUpdateReq> {

    private final StoreService service;

    /**
     * Khởi tạo StoreController.
     *
     * @param service StoreService được inject bởi Spring.
     */
    public StoreController(StoreService service) {
        this.service = service;
    }

    @Override
    @SuppressWarnings("unchecked")
    public <S extends IBaseService<Store, Long>> S getBaseService() {
        return (S) service;
    }

    /**
     * Sử dụng StoreRes cho danh sách cửa hàng.
     *
     * @return Class của StoreRes.
     */
    @Override
    public Class<? extends IDto<Store>> getResponseSummaryDtoClass() {
        return StoreRes.class;
    }

    /**
     * Sử dụng StoreDetailRes cho chi tiết cửa hàng.
     *
     * @return Class của StoreDetailRes.
     */
    @Override
    @NonNull
    public Class<? extends IDto<Store>> getResponseDetailDtoClass() {
        return StoreDetailRes.class;
    }
}
