package com.example.demo.service.impl;

import com.example.demo.entity.Category;
import com.example.demo.repository.CategoryRepository;
import com.example.demo.service.ICategoryService;
import com.natswarchuan.genericservice.service.AbService;

import jakarta.annotation.Nonnull;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class CategoryServiceImpl extends AbService<Category, Long> implements ICategoryService {
    @SuppressWarnings("null")
    public CategoryServiceImpl(@Nonnull CategoryRepository repository) {
        super(repository);
    }
}
