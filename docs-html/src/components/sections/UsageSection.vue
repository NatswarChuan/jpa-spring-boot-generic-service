<template>
  <section id="dtos" class="scroll-mt-20 mb-16">
    <h2 class="text-3xl font-bold text-slate-900 border-b pb-4 mb-8">7. Data Transfer Objects</h2>
    <p class="text-slate-600 italic mb-6">Sử dụng DTO để tách biệt Model của Database và Model của API.</p>
    
    <article id="dto-request" class="mb-10 scroll-mt-24">
      <h3 class="text-xl font-bold text-slate-800 mb-3">7.1. Request DTO (Create/Update)</h3>
      <p class="text-slate-600 mb-3">Tách biệt DTO tạo mới và cập nhật để kiểm soát dữ liệu đầu vào.</p>
      <CodeBlock filename="ProductCreateReq.java" :code="createReqCode" />
      <CodeBlock filename="ProductUpdateReq.java" :code="updateReqCode" />
    </article>

    <article id="dto-response" class="mb-10 scroll-mt-24">
      <h3 class="text-xl font-bold text-slate-800 mb-3">7.2. Response DTO (Auto Mapping)</h3>
      <p class="text-slate-600 mb-3">Dữ liệu trả về cho client. Hỗ trợ tự động map từ Entity sang DTO.</p>
      <CodeBlock filename="ProductResponse.java" :code="resCode" />

      <div class="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4 mt-4 text-sm text-blue-800 shadow-sm">
        <strong>Tips:</strong> <code>IDto</code> mặc định sử dụng <code>BeanUtils.copyProperties</code>. 
        Nếu tên field của DTO trùng với Entity, bạn <strong>KHÔNG CẦN</strong> viết code mapping thủ công nữa.
      </div>
    </article>

    <article id="dto-i18n" class="mb-10 scroll-mt-24">
      <h3 class="text-xl font-bold text-slate-800 mb-3">7.3. Multi-language Support (I18n)</h3>
      <p class="text-slate-600 mb-3">
        Framework hỗ trợ đa ngôn ngữ ngay khi chuyển đổi DTO. Bạn có thể override hàm <code>fromEntity</code> có tham số <code>language</code>.
      </p>
      <CodeBlock filename="ProductResponse.java" :code="i18nCode" />
    </article>

  </section>
</template>

<script setup>
import { ref } from 'vue';
import CodeBlock from '../CodeBlock.vue';

const createReqCode = ref(`package com.example.demo.dto.product;

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
`);

const updateReqCode = ref(`package com.example.demo.dto.product;

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
`);

const resCode = ref(`package com.example.demo.dto.product;

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
`);

const i18nCode = ref(`// Ví dụ override nếu muốn support đa ngôn ngữ
@Override
public void fromEntity(Product entity, String language) {
    IDto.super.fromEntity(entity, language);
    // Logic custom cho từng ngôn ngữ
}
`);
</script>