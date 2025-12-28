package com.natswarchuan.genericservice.controller;

import com.natswarchuan.genericservice.dto.IDto;
import com.natswarchuan.genericservice.exception.HttpException;
import com.natswarchuan.genericservice.payload.response.HttpApiResponse;
import com.natswarchuan.genericservice.service.IReadDetailService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

/**
 * Interface trait định nghĩa API cho chức năng Xem chi tiết (Read Detail).
 * <p>
 * Cung cấp endpoint để lấy thông tin đầy đủ của một bản ghi đơn lẻ.
 * </p>
 *
 * @param <E>  Kiểu dữ liệu của Entity.
 * @param <ID> Kiểu dữ liệu của định danh (ID).
 * @author NatswarChuan
 */
public interface IReadDetailController<E, ID> extends IBaseController<E, ID> {

        /**
         * Xác định Class của DTO dùng để trả về dữ liệu chi tiết.
         * 
         * 
         * @return Class object của DTO chi tiết.
         */
        @NonNull
        Class<? extends IDto<E>> getResponseDetailDtoClass();

        /**
         * Endpoint API GET để xem chi tiết một thực thể.
         * 
         * @param id ID của thực thể cần xem.
         * @return ResponseEntity chứa DTO chi tiết và HTTP Status 200 (OK).
         */
        @Operation(summary = "Lấy chi tiết", description = "Lấy thông tin chi tiết của một bản ghi dựa trên ID.")
        @ApiResponses(value = {
                        @ApiResponse(responseCode = "200", description = "Thành công"),
                        @ApiResponse(responseCode = "404", description = "Không tìm thấy bản ghi"),
        })
        @GetMapping("/{id}")
        default ResponseEntity<HttpApiResponse<? extends IDto<E>>> findById(
                        @Parameter(description = "ID của bản ghi", required = true) @PathVariable @NonNull ID id) {
                IDto<E> result = getReadDetailService().findById(id, getResponseDetailDtoClass());
                return ResponseEntity.ok(HttpApiResponse.success(result));
        }

        /**
         * Lấy instance của Service xử lý logic nghiệp vụ Xem chi tiết.
         * 
         * @param <S> Kiểu dữ liệu thực tế của Service (kế thừa
         *            {@link IReadDetailService}).
         * @return Đối tượng Service.
         * @throws HttpException Nếu Service hiện tại không implement
         *                       {@link IReadDetailService}.
         */
        @SuppressWarnings("unchecked")
        default <S extends IReadDetailService<E, ID>> S getReadDetailService() {
                if (getBaseService() instanceof IReadDetailService)
                        return (S) getBaseService();
                else
                        throw new HttpException(HttpStatus.INTERNAL_SERVER_ERROR,
                                        "Service không implement IReadDetailService");
        }
}
