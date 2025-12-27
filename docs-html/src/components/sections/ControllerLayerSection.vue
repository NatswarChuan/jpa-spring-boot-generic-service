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
      <p class="text-slate-600 mb-6">
        {{ $t('controller_layer.hierarchy.desc') }}
      </p>
      
      <div class="mb-6 bg-white border border-slate-200 rounded-lg p-6 shadow-sm overflow-x-auto">
        <div class="space-y-2 font-mono text-sm leading-relaxed">
          <div class="flex items-center">
            <span class="bg-slate-500 text-white px-3 py-0.5 rounded shadow-sm">IBaseController</span>
            <span class="mx-3 text-slate-400">{{ $t('controller_layer.hierarchy.base_desc') }}</span>
          </div>
          <div class="ml-8 border-l-2 border-slate-200 pl-4 space-y-2">
            <div class="flex items-center">
              <span class="bg-indigo-600 text-white px-3 py-0.5 rounded shadow-sm">AbController</span>
              <span class="mx-3 text-slate-400">{{ $t('controller_layer.hierarchy.abstract_desc') }}</span>
            </div>
            
            <div class="ml-8 border-l-2 border-slate-200 pl-4 space-y-4 pt-2">
              <div class="flex items-center">
                <span class="bg-green-100 text-green-800 border border-green-200 px-3 py-0.5 rounded shadow-sm">MyController</span>
                <span class="mx-3 text-slate-500 text-xs italic"> {{ $t('controller_layer.hierarchy.implements') }} </span>
                <div class="flex flex-wrap gap-2">
                  <span class="bg-amber-500 text-white px-2 py-0.5 rounded text-xs">IReadController</span>
                  <span class="bg-pink-500 text-white px-2 py-0.5 rounded text-xs">ICreateController</span>
                  <span class="bg-purple-500 text-white px-2 py-0.5 rounded text-xs">IUpdateController</span>
                  <span class="bg-red-500 text-white px-2 py-0.5 rounded text-xs">IDeleteController</span>
                </div>
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
              <td class="p-3 font-mono text-blue-600">IReadController</td>
              <td class="p-3 space-x-2">
                <span class="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-bold">GET /</span>
                <span class="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-bold">GET /{id}</span>
              </td>
              <td class="p-3 text-slate-600">{{ $t('controller_layer.traits.table.read.usecase') }}</td>
            </tr>
            <tr>
              <td class="p-3 font-mono text-purple-600">ICreateController</td>
              <td class="p-3">
                <span class="bg-amber-100 text-amber-700 px-2 py-0.5 rounded text-xs font-bold">POST /</span>
              </td>
              <td class="p-3 text-slate-600">{{ $t('controller_layer.traits.table.create.usecase') }}</td>
            </tr>
            <tr>
              <td class="p-3 font-mono text-orange-600">IUpdateController</td>
              <td class="p-3 space-x-2">
                <span class="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs font-bold">PUT /{id}</span>
                <span class="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs font-bold">PATCH /{id}</span>
              </td>
              <td class="p-3 text-slate-600">{{ $t('controller_layer.traits.table.update.usecase') }}</td>
            </tr>
            <tr>
              <td class="p-3 font-mono text-red-600">IDeleteController</td>
              <td class="p-3">
                <span class="bg-red-100 text-red-700 px-2 py-0.5 rounded text-xs font-bold">DELETE /{id}</span>
              </td>
              <td class="p-3 text-slate-600">{{ $t('controller_layer.traits.table.delete.usecase') }}</td>
            </tr>
          </tbody>
        </table>
      </div>

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
import com.natswarchuan.genericservice.controller.AbController;
import com.natswarchuan.genericservice.controller.trait.*;
import com.natswarchuan.genericservice.dto.IDto;
import org.springframework.web.bind.annotation.*;

${t('controller_layer.code.comment_class')}
@RestController
@RequestMapping("/api/v1/products")
public class ProductController extends AbController<Product, Long>
        implements
        ICreateController<Product, Long, ProductCreateReq>,
        IUpdateController<Product, Long, ProductUpdateReq>,
        IDeleteController<Product, Long>,
        IReadController<Product, Long> {

    public ProductController(ProductService service) {
        super(service);
    }

    @Override
    @SuppressWarnings("unchecked")
    public <R extends IDto<Product>> Class<R> getResponseSummaryDtoClass() {
        // ${t('controller_layer.code.comment_summ')}
        return (Class<R>) ProductRes.class;
    }

    @Override
    @SuppressWarnings("unchecked")
    public <R extends IDto<Product>> Class<R> getResponseDetailDtoClass() {
        // ${t('controller_layer.code.comment_detail')}
        return (Class<R>) ProductDetailRes.class;
    }
}
`);

const readOnlyCtrlCode = computed(() => `public class ReadOnlyProductController 
    extends AbController<Product, Long>
    implements IReadController<Product, Long> {
    ${t('controller_layer.code.comment_readonly')}
}
`);

const publicCtrlCode = computed(() => `public class PublicProductController 
    extends AbController<Product, Long>
    implements IReadController<Product, Long>,
               ICreateController<Product, Long, ProductCreateReq> {
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
