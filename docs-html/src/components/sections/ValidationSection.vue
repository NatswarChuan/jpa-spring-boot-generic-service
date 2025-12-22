<template>
  <section id="validation" class="scroll-mt-20 mb-16">
    <h2 class="text-3xl font-bold text-slate-900 border-b pb-4 mb-8">7. Validation System</h2>
    <p class="text-slate-600 mb-6">Thư viện cung cấp bộ Annotation mạnh mẽ, tích hợp sẵn với Hibernate Validator và Spring Data JPA.</p>

    <!-- 7.1 Basic Constraints -->
    <article id="val-basic" class="mb-10 scroll-mt-24">
      <h3 class="text-xl font-bold text-slate-800 mb-3">7.1. Basic Constraints</h3>
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
      </div>
    </article>

    <!-- 7.2 Custom Validators -->
    <article id="val-custom" class="mb-10 scroll-mt-24">
      <h3 class="text-xl font-bold text-slate-800 mb-3">7.2. Custom Validators (Specification)</h3>
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

    <!-- 7.3 Cross-Entity Validator -->
    <article id="val-cross" class="mb-10 scroll-mt-24">
      <h3 class="text-xl font-bold text-slate-800 mb-3">7.3. Cross-Entity Validation</h3>
      <p class="text-slate-600 mb-4">Validation phức tạp liên quan đến quan hệ giữa nhiều bảng (Brand - Model - Category).</p>

      <h4 class="font-semibold text-slate-700 mt-4">@BrandModelCategoryValid</h4>
      <p class="text-sm text-slate-600 mb-2">Đảm bảo tính nhất quán của dữ liệu quan hệ.</p>
      <CodeBlock filename="BrandCreateReq.java" :code="crossValCode" />
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

const crossValCode = ref(`package com.example.demo.dto.brand;

import com.example.demo.validation.BrandModelCategoryValid;
import lombok.Data;
import java.util.Set;

@Data
@BrandModelCategoryValid(message = "Danh mục sản phẩm không thuộc về Model đã chọn")
public class BrandCreateReq {
    private Long modelId;
    private Set<Long> categoryIds;
    // ...
}
`);
</script>
