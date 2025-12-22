import{_ as n}from"./CodeBlock-Bl3isb_5.js";import{r as a,c,o as m,b as e,e as r,d as o}from"./index-BCAyzHOy.js";const p={id:"dtos",class:"scroll-mt-20 mb-16"},u={id:"dto-request",class:"mb-10 scroll-mt-24"},g={id:"dto-response",class:"mb-10 scroll-mt-24"},y={id:"dto-i18n",class:"mb-10 scroll-mt-24"},f={__name:"UsageSection",setup(b){const i=a(`package com.example.demo.dto.req;

import com.example.demo.dto.req.spec.ProductRelationshipConsistencySpec;
import com.example.demo.entity.Product;
import com.natswarchuan.genericservice.dto.IDto;
import com.natswarchuan.genericservice.validation.DtoSpecValidation;
import com.natswarchuan.genericservice.validation.Exists;
import com.natswarchuan.genericservice.validation.NoSpecialChars;
import com.natswarchuan.genericservice.validation.Unique;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@DtoSpecValidation(loader = ProductRelationshipConsistencySpec.class, mustExist = true, message = "Model và danh mục phải thuộc thương hiệu được chọn")
public class ProductCreateReq implements IDto<Product> {
    @NotBlank(message = "Tên sản phẩm không được để trống")
    @Unique(entity = Product.class, message = "Tên sản phẩm đã tồn tại", field = "name")
    @NoSpecialChars(message = "Tên sản phẩm không được chứa ký tự đặc biệt")
    private String name;

    @Min(value = 0, message = "Giá sản phẩm phải lớn hơn 0")
    private Double price;

    private String description;

    @Exists(entity = com.example.demo.entity.Category.class, message = "Danh mục không tồn tại", field = "id")
    private Long categoryId;

    @Exists(entity = com.example.demo.entity.Brand.class, message = "Thương hiệu không tồn tại", field = "id")
    private Long brandId;

    @Exists(entity = com.example.demo.entity.Model.class, message = "Model không tồn tại", field = "id")
    private Long modelId;

    @Override
    public Product toEntity() {
        Product product = new Product();
        org.springframework.beans.BeanUtils.copyProperties(this, product);

        if (categoryId != null) {
            com.example.demo.entity.Category category = new com.example.demo.entity.Category();
            category.setId(categoryId);
            product.setCategory(category);
        }

        if (brandId != null) {
            com.example.demo.entity.Brand brand = new com.example.demo.entity.Brand();
            brand.setId(brandId);
            product.setBrand(brand);
        }

        if (modelId != null) {
            com.example.demo.entity.Model model = new com.example.demo.entity.Model();
            model.setId(modelId);
            product.setModel(model);
        }

        return product;
    }
}
`),s=a(`package com.example.demo.dto.req;

import com.example.demo.entity.Product;
import com.natswarchuan.genericservice.dto.IDto;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ProductUpdateReq implements IDto<Product> {
    private String name;
    private Double price;
    private String description;

    // KHÔNG cần override updateEntity nếu field name trùng khớp
    // IDto tự động dùng BeanUtils.copyProperties(this, entity)
}
`),l=a(`package com.example.demo.dto.res;

import org.springframework.beans.BeanUtils;

import com.example.demo.entity.Product;
import com.natswarchuan.genericservice.dto.IDto;

import jakarta.annotation.Nonnull;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ProductResponse implements IDto<Product> {
    private Long id;
    private String name;
    private Double price;
    private String description;

    private CategoryResponse category;
    private BrandResponse brand;
    private ModelResponse model;

    @Override
    @SuppressWarnings("null")
    public void fromEntity(@Nonnull Product entity) {
        BeanUtils.copyProperties(entity, this);

        if (entity.getCategory() != null) {
            CategoryResponse categoryRes = new CategoryResponse();
            categoryRes.fromEntity(entity.getCategory());
            this.category = categoryRes;
        }

        if (entity.getBrand() != null) {
            BrandResponse brandRes = new BrandResponse();
            brandRes.fromEntity(entity.getBrand());
            this.brand = brandRes;
        }

        if (entity.getModel() != null) {
            ModelResponse modelRes = new ModelResponse();
            modelRes.fromEntity(entity.getModel());
            this.model = modelRes;
        }
    }
}
`),d=a(`@Override
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
`);return(v,t)=>(m(),c("section",p,[t[7]||(t[7]=e("h2",{class:"text-3xl font-bold text-slate-900 border-b pb-4 mb-8"},"4. Data Transfer Objects",-1)),e("article",u,[t[0]||(t[0]=e("h3",{class:"text-xl font-bold text-slate-800 mb-3"},"4.1. Request DTO (Create/Update)",-1)),t[1]||(t[1]=e("p",{class:"text-slate-600 mb-3"},"Tách biệt DTO tạo mới và cập nhật để kiểm soát dữ liệu đầu vào.",-1)),r(n,{filename:"ProductCreateReq.java",code:i.value},null,8,["code"]),r(n,{filename:"ProductUpdateReq.java",code:s.value},null,8,["code"])]),e("article",g,[t[2]||(t[2]=e("h3",{class:"text-xl font-bold text-slate-800 mb-3"},"4.2. Response DTO (Auto Mapping)",-1)),t[3]||(t[3]=e("p",{class:"text-slate-600 mb-3"},"Dữ liệu trả về cho client. Hỗ trợ tự động map từ Entity sang DTO.",-1)),r(n,{filename:"ProductResponse.java",code:l.value},null,8,["code"]),t[4]||(t[4]=e("div",{class:"bg-blue-50 border-l-4 border-blue-500 p-4 mb-4 mt-4 text-sm text-blue-800 shadow-sm"},[e("strong",null,"Tips:"),o(),e("code",null,"IDto"),o(" mặc định sử dụng "),e("code",null,"BeanUtils.copyProperties"),o(". Nếu tên field của DTO trùng với Entity, bạn "),e("strong",null,"KHÔNG CẦN"),o(" viết code mapping thủ công nữa. ")],-1))]),e("article",y,[t[5]||(t[5]=e("h3",{class:"text-xl font-bold text-slate-800 mb-3"},"4.3. Multi-language Support (I18n)",-1)),t[6]||(t[6]=e("p",{class:"text-slate-600 mb-3"},[o(" Framework hỗ trợ đa ngôn ngữ ngay khi chuyển đổi DTO. Bạn có thể override hàm "),e("code",null,"fromEntity"),o(" có tham số "),e("code",null,"language"),o(". ")],-1)),r(n,{filename:"ProductResponse.java",code:d.value},null,8,["code"])])]))}};export{f as default};
