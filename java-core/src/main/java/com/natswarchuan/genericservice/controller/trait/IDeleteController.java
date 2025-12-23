package com.natswarchuan.genericservice.controller.trait;

import com.natswarchuan.genericservice.payload.response.HttpApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;

/**
 * Trait cung cấp API Xóa.
 *
 * @param <E>  Kiểu Entity.
 * @param <ID> Kiểu ID.
 * @author NatswarChuan
 */
public interface IDeleteController<E, ID> extends IBaseController<E, ID> {

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
  default ResponseEntity<HttpApiResponse<Void>> delete(
      @Parameter(description = "ID của thực thể cần xóa", required = true, example = "1") @PathVariable(name = "id") ID id) {
    getService().delete(id);
    return ResponseEntity.ok(HttpApiResponse.success(null, HttpStatus.NO_CONTENT));
  }
}
