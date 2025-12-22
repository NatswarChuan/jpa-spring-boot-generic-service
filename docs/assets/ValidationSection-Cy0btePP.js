import{_ as a}from"./CodeBlock-Bl3isb_5.js";import{r as o,c as p,o as u,b as e,e as i,d as n}from"./index-BCAyzHOy.js";const g={id:"validation",class:"scroll-mt-20 mb-16"},b={id:"val-basic",class:"mb-10 scroll-mt-24"},v={class:"space-y-6"},h={id:"val-custom",class:"mb-10 scroll-mt-24"},S={__name:"ValidationSection",setup(x){const s=o(`package com.example.demo.dto;

import com.example.demo.entity.Category;
import com.natswarchuan.genericservice.validation.Exists;
import com.natswarchuan.genericservice.validation.Unique;
import lombok.Data;

@Data
public class CategoryRequest {
    // ID danh mục cha phải TỒN TẠI trong bảng categories
    @Exists(entity = Category.class, message = "Danh mục cha không tồn tại")
    private Long parentId;

    // Tên danh mục phải là DUY NHẤT
    @Unique(entity = Category.class, field = "name", message = "Tên danh mục đã được sử dụng")
    private String name;
}
`),r=o(`package com.example.demo.dto;

import com.natswarchuan.genericservice.validation.EnumValue;
import lombok.Data;

public enum UserStatus { ACTIVE, INACTIVE, BANNED }

@Data
public class UserRequest {
    // Giá trị phải là "ACTIVE", "INACTIVE" hoặc "BANNED"
    @EnumValue(enumClass = UserStatus.class, message = "Trạng thái không hợp lệ")
    private String status;
}
`),l=o(`package com.example.demo.dto;

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
`),c=o(`package com.example.demo.dto;

import com.example.demo.entity.Department;
import com.example.demo.specification.ActiveDepartmentSpecLoader;
import com.natswarchuan.genericservice.validation.SpecValidation;
import lombok.Data;

@Data
public class ProductDto {
    // Kiểm tra departmentId phải thuộc về một Company đang Active
    @SpecValidation(
        entity = Department.class, 
        loader = ActiveDepartmentSpecLoader.class, 
        message = "Phòng ban không hợp lệ hoặc không hoạt động"
    )
    private Long departmentId;
}
`),d=o(`package com.example.demo.dto.req;

import com.example.demo.dto.req.spec.ProductRelationshipConsistencySpec;
import com.example.demo.entity.Product;
import com.natswarchuan.genericservice.dto.IDto;
import com.natswarchuan.genericservice.validation.DtoSpecValidation;
import lombok.Data;

@Data
@DtoSpecValidation(
    loader = ProductRelationshipConsistencySpec.class, 
    mustExist = true, 
    message = "Model và danh mục phải thuộc thương hiệu được chọn"
)
public class ProductCreateReq implements IDto<Product> {
    private Long categoryId;
    private Long brandId;
    private Long modelId;
    // ... other fields
}
`),m=o(`package com.example.demo.dto.req.spec;

import com.example.demo.dto.req.ProductCreateReq;
import com.example.demo.entity.Product;
import com.natswarchuan.genericservice.validation.SpecificationLoader;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;
import java.util.ArrayList;
import java.util.List;

@Component
public class ProductRelationshipConsistencySpec implements SpecificationLoader<Object, Product> {

    @Override
    public Specification<Product> getSpecification(Object... args) {
        // args[0] = ProductCreateReq dto
        ProductCreateReq dto = (ProductCreateReq) args[0];

        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            // Validate model belongs to brand if both are specified
            if (dto.getBrandId() != null && dto.getModelId() != null) {
                var modelJoin = root.join("model");
                var modelBrandJoin = modelJoin.join("brand");
                predicates.add(cb.equal(modelBrandJoin.get("id"), dto.getBrandId()));
            }

            // Validate category belongs to brand if both are specified
            if (dto.getBrandId() != null && dto.getCategoryId() != null) {
                var categoryJoin = root.join("category");
                var categoryBrandJoin = categoryJoin.join("brand");
                predicates.add(cb.equal(categoryBrandJoin.get("id"), dto.getBrandId()));
            }

            return predicates.isEmpty() ? cb.conjunction() : cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}
`);return(f,t)=>(u(),p("section",g,[t[15]||(t[15]=e("h2",{class:"text-3xl font-bold text-slate-900 border-b pb-4 mb-8"},"7. Validation System",-1)),t[16]||(t[16]=e("p",{class:"text-slate-600 mb-6"},"Thư viện cung cấp bộ Annotation mạnh mẽ, tích hợp sẵn với Hibernate Validator và Spring Data JPA.",-1)),e("article",b,[t[6]||(t[6]=e("h3",{class:"text-xl font-bold text-slate-800 mb-3"},"7.1. Basic Constraints",-1)),t[7]||(t[7]=e("p",{class:"text-slate-600 mb-4"},"Các annotation kiểm tra định dạng hoặc ràng buộc đơn giản.",-1)),e("div",v,[e("div",null,[t[0]||(t[0]=e("h4",{class:"font-semibold text-slate-700"},"@Exists & @Unique",-1)),t[1]||(t[1]=e("p",{class:"text-sm text-slate-600 mb-2"},"Kiểm tra sự tồn tại của dữ liệu trong Database.",-1)),i(a,{filename:"CategoryRequest.java",code:s.value},null,8,["code"])]),e("div",null,[t[2]||(t[2]=e("h4",{class:"font-semibold text-slate-700"},"@EnumValue",-1)),t[3]||(t[3]=e("p",{class:"text-sm text-slate-600 mb-2"},"Kiểm tra giá trị String/Int có nằm trong tập hằng số của Enum hay không.",-1)),i(a,{filename:"UserRequest.java",code:r.value},null,8,["code"])]),e("div",null,[t[4]||(t[4]=e("h4",{class:"font-semibold text-slate-700"},"@PhoneNumber & @NoSpecialChars",-1)),t[5]||(t[5]=e("p",{class:"text-sm text-slate-600 mb-2"},"Validation số điện thoại và ký tự đặc biệt.",-1)),i(a,{filename:"ProfileRequest.java",code:l.value},null,8,["code"])])])]),e("article",h,[t[8]||(t[8]=e("h3",{class:"text-xl font-bold text-slate-800 mb-3"},"7.2. Custom Validators (Specification)",-1)),t[9]||(t[9]=e("p",{class:"text-slate-600 mb-4"},[n("Sử dụng "),e("strong",null,"Specification"),n(" để thực hiện các validation phức tạp.")],-1)),t[10]||(t[10]=e("h4",{class:"font-semibold text-slate-700 mt-4"},"@SpecValidation (Field Level)",-1)),t[11]||(t[11]=e("p",{class:"text-sm text-slate-600 mb-2"},"Validate trên một trường cụ thể.",-1)),i(a,{filename:"ProductDto.java",code:c.value},null,8,["code"]),t[12]||(t[12]=e("h4",{class:"font-semibold text-slate-700 mt-6"},"@DtoSpecValidation (Class Level)",-1)),t[13]||(t[13]=e("p",{class:"text-sm text-slate-600 mb-2"},[n("Khi logic validation phụ thuộc vào "),e("strong",null,"nhiều trường"),n(". Ví dụ: Validate Model và Category phải thuộc về Brand đã chọn.")],-1)),i(a,{filename:"ProductCreateReq.java",code:d.value},null,8,["code"]),t[14]||(t[14]=e("p",{class:"text-sm text-slate-600 mt-4 mb-2"},"Implement Loader:",-1)),i(a,{filename:"ProductRelationshipConsistencySpec.java",code:m.value},null,8,["code"])])]))}};export{S as default};
