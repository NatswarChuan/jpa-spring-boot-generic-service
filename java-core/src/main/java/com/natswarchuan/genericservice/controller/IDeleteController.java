package com.natswarchuan.genericservice.controller;

import com.natswarchuan.genericservice.exception.HttpException;
import com.natswarchuan.genericservice.service.IDeleteService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;

/**
 * Interface trait định nghĩa API cho chức năng Xóa (Delete).
 *
 * <p>Cung cấp endpoint tiêu chuẩn để xóa một bản ghi dựa trên ID.
 *
 * @param <E> Kiểu dữ liệu của Entity.
 * @param <ID> Kiểu dữ liệu của định danh (ID).
 * @author NatswarChuan
 */
public interface IDeleteController<E, ID> extends IBaseController<E, ID> {

  /**
   * Endpoint API DELETE để xóa một thực thể theo ID.
   *
   * <p>Logic xóa (Soft delete hay Hard delete) phụ thuộc vào cấu hình của Service.
   *
   * @param id ID của bản ghi cần xóa.
   * @return ResponseEntity với HTTP Status 204 (No Content) nếu thành công.
   */
  @Operation(
      summary = "Xóa bản ghi",
      description = "Xóa bản ghi dựa trên ID (Soft delete hoặc Hard delete tùy cấu hình).")
  @ApiResponses(
      value = {
        @ApiResponse(responseCode = "204", description = "Xóa thành công"),
        @ApiResponse(responseCode = "404", description = "Không tìm thấy bản ghi"),
      })
  @DeleteMapping("/{id}")
  default ResponseEntity<Void> delete(
      @Parameter(description = "ID của bản ghi", required = true) @PathVariable @NonNull ID id) {
    getDeleteService().deleteById(id);
    return ResponseEntity.noContent().build();
  }

  /**
   * Lấy instance của Service xử lý logic nghiệp vụ Xóa.
   *
   * @param <S> Kiểu dữ liệu thực tế của Service (kế thừa {@link IDeleteService}).
   * @return Đối tượng Service.
   * @throws HttpException Nếu Service hiện tại không implement {@link IDeleteService}.
   */
  @SuppressWarnings("unchecked")
  default <S extends IDeleteService<E, ID>> S getDeleteService() {
    if (getBaseService() instanceof IDeleteService) return (S) getBaseService();
    else
      throw new HttpException(
          HttpStatus.INTERNAL_SERVER_ERROR, "Service không implement IDeleteService");
  }
}
