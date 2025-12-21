package com.example.demo.controller;

import com.example.demo.dto.req.BrandCreateReq;
import com.example.demo.dto.req.BrandUpdateReq;
import com.example.demo.dto.res.BrandResponse;
import com.example.demo.entity.Brand;
import com.example.demo.service.IBrandService;
import com.natswarchuan.genericservice.controller.AbController;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/brands")
public class BrandController extends AbController<Brand, Long, BrandCreateReq, BrandUpdateReq> {
    public BrandController(IBrandService service) {
        super(service);
    }

    @Override
    @SuppressWarnings("unchecked")
    protected Class<BrandResponse> getResponseDetailDtoClass() {
        return BrandResponse.class;
    }

    @Override
    @SuppressWarnings("unchecked")
    protected Class<BrandResponse> getResponseSummaryDtoClass() {
        return BrandResponse.class;
    }
}
