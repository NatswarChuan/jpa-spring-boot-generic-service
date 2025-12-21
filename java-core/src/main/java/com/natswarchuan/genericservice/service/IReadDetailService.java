package com.natswarchuan.genericservice.service;

import com.natswarchuan.genericservice.dto.IDto;
import com.natswarchuan.genericservice.exception.HttpException;
import org.springframework.data.jpa.domain.Specification;

/**
 * Giao diện dịch vụ cho các thao tác đọc chi tiết (Read Detail).
 *
 * @param <E>  Kiểu dữ liệu của thực thể.
 * @param <ID> Kiểu dữ liệu của khóa chính (ID) của thực thể.
 * @author NatswarChuan
 */
public interface IReadDetailService<E, ID> {

    /**
     * Lấy một thực thể theo khóa chính (ID).
     *
     * @param id Khóa chính (ID) của thực thể cần tìm.
     * @return Thực thể được tìm thấy.
     * @throws HttpException Nếu không tìm thấy thực thể với ID cung cấp.
     */
    E findById(ID id);

    /**
     * Tìm một thực thể duy nhất dựa trên các tiêu chí lọc.
     *
     * @param spec Đối tượng {@link Specification} chứa các điều kiện lọc.
     * @return Thực thể tìm thấy.
     * @throws HttpException Nếu không tìm thấy thực thể nào khớp với tiêu chí
     *                       ({@code
     *     HttpStatus.NOT_FOUND}).
     */
    E findOne(Specification<E> spec);

    /**
     * Lấy một thực thể theo khóa chính (ID) và chuyển đổi nó thành DTO.
     *
     * @param <S>      Kiểu của DTO, phải triển khai {@link IDto} cho thực thể
     *                 {@code E}.
     * @param id       Khóa chính (ID) của thực thể cần tìm.
     * @param dtoClass Lớp (Class) của DTO. Được sử dụng để tạo instance mới của
     *                 DTO.
     * @return DTO tương ứng với thực thể được tìm thấy.
     * @throws HttpException Nếu không tìm thấy thực thể với ID cung cấp, hoặc nếu
     *                       có lỗi xảy ra trong
     *                       quá trình chuyển đổi.
     */
    <S extends IDto<E>> S findById(ID id, Class<S> dtoClass);

    /**
     * Lấy một thực thể theo khóa chính (ID), chuyển đổi thành DTO và có hỗ trợ đa
     * ngôn ngữ.
     *
     * @param <S>      Kiểu của DTO, phải triển khai {@link IDto}.
     * @param id       Khóa chính (ID) của thực thể cần tìm.
     * @param dtoClass Lớp của DTO để tạo instance.
     * @param language Mã ngôn ngữ (ví dụ: "vi", "en") để lấy dữ liệu tương ứng.
     * @return DTO tương ứng với thực thể được tìm thấy.
     * @throws HttpException Nếu không tìm thấy thực thể hoặc có lỗi khi chuyển đổi.
     */
    <S extends IDto<E>> S findById(ID id, Class<S> dtoClass, String language);

    /**
     * Tìm một thực thể duy nhất dựa trên ID và các tiêu chí lọc, sau đó chuyển đổi
     * sang DTO.
     *
     * @param <S>      Kiểu của DTO, phải triển khai {@link IDto}.
     * @param id       Khóa chính của thực thể (thường được dùng để xây dựng
     *                 {@code spec}).
     * @param dtoClass Lớp của DTO để chuyển đổi.
     * @param spec     Đối tượng {@link Specification} chứa các điều kiện lọc.
     * @return DTO tương ứng với thực thể tìm thấy.
     * @throws HttpException Nếu không tìm thấy thực thể nào khớp với tiêu chí.
     */
    <S extends IDto<E>> S findById(ID id, Class<S> dtoClass, Specification<E> spec);

    /**
     * Tìm một thực thể duy nhất dựa trên ID và các tiêu chí lọc, sau đó chuyển đổi
     * sang DTO với hỗ
     * trợ đa ngôn ngữ.
     *
     * @param <S>      Kiểu của DTO, phải triển khai {@link IDto}.
     * @param id       Khóa chính của thực thể (thường được dùng để xây dựng
     *                 {@code spec}).
     * @param dtoClass Lớp của DTO để chuyển đổi.
     * @param spec     Đối tượng {@link Specification} chứa các điều kiện lọc (ví
     *                 dụ: kết hợp id và các
     *                 điều kiện khác).
     * @param language Mã ngôn ngữ để lấy dữ liệu tương ứng.
     * @return DTO tương ứng với thực thể tìm thấy.
     * @throws HttpException Nếu không tìm thấy thực thể nào khớp với tiêu chí.
     */
    <S extends IDto<E>> S findById(ID id, Class<S> dtoClass, Specification<E> spec, String language);

    /**
     * Tìm một thực thể duy nhất dựa trên các tiêu chí lọc và chuyển đổi sang DTO.
     *
     * @param <S>      Kiểu của DTO, phải triển khai {@link IDto}.
     * @param dtoClass Lớp của DTO để chuyển đổi.
     * @param spec     Đối tượng {@link Specification} chứa các điều kiện lọc.
     * @return DTO tương ứng với thực thể tìm thấy.
     * @throws HttpException Nếu không tìm thấy thực thể nào khớp với tiêu chí
     *                       ({@code
     *     HttpStatus.NOT_FOUND}) hoặc có lỗi khi chuyển đổi entity sang DTO ({@code
     *     HttpStatus.INTERNAL_SERVER_ERROR}).
     */
    <S extends IDto<E>> S findOne(Class<S> dtoClass, Specification<E> spec);

    /**
     * Tìm một thực thể duy nhất dựa trên các tiêu chí lọc và chuyển đổi sang DTO,
     * có hỗ trợ đa ngôn
     * ngữ.
     *
     * @param <S>      Kiểu của DTO, phải triển khai {@link IDto}.
     * @param dtoClass Lớp của DTO để chuyển đổi.
     * @param spec     Đối tượng {@link Specification} chứa các điều kiện lọc.
     * @param language Mã ngôn ngữ (ví dụ: "vi", "en") để lấy dữ liệu tương ứng.
     * @return DTO tương ứng với thực thể tìm thấy.
     * @throws HttpException Nếu không tìm thấy thực thể nào khớp với tiêu chí
     *                       ({@code
     *     HttpStatus.NOT_FOUND}) hoặc có lỗi khi chuyển đổi entity sang DTO ({@code
     *     HttpStatus.INTERNAL_SERVER_ERROR}).
     */
    <S extends IDto<E>> S findOne(Class<S> dtoClass, Specification<E> spec, String language);

    /**
     * Kiểm tra sự tồn tại của thực thể dựa trên các tiêu chí lọc.
     *
     * @param spec Đối tượng {@link Specification} chứa các điều kiện lọc.
     * @return {@code true} nếu tồn tại ít nhất một thực thể khớp, ngược lại
     *         {@code false}.
     */
    boolean exists(Specification<E> spec);
}
