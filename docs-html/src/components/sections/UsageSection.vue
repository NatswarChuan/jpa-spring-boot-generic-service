<template>
  <section id="dtos" class="scroll-mt-20 mb-16">
    <h2 class="text-3xl font-bold text-slate-900 border-b pb-4 mb-8">{{ $t('dtos.title') }}</h2>
    <p class="text-slate-600 italic mb-6">{{ $t('dtos.subtitle') }}</p>

    <article id="dto-request" class="mb-10 scroll-mt-24">
      <h3 class="text-xl font-bold text-slate-800 mb-3">
        <span class="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm mr-3">6.1</span>
        {{ $t('dtos.req.title') }}
      </h3>
      <p class="text-slate-600 mb-3" v-html="$t('dtos.req.desc')"></p>
      <CodeBlock filename="ProductCreateReq.java" :code="createReqCode" />
      <CodeBlock filename="ProductUpdateReq.java" :code="updateReqCode" />
    </article>

    <article id="dto-response" class="mb-10 scroll-mt-24">
      <h3 class="text-xl font-bold text-slate-800 mb-3">
        <span class="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm mr-3">6.2</span>
        {{ $t('dtos.res.title') }}
      </h3>
      <p class="text-slate-600 mb-3" v-html="$t('dtos.res.desc')"></p>
      <CodeBlock filename="ProductResponse.java" :code="resCode" />

      <div class="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4 mt-4 text-sm text-blue-800 shadow-sm"
        v-html="$t('dtos.res.tips')"></div>
    </article>

    <article id="dto-i18n" class="mb-10 scroll-mt-24">
      <h3 class="text-xl font-bold text-slate-800 mb-3">
        <span class="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm mr-3">6.3</span>
        {{ $t('dtos.i18n.title') }}
      </h3>
      <p class="text-slate-600 mb-3" v-html="$t('dtos.i18n.desc')"></p>
      <CodeBlock filename="ProductResponse.java" :code="i18nCode" />
    </article>

  </section>
</template>

<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import CodeBlock from '../CodeBlock.vue';

const { t } = useI18n();

const createReqCode = computed(() => `package com.example.demo.dto.product;

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

    @NotBlank(message = "` + t('validation_messages.product_name_required') + `")
    private String name;

    @DecimalMin(value = "0.0", message = "` + t('validation_messages.product_price_non_negative') + `")
    private BigDecimal price;

    @Exists(entity = Brand.class)
    private Long brandId;

    @Exists(entity = Model.class)
    private Long modelId;

    @Exists(entity = Store.class)
    private Long storeId;

    @IdsExist(entity = Category.class, message = "` + t('validation_messages.product_categories_not_found') + `")
    private Set<Long> categoryIds;

    @Override
    public Product toEntity() {
        ` + t('dtos.code.comment_convert') + `
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

const updateReqCode = computed(() => `package com.example.demo.dto.product;

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

    @IdsExist(entity = Category.class, message = "` + t('validation_messages.product_categories_not_found') + `")
    private Set<Long> categoryIds;

    @Override
    public Product updateEntity(Product entity) {
        ` + t('dtos.code.comment_update') + `
        IDto.super.updateEntity(entity);

        if (this.categoryIds != null) {
            Set<Category> categories = this.categoryIds.stream()
                    .map(id -> Category.builder().id(id).build())
                    .collect(Collectors.toSet());
            entity.setCategories(categories); 
        }
        return entity;
    }
}
`);

const resCode = computed(() => `package com.example.demo.dto.product;

import java.math.BigDecimal;
import com.example.demo.domain.Product;
import com.natswarchuan.genericservice.dto.IDto;
import lombok.Data;

@Data
public class ProductRes implements IDto<Product> {
    private Long id;
    private String name;
    private BigDecimal price;

    ` + t('dtos.code.comment_auto') + `
}
`);

const i18nCode = computed(() => `` + t('dtos.code.comment_i18n') + `
@Override
public void fromEntity(Product entity, String language) {
    IDto.super.fromEntity(entity, language);
    // ...
}
`);
</script>