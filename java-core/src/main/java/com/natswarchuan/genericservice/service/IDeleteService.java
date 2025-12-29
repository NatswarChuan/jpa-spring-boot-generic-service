package com.natswarchuan.genericservice.service;

import com.natswarchuan.genericservice.dto.IDto;
import com.natswarchuan.genericservice.exception.HttpException;
import java.util.List;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.lang.NonNull;
import org.springframework.transaction.annotation.Transactional;

/**
 * Giao diện dịch vụ cho các thao tác xóa (Delete).
 *
 * <p>Cung cấp các phương thức xóa theo ID, xóa theo Entity, xóa trả về DTO, và xóa hàng loạt. Hỗ
 * trợ các hook {@link #beforeDelete(Object)} và {@link #afterDelete(Object)} để can thiệp vào quá
 * trình xóa.
 *
 * @param <E> Kiểu dữ liệu của thực thể.
 * @param <ID> Kiểu dữ liệu của khóa chính (ID) của thực thể.
 * @author NatswarChuan
 */
public interface IDeleteService<E, ID> extends IBaseService<E, ID> {

  /**
   * Xóa thực thể dựa trên ID.
   *
   * <p>Tìm thực thể theo ID, gọi hook xử lý trước khi xóa, thực hiện xóa và gọi hook sau khi xóa.
   *
   * @param id ID của thực thể cần xóa. Không được null.
   * @throws HttpException Nếu không tìm thấy thực thể với ID cung cấp.
   */
  @Transactional(rollbackFor = Exception.class)
  default void deleteById(@NonNull ID id) {
    E deleteEntity = findByIdInternal(id);
    deleteEntity = beforeDelete(deleteEntity);
    if (deleteEntity == null) {
      return;
    }
    getRepository().delete(deleteEntity);
    afterDelete(deleteEntity);
  }

  /**
   * Xóa trực tiếp một đối tượng thực thể.
   *
   * <p>Gọi hook xử lý trước khi xóa, thực hiện xóa và gọi hook sau khi xóa.
   *
   * @param entity Thực thể cần xóa. Không được null.
   */
  @Transactional(rollbackFor = Exception.class)
  default void delete(E entity) {
    entity = beforeDelete(entity);
    if (entity == null) {
      return;
    }
    getRepository().delete(entity);
    afterDelete(entity);
  }

  /**
   * Xóa một thực thể và trả về dữ liệu của nó dưới dạng DTO.
   *
   * <p>Hữu ích khi cần trả về thông tin của đối tượng vừa bị xóa cho client.
   *
   * @param <S> Kiểu DTO trả về.
   * @param dtoClass Lớp DTO đích để chuyển đổi dữ liệu.
   * @param entity Thực thể cần xóa. Không được null.
   * @return Đối tượng DTO chứa dữ liệu của thực thể đã xóa.
   * @throws HttpException Nếu có lỗi trong quá trình chuyển đổi sang DTO.
   */
  @Transactional(rollbackFor = Exception.class)
  default <S extends IDto<E>> S delete(@NonNull Class<S> dtoClass, E entity) {
    entity = beforeDelete(entity);
    if (entity == null) {
      return null;
    }
    getRepository().delete(entity);
    afterDelete(entity);
    return mapToDto(entity, dtoClass);
  }

  /**
   * Xóa thực thể dựa trên thông tin từ DTO đầu vào và trả về DTO kết quả.
   *
   * <p>Chuyển đổi DTO đầu vào sang Entity, thực hiện xóa, sau đó chuyển đổi Entity đã xóa sang DTO
   * kết quả.
   *
   * @param <S> Kiểu DTO trả về.
   * @param <T> Kiểu DTO đầu vào.
   * @param dtoClass Lớp DTO đích để chuyển đổi dữ liệu trả về.
   * @param dto Đối tượng DTO chứa thông tin thực thể cần xóa. Không được null.
   * @return Đối tượng DTO chứa dữ liệu của thực thể đã xóa.
   * @throws HttpException Nếu có lỗi trong quá trình chuyển đổi DTO hoặc Entity.
   */
  @Transactional(rollbackFor = Exception.class)
  default <S extends IDto<E>, T extends IDto<E>> S delete(
      @NonNull Class<S> dtoClass, @NonNull T dto) {
    E entity = dto.toEntity();
    entity = beforeDelete(entity);
    if (entity == null) {
      return null;
    }
    getRepository().delete(entity);
    afterDelete(entity);
    return mapToDto(entity, dtoClass);
  }

  /**
   * Xóa thực thể theo ID và trả về dữ liệu dưới dạng DTO.
   *
   * <p>Tìm thực thể theo ID, xóa nó và trả về thông tin đã xóa.
   *
   * @param <S> Kiểu DTO trả về.
   * @param id ID của thực thể cần xóa. Không được null.
   * @param dtoClass Lớp DTO đích để chuyển đổi dữ liệu.
   * @return Đối tượng DTO chứa dữ liệu của thực thể đã xóa.
   * @throws HttpException Nếu không tìm thấy thực thể hoặc lỗi chuyển đổi DTO.
   */
  @Transactional(rollbackFor = Exception.class)
  default <S extends IDto<E>> S delete(@NonNull ID id, @NonNull Class<S> dtoClass) {
    E entity = findByIdInternal(id);
    entity = beforeDelete(entity);
    if (entity == null) {
      return null;
    }
    getRepository().delete(entity);
    afterDelete(entity);
    return mapToDto(entity, dtoClass);
  }

  /**
   * Xóa hàng loạt thực thể thỏa mãn điều kiện lọc.
   *
   * <p>Tìm tất cả thực thể khớp với {@code spec}, áp dụng hook {@code beforeDelete} cho từng thực
   * thể, xóa hàng loạt, sau đó áp dụng hook {@code afterDelete}.
   *
   * @param spec Điều kiện lọc (Specification) để xác định các thực thể cần xóa. Không được null.
   */
  @Transactional(rollbackFor = Exception.class)
  default void delete(@NonNull Specification<E> spec) {
    List<E> entities = getRepository().findAll(spec);
    for (int i = 0; i < entities.size(); i++) {
      entities.set(i, beforeDelete(entities.get(i)));
    }
    getRepository().deleteAll(entities);
    for (E entity : entities) {
      afterDelete(entity);
    }
  }

  /**
   * Hook được gọi trước khi thực hiện xóa thực thể.
   *
   * <p>Có thể ghi đè để thực hiện các kiểm tra logic, validate, hoặc cập nhật dữ liệu liên quan
   * trước khi xóa.
   *
   * @param entity Thực thể sắp bị xóa.
   * @return Thực thể sau khi xử lý (thường là chính entity đó).
   */
  default E beforeDelete(E entity) {
    return entity;
  }

  /**
   * Hook được gọi sau khi thực thể đã được xóa khỏi cơ sở dữ liệu.
   *
   * <p>Có thể ghi đè để thực hiện các tác vụ dọn dẹp, ghi log, hoặc cập nhật cache.
   *
   * @param entity Thực thể đã bị xóa (trạng thái detached).
   * @return Thực thể sau khi xử lý.
   */
  default E afterDelete(E entity) {
    return entity;
  }
}
