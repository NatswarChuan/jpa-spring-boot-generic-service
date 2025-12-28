package com.natswarchuan.genericservice.controller;

import com.natswarchuan.genericservice.dto.IDto;
import com.natswarchuan.genericservice.exception.HttpException;
import com.natswarchuan.genericservice.payload.response.HttpApiResponse;
import com.natswarchuan.genericservice.service.IUpdateService;

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
 * Interface trait định nghĩa API cho chức năng Cập nhật (Update).
 * <p>
 * Cung cấp endpoint để cập nhật thông tin của một bản ghi đã tồn tại.
 * </p>
 *
 * @param <E>          Kiểu dữ liệu của Entity.
 * @param <ID>         Kiểu dữ liệu của định danh (ID).
 * @param <UPDATE_REQ> Kiểu DTO sử dụng cho request cập nhật.
 * @author NatswarChuan
 */
public interface IUpdateController<E, ID, UPDATE_REQ extends IDto<E>> extends IBaseController<E, ID> {

    /**
     * Xác định Class của DTO dùng để trả về chi tiết sau khi cập nhật thành công.
     * 
     * @return Class object của DTO chi tiết.
     */
    Class<? extends IDto<E>> getResponseDetailDtoClass();

    /**
     * Endpoint API PUT để cập nhật thông tin.
     * <p>
     * Dữ liệu trong Payload sẽ được validate và dùng để cập nhật bản ghi có ID
     * tương ứng.
     * </p>
     *
     * @param id  ID của bản ghi cần cập nhật.
     * @param dto DTO Request chứa thông tin cập nhật.
     * @return ResponseEntity chứa DTO đã cập nhật và HTTP Status 200 (OK).
     */
    @Operation(summary = "Cập nhật bản ghi", description = "Cập nhật thông tin bản ghi dựa trên ID.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Cập nhật thành công"),
            @ApiResponse(responseCode = "400", description = "Lỗi validation dữ liệu"),
            @ApiResponse(responseCode = "404", description = "Không tìm thấy bản ghi"),
    })
    @PutMapping("/{id}")
    default ResponseEntity<HttpApiResponse<? extends IDto<E>>> update(
            @Parameter(description = "ID của bản ghi", required = true) @PathVariable @NonNull ID id,
            @RequestBody @Valid @NonNull UPDATE_REQ dto) {
        Class<? extends IDto<E>> responseDtoClass = getResponseDetailDtoClass();
        if (responseDtoClass == null) {
            throw new HttpException(HttpStatus.INTERNAL_SERVER_ERROR,
                    "Class của DTO chi tiết không được xác định");
        }
        IDto<E> responseDto = getUpdateService().update(dto, id, responseDtoClass);
        return ResponseEntity.ok(HttpApiResponse.success(responseDto));
    }

    /**
     * Lấy instance của Service xử lý logic nghiệp vụ Cập nhật.
     * 
     * @param <S> Kiểu dữ liệu thực tế của Service (kế thừa {@link IUpdateService}).
     * @return Đối tượng Service.
     * @throws HttpException Nếu Service hiện tại không implement
     *                       {@link IUpdateService}.
     */
    @SuppressWarnings("unchecked")
    default <S extends IUpdateService<E, ID>> S getUpdateService() {
        if (getBaseService() instanceof IUpdateService) {

            return (S) getBaseService();
        } else {

            throw new HttpException(HttpStatus.INTERNAL_SERVER_ERROR,
                    "Service không implement IUpdateService");
        }
    }
}
