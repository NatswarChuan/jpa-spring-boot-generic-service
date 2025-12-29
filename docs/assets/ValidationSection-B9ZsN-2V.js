import{u as _,e as i,c as x,o as h,a as e,t as a,b as d,f as l}from"./index-CgjH2hXA.js";import{_ as n}from"./CodeBlock-CwfY0IEK.js";const f={id:"validation",class:"scroll-mt-20 mb-16"},S={class:"text-3xl font-bold text-slate-900 border-b pb-4 mb-8"},q={class:"text-slate-600 mb-8 italic"},y={class:"grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"},C={class:"bg-white rounded-xl border border-slate-200 p-5 shadow-sm relative overlow-hidden"},E={class:"text-slate-800 font-bold mb-2"},$={class:"text-xs text-slate-500 mb-4 h-8"},D={class:"bg-white rounded-xl border border-blue-200 p-5 shadow-sm relative overlow-hidden ring-1 ring-blue-100"},I={class:"text-blue-800 font-bold mb-2"},P={class:"text-xs text-slate-500 mb-4 h-8"},L={class:"bg-white rounded-xl border border-slate-200 p-5 shadow-sm relative overlow-hidden"},k={class:"text-slate-800 font-bold mb-2"},w={class:"text-xs text-slate-500 mb-4 h-8"},R={id:"val-basic",class:"mb-10 scroll-mt-24"},N={class:"text-xl font-bold text-slate-800 mb-3"},T={class:"text-slate-600 mb-4"},V={class:"space-y-6"},U={class:"font-semibold text-slate-700"},H={class:"text-sm text-slate-600 mb-2"},j={class:"font-semibold text-slate-700"},B={class:"text-sm text-slate-600 mb-2"},M={class:"font-semibold text-slate-700"},A={class:"text-sm text-slate-600 mb-2"},O={class:"font-semibold text-slate-700"},W={class:"text-sm text-slate-600 mb-2"},F={id:"val-custom",class:"mb-10 scroll-mt-24"},z={class:"text-xl font-bold text-slate-800 mb-3"},J=["innerHTML"],Q={class:"font-semibold text-slate-700 mt-4"},G={class:"text-sm text-slate-600 mb-2"},K={class:"font-semibold text-slate-700 mt-6"},X=["innerHTML"],Y={class:"text-sm text-slate-600 mt-4 mb-2"},Z={id:"val-advanced",class:"mb-10 scroll-mt-24"},ee={class:"text-xl font-bold text-slate-800 mb-3"},te=["innerHTML"],ae={class:"font-semibold text-slate-700 mt-4"},oe=["innerHTML"],ne={__name:"ValidationSection",setup(se){const{t:s}=_(),c=i(()=>`package com.example.demo.dto;

import com.example.demo.entity.Category;
import com.natswarchuan.genericservice.validation.Exists;
import com.natswarchuan.genericservice.validation.Unique;
import lombok.Data;

@Data
public class CategoryRequest {
    `+s("validation.code.comment_exists")+`
    @Exists(entity = Category.class, message = "`+s("validation_messages.category_parent_not_found")+`")
    private Long parentId;

    `+s("validation.code.comment_unique")+`
    @Unique(entity = Category.class, field = "name", message = "`+s("validation_messages.category_name_exists")+`")
    private String name;
}
`),r=i(()=>`package com.example.demo.dto;

import com.natswarchuan.genericservice.validation.EnumValue;
import lombok.Data;

public enum UserStatus { ACTIVE, INACTIVE, BANNED }

@Data
public class UserRequest {
    `+s("validation.code.comment_enum")+`
    @EnumValue(enumClass = UserStatus.class, message = "`+s("validation_messages.user_status_invalid")+`")
    private String status;
}
`),m=i(()=>`package com.example.demo.dto;

import com.natswarchuan.genericservice.validation.NoSpecialChars;
import com.natswarchuan.genericservice.validation.PhoneNumber;
import lombok.Data;

@Data
public class ProfileRequest {
    @PhoneNumber(message = "`+s("validation_messages.profile_phone_invalid")+`")
    private String phone;

    @NoSpecialChars(message = "`+s("validation_messages.profile_username_special_chars")+`")
    private String username;
}
`),p=i(()=>`package com.example.demo.dto;

import com.example.demo.domain.Category;
import com.natswarchuan.genericservice.validation.IdsExist;
import lombok.Data;
import java.util.Set;

@Data
public class ProductRequest {
    @IdsExist(entity = Category.class, message = "`+s("validation_messages.product_categories_not_found")+`")
    private Set<Long> categoryIds;
}
`),u=i(()=>`package com.example.demo.dto.product;

import com.example.demo.domain.Category;
import com.example.demo.validation.specs.IdsInSpecLoader;
import com.natswarchuan.genericservice.validation.SpecValidation;
import lombok.Data;
import java.util.Set;

@Data
public class ProductCreateReq {
    `+s("validation.code.comment_spec_ids")+`
    @SpecValidation(
        entity = Category.class, 
        loader = IdsInSpecLoader.class, 
        message = "`+s("validation_messages.product_categories_some_not_found")+`"
    )
    private Set<Long> categoryIds;
}
`),v=i(()=>`package com.example.demo.dto.product;

import com.example.demo.domain.Product;
import com.example.demo.validation.specs.ProductUniqueSpec;
import com.natswarchuan.genericservice.dto.IDto;
import com.natswarchuan.genericservice.validation.DtoSpecValidation;
import lombok.Data;

@Data
@DtoSpecValidation(
    loader = ProductUniqueSpec.class,
    mustExist = false,
    message = "`+s("validation_messages.product_name_store_exists")+`"
)
public class ProductCreateReq implements IDto<Product> {
    private String name;
    private Long storeId;
    // ...
}
`),b=i(()=>`package com.example.demo.validation.specs;

import com.example.demo.domain.Product;
import com.example.demo.dto.product.ProductCreateReq;
import com.natswarchuan.genericservice.validation.SpecificationLoader;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

@Component
public class ProductUniqueSpec implements SpecificationLoader<ProductCreateReq, Product> {

    @Override
    public Specification<Product> getSpecification(ProductCreateReq... args) {
        ProductCreateReq req = args[0];
        `+s("validation.code.comment_loader")+`
        return (root, query, cb) -> cb.and(
                cb.equal(root.get("name"), req.getName()),
                cb.equal(root.get("store").get("id"), req.getStoreId()));
    }
}
`),g=i(()=>`package com.example.demo.dto.brand;

import com.example.demo.domain.Brand;
import com.natswarchuan.genericservice.dto.IDto;
import com.natswarchuan.genericservice.validation.SqlConstraint;
import lombok.Data;

@Data
@SqlConstraint(
    sql = """
        SELECT CASE WHEN (SELECT count(*) FROM model_categories WHERE model_id = :mid) 
        = (SELECT count(*) FROM model_categories WHERE model_id = :mid AND category_id IN (:cids)) 
        THEN 1 ELSE 0 END""", 
    dependencies = { "mid:field/modelId", "cids:field/categoryIds" }, 
    message = "`+s("validation_messages.brand_model_category_invalid")+`"
)
public class BrandUpdateReq implements IDto<Brand> {
    private Long modelId;
    private Set<Long> categoryIds;
    // ...
}
`);return(t,o)=>(h(),x("section",f,[e("h2",S,a(t.$t("validation.title")),1),e("p",q,a(t.$t("validation.subtitle")),1),e("div",y,[e("div",C,[o[0]||(o[0]=e("div",{class:"absolute top-0 right-0 p-3 opacity-10"},[e("i",{class:"fas fa-font text-4xl"})],-1)),e("h4",E,a(t.$t("validation.strategy.level1.title")),1),o[1]||(o[1]=e("span",{class:"bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-xs font-mono mb-3 inline-block"},"@Annotation",-1)),e("p",$,a(t.$t("validation.strategy.level1.desc")),1),o[2]||(o[2]=e("ul",{class:"text-xs text-slate-600 space-y-1"},[e("li",null,"• @NotBlank, @Size"),e("li",null,"• @Email, @Pattern"),e("li",null,[d("• "),e("strong",null,"@Exists, @Unique"),d(" (Custom)")])],-1))]),e("div",D,[o[3]||(o[3]=e("div",{class:"absolute top-0 right-0 p-3 opacity-10"},[e("i",{class:"fas fa-code-branch text-4xl text-blue-600"})],-1)),e("h4",I,a(t.$t("validation.strategy.level2.title")),1),o[4]||(o[4]=e("span",{class:"bg-blue-100 text-blue-600 px-2 py-0.5 rounded text-xs font-mono mb-3 inline-block"},"Specification",-1)),e("p",P,a(t.$t("validation.strategy.level2.desc")),1),o[5]||(o[5]=e("ul",{class:"text-xs text-slate-600 space-y-1"},[e("li",null,[d("• "),e("strong",null,"@DtoSpecValidation")]),e("li",null,"• Tra cứu DB linh hoạt"),e("li",null,"• Logic nghiệp vụ custom")],-1))]),e("div",L,[o[6]||(o[6]=e("div",{class:"absolute top-0 right-0 p-3 opacity-10"},[e("i",{class:"fas fa-database text-4xl text-amber-600"})],-1)),e("h4",k,a(t.$t("validation.strategy.level3.title")),1),o[7]||(o[7]=e("span",{class:"bg-amber-100 text-amber-600 px-2 py-0.5 rounded text-xs font-mono mb-3 inline-block"},"Native SQL",-1)),e("p",w,a(t.$t("validation.strategy.level3.desc")),1),o[8]||(o[8]=e("ul",{class:"text-xs text-slate-600 space-y-1"},[e("li",null,[d("• "),e("strong",null,"@SqlConstraint")]),e("li",null,"• Complex Joins / Aggregates"),e("li",null,"• High Performance")],-1))])]),e("article",R,[e("h3",N,a(t.$t("validation.basic.title")),1),e("p",T,a(t.$t("validation.basic.desc")),1),e("div",V,[e("div",null,[e("h4",U,a(t.$t("validation.basic.exists_unique.title")),1),e("p",H,a(t.$t("validation.basic.exists_unique.desc")),1),l(n,{filename:"CategoryRequest.java",code:c.value},null,8,["code"])]),e("div",null,[e("h4",j,a(t.$t("validation.basic.enum_value.title")),1),e("p",B,a(t.$t("validation.basic.enum_value.desc")),1),l(n,{filename:"UserRequest.java",code:r.value},null,8,["code"])]),e("div",null,[e("h4",M,a(t.$t("validation.basic.phone_format.title")),1),e("p",A,a(t.$t("validation.basic.phone_format.desc")),1),l(n,{filename:"ProfileRequest.java",code:m.value},null,8,["code"])]),e("div",null,[e("h4",O,a(t.$t("validation.basic.ids_exist.title")),1),e("p",W,a(t.$t("validation.basic.ids_exist.desc")),1),l(n,{filename:"ProductRequest.java",code:p.value},null,8,["code"])])])]),e("article",F,[e("h3",z,a(t.$t("validation.custom.title")),1),e("p",{class:"text-slate-600 mb-4",innerHTML:t.$t("validation.custom.desc")},null,8,J),e("h4",Q,a(t.$t("validation.custom.spec.title")),1),e("p",G,a(t.$t("validation.custom.spec.desc")),1),l(n,{filename:"ProductDto.java",code:u.value},null,8,["code"]),e("h4",K,a(t.$t("validation.custom.dto_spec.title")),1),e("p",{class:"text-sm text-slate-600 mb-2",innerHTML:t.$t("validation.custom.dto_spec.desc")},null,8,X),l(n,{filename:"ProductCreateReq.java",code:v.value},null,8,["code"]),e("p",Y,a(t.$t("validation.custom.loader_label")),1),l(n,{filename:"ProductUniqueSpec.java",code:b.value},null,8,["code"])]),e("article",Z,[e("h3",ee,a(t.$t("validation.advanced.title")),1),e("p",{class:"text-slate-600 mb-4",innerHTML:t.$t("validation.advanced.desc")},null,8,te),e("h4",ae,a(t.$t("validation.advanced.sql.title")),1),e("p",{class:"text-sm text-slate-600 mb-2",innerHTML:t.$t("validation.advanced.sql.desc")},null,8,oe),l(n,{filename:"BrandUpdateReq.java",code:g.value},null,8,["code"])])]))}};export{ne as default};
