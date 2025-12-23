<template>
  <section id="validation" class="scroll-mt-20 mb-16">
    <h2 class="text-3xl font-bold text-slate-900 border-b pb-4 mb-8">10. Validation System</h2>
    <p class="text-slate-600 mb-6 italic">Hệ thống kiểm tra dữ liệu đầu vào mạnh mẽ, tích hợp sẵn với Spring Validation.</p>

    <!-- 7.1 Basic Constraints -->
    <article id="val-basic" class="mb-10 scroll-mt-24">
      <h3 class="text-xl font-bold text-slate-800 mb-3">10.1. Basic Constraints</h3>
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
      <h3 class="text-xl font-bold text-slate-800 mb-3">10.2. Custom Validators</h3>
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
      <h3 class="text-xl font-bold text-slate-800 mb-3">10.3. Native SQL Constraint</h3>
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
