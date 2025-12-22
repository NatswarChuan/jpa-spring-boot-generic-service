package com.example.demo.dto.store;

import com.example.demo.domain.Store;
import com.natswarchuan.genericservice.dto.IDto;
import lombok.Data;

/**
 * DTO tóm tắt Store.
 */
@Data
public class StoreRes implements IDto<Store> {
    /**
     * ID của Store.
     */
    private Long id;

    /**
     * Tên Store.
     */
    private String name;

    /**
     * Địa chỉ Store.
     */
    private String address;
}
