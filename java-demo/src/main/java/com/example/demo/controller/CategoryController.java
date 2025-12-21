package com.example.demo.controller;

import com.example.demo.dto.req.CategoryCreateReq;
import com.example.demo.dto.req.CategoryUpdateReq;
import com.example.demo.dto.res.CategoryResponse;
import com.example.demo.entity.Category;
import com.example.demo.service.ICategoryService;
import com.natswarchuan.genericservice.controller.AbController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/categories")
public class CategoryController extends AbController<Category, Long, CategoryCreateReq, CategoryUpdateReq> {
    public CategoryController(ICategoryService service) {
        super(service);
    }

    @Override
    @SuppressWarnings("unchecked")
    protected Class<CategoryResponse> getResponseDetailDtoClass() {
        return CategoryResponse.class;
    }

    @Override
    @SuppressWarnings("unchecked")
    protected Class<CategoryResponse> getResponseSummaryDtoClass() {
        return CategoryResponse.class;
    }
}
