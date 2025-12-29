package com.natswarchuan.genericservice.controller;

import com.natswarchuan.genericservice.dto.IDto;
import com.natswarchuan.genericservice.exception.HttpException;
import com.natswarchuan.genericservice.service.*;
import org.springframework.http.HttpStatus;

/**
 * Interface tổng hợp (Aggregate Interface) cho các Controller, cung cấp đầy đủ các thao tác CRUD cơ
 * bản.
 *
 * <p>Interface này kế thừa và kết hợp các chức năng từ các interface thành phần:
 *
 * <ul>
 *   <li>{@link ICreateController}: Chức năng tạo mới.
 *   <li>{@link IReadDetailController}: Chức năng xem chi tiết.
 *   <li>{@link IReadSummaryController}: Chức năng xem danh sách và filter.
 *   <li>{@link IUpdateController}: Chức năng cập nhật.
 *   <li>{@link IDeleteController}: Chức năng xóa.
 * </ul>
 *
 * @param <E> Kiểu dữ liệu của Entity (Thực thể).
 * @param <ID> Kiểu dữ liệu của định danh (Primary Key).
 * @param <CREATE_REQ> Kiểu DTO sử dụng cho request tạo mới.
 * @param <UPDATE_REQ> Kiểu DTO sử dụng cho request cập nhật.
 * @author NatswarChuan
 */
public interface IController<E, ID, CREATE_REQ extends IDto<E>, UPDATE_REQ extends IDto<E>>
    extends ICreateController<E, ID, CREATE_REQ>,
        IReadDetailController<E, ID>,
        IReadSummaryController<E, ID>,
        IUpdateController<E, ID, UPDATE_REQ>,
        IDeleteController<E, ID> {
  /**
   * Lấy instance của Service cơ sở xử lý các nghiệp vụ chung.
   *
   * @param <S> Kiểu dữ liệu thực tế của Service, phải kế thừa {@link IBaseService}.
   * @return Đối tượng Service xử lý nghiệp vụ.
   */
  @Override
  <S extends IBaseService<E, ID>> S getBaseService();

  /**
   * Cung cấp Service xử lý nghiệp vụ Tạo mới.
   *
   * <p>Mặc định, phương thức này trả về {@link #getBaseService()} vì Service cơ sở thường implement
   * tất cả các interface.
   *
   * @param <S> Kiểu dữ liệu của Service, phải kế thừa {@link ICreateService}.
   * @return Đối tượng Service xử lý tạo mới.
   */
  @SuppressWarnings("unchecked")
  @Override
  default <S extends ICreateService<E, ID>> S getCreateService() {
    if (getBaseService() instanceof ICreateService) {
      return (S) getBaseService();
    }
    throw new HttpException(HttpStatus.INTERNAL_SERVER_ERROR, "Service không implement IService");
  }

  /**
   * Cung cấp Service xử lý nghiệp vụ Xem chi tiết.
   *
   * <p>Mặc định, phương thức này trả về {@link #getBaseService()}.
   *
   * @param <S> Kiểu dữ liệu của Service, phải kế thừa {@link IReadDetailService}.
   * @return Đối tượng Service xử lý xem chi tiết.
   */
  @SuppressWarnings("unchecked")
  @Override
  default <S extends IReadDetailService<E, ID>> S getReadDetailService() {
    if (getBaseService() instanceof IReadDetailService) {
      return (S) getBaseService();
    }
    throw new HttpException(HttpStatus.INTERNAL_SERVER_ERROR, "Service không implement IService");
  }

  /**
   * Cung cấp Service xử lý nghiệp vụ Xem danh sách (Summary).
   *
   * <p>Mặc định, phương thức này trả về {@link #getBaseService()}.
   *
   * @param <S> Kiểu dữ liệu của Service, phải kế thừa {@link IReadSummaryService}.
   * @return Đối tượng Service xử lý xem danh sách.
   */
  @SuppressWarnings("unchecked")
  @Override
  default <S extends IReadSummaryService<E, ID>> S getReadSummaryService() {
    if (getBaseService() instanceof IReadSummaryService) {
      return (S) getBaseService();
    }
    throw new HttpException(HttpStatus.INTERNAL_SERVER_ERROR, "Service không implement IService");
  }

  /**
   * Cung cấp Service xử lý nghiệp vụ Cập nhật.
   *
   * <p>Mặc định, phương thức này trả về {@link #getBaseService()}.
   *
   * @param <S> Kiểu dữ liệu của Service, phải kế thừa {@link IUpdateService}.
   * @return Đối tượng Service xử lý cập nhật.
   */
  @SuppressWarnings("unchecked")
  @Override
  default <S extends IUpdateService<E, ID>> S getUpdateService() {
    if (getBaseService() instanceof IUpdateService) {
      return (S) getBaseService();
    }
    throw new HttpException(HttpStatus.INTERNAL_SERVER_ERROR, "Service không implement IService");
  }

  /**
   * Cung cấp Service xử lý nghiệp vụ Xóa.
   *
   * <p>Mặc định, phương thức này trả về {@link #getBaseService()}.
   *
   * @param <S> Kiểu dữ liệu của Service, phải kế thừa {@link IDeleteService}.
   * @return Đối tượng Service xử lý xóa.
   */
  @SuppressWarnings("unchecked")
  @Override
  default <S extends IDeleteService<E, ID>> S getDeleteService() {
    if (getBaseService() instanceof IDeleteService) {
      return (S) getBaseService();
    }
    throw new HttpException(HttpStatus.INTERNAL_SERVER_ERROR, "Service không implement IService");
  }
}
