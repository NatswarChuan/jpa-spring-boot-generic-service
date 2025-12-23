package com.natswarchuan.genericservice.service.trait;

import com.natswarchuan.genericservice.dto.IDto;
import com.natswarchuan.genericservice.exception.HttpException;
import org.springframework.lang.NonNull;

/**
 * Giao diện dịch vụ cho các thao tác tạo mới (Create).
 *
 * @param <E>  Kiểu dữ liệu của thực thể.
 * @param <ID> Kiểu dữ liệu của khóa chính (ID) của thực thể.
 * @author NatswarChuan
 */
public interface ICreateService<E, ID> {

    /**
     * Tạo mới một thực thể.
     *
     * @param newEntity Thực thể mới cần tạo.
     * @return Thực thể đã được tạo thành công.
     * @throws HttpException (Mặc dù không được ném trực tiếp trong Javadoc này, các
     *                       triển khai có thể
     *                       ném nếu có lỗi trong quá trình lưu).
     */
    E create(@NonNull E newEntity);

    /**
     * Tạo mới một thực thể từ một đối tượng DTO.
     *
     * @param <S>       Kiểu của DTO, phải triển khai {@link IDto} cho thực thể
     *                  {@code E}.
     * @param newEntity Đối tượng DTO chứa thông tin của thực thể mới cần tạo.
     * @return Thực thể đã được tạo thành công.
     * @throws HttpException Nếu có lỗi xảy ra trong quá trình chuyển đổi DTO thành
     *                       thực thể hoặc
     *                       trong quá trình lưu thực thể.
     */
    <S extends IDto<E>> E create(@NonNull S newEntity);

    /**
     * Tạo mới một thực thể và trả về DTO kết quả.
     *
     * <p>
     * Lưu một thực thể mới hoàn toàn và trả về DTO đại diện cho nó.
     *
     * @param <S>      Kiểu của DTO kết quả, phải triển khai {@link IDto}.
     * @param dtoClass Lớp của DTO kết quả.
     * @param entity   Thực thể cần tạo mới.
     * @return DTO đại diện cho thực thể vừa tạo thành công.
     * @throws HttpException Nếu có lỗi khi lưu hoặc chuyển đổi sang DTO.
     */
    <S extends IDto<E>> S create(Class<S> dtoClass, @NonNull E entity);

    /**
     * Tạo mới một thực thể từ một DTO và trả về một DTO khác đại diện cho thực thể
     * đã tạo.
     *
     * @param <D>       Kiểu của DTO trả về, phải triển khai {@link IDto}.
     * @param <S>       Kiểu của DTO đầu vào, phải triển khai {@link IDto}.
     * @param newEntity DTO chứa dữ liệu để tạo thực thể mới.
     * @param dtoClass  Lớp của DTO sẽ được trả về.
     * @return Một DTO kiểu {@code D} đại diện cho thực thể vừa được tạo.
     * @throws HttpException Nếu có lỗi xảy ra trong quá trình tạo hoặc chuyển đổi.
     */
    <D extends IDto<E>, S extends IDto<E>> D create(@NonNull S newEntity, @NonNull Class<D> dtoClass);

    /**
     * Tạo mới một thực thể từ DTO và trả về DTO kết quả.
     *
     * <p>
     * Chuyển đổi dữ liệu từ DTO đầu vào để tạo thực thể mới và trả về DTO đại diện
     * cho thực thể đó.
     *
     * @param <S>      Kiểu của DTO kết quả, phải triển khai {@link IDto}.
     * @param <T>      Kiểu của DTO đầu vào, phải triển khai {@link IDto}.
     * @param dtoClass Lớp của DTO kết quả.
     * @param dto      DTO chứa dữ liệu để tạo mới.
     * @return DTO đại diện cho thực thể vừa tạo thành công.
     * @throws HttpException Nếu có lỗi khi ánh xạ DTO hoặc lưu thực thể mới.
     */
    <S extends IDto<E>, T extends IDto<E>> S create(@NonNull Class<S> dtoClass, @NonNull T dto);
}
