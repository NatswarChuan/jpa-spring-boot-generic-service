package com.example.demo.dto.req.spec;

import com.example.demo.dto.req.ModelCreateReq;
import com.example.demo.entity.Model;
import com.natswarchuan.genericservice.validation.SpecificationLoader;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

@Component
public class ModelCategoriesBelongToBrandSpec implements SpecificationLoader<Object, Model> {

    @Override
    public Specification<Model> getSpecification(Object... args) {
        ModelCreateReq dto = (ModelCreateReq) args[0];

        return (root, query, cb) -> {
            if (dto.getBrandId() == null || dto.getCategoryIds() == null || dto.getCategoryIds().isEmpty()) {
                return cb.conjunction();
            }

            var categoriesJoin = root.join("categories");
            var categoryBrandJoin = categoriesJoin.join("brand");

            return cb.and(
                    categoriesJoin.get("id").in(dto.getCategoryIds()),
                    cb.equal(categoryBrandJoin.get("id"), dto.getBrandId()));
        };
    }
}
