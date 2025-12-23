package com.example.demo.controller;

import com.example.demo.domain.Store;
import com.example.demo.dto.store.StoreCreateReq;
import com.example.demo.dto.store.StoreDetailRes;
import com.example.demo.dto.store.StoreRes;
import com.example.demo.dto.store.StoreUpdateReq;
import com.example.demo.service.StoreService;
import com.natswarchuan.genericservice.controller.trait.ICreateController;
import com.natswarchuan.genericservice.controller.trait.IDeleteController;
import com.natswarchuan.genericservice.controller.trait.IReadController;
import com.natswarchuan.genericservice.controller.trait.IUpdateController;
import com.natswarchuan.genericservice.controller.AbController;
import com.natswarchuan.genericservice.dto.IDto;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Controller quản lý Cửa hàng (Store).
 * <p>
 * Cung cấp các endpoint API để quản lý thông tin cửa hàng.
 * Tận dụng {@link AbController} để có sẵn các chức năng CRUD:
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
public class StoreController extends AbController<Store, Long>
        implements
        ICreateController<Store, Long, StoreCreateReq>,
        IUpdateController<Store, Long, StoreUpdateReq>,
        IDeleteController<Store, Long>,
        IReadController<Store, Long> {

    /**
     * Khởi tạo StoreController.
     *
     * @param service StoreService được inject bởi Spring.
     */
    public StoreController(StoreService service) {
        super(service);
    }

    /**
     * Sử dụng StoreRes cho danh sách cửa hàng.
     *
     * @return Class của StoreRes.
     */
    @Override
    @SuppressWarnings("unchecked")
    public <R extends IDto<Store>> Class<R> getResponseSummaryDtoClass() {
        return (Class<R>) StoreRes.class;
    }

    /**
     * Sử dụng StoreDetailRes cho chi tiết cửa hàng.
     *
     * @return Class của StoreDetailRes.
     */
    @Override
    @SuppressWarnings("unchecked")
    public <R extends IDto<Store>> Class<R> getResponseDetailDtoClass() {
        return (Class<R>) StoreDetailRes.class;
    }
}
