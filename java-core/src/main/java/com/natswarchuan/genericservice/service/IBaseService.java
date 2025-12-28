package com.natswarchuan.genericservice.service;

import com.natswarchuan.genericservice.dto.IDto;
import com.natswarchuan.genericservice.exception.HttpException;
import com.natswarchuan.genericservice.repository.IRepository;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.lang.NonNull;
import org.springframework.transaction.annotation.Transactional;

/**
 * Interface cơ sở cho các service, cung cấp các phương thức tiện ích chung.
 *
 * @param <E>  Kiểu thực thể (Entity).
 * @param <ID> Kiểu khóa chính của thực thể.
 * @author NatswarChuan
 */
public interface IBaseService<E, ID> {

    /**
     * Trả về repository của thực thể.
     * <p>
     * Các lớp triển khai phải override phương thức này để cung cấp repository.
     *
     * @return Repository của thực thể.
     */
    IRepository<E, ID> getRepository();

    /**
     * Tìm thực thể theo ID dùng nội bộ (throws exception nếu not found).
     *
     * @param id ID của thực thể.
     * @return Thực thể tìm được.
     * @throws HttpException nếu không tìm thấy.
     */
    default E findByIdInternal(@NonNull ID id) {
        return getRepository().findById(id).orElseThrow(() -> new HttpException(
                HttpStatus.NOT_FOUND, "Không tìm thấy thực thể với id= " + id));
    }

    /**
     * Chuyển đổi Entity sang DTO.
     *
     * @param entity   Thực thể nguồn.
     * @param dtoClass Lớp DTO đích.
     * @param <S>      Kiểu DTO.
     * @return Đối tượng DTO sau khi chuyển đổi.
     * @throws HttpException nếu xảy ra lỗi khi khởi tạo DTO.
     */
    @Transactional(readOnly = true)
    default <S extends IDto<E>> S mapToDto(@NonNull E entity, @NonNull Class<S> dtoClass) {
        try {
            S s = dtoClass.getDeclaredConstructor().newInstance();
            s.fromEntity(entity);
            return s;
        } catch (Exception ex) {
            throw new HttpException(HttpStatus.INTERNAL_SERVER_ERROR,
                    "Lỗi khi chuyển đổi entity sang DTO: " + ex.getMessage());
        }
    }

    /**
     * Chuyển đổi Entity sang DTO có hỗ trợ xử lý đa ngôn ngữ.
     *
     * @param entity   Thực thể nguồn.
     * @param dtoClass Lớp DTO đích.
     * @param language Mã ngôn ngữ (ví dụ: "vi", "en").
     * @param <S>      Kiểu DTO.
     * @return Đối tượng DTO sau khi chuyển đổi.
     * @throws HttpException nếu xảy ra lỗi khi khởi tạo DTO.
     */
    default <S extends IDto<E>> S mapToDto(@NonNull E entity, @NonNull Class<S> dtoClass, String language) {
        return mapToDto(entity, dtoClass);
    }

    /**
     * Chuyển đổi danh sách Entity sang danh sách DTO có hỗ trợ đa ngôn ngữ.
     *
     * @param entities Danh sách thực thể nguồn.
     * @param dtoClass Lớp DTO đích.
     * @param language Mã ngôn ngữ (ví dụ: "vi", "en").
     * @param <S>      Kiểu DTO.
     * @return Danh sách đối tượng DTO sau khi chuyển đổi.
     * @throws HttpException nếu xảy ra lỗi khi khởi tạo DTO.
     */
    default <S extends IDto<E>> List<S> mapToDtos(@NonNull List<E> entities, @NonNull Class<S> dtoClass,
            String language) {

        return entities.stream().map(entity -> {
            if (entity == null) {
                return null;
            }
            return mapToDto(entity, dtoClass, language);
        }).collect(Collectors.toList());
    }

    /**
     * Chuyển đổi danh sách Entity sang danh sách DTO.
     *
     * @param entities Danh sách thực thể nguồn.
     * @param dtoClass Lớp DTO đích.
     * @param <S>      Kiểu DTO.
     * @return Danh sách đối tượng DTO sau khi chuyển đổi.
     * @throws HttpException nếu xảy ra lỗi khi khởi tạo DTO.
     */
    default <S extends IDto<E>> List<S> mapToDtos(@NonNull List<E> entities, @NonNull Class<S> dtoClass) {
        return mapToDtos(entities, dtoClass, null);
    }

    /**
     * Chuyển đổi trang (Page) Entity sang trang DTO có hỗ trợ đa ngôn ngữ.
     *
     * @param entities Trang thực thể nguồn.
     * @param dtoClass Lớp DTO đích.
     * @param language Mã ngôn ngữ (ví dụ: "vi", "en").
     * @param <S>      Kiểu DTO.
     * @return Trang đối tượng DTO sau khi chuyển đổi.
     * @throws HttpException nếu xảy ra lỗi khi khởi tạo DTO.
     */
    default <S extends IDto<E>> Page<S> mapToDtos(@NonNull Page<E> entities, @NonNull Class<S> dtoClass,
            String language) {
        return entities.map(entity -> {
            if (entity == null) {
                return null;
            }
            return mapToDto(entity, dtoClass, language);
        });
    }

    /**
     * Chuyển đổi trang (Page) Entity sang trang DTO.
     *
     * @param entities Trang thực thể nguồn.
     * @param dtoClass Lớp DTO đích.
     * @param <S>      Kiểu DTO.
     * @return Trang đối tượng DTO sau khi chuyển đổi.
     * @throws HttpException nếu xảy ra lỗi khi khởi tạo DTO.
     */
    default <S extends IDto<E>> Page<S> mapToDtos(@NonNull Page<E> entities, @NonNull Class<S> dtoClass) {
        return mapToDtos(entities, dtoClass, null);
    }
}
