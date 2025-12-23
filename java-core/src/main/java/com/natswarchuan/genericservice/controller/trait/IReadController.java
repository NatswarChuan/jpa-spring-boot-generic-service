package com.natswarchuan.genericservice.controller.trait;

import com.natswarchuan.genericservice.dto.IDto;
import com.natswarchuan.genericservice.payload.request.BaseRequestParam;
import com.natswarchuan.genericservice.payload.response.HttpApiResponse;
import com.natswarchuan.genericservice.payload.response.PagedResponse;
import com.natswarchuan.genericservice.specification.GenericSpecification;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;

/**
 * Trait cung cấp API Đọc (Xem danh sách, xem chi tiết).
 *
 * @param <E>  Kiểu Entity.
 * @param <ID> Kiểu ID.
 * @author NatswarChuan
 */
public interface IReadController<E, ID> extends IBaseController<E, ID> {

  /**
   * Lấy class DTO tóm tắt cho response danh sách.
   * 
   * @param <R> Kiểu DTO.
   * @return Class DTO.
   */
  <R extends IDto<E>> Class<R> getResponseSummaryDtoClass();

  /**
   * Lấy class DTO chi tiết cho response.
   * 
   * @param <R> Kiểu DTO.
   * @return Class DTO.
   */
  <R extends IDto<E>> Class<R> getResponseDetailDtoClass();

  /**
   * Tạo Specification để lọc dữ liệu.
   *
   * @param requestParam Object chứa các tham số tìm kiếm/lọc.
   * @param <RQ>         Kiểu dữ liệu của request params.
   * @return {@link Specification} dùng để query database.
   */
  default <RQ extends BaseRequestParam> Specification<E> getSpecification(RQ requestParam) {
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
  default <RQ extends BaseRequestParam, R extends IDto<E>> ResponseEntity<HttpApiResponse<PagedResponse<R>>> findAll(
      RQ requestParam,
      @RequestHeader(name = "Accept-Language", defaultValue = "en") String language) {
    if (language != null && language.length() > 2) {
      language = language.substring(0, 2);
    }
    Specification<E> spec = getSpecification(requestParam);

    if (requestParam.isUnpaged()) {
      Page<R> page = getService().findAll(Pageable.unpaged(), spec, getResponseSummaryDtoClass(), language);
      return ResponseEntity.ok(HttpApiResponse.success(PagedResponse.of(page.getContent(), null)));
    } else {
      Page<R> page = getService().findAll(requestParam.toPageable(), spec, getResponseSummaryDtoClass(), language);
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
  default <R extends IDto<E>> ResponseEntity<HttpApiResponse<R>> findById(
      @Parameter(description = "ID của thực thể cần lấy", required = true, example = "1") @PathVariable(name = "id") ID id,
      @RequestHeader(name = "Accept-Language", defaultValue = "en") String language) {
    if (language != null && language.length() > 2) {
      language = language.substring(0, 2);
    }
    R result = getService().findById(id, getResponseDetailDtoClass(), language);
    return ResponseEntity.ok(HttpApiResponse.success(result));
  }
}
