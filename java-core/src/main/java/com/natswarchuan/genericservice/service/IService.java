package com.natswarchuan.genericservice.service;

import com.natswarchuan.genericservice.dto.IDto;
import com.natswarchuan.genericservice.exception.HttpException;
import java.util.Collection;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

/**
 * Giao diện dịch vụ chung (service) cho các thực thể (entity).
 *
 * <p>
 * Định nghĩa các thao tác CRUD (Create, Read, Update, Delete) cơ bản và các
 * phương thức tiện ích
 * khác để làm việc với thực thể.
 *
 * @param <E>  Kiểu dữ liệu của thực thể.
 * @param <ID> Kiểu dữ liệu của khóa chính (ID) của thực thể.
 * @author NatswarChuan
 */
public interface IService<E, ID> {

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
     * Lấy danh sách tất cả các thực thể và chuyển đổi chúng thành danh sách các
     * DTO.
     *
     * @param <S>      Kiểu của DTO, phải triển khai {@link IDto} cho thực thể
     *                 {@code E}.
     * @param dtoClass Lớp (Class) của DTO. Được sử dụng để tạo các instance mới của
     *                 DTO.
     * @return Danh sách các DTO tương ứng với tất cả các thực thể. Trả về danh sách
     *         rỗng nếu không có
     *         thực thể nào.
     * @throws HttpException Nếu có lỗi xảy ra trong quá trình truy vấn hoặc chuyển
     *                       đổi.
     */
    <S extends IDto<E>> List<S> findAll(Class<S> dtoClass);

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
     * Lấy danh sách tất cả các thực thể.
     *
     * @return Danh sách tất cả các thực thể. Trả về danh sách rỗng nếu không có
     *         thực thể nào.
     * @throws HttpException (Mặc dù không được ném trực tiếp trong Javadoc này, các
     *                       triển khai có thể
     *                       ném nếu có lỗi truy cập dữ liệu).
     */
    List<E> findAll();

    /**
     * Lấy danh sách các thực thể theo trang.
     *
     * @param page Số trang cần lấy (thường bắt đầu từ 0).
     * @param size Số lượng thực thể trên mỗi trang.
     * @return Đối tượng {@link Page} chứa danh sách các thực thể của trang hiện tại
     *         và thông tin phân
     *         trang.
     * @throws HttpException (Mặc dù không được ném trực tiếp trong Javadoc này, các
     *                       triển khai có thể
     *                       ném nếu có lỗi truy cập dữ liệu).
     */
    Page<E> findAll(int page, int size);

    /**
     * Lấy một thực thể theo khóa chính (ID).
     *
     * @param id Khóa chính (ID) của thực thể cần tìm.
     * @return Thực thể được tìm thấy.
     * @throws HttpException Nếu không tìm thấy thực thể với ID cung cấp.
     */
    E findById(ID id);

    /**
     * Tạo mới một thực thể từ một đối tượng DTO.
     *
     * @param <S>       Kiểu của DTO, phải triển khai {@link IDto} cho thực thể
     *                  {@code E}.
     * @param newEntity Đối tượng DTO chứa thông tin của thực thể mới cần tạo.
     * @throws HttpException Nếu có lỗi xảy ra trong quá trình chuyển đổi DTO thành
     *                       thực thể hoặc
     *                       trong quá trình lưu thực thể.
     */
    <S extends IDto<E>> E create(S newEntity);

    /**
     * Cập nhật thông tin của một thực thể dựa trên thông tin từ DTO.
     *
     * @param <S>          Kiểu của DTO, phải triển khai {@link IDto} cho thực thể
     *                     {@code E}.
     * @param updateEntity Đối tượng DTO chứa thông tin cập nhật.
     * @param id           Khóa chính (ID) của thực thể cần cập nhật.
     * @throws HttpException Nếu không tìm thấy thực thể với ID cung cấp, hoặc nếu
     *                       có lỗi xảy ra trong
     *                       quá trình chuyển đổi DTO hoặc cập nhật thực thể.
     */
    <S extends IDto<E>> E update(S updateEntity, ID id);

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
    <S extends IDto<E>> void delete(S deleteEntity, ID id);

    /**
     * Tạo mới một thực thể.
     *
     * @param newEntity Thực thể mới cần tạo.
     * @throws HttpException (Mặc dù không được ném trực tiếp trong Javadoc này, các
     *                       triển khai có thể
     *                       ném nếu có lỗi trong quá trình lưu).
     */
    E create(E newEntity);

    /**
     * Cập nhật thông tin của một thực thể.
     *
     * @param updateEntity Thực thể chứa thông tin cập nhật.
     * @param id           Khóa chính (ID) của thực thể cần cập nhật (dùng để kiểm
     *                     tra sự tồn tại).
     * @throws HttpException Nếu không tìm thấy thực thể với ID cung cấp, hoặc nếu
     *                       có lỗi xảy ra trong
     *                       quá trình cập nhật.
     */
    E update(E updateEntity, ID id);

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
    void delete(E deleteEntity, ID id);

    /**
     * Tìm tất cả các thực thể dựa trên một tập hợp các khóa chính (IDs) được cung
     * cấp.
     *
     * @param ids Tập hợp các khóa chính (IDs) của các thực thể cần tìm.
     * @return Danh sách các thực thể được tìm thấy. Trả về danh sách rỗng nếu tập
     *         hợp {@code ids} là
     *         {@code null}, rỗng, hoặc không tìm thấy thực thể nào.
     */
    List<E> findAllById(Collection<ID> ids);

    /**
     * Lấy danh sách các thực thể theo trang và chuyển đổi chúng thành danh sách các
     * DTO.
     *
     * @param <S>      Kiểu của DTO, phải triển khai {@link IDto} cho thực thể
     *                 {@code E}.
     * @param page     Số trang cần lấy (thường bắt đầu từ 0).
     * @param size     Số lượng thực thể trên mỗi trang.
     * @param dtoClass Lớp (Class) của DTO. Được sử dụng để tạo các instance mới của
     *                 DTO.
     * @return Đối tượng {@link Page} chứa danh sách các DTO của trang hiện tại và
     *         thông tin phân
     *         trang.
     * @throws HttpException (Mặc dù không được ném trực tiếp trong Javadoc này, các
     *                       triển khai có thể
     *                       ném nếu có lỗi truy cập dữ liệu hoặc chuyển đổi).
     */
    <S extends IDto<E>> Page<S> findAll(int page, int size, Class<S> dtoClass);

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
    <D extends IDto<E>, S extends IDto<E>> D create(S newEntity, Class<D> dtoClass);

    /**
     * Cập nhật một thực thể với dữ liệu từ một DTO yêu cầu và trả về một DTO phản
     * hồi.
     *
     * @param <RQ>         Kiểu của DTO yêu cầu (request), phải triển khai
     *                     {@link IDto}.
     * @param <RP>         Kiểu của DTO phản hồi (response), phải triển khai
     *                     {@link IDto}.
     * @param updateEntity DTO yêu cầu chứa dữ liệu cập nhật.
     * @param id           Khóa chính của thực thể cần cập nhật.
     * @param rsClass      Lớp của DTO phản hồi sẽ được trả về.
     * @return Một DTO phản hồi kiểu {@code RP} đại diện cho thực thể sau khi cập
     *         nhật.
     * @throws HttpException Nếu không tìm thấy thực thể hoặc có lỗi xảy ra trong
     *                       quá trình cập nhật.
     */
    <RQ extends IDto<E>, RP extends IDto<E>> RP update(RQ updateEntity, ID id, Class<RP> rsClass);

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
     * Tìm kiếm và phân trang các thực thể dựa trên các tiêu chí lọc, có hỗ trợ đa
     * ngôn ngữ.
     *
     * @param <S>  Kiểu của DTO, phải triển khai {@link IDto}.
     * @param spec Đối tượng {@link Specification} chứa các điều kiện lọc.
     * @see #findAll(int, int, Class, String)
     */
    <S extends IDto<E>> Page<S> findAll(
            int page, int size, Specification<E> spec, Class<S> dtoClass, String language);

    /**
     * Tìm kiếm và phân trang các thực thể dựa trên các tiêu chí lọc.
     *
     * @param <S>  Kiểu của DTO, phải triển khai {@link IDto}.
     * @param spec Đối tượng {@link Specification} chứa các điều kiện lọc.
     * @see #findAll(int, int, Specification, Class, String)
     */
    <S extends IDto<E>> Page<S> findAll(int page, int size, Specification<E> spec, Class<S> dtoClass);

    /**
     * Tìm kiếm và phân trang các thực thể dựa trên các tiêu chí lọc, có hỗ trợ đa
     * ngôn ngữ, sử dụng
     * đối tượng {@link Pageable}.
     *
     * @param <S>          Kiểu của DTO, phải triển khai {@link IDto}.
     * @param pageable     Đối tượng {@link Pageable} chứa thông tin phân trang (số
     *                     trang, kích thước, sắp
     *                     xếp).
     * @param spec         Đối tượng {@link Specification} chứa các điều kiện lọc.
     * @param dtoClass     Lớp của DTO để chuyển đổi.
     * @param languageCode Mã ngôn ngữ (ví dụ: "vi", "en") để lấy dữ liệu tương ứng.
     * @return Một trang {@link Page} chứa các DTO đã được chuyển đổi.
     */
    <S extends IDto<E>> Page<S> findAll(
            Pageable pageable, Specification<E> spec, Class<S> dtoClass, String languageCode);

    /**
     * Tìm kiếm và phân trang các thực thể dựa trên các tiêu chí lọc, sử dụng đối
     * tượng {@link
     * Pageable}.
     *
     * @param <S>      Kiểu của DTO, phải triển khai {@link IDto}.
     * @param pageable Đối tượng {@link Pageable} chứa thông tin phân trang (số
     *                 trang, kích thước, sắp
     *                 xếp).
     * @param spec     Đối tượng {@link Specification} chứa các điều kiện lọc.
     * @param dtoClass Lớp của DTO để chuyển đổi.
     * @return Một trang {@link Page} chứa các DTO đã được chuyển đổi.
     */
    <S extends IDto<E>> Page<S> findAll(Pageable pageable, Specification<E> spec, Class<S> dtoClass);

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
     * Tìm kiếm và phân trang các thực thể (không chuyển đổi sang DTO) dựa trên các
     * tiêu chí lọc.
     *
     * @param <S>      Kiểu generic không được sử dụng trong phương thức này nhưng
     *                 có thể cần thiết cho
     *                 tính tương thích trong các lớp triển khai.
     * @param pageable Đối tượng {@link Pageable} chứa thông tin phân trang.
     * @param spec     Đối tượng {@link Specification} chứa các điều kiện lọc.
     * @return Một trang {@link Page} chứa các thực thể {@code E} thô.
     */
    <S extends IDto<E>> Page<E> findAll(Pageable pageable, Specification<E> spec);

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
     * Tìm tất cả các thực thể dựa trên các tiêu chí lọc và chuyển đổi sang danh
     * sách DTO.
     *
     * @param <S>      Kiểu của DTO, phải triển khai {@link IDto}.
     * @param dtoClass Lớp của DTO để chuyển đổi.
     * @param spec     Đối tượng {@link Specification} chứa các điều kiện lọc.
     * @return Danh sách các DTO tương ứng với các thực thể tìm thấy.
     * @throws HttpException Nếu có lỗi khi chuyển đổi entity sang DTO ({@code
     *     HttpStatus.INTERNAL_SERVER_ERROR}).
     */
    <S extends IDto<E>> List<S> findAll(Class<S> dtoClass, Specification<E> spec);

    /**
     * Tìm tất cả các thực thể khớp với các tiêu chí lọc được cung cấp.
     *
     * <p>
     * Phương thức này sử dụng {@link Specification} để thực hiện truy vấn với các
     * điều kiện động.
     *
     * @param spec Đối tượng {@link Specification} chứa các điều kiện lọc.
     * @return Danh sách các thực thể tìm thấy. Trả về danh sách rỗng nếu không tìm
     *         thấy thực thể nào
     *         khớp với tiêu chí.
     */
    List<E> findAll(Specification<E> spec);

    /**
     * Lưu một thực thể (tạo mới hoặc cập nhật).
     *
     * <p>
     * Nếu thực thể đã có ID, nó sẽ được cập nhật. Nếu chưa có ID, một thực thể mới
     * sẽ được tạo.
     *
     * @param entity Thực thể cần lưu.
     * @return Thực thể sau khi đã được lưu thành công vào cơ sở dữ liệu.
     */
    E save(E entity);

    /**
     * Lưu một thực thể và chuyển đổi kết quả sang DTO.
     *
     * <p>
     * Thực thể sẽ được lưu trước, sau đó kết quả (thường chứa ID được tạo tự động)
     * sẽ được chuyển đổi
     * sang kiểu DTO yêu cầu.
     *
     * @param <S>      Kiểu của DTO kết quả, phải triển khai {@link IDto}.
     * @param dtoClass Lớp của DTO kết quả.
     * @param entity   Thực thể cần lưu.
     * @return DTO đại diện cho thực thể sau khi lưu thành công.
     * @throws HttpException Nếu có lỗi xảy ra trong quá trình lưu hoặc chuyển đổi
     *                       sang DTO.
     */
    <S extends IDto<E>> S save(Class<S> dtoClass, E entity);

    /**
     * Lưu dữ liệu từ một DTO (tạo mới hoặc cập nhật) và trả về DTO kết quả.
     *
     * <p>
     * Phương thức này chuyển đổi DTO đầu vào thành thực thể, lưu thực thể đó, và
     * chuyển đổi ngược lại
     * thực thể đã lưu sang DTO kết quả.
     *
     * @param <S>      Kiểu của DTO kết quả, phải triển khai {@link IDto}.
     * @param <T>      Kiểu của DTO đầu vào, phải triển khai {@link IDto}.
     * @param dtoClass Lớp của DTO kết quả.
     * @param dto      DTO chứa dữ liệu cần lưu.
     * @return DTO đại diện cho thực thể sau khi lưu thành công.
     * @throws HttpException Nếu có lỗi xảy ra trong quá trình chuyển đổi giữa DTO
     *                       và thực thể, hoặc
     *                       khi lưu.
     */
    <S extends IDto<E>, T extends IDto<E>> S save(Class<S> dtoClass, T dto);

    /**
     * Cập nhật một thực thể hiện có.
     *
     * <p>
     * Phương thức này giả định thực thể đã tồn tại trong hệ thống.
     *
     * @param entity Thực thể chứa các thông tin cập nhật.
     * @return Thực thể sau khi đã cập nhật thành công vào cơ sở dữ liệu.
     */
    E update(E entity);

    /**
     * Cập nhật một thực thể và trả về DTO kết quả.
     *
     * <p>
     * Cập nhật thực thể hiện có và trả về dữ liệu dưới dạng DTO sau khi cập nhật
     * thành công.
     *
     * @param <S>      Kiểu của DTO kết quả, phải triển khai {@link IDto}.
     * @param dtoClass Lớp của DTO kết quả.
     * @param entity   Thực thể chứa các thông tin cập nhật.
     * @return DTO đại diện cho thực thể sau khi cập nhật thành công.
     * @throws HttpException Nếu có lỗi xảy ra trong quá trình cập nhật hoặc chuyển
     *                       đổi sang DTO.
     */
    <S extends IDto<E>> S update(Class<S> dtoClass, E entity);

    /**
     * Cập nhật dữ liệu từ một DTO và trả về DTO kết quả.
     *
     * <p>
     * Chuyển đổi DTO đầu vào thành các thay đổi trên thực thể và lưu lại, sau đó
     * trả về DTO kết quả.
     *
     * @param <S>      Kiểu của DTO kết quả, phải triển khai {@link IDto}.
     * @param <T>      Kiểu của DTO đầu vào, phải triển khai {@link IDto}.
     * @param dtoClass Lớp của DTO kết quả.
     * @param dto      DTO chứa thông tin cập nhật.
     * @return DTO đại diện cho thực thể sau khi cập nhật thành công.
     * @throws HttpException Nếu có lỗi khi ánh xạ DTO hoặc khi lưu dữ liệu.
     */
    <S extends IDto<E>, T extends IDto<E>> S update(Class<S> dtoClass, T dto);

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
    <S extends IDto<E>> S create(Class<S> dtoClass, E entity);

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
    <S extends IDto<E>, T extends IDto<E>> S create(Class<S> dtoClass, T dto);

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
    <S extends IDto<E>> S delete(Class<S> dtoClass, E entity);

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
    <S extends IDto<E>, T extends IDto<E>> S delete(Class<S> dtoClass, T dto);
}
