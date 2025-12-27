import{u,e as r,c as m,o as f,a as e,t as s,b as o,f as c}from"./index-tzEnmmga.js";import{_ as n}from"./CodeBlock-43NKrjhX.js";const b={id:"specifications",class:"scroll-mt-20 mb-16"},P={class:"text-3xl font-bold text-slate-900 border-b pb-4 mb-8"},g={class:"text-slate-600 mb-6 italic"},x={id:"spec-default",class:"mb-10 scroll-mt-24"},_={class:"text-xl font-bold text-slate-800 mb-3"},$=["innerHTML"],h={class:"bg-slate-50 border border-slate-200 rounded-lg p-5 mb-6"},v={class:"font-bold text-slate-700 mb-3 text-sm uppercase"},y={class:"space-y-3 text-sm font-mono text-slate-600"},q={class:"mb-4"},L={class:"font-semibold text-slate-700 mb-2"},T={class:"text-xs text-slate-500 mt-2 italic"},M={id:"spec-custom",class:"mb-10 scroll-mt-24"},S={class:"text-xl font-bold text-slate-800 mb-3"},R=["innerHTML"],C={class:"font-bold text-slate-700 mt-6 mb-2"},H=["innerHTML"],B={class:"font-bold text-slate-700 mt-6 mb-2"},w=["innerHTML"],A={class:"font-bold text-slate-700 mt-6 mb-2"},E=["innerHTML"],k={__name:"SpecificationSection",setup(F){const{t:i}=u(),l=r(()=>`package com.example.demo.dto.product;

import com.natswarchuan.genericservice.payload.request.BaseRequestParam;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class ProductFilterParam extends BaseRequestParam {
    private Double minPrice;
    private Double maxPrice;
    private String brandName; ${i("specification.code.comment_field_brand")}
    // ...
}
`),d=r(()=>`package com.example.demo.specification;

import com.example.demo.domain.Brand;
import com.example.demo.domain.Product;
import com.example.demo.dto.product.ProductFilterParam;
import com.natswarchuan.genericservice.specification.GenericSpecification;
import jakarta.persistence.criteria.*;
import java.util.ArrayList;
import java.util.List;

public class ProductSpecification extends GenericSpecification<Product> {

    private final ProductFilterParam productParam;

    public ProductSpecification(ProductFilterParam requestParam) {
        super(requestParam);
        this.productParam = requestParam;
    }

    @Override
    public Predicate toPredicate(Root<Product> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
        ${i("specification.code.comment_reuse")}
        Predicate basePredicate = super.toPredicate(root, query, cb);
        List<Predicate> predicates = new ArrayList<>();
        predicates.add(basePredicate);

        ${i("specification.code.comment_price")}
        if (productParam.getMinPrice() != null) {
            predicates.add(cb.greaterThanOrEqualTo(root.get("price"), productParam.getMinPrice()));
        }
        if (productParam.getMaxPrice() != null) {
            predicates.add(cb.lessThanOrEqualTo(root.get("price"), productParam.getMaxPrice()));
        }

        ${i("specification.code.comment_join")}
        if (productParam.getBrandName() != null && !productParam.getBrandName().isEmpty()) {
            Join<Product, Brand> brandJoin = root.join("brand", JoinType.INNER);
            predicates.add(cb.like(cb.lower(brandJoin.get("name")), 
                "%" + productParam.getBrandName().toLowerCase() + "%"));
        }

        return cb.and(predicates.toArray(new Predicate[0]));
    }
}
`),p=r(()=>`@RestController
@RequestMapping("/api/products")
public class ProductController extends AbController<Product, Long, ProductCreateReq, ProductUpdateReq> {

    // ... constructor ...

    ${i("specification.code.comment_override_findall")}
    @Override
    @GetMapping
    public ResponseEntity<HttpApiResponse<PagedResponse<ProductRes>>> findAll(
            ProductFilterParam requestParam, ${i("specification.code.comment_use_custom")}
            @RequestHeader(name = "Accept-Language", defaultValue = "en") String language) {
        return super.findAll(requestParam, language);
    }

    ${i("specification.code.comment_override_spec")}
    @Override
    protected Specification<Product> getSpecification(BaseRequestParam baseParam) {
        if (baseParam instanceof ProductFilterParam param) {
            ${i("specification.code.comment_return_spec")}
            return new ProductSpecification(param);
        }
        return super.getSpecification(baseParam);
    }
}
`);return(t,a)=>(f(),m("section",b,[e("h2",P,s(t.$t("specification.title")),1),e("p",g,s(t.$t("specification.subtitle")),1),e("article",x,[e("h3",_,[a[0]||(a[0]=e("span",{class:"bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm mr-3"},"10.1",-1)),o(" "+s(t.$t("specification.default.title")),1)]),e("p",{class:"text-slate-600 mb-4",innerHTML:t.$t("specification.default.desc")},null,8,$),e("div",h,[e("h4",v,s(t.$t("specification.default.params_title")),1),e("ul",y,[e("li",null,[a[1]||(a[1]=e("span",{class:"bg-blue-100 text-blue-800 px-2 py-0.5 rounded"},"page",-1)),o(" : "+s(t.$t("specification.default.params.page")),1)]),e("li",null,[a[2]||(a[2]=e("span",{class:"bg-blue-100 text-blue-800 px-2 py-0.5 rounded"},"size",-1)),o(" : "+s(t.$t("specification.default.params.size")),1)]),e("li",null,[a[3]||(a[3]=e("span",{class:"bg-purple-100 text-purple-800 px-2 py-0.5 rounded"},"sort",-1)),o(" : "+s(t.$t("specification.default.params.sort")),1)]),e("li",null,[a[4]||(a[4]=e("span",{class:"bg-purple-100 text-purple-800 px-2 py-0.5 rounded"},"dir",-1)),o(" : "+s(t.$t("specification.default.params.dir")),1)]),e("li",null,[a[5]||(a[5]=e("span",{class:"bg-green-100 text-green-800 px-2 py-0.5 rounded"},"search",-1)),o(" : "+s(t.$t("specification.default.params.search")),1)]),e("li",null,[a[6]||(a[6]=e("span",{class:"bg-green-100 text-green-800 px-2 py-0.5 rounded"},"searchField",-1)),o(" : "+s(t.$t("specification.default.params.searchField")),1)])])]),e("div",q,[e("h4",L,s(t.$t("specification.default.example_title")),1),a[7]||(a[7]=e("pre",{class:"bg-slate-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto"},"GET /api/products?page=0&size=20&sort=price&dir=desc&search=iphone&searchField=name",-1)),e("p",T,s(t.$t("specification.default.example_explain")),1)])]),e("article",M,[e("h3",S,[a[8]||(a[8]=e("span",{class:"bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm mr-3"},"10.2",-1)),o(" "+s(t.$t("specification.custom.title")),1)]),e("p",{class:"text-slate-600 mb-4",innerHTML:t.$t("specification.custom.desc")},null,8,R),e("h4",C,s(t.$t("specification.custom.step1.title")),1),e("p",{class:"text-sm text-slate-600 mb-2",innerHTML:t.$t("specification.custom.step1.desc")},null,8,H),c(n,{filename:"ProductRequestParam.java",code:l.value},null,8,["code"]),e("h4",B,s(t.$t("specification.custom.step2.title")),1),e("p",{class:"text-sm text-slate-600 mb-2",innerHTML:t.$t("specification.custom.step2.desc")},null,8,w),c(n,{filename:"ProductSpecification.java",code:d.value},null,8,["code"]),e("h4",A,s(t.$t("specification.custom.step3.title")),1),e("div",{class:"bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4 text-sm text-yellow-800",innerHTML:t.$t("specification.custom.step3.note")},null,8,E),c(n,{filename:"ProductController.java",code:p.value},null,8,["code"])])]))}};export{k as default};
