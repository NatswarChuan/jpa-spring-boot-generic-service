import{_ as a}from"./CodeBlock-BkvZVepJ.js";import{r as o,c as g,o as v,b as e,d as i,e as s}from"./index-BT1pOG7q.js";const b={id:"validation",class:"scroll-mt-20 mb-16"},x={id:"val-basic",class:"mb-10 scroll-mt-24"},S={class:"space-y-6"},h={id:"val-custom",class:"mb-10 scroll-mt-24"},C={id:"val-advanced",class:"mb-10 scroll-mt-24"},k={__name:"ValidationSection",setup(f){const n=o(`package com.example.demo.dto;

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
`),l=o(`package com.example.demo.dto;

import com.natswarchuan.genericservice.validation.EnumValue;
import lombok.Data;

public enum UserStatus { ACTIVE, INACTIVE, BANNED }

@Data
public class UserRequest {
    // Giá trị phải là "ACTIVE", "INACTIVE" hoặc "BANNED"
    @EnumValue(enumClass = UserStatus.class, message = "Trạng thái không hợp lệ")
    private String status;
}
`),r=o(`package com.example.demo.dto;

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
`),m=o(`package com.example.demo.dto;

import com.example.demo.domain.Category;
import com.natswarchuan.genericservice.validation.IdsExist;
import lombok.Data;
import java.util.Set;

@Data
public class ProductRequest {
    @IdsExist(entity = Category.class, message = "Danh mục không tồn tại")
    private Set<Long> categoryIds;
}
`),d=o(`package com.example.demo.dto.product;

import com.example.demo.domain.Category;
import com.example.demo.validation.specs.IdsInSpecLoader;
import com.natswarchuan.genericservice.validation.SpecValidation;
import lombok.Data;
import java.util.Set;

@Data
public class ProductCreateReq {
    // Validate danh sách ID có tồn tại trong DB không (dùng IN clause)
    @SpecValidation(
        entity = Category.class, 
        loader = IdsInSpecLoader.class, 
        message = "Một hoặc nhiều danh mục không tồn tại"
    )
    private Set<Long> categoryIds;
}
`),c=o(`package com.example.demo.dto.product;

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
`),p=o(`package com.example.demo.validation.specs;

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
        // Check duplicate: Same Name AND Same Store
        return (root, query, cb) -> cb.and(
                cb.equal(root.get("name"), req.getName()),
                cb.equal(root.get("store").get("id"), req.getStoreId()));
    }
}
`),u=o(`package com.example.demo.dto.brand;

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
`);return(q,t)=>(v(),g("section",b,[t[21]||(t[21]=e("h2",{class:"text-3xl font-bold text-slate-900 border-b pb-4 mb-8"},"10. Validation System",-1)),t[22]||(t[22]=e("p",{class:"text-slate-600 mb-6 italic"},"Hệ thống kiểm tra dữ liệu đầu vào mạnh mẽ, tích hợp sẵn với Spring Validation.",-1)),e("article",x,[t[8]||(t[8]=e("h3",{class:"text-xl font-bold text-slate-800 mb-3"},"10.1. Basic Constraints",-1)),t[9]||(t[9]=e("p",{class:"text-slate-600 mb-4"},"Các annotation kiểm tra định dạng hoặc ràng buộc đơn giản.",-1)),e("div",S,[e("div",null,[t[0]||(t[0]=e("h4",{class:"font-semibold text-slate-700"},"@Exists & @Unique",-1)),t[1]||(t[1]=e("p",{class:"text-sm text-slate-600 mb-2"},"Kiểm tra sự tồn tại của dữ liệu trong Database.",-1)),i(a,{filename:"CategoryRequest.java",code:n.value},null,8,["code"])]),e("div",null,[t[2]||(t[2]=e("h4",{class:"font-semibold text-slate-700"},"@EnumValue",-1)),t[3]||(t[3]=e("p",{class:"text-sm text-slate-600 mb-2"},"Kiểm tra giá trị String/Int có nằm trong tập hằng số của Enum hay không.",-1)),i(a,{filename:"UserRequest.java",code:l.value},null,8,["code"])]),e("div",null,[t[4]||(t[4]=e("h4",{class:"font-semibold text-slate-700"},"@PhoneNumber & @NoSpecialChars",-1)),t[5]||(t[5]=e("p",{class:"text-sm text-slate-600 mb-2"},"Validation số điện thoại và ký tự đặc biệt.",-1)),i(a,{filename:"ProfileRequest.java",code:r.value},null,8,["code"])]),e("div",null,[t[6]||(t[6]=e("h4",{class:"font-semibold text-slate-700"},"@IdsExist",-1)),t[7]||(t[7]=e("p",{class:"text-sm text-slate-600 mb-2"},"Kiểm tra danh sách (Set, List) các ID có tồn tại trong Database hay không.",-1)),i(a,{filename:"ProductRequest.java",code:m.value},null,8,["code"])])])]),e("article",h,[t[10]||(t[10]=e("h3",{class:"text-xl font-bold text-slate-800 mb-3"},"10.2. Custom Validators",-1)),t[11]||(t[11]=e("p",{class:"text-slate-600 mb-4"},[s("Sử dụng "),e("strong",null,"Specification"),s(" để thực hiện các validation phức tạp.")],-1)),t[12]||(t[12]=e("h4",{class:"font-semibold text-slate-700 mt-4"},"@SpecValidation (Field Level)",-1)),t[13]||(t[13]=e("p",{class:"text-sm text-slate-600 mb-2"},"Validate trên một trường cụ thể.",-1)),i(a,{filename:"ProductDto.java",code:d.value},null,8,["code"]),t[14]||(t[14]=e("h4",{class:"font-semibold text-slate-700 mt-6"},"@DtoSpecValidation (Class Level)",-1)),t[15]||(t[15]=e("p",{class:"text-sm text-slate-600 mb-2"},[s("Khi logic validation phụ thuộc vào "),e("strong",null,"nhiều trường"),s(". Ví dụ: Validate Model và Category phải thuộc về Brand đã chọn.")],-1)),i(a,{filename:"ProductCreateReq.java",code:c.value},null,8,["code"]),t[16]||(t[16]=e("p",{class:"text-sm text-slate-600 mt-4 mb-2"},"Implement Loader:",-1)),i(a,{filename:"ProductUniqueSpec.java",code:p.value},null,8,["code"])]),e("article",C,[t[17]||(t[17]=e("h3",{class:"text-xl font-bold text-slate-800 mb-3"},"10.3. Native SQL Constraint",-1)),t[18]||(t[18]=e("p",{class:"text-slate-600 mb-4"},[s("Sử dụng "),e("strong",null,"Native SQL"),s(" để viết các ràng buộc kiểm tra dữ liệu trực tiếp dưới DB.")],-1)),t[19]||(t[19]=e("h4",{class:"font-semibold text-slate-700 mt-4"},"@SqlConstraint",-1)),t[20]||(t[20]=e("p",{class:"text-sm text-slate-600 mb-2"},"Validate logic phức tạp bằng SQL. Hỗ trợ bind biến từ Request Path, Params, hoặc Fields trong DTO.",-1)),i(a,{filename:"BrandUpdateReq.java",code:u.value},null,8,["code"])])]))}};export{k as default};
