package com.natswarchuan.genericservice.controller;

import com.natswarchuan.genericservice.dto.IDto;
import com.natswarchuan.genericservice.payload.request.BaseRequestParam;
import com.natswarchuan.genericservice.payload.response.HttpApiResponse;
import com.natswarchuan.genericservice.payload.response.PagedResponse;
import com.natswarchuan.genericservice.service.IService;
import com.natswarchuan.genericservice.specification.GenericSpecification;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Controller trừu tượng cung cấp các API CRUD cơ bản.
 *
 * @param <E>  Kiểu Entity.
 * @param <ID> Kiểu dữ liệu của ID (VD: Long, UUID).
 * @param <R>  Kiểu DTO cho phản hồi (Response).
 * @param <C>  Kiểu DTO cho yêu cầu tạo mới (Create Request).
 * @param <U>  Kiểu DTO cho yêu cầu cập nhật (Update Request).
 * @author NatswarChuan
 */
public abstract class AbController<E, ID, R extends IDto<E>, C extends IDto<E>, U extends IDto<E>> {

    /** Service xử lý logic nghiệp vụ. */
    protected final IService<E, ID> service;

    /**
     * Constructor để inject Service.
     *
     * @param service Service xử lý logic nghiệp vụ.
     */
    protected AbController(IService<E, ID> service) {
        this.service = service;
    }

    /**
     * Lấy Class của DTO phản hồi.
     *
     * @return Class của R.
     */
    protected abstract Class<R> getResponseDtoClass();

    /**
     * Lấy Specification để lọc dữ liệu.
     * Mặc định sử dụng {@link GenericSpecification}. Các lớp con có thể ghi đè để
     * tùy chỉnh logic lọc.
     *
     * @param requestParam Object chứa các tham số tìm kiếm.
     * @param <RQ>         Kiểu dữ liệu của request params (kế thừa
     *                     BaseRequestParam).
     * @return Specification để query database.
     */
    protected <RQ extends BaseRequestParam> Specification<E> getSpecification(RQ requestParam) {
        return new GenericSpecification<>(requestParam);
    }

    /**
     * Lấy danh sách thực thể có hỗ trợ tìm kiếm và phân trang nâng cao.
     *
     * @param requestParam Object chứa các tham số phân trang và tìm kiếm.
     * @param <RQ>         Kiểu dữ liệu của request params (kế thừa
     *                     BaseRequestParam).
     * @param language     Mã ngôn ngữ (VD: "vi", "en") từ header Accept-Language.
     * @return PagedResponse chứa danh sách các DTO kiểu R.
     */
    @GetMapping
    public <RQ extends BaseRequestParam> ResponseEntity<HttpApiResponse<PagedResponse<R>>> findAll(
            RQ requestParam,
            @RequestHeader(name = "Accept-Language", defaultValue = "en") String language) {
        if (language != null && language.length() > 2) {
            language = language.substring(0, 2);
        }
        Specification<E> spec = getSpecification(requestParam);

        if (requestParam.isUnpaged()) {
            Page<R> page = service.findAll(Pageable.unpaged(), spec, getResponseDtoClass(), language);
            return ResponseEntity.ok(HttpApiResponse.success(PagedResponse.of(page.getContent(), null)));
        } else {
            Page<R> page = service.findAll(requestParam.toPageable(), spec, getResponseDtoClass(), language);
            return ResponseEntity.ok(HttpApiResponse.success(PagedResponse.of(page)));
        }
    }

    /**
     * Lấy chi tiết một thực thể theo ID.
     *
     * @param id       ID của thực thể.
     * @param language Mã ngôn ngữ (VD: "vi", "en") từ header Accept-Language.
     * @return DTO chi tiết kiểu R.
     */
    @GetMapping("/{id}")
    public ResponseEntity<HttpApiResponse<R>> findById(
            @PathVariable ID id,
            @RequestHeader(name = "Accept-Language", defaultValue = "en") String language) {
        if (language != null && language.length() > 2) {
            language = language.substring(0, 2);
        }
        R result = service.findById(id, getResponseDtoClass(), language);
        return ResponseEntity.ok(HttpApiResponse.success(result));
    }

    /**
     * Tạo mới một thực thể.
     *
     * @param dto DTO chứa thông tin tạo mới kiểu C.
     * @return DTO chi tiết của thực thể vừa được tạo kiểu R.
     */
    @PostMapping
    public ResponseEntity<HttpApiResponse<R>> create(@RequestBody @Valid C dto) {
        R result = service.create(dto, getResponseDtoClass());
        return ResponseEntity.ok(HttpApiResponse.success(result));
    }

    /**
     * Cập nhật thông tin thực thể.
     *
     * @param id  ID của thực thể cần cập nhật.
     * @param dto DTO chứa thông tin cập nhật kiểu U.
     * @return DTO chi tiết của thực thể sau khi cập nhật kiểu R.
     */
    @PutMapping("/{id}")
    public ResponseEntity<HttpApiResponse<R>> update(@PathVariable ID id, @RequestBody @Valid U dto) {
        R result = service.update(dto, id, getResponseDtoClass());
        return ResponseEntity.ok(HttpApiResponse.success(result));
    }

    /**
     * Xóa một thực thể.
     *
     * @param id ID của thực thể cần xóa.
     * @return Phản hồi thành công không có nội dung data.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<HttpApiResponse<Void>> delete(@PathVariable ID id) {
        service.delete(id);
        return ResponseEntity.ok(HttpApiResponse.success(null));
    }
}
