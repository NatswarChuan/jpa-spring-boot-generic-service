package com.natswarchuan.genericservice.controller;

import com.natswarchuan.genericservice.dto.IDto;
import com.natswarchuan.genericservice.payload.request.BaseRequestParam;
import com.natswarchuan.genericservice.payload.response.HttpApiResponse;
import com.natswarchuan.genericservice.payload.response.PagedResponse;
import com.natswarchuan.genericservice.service.IService;
import com.natswarchuan.genericservice.specification.GenericSpecification;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.springframework.lang.NonNull;

/**
 * Controller trừu tượng (Abstract Controller) cung cấp các API CRUD cơ bản và
 * chuẩn hóa.
 * <p>
 * Lớp này tích hợp sẵn các phương thức:
 * <ul>
 * <li>Lấy danh sách (có phân trang, lọc, sắp xếp)</li>
 * <li>Lấy chi tiết theo ID</li>
 * <li>Tạo mới</li>
 * <li>Cập nhật</li>
 * <li>Xóa</li>
 * </ul>
 *
 * @param <E>  Kiểu Entity (Thực thể JPA).
 * @param <ID> Kiểu dữ liệu của Primary Key (VD: Long, UUID).
 * @param <C>  Kiểu DTO dùng cho yêu cầu tạo mới (Create Request).
 * @param <U>  Kiểu DTO dùng cho yêu cầu cập nhật (Update Request).
 * @author NatswarChuan
 */
@SuppressWarnings("null")
public abstract class AbController<E, ID, C extends IDto<E>, U extends IDto<E>> {

    /** Service xử lý logic nghiệp vụ. */
    protected final IService<E, ID> service;

    /**
     * Constructor để inject Service.
     *
     * @param service Service implement {@link IService} để xử lý logic nghiệp vụ.
     */
    protected AbController(IService<E, ID> service) {
        this.service = service;
    }

    /**
     * Lấy Class của DTO dùng cho phản hồi danh sách (List Response).
     * <p>
     * DTO này thường chứa ít thông tin hơn DTO chi tiết để tối ưu hiệu năng.
     *
     * @param <R> Kiểu DTO phản hồi.
     * @return Class của DTO phản hồi danh sách.
     */
    protected abstract <R extends IDto<E>> Class<R> getResponseSummaryDtoClass();

    /**
     * Lấy Class của DTO dùng cho phản hồi chi tiết (Detail Response).
     *
     * @param <R> Kiểu DTO phản hồi.
     * @return Class của DTO phản hồi chi tiết.
     */
    protected abstract <R extends IDto<E>> Class<R> getResponseDetailDtoClass();

    /**
     * Tạo Specification để lọc dữ liệu dựa trên tham số request.
     * <p>
     * Mặc định sử dụng {@link GenericSpecification}. Các lớp con có thể ghi đè
     * (override)
     * để tùy chỉnh logic lọc phức tạp hơn.
     *
     * @param requestParam Object chứa các tham số tìm kiếm/lọc.
     * @param <RQ>         Kiểu dữ liệu của request params (kế thừa
     *                     {@link BaseRequestParam}).
     * @return {@link Specification} dùng để query database.
     */
    protected <RQ extends BaseRequestParam> Specification<E> getSpecification(RQ requestParam) {
        return new GenericSpecification<>(requestParam);
    }

    /**
     * API Lấy danh sách thực thể (hỗ trợ phân trang, lọc, sắp xếp).
     *
     * @param requestParam Object chứa các tham số phân trang (page, size) và
     *                     lọc/sắp xếp.
     * @param language     Mã ngôn ngữ (VD: "vi", "en") từ header
     *                     {@code Accept-Language}.
     * @param <RQ>         Kiểu dữ liệu của request params.
     * @param <R>          Kiểu DTO phản hồi (thường là Summary DTO).
     * @return {@link PagedResponse} chứa danh sách các DTO và thông tin phân trang.
     */
    @Operation(summary = "Lấy danh sách (Phân trang & Tìm kiếm)", description = "Hỗ trợ phân trang, sắp xếp và tìm kiếm động theo các tiêu chí.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Thành công"),
            @ApiResponse(responseCode = "400", description = "Lỗi dữ liệu đầu vào (VD: sai format sort)")
    })
    @GetMapping
    public <RQ extends BaseRequestParam, R extends IDto<E>> ResponseEntity<HttpApiResponse<PagedResponse<R>>> findAll(
            RQ requestParam,
            @RequestHeader(name = "Accept-Language", defaultValue = "en") String language) {
        if (language != null && language.length() > 2) {
            language = language.substring(0, 2);
        }
        Specification<E> spec = getSpecification(requestParam);

        if (requestParam.isUnpaged()) {
            Page<R> page = service.findAll(Pageable.unpaged(), spec, getResponseSummaryDtoClass(), language);
            return ResponseEntity.ok(HttpApiResponse.success(PagedResponse.of(page.getContent(), null)));
        } else {
            Page<R> page = service.findAll(requestParam.toPageable(), spec, getResponseSummaryDtoClass(), language);
            return ResponseEntity.ok(HttpApiResponse.success(PagedResponse.of(page)));
        }
    }

    /**
     * API Lấy chi tiết một thực thể theo ID.
     *
     * @param id       ID của thực thể.
     * @param language Mã ngôn ngữ (VD: "vi", "en") từ header
     *                 {@code Accept-Language}.
     * @param <R>      Kiểu DTO phản hồi (thường là Detail DTO).
     * @return DTO chi tiết của thực thể.
     */
    @Operation(summary = "Lấy chi tiết theo ID", description = "Trả về thông tin chi tiết của một bản ghi.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Thành công"),
            @ApiResponse(responseCode = "404", description = "Không tìm thấy bản ghi")
    })
    @GetMapping("/{id}")
    public <R extends IDto<E>> ResponseEntity<HttpApiResponse<R>> findById(
            @Parameter(description = "ID của thực thể cần lấy", required = true, example = "1") @PathVariable(name = "id") ID id,
            @RequestHeader(name = "Accept-Language", defaultValue = "en") String language) {
        if (language != null && language.length() > 2) {
            language = language.substring(0, 2);
        }
        R result = service.findById(id, getResponseDetailDtoClass(), language);
        return ResponseEntity.ok(HttpApiResponse.success(result));
    }

    /**
     * API Tạo mới một thực thể.
     *
     * @param dto DTO chứa thông tin tạo mới (kiểu C).
     * @param <R> Kiểu DTO phản hồi sau khi tạo (thường là Detail DTO).
     * @return DTO chi tiết của thực thể vừa được tạo.
     */
    @Operation(summary = "Tạo mới bản ghi", description = "Tạo mới một bản ghi vào hệ thống.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Tạo thành công"),
            @ApiResponse(responseCode = "400", description = "Lỗi validation dữ liệu"),
    })
    @PostMapping
    public <R extends IDto<E>> ResponseEntity<HttpApiResponse<R>> create(@RequestBody @Valid @NonNull C dto) {
        R result = service.create(dto, getResponseDetailDtoClass());
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(HttpApiResponse.success(result, HttpStatus.CREATED));
    }

    /**
     * API Cập nhật thông tin thực thể.
     *
     * @param id  ID của thực thể cần cập nhật.
     * @param dto DTO chứa thông tin cập nhật (kiểu U).
     * @param <R> Kiểu DTO phản hồi sau khi cập nhật (thường là Detail DTO).
     * @return DTO chi tiết của thực thể sau khi cập nhật.
     */
    @Operation(summary = "Cập nhật bản ghi", description = "Cập nhật thông tin của một bản ghi hiện có.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "202", description = "Cập nhật thành công"),
            @ApiResponse(responseCode = "400", description = "Lỗi validation dữ liệu"),
            @ApiResponse(responseCode = "404", description = "Không tìm thấy bản ghi")
    })
    @PutMapping("/{id}")
    public <R extends IDto<E>> ResponseEntity<HttpApiResponse<R>> update(
            @Parameter(description = "ID của thực thể cần cập nhật", required = true, example = "1") @PathVariable(name = "id") ID id,
            @RequestBody @Valid @NonNull U dto) {
        R result = service.update(dto, id, getResponseDetailDtoClass());
        return ResponseEntity.ok(HttpApiResponse.success(result, HttpStatus.ACCEPTED));
    }

    /**
     * API Xóa một thực thể theo ID.
     *
     * @param id ID của thực thể cần xóa.
     * @return Phản hồi thành công (không có dữ liệu trả về).
     */
    @Operation(summary = "Xóa bản ghi", description = "Xóa (hoặc vô hiệu hóa) một bản ghi khỏi hệ thống.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Xóa thành công"),
            @ApiResponse(responseCode = "404", description = "Không tìm thấy bản ghi")
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<HttpApiResponse<Void>> delete(
            @Parameter(description = "ID của thực thể cần xóa", required = true, example = "1") @PathVariable(name = "id") ID id) {
        service.delete(id);
        return ResponseEntity.ok(HttpApiResponse.success(null, HttpStatus.NO_CONTENT));
    }
}
