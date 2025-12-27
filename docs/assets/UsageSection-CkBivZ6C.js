import{u,e as i,c as g,o as b,a as t,t as o,f as r,b as c}from"./index-tzEnmmga.js";import{_ as l}from"./CodeBlock-43NKrjhX.js";const v={id:"dtos",class:"scroll-mt-20 mb-16"},x={class:"text-3xl font-bold text-slate-900 border-b pb-4 mb-8"},y={class:"text-slate-600 italic mb-6"},h={id:"dto-request",class:"mb-10 scroll-mt-24"},_={class:"text-xl font-bold text-slate-800 mb-3"},I={class:"text-slate-600 mb-3"},f={id:"dto-response",class:"mb-10 scroll-mt-24"},D={class:"text-xl font-bold text-slate-800 mb-3"},P={class:"text-slate-600 mb-3"},C=["innerHTML"],S={id:"dto-i18n",class:"mb-10 scroll-mt-24"},B={class:"text-xl font-bold text-slate-800 mb-3"},$=["innerHTML"],k={__name:"UsageSection",setup(E){const{t:a}=u(),d=i(()=>`package com.example.demo.dto.product;

import java.math.BigDecimal;
import java.util.Set;
import java.util.stream.Collectors;
import org.springframework.beans.BeanUtils;

import com.example.demo.domain.*;
import com.natswarchuan.genericservice.dto.IDto;
import com.natswarchuan.genericservice.validation.*;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class ProductCreateReq implements IDto<Product> {

    @NotBlank(message = "Name is required")
    private String name;

    @DecimalMin(value = "0.0", message = "Price must be non-negative")
    private BigDecimal price;

    @Exists(entity = Brand.class)
    private Long brandId;

    @Exists(entity = Model.class)
    private Long modelId;

    @Exists(entity = Store.class)
    private Long storeId;

    @IdsExist(entity = Category.class, message = "Given categories do not exist")
    private Set<Long> categoryIds;

    ${a("dtos.code.comment_convert")}
    @Override
    public Product toEntity() {
        Product product = new Product();
        BeanUtils.copyProperties(this, product, "categoryIds");
        if (this.categoryIds != null) {
            Set<Category> categories = this.categoryIds.stream()
                    .map(id -> Category.builder().id(id).build())
                    .collect(Collectors.toSet());
            product.setCategories(categories);
        }
        return product;
    }
}
`),n=i(()=>`package com.example.demo.dto.product;

import java.math.BigDecimal;
import java.util.Set;
import java.util.stream.Collectors;

import com.example.demo.domain.*;
import com.natswarchuan.genericservice.dto.IDto;
import com.natswarchuan.genericservice.validation.*;

import lombok.Data;

@Data
public class ProductUpdateReq implements IDto<Product> {
    private String name;
    private BigDecimal price;

    @Exists(entity = Brand.class)
    private Long brandId;

    @Exists(entity = Model.class)
    private Long modelId;

    @Exists(entity = Store.class)
    private Long storeId;

    @IdsExist(entity = Category.class, message = "Given categories do not exist")
    private Set<Long> categoryIds;

    @Override
    public Product updateEntity(Product entity) {
        ${a("dtos.code.comment_update")}
        if (this.categoryIds != null) {
            Set<Category> categories = this.categoryIds.stream()
                    .map(id -> Category.builder().id(id).build())
                    .collect(Collectors.toSet());
            entity.setCategories(categories); 
        }
        return entity;
    }
}
`),m=i(()=>`package com.example.demo.dto.product;

import java.math.BigDecimal;
import com.example.demo.domain.Product;
import com.natswarchuan.genericservice.dto.IDto;
import lombok.Data;

@Data
public class ProductRes implements IDto<Product> {
    private Long id;
    private String name;
    private BigDecimal price;

    ${a("dtos.code.comment_auto")}
}
`),p=i(()=>`${a("dtos.code.comment_i18n")}
@Override
public void fromEntity(Product entity, String language) {
    IDto.super.fromEntity(entity, language);
    // ...
}
`);return(e,s)=>(b(),g("section",v,[t("h2",x,o(e.$t("dtos.title")),1),t("p",y,o(e.$t("dtos.subtitle")),1),t("article",h,[t("h3",_,[s[0]||(s[0]=t("span",{class:"bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm mr-3"},"6.1",-1)),c(" "+o(e.$t("dtos.req.title")),1)]),t("p",I,o(e.$t("dtos.req.desc")),1),r(l,{filename:"ProductCreateReq.java",code:d.value},null,8,["code"]),r(l,{filename:"ProductUpdateReq.java",code:n.value},null,8,["code"])]),t("article",f,[t("h3",D,[s[1]||(s[1]=t("span",{class:"bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm mr-3"},"6.2",-1)),c(" "+o(e.$t("dtos.res.title")),1)]),t("p",P,o(e.$t("dtos.res.desc")),1),r(l,{filename:"ProductResponse.java",code:m.value},null,8,["code"]),t("div",{class:"bg-blue-50 border-l-4 border-blue-500 p-4 mb-4 mt-4 text-sm text-blue-800 shadow-sm",innerHTML:e.$t("dtos.res.tips")},null,8,C)]),t("article",S,[t("h3",B,[s[2]||(s[2]=t("span",{class:"bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm mr-3"},"6.3",-1)),c(" "+o(e.$t("dtos.i18n.title")),1)]),t("p",{class:"text-slate-600 mb-3",innerHTML:e.$t("dtos.i18n.desc")},null,8,$),r(l,{filename:"ProductResponse.java",code:p.value},null,8,["code"])])]))}};export{k as default};
