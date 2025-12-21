package com.example.demo.dto.res;

import com.example.demo.entity.Brand;
import com.natswarchuan.genericservice.dto.IDto;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class BrandResponse implements IDto<Brand> {
    private Long id;
    private String name;
    private String origin;
}
