import{u as x,e as s,c as h,o as f,a as t,t as a,b as n,f as i}from"./index-tzEnmmga.js";import{_ as l}from"./CodeBlock-43NKrjhX.js";const _={id:"validation",class:"scroll-mt-20 mb-16"},S={class:"text-3xl font-bold text-slate-900 border-b pb-4 mb-8"},q={class:"text-slate-600 mb-8 italic"},y={class:"grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"},C={class:"bg-white rounded-xl border border-slate-200 p-5 shadow-sm relative overlow-hidden"},$={class:"text-slate-800 font-bold mb-2"},k={class:"text-xs text-slate-500 mb-4 h-8"},D={class:"bg-white rounded-xl border border-blue-200 p-5 shadow-sm relative overlow-hidden ring-1 ring-blue-100"},E={class:"text-blue-800 font-bold mb-2"},I={class:"text-xs text-slate-500 mb-4 h-8"},P={class:"bg-white rounded-xl border border-slate-200 p-5 shadow-sm relative overlow-hidden"},w={class:"text-slate-800 font-bold mb-2"},L={class:"text-xs text-slate-500 mb-4 h-8"},R={id:"val-basic",class:"mb-10 scroll-mt-24"},N={class:"text-xl font-bold text-slate-800 mb-3"},T={class:"text-slate-600 mb-4"},V={class:"space-y-6"},U={class:"font-semibold text-slate-700"},j={class:"text-sm text-slate-600 mb-2"},B={class:"font-semibold text-slate-700"},H={class:"text-sm text-slate-600 mb-2"},M={class:"font-semibold text-slate-700"},A={class:"text-sm text-slate-600 mb-2"},O={class:"font-semibold text-slate-700"},W={class:"text-sm text-slate-600 mb-2"},F={id:"val-custom",class:"mb-10 scroll-mt-24"},z={class:"text-xl font-bold text-slate-800 mb-3"},J=["innerHTML"],Q={class:"font-semibold text-slate-700 mt-4"},G={class:"text-sm text-slate-600 mb-2"},K={class:"font-semibold text-slate-700 mt-6"},X=["innerHTML"],Y={class:"text-sm text-slate-600 mt-4 mb-2"},Z={id:"val-advanced",class:"mb-10 scroll-mt-24"},tt={class:"text-xl font-bold text-slate-800 mb-3"},et=["innerHTML"],at={class:"font-semibold text-slate-700 mt-4"},ot={class:"text-sm text-slate-600 mb-2"},nt={__name:"ValidationSection",setup(st){const{t:d}=x(),c=s(()=>`package com.example.demo.dto;

import com.example.demo.entity.Category;
import com.natswarchuan.genericservice.validation.Exists;
import com.natswarchuan.genericservice.validation.Unique;
import lombok.Data;

@Data
public class CategoryRequest {
    ${d("validation.code.comment_exists")}
    @Exists(entity = Category.class, message = "Danh mục cha không tồn tại")
    private Long parentId;

    ${d("validation.code.comment_unique")}
    @Unique(entity = Category.class, field = "name", message = "Tên danh mục đã được sử dụng")
    private String name;
}
`),r=s(()=>`package com.example.demo.dto;

import com.natswarchuan.genericservice.validation.EnumValue;
import lombok.Data;

public enum UserStatus { ACTIVE, INACTIVE, BANNED }

@Data
public class UserRequest {
    ${d("validation.code.comment_enum")}
    @EnumValue(enumClass = UserStatus.class, message = "Trạng thái không hợp lệ")
    private String status;
}
`),m=s(()=>`package com.example.demo.dto;

import com.natswarchuan.genericservice.validation.NoSpecialChars;
import com.natswarchuan.genericservice.validation.PhoneNumber;
import lombok.Data;

@Data
public class ProfileRequest {
    @PhoneNumber(message = "SĐT không đúng định dạng quốc tế")
    private String phone;

    @NoSpecialChars(message = "Tên đăng nhập không được chứa ký tự đặc biệt")
    private String username;
}
`),p=s(()=>`package com.example.demo.dto;

import com.example.demo.domain.Category;
import com.natswarchuan.genericservice.validation.IdsExist;
import lombok.Data;
import java.util.Set;

@Data
public class ProductRequest {
    @IdsExist(entity = Category.class, message = "Danh mục không tồn tại")
    private Set<Long> categoryIds;
}
`),u=s(()=>`package com.example.demo.dto.product;

import com.example.demo.domain.Category;
import com.example.demo.validation.specs.IdsInSpecLoader;
import com.natswarchuan.genericservice.validation.SpecValidation;
import lombok.Data;
import java.util.Set;

@Data
public class ProductCreateReq {
    ${d("validation.code.comment_spec_ids")}
    @SpecValidation(
        entity = Category.class, 
        loader = IdsInSpecLoader.class, 
        message = "Một hoặc nhiều danh mục không tồn tại"
    )
    private Set<Long> categoryIds;
}
`),v=s(()=>`package com.example.demo.dto.product;

import com.example.demo.domain.Product;
import com.example.demo.validation.specs.ProductUniqueSpec;
import com.natswarchuan.genericservice.dto.IDto;
import com.natswarchuan.genericservice.validation.DtoSpecValidation;
import lombok.Data;

@Data
@DtoSpecValidation(
    loader = ProductUniqueSpec.class, 
    message = "Sản phẩm với tên này đã tồn tại trong cửa hàng được chọn"
)
public class ProductCreateReq implements IDto<Product> {
    private String name;
    private Long storeId;
    // ...
}
`),b=s(()=>`package com.example.demo.validation.specs;

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
        ${d("validation.code.comment_loader")}
        return (root, query, cb) -> cb.and(
                cb.equal(root.get("name"), req.getName()),
                cb.equal(root.get("store").get("id"), req.getStoreId()));
    }
}
`),g=s(()=>`package com.example.demo.dto.brand;

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
    message = "Brand does not support all categories of the selected Model"
)
public class BrandUpdateReq implements IDto<Brand> {
    private Long modelId;
    private Set<Long> categoryIds;
    // ...
}
`);return(e,o)=>(f(),h("section",_,[t("h2",S,a(e.$t("validation.title")),1),t("p",q,a(e.$t("validation.subtitle")),1),t("div",y,[t("div",C,[o[0]||(o[0]=t("div",{class:"absolute top-0 right-0 p-3 opacity-10"},[t("i",{class:"fas fa-font text-4xl"})],-1)),t("h4",$,a(e.$t("validation.strategy.level1.title")),1),o[1]||(o[1]=t("span",{class:"bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-xs font-mono mb-3 inline-block"},"@Annotation",-1)),t("p",k,a(e.$t("validation.strategy.level1.desc")),1),o[2]||(o[2]=t("ul",{class:"text-xs text-slate-600 space-y-1"},[t("li",null,"• @NotBlank, @Size"),t("li",null,"• @Email, @Pattern"),t("li",null,[n("• "),t("strong",null,"@Exists, @Unique"),n(" (Custom)")])],-1))]),t("div",D,[o[3]||(o[3]=t("div",{class:"absolute top-0 right-0 p-3 opacity-10"},[t("i",{class:"fas fa-code-branch text-4xl text-blue-600"})],-1)),t("h4",E,a(e.$t("validation.strategy.level2.title")),1),o[4]||(o[4]=t("span",{class:"bg-blue-100 text-blue-600 px-2 py-0.5 rounded text-xs font-mono mb-3 inline-block"},"Specification",-1)),t("p",I,a(e.$t("validation.strategy.level2.desc")),1),o[5]||(o[5]=t("ul",{class:"text-xs text-slate-600 space-y-1"},[t("li",null,[n("• "),t("strong",null,"@DtoSpecValidation")]),t("li",null,"• Tra cứu DB linh hoạt"),t("li",null,"• Logic nghiệp vụ custom")],-1))]),t("div",P,[o[6]||(o[6]=t("div",{class:"absolute top-0 right-0 p-3 opacity-10"},[t("i",{class:"fas fa-database text-4xl text-amber-600"})],-1)),t("h4",w,a(e.$t("validation.strategy.level3.title")),1),o[7]||(o[7]=t("span",{class:"bg-amber-100 text-amber-600 px-2 py-0.5 rounded text-xs font-mono mb-3 inline-block"},"Native SQL",-1)),t("p",L,a(e.$t("validation.strategy.level3.desc")),1),o[8]||(o[8]=t("ul",{class:"text-xs text-slate-600 space-y-1"},[t("li",null,[n("• "),t("strong",null,"@SqlConstraint")]),t("li",null,"• Complex Joins / Aggregates"),t("li",null,"• High Performance")],-1))])]),t("article",R,[t("h3",N,[o[9]||(o[9]=t("span",{class:"bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm mr-3"},"9.1",-1)),n(" "+a(e.$t("validation.basic.title")),1)]),t("p",T,a(e.$t("validation.basic.desc")),1),t("div",V,[t("div",null,[t("h4",U,a(e.$t("validation.basic.exists_unique.title")),1),t("p",j,a(e.$t("validation.basic.exists_unique.desc")),1),i(l,{filename:"CategoryRequest.java",code:c.value},null,8,["code"])]),t("div",null,[t("h4",B,a(e.$t("validation.basic.enum_value.title")),1),t("p",H,a(e.$t("validation.basic.enum_value.desc")),1),i(l,{filename:"UserRequest.java",code:r.value},null,8,["code"])]),t("div",null,[t("h4",M,a(e.$t("validation.basic.phone_format.title")),1),t("p",A,a(e.$t("validation.basic.phone_format.desc")),1),i(l,{filename:"ProfileRequest.java",code:m.value},null,8,["code"])]),t("div",null,[t("h4",O,a(e.$t("validation.basic.ids_exist.title")),1),t("p",W,a(e.$t("validation.basic.ids_exist.desc")),1),i(l,{filename:"ProductRequest.java",code:p.value},null,8,["code"])])])]),t("article",F,[t("h3",z,[o[10]||(o[10]=t("span",{class:"bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm mr-3"},"9.2",-1)),n(" "+a(e.$t("validation.custom.title")),1)]),t("p",{class:"text-slate-600 mb-4",innerHTML:e.$t("validation.custom.desc")},null,8,J),t("h4",Q,a(e.$t("validation.custom.spec.title")),1),t("p",G,a(e.$t("validation.custom.spec.desc")),1),i(l,{filename:"ProductDto.java",code:u.value},null,8,["code"]),t("h4",K,a(e.$t("validation.custom.dto_spec.title")),1),t("p",{class:"text-sm text-slate-600 mb-2",innerHTML:e.$t("validation.custom.dto_spec.desc")},null,8,X),i(l,{filename:"ProductCreateReq.java",code:v.value},null,8,["code"]),t("p",Y,a(e.$t("validation.custom.loader_label")),1),i(l,{filename:"ProductUniqueSpec.java",code:b.value},null,8,["code"])]),t("article",Z,[t("h3",tt,[o[11]||(o[11]=t("span",{class:"bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm mr-3"},"9.3",-1)),n(" "+a(e.$t("validation.advanced.title")),1)]),t("p",{class:"text-slate-600 mb-4",innerHTML:e.$t("validation.advanced.desc")},null,8,et),t("h4",at,a(e.$t("validation.advanced.sql.title")),1),t("p",ot,a(e.$t("validation.advanced.sql.desc")),1),i(l,{filename:"BrandUpdateReq.java",code:g.value},null,8,["code"])])]))}};export{nt as default};
