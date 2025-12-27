<template>
  <section id="quick-start" class="scroll-mt-20 mb-16">
    <h2 class="text-4xl font-bold text-slate-900 mb-6">{{ $t('quick_start.title') }}</h2>
    <p class="text-lg text-slate-600 mb-8">{{ $t('quick_start.intro') }}</p>

    <div class="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <!-- Tabs -->
      <div class="flex overflow-x-auto border-b border-slate-200 bg-slate-50">
        <button 
          v-for="(code, label) in steps" 
          :key="label"
          @click="activeTab = label"
          :class="['px-6 py-3 text-sm font-bold whitespace-nowrap transition-colors', 
            activeTab === label 
              ? 'bg-white text-blue-600 border-b-2 border-blue-600' 
              : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100']"
        >
          {{ label }}
        </button>
      </div>

      <!-- Code Content -->
      <div class="p-0">
        <CodeBlock 
          v-if="steps[activeTab]"
          :filename="steps[activeTab].filename" 
          :code="steps[activeTab].code" 
          language="java"
          class="!m-0 rounded-none border-0"
        />
      </div>
      
      <!-- Explanation -->
      <div v-if="steps[activeTab]" class="p-6 bg-blue-50 border-t border-blue-100">
        <h4 class="font-bold text-blue-900 mb-2">Giải thích: {{ steps[activeTab].title }}</h4>
        <p class="text-sm text-blue-800">{{ steps[activeTab].desc }}</p>
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
const activeTab = ref('1. Entity');

const steps = computed(() => ({
  '1. Entity': {
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
  '2. Repository': {
    filename: 'ProductRepo.java',
    title: t('quick_start.steps.repo.title'),
    desc: t('quick_start.steps.repo.desc'),
    code: `import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepo extends JpaRepository<Product, Long>, JpaSpecificationExecutor<Product> {
    ${t('quick_start.steps.repo.comment')}
}`
  },
  '3. DTOs': {
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
  '4. Service': {
    filename: 'ProductService.java',
    title: t('quick_start.steps.service.title'),
    desc: t('quick_start.steps.service.desc'),
    code: `import com.natswarchuan.genericservice.service.AbService;
import org.springframework.stereotype.Service;

@Service
public class ProductService extends AbService<Product, Long> {
    
    public ProductService(ProductRepo repo) {
        super(repo);
    }
}`
  },
  '5. Controller': {
    filename: 'ProductController.java',
    title: t('quick_start.steps.controller.title'),
    desc: t('quick_start.steps.controller.desc'),
    code: `import com.natswarchuan.genericservice.controller.AbController;
import com.natswarchuan.genericservice.controller.trait.*;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/products")
public class ProductController extends AbController<Product, Long> 
    implements ICreateController<Product, Long, ProductCreateReq>,
               IUpdateController<Product, Long, ProductUpdateReq>,
               IDeleteController<Product, Long>,
               IReadController<Product, Long> {

    public ProductController(ProductService service) {
        super(service);
    }

    ${t('quick_start.steps.controller.comment_summ')}
    @Override
    public <R extends IDto<Product>> Class<R> getResponseSummaryDtoClass() {
        return (Class<R>) ProductRes.class;
    }

    ${t('quick_start.steps.controller.comment_detail')}
    @Override
    public <R extends IDto<Product>> Class<R> getResponseDetailDtoClass() {
        return (Class<R>) ProductRes.class;
    }
}`
  }
}));
</script>
