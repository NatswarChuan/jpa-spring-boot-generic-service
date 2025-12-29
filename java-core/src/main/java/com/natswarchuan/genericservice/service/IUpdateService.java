package com.natswarchuan.genericservice.service;

import com.natswarchuan.genericservice.dto.IDto;
import java.util.List;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.lang.NonNull;
import org.springframework.transaction.annotation.Transactional;

/**
 * Giao diện dịch vụ cho các thao tác cập nhật (Update) và lưu (Save).
 *
 * <p>Cung cấp các phương thức để cập nhật thực thể từ Entity hoặc DTO. Hỗ trợ các hook {@link
 * #beforeUpdate(Object)} và {@link #afterUpdate(Object)} để can thiệp vào quá trình lưu.
 *
 * @param <E> Kiểu dữ liệu của thực thể.
 * @param <ID> Kiểu dữ liệu của khóa chính (ID) của thực thể.
 * @author NatswarChuan
 */
public interface IUpdateService<E, ID> extends IBaseService<E, ID> {

  /**
   * Cập nhật một thực thể đã tồn tại dựa trên ID.
   *
   * <p>Quy trình:
   *
   * <ol>
   *   <li>Kiểm tra sự tồn tại của thực thể theo ID (ném lỗi nếu không tìm thấy).
   *   <li>Gọi {@link #beforeUpdate(Object)} để xử lý logic trước khi lưu.
   *   <li>Lưu thực thể vào cơ sở dữ liệu.
   *   <li>Gọi {@link #afterUpdate(Object)} để xử lý sau khi lưu.
   * </ol>
   *
   * @param updateEntity Thực thể chứa thông tin cập nhật. Không được null.
   * @param id ID của thực thể cần cập nhật. Không được null.
   * @return Thực thể sau khi đã cập nhật và lưu thành công.
   * @throws com.natswarchuan.genericservice.exception.HttpException Nếu không tìm thấy thực thể với
   *     ID cung cấp.
   */
  @Transactional(rollbackFor = Exception.class)
  default E update(@NonNull E updateEntity, @NonNull ID id) {
    findByIdInternal(id);
    E entity = beforeUpdate(updateEntity);
    if (entity == null) {
      return null;
    }
    E savedEntity = getRepository().save(entity);
    return afterUpdate(savedEntity);
  }

  /**
   * Cập nhật một thực thể (giả định đã có ID).
   *
   * <p>Gọi hook xử lý trước khi lưu, thực hiện lưu và gọi hook sau khi lưu.
   *
   * @param entity Thực thể cần cập nhật. Không được null.
   * @return Thực thể sau khi cập nhật.
   */
  @Transactional(rollbackFor = Exception.class)
  default E update(E entity) {
    entity = beforeUpdate(entity);
    if (entity == null) {
      return null;
    }
    E savedEntity = getRepository().save(entity);
    return afterUpdate(savedEntity);
  }

  /**
   * Lưu thực thể (Tạo mới hoặc Cập nhật).
   *
   * <p>Tương tự như {@link #update(Object)}, thường dùng cho cả thao tác tạo mới và cập nhật trong
   * JPA.
   *
   * @param entity Thực thể cần lưu. Không được null.
   * @return Thực thể sau khi lưu.
   */
  @Transactional(rollbackFor = Exception.class)
  default E save(E entity) {
    entity = beforeUpdate(entity);
    if (entity == null) {
      return null;
    }
    E savedEntity = getRepository().save(entity);
    return afterUpdate(savedEntity);
  }

  /**
   * Cập nhật thực thể dựa trên thông tin từ DTO.
   *
   * <p>Tìm thực thể cũ theo ID, cập nhật dữ liệu từ DTO vào thực thể đó, sau đó lưu lại.
   *
   * @param <S> Kiểu của DTO đầu vào.
   * @param updateEntity DTO chứa thông tin cập nhật. Không được null.
   * @param id ID của thực thể cần cập nhật. Không được null.
   * @return Thực thể sau khi cập nhật.
   * @throws com.natswarchuan.genericservice.exception.HttpException Nếu không tìm thấy thực thể
   *     hoặc lỗi mapping.
   */
  @Transactional(rollbackFor = Exception.class)
  default <S extends IDto<E>> E update(@NonNull S updateEntity, @NonNull ID id) {
    E oldEntity = findByIdInternal(id);
    E ent = updateEntity.updateEntity(oldEntity);
    ent = beforeUpdate(ent);
    if (ent == null) {
      return null;
    }
    E savedEntity = getRepository().save(ent);
    return afterUpdate(savedEntity);
  }

  /**
   * Cập nhật thực thể và trả về kết quả dưới dạng DTO.
   *
   * @param <S> Kiểu của DTO kết quả.
   * @param dtoClass Lớp DTO đích.
   * @param entity Thực thể cần cập nhật. Không được null.
   * @return Đối tượng DTO chứa dữ liệu sau khi cập nhật.
   */
  @Transactional(rollbackFor = Exception.class)
  default <S extends IDto<E>> S update(@NonNull Class<S> dtoClass, E entity) {
    entity = beforeUpdate(entity);
    if (entity == null) {
      return null;
    }
    E savedEntity = getRepository().save(entity);
    savedEntity = afterUpdate(savedEntity);
    if (savedEntity == null) {
      return null;
    }
    return mapToDto(savedEntity, dtoClass);
  }

  /**
   * Lưu thực thể và trả về kết quả dưới dạng DTO.
   *
   * @param <S> Kiểu của DTO kết quả.
   * @param dtoClass Lớp DTO đích.
   * @param entity Thực thể cần lưu. Không được null.
   * @return Đối tượng DTO chứa dữ liệu sau khi lưu.
   */
  @Transactional(rollbackFor = Exception.class)
  default <S extends IDto<E>> S save(@NonNull Class<S> dtoClass, E entity) {
    entity = beforeUpdate(entity);
    if (entity == null) {
      return null;
    }
    E savedEntity = getRepository().save(entity);
    savedEntity = afterUpdate(savedEntity);
    if (savedEntity == null) {
      return null;
    }
    return mapToDto(savedEntity, dtoClass);
  }

  /**
   * Cập nhật thực thể từ DTO đầu vào và trả về DTO kết quả.
   *
   * <p>Chuyển đổi DTO đầu vào sang Entity, thực hiện cập nhật, sau đó chuyển đổi Entity kết quả
   * sang DTO đích.
   *
   * @param <S> Kiểu DTO kết quả.
   * @param <T> Kiểu DTO đầu vào.
   * @param dtoClass Lớp DTO đích cho kết quả trả về.
   * @param dto DTO chứa dữ liệu cập nhật. Không được null.
   * @return Đối tượng DTO kết quả.
   */
  @Transactional(rollbackFor = Exception.class)
  default <S extends IDto<E>, T extends IDto<E>> S update(@NonNull Class<S> dtoClass, T dto) {
    E entity = dto.toEntity();
    entity = beforeUpdate(entity);
    if (entity == null) {
      return null;
    }
    E savedEntity = getRepository().save(entity);
    savedEntity = afterUpdate(savedEntity);
    if (savedEntity == null) {
      return null;
    }
    return mapToDto(savedEntity, dtoClass);
  }

  /**
   * Lưu thực thể từ DTO đầu vào và trả về DTO kết quả.
   *
   * @param <S> Kiểu DTO kết quả.
   * @param <T> Kiểu DTO đầu vào.
   * @param dtoClass Lớp DTO đích cho kết quả trả về.
   * @param dto DTO chứa dữ liệu lưu. Không được null.
   * @return Đối tượng DTO kết quả.
   */
  @Transactional(rollbackFor = Exception.class)
  default <S extends IDto<E>, T extends IDto<E>> S save(@NonNull Class<S> dtoClass, T dto) {
    E entity = dto.toEntity();
    entity = beforeUpdate(entity);
    if (entity == null) {
      return null;
    }
    E savedEntity = getRepository().save(entity);
    savedEntity = afterUpdate(savedEntity);
    if (savedEntity == null) {
      return null;
    }
    return mapToDto(savedEntity, dtoClass);
  }

  /**
   * Cập nhật thực thể từ DTO Request và trả về DTO Response khác kiểu.
   *
   * <p>Tìm thực thể cũ, map dữ liệu từ Request DTO, lưu và map sang Response DTO.
   *
   * @param <RQ> Kiểu DTO request (đầu vào).
   * @param <RP> Kiểu DTO response (đầu ra).
   * @param updateEntity DTO chứa dữ liệu cập nhật. Không được null.
   * @param id ID của thực thể. Không được null.
   * @param rsClass Lớp DTO cho kết quả trả về.
   * @return Đối tượng DTO kết quả.
   * @throws com.natswarchuan.genericservice.exception.HttpException Nếu không tìm thấy thực thể.
   */
  @Transactional(rollbackFor = Exception.class)
  default <RQ extends IDto<E>, RP extends IDto<E>> RP update(
      @NonNull RQ updateEntity, @NonNull ID id, @NonNull Class<RP> rsClass) {
    E oldEntity = findByIdInternal(id);
    E ent = updateEntity.updateEntity(oldEntity);
    ent = beforeUpdate(ent);
    if (ent == null) {
      return null;
    }
    E savedEntity = getRepository().save(ent);
    savedEntity = afterUpdate(savedEntity);
    if (savedEntity == null) {
      return null;
    }
    return mapToDto(savedEntity, rsClass);
  }

  /**
   * Cập nhật thực thể theo ID và trả về DTO.
   *
   * @param <S> Kiểu DTO kết quả.
   * @param updateEntity Thực thể chứa thông tin cập nhật.
   * @param id ID của thực thể.
   * @param dtoClass Lớp DTO đích.
   * @return Đối tượng DTO kết quả.
   * @throws com.natswarchuan.genericservice.exception.HttpException Nếu không tìm thấy thực thể.
   */
  @Transactional(rollbackFor = Exception.class)
  default <S extends IDto<E>> S update(
      @NonNull E updateEntity, @NonNull ID id, @NonNull Class<S> dtoClass) {
    findByIdInternal(id);
    E entity = beforeUpdate(updateEntity);
    if (entity == null) {
      return null;
    }
    E saved = getRepository().save(entity);
    saved = afterUpdate(saved);
    if (saved == null) {
      return null;
    }
    return mapToDto(saved, dtoClass);
  }

  /**
   * Cập nhật hàng loạt các thực thể thỏa mãn điều kiện lọc.
   *
   * <p>Lưu ý: Phương thức mặc định này tìm tất cả thực thể theo spec, gọi hook {@code beforeUpdate}
   * trên từng phần tử (bỏ qua tham số {@code updateEntity}), sau đó lưu lại.
   *
   * @param updateEntity Thực thể mẫu (có thể không được dùng trong implementation mặc định).
   * @param spec Điều kiện lọc thực thể cần cập nhật.
   * @return Danh sách các thực thể sau khi cập nhật.
   */
  @Transactional(rollbackFor = Exception.class)
  default List<E> update(@NonNull E updateEntity, @NonNull Specification<E> spec) {
    List<E> entities = getRepository().findAll(spec);
    for (int i = 0; i < entities.size(); i++) {
      entities.set(i, beforeUpdate(entities.get(i)));
    }
    List<E> savedEntities = getRepository().saveAll(entities);
    for (int i = 0; i < savedEntities.size(); i++) {
      savedEntities.set(i, afterUpdate(savedEntities.get(i)));
    }
    return savedEntities;
  }

  /**
   * Hook được gọi trước khi thực thể được lưu/cập nhật vào DB.
   *
   * <p>Có thể ghi đè để thực hiện validate, tính toán lại giá trị, hoặc cập nhật trường audit
   * (updatedAt, updatedBy).
   *
   * @param entity Thực thể sắp được lưu.
   * @return Thực thể sau khi xử lý.
   */
  default E beforeUpdate(E entity) {
    return entity;
  }

  /**
   * Hook được gọi sau khi thực thể đã được lưu/cập nhật thành công.
   *
   * <p>Có thể ghi đè để thực hiện các tác vụ phụ như clear cache, ghi log, gửi thông báo.
   *
   * @param entity Thực thể đã được lưu.
   * @return Thực thể sau khi xử lý.
   */
  default E afterUpdate(E entity) {
    return entity;
  }
}
