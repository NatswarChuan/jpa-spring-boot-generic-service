package com.example.demo.dto.model;

import com.example.demo.domain.Model;
import com.natswarchuan.genericservice.dto.IDto;
import lombok.Data;

/**
 * DTO chi tiết Model.
 */
@Data
public class ModelDetailRes implements IDto<Model> {
    /**
     * ID của Model.
     */
    private Long id;

    /**
     * Tên Model.
     */
    private String name;

    /**
     * Năm sản xuất.
     */
    private Integer year;
}
