package com.example.demo.controller;

import com.example.demo.dto.req.ModelCreateReq;
import com.example.demo.dto.req.ModelUpdateReq;
import com.example.demo.dto.res.ModelResponse;
import com.example.demo.entity.Model;
import com.example.demo.service.IModelService;
import com.natswarchuan.genericservice.controller.AbController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/models")
public class ModelController extends AbController<Model, Long, ModelCreateReq, ModelUpdateReq> {
    public ModelController(IModelService service) {
        super(service);
    }

    @Override
    @SuppressWarnings("unchecked")
    protected Class<ModelResponse> getResponseDetailDtoClass() {
        return ModelResponse.class;
    }

    @Override
    @SuppressWarnings("unchecked")
    protected Class<ModelResponse> getResponseSummaryDtoClass() {
        return ModelResponse.class;
    }
}
