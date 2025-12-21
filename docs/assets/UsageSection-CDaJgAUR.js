import{_ as r}from"./CodeBlock-DBZk2lcI.js";import{r as s,c as l,o as m,b as e,e as a,d as o}from"./index-B66TvSSb.js";const p={id:"dtos",class:"scroll-mt-20 mb-16"},d={id:"dto-request",class:"mb-10 scroll-mt-24"},u={id:"dto-response",class:"mb-10 scroll-mt-24"},x={__name:"UsageSection",setup(b){const n=s(`package com.example.demo.dto;

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
`),i=s(`package com.example.demo.dto;

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
`),c=s(`package com.example.demo.dto;

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

    // KHÔNG cần override fromEntity nếu field name trùng khớp
    // IDto tự động dùng BeanUtils.copyProperties(entity, this)
}
`);return(g,t)=>(m(),l("section",p,[t[5]||(t[5]=e("h2",{class:"text-3xl font-bold text-slate-900 border-b pb-4 mb-8"},"4. Data Transfer Objects",-1)),e("article",d,[t[0]||(t[0]=e("h3",{class:"text-xl font-bold text-slate-800 mb-3"},"4.1. Request DTO (Create/Update)",-1)),t[1]||(t[1]=e("p",{class:"text-slate-600 mb-3"},"Tách biệt DTO tạo mới và cập nhật để kiểm soát dữ liệu đầu vào.",-1)),a(r,{filename:"ProductCreateReq.java",code:n.value},null,8,["code"]),a(r,{filename:"ProductUpdateReq.java",code:i.value},null,8,["code"])]),e("article",u,[t[2]||(t[2]=e("h3",{class:"text-xl font-bold text-slate-800 mb-3"},"4.2. Response DTO (Auto Mapping)",-1)),t[3]||(t[3]=e("p",{class:"text-slate-600 mb-3"},"Dữ liệu trả về cho client.",-1)),a(r,{filename:"ProductResponse.java",code:c.value},null,8,["code"]),t[4]||(t[4]=e("div",{class:"bg-blue-50 border-l-4 border-blue-500 p-4 mb-4 mt-4 text-sm text-blue-800"},[e("strong",null,"Tips:"),o(),e("code",null,"IDto"),o(" mặc định sử dụng "),e("code",null,"BeanUtils.copyProperties"),o(". Nếu tên field của DTO trùng với Entity, bạn "),e("strong",null,"KHÔNG CẦN"),o(" viết code mapping thủ công nữa. ")],-1))])]))}};export{x as default};
