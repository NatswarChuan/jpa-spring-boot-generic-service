import{u,e as r,c as m,o as f,a as e,t as a,b as o,f as n}from"./index-CYRIV7B9.js";import{_ as c}from"./CodeBlock-BpSeFwgL.js";const b={id:"specifications",class:"scroll-mt-20 mb-16"},P={class:"text-3xl font-bold text-slate-900 border-b pb-4 mb-8"},g={class:"text-slate-600 mb-6 italic"},x={id:"spec-default",class:"mb-10 scroll-mt-24"},v={class:"text-xl font-bold text-slate-800 mb-3"},_=["innerHTML"],L={class:"bg-slate-50 border border-slate-200 rounded-lg p-5 mb-6"},T={class:"font-bold text-slate-700 mb-3 text-sm uppercase"},M={class:"space-y-3 text-sm font-mono text-slate-600"},h=["innerHTML"],H=["innerHTML"],q=["innerHTML"],y=["innerHTML"],$=["innerHTML"],S=["innerHTML"],C={class:"mb-4"},B={class:"font-semibold text-slate-700 mb-2"},R={class:"text-xs text-slate-500 mt-2 italic"},w={id:"spec-custom",class:"mb-10 scroll-mt-24"},k={class:"text-xl font-bold text-slate-800 mb-3"},E=["innerHTML"],F={class:"font-bold text-slate-700 mt-6 mb-2"},N=["innerHTML"],j={class:"font-bold text-slate-700 mt-6 mb-2"},A=["innerHTML"],D={class:"font-bold text-slate-700 mt-6 mb-2"},I=["innerHTML"],V={__name:"SpecificationSection",setup(O){const{t:s}=u(),l=r(()=>`package com.example.demo.dto.product;

import com.natswarchuan.genericservice.payload.request.BaseRequestParam;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class ProductFilterParam extends BaseRequestParam {
    private Double minPrice;
    private Double maxPrice;
    private String brandName; `+s("specification.code.comment_field_brand")+`
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
        `+s("specification.code.comment_reuse")+`
        Predicate basePredicate = super.toPredicate(root, query, cb);
        List<Predicate> predicates = new ArrayList<>();
        predicates.add(basePredicate);

        `+s("specification.code.comment_price")+`
        if (productParam.getMinPrice() != null) {
            predicates.add(cb.greaterThanOrEqualTo(root.get("price"), productParam.getMinPrice()));
        }
        if (productParam.getMaxPrice() != null) {
            predicates.add(cb.lessThanOrEqualTo(root.get("price"), productParam.getMaxPrice()));
        }

        `+s("specification.code.comment_join")+`
        if (productParam.getBrandName() != null && !productParam.getBrandName().isEmpty()) {
            Join<Product, Brand> brandJoin = root.join("brand", JoinType.INNER);
            predicates.add(cb.like(cb.lower(brandJoin.get("name")), 
                "%" + productParam.getBrandName().toLowerCase() + "%"));
        }

        return cb.and(predicates.toArray(new Predicate[0]));
    }
}
`),p=r(()=>`package com.example.demo.controller;
// ... imports ...

@RestController
@RequestMapping("/api/products")
public class ProductController implements IController<Product, Long, ProductCreateReq, ProductUpdateReq> {

    private final ProductService service;

    public ProductController(ProductService service) {
        this.service = service;
    }

    @Override
    public ProductService getBaseService() {
        return service;
    }

    `+s("specification.code.comment_override_spec")+`
    @Override
    public Specification<Product> getSpecification(BaseRequestParam requestParam) {
        if (requestParam instanceof ProductFilterParam param) {
            `+s("specification.code.comment_return_spec")+`
            return new ProductSpecification(param);
        }
        return IController.super.getSpecification(requestParam);
    }
    
    // You can also create a separate endpoint for custom filtering
    @GetMapping("/filter")
    public ResponseEntity<HttpApiResponse<PagedResponse<? extends IDto<Product>>>> filterProducts(
            ProductFilterParam requestParam,
            @RequestHeader(name = "Accept-Language", defaultValue = "en") String language) {
        return this.findAll(requestParam, language);
    }
}
`);return(i,t)=>(f(),m("section",b,[e("h2",P,a(i.$t("specification.title")),1),e("p",g,a(i.$t("specification.subtitle")),1),e("article",x,[e("h3",v,a(i.$t("specification.default.title")),1),e("p",{class:"text-slate-600 mb-4",innerHTML:i.$t("specification.default.desc")},null,8,_),e("div",L,[e("h4",T,a(i.$t("specification.default.params_title")),1),e("ul",M,[e("li",null,[t[0]||(t[0]=e("span",{class:"bg-blue-100 text-blue-800 px-2 py-0.5 rounded"},"page",-1)),t[1]||(t[1]=o(" : ",-1)),e("span",{innerHTML:i.$t("specification.default.params.page")},null,8,h)]),e("li",null,[t[2]||(t[2]=e("span",{class:"bg-blue-100 text-blue-800 px-2 py-0.5 rounded"},"size",-1)),t[3]||(t[3]=o(" : ",-1)),e("span",{innerHTML:i.$t("specification.default.params.size")},null,8,H)]),e("li",null,[t[4]||(t[4]=e("span",{class:"bg-purple-100 text-purple-800 px-2 py-0.5 rounded"},"sortBy",-1)),t[5]||(t[5]=o(" : ",-1)),e("span",{innerHTML:i.$t("specification.default.params.sort")},null,8,q)]),e("li",null,[t[6]||(t[6]=e("span",{class:"bg-purple-100 text-purple-800 px-2 py-0.5 rounded"},"sortDir",-1)),t[7]||(t[7]=o(" : ",-1)),e("span",{innerHTML:i.$t("specification.default.params.dir")},null,8,y)]),e("li",null,[t[8]||(t[8]=e("span",{class:"bg-green-100 text-green-800 px-2 py-0.5 rounded"},"search",-1)),t[9]||(t[9]=o(" : ",-1)),e("span",{innerHTML:i.$t("specification.default.params.search")},null,8,$)]),e("li",null,[t[10]||(t[10]=e("span",{class:"bg-green-100 text-green-800 px-2 py-0.5 rounded"},"searchField",-1)),t[11]||(t[11]=o(" : ",-1)),e("span",{innerHTML:i.$t("specification.default.params.searchField")},null,8,S)])])]),e("div",C,[e("h4",B,a(i.$t("specification.default.example_title")),1),t[12]||(t[12]=e("pre",{class:"bg-slate-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto"},"GET /api/products?page=0&size=20&sortBy=price&sortDir=desc&search=iphone&searchField=name",-1)),e("p",R,a(i.$t("specification.default.example_explain")),1)])]),e("article",w,[e("h3",k,a(i.$t("specification.custom.title")),1),e("p",{class:"text-slate-600 mb-4",innerHTML:i.$t("specification.custom.desc")},null,8,E),e("h4",F,a(i.$t("specification.custom.step1.title")),1),e("p",{class:"text-sm text-slate-600 mb-2",innerHTML:i.$t("specification.custom.step1.desc")},null,8,N),n(c,{filename:"ProductRequestParam.java",code:l.value},null,8,["code"]),e("h4",j,a(i.$t("specification.custom.step2.title")),1),e("p",{class:"text-sm text-slate-600 mb-2",innerHTML:i.$t("specification.custom.step2.desc")},null,8,A),n(c,{filename:"ProductSpecification.java",code:d.value},null,8,["code"]),e("h4",D,a(i.$t("specification.custom.step3.title")),1),e("div",{class:"bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4 text-sm text-yellow-800",innerHTML:i.$t("specification.custom.step3.note")},null,8,I),n(c,{filename:"ProductController.java",code:p.value},null,8,["code"])])]))}};export{V as default};
