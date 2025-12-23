package com.natswarchuan.genericservice.service;

import com.natswarchuan.genericservice.dto.IDto;
import com.natswarchuan.genericservice.exception.HttpException;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.lang.NonNull;

/**
 * Giao diện dịch vụ cho các thao tác cập nhật (Update) và lưu (Save).
 *
 * @param <E>  Kiểu dữ liệu của thực thể.
 * @param <ID> Kiểu dữ liệu của khóa chính (ID) của thực thể.
 * @author NatswarChuan
 */
public interface IUpdateService<E, ID> {

    /**
     * Cập nhật thông tin của một thực thể.
     *
     * @param updateEntity Thực thể chứa thông tin cập nhật.
     * @param id           Khóa chính (ID) của thực thể cần cập nhật (dùng để kiểm
     *                     tra sự tồn tại).
     * @return Thực thể sau khi cập nhật.
     * @throws HttpException Nếu không tìm thấy thực thể với ID cung cấp, hoặc nếu
     *                       có lỗi xảy ra
     *                       trong quá trình cập nhật.
     */
    E update(@NonNull E updateEntity, ID id);

    /**
     * Cập nhật một thực thể hiện có.
     *
     * <p>
     * Phương thức này giả định thực thể đã tồn tại trong hệ thống.
     *
     * @param entity Thực thể chứa các thông tin cập nhật.
     * @return Thực thể sau khi đã cập nhật thành công vào cơ sở dữ liệu.
     */
    E update(@NonNull E entity);

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
    E save(@NonNull E entity);

    /**
     * Cập nhật thông tin của một thực thể dựa trên thông tin từ DTO.
     *
     * @param <S>          Kiểu của DTO, phải triển khai {@link IDto} cho thực thể
     *                     {@code E}.
     * @param updateEntity Đối tượng DTO chứa thông tin cập nhật.
     * @param id           Khóa chính (ID) của thực thể cần cập nhật.
     * @return Thực thể sau khi cập nhật.
     * @throws HttpException Nếu không tìm thấy thực thể với ID cung cấp, hoặc nếu
     *                       có lỗi xảy ra
     *                       trong quá trình chuyển đổi DTO hoặc cập nhật thực thể.
     */
    <S extends IDto<E>> E update(@NonNull S updateEntity, @NonNull ID id);

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
    <S extends IDto<E>> S update(@NonNull Class<S> dtoClass, @NonNull E entity);

    /**
     * Lưu một thực thể và chuyển đổi kết quả sang DTO.
     *
     * <p>
     * Thực thể sẽ được lưu trước, sau đó kết quả (thường chứa ID được tạo tự động)
     * sẽ được
     * chuyển đổi sang kiểu DTO yêu cầu.
     *
     * @param <S>      Kiểu của DTO kết quả, phải triển khai {@link IDto}.
     * @param dtoClass Lớp của DTO kết quả.
     * @param entity   Thực thể cần lưu.
     * @return DTO đại diện cho thực thể sau khi lưu thành công.
     * @throws HttpException Nếu có lỗi xảy ra trong quá trình lưu hoặc chuyển đổi
     *                       sang DTO.
     */
    <S extends IDto<E>> S save(@NonNull Class<S> dtoClass, @NonNull E entity);

    /**
     * Cập nhật dữ liệu từ một DTO và trả về DTO kết quả.
     *
     * <p>
     * Chuyển đổi DTO đầu vào thành các thay đổi trên thực thể và lưu lại, sau đó
     * trả về DTO kết
     * quả.
     *
     * @param <S>      Kiểu của DTO kết quả, phải triển khai {@link IDto}.
     * @param <T>      Kiểu của DTO đầu vào, phải triển khai {@link IDto}.
     * @param dtoClass Lớp của DTO kết quả.
     * @param dto      DTO chứa thông tin cập nhật.
     * @return DTO đại diện cho thực thể sau khi cập nhật thành công.
     * @throws HttpException Nếu có lỗi khi ánh xạ DTO hoặc khi lưu dữ liệu.
     */
    <S extends IDto<E>, T extends IDto<E>> S update(@NonNull Class<S> dtoClass, @NonNull T dto);

    /**
     * Lưu dữ liệu từ một DTO (tạo mới hoặc cập nhật) và trả về DTO kết quả.
     *
     * <p>
     * Phương thức này chuyển đổi DTO đầu vào thành thực thể, lưu thực thể đó, và
     * chuyển đổi
     * ngược lại thực thể đã lưu sang DTO kết quả.
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
    <S extends IDto<E>, T extends IDto<E>> S save(@NonNull Class<S> dtoClass, @NonNull T dto);

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
    <RQ extends IDto<E>, RP extends IDto<E>> RP update(@NonNull RQ updateEntity, @NonNull ID id,
            @NonNull Class<RP> rsClass);

    /**
     * Cập nhật thông tin của một thực thể với dữ liệu từ một DTO yêu cầu và trả về
     * một DTO phản hồi.
     *
     * @param <S>          Kiểu của DTO kết quả.
     * @param updateEntity Thực thể chứa dữ liệu cập nhật.
     * @param id           Khóa chính của thực thể cần cập nhật.
     * @param dtoClass     Lớp của DTO phản hồi sẽ được trả về.
     * @return Một DTO phản hồi kiểu {@code S} đại diện cho thực thể sau khi cập
     *         nhật.
     */
    <S extends IDto<E>> S update(@NonNull E updateEntity, @NonNull ID id, @NonNull Class<S> dtoClass);

    /**
     * Cập nhật các thực thể khớp với tiêu chí lọc.
     *
     * <p>
     * Cảnh báo: Phương thức này sẽ cập nhật TẤT CẢ các thực thể tìm thấy bởi
     * {@code spec}. Cần
     * cẩn trọng khi sử dụng.
     *
     * @param updateEntity Thực thể mẫu chứa các giá trị cần cập nhật (các trường
     *                     khác null sẽ bị bỏ qua hoặc ghi đè tùy triển khai).
     * @param spec         Đối tượng {@link Specification} để lọc các thực thể cần
     *                     cập nhật.
     * @return Danh sách các thực thể sau khi đã được cập nhật.
     */
    java.util.List<E> update(@NonNull E updateEntity, @NonNull Specification<E> spec);
}