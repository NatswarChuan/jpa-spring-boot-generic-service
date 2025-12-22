package com.example.demo.dto.req.spec;

import com.example.demo.dto.req.ProductCreateReq;
import com.example.demo.entity.Product;
import com.natswarchuan.genericservice.validation.SpecificationLoader;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class ProductRelationshipConsistencySpec implements SpecificationLoader<Object, Product> {

    @Override
    public Specification<Product> getSpecification(Object... args) {
        ProductCreateReq dto = (ProductCreateReq) args[0];

        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (dto.getBrandId() != null && dto.getModelId() != null) {
                var modelJoin = root.join("model");
                var modelBrandJoin = modelJoin.join("brand");
                predicates.add(cb.equal(modelBrandJoin.get("id"), dto.getBrandId()));
            }

            if (dto.getBrandId() != null && dto.getCategoryId() != null) {
                var categoryJoin = root.join("category");
                var categoryBrandJoin = categoryJoin.join("brand");
                predicates.add(cb.equal(categoryBrandJoin.get("id"), dto.getBrandId()));
            }

            return predicates.isEmpty() ? cb.conjunction() : cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}
