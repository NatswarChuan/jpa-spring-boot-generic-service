<template>
  <section id="quick-start" class="scroll-mt-20 mb-16">
    <h2 class="text-4xl font-bold text-slate-900 mb-6">{{ $t('quick_start.title') }}</h2>
    <p class="text-lg text-slate-600 mb-8" v-html="$t('quick_start.intro')"></p>

    <div class="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <!-- Tabs -->
      <div class="flex overflow-x-auto border-b border-slate-200 bg-slate-50">
        <button v-for="(code, label) in steps" :key="label" @click="activeTab = label" :class="['px-6 py-3 text-sm font-bold whitespace-nowrap transition-colors',
          activeTab === label
            ? 'bg-white text-blue-600 border-b-2 border-blue-600'
            : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100']">
          {{ label }}
        </button>
      </div>

      <!-- Code Content -->
      <div class="p-0">
        <CodeBlock v-if="steps[activeTab]" :filename="steps[activeTab].filename" :code="steps[activeTab].code"
          language="java" class="!m-0 rounded-none border-0" />
      </div>

      <!-- Explanation -->
      <div v-if="steps[activeTab]" class="p-6 bg-blue-50 border-t border-blue-100">
        <h4 class="font-bold text-blue-900 mb-2">{{ $t('quick_start.explain_label') }}: {{ steps[activeTab].title }}</h4>
        <p class="text-sm text-blue-800" v-html="steps[activeTab].desc"></p>
      </div>
    </div>

    <div class="mt-8 text-center">
      <p class="text-slate-600 mb-4">{{ $t('quick_start.more_info') }}</p>
      <a href="#core-entity-repo" class="inline-flex items-center text-blue-600 font-bold hover:underline">
        {{ $t('quick_start.view_details') }} <i class="fas fa-arrow-right ml-2"></i>
      </a>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import CodeBlock from '../CodeBlock.vue';

const { t } = useI18n();
const activeTab = ref('Entity');

const steps = computed(() => ({
  'Entity': {
    filename: 'Product.java',
    title: t('quick_start.steps.entity.title'),
    desc: t('quick_start.steps.entity.desc'),
    code: `import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "product")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private Double price;
}`
  },
  'Repository': {
    filename: 'ProductRepository.java',
    title: t('quick_start.steps.repo.title'),
    desc: t('quick_start.steps.repo.desc'),
    code: `import com.natswarchuan.genericservice.repository.IRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends IRepository<Product, Long> {
    ${t('quick_start.steps.repo.comment')}
}`
  },
  'DTOs': {
    filename: 'ProductDTOs.java',
    title: t('quick_start.steps.dto.title'),
    desc: t('quick_start.steps.dto.desc'),
    code: `import com.natswarchuan.genericservice.dto.IDto;
import lombok.Data;

${t('quick_start.steps.dto.comment_create')}
@Data
public class ProductCreateReq implements IDto<Product> {
    private String name;
    private Double price;
}

${t('quick_start.steps.dto.comment_update')}
@Data
public class ProductUpdateReq implements IDto<Product> {
    private String name;
    private Double price;
}

${t('quick_start.steps.dto.comment_res')}
@Data
public class ProductRes implements IDto<Product> {
    private Long id;
    private String name;
    private Double price;
}`
  },
  'Service': {
    filename: 'ProductService.java',
    title: t('quick_start.steps.service.title'),
    desc: t('quick_start.steps.service.desc'),
    code: `import com.natswarchuan.genericservice.repository.IRepository;
import com.natswarchuan.genericservice.service.IService;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProductService implements IService<Product, Long> {
    
    private final ProductRepository repository;

    @Override
    public IRepository<Product, Long> getRepository() {
        return repository;
    }
}`
  },
  'Controller': {
    filename: 'ProductController.java',
    title: t('quick_start.steps.controller.title'),
    desc: t('quick_start.steps.controller.desc'),
    code: `import com.natswarchuan.genericservice.controller.IController;
import com.natswarchuan.genericservice.service.IBaseService;
import com.natswarchuan.genericservice.dto.IDto;
import org.springframework.web.bind.annotation.*;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/products")
@RequiredArgsConstructor
public class ProductController implements IController<Product, Long, ProductCreateReq, ProductUpdateReq> {

    private final ProductService service;

    @Override
    public <S extends IBaseService<Product, Long>> S getBaseService() {
        return (S) service;
    }

    ${t('quick_start.steps.controller.comment_summ')}
    @Override
    public Class<? extends IDto<Product>> getResponseSummaryDtoClass() {
        return ProductRes.class;
    }

    ${t('quick_start.steps.controller.comment_detail')}
    @Override
    public Class<? extends IDto<Product>> getResponseDetailDtoClass() {
        return ProductRes.class;
    }
}`
  }
}));
</script>
