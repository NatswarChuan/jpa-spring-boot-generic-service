package com.natswarchuan.genericservice.service;

import com.natswarchuan.genericservice.dto.IDto;
import com.natswarchuan.genericservice.exception.HttpException;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.lang.NonNull;
import org.springframework.transaction.annotation.Transactional;

/**
 * Giao diện dịch vụ cho các thao tác đọc chi tiết (Read Detail).
 *
 * <p>Cung cấp các phương thức tìm kiếm thực thể duy nhất theo ID hoặc Specification (tiêu chí). Hỗ
 * trợ chuyển đổi sang DTO và các hook xử lý sau khi đọc {@link #afterReadEntity} và {@link
 * #afterReadDto}.
 *
 * @param <E> Kiểu dữ liệu của thực thể.
 * @param <ID> Kiểu dữ liệu của khóa chính (ID) của thực thể.
 * @author NatswarChuan
 */
public interface IReadDetailService<E, ID> extends IBaseService<E, ID> {

  /**
   * Tìm kiếm thực thể dựa trên ID.
   *
   * <p>Nếu tìm thấy, thực thể sẽ được xử lý qua hook {@link #afterReadEntity(Object)}.
   *
   * @param id ID của thực thể cần tìm. Không được null.
   * @return Thực thể tìm thấy.
   * @throws HttpException Nếu không tìm thấy thực thể với ID cung cấp (HTTP 404).
   */
  @Transactional(readOnly = true)
  default E findById(@NonNull ID id) {
    E result =
        getRepository()
            .findById(id)
            .orElseThrow(
                () ->
                    new HttpException(
                        HttpStatus.NOT_FOUND, "Không tìm thấy thực thể với id= " + id));
    return afterReadEntity(result);
  }

  /**
   * Tìm kiếm một thực thể duy nhất dựa trên tiêu chí (Specification).
   *
   * <p>Nếu tìm thấy, thực thể sẽ được xử lý qua hook {@link #afterReadEntity(Object)}.
   *
   * @param spec Tiêu chí tìm kiếm. Không được null.
   * @return Thực thể tìm thấy.
   * @throws HttpException Nếu không tìm thấy thực thể thỏa mãn tiêu chí (HTTP 404).
   */
  @Transactional(readOnly = true)
  default E findOne(@NonNull Specification<E> spec) {
    E result =
        getRepository()
            .findOne(spec)
            .orElseThrow(
                () ->
                    new HttpException(
                        HttpStatus.NOT_FOUND, "Không tìm thấy thực thể với tiêu chí cung cấp."));
    return afterReadEntity(result);
  }

  /**
   * Tìm thực thể theo ID và chuyển đổi sang DTO.
   *
   * @param <S> Kiểu DTO trả về.
   * @param id ID của thực thể. Không được null.
   * @param dtoClass Lớp DTO đích.
   * @return Đối tượng DTO chứa dữ liệu của thực thể tìm thấy.
   * @throws HttpException Nếu không tìm thấy thực thể hoặc lỗi chuyển đổi.
   */
  @Transactional(readOnly = true)
  default <S extends IDto<E>> S findById(@NonNull ID id, @NonNull Class<S> dtoClass) {

    E result =
        getRepository()
            .findById(id)
            .orElseThrow(
                () ->
                    new HttpException(
                        HttpStatus.NOT_FOUND, "Không tìm thấy thực thể với id= " + id));
    E afterReadEntityResult = afterReadEntity(result);
    if (afterReadEntityResult == null) {
      return null;
    }
    return afterReadDto(mapToDto(afterReadEntityResult, dtoClass));
  }

  /**
   * Tìm thực thể theo ID và chuyển đổi sang DTO (có hỗ trợ đa ngôn ngữ).
   *
   * @param <S> Kiểu DTO trả về.
   * @param id ID của thực thể.
   * @param dtoClass Lớp DTO đích.
   * @param language Mã ngôn ngữ (ví dụ: "vi", "en").
   * @return Đối tượng DTO chứa dữ liệu của thực thể tìm thấy.
   * @throws HttpException Nếu không tìm thấy thực thể.
   */
  @Transactional(readOnly = true)
  default <S extends IDto<E>> S findById(
      @NonNull ID id, @NonNull Class<S> dtoClass, String language) {
    E result =
        getRepository()
            .findById(id)
            .orElseThrow(
                () ->
                    new HttpException(
                        HttpStatus.NOT_FOUND, "Không tìm thấy thực thể với id= " + id));
    E afterReadEntityResult = afterReadEntity(result);
    if (afterReadEntityResult == null) {
      return null;
    }
    return afterReadDto(mapToDto(afterReadEntityResult, dtoClass, language));
  }

  /**
   * Tìm thực thể dựa trên tiêu chí (Specification) và trả về DTO.
   *
   * @param <S> Kiểu DTO trả về.
   * @param spec Tiêu chí tìm kiếm.
   * @param dtoClass Lớp DTO đích.
   * @return Đối tượng DTO kết quả.
   * @throws HttpException Nếu không tìm thấy thực thể.
   */
  @Transactional(readOnly = true)
  default <S extends IDto<E>> S findById(
      @NonNull Specification<E> spec, @NonNull Class<S> dtoClass) {
    E result = findOne(spec);
    E afterReadEntityResult = afterReadEntity(result);
    if (afterReadEntityResult == null) {
      return null;
    }
    return afterReadDto(mapToDto(afterReadEntityResult, dtoClass));
  }

  /**
   * Tìm thực thể dựa trên tiêu chí bổ sung (Specification) và trả về DTO (hỗ trợ ngôn ngữ).
   *
   * <p>Phương thức này sử dụng Specification để tìm kiếm.
   *
   * @param <S> Kiểu DTO trả về.
   * @param id ID của thực thể (có thể không dùng nếu spec đã đầy đủ).
   * @param dtoClass Lớp DTO đích.
   * @param spec Tiêu chí tìm kiếm bổ sung.
   * @param language Mã ngôn ngữ.
   * @return Đối tượng DTO kết quả.
   * @throws HttpException Nếu không tìm thấy thực thể.
   */
  @Transactional(readOnly = true)
  default <S extends IDto<E>> S findById(
      @NonNull ID id, @NonNull Class<S> dtoClass, @NonNull Specification<E> spec, String language) {
    E result = findOne(spec);
    E afterReadEntityResult = afterReadEntity(result);
    if (afterReadEntityResult == null) {
      return null;
    }
    return afterReadDto(mapToDto(afterReadEntityResult, dtoClass, language));
  }

  /**
   * Tìm một thực thể theo tiêu chí và trả về DTO.
   *
   * @param <S> Kiểu DTO trả về.
   * @param dtoClass Lớp DTO đích.
   * @param spec Tiêu chí tìm kiếm.
   * @return Đối tượng DTO kết quả.
   * @throws HttpException Nếu không tìm thấy thực thể.
   */
  @Transactional(readOnly = true)
  default <S extends IDto<E>> S findOne(
      @NonNull Class<S> dtoClass, @NonNull Specification<E> spec) {
    E result = findOne(spec);
    E afterReadEntityResult = afterReadEntity(result);
    if (afterReadEntityResult == null) {
      return null;
    }
    return afterReadDto(mapToDto(afterReadEntityResult, dtoClass));
  }

  /**
   * Tìm một thực thể theo tiêu chí và trả về DTO (hỗ trợ ngôn ngữ).
   *
   * @param <S> Kiểu DTO trả về.
   * @param dtoClass Lớp DTO đích.
   * @param spec Tiêu chí tìm kiếm.
   * @param language Mã ngôn ngữ.
   * @return Đối tượng DTO kết quả.
   * @throws HttpException Nếu không tìm thấy thực thể.
   */
  @Transactional(readOnly = true)
  default <S extends IDto<E>> S findOne(
      @NonNull Class<S> dtoClass, @NonNull Specification<E> spec, String language) {
    E result = findOne(spec);
    E afterReadEntityResult = afterReadEntity(result);
    if (afterReadEntityResult == null) {
      return null;
    }
    return afterReadDto(mapToDto(afterReadEntityResult, dtoClass, language));
  }

  /**
   * Kiểm tra sự tồn tại của thực thể thỏa mãn tiêu chí.
   *
   * @param spec Tiêu chí kiểm tra.
   * @return {@code true} nếu tồn tại ít nhất một thực thể, ngược lại {@code false}.
   */
  @Transactional(readOnly = true)
  default boolean exists(@NonNull Specification<E> spec) {
    return getRepository().exists(spec);
  }

  /**
   * Hook (phương thức móc) được gọi sau khi đọc chi tiết thực thể từ DB.
   *
   * <p>Có thể ghi đè để thực hiện các xử lý bổ sung trên thực thể trước khi trả về hoặc chuyển đổi
   * sang DTO.
   *
   * @param entity Thực thể đã đọc.
   * @return Thực thể sau khi xử lý.
   */
  default E afterReadEntity(E entity) {
    return entity;
  }

  /**
   * Hook (phương thức móc) được gọi sau khi chuyển đổi thực thể sang DTO.
   *
   * <p>Có thể ghi đè để bổ sung dữ liệu cho DTO.
   *
   * @param dto Đối tượng DTO đã được map từ entity.
   * @param <S> Kiểu DTO.
   * @return DTO sau khi xử lý.
   */
  default <S extends IDto<E>> S afterReadDto(S dto) {
    return dto;
  }
}
