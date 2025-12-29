import{u,e as i,c as g,o as b,a as t,t as a,f as r,b as n}from"./index-CYRIV7B9.js";import{_ as l}from"./CodeBlock-BpSeFwgL.js";const v={id:"dtos",class:"scroll-mt-20 mb-16"},_={class:"text-3xl font-bold text-slate-900 border-b pb-4 mb-8"},y={class:"text-slate-600 italic mb-6"},x={id:"dto-request",class:"mb-10 scroll-mt-24"},h={class:"text-xl font-bold text-slate-800 mb-3"},f=["innerHTML"],I={id:"dto-response",class:"mb-10 scroll-mt-24"},D={class:"text-xl font-bold text-slate-800 mb-3"},C=["innerHTML"],P=["innerHTML"],L={id:"dto-i18n",class:"mb-10 scroll-mt-24"},S={class:"text-xl font-bold text-slate-800 mb-3"},B=["innerHTML"],M={__name:"UsageSection",setup(E){const{t:o}=u(),d=i(()=>`package com.example.demo.dto.product;

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

    @NotBlank(message = "`+o("validation_messages.product_name_required")+`")
    private String name;

    @DecimalMin(value = "0.0", message = "`+o("validation_messages.product_price_non_negative")+`")
    private BigDecimal price;

    @Exists(entity = Brand.class)
    private Long brandId;

    @Exists(entity = Model.class)
    private Long modelId;

    @Exists(entity = Store.class)
    private Long storeId;

    @IdsExist(entity = Category.class, message = "`+o("validation_messages.product_categories_not_found")+`")
    private Set<Long> categoryIds;

    @Override
    public Product toEntity() {
        `+o("dtos.code.comment_convert")+`
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
`),c=i(()=>`package com.example.demo.dto.product;

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

    @IdsExist(entity = Category.class, message = "`+o("validation_messages.product_categories_not_found")+`")
    private Set<Long> categoryIds;

    @Override
    public Product updateEntity(Product entity) {
        `+o("dtos.code.comment_update")+`
        IDto.super.updateEntity(entity);

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

    `+o("dtos.code.comment_auto")+`
}
`),p=i(()=>""+o("dtos.code.comment_i18n")+`
@Override
public void fromEntity(Product entity, String language) {
    IDto.super.fromEntity(entity, language);
    // ...
}
`);return(e,s)=>(b(),g("section",v,[t("h2",_,a(e.$t("dtos.title")),1),t("p",y,a(e.$t("dtos.subtitle")),1),t("article",x,[t("h3",h,[s[0]||(s[0]=t("span",{class:"bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm mr-3"},"6.1",-1)),n(" "+a(e.$t("dtos.req.title")),1)]),t("p",{class:"text-slate-600 mb-3",innerHTML:e.$t("dtos.req.desc")},null,8,f),r(l,{filename:"ProductCreateReq.java",code:d.value},null,8,["code"]),r(l,{filename:"ProductUpdateReq.java",code:c.value},null,8,["code"])]),t("article",I,[t("h3",D,[s[1]||(s[1]=t("span",{class:"bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm mr-3"},"6.2",-1)),n(" "+a(e.$t("dtos.res.title")),1)]),t("p",{class:"text-slate-600 mb-3",innerHTML:e.$t("dtos.res.desc")},null,8,C),r(l,{filename:"ProductResponse.java",code:m.value},null,8,["code"]),t("div",{class:"bg-blue-50 border-l-4 border-blue-500 p-4 mb-4 mt-4 text-sm text-blue-800 shadow-sm",innerHTML:e.$t("dtos.res.tips")},null,8,P)]),t("article",L,[t("h3",S,[s[2]||(s[2]=t("span",{class:"bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm mr-3"},"6.3",-1)),n(" "+a(e.$t("dtos.i18n.title")),1)]),t("p",{class:"text-slate-600 mb-3",innerHTML:e.$t("dtos.i18n.desc")},null,8,B),r(l,{filename:"ProductResponse.java",code:p.value},null,8,["code"])])]))}};export{M as default};
