package com.natswarchuan.genericservice.service.trait;

import com.natswarchuan.genericservice.dto.IDto;
import com.natswarchuan.genericservice.exception.HttpException;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.lang.NonNull;

/**
 * Giao diện dịch vụ cho các thao tác xóa (Delete).
 *
 * @param <E>  Kiểu dữ liệu của thực thể.
 * @param <ID> Kiểu dữ liệu của khóa chính (ID) của thực thể.
 * @author NatswarChuan
 */
public interface IDeleteService<E, ID> {

    /**
     * Xóa một thực thể dựa trên khóa chính (ID) của nó.
     *
     * @param id Khóa chính (ID) của thực thể cần xóa.
     * @throws HttpException Nếu không tìm thấy thực thể với ID cung cấp, hoặc nếu
     *                       có lỗi xảy ra trong
     *                       quá trình xóa.
     */
    void delete(ID id);

    /**
     * Xóa một thực thể.
     *
     * @param deleteEntity Thực thể cần xóa (có thể không được sử dụng trực tiếp nếu
     *                     chỉ cần ID).
     * @param id           Khóa chính (ID) của thực thể cần xóa (dùng để kiểm tra sự
     *                     tồn tại).
     * @throws HttpException Nếu không tìm thấy thực thể với ID cung cấp, hoặc nếu
     *                       có lỗi xảy ra trong
     *                       quá trình xóa.
     */
    void delete(@NonNull E deleteEntity, @NonNull ID id);

    /**
     * Xóa một thực thể dựa trên thông tin từ DTO và ID.
     *
     * @param <S>          Kiểu của DTO, phải triển khai {@link IDto} cho thực thể
     *                     {@code E}.
     * @param deleteEntity Đối tượng DTO (có thể không được sử dụng trực tiếp nếu
     *                     chỉ cần ID).
     * @param id           Khóa chính (ID) của thực thể cần xóa.
     * @throws HttpException Nếu không tìm thấy thực thể với ID cung cấp, hoặc nếu
     *                       có lỗi xảy ra trong
     *                       quá trình xóa.
     */
    <S extends IDto<E>> void delete(@NonNull S deleteEntity, @NonNull ID id);

    /**
     * Xóa một thực thể và trả về DTO đại diện cho thực thể đã bị xóa.
     *
     * <p>
     * Thực hiện xóa thực thể khỏi cơ sở dữ liệu và trả về thông tin của nó dưới
     * dạng DTO.
     *
     * @param <S>      Kiểu của DTO kết quả, phải triển khai {@link IDto}.
     * @param dtoClass Lớp của DTO kết quả.
     * @param entity   Thực thể cần xóa.
     * @return DTO của thực thể đã xóa thành công.
     * @throws HttpException Nếu có lỗi trong quá trình xóa hoặc chuyển đổi sang
     *                       DTO.
     */
    <S extends IDto<E>> S delete(@NonNull Class<S> dtoClass, @NonNull E entity);

    /**
     * Xóa một thực thể dựa trên DTO dữ liệu cung cấp và trả về DTO kết quả.
     *
     * <p>
     * Sử dụng thông tin từ DTO đầu vào để tìm và xóa thực thể, sau đó trả về DTO
     * kết quả.
     *
     * @param <S>      Kiểu của DTO kết quả, phải triển khai {@link IDto}.
     * @param <T>      Kiểu của DTO đầu vào, phải triển khai {@link IDto}.
     * @param dtoClass Lớp của DTO kết quả.
     * @param dto      DTO chứa dữ liệu của thực thể cần xóa.
     * @return DTO của thực thể đã xóa thành công.
     * @throws HttpException Nếu có lỗi khi tìm, xóa hoặc chuyển đổi DTO.
     */
    <S extends IDto<E>, T extends IDto<E>> S delete(@NonNull Class<S> dtoClass, @NonNull T dto);

    /**
     * Xóa một thực thể dựa trên khóa chính (ID) và trả về DTO của thực thể đã xóa.
     *
     * @param <S>      Kiểu của DTO kết quả.
     * @param id       Khóa chính (ID) của thực thể cần xóa.
     * @param dtoClass Lớp của DTO kết quả.
     * @return DTO của thực thể đã xóa thành công.
     * @throws HttpException Nếu không tìm thấy thực thể.
     */
    <S extends IDto<E>> S delete(@NonNull ID id, @NonNull Class<S> dtoClass);

    /**
     * Xóa các thực thể khớp với tiêu chí lọc.
     *
     * @param spec Đối tượng {@link Specification} chứa các điều kiện lọc các thực
     *             thể cần xóa.
     */
    void delete(@NonNull Specification<E> spec);
}
