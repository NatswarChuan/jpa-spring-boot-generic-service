package com.natswarchuan.genericservice.service;

import com.natswarchuan.genericservice.dto.IDto;
import com.natswarchuan.genericservice.exception.HttpException;
import org.springframework.http.HttpStatus;
import org.springframework.lang.NonNull;
import org.springframework.transaction.annotation.Transactional;

/**
 * Giao diện dịch vụ cho các thao tác tạo mới (Create).
 *
 * <p>Cung cấp các phương thức để tạo mới thực thể từ Entity hoặc DTO, hỗ trợ trả về Entity hoặc
 * DTO. Cho phép can thiệp vào quá trình tạo thông qua các hook {@link #beforeCreate(Object)} và
 * {@link #afterCreate(Object)}.
 *
 * @param <E> Kiểu dữ liệu của thực thể.
 * @param <ID> Kiểu dữ liệu của khóa chính (ID) của thực thể.
 * @author NatswarChuan
 */
public interface ICreateService<E, ID> extends IBaseService<E, ID> {

  /**
   * Tạo mới một thực thể trực tiếp.
   *
   * <p>Quy trình:
   *
   * <ol>
   *   <li>Gọi {@link #beforeCreate(Object)} để xử lý trước khi lưu.
   *   <li>Lưu thực thể vào cơ sở dữ liệu.
   *   <li>Gọi {@link #afterCreate(Object)} để xử lý sau khi lưu.
   * </ol>
   *
   * @param newEntity Thực thể mới cần tạo. Không được null.
   * @return Thực thể đã được tạo và lưu thành công.
   * @throws HttpException Nếu thực thể trả về từ {@code beforeCreate} là null.
   */
  @Transactional(rollbackFor = Exception.class)
  default E create(@NonNull E newEntity) {
    E entity = beforeCreate(newEntity);
    if (entity == null) {
      throw new HttpException(
          HttpStatus.INTERNAL_SERVER_ERROR,
          "Lỗi khi chuyển đổi entity sang DTO: " + newEntity.getClass().getName());
    }
    E savedEntity = getRepository().save(entity);
    return afterCreate(savedEntity);
  }

  /**
   * Tạo mới một thực thể từ đối tượng DTO đầu vào.
   *
   * <p>Chuyển đổi DTO sang Entity và thực hiện quy trình tạo mới chuẩn.
   *
   * @param <S> Kiểu của DTO đầu vào, phải triển khai {@link IDto}.
   * @param newEntity Đối tượng DTO chứa thông tin tạo mới. Không được null.
   * @return Thực thể đã được tạo thành công.
   * @throws HttpException Nếu lỗi chuyển đổi DTO sang Entity hoặc thực thể null.
   */
  @Transactional(rollbackFor = Exception.class)
  default <S extends IDto<E>> E create(@NonNull S newEntity) {
    E entity = newEntity.toEntity();
    if (entity == null) {
      throw new HttpException(
          HttpStatus.INTERNAL_SERVER_ERROR,
          "Lỗi khi chuyển đổi entity sang DTO: " + newEntity.getClass().getName());
    }
    return create(entity);
  }

  /**
   * Tạo mới thực thể và trả về kết quả dưới dạng DTO.
   *
   * @param <S> Kiểu DTO kết quả.
   * @param dtoClass Lớp DTO đích để chuyển đổi dữ liệu trả về.
   * @param entity Thực thể cần tạo mới. Không được null.
   * @return Đối tượng DTO chứa dữ liệu của thực thể vừa tạo.
   * @throws HttpException Nếu có lỗi trong quá trình tạo hoặc chuyển đổi DTO.
   */
  @Transactional(rollbackFor = Exception.class)
  default <S extends IDto<E>> S create(@NonNull Class<S> dtoClass, @NonNull E entity) {
    E savedEntity = create(entity);
    if (savedEntity == null) {
      return null;
    }
    return mapToDto(savedEntity, dtoClass);
  }

  /**
   * Tạo mới thực thể từ DTO đầu vào và trả về kết quả dưới dạng một DTO khác.
   *
   * @param <D> Kiểu DTO trả về.
   * @param <S> Kiểu DTO đầu vào.
   * @param newEntity DTO chứa dữ liệu để tạo thực thể mới. Không được null.
   * @param dtoClass Lớp DTO đích cho kết quả trả về.
   * @return Đối tượng DTO kiểu {@code D} đại diện cho thực thể vừa tạo.
   * @throws HttpException Nếu có lỗi trong quá trình chuyển đổi hoặc tạo mới.
   */
  @Transactional(rollbackFor = Exception.class)
  default <D extends IDto<E>, S extends IDto<E>> D create(
      @NonNull S newEntity, @NonNull Class<D> dtoClass) {
    E entity = newEntity.toEntity();
    if (entity == null) {
      return null;
    }
    E savedEntity = create(entity);
    if (savedEntity == null) {
      return null;
    }
    return mapToDto(savedEntity, dtoClass);
  }

  /**
   * Tạo mới thực thể từ DTO đầu vào và trả về kết quả dưới dạng DTO (Overload).
   *
   * <p>Tương tự {@link #create(IDto, Class)} nhưng đảo ngược thứ tự tham số để thuận tiện sử dụng.
   *
   * @param <S> Kiểu DTO kết quả.
   * @param <T> Kiểu DTO đầu vào.
   * @param dtoClass Lớp DTO đích cho kết quả trả về.
   * @param dto DTO chứa dữ liệu để tạo mới. Không được null.
   * @return Đối tượng DTO đại diện cho thực thể vừa tạo.
   * @throws HttpException Nếu có lỗi trong quá trình chuyển đổi hoặc tạo mới.
   */
  @Transactional(rollbackFor = Exception.class)
  default <S extends IDto<E>, T extends IDto<E>> S create(
      @NonNull Class<S> dtoClass, @NonNull T dto) {
    E entity = dto.toEntity();
    if (entity == null) {
      return null;
    }
    E savedEntity = create(entity);
    if (savedEntity == null) {
      return null;
    }
    return mapToDto(savedEntity, dtoClass);
  }

  /**
   * Hook được gọi trước khi thực thể được lưu vào cơ sở dữ liệu.
   *
   * <p>Có thể ghi đè để thực hiện validate, thiết lập giá trị mặc định, hoặc sửa đổi dữ liệu.
   *
   * @param entity Thực thể sắp được tạo.
   * @return Thực thể sau khi xử lý (nếu trả về null sẽ gây lỗi).
   */
  default E beforeCreate(E entity) {
    return entity;
  }

  /**
   * Hook được gọi sau khi thực thể đã được lưu thành công vào cơ sở dữ liệu.
   *
   * <p>Có thể ghi đè để thực hiện các tác vụ phụ như gửi email, ghi log, hoặc cập nhật cache.
   *
   * @param entity Thực thể đã được tạo và có ID.
   * @return Thực thể sau khi xử lý (thường trả về chính entity đó).
   */
  default E afterCreate(E entity) {
    return entity;
  }
}
