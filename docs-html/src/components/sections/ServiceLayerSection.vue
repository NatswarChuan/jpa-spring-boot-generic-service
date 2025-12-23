<template>
  <section id="service-layer" class="scroll-mt-20 mb-16">
    <h2 class="text-3xl font-bold text-slate-900 border-b pb-4 mb-8">4. Service Layer</h2>
    <p class="text-slate-600 italic mb-6">Xử lý logic nghiệp vụ và tích hợp các life-cycle hooks.</p>

    <article id="core-service" class="mb-10 scroll-mt-24">
      <h3 class="text-xl font-bold text-slate-800 mb-3">4.1. Basic Service</h3>
      <p class="text-slate-600 mb-3">Kế thừa <code>AbService</code> để có sẵn các phương thức CRUD chuẩn hóa.</p>
      <CodeBlock filename="ProductService.java" :code="serviceCode" />
      <div class="bg-green-50 border-l-4 border-green-500 p-4 mb-4 mt-4 text-sm text-green-800 shadow-sm">
        <strong>Tips:</strong> Bạn không nhất thiết phải tạo Interface cho Service. <code>AbService</code> đã cung cấp đủ các phương thức thông dụng.
      </div>
    </article>

    <article id="service-hooks" class="mb-10 scroll-mt-24">
      <h3 class="text-xl font-bold text-slate-800 mb-3">4.2. Life-cycle Hooks</h3>
      <p class="text-slate-600 mb-4">
        Framework cho phép "can thiệp" vào luồng xử lý mà không cần override toàn bộ phương thức.
      </p>

      <div class="space-y-4">
        <div class="bg-slate-900 rounded-lg p-4 font-mono text-sm text-green-400">
          <p class="text-slate-500 mb-2">// Các hook hỗ trợ trong AbService:</p>
          <ul class="space-y-1">
            <li>- <span class="text-blue-400">beforeCreate</span>(E entity)</li>
            <li>- <span class="text-blue-400">afterCreate</span>(E entity)</li>
            <li>- <span class="text-blue-400">beforeUpdate</span>(E newEntity, E oldEntity)</li>
            <li>- <span class="text-blue-400">afterUpdate</span>(E savedEntity, E oldEntity)</li>
            <li>- <span class="text-blue-400">beforeDelete</span>(E entity)</li>
            <li>- <span class="text-blue-400">afterDelete</span>(E entity)</li>
          </ul>
        </div>
        
        <p class="text-sm text-slate-600">Ví dụ: Tự động tính toán hoặc gửi thông báo:</p>
        <CodeBlock filename="ProductService.java" :code="hookExampleCode" />
      </div>
    </article>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import CodeBlock from '../CodeBlock.vue';

const serviceCode = ref(`package com.example.demo.service;

import com.example.demo.domain.Product;
import com.example.demo.repository.ProductRepository;
import com.natswarchuan.genericservice.service.AbService;
import org.springframework.stereotype.Service;

@Service
public class ProductService extends AbService<Product, Long> {
    public ProductService(ProductRepository repository) {
        super(repository);
    }
}
`);

const hookExampleCode = ref(`@Override
protected void beforeCreate(Product entity) {
    // Tự động tính toán giá khuyến mãi
    if (entity.getPrice().compareTo(BigDecimal.valueOf(1000)) > 0) {
        entity.setPrice(entity.getPrice().multiply(BigDecimal.valueOf(0.9)));
    }
}

@Override
protected void afterCreate(Product entity) {
    // Gửi thông báo sau khi tạo thành công
    notificationService.send("New product added: " + entity.getName());
}
`);
</script>
