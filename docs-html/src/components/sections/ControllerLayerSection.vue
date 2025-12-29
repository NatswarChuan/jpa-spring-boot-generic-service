<template>
  <section class="mb-16">
    <div id="controller-layer" class="scroll-mt-20">
      <h2 class="text-3xl font-bold text-slate-900 border-b pb-4 mb-8">{{ $t('controller_layer.title') }}</h2>
      <p class="text-slate-600 italic mb-6">{{ $t('controller_layer.subtitle') }}</p>
    </div>

    <article id="controller-hierarchy" class="mb-10 scroll-mt-24">
      <h3 class="text-xl font-bold text-slate-800 mb-3">
        <span class="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm mr-3">8.1</span>
        {{ $t('controller_layer.hierarchy.title') }}
      </h3>
      <p class="text-slate-600 mb-6" v-html="$t('controller_layer.hierarchy.desc')"></p>
      
      <div class="mb-8 p-6 bg-slate-50 rounded-xl border border-slate-200 shadow-inner">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          <!-- Source Traits -->
          <div class="lg:col-span-3 flex flex-col items-center p-4 bg-white rounded-lg border border-slate-200 shadow-sm">
            <h4 class="font-bold text-slate-500 text-xs uppercase mb-3 tracking-wide">{{ $t('controller_layer.hierarchy.diagram.available_traits') }}</h4>
            <div class="flex flex-col gap-2 w-full">
              <div class="bg-blue-50 text-blue-700 px-3 py-2 rounded text-xs font-bold border border-blue-100 text-center">IReadSummary...</div>
              <div class="bg-cyan-50 text-cyan-700 px-3 py-2 rounded text-xs font-bold border border-cyan-100 text-center">IReadDetail...</div>
              <div class="bg-pink-50 text-pink-700 px-3 py-2 rounded text-xs font-bold border border-pink-100 text-center">ICreate...</div>
              <div class="bg-purple-50 text-purple-700 px-3 py-2 rounded text-xs font-bold border border-purple-100 text-center">IUpdate...</div>
              <div class="bg-red-50 text-red-700 px-3 py-2 rounded text-xs font-bold border border-red-100 text-center">IDelete...</div>
            </div>
          </div>

          <!-- Arrow -->
          <div class="lg:col-span-1 flex justify-center text-slate-300">
             <i class="fas fa-chevron-right text-2xl hidden lg:block"></i>
             <i class="fas fa-chevron-down text-2xl lg:hidden"></i>
          </div>

          <!-- Composition Area -->
          <div class="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <!-- Option 1: Aggregator -->
            <div class="bg-white p-5 rounded-lg border-2 border-indigo-100 hover:border-indigo-300 transition-colors shadow-sm relative group">
              <div class="absolute -top-3 -right-3 bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded shadow-sm z-10">{{ $t('controller_layer.hierarchy.diagram.standard') }}</div>
              <h5 class="font-bold text-indigo-900 mb-2">MyStandardController</h5>
              <div class="flex items-center gap-2 mb-3">
                <span class="text-xs text-slate-400 italic">implements</span>
                <span class="bg-indigo-100 text-indigo-700 px-2 py-1 rounded text-xs font-bold">IController</span>
              </div>
              <div class="text-xs text-slate-500 border-t border-slate-100 pt-2 mt-2">
                <span v-html="$t('controller_layer.hierarchy.diagram.inherits')"></span>
              </div>
            </div>

            <!-- Option 2: Selective -->
            <div class="bg-white p-5 rounded-lg border-2 border-slate-200 hover:border-slate-300 transition-colors shadow-sm relative group">
              <div class="absolute -top-3 -right-3 bg-slate-500 text-white text-xs font-bold px-2 py-1 rounded shadow-sm z-10">{{ $t('controller_layer.hierarchy.diagram.custom') }}</div>
              <h5 class="font-bold text-slate-800 mb-2">MyCustomController</h5>
              <div class="flex flex-wrap items-center gap-2 mb-3">
                <span class="text-xs text-slate-400 italic">implements</span>
                <span class="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-bold">IReadSummary...</span>
                <span class="text-slate-300">+</span>
                <span class="bg-pink-100 text-pink-700 px-2 py-1 rounded text-xs font-bold">ICreate...</span>
              </div>
               <div class="text-xs text-slate-500 border-t border-slate-100 pt-2 mt-2">
                {{ $t('controller_layer.hierarchy.diagram.selected') }}
              </div>
            </div>

          </div>
        </div>
      </div>
    </article>

    <article id="core-controller" class="mb-10 scroll-mt-24">
      <h3 class="text-xl font-bold text-slate-800 mb-3">
        <span class="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm mr-3">8.2</span>
        {{ $t('controller_layer.core.title') }}
      </h3>
      <p class="text-slate-600 mb-3" v-html="$t('controller_layer.core.desc')"></p>
      <CodeBlock filename="ProductController.java" :code="ctrlCode" />
      <div class="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4 mt-4 text-sm text-blue-800" v-html="$t('controller_layer.core.note')"></div>
    </article>

    <article id="controller-traits" class="mb-10 scroll-mt-24">
      <h3 class="text-xl font-bold text-slate-800 mb-3">
        <span class="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm mr-3">8.3</span>
        {{ $t('controller_layer.traits.title') }}
      </h3>
      <p class="text-slate-600 mb-6">{{ $t('controller_layer.traits.desc') }}</p>

      <!-- Trait Menu Table -->
      <div class="mb-8 overflow-hidden bg-white border border-slate-200 rounded-lg shadow-sm">
        <table class="w-full text-left text-sm">
          <thead class="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
            <tr>
              <th class="p-3">{{ $t('controller_layer.traits.table.header.trait') }}</th>
              <th class="p-3">{{ $t('controller_layer.traits.table.header.endpoint') }}</th>
              <th class="p-3">{{ $t('controller_layer.traits.table.header.usecase') }}</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr>
              <td class="p-3 font-mono text-blue-600">{{ $t('controller_layer.traits.table.read_summary.title') }}</td>
              <td class="p-3">
                <span class="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-bold">GET /</span>
              </td>
              <td class="p-3 text-slate-600">{{ $t('controller_layer.traits.table.read_summary.usecase') }}</td>
            </tr>
            <tr>
              <td class="p-3 font-mono text-cyan-600">{{ $t('controller_layer.traits.table.read_detail.title') }}</td>
              <td class="p-3">
                <span class="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-bold">GET /{id}</span>
              </td>
              <td class="p-3 text-slate-600">{{ $t('controller_layer.traits.table.read_detail.usecase') }}</td>
            </tr>
            <tr>
              <td class="p-3 font-mono text-purple-600">{{ $t('controller_layer.traits.table.create.title') }}</td>
              <td class="p-3">
                <span class="bg-amber-100 text-amber-700 px-2 py-0.5 rounded text-xs font-bold">POST /</span>
              </td>
              <td class="p-3 text-slate-600">{{ $t('controller_layer.traits.table.create.usecase') }}</td>
            </tr>
            <tr>
              <td class="p-3 font-mono text-orange-600">{{ $t('controller_layer.traits.table.update.title') }}</td>
              <td class="p-3 space-x-2">
                <span class="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs font-bold">PUT /{id}</span>
              </td>
              <td class="p-3 text-slate-600">{{ $t('controller_layer.traits.table.update.usecase') }}</td>
            </tr>
            <tr>
              <td class="p-3 font-mono text-red-600">{{ $t('controller_layer.traits.table.delete.title') }}</td>
              <td class="p-3">
                <span class="bg-red-100 text-red-700 px-2 py-0.5 rounded text-xs font-bold">DELETE /{id}</span>
              </td>
              <td class="p-3 text-slate-600">{{ $t('controller_layer.traits.table.delete.usecase') }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <!-- Pro Tip -->
      <div class="mb-8 p-4 bg-amber-50 border-l-4 border-amber-500 text-amber-900 text-sm rounded-r" v-html="$t('controller_layer.traits.tip')"></div>

      <!-- Mix & Match Examples -->
      <h4 class="font-bold text-slate-700 mb-4">{{ $t('controller_layer.traits.mix_match_title') }}</h4>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Read Only -->
        <div class="bg-slate-50 p-5 rounded-lg border border-slate-200">
           <div class="flex items-center mb-3">
              <div class="w-8 h-8 rounded bg-blue-100 text-blue-600 flex items-center justify-center mr-3">
                <i class="fas fa-eye"></i>
              </div>
              <h5 class="font-bold text-slate-800">{{ $t('controller_layer.traits.read_only.title') }}</h5>
           </div>
           <p class="text-xs text-slate-500 mb-3 ml-11">{{ $t('controller_layer.traits.read_only.desc') }}</p>
           <CodeBlock filename="ProductPublicController.java" :code="readOnlyCtrlCode" />
        </div>

        <!-- Write Only -->
        <div class="bg-slate-50 p-5 rounded-lg border border-slate-200">
           <div class="flex items-center mb-3">
              <div class="w-8 h-8 rounded bg-amber-100 text-amber-600 flex items-center justify-center mr-3">
                <i class="fas fa-edit"></i>
              </div>
              <h5 class="font-bold text-slate-800">{{ $t('controller_layer.traits.append_only.title') }}</h5>
           </div>
           <p class="text-xs text-slate-500 mb-3 ml-11">{{ $t('controller_layer.traits.append_only.desc') }}</p>
           <CodeBlock filename="SystemLogController.java" :code="publicCtrlCode" />
        </div>
      </div>
    </article>

    <article id="custom-api" class="mb-10 scroll-mt-24">
      <h3 class="text-xl font-bold text-slate-800 mb-3">
        <span class="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm mr-3">8.4</span>
        {{ $t('controller_layer.custom.title') }}
      </h3>
      <p class="text-slate-600 mb-4">{{ $t('controller_layer.custom.desc') }}</p>
      <CodeBlock filename="ProductController.java" :code="customApiCode" />
    </article>
  </section>
</template>

<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import CodeBlock from '../CodeBlock.vue';

const { t } = useI18n();

const ctrlCode = computed(() => `package com.example.demo.controller;

import com.example.demo.domain.Product;
import com.example.demo.dto.product.*;
import com.example.demo.service.ProductService;
import com.natswarchuan.genericservice.controller.IController;
import com.natswarchuan.genericservice.service.IBaseService;
import org.springframework.web.bind.annotation.*;

${t('controller_layer.code.comment_class')}
@RestController
@RequestMapping("/api/v1/products")
public class ProductController implements IController<Product, Long, ProductCreateReq, ProductUpdateReq> {

    private final ProductService service;

    public ProductController(ProductService service) {
        this.service = service;
    }

    @Override
    public ProductService getBaseService() {
        return service;
    }

    @Override
    public Class<ProductRes> getResponseSummaryDtoClass() {
        // ${t('controller_layer.code.comment_summ')}
        return ProductRes.class;
    }

    @Override
    public Class<ProductDetailRes> getResponseDetailDtoClass() {
        // ${t('controller_layer.code.comment_detail')}
        return ProductDetailRes.class;
    }
}
`);

const readOnlyCtrlCode = computed(() => `public class ReadOnlyProductController 
    implements IReadSummaryController<Product, Long>,
               IReadDetailController<Product, Long> {
    
    // ... overrides getBaseService(), etc.
    ${t('controller_layer.code.comment_readonly')}
}
`);

const publicCtrlCode = computed(() => `public class PublicProductController 
    implements IReadDetailController<Product, Long>,
               ICreateController<Product, Long, ProductCreateReq> {
    
    // ... overrides getBaseService(), etc.
    ${t('controller_layer.code.comment_public')}
}
`);

const customApiCode = computed(() => `@GetMapping("/filter")
public ResponseEntity<HttpApiResponse<PagedResponse<ProductRes>>> filterProducts(
        ProductFilterParam requestParam) {
    ${t('controller_layer.code.comment_custom_filter')}
    return this.findAll(requestParam, "en");
}
`);
</script>
