package com.example.demo.service.impl;

import com.example.demo.entity.Brand;
import com.example.demo.repository.BrandRepository;
import com.example.demo.service.IBrandService;
import com.natswarchuan.genericservice.service.AbService;
import jakarta.annotation.Nonnull;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class BrandServiceImpl extends AbService<Brand, Long> implements IBrandService {
    @SuppressWarnings("null")
    public BrandServiceImpl(@Nonnull BrandRepository repository) {
        super(repository);
    }
}
