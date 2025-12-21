package com.example.demo.service.impl;

import com.example.demo.entity.Model;
import com.example.demo.repository.ModelRepository;
import com.example.demo.service.IModelService;
import com.natswarchuan.genericservice.service.AbService;

import jakarta.annotation.Nonnull;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class ModelServiceImpl extends AbService<Model, Long> implements IModelService {
    @SuppressWarnings("null")
    public ModelServiceImpl(@Nonnull ModelRepository repository) {
        super(repository);
    }
}
