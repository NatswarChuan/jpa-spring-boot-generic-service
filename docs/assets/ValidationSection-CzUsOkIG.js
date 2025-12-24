import{_ as a}from"./CodeBlock-CUrVyKBF.js";import{f as o,c as b,o as x,a as i,b as e,d as l,e as s}from"./index-ByupLFOq.js";const h={id:"validation",class:"scroll-mt-20 mb-16"},v={id:"val-basic",class:"mb-10 scroll-mt-24"},S={class:"space-y-6"},f={id:"val-custom",class:"mb-10 scroll-mt-24"},C={id:"val-advanced",class:"mb-10 scroll-mt-24"},E={__name:"ValidationSection",setup(D){const n=o(`package com.example.demo.dto;

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
`),c=o(`package com.example.demo.dto;

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
`),d=o(`package com.example.demo.dto;

import com.example.demo.domain.Category;
import com.natswarchuan.genericservice.validation.IdsExist;
import lombok.Data;
import java.util.Set;

@Data
public class ProductRequest {
    @IdsExist(entity = Category.class, message = "Danh mục không tồn tại")
    private Set<Long> categoryIds;
}
`),m=o(`package com.example.demo.dto.product;

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
`),p=o(`package com.example.demo.dto.product;

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
`),u=o(`package com.example.demo.validation.specs;

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
`),g=o(`package com.example.demo.dto.brand;

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
`);return(k,t)=>(x(),b("section",h,[t[15]||(t[15]=i('<h2 class="text-3xl font-bold text-slate-900 border-b pb-4 mb-8">9. Hệ thống Validation</h2><p class="text-slate-600 mb-8 italic">Hệ thống kiểm tra dữ liệu đầu vào mạnh mẽ, tích hợp sẵn với Spring Validation. Đảm bảo dữ liệu sạch trước khi vào Business Logic.</p><div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"><div class="bg-white rounded-xl border border-slate-200 p-5 shadow-sm relative overlow-hidden"><div class="absolute top-0 right-0 p-3 opacity-10"><i class="fas fa-font text-4xl"></i></div><h4 class="text-slate-800 font-bold mb-2">Basic Constraints</h4><span class="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-xs font-mono mb-3 inline-block">@Annotation</span><p class="text-xs text-slate-500 mb-4 h-8">Kiểm tra định dạng, độ dài, null...</p><ul class="text-xs text-slate-600 space-y-1"><li>• @NotBlank, @Size</li><li>• @Email, @Pattern</li><li>• <strong>@Exists, @Unique</strong> (Custom)</li></ul></div><div class="bg-white rounded-xl border border-blue-200 p-5 shadow-sm relative overlow-hidden ring-1 ring-blue-100"><div class="absolute top-0 right-0 p-3 opacity-10"><i class="fas fa-code-branch text-4xl text-blue-600"></i></div><h4 class="text-blue-800 font-bold mb-2">Business Logic</h4><span class="bg-blue-100 text-blue-600 px-2 py-0.5 rounded text-xs font-mono mb-3 inline-block">Specification</span><p class="text-xs text-slate-500 mb-4 h-8">Validation phức tạp phụ thuộc nhiều trường.</p><ul class="text-xs text-slate-600 space-y-1"><li>• <strong>@DtoSpecValidation</strong></li><li>• Tra cứu DB linh hoạt</li><li>• Logic nghiệp vụ custom</li></ul></div><div class="bg-white rounded-xl border border-slate-200 p-5 shadow-sm relative overlow-hidden"><div class="absolute top-0 right-0 p-3 opacity-10"><i class="fas fa-database text-4xl text-amber-600"></i></div><h4 class="text-slate-800 font-bold mb-2">Database Check</h4><span class="bg-amber-100 text-amber-600 px-2 py-0.5 rounded text-xs font-mono mb-3 inline-block">Native SQL</span><p class="text-xs text-slate-500 mb-4 h-8">Ràng buộc chặt chẽ mức Database.</p><ul class="text-xs text-slate-600 space-y-1"><li>• <strong>@SqlConstraint</strong></li><li>• Complex Joins / Aggregates</li><li>• High Performance</li></ul></div></div>',3)),e("article",v,[t[8]||(t[8]=e("h3",{class:"text-xl font-bold text-slate-800 mb-3"},[e("span",{class:"bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm mr-3"},"9.1"),l(" Ràng buộc Cơ bản ")],-1)),t[9]||(t[9]=e("p",{class:"text-slate-600 mb-4"},"Các annotation kiểm tra định dạng hoặc ràng buộc đơn giản.",-1)),e("div",S,[e("div",null,[t[0]||(t[0]=e("h4",{class:"font-semibold text-slate-700"},"@Exists & @Unique",-1)),t[1]||(t[1]=e("p",{class:"text-sm text-slate-600 mb-2"},"Kiểm tra sự tồn tại của dữ liệu trong Database.",-1)),s(a,{filename:"CategoryRequest.java",code:n.value},null,8,["code"])]),e("div",null,[t[2]||(t[2]=e("h4",{class:"font-semibold text-slate-700"},"@EnumValue",-1)),t[3]||(t[3]=e("p",{class:"text-sm text-slate-600 mb-2"},"Kiểm tra giá trị String/Int có nằm trong tập hằng số của Enum hay không.",-1)),s(a,{filename:"UserRequest.java",code:r.value},null,8,["code"])]),e("div",null,[t[4]||(t[4]=e("h4",{class:"font-semibold text-slate-700"},"@PhoneNumber & @NoSpecialChars",-1)),t[5]||(t[5]=e("p",{class:"text-sm text-slate-600 mb-2"},"Validation số điện thoại và ký tự đặc biệt.",-1)),s(a,{filename:"ProfileRequest.java",code:c.value},null,8,["code"])]),e("div",null,[t[6]||(t[6]=e("h4",{class:"font-semibold text-slate-700"},"@IdsExist",-1)),t[7]||(t[7]=e("p",{class:"text-sm text-slate-600 mb-2"},"Kiểm tra danh sách (Set, List) các ID có tồn tại trong Database hay không.",-1)),s(a,{filename:"ProductRequest.java",code:d.value},null,8,["code"])])])]),e("article",f,[t[10]||(t[10]=i('<h3 class="text-xl font-bold text-slate-800 mb-3"><span class="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm mr-3">9.2</span> Validator Tùy chỉnh </h3><p class="text-slate-600 mb-4">Sử dụng <strong>Specification</strong> để thực hiện các validation phức tạp.</p><h4 class="font-semibold text-slate-700 mt-4">@SpecValidation (Field Level)</h4><p class="text-sm text-slate-600 mb-2">Validate trên một trường cụ thể.</p>',4)),s(a,{filename:"ProductDto.java",code:m.value},null,8,["code"]),t[11]||(t[11]=e("h4",{class:"font-semibold text-slate-700 mt-6"},"@DtoSpecValidation (Class Level)",-1)),t[12]||(t[12]=e("p",{class:"text-sm text-slate-600 mb-2"},[l("Khi logic validation phụ thuộc vào "),e("strong",null,"nhiều trường"),l(". Ví dụ: Validate Model và Category phải thuộc về Brand đã chọn.")],-1)),s(a,{filename:"ProductCreateReq.java",code:p.value},null,8,["code"]),t[13]||(t[13]=e("p",{class:"text-sm text-slate-600 mt-4 mb-2"},"Implement Loader:",-1)),s(a,{filename:"ProductUniqueSpec.java",code:u.value},null,8,["code"])]),e("article",C,[t[14]||(t[14]=i('<h3 class="text-xl font-bold text-slate-800 mb-3"><span class="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm mr-3">9.3</span> Ràng buộc SQL Tự nhiên </h3><p class="text-slate-600 mb-4">Sử dụng <strong>Native SQL</strong> để viết các ràng buộc kiểm tra dữ liệu trực tiếp dưới DB.</p><h4 class="font-semibold text-slate-700 mt-4">@SqlConstraint</h4><p class="text-sm text-slate-600 mb-2">Validate logic phức tạp bằng SQL. Hỗ trợ bind biến từ Request Path, Params, hoặc Fields trong DTO.</p>',4)),s(a,{filename:"BrandUpdateReq.java",code:g.value},null,8,["code"])])]))}};export{E as default};
