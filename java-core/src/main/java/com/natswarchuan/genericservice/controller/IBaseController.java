package com.natswarchuan.genericservice.controller;

import com.natswarchuan.genericservice.service.IBaseService;

/**
 * Interface cơ sở (Base Interface) cho tất cả các Controller trong hệ thống Generic.
 *
 * <p>Định nghĩa phương thức chung để truy cập Service xử lý logic nghiệp vụ. Các Controller cụ thể
 * (Create, Update, Delete,...) sẽ kế thừa interface này.
 *
 * @param <E> Kiểu dữ liệu của Entity.
 * @param <ID> Kiểu dữ liệu của định danh (ID).
 * @author NatswarChuan
 */
public interface IBaseController<E, ID> {

  /**
   * Lấy instance của Service cơ sở.
   *
   * <p>Service này là đầu mối chính để thực hiện các thao tác nghiệp vụ chung.
   *
   * @param <S> Kiểu dữ liệu thực tế của Service (phải kế thừa {@link IBaseService}).
   * @return Đối tượng Service.
   */
  <S extends IBaseService<E, ID>> S getBaseService();
}
