package com.natswarchuan.genericservice.specification;

import com.natswarchuan.genericservice.payload.request.BaseRequestParam;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import org.springframework.data.jpa.domain.Specification;

public class GenericSpecification<E> implements Specification<E> {

    private final BaseRequestParam requestParam;

    public GenericSpecification(BaseRequestParam requestParam) {
        this.requestParam = requestParam;
    }

    @Override
    public Predicate toPredicate(Root<E> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
        if (requestParam.getSearch() != null && !requestParam.getSearch().isEmpty() &&
                requestParam.getSearchField() != null && !requestParam.getSearchField().isEmpty()) {

            return criteriaBuilder.like(
                    criteriaBuilder.lower(root.get(requestParam.getSearchField()).as(String.class)),
                    "%" + requestParam.getSearch().toLowerCase() + "%");
        }
        return criteriaBuilder.conjunction();
    }
}
