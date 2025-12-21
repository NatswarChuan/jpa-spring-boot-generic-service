package com.natswarchuan.genericservice.dto;

import org.springframework.beans.BeanUtils;

/**
 * Interface cho các Data Transfer Object (DTO).
 * <p>
 * Interface này định nghĩa các phương thức chuyển đổi cơ bản giữa DTO và
 * Entity,
 * hỗ trợ việc tách biệt giữa lớp dữ liệu (Entity) và lớp giao diện (DTO).
 * Sử dụng {@link BeanUtils} để tự động copy dữ liệu nếu không có logic đặc
 * biệt.
 *
 * @param <E> Kiểu dữ liệu của Entity tương ứng với DTO này.
 * @author NatswarChuan
 */
public interface IDto<E> {

    /**
     * Chuyển đổi từ DTO sang Entity.
     * <p>
     * Mặc định trả về null. Các lớp con CẦN ghi đè để khởi tạo Entity mới.
     *
     * @return Đối tượng Entity chứa dữ liệu từ DTO.
     */
    default E toEntity() {
        return null;
    }

    /**
     * Cập nhật dữ liệu từ Entity vào DTO hiện tại.
     * <p>
     * Mặc định sử dụng {@link BeanUtils#copyProperties(Object, Object)} để copy các
     * field cùng tên.
     *
     * @param entity Đối tượng Entity nguồn.
     */
    default void fromEntity(E entity) {
        if (entity != null) {
            BeanUtils.copyProperties(entity, this);
        }
    }

    /**
     * Cập nhật dữ liệu từ Entity vào DTO hiện tại, có hỗ trợ ngôn ngữ.
     *
     * @param entity   Đối tượng Entity nguồn.
     * @param language Mã ngôn ngữ (ví dụ: "vi", "en").
     */
    default void fromEntity(E entity, String language) {
        fromEntity(entity);
    }

    /**
     * Cập nhật dữ liệu từ DTO vào một Entity đã tồn tại.
     * <p>
     * Mặc định sử dụng {@link BeanUtils#copyProperties(Object, Object)} để copy các
     * field cùng tên.
     *
     * @param entity Đối tượng Entity cần cập nhật.
     * @return Đối tượng Entity đã được cập nhật.
     */
    default E updateEntity(E entity) {
        if (entity != null) {
            BeanUtils.copyProperties(this, entity);
        }
        return entity;
    }
}
