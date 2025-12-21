package com.example.demo.dto.req;

import com.example.demo.entity.Brand;
import com.natswarchuan.genericservice.dto.IDto;
import com.natswarchuan.genericservice.validation.NoSpecialChars;
import com.natswarchuan.genericservice.validation.Unique;

import lombok.Data;
import lombok.NoArgsConstructor;
 
@Data
@NoArgsConstructor
public class BrandUpdateReq implements IDto<Brand> {
    @NoSpecialChars(message = "Tên thương hiệu không được chứa ký tự đặc biệt")
    @Unique(entity = Brand.class, message = "Tên thương hiệu đã tồn tại", field = "name")
    private String name;

    private String origin;
}
