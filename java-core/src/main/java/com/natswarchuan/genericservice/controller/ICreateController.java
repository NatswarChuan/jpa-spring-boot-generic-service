package com.natswarchuan.genericservice.controller;

import com.natswarchuan.genericservice.dto.IDto;
import com.natswarchuan.genericservice.exception.HttpException;
import com.natswarchuan.genericservice.payload.response.HttpApiResponse;
import com.natswarchuan.genericservice.service.ICreateService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

/**
 * Interface trait định nghĩa API cho chức năng Tạo mới (Create).
 *
 * <p>Cung cấp endpoint chuẩn để tạo mới một thực thể vào hệ thống.
 *
 * @param <E> Kiểu dữ liệu của Entity.
 * @param <ID> Kiểu dữ liệu của định danh (ID).
 * @param <CREATE_REQ> Kiểu DTO sử dụng cho request tạo mới.
 * @author NatswarChuan
 */
public interface ICreateController<E, ID, CREATE_REQ extends IDto<E>>
    extends IBaseController<E, ID> {

  /**
   * Xác định Class của DTO dùng để trả về chi tiết sau khi tạo thành công.
   *
   * @return Class object của DTO chi tiết.
   */
  Class<? extends IDto<E>> getResponseDetailDtoClass();

  /**
   * Endpoint API POST để tạo mới một thực thể.
   *
   * <p>Payload gửi lên sẽ được validate trước khi xử lý. Trả về thông tin chi tiết của thực thể vừa
   * được tạo thành công.
   *
   * @param dto DTO Request chứa dữ liệu tạo mới.
   * @return ResponseEntity chứa DTO chi tiết và HTTP Status 201 (Created).
   */
  @Operation(summary = "Tạo mới bản ghi", description = "Tạo mới một bản ghi vào hệ thống.")
  @ApiResponses(
      value = {
        @ApiResponse(responseCode = "201", description = "Tạo thành công"),
        @ApiResponse(responseCode = "400", description = "Lỗi validation dữ liệu"),
      })
  @PostMapping
  default ResponseEntity<HttpApiResponse<? extends IDto<E>>> create(
      @RequestBody @Valid @NonNull CREATE_REQ dto) {
    Class<? extends IDto<E>> responseDtoClass = getResponseDetailDtoClass();
    if (responseDtoClass == null) {
      throw new HttpException(
          HttpStatus.INTERNAL_SERVER_ERROR, "Class của DTO chi tiết không được xác định");
    }
    IDto<E> result = getCreateService().create(dto, responseDtoClass);
    return ResponseEntity.status(HttpStatus.CREATED)
        .body(HttpApiResponse.success(result, HttpStatus.CREATED));
  }

  /**
   * Lấy instance của Service xử lý logic nghiệp vụ Tạo mới.
   *
   * @param <S> Kiểu dữ liệu thực tế của Service (kế thừa {@link ICreateService}).
   * @return Đối tượng Service.
   * @throws HttpException Nếu Service hiện tại không implement {@link ICreateService}.
   */
  @SuppressWarnings("unchecked")
  default <S extends ICreateService<E, ID>> S getCreateService() {
    if (getBaseService() instanceof ICreateService) {
      return (S) getBaseService();
    } else {
      throw new HttpException(
          HttpStatus.INTERNAL_SERVER_ERROR, "Service không implement ICreateService");
    }
  }
}
