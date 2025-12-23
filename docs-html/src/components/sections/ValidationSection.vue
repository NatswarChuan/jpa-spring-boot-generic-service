<template>
  <section id="validation" class="scroll-mt-20 mb-16">
    <h2 class="text-3xl font-bold text-slate-900 border-b pb-4 mb-8">9. Hệ thống Validation</h2>
    <p class="text-slate-600 mb-8 italic">Hệ thống kiểm tra dữ liệu đầu vào mạnh mẽ, tích hợp sẵn với Spring Validation. Đảm bảo dữ liệu sạch trước khi vào Business Logic.</p>

    <!-- Validation Strategy Visual -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <!-- Level 1 -->
        <div class="bg-white rounded-xl border border-slate-200 p-5 shadow-sm relative overlow-hidden">
            <div class="absolute top-0 right-0 p-3 opacity-10">
                <i class="fas fa-font text-4xl"></i>
            </div>
            <h4 class="text-slate-800 font-bold mb-2">Basic Constraints</h4>
            <span class="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-xs font-mono mb-3 inline-block">@Annotation</span>
            <p class="text-xs text-slate-500 mb-4 h-8">Kiểm tra định dạng, độ dài, null...</p>
            <ul class="text-xs text-slate-600 space-y-1">
                 <li>• @NotBlank, @Size</li>
                 <li>• @Email, @Pattern</li>
                 <li>• <strong>@Exists, @Unique</strong> (Custom)</li>
            </ul>
        </div>
        
         <!-- Level 2 -->
        <div class="bg-white rounded-xl border border-blue-200 p-5 shadow-sm relative overlow-hidden ring-1 ring-blue-100">
             <div class="absolute top-0 right-0 p-3 opacity-10">
                <i class="fas fa-code-branch text-4xl text-blue-600"></i>
            </div>
            <h4 class="text-blue-800 font-bold mb-2">Business Logic</h4>
             <span class="bg-blue-100 text-blue-600 px-2 py-0.5 rounded text-xs font-mono mb-3 inline-block">Specification</span>
            <p class="text-xs text-slate-500 mb-4 h-8">Validation phức tạp phụ thuộc nhiều trường.</p>
             <ul class="text-xs text-slate-600 space-y-1">
                 <li>• <strong>@DtoSpecValidation</strong></li>
                 <li>• Tra cứu DB linh hoạt</li>
                 <li>• Logic nghiệp vụ custom</li>
            </ul>
        </div>

          <!-- Level 3 -->
        <div class="bg-white rounded-xl border border-slate-200 p-5 shadow-sm relative overlow-hidden">
             <div class="absolute top-0 right-0 p-3 opacity-10">
                <i class="fas fa-database text-4xl text-amber-600"></i>
            </div>
            <h4 class="text-slate-800 font-bold mb-2">Database Check</h4>
            <span class="bg-amber-100 text-amber-600 px-2 py-0.5 rounded text-xs font-mono mb-3 inline-block">Native SQL</span>
            <p class="text-xs text-slate-500 mb-4 h-8">Ràng buộc chặt chẽ mức Database.</p>
             <ul class="text-xs text-slate-600 space-y-1">
                 <li>• <strong>@SqlConstraint</strong></li>
                 <li>• Complex Joins / Aggregates</li>
                 <li>• High Performance</li>
            </ul>
        </div>
    </div>

    <!-- 7.1 Basic Constraints -->
    <article id="val-basic" class="mb-10 scroll-mt-24">
      <h3 class="text-xl font-bold text-slate-800 mb-3">
        <span class="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm mr-3">9.1</span>
        Ràng buộc Cơ bản
      </h3>
      <p class="text-slate-600 mb-4">Các annotation kiểm tra định dạng hoặc ràng buộc đơn giản.</p>
      
      <div class="space-y-6">
        <div>
          <h4 class="font-semibold text-slate-700">@Exists & @Unique</h4>
          <p class="text-sm text-slate-600 mb-2">Kiểm tra sự tồn tại của dữ liệu trong Database.</p>
          <CodeBlock filename="CategoryRequest.java" :code="existsUniqueCode" />
        </div>

        <div>
          <h4 class="font-semibold text-slate-700">@EnumValue</h4>
          <p class="text-sm text-slate-600 mb-2">Kiểm tra giá trị String/Int có nằm trong tập hằng số của Enum hay không.</p>
          <CodeBlock filename="UserRequest.java" :code="enumValCode" />
        </div>

        <div>
          <h4 class="font-semibold text-slate-700">@PhoneNumber & @NoSpecialChars</h4>
          <p class="text-sm text-slate-600 mb-2">Validation số điện thoại và ký tự đặc biệt.</p>
          <CodeBlock filename="ProfileRequest.java" :code="formatCode" />
        </div>

        <div>
          <h4 class="font-semibold text-slate-700">@IdsExist</h4>
          <p class="text-sm text-slate-600 mb-2">Kiểm tra danh sách (Set, List) các ID có tồn tại trong Database hay không.</p>
          <CodeBlock filename="ProductRequest.java" :code="idsExistCode" />
        </div>
      </div>
    </article>

    <!-- 7.2 Custom Validators -->
    <article id="val-custom" class="mb-10 scroll-mt-24">
      <h3 class="text-xl font-bold text-slate-800 mb-3">
        <span class="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm mr-3">9.2</span>
        Validator Tùy chỉnh
      </h3>
      <p class="text-slate-600 mb-4">Sử dụng <strong>Specification</strong> để thực hiện các validation phức tạp.</p>

      <h4 class="font-semibold text-slate-700 mt-4">@SpecValidation (Field Level)</h4>
      <p class="text-sm text-slate-600 mb-2">Validate trên một trường cụ thể.</p>
      <CodeBlock filename="ProductDto.java" :code="specValCode" />

      <h4 class="font-semibold text-slate-700 mt-6">@DtoSpecValidation (Class Level)</h4>
      <p class="text-sm text-slate-600 mb-2">Khi logic validation phụ thuộc vào <strong>nhiều trường</strong>. Ví dụ: Validate Model và Category phải thuộc về Brand đã chọn.</p>
      <CodeBlock filename="ProductCreateReq.java" :code="dtoSpecCode" />
      
      <p class="text-sm text-slate-600 mt-4 mb-2">Implement Loader:</p>
      <CodeBlock filename="ProductUniqueSpec.java" :code="loaderImplCode" />
    </article>

    <!-- 7.3 Advanced Validators -->
    <article id="val-advanced" class="mb-10 scroll-mt-24">
      <h3 class="text-xl font-bold text-slate-800 mb-3">
        <span class="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm mr-3">9.3</span>
        Ràng buộc SQL Tự nhiên
      </h3>
      <p class="text-slate-600 mb-4">Sử dụng <strong>Native SQL</strong> để viết các ràng buộc kiểm tra dữ liệu trực tiếp dưới DB.</p>

      <h4 class="font-semibold text-slate-700 mt-4">@SqlConstraint</h4>
      <p class="text-sm text-slate-600 mb-2">Validate logic phức tạp bằng SQL. Hỗ trợ bind biến từ Request Path, Params, hoặc Fields trong DTO.</p>
      <CodeBlock filename="BrandUpdateReq.java" :code="sqlConstraintCode" />
    </article>

  </section>
</template>

<script setup>
import { ref } from 'vue';
import CodeBlock from '../CodeBlock.vue';

const existsUniqueCode = ref(`package com.example.demo.dto;

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
`);

const enumValCode = ref(`package com.example.demo.dto;

import com.natswarchuan.genericservice.validation.EnumValue;
import lombok.Data;

public enum UserStatus { ACTIVE, INACTIVE, BANNED }

@Data
public class UserRequest {
    // Giá trị phải là "ACTIVE", "INACTIVE" hoặc "BANNED"
    @EnumValue(enumClass = UserStatus.class, message = "Trạng thái không hợp lệ")
    private String status;
}
`);

const formatCode = ref(`package com.example.demo.dto;

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
`);

const idsExistCode = ref(`package com.example.demo.dto;

import com.example.demo.domain.Category;
import com.natswarchuan.genericservice.validation.IdsExist;
import lombok.Data;
import java.util.Set;

@Data
public class ProductRequest {
    @IdsExist(entity = Category.class, message = "Danh mục không tồn tại")
    private Set<Long> categoryIds;
}
`);

const specValCode = ref(`package com.example.demo.dto.product;

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
`);

const dtoSpecCode = ref(`package com.example.demo.dto.product;

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
`);

const loaderImplCode = ref(`package com.example.demo.validation.specs;

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
`);

const sqlConstraintCode = ref(`package com.example.demo.dto.brand;

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
`);
</script>
