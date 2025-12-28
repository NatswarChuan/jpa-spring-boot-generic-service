<template>
  <section id="specifications" class="scroll-mt-20 mb-16">
    <h2 class="text-3xl font-bold text-slate-900 border-b pb-4 mb-8">{{ $t('specification.title') }}</h2>
    <p class="text-slate-600 mb-6 italic">{{ $t('specification.subtitle') }}</p>

    <!-- 10.1 Default Capabilities -->
    <article id="spec-default" class="mb-10 scroll-mt-24">
      <h3 class="text-xl font-bold text-slate-800 mb-3">
        {{ $t('specification.default.title') }}
      </h3>
      <p class="text-slate-600 mb-4" v-html="$t('specification.default.desc')"></p>

      <div class="bg-slate-50 border border-slate-200 rounded-lg p-5 mb-6">
        <h4 class="font-bold text-slate-700 mb-3 text-sm uppercase">{{ $t('specification.default.params_title') }}</h4>
        <ul class="space-y-3 text-sm font-mono text-slate-600">
          <li><span class="bg-blue-100 text-blue-800 px-2 py-0.5 rounded">page</span> : <span
              v-html="$t('specification.default.params.page')"></span></li>
          <li><span class="bg-blue-100 text-blue-800 px-2 py-0.5 rounded">size</span> : <span
              v-html="$t('specification.default.params.size')"></span></li>
          <li><span class="bg-purple-100 text-purple-800 px-2 py-0.5 rounded">sortBy</span> : <span
              v-html="$t('specification.default.params.sort')"></span></li>
          <li><span class="bg-purple-100 text-purple-800 px-2 py-0.5 rounded">sortDir</span> : <span
              v-html="$t('specification.default.params.dir')"></span></li>
          <li><span class="bg-green-100 text-green-800 px-2 py-0.5 rounded">search</span> : <span
              v-html="$t('specification.default.params.search')"></span></li>
          <li><span class="bg-green-100 text-green-800 px-2 py-0.5 rounded">searchField</span> : <span
              v-html="$t('specification.default.params.searchField')"></span></li>
        </ul>
      </div>

      <div class="mb-4">
        <h4 class="font-semibold text-slate-700 mb-2">{{ $t('specification.default.example_title') }}</h4>
        <pre class="bg-slate-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
GET /api/products?page=0&size=20&sortBy=price&sortDir=desc&search=iphone&searchField=name</pre>
        <p class="text-xs text-slate-500 mt-2 italic">
          {{ $t('specification.default.example_explain') }}
        </p>
      </div>
    </article>

    <!-- 10.2 Custom Specification -->
    <article id="spec-custom" class="mb-10 scroll-mt-24">
      <h3 class="text-xl font-bold text-slate-800 mb-3">
        {{ $t('specification.custom.title') }}
      </h3>
      <p class="text-slate-600 mb-4" v-html="$t('specification.custom.desc')"></p>

      <!-- Step 1 -->
      <h4 class="font-bold text-slate-700 mt-6 mb-2">{{ $t('specification.custom.step1.title') }}</h4>
      <p class="text-sm text-slate-600 mb-2" v-html="$t('specification.custom.step1.desc')"></p>
      <CodeBlock filename="ProductRequestParam.java" :code="customParamCode" />

      <!-- Step 2 -->
      <h4 class="font-bold text-slate-700 mt-6 mb-2">{{ $t('specification.custom.step2.title') }}</h4>
      <p class="text-sm text-slate-600 mb-2" v-html="$t('specification.custom.step2.desc')"></p>
      <CodeBlock filename="ProductSpecification.java" :code="productSpecCode" />

      <!-- Step 3 -->
      <h4 class="font-bold text-slate-700 mt-6 mb-2">{{ $t('specification.custom.step3.title') }}</h4>
      <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4 text-sm text-yellow-800"
        v-html="$t('specification.custom.step3.note')"></div>
      <CodeBlock filename="ProductController.java" :code="overrideCtrlCode" />
    </article>
  </section>
</template>

<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import CodeBlock from '../CodeBlock.vue';

const { t } = useI18n();

const customParamCode = computed(() => `package com.example.demo.dto.product;

import com.natswarchuan.genericservice.payload.request.BaseRequestParam;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class ProductFilterParam extends BaseRequestParam {
    private Double minPrice;
    private Double maxPrice;
    private String brandName; ${t('specification.code.comment_field_brand')}
    // ...
}
`);

const productSpecCode = computed(() => `package com.example.demo.specification;

import com.example.demo.domain.Brand;
import com.example.demo.domain.Product;
import com.example.demo.dto.product.ProductFilterParam;
import com.natswarchuan.genericservice.specification.GenericSpecification;
import jakarta.persistence.criteria.*;
import java.util.ArrayList;
import java.util.List;

public class ProductSpecification extends GenericSpecification<Product> {

    private final ProductFilterParam productParam;

    public ProductSpecification(ProductFilterParam requestParam) {
        super(requestParam);
        this.productParam = requestParam;
    }

    @Override
    public Predicate toPredicate(Root<Product> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
        ${t('specification.code.comment_reuse')}
        Predicate basePredicate = super.toPredicate(root, query, cb);
        List<Predicate> predicates = new ArrayList<>();
        predicates.add(basePredicate);

        ${t('specification.code.comment_price')}
        if (productParam.getMinPrice() != null) {
            predicates.add(cb.greaterThanOrEqualTo(root.get("price"), productParam.getMinPrice()));
        }
        if (productParam.getMaxPrice() != null) {
            predicates.add(cb.lessThanOrEqualTo(root.get("price"), productParam.getMaxPrice()));
        }

        ${t('specification.code.comment_join')}
        if (productParam.getBrandName() != null && !productParam.getBrandName().isEmpty()) {
            Join<Product, Brand> brandJoin = root.join("brand", JoinType.INNER);
            predicates.add(cb.like(cb.lower(brandJoin.get("name")), 
                "%" + productParam.getBrandName().toLowerCase() + "%"));
        }

        return cb.and(predicates.toArray(new Predicate[0]));
    }
}
`);

const overrideCtrlCode = computed(() => `package com.example.demo.controller;
// ... imports ...

@RestController
@RequestMapping("/api/products")
public class ProductController implements IController<Product, Long, ProductCreateReq, ProductUpdateReq> {

    private final ProductService service;

    public ProductController(ProductService service) {
        this.service = service;
    }

    @Override
    public ProductService getBaseService() {
        return service;
    }

    ${t('specification.code.comment_override_spec')}
    @Override
    public Specification<Product> getSpecification(BaseRequestParam requestParam) {
        if (requestParam instanceof ProductFilterParam param) {
            ${t('specification.code.comment_return_spec')}
            return new ProductSpecification(param);
        }
        return IController.super.getSpecification(requestParam);
    }
    
    // You can also create a separate endpoint for custom filtering
    @GetMapping("/filter")
    public ResponseEntity<HttpApiResponse<PagedResponse<? extends IDto<Product>>>> filterProducts(
            ProductFilterParam requestParam,
            @RequestHeader(name = "Accept-Language", defaultValue = "en") String language) {
        return this.findAll(requestParam, language);
    }
}
`);
</script>