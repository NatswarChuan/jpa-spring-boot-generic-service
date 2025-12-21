package com.example.demo.dto.req;

import com.example.demo.entity.Brand;
import com.natswarchuan.genericservice.dto.IDto;
import com.natswarchuan.genericservice.validation.NoSpecialChars;
import com.natswarchuan.genericservice.validation.Unique;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.BeanUtils;

@Data
@NoArgsConstructor
public class BrandCreateReq implements IDto<Brand> {
    @NotBlank(message = "Tên thương hiệu không được để trống")
    @Unique(entity = Brand.class, message = "Tên thương hiệu đã tồn tại", field = "name")
    @NoSpecialChars(message = "Tên thương hiệu không được chứa ký tự đặc biệt")
    private String name;

    private String origin;

    @Override
    public Brand toEntity() {
        Brand brand = new Brand();
        BeanUtils.copyProperties(this, brand);
        return brand;
    }
}
