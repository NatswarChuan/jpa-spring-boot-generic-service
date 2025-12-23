import{_ as a}from"./CodeBlock-BQU6-ZC9.js";import{r as i,c as d,o as m,b as e,d as r,e as o}from"./index-D9vsZoXm.js";const p={id:"dtos",class:"scroll-mt-20 mb-16"},u={id:"dto-request",class:"mb-10 scroll-mt-24"},g={id:"dto-response",class:"mb-10 scroll-mt-24"},v={id:"dto-i18n",class:"mb-10 scroll-mt-24"},h={__name:"UsageSection",setup(b){const s=i(`package com.example.demo.dto.product;

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

    /**
     * Chuyển đổi sang Entity.
     * <p>
     * - Sử dụng BeanUtils.copyProperties cho các field đơn giản.
     * - Xử lý thủ công cho categoryIds (Set<Long> -> Set<Category>).
     */
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
`),n=i(`package com.example.demo.dto.product;

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
        // Tận dụng default method để copy fields cơ bản
        IDto.super.updateEntity(entity);
        
        // Cập nhật quan hệ Many-to-Many an toàn
        if (this.categoryIds != null) {
            Set<Category> categories = this.categoryIds.stream()
                    .map(id -> Category.builder().id(id).build())
                    .collect(Collectors.toSet());
            entity.setCategories(categories); // Trigger clear() + addAll()
        }
        return entity;
    }
}
`),l=i(`package com.example.demo.dto.product;

import java.math.BigDecimal;
import com.example.demo.domain.Product;
import com.natswarchuan.genericservice.dto.IDto;
import lombok.Data;

@Data
public class ProductRes implements IDto<Product> {
    private Long id;
    private String name;
    private BigDecimal price;

    // IDto tự động hỗ trợ mapping từ Entity -> DTO thông qua BeanUtils
    // nếu tên field trùng khớp (ví dụ: name, price).
}
`),c=i(`// Ví dụ override nếu muốn support đa ngôn ngữ
@Override
public void fromEntity(Product entity, String language) {
    IDto.super.fromEntity(entity, language);
    // Logic custom cho từng ngôn ngữ
}
`);return(y,t)=>(m(),d("section",p,[t[7]||(t[7]=e("h2",{class:"text-3xl font-bold text-slate-900 border-b pb-4 mb-8"},"7. Data Transfer Objects",-1)),t[8]||(t[8]=e("p",{class:"text-slate-600 italic mb-6"},"Sử dụng DTO để tách biệt Model của Database và Model của API.",-1)),e("article",u,[t[0]||(t[0]=e("h3",{class:"text-xl font-bold text-slate-800 mb-3"},"7.1. Request DTO (Create/Update)",-1)),t[1]||(t[1]=e("p",{class:"text-slate-600 mb-3"},"Tách biệt DTO tạo mới và cập nhật để kiểm soát dữ liệu đầu vào.",-1)),r(a,{filename:"ProductCreateReq.java",code:s.value},null,8,["code"]),r(a,{filename:"ProductUpdateReq.java",code:n.value},null,8,["code"])]),e("article",g,[t[2]||(t[2]=e("h3",{class:"text-xl font-bold text-slate-800 mb-3"},"7.2. Response DTO (Auto Mapping)",-1)),t[3]||(t[3]=e("p",{class:"text-slate-600 mb-3"},"Dữ liệu trả về cho client. Hỗ trợ tự động map từ Entity sang DTO.",-1)),r(a,{filename:"ProductResponse.java",code:l.value},null,8,["code"]),t[4]||(t[4]=e("div",{class:"bg-blue-50 border-l-4 border-blue-500 p-4 mb-4 mt-4 text-sm text-blue-800 shadow-sm"},[e("strong",null,"Tips:"),o(),e("code",null,"IDto"),o(" mặc định sử dụng "),e("code",null,"BeanUtils.copyProperties"),o(". Nếu tên field của DTO trùng với Entity, bạn "),e("strong",null,"KHÔNG CẦN"),o(" viết code mapping thủ công nữa. ")],-1))]),e("article",v,[t[5]||(t[5]=e("h3",{class:"text-xl font-bold text-slate-800 mb-3"},"7.3. Multi-language Support (I18n)",-1)),t[6]||(t[6]=e("p",{class:"text-slate-600 mb-3"},[o(" Framework hỗ trợ đa ngôn ngữ ngay khi chuyển đổi DTO. Bạn có thể override hàm "),e("code",null,"fromEntity"),o(" có tham số "),e("code",null,"language"),o(". ")],-1)),r(a,{filename:"ProductResponse.java",code:c.value},null,8,["code"])])]))}};export{h as default};
