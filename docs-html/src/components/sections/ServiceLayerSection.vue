<template>
  <section id="service-layer" class="scroll-mt-20 mb-16">
    <h2 class="text-3xl font-bold text-slate-900 border-b pb-4 mb-8">{{ $t('service_layer.title') }}</h2>
    <p class="text-slate-600 italic mb-6">{{ $t('service_layer.subtitle') }}</p>

    <article id="core-service" class="mb-10 scroll-mt-24">
      <h3 class="text-xl font-bold text-slate-800 mb-6">
        <span class="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm mr-3">7.1</span>
        {{ $t('service_layer.base.title') }}
      </h3>
      <p class="text-slate-600 mb-6" v-html="$t('service_layer.base.desc')"></p>

      <!-- Base Class Selection Menu -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <!-- Level 1: Read Summary -->
        <div class="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:border-blue-400 transition-colors">
          <div class="flex items-center gap-2 mb-3">
            <span class="bg-amber-100 text-amber-700 px-2 py-1 rounded text-xs font-bold uppercase">Base</span>
            <h4 class="font-bold text-slate-800">AbReadSummaryService</h4>
          </div>
          <p class="text-sm text-slate-500 mb-4 h-10">{{ $t('service_layer.base.menu.read_summary.question') }}</p>
          <ul class="text-sm text-slate-600 space-y-2 mb-4">
            <li class="flex items-center"><span class="text-green-500 mr-2">✓</span> findAll (Page/List)</li>
            <li class="flex items-center"><span class="text-green-500 mr-2">✓</span> {{ $t('service_layer.base.menu.read_summary.features') }}</li>
          </ul>
        </div>

        <!-- Level 2: Read Detail -->
        <div class="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:border-blue-400 transition-colors">
          <div class="flex items-center gap-2 mb-3">
            <span class="bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs font-bold uppercase">Base</span>
            <h4 class="font-bold text-slate-800">AbReadDetailService</h4>
          </div>
          <p class="text-sm text-slate-500 mb-4 h-10">{{ $t('service_layer.base.menu.read_detail.question') }}</p>
          <ul class="text-sm text-slate-600 space-y-2 mb-4">
            <li class="flex items-center"><span class="text-blue-500 mr-2">➜</span> All of Summary</li>
            <li class="flex items-center"><span class="text-green-500 mr-2">✓</span> {{ $t('service_layer.base.menu.read_detail.features') }}</li>
          </ul>
        </div>

         <!-- Level 3: Create -->
        <div class="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:border-blue-400 transition-colors">
           <div class="flex items-center gap-2 mb-3">
            <span class="bg-pink-100 text-pink-700 px-2 py-1 rounded text-xs font-bold uppercase">Base</span>
            <h4 class="font-bold text-slate-800">AbCreateService</h4>
          </div>
          <p class="text-sm text-slate-500 mb-4 h-10">{{ $t('service_layer.base.menu.create.question') }}</p>
          <ul class="text-sm text-slate-600 space-y-2 mb-4">
            <li class="flex items-center"><span class="text-blue-500 mr-2">➜</span> All of Read Detail</li>
            <li class="flex items-center"><span class="text-green-500 mr-2">✓</span> create (Entity/DTO)</li>
          </ul>
        </div>

        <!-- Level 4: Update -->
        <div class="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:border-blue-400 transition-colors">
           <div class="flex items-center gap-2 mb-3">
            <span class="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs font-bold uppercase">Base</span>
            <h4 class="font-bold text-slate-800">AbUpdateService</h4>
          </div>
          <p class="text-sm text-slate-500 mb-4 h-10">{{ $t('service_layer.base.menu.update.question') }}</p>
          <ul class="text-sm text-slate-600 space-y-2 mb-4">
            <li class="flex items-center"><span class="text-blue-500 mr-2">➜</span> All of Create</li>
            <li class="flex items-center"><span class="text-green-500 mr-2">✓</span> update, save</li>
          </ul>
        </div>

         <!-- Level 5: Delete/Full -->
        <div class="bg-indigo-50 rounded-xl border border-indigo-200 p-5 shadow-sm relative overflow-hidden col-span-1 md:col-span-2 lg:col-span-2">
            <div class="absolute right-0 top-0 w-24 h-24 bg-indigo-100 rounded-bl-full -mr-10 -mt-10 opacity-50"></div>
           <div class="flex items-center gap-2 mb-3 relative z-10">
            <span class="bg-indigo-600 text-white px-2 py-1 rounded text-xs font-bold uppercase shadow">{{ $t('service_layer.base.menu.full.rec') }}</span>
            <h4 class="font-bold text-indigo-900">{{ $t('service_layer.base.menu.full.title') }}</h4>
          </div>
          <p class="text-sm text-indigo-700 mb-4 h-10 relative z-10">{{ $t('service_layer.base.menu.full.desc') }}</p>
           <div class="grid grid-cols-2 gap-4 relative z-10">
              <ul class="text-sm text-indigo-800 space-y-2">
                <li class="flex items-center font-semibold"><span class="text-indigo-600 mr-2">➜</span> All features</li>
              </ul>
              <ul class="text-sm text-indigo-800 space-y-2">
                <li class="flex items-center"><span class="text-green-600 mr-2 font-bold">✓</span> delete (Soft/Hard)</li>
              </ul>
           </div>
        </div>
      </div>

      <div class="bg-slate-50 rounded-lg p-5 border border-slate-200 font-mono text-sm overflow-x-auto">
        <p class="text-slate-500 mb-2">{{ $t('service_layer.base.code_comment') }}</p>
        <CodeBlock filename="ProductService.java" :code="serviceCode" />
      </div>
    </article>

    <article id="service-hooks" class="mb-10 scroll-mt-24">
      <h3 class="text-xl font-bold text-slate-800 mb-3">
        <span class="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm mr-3">7.2</span>
        {{ $t('service_layer.hooks.title') }}
      </h3>
      <p class="text-slate-600 mb-6">
        {{ $t('service_layer.hooks.desc') }}
      </p>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6">
        <!-- Visual Timelines -->
        <div class="space-y-6">
          <!-- Write Flow -->
          <div class="bg-slate-50 rounded-xl p-6 border border-slate-200">
               <h4 class="font-bold text-slate-700 mb-4 flex items-center">
                  <span class="w-2 h-6 bg-amber-500 rounded-sm mr-2"></span>
                  {{ $t('service_layer.hooks.timeline.write_flow') }}
               </h4>
               <div class="relative pl-4 border-l-2 border-slate-300 space-y-6">
                  <!-- Step 1 -->
                  <div class="relative">
                      <div class="absolute -left-[23px] top-1 w-3 h-3 rounded-full bg-slate-400 border-2 border-white"></div>
                      <div class="text-sm font-bold text-slate-400 uppercase text-xs mb-1">Input</div>
                      <div class="text-slate-600 text-sm">{{ $t('service_layer.hooks.timeline.input') }}</div>
                  </div>
                   <!-- Step 2: Before Hook -->
                  <div class="relative">
                      <div class="absolute -left-[25px] top-0 w-4 h-4 rounded-full bg-amber-500 border-2 border-white shadow-sm ring-1 ring-amber-200"></div>
                      <div class="text-sm font-bold text-amber-700 text-xs mb-1 bg-amber-50 inline-block px-2 py-0.5 rounded">HOOK: beforeCreate/Update/Delete</div>
                      <div class="text-slate-600 text-xs">Validation, set default, check business rules...</div>
                  </div>
                   <!-- Step 3: Action -->
                   <div class="relative">
                      <div class="absolute -left-[23px] top-1 w-3 h-3 rounded-full bg-blue-500 border-2 border-white"></div>
                      <div class="text-sm font-bold text-blue-700 text-xs mb-1">Repository Action</div>
                      <div class="text-slate-600 text-xs">{{ $t('service_layer.hooks.timeline.repo_action') }}</div>
                  </div>
                   <!-- Step 4: After Hook -->
                   <div class="relative">
                      <div class="absolute -left-[25px] top-0 w-4 h-4 rounded-full bg-purple-500 border-2 border-white shadow-sm ring-1 ring-purple-200"></div>
                      <div class="text-sm font-bold text-purple-700 text-xs mb-1 bg-purple-50 inline-block px-2 py-0.5 rounded">HOOK: afterCreate/Update/Delete</div>
                      <div class="text-slate-600 text-xs">Audit log, notification, trigger events...</div>
                  </div>
               </div>
          </div>

          <!-- Read Flow -->
          <div class="bg-sky-50 rounded-xl p-6 border border-sky-200">
               <h4 class="font-bold text-sky-800 mb-4 flex items-center">
                  <span class="w-2 h-6 bg-sky-500 rounded-sm mr-2"></span>
                  {{ $t('service_layer.hooks.timeline.read_flow') }}
               </h4>
               <div class="relative pl-4 border-l-2 border-sky-300 space-y-6">
                  <!-- Step 1 -->
                  <div class="relative">
                      <div class="absolute -left-[23px] top-1 w-3 h-3 rounded-full bg-blue-500 border-2 border-white"></div>
                      <div class="text-sm font-bold text-blue-700 text-xs mb-1">Repository.find...()</div>
                      <div class="text-slate-600 text-xs">{{ $t('service_layer.hooks.timeline.repo_read') }}</div>
                  </div>
                   <!-- Step 2: After Entity Hook -->
                  <div class="relative">
                      <div class="absolute -left-[25px] top-0 w-4 h-4 rounded-full bg-sky-500 border-2 border-white shadow-sm ring-1 ring-sky-200"></div>
                      <div class="text-sm font-bold text-sky-700 text-xs mb-1 bg-white inline-block px-2 py-0.5 rounded border border-sky-100">HOOK: afterReadEntity(entity)</div>
                      <div class="text-slate-600 text-xs">Transient fields, filter ...</div>
                  </div>
                   <!-- Step 3: Mapping -->
                   <div class="relative">
                      <div class="absolute -left-[23px] top-1 w-3 h-3 rounded-full bg-slate-400 border-2 border-white"></div>
                      <div class="text-sm font-bold text-slate-500 text-xs mb-1">Map to DTO</div>
                      <div class="text-slate-600 text-xs">{{ $t('service_layer.hooks.timeline.map_dto') }}</div>
                  </div>
                   <!-- Step 4: After DTO Hook -->
                   <div class="relative">
                      <div class="absolute -left-[25px] top-0 w-4 h-4 rounded-full bg-indigo-500 border-2 border-white shadow-sm ring-1 ring-indigo-200"></div>
                      <div class="text-sm font-bold text-indigo-700 text-xs mb-1 bg-white inline-block px-2 py-0.5 rounded border border-indigo-100">HOOK: afterReadDto(dto)</div>
                      <div class="text-slate-600 text-xs">Enrich data, format for FE...</div>
                  </div>
               </div>
          </div>
        </div>

        <!-- Code Example -->
        <div class="space-y-4">
             <div class="bg-indigo-50 p-4 rounded-lg border border-indigo-100 mb-2">
                 <h4 class="font-bold text-indigo-900 text-sm mb-2">{{ $t('service_layer.hooks.hooks_list') }}</h4>
                 <ul class="grid grid-cols-1 gap-2 text-xs font-mono text-indigo-800">
                    <li><span class="text-amber-600">beforeCreate</span> / <span class="text-purple-600">afterCreate</span></li>
                    <li><span class="text-purple-600">afterReadEntity</span> / <span class="text-purple-600">afterReadDto</span></li>
                    <li><span class="text-amber-600">beforeUpdate</span> / <span class="text-purple-600">afterUpdate</span></li>
                    <li><span class="text-amber-600">beforeDelete</span> / <span class="text-purple-600">afterDelete</span></li>
                 </ul>
             </div>
            <CodeBlock filename="ProductService.java (Example)" :code="hookExampleCode" />
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

const serviceCode = computed(() => `package com.example.demo.service;

import com.example.demo.domain.Product;
import com.example.demo.repository.ProductRepository;
import com.natswarchuan.genericservice.service.AbService;
import org.springframework.stereotype.Service;
import org.springframework.lang.NonNull;

/**
 * Service xử lý nghiệp vụ cho Product.
 * Kế thừa AbService để tận dụng logic CRUD có sẵn.
 */
@Service
public class ProductService extends AbService<Product, Long> {

    public ProductService(@NonNull ProductRepository repository) {
        super(repository);
    }
}
`);

const hookExampleCode = computed(() => `@Override
protected Product beforeCreate(Product entity) {
    ${t('service_layer.hooks.code_comment_before')}
    if (entity.getPrice().compareTo(BigDecimal.valueOf(1000)) > 0) {
        entity.setPrice(entity.getPrice().multiply(BigDecimal.valueOf(0.9)));
    }
    return entity;
}

@Override
protected Product afterCreate(Product entity) {
    ${t('service_layer.hooks.code_comment_after')}
    notificationService.send("New product added: " + entity.getName());
    return entity;
}
`);
</script>
