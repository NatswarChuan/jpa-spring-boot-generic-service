import{_ as r}from"./CodeBlock-rhId-KlK.js";import{r as n,c as m,o as d,b as t,e as s,d as o}from"./index-NytfIO67.js";const p={id:"dtos",class:"scroll-mt-20 mb-16"},u={id:"dto-request",class:"mb-10 scroll-mt-24"},g={id:"dto-response",class:"mb-10 scroll-mt-24"},b={id:"dto-i18n",class:"mb-10 scroll-mt-24"},f={__name:"UsageSection",setup(v){const a=n(`package com.example.demo.dto;

import com.example.demo.entity.Product;
import com.natswarchuan.genericservice.dto.IDto;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ProductCreateReq implements IDto<Product> {
    private String name;
    private Double price;

    // Chỉ cần override toEntity vì new() phụ thuộc logic của bạn
    @Override
    public Product toEntity() {
        Product p = new Product();
        p.setName(this.name);
        p.setPrice(this.price);
        return p;
    }
}
`),i=n(`package com.example.demo.dto;

import com.example.demo.entity.Product;
import com.natswarchuan.genericservice.dto.IDto;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ProductUpdateReq implements IDto<Product> {
    private String name;
    private Double price;

    // KHÔNG cần override updateEntity nếu field name trùng khớp
    // IDto tự động dùng BeanUtils.copyProperties(this, entity)
}
`),l=n(`package com.example.demo.dto;

import com.example.demo.entity.Product;
import com.natswarchuan.genericservice.dto.IDto;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ProductResponse implements IDto<Product> {
    private Long id;
    private String name;
    private Double price;

    // IDto tự động dùng BeanUtils.copyProperties(entity, this)
}
`),c=n(`@Override
public void fromEntity(Product entity, String language) {
    // Gọi hàm cha để copy fields cơ bản
    IDto.super.fromEntity(entity, language);
    
    // Xử lý logic đa ngôn ngữ custom
    if ("vi".equals(language)) {
        this.name = entity.getNameVi();
    } else {
        this.name = entity.getNameEn();
    }
}
`);return(D,e)=>(d(),m("section",p,[e[7]||(e[7]=t("h2",{class:"text-3xl font-bold text-slate-900 border-b pb-4 mb-8"},"4. Data Transfer Objects",-1)),t("article",u,[e[0]||(e[0]=t("h3",{class:"text-xl font-bold text-slate-800 mb-3"},"4.1. Request DTO (Create/Update)",-1)),e[1]||(e[1]=t("p",{class:"text-slate-600 mb-3"},"Tách biệt DTO tạo mới và cập nhật để kiểm soát dữ liệu đầu vào.",-1)),s(r,{filename:"ProductCreateReq.java",code:a.value},null,8,["code"]),s(r,{filename:"ProductUpdateReq.java",code:i.value},null,8,["code"])]),t("article",g,[e[2]||(e[2]=t("h3",{class:"text-xl font-bold text-slate-800 mb-3"},"4.2. Response DTO (Auto Mapping)",-1)),e[3]||(e[3]=t("p",{class:"text-slate-600 mb-3"},"Dữ liệu trả về cho client. Hỗ trợ tự động map từ Entity sang DTO.",-1)),s(r,{filename:"ProductResponse.java",code:l.value},null,8,["code"]),e[4]||(e[4]=t("div",{class:"bg-blue-50 border-l-4 border-blue-500 p-4 mb-4 mt-4 text-sm text-blue-800 shadow-sm"},[t("strong",null,"Tips:"),o(),t("code",null,"IDto"),o(" mặc định sử dụng "),t("code",null,"BeanUtils.copyProperties"),o(". Nếu tên field của DTO trùng với Entity, bạn "),t("strong",null,"KHÔNG CẦN"),o(" viết code mapping thủ công nữa. ")],-1))]),t("article",b,[e[5]||(e[5]=t("h3",{class:"text-xl font-bold text-slate-800 mb-3"},"4.3. Multi-language Support (I18n)",-1)),e[6]||(e[6]=t("p",{class:"text-slate-600 mb-3"},[o(" Framework hỗ trợ đa ngôn ngữ ngay khi chuyển đổi DTO. Bạn có thể override hàm "),t("code",null,"fromEntity"),o(" có tham số "),t("code",null,"language"),o(". ")],-1)),s(r,{filename:"ProductResponse.java",code:c.value},null,8,["code"])])]))}};export{f as default};
