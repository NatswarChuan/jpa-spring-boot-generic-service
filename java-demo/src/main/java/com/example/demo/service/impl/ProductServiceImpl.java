package com.example.demo.service.impl;

import com.example.demo.entity.Product;
import com.example.demo.repository.ProductRepository;
import com.example.demo.service.IProductService;
import com.natswarchuan.genericservice.service.AbService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class ProductServiceImpl extends AbService<Product, Long> implements IProductService {
    public ProductServiceImpl(ProductRepository repository) {
        super(repository);
    }
}
