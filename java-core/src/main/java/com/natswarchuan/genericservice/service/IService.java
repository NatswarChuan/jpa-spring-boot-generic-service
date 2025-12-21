package com.natswarchuan.genericservice.service;

/**
 * Giao diện dịch vụ chung (service) cho các thực thể (entity).
 *
 * <p>
 * Định nghĩa các thao tác CRUD (Create, Read, Update, Delete) cơ bản và các
 * phương thức tiện ích
 * khác để làm việc với thực thể.
 *
 * @param <E>  Kiểu dữ liệu của thực thể.
 * @param <ID> Kiểu dữ liệu của khóa chính (ID) của thực thể.
 * @author NatswarChuan
 */
public interface IService<E, ID> extends ICreateService<E, ID>, IReadDetailService<E, ID>,
                IReadSummaryService<E, ID>, IUpdateService<E, ID>, IDeleteService<E, ID> {
}
