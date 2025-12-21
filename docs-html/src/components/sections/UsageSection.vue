<template>
  <section id="dtos" class="scroll-mt-20 mb-16">
    <h2 class="text-3xl font-bold text-slate-900 border-b pb-4 mb-8">4. Data Transfer Objects</h2>
    
    <article id="dto-request" class="mb-10 scroll-mt-24">
      <h3 class="text-xl font-bold text-slate-800 mb-3">4.1. Request DTO (Create/Update)</h3>
      <p class="text-slate-600 mb-3">Tách biệt DTO tạo mới và cập nhật để kiểm soát dữ liệu đầu vào.</p>
      <CodeBlock filename="ProductCreateReq.java" :code="createReqCode" />
      <CodeBlock filename="ProductUpdateReq.java" :code="updateReqCode" />
    </article>

    <article id="dto-response" class="mb-10 scroll-mt-24">
      <h3 class="text-xl font-bold text-slate-800 mb-3">4.2. Response DTO (Auto Mapping)</h3>
      <p class="text-slate-600 mb-3">Dữ liệu trả về cho client.</p>
      <CodeBlock filename="ProductResponse.java" :code="resCode" />

      <div class="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4 mt-4 text-sm text-blue-800">
        <strong>Tips:</strong> <code>IDto</code> mặc định sử dụng <code>BeanUtils.copyProperties</code>. 
        Nếu tên field của DTO trùng với Entity, bạn <strong>KHÔNG CẦN</strong> viết code mapping thủ công nữa.
      </div>
    </article>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import CodeBlock from '../CodeBlock.vue';

const createReqCode = ref(`package com.example.demo.dto;

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
`);

const updateReqCode = ref(`package com.example.demo.dto;

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
`);

const resCode = ref(`package com.example.demo.dto;

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
`);
</script>