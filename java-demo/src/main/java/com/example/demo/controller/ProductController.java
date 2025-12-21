package com.example.demo.controller;

import com.example.demo.dto.req.ProductCreateReq;
import com.example.demo.dto.req.ProductUpdateReq;
import com.example.demo.dto.res.ProductResponse;
import com.example.demo.entity.Product;
import com.example.demo.service.IProductService;
import com.natswarchuan.genericservice.controller.AbController;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/products")
public class ProductController
        extends AbController<Product, Long, ProductCreateReq, ProductUpdateReq> {

    public ProductController(IProductService service) {
        super(service);
    }


    @Override
    @SuppressWarnings("unchecked")
    protected Class<ProductResponse> getResponseDetailDtoClass() {
        return ProductResponse.class;
    }

    @Override
    @SuppressWarnings("unchecked")
    protected Class<ProductResponse> getResponseSummaryDtoClass() {
        return ProductResponse.class;
    }
}
