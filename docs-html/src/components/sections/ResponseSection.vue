<template>
  <section id="response-handling" class="scroll-mt-20 mb-16">
    <h2 class="text-3xl font-bold text-slate-900 border-b pb-4 mb-8">11. Xử lý Phản hồi (Response)</h2>
    <p class="text-slate-600 mb-6 italic">Cấu trúc kết quả trả về đồng nhất và cơ chế xử lý lỗi tập trung.</p>

    <!-- 8.1 Response Structures -->
    <article id="res-structure" class="mb-10 scroll-mt-24">
      <h3 class="text-xl font-bold text-slate-800 mb-3">
        <span class="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm mr-3">11.1</span>
        Cấu trúc Phản hồi
      </h3>
      <p class="text-slate-600 mb-3">
        Thư viện cung cấp 2 lớp wrap chuẩn: <code>HttpApiResponse</code> cho đối tượng đơn/list và <code>PagedResponse</code> cho phân trang.
      </p>
      
      <div class="bg-slate-50 p-4 rounded-lg border border-slate-200 mb-4">
        <h4 class="font-bold text-slate-700 mb-2 text-sm">Cấu trúc JSON (HttpApiResponse)</h4>
        <pre class="text-xs text-slate-600 font-mono bg-white p-3 rounded border border-slate-100 overflow-x-auto">
{
  "status": 200,            // Mã HTTP Status
  "message": "Success",     // Thông điệp Human readable
  "data": { ... }           // Payload chi tiết
}
        </pre>
      </div>

      <CodeBlock filename="MyController.java" :code="httpResCode" />

      <h4 class="font-bold text-slate-700 mt-6 mb-2">PagedResponse (Phân trang)</h4>
      <p class="text-slate-600 mb-3 text-sm">Thay thế <code>Page&lt;T&gt;</code> mặc định để custom fields.</p>
      <CodeBlock filename="CustomController.java" :code="pagedResCode" />
    </article>

    <!-- 8.2 Exception Handling -->
    <article id="res-exception" class="mb-10 scroll-mt-24">
      <h3 class="text-xl font-bold text-slate-800 mb-3">
        <span class="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm mr-3">11.2</span>
        Xử lý Ngoại lệ
      </h3>
      <p class="text-slate-600 mb-4">
        Sử dụng <code>HttpException</code> để ném lỗi từ Service/Controller. <code>GlobalExceptionHandler</code> sẽ tự động bắt và trả về format chuẩn.
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-slate-50 p-6 rounded-lg border border-slate-200 shadow-sm">
          <h4 class="text-lg font-bold text-slate-800 mb-2 font-mono text-sm">Throw Exception (Ném Lỗi)</h4>
          <CodeBlock filename="UserService.java" :code="throwExceptionCode" />
        </div>

        <div class="bg-slate-50 p-6 rounded-lg border border-slate-200 shadow-sm">
          <h4 class="text-lg font-bold text-slate-800 mb-2 font-mono text-sm">Standard Response (Phản hồi Chuẩn)</h4>
          <pre class="text-xs text-slate-600 font-mono bg-white p-3 rounded border border-slate-100 h-full">
{
  "status": 404,
  "message": "Không tìm thấy người dùng với ID: 123",
  "data": null
}
          </pre>
        </div>
      </div>
    </article>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import CodeBlock from '../CodeBlock.vue';

const httpResCode = ref(`package com.example.demo.controller;

import com.example.demo.dto.ProductResponse;
import com.natswarchuan.genericservice.payload.response.HttpApiResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MyController { // ...
    
    // 1. Trả về thành công
    @GetMapping("/{id}")
    public HttpApiResponse<ProductResponse> getDetail(@PathVariable Long id) {
        ProductResponse res = service.findById(id, ProductResponse.class);
        return HttpApiResponse.success(res); 
    }

    // 2. Trả về lỗi thủ công (ít dùng, thường throw Exception)
    public HttpApiResponse<Void> handleError() {
        return HttpApiResponse.error("Không tìm thấy sản phẩm", 404);
    }
}
`);

const pagedResCode = ref(`package com.example.demo.controller;

import com.example.demo.dto.res.ProductResponse;
import com.natswarchuan.genericservice.payload.response.HttpApiResponse;
import com.natswarchuan.genericservice.payload.response.PagedResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CustomController { // ...

    @GetMapping
    public HttpApiResponse<PagedResponse<ProductResponse>> getList(Pageable pageable) {
        // 1. Gọi Service lấy Page<DTO>
        Page<ProductResponse> page = service.findAll(pageable, spec, ProductResponse.class);
        
        // 2. Wrap vào PagedResponse & HttpApiResponse
        return HttpApiResponse.success(PagedResponse.of(page));
    }
}
`);

const throwExceptionCode = ref(`package com.example.demo.service.impl;

import com.natswarchuan.genericservice.exception.HttpException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    
    public void deleteUser(Long id) {
        // Ném lỗi với Status Code và Message tùy chỉnh
        throw new HttpException(
            HttpStatus.NOT_FOUND, 
            "Không tìm thấy người dùng với ID: " + id
        );
    }
}
`);
</script>
