package com.example.demo.dto.req;

import com.natswarchuan.genericservice.dto.IDto;
import com.example.demo.entity.Product;
import jakarta.validation.constraints.Min;
import lombok.Data;

@Data
public class ProductUpdateReq implements IDto<Product> {
    private String name;

    @Min(value = 0, message = "Giá sản phẩm phải lớn hơn 0")
    private Double price;

    private String description;
}
