package com.natswarchuan.genericservice.service;

import com.natswarchuan.genericservice.dto.IDto;
import com.natswarchuan.genericservice.exception.HttpException;
import java.util.Collection;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

/**
 * Giao diện dịch vụ cho các thao tác đọc danh sách (Read Summary).
 *
 * @param <E>  Kiểu dữ liệu của thực thể.
 * @param <ID> Kiểu dữ liệu của khóa chính (ID) của thực thể.
 * @author NatswarChuan
 */
public interface IReadSummaryService<E, ID> {


    /**
     * Lấy danh sách tất cả các thực thể.
     *
     * @return Danh sách tất cả các thực thể. Trả về danh sách rỗng nếu không có
     * thực thể nào.
     * @throws HttpException (Mặc dù không được ném trực tiếp trong Javadoc này, các
     * triển khai có thể
     * ném nếu có lỗi truy cập dữ liệu).
     */
    List<E> findAll();

    /**
     * Tìm tất cả các thực thể dựa trên một tập hợp các khóa chính (IDs) được cung
     * cấp.
     *
     * @param ids Tập hợp các khóa chính (IDs) của các thực thể cần tìm.
     * @return Danh sách các thực thể được tìm thấy. Trả về danh sách rỗng nếu tập
     * hợp {@code ids} là
     * {@code null}, rỗng, hoặc không tìm thấy thực thể nào.
     */
    List<E> findAllById(Collection<ID> ids);

    /**
     * Tìm tất cả các thực thể khớp với các tiêu chí lọc được cung cấp.
     *
     * <p>
     * Phương thức này sử dụng {@link Specification} để thực hiện truy vấn với các
     * điều kiện động.
     *
     * @param spec Đối tượng {@link Specification} chứa các điều kiện lọc.
     * @return Danh sách các thực thể tìm thấy. Trả về danh sách rỗng nếu không tìm
     * thấy thực thể nào
     * khớp với tiêu chí.
     */
    List<E> findAll(Specification<E> spec);

    /**
     * Đếm số lượng thực thể khớp với tiêu chí lọc.
     *
     * @param spec Đối tượng {@link Specification} chứa các điều kiện lọc.
     * @return Số lượng thực thể tìm thấy.
     */
    long count(Specification<E> spec);

    /**
     * Lấy danh sách các thực thể theo trang.
     *
     * @param page Số trang cần lấy (thường bắt đầu từ 0).
     * @param size Số lượng thực thể trên mỗi trang.
     * @return Đối tượng {@link Page} chứa danh sách các thực thể của trang hiện tại
     * và thông tin phân
     * trang.
     * @throws HttpException (Mặc dù không được ném trực tiếp trong Javadoc này, các
     * triển khai có thể
     * ném nếu có lỗi truy cập dữ liệu).
     */
    Page<E> findAll(int page, int size);

    /**
     * Tìm kiếm và phân trang các thực thể (không chuyển đổi sang DTO) dựa trên các
     * tiêu chí lọc.
     *
     * @param <S>      Kiểu generic không được sử dụng trong phương thức này nhưng
     * có thể cần thiết cho
     * tính tương thích trong các lớp triển khai.
     * @param pageable Đối tượng {@link Pageable} chứa thông tin phân trang.
     * @param spec     Đối tượng {@link Specification} chứa các điều kiện lọc.
     * @return Một trang {@link Page} chứa các thực thể {@code E} thô.
     */
    <S extends IDto<E>> Page<E> findAll(Pageable pageable, Specification<E> spec);


    /**
     * Lấy danh sách tất cả các thực thể và chuyển đổi chúng thành danh sách các
     * DTO.
     *
     * @param <S>      Kiểu của DTO, phải triển khai {@link IDto} cho thực thể
     * {@code E}.
     * @param dtoClass Lớp (Class) của DTO. Được sử dụng để tạo các instance mới của
     * DTO.
     * @return Danh sách các DTO tương ứng với tất cả các thực thể. Trả về danh sách
     * rỗng nếu không có
     * thực thể nào.
     * @throws HttpException Nếu có lỗi xảy ra trong quá trình truy vấn hoặc chuyển
     * đổi.
     */
    <S extends IDto<E>> List<S> findAll(Class<S> dtoClass);

    /**
     * Lấy danh sách tất cả các thực thể, chuyển đổi sang DTO và có hỗ trợ đa ngôn
     * ngữ.
     *
     * @param <S>      Kiểu của DTO, phải triển khai {@link IDto}.
     * @param dtoClass Lớp của DTO để chuyển đổi.
     * @param language Mã ngôn ngữ (ví dụ: "vi", "en") để lấy dữ liệu tương ứng.
     * @return Danh sách các DTO đã được chuyển đổi.
     */
    <S extends IDto<E>> List<S> findAll(Class<S> dtoClass, String language);

    /**
     * Tìm tất cả các thực thể dựa trên một tập hợp các khóa chính (IDs) và chuyển
     * đổi sang danh sách DTO.
     *
     * @param <S>      Kiểu của DTO, phải triển khai {@link IDto}.
     * @param ids      Tập hợp các khóa chính (IDs).
     * @param dtoClass Lớp của DTO để chuyển đổi.
     * @return Danh sách các DTO tương ứng.
     */
    <S extends IDto<E>> List<S> findAllById(Collection<ID> ids, Class<S> dtoClass);

    /**
     * Tìm tất cả các thực thể dựa trên một tập hợp các khóa chính (IDs), chuyển đổi
     * sang danh sách DTO
     * và có hỗ trợ đa ngôn ngữ.
     *
     * @param <S>      Kiểu của DTO, phải triển khai {@link IDto}.
     * @param ids      Tập hợp các khóa chính (IDs).
     * @param dtoClass Lớp của DTO để chuyển đổi.
     * @param language Mã ngôn ngữ.
     * @return Danh sách các DTO tương ứng.
     */
    <S extends IDto<E>> List<S> findAllById(Collection<ID> ids, Class<S> dtoClass, String language);

    /**
     * Tìm tất cả các thực thể dựa trên các tiêu chí lọc và chuyển đổi sang danh
     * sách DTO.
     *
     * @param <S>      Kiểu của DTO, phải triển khai {@link IDto}.
     * @param dtoClass Lớp của DTO để chuyển đổi.
     * @param spec     Đối tượng {@link Specification} chứa các điều kiện lọc.
     * @return Danh sách các DTO tương ứng với các thực thể tìm thấy.
     * @throws HttpException Nếu có lỗi khi chuyển đổi entity sang DTO ({@code
     * HttpStatus.INTERNAL_SERVER_ERROR}).
     */
    <S extends IDto<E>> List<S> findAll(Class<S> dtoClass, Specification<E> spec);


    /**
     * Lấy danh sách các thực thể theo trang và chuyển đổi chúng thành danh sách các
     * DTO.
     *
     * @param <S>      Kiểu của DTO, phải triển khai {@link IDto} cho thực thể
     * {@code E}.
     * @param page     Số trang cần lấy (thường bắt đầu từ 0).
     * @param size     Số lượng thực thể trên mỗi trang.
     * @param dtoClass Lớp (Class) của DTO. Được sử dụng để tạo các instance mới của
     * DTO.
     * @return Đối tượng {@link Page} chứa danh sách các DTO của trang hiện tại và
     * thông tin phân
     * trang.
     * @throws HttpException (Mặc dù không được ném trực tiếp trong Javadoc này, các
     * triển khai có thể
     * ném nếu có lỗi truy cập dữ liệu hoặc chuyển đổi).
     */
    <S extends IDto<E>> Page<S> findAll(int page, int size, Class<S> dtoClass);

    /**
     * Lấy danh sách các thực thể theo trang, có hỗ trợ đa ngôn ngữ và chuyển đổi
     * sang DTO.
     *
     * @param <S>      Kiểu của DTO, phải triển khai {@link IDto}.
     * @param page     Số trang (bắt đầu từ 0).
     * @param size     Số lượng thực thể trên mỗi trang.
     * @param dtoClass Lớp của DTO để chuyển đổi.
     * @param language Mã ngôn ngữ (ví dụ: "vi", "en") để lấy dữ liệu tương ứng.
     * @return Một trang {@link Page} chứa các DTO đã được chuyển đổi.
     */
    <S extends IDto<E>> Page<S> findAll(int page, int size, Class<S> dtoClass, String language);

    /**
     * Tìm kiếm và phân trang các thực thể dựa trên các tiêu chí lọc.
     *
     * @param <S>      Kiểu của DTO, phải triển khai {@link IDto}.
     * @param page     Số trang.
     * @param size     Kích thước trang.
     * @param spec     Đối tượng {@link Specification} chứa các điều kiện lọc.
     * @param dtoClass Lớp DTO để chuyển đổi.
     * @return Một trang {@link Page} chứa các DTO đã được chuyển đổi.
     * @see #findAll(int, int, Specification, Class, String)
     */
    <S extends IDto<E>> Page<S> findAll(int page, int size, Specification<E> spec, Class<S> dtoClass);

    /**
     * Tìm kiếm và phân trang các thực thể dựa trên các tiêu chí lọc, có hỗ trợ đa
     * ngôn ngữ.
     *
     * @param <S>      Kiểu của DTO, phải triển khai {@link IDto}.
     * @param page     Số trang.
     * @param size     Kích thước trang.
     * @param spec     Đối tượng {@link Specification} chứa các điều kiện lọc.
     * @param dtoClass Lớp DTO để chuyển đổi.
     * @param language Ngôn ngữ.
     * @return Một trang {@link Page} chứa các DTO đã được chuyển đổi.
     * @see findAll(int, int, Class, String)
     */
    <S extends IDto<E>> Page<S> findAll(
            int page, int size, Specification<E> spec, Class<S> dtoClass, String language);

    /**
     * Tìm kiếm và phân trang các thực thể dựa trên các tiêu chí lọc, sử dụng đối
     * tượng {@link
     * Pageable}.
     *
     * @param <S>      Kiểu của DTO, phải triển khai {@link IDto}.
     * @param pageable Đối tượng {@link Pageable} chứa thông tin phân trang (số
     * trang, kích thước, sắp
     * xếp).
     * @param spec     Đối tượng {@link Specification} chứa các điều kiện lọc.
     * @param dtoClass Lớp của DTO để chuyển đổi.
     * @return Một trang {@link Page} chứa các DTO đã được chuyển đổi.
     */
    <S extends IDto<E>> Page<S> findAll(Pageable pageable, Specification<E> spec, Class<S> dtoClass);

    /**
     * Tìm kiếm và phân trang các thực thể dựa trên các tiêu chí lọc, có hỗ trợ đa
     * ngôn ngữ, sử dụng
     * đối tượng {@link Pageable}.
     *
     * @param <S>          Kiểu của DTO, phải triển khai {@link IDto}.
     * @param pageable     Đối tượng {@link Pageable} chứa thông tin phân trang (số
     * trang, kích thước, sắp
     * xếp).
     * @param spec         Đối tượng {@link Specification} chứa các điều kiện lọc.
     * @param dtoClass     Lớp của DTO để chuyển đổi.
     * @param languageCode Mã ngôn ngữ (ví dụ: "vi", "en") để lấy dữ liệu tương ứng.
     * @return Một trang {@link Page} chứa các DTO đã được chuyển đổi.
     */
    <S extends IDto<E>> Page<S> findAll(
            Pageable pageable, Specification<E> spec, Class<S> dtoClass, String languageCode);
}