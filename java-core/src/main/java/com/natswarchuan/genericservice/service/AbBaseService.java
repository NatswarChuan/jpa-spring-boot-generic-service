package com.natswarchuan.genericservice.service;

import com.natswarchuan.genericservice.dto.IDto;
import com.natswarchuan.genericservice.exception.HttpException;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.http.HttpStatus;
import org.springframework.lang.NonNull;

/**
 * Lớp trừu tượng cơ sở cung cấp các trường và phương thức tiện ích dùng chung.
 *
 * @param <E>  Kiểu thực thể (Entity).
 * @param <ID> Kiểu khóa chính của thực thể.
 * @author NatswarChuan
 */
public abstract class AbBaseService<E, ID> {

    /** Repository JPA để thực hiện các thao tác truy cập dữ liệu. */
    protected final JpaRepository<E, ID> repository;

    /** Executor cho Specification, hỗ trợ truy vấn động. */
    protected final JpaSpecificationExecutor<E> specExecutor;

    /**
     * Khởi tạo service với repository tương ứng.
     *
     * @param repository Repository JPA hỗ trợ cả CRUD và Specification.
     * @param <R>        Kiểu repository (extends JpaRepository &amp;
     *                   JpaSpecificationExecutor).
     */
    protected <R extends JpaRepository<E, ID> & JpaSpecificationExecutor<E>> AbBaseService(@NonNull R repository) {
        this.repository = repository;
        this.specExecutor = repository;
    }

    /**
     * Chuyển đổi Entity sang DTO.
     *
     * @param entity   Thực thể nguồn.
     * @param dtoClass Lớp DTO đích.
     * @param <S>      Kiểu DTO.
     * @return Đối tượng DTO sau khi chuyển đổi.
     */
    protected <S extends IDto<E>> S mapToDto(@NonNull E entity, @NonNull Class<S> dtoClass) {
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
     */
    protected <S extends IDto<E>> S mapToDto(@NonNull E entity, @NonNull Class<S> dtoClass, String language) {
        try {
            S s = dtoClass.getDeclaredConstructor().newInstance();
            if (language != null) {
                s.fromEntity(entity, language);
            } else {
                s.fromEntity(entity);
            }
            return s;
        } catch (Exception ex) {
            throw new HttpException(HttpStatus.INTERNAL_SERVER_ERROR,
                    "Lỗi khi chuyển đổi entity sang DTO: " + ex.getMessage());
        }
    }
}
