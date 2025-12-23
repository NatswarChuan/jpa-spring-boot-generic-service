package com.natswarchuan.genericservice.controller;

import com.natswarchuan.genericservice.controller.trait.IBaseController;
import com.natswarchuan.genericservice.controller.trait.ICreateController;
import com.natswarchuan.genericservice.controller.trait.IDeleteController;
import com.natswarchuan.genericservice.controller.trait.IReadController;
import com.natswarchuan.genericservice.controller.trait.IUpdateController;
import com.natswarchuan.genericservice.service.IService;

/**
 * Controller trừu tượng (Abstract Controller) đóng vai trò là lớp cơ sở.
 *
 * <p>
 * Lớp này chỉ cung cấp service cơ bản. Để kích hoạt các API CRUD, các lớp con
 * cần implement
 * các interface Trait tương ứng:
 * <ul>
 * <li>{@link IReadController}: Lấy danh sách, chi tiết</li>
 * <li>{@link ICreateController}: Tạo mới</li>
 * <li>{@link IUpdateController}: Cập nhật</li>
 * <li>{@link IDeleteController}: Xóa</li>
 * </ul>
 *
 * @param <E>  Kiểu Entity (Thực thể JPA).
 * @param <ID> Kiểu dữ liệu của Primary Key (VD: Long, UUID).
 * @author NatswarChuan
 */
@SuppressWarnings("null")
public abstract class AbController<E, ID> implements IBaseController<E, ID> {

    /** Service xử lý logic nghiệp vụ. */
    protected final IService<E, ID> service;

    /**
     * Constructor để inject Service.
     *
     * @param service Service implement {@link IService} để xử lý logic nghiệp vụ.
     */
    protected AbController(IService<E, ID> service) {
        this.service = service;
    }

    @Override
    public IService<E, ID> getService() {
        return this.service;
    }
}
