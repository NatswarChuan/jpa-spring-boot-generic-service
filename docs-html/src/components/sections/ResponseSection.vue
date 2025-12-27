<template>
  <section id="response-handling" class="scroll-mt-20 mb-16">
    <h2 class="text-3xl font-bold text-slate-900 border-b pb-4 mb-8">{{ $t('response_handling.title') }}</h2>
    <p class="text-slate-600 mb-6 italic">{{ $t('response_handling.subtitle') }}</p>

    <!-- 11.1 Response Structures -->
    <article id="res-structure" class="mb-10 scroll-mt-24">
      <h3 class="text-xl font-bold text-slate-800 mb-3">
        <span class="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm mr-3">11.1</span>
        {{ $t('response_handling.structure.title') }}
      </h3>
      <p class="text-slate-600 mb-3" v-html="$t('response_handling.structure.desc')"></p>

      <div class="bg-slate-50 p-4 rounded-lg border border-slate-200 mb-4">
        <h4 class="font-bold text-slate-700 mb-2 text-sm">{{ $t('response_handling.structure.json_title') }}</h4>
        <pre class="text-xs text-slate-600 font-mono bg-white p-3 rounded border border-slate-100 overflow-x-auto">
{
  "status": 200,            {{ $t('response_handling.code.comment_status') }}
  "message": {{ $t('response_handling.code.msg_success') }},     {{ $t('response_handling.code.comment_msg') }}
  "data": { ... }           {{ $t('response_handling.code.comment_payload') }}
}
        </pre>
      </div>

      <CodeBlock filename="MyController.java" :code="httpResCode" />

      <h4 class="font-bold text-slate-700 mt-6 mb-2">{{ $t('response_handling.structure.paged_title') }}</h4>
      <p class="text-slate-600 mb-3 text-sm" v-html="$t('response_handling.structure.paged_desc')"></p>
      <CodeBlock filename="CustomController.java" :code="pagedResCode" />
    </article>

    <!-- 11.2 Exception Handling -->
    <article id="res-exception" class="mb-10 scroll-mt-24">
      <h3 class="text-xl font-bold text-slate-800 mb-3">
        <span class="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm mr-3">11.2</span>
        {{ $t('response_handling.exception.title') }}
      </h3>
      <p class="text-slate-600 mb-4" v-html="$t('response_handling.exception.desc')"></p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-slate-50 p-6 rounded-lg border border-slate-200 shadow-sm">
          <h4 class="text-lg font-bold text-slate-800 mb-2 font-mono text-sm">{{
            $t('response_handling.exception.throw_title') }}</h4>
          <CodeBlock filename="UserService.java" :code="throwExceptionCode" />
        </div>

        <div class="bg-slate-50 p-6 rounded-lg border border-slate-200 shadow-sm">
          <h4 class="text-lg font-bold text-slate-800 mb-2 font-mono text-sm">{{
            $t('response_handling.exception.standard_title') }}</h4>
          <pre class="text-xs text-slate-600 font-mono bg-white p-3 rounded border border-slate-100 h-full">
{
  "status": 404,
  "message": {{ $t('response_handling.code.msg_user_404') }},
  "data": null
}
          </pre>
        </div>
      </div>
    </article>
  </section>
</template>

<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import CodeBlock from '../CodeBlock.vue';

const { t } = useI18n();

const httpResCode = computed(() => `package com.example.demo.controller;

import com.example.demo.dto.ProductResponse;
import com.natswarchuan.genericservice.payload.response.HttpApiResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MyController { // ...
    
    ${t('response_handling.code.comment_success')}
    @GetMapping("/{id}")
    public HttpApiResponse<ProductResponse> getDetail(@PathVariable Long id) {
        ProductResponse res = service.findById(id, ProductResponse.class);
        return HttpApiResponse.success(res); 
    }

    ${t('response_handling.code.comment_manual_error')}
    public HttpApiResponse<Void> handleError() {
        return HttpApiResponse.error(${t('response_handling.code.msg_not_found')}, 404);
    }
}
`);

const pagedResCode = computed(() => `package com.example.demo.controller;

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
        ${t('response_handling.code.comment_call_service')}
        Page<ProductResponse> page = service.findAll(pageable, spec, ProductResponse.class);
        
        ${t('response_handling.code.comment_wrap')}
        return HttpApiResponse.success(PagedResponse.of(page));
    }
}
`);

const throwExceptionCode = computed(() => `package com.example.demo.service.impl;

import com.natswarchuan.genericservice.exception.HttpException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    
    public void deleteUser(Long id) {
        ${t('response_handling.code.comment_throw')}
        throw new HttpException(
            HttpStatus.NOT_FOUND, 
            ${t('response_handling.code.msg_user_not_found')}
        );
    }
}
`);
</script>
