package com.natswarchuan.genericservice.controller;

import com.natswarchuan.genericservice.dto.IDto;
import com.natswarchuan.genericservice.exception.HttpException;
import com.natswarchuan.genericservice.payload.request.BaseRequestParam;
import com.natswarchuan.genericservice.payload.response.HttpApiResponse;
import com.natswarchuan.genericservice.payload.response.PagedResponse;
import com.natswarchuan.genericservice.service.IReadSummaryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;

/**
 * Interface trait định nghĩa API cho chức năng Xem danh sách (Read Summary).
 *
 * <p>Cung cấp endpoint để lấy danh sách bản ghi, hỗ trợ phân trang, tìm kiếm, lọc và sắp xếp.
 *
 * @param <E> Kiểu dữ liệu của Entity.
 * @param <ID> Kiểu dữ liệu của định danh (ID).
 * @author NatswarChuan
 */
public interface IReadSummaryController<E, ID> extends IBaseController<E, ID> {
  /**
   * Xác định Class của DTO dùng để trả về dữ liệu trong danh sách (Summary DTO).
   *
   * @return Class object của Summary DTO.
   */
  Class<? extends IDto<E>> getResponseSummaryDtoClass();

  /**
   * Xây dựng đối tượng Specification (JPA Criteria) để lọc dữ liệu.
   *
   * <p>Mặc định hỗ trợ tìm kiếm cơ bản (LIKE) trên một trường cụ thể nếu có params. Override phương
   * thức này để tùy biến logic lọc nâng cao.
   *
   * @param params Object chứa các tham số query (filter, search key, search attribute...).
   * @return Đối tượng {@link Specification} dùng cho query DB.
   */
  default Specification<E> getSpecification(BaseRequestParam params) {
    return (root, query, criteriaBuilder) -> {
      String search = params.getSearch();
      String searchField = params.getSearchField();

      if (search != null && searchField != null) {
        if (root.get(searchField).getJavaType().equals(String.class)) {
          return criteriaBuilder.like(root.get(searchField), "%" + search + "%");
        }
      }
      return criteriaBuilder.conjunction();
    };
  }

  /**
   * Endpoint API GET để lấy danh sách bản ghi theo trang.
   *
   * <p>Hỗ trợ:
   *
   * <ul>
   *   <li>Phân trang (page, size).
   *   <li>Sắp xếp (sortDir, sortBy).
   *   <li>Tìm kiếm/Lọc (thông qua {@link #getSpecification(BaseRequestParam)}).
   *   <li>Đa ngôn ngữ (Header Accept-Language).
   * </ul>
   *
   * @param params Tham số query params được map vào object {@link BaseRequestParam}.
   * @param language Ngôn ngữ của client (để format dữ liệu nếu cần).
   * @return ResponseEntity chứa danh sách DTO phân trang và HTTP Status 200 (OK).
   */
  @Operation(summary = "Lấy danh sách", description = "Lấy danh sách bản ghi có phân trang và lọc.")
  @ApiResponses(
      value = {
        @ApiResponse(responseCode = "200", description = "Thành công"),
      })
  @GetMapping
  default ResponseEntity<HttpApiResponse<PagedResponse<? extends IDto<E>>>> findAll(
      @ParameterObject @Valid BaseRequestParam params,
      @RequestHeader(name = "Accept-Language", defaultValue = "en", required = false)
          String language) {

    String sortBy = params.getSortBy();
    String sortDir = params.getSortDir();
    Sort sort = null;
    Pageable pageable = null;
    if (sortBy != null && sortDir != null) {
      sort = Sort.by(Sort.Direction.fromString(sortDir), sortBy);
    } else {
      sort = Sort.unsorted();
    }

    if (params.getPage() == -1) {
      pageable = Pageable.unpaged();
    } else {
      pageable = PageRequest.of(params.getPage(), params.getSize(), sort);
    }

    Specification<E> spec = getSpecification(params);

    Page<? extends IDto<E>> pageResult =
        getReadSummaryService().findAll(pageable, spec, getResponseSummaryDtoClass(), language);

    return ResponseEntity.ok(HttpApiResponse.success(PagedResponse.of(pageResult)));
  }

  /**
   * Lấy instance của Service xử lý logic nghiệp vụ Xem danh sách.
   *
   * @param <S> Kiểu dữ liệu thực tế của Service (kế thừa {@link IReadSummaryService}).
   * @return Đối tượng Service.
   * @throws HttpException Nếu Service hiện tại không implement {@link IReadSummaryService}.
   */
  @SuppressWarnings("unchecked")
  default <S extends IReadSummaryService<E, ID>> S getReadSummaryService() {
    if (getBaseService() instanceof IReadSummaryService) return (S) getBaseService();
    else
      throw new HttpException(
          HttpStatus.INTERNAL_SERVER_ERROR, "Service không implement IReadSummaryService");
  }
}
