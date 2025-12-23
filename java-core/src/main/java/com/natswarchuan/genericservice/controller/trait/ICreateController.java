package com.natswarchuan.genericservice.controller.trait;

import com.natswarchuan.genericservice.dto.IDto;
import com.natswarchuan.genericservice.payload.response.HttpApiResponse;
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
 * Trait cung cấp API Tạo mới.
 *
 * @param <E>  Kiểu Entity.
 * @param <ID> Kiểu ID.
 * @param <C>  Kiểu DTO tạo mới.
 * @author NatswarChuan
 */
public interface ICreateController<E, ID, C extends IDto<E>> extends IBaseController<E, ID> {

  /**
   * Lấy class DTO chi tiết cho response.
   * 
   * @param <R> Kiểu DTO.
   * @return Class DTO.
   */
  <R extends IDto<E>> Class<R> getResponseDetailDtoClass();

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
  default <R extends IDto<E>> ResponseEntity<HttpApiResponse<R>> create(@RequestBody @Valid @NonNull C dto) {
    R result = getService().create(dto, getResponseDetailDtoClass());
    return ResponseEntity.status(HttpStatus.CREATED)
        .body(HttpApiResponse.success(result, HttpStatus.CREATED));
  }
}
