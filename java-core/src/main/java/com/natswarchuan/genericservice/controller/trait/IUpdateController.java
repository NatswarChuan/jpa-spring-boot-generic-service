package com.natswarchuan.genericservice.controller.trait;

import com.natswarchuan.genericservice.dto.IDto;
import com.natswarchuan.genericservice.payload.response.HttpApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

/**
 * Trait cung cấp API Cập nhật.
 *
 * @param <E>  Kiểu Entity.
 * @param <ID> Kiểu ID.
 * @param <U>  Kiểu DTO cập nhật.
 * @author NatswarChuan
 */
public interface IUpdateController<E, ID, U extends IDto<E>> extends IBaseController<E, ID> {

  /**
   * Lấy class DTO chi tiết cho response.
   * 
   * @param <R> Kiểu DTO.
   * @return Class DTO.
   */
  <R extends IDto<E>> Class<R> getResponseDetailDtoClass();

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
  default <R extends IDto<E>> ResponseEntity<HttpApiResponse<R>> update(
      @Parameter(description = "ID của thực thể cần cập nhật", required = true, example = "1") @PathVariable(name = "id") ID id,
      @RequestBody @Valid @NonNull U dto) {
    R result = getService().update(dto, id, getResponseDetailDtoClass());
    return ResponseEntity.ok(HttpApiResponse.success(result, HttpStatus.ACCEPTED));
  }
}
