<template>
  <section id="notes" class="scroll-mt-20 mb-16">
    <h2 class="text-3xl font-bold text-slate-900 border-b pb-4 mb-8">{{ $t('notes.title') }}</h2>
    <p class="text-slate-600 mb-6 italic">{{ $t('notes.subtitle') }}</p>

    <!-- 13.1 Modularity Strategy (Tips) -->
    <article id="notes-modularity" class="mb-10 scroll-mt-24">
      <h3 class="text-xl font-bold text-slate-800 mb-3">
        <span class="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm mr-3">13.1</span>
        {{ $t('notes.modularity.title') }}
      </h3>
      <p class="text-slate-600 mb-6" v-html="$t('notes.modularity.desc')"></p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Controller Tip -->
        <div class="bg-white border border-slate-200 rounded-lg p-5 shadow-sm hover:border-blue-400 transition-colors">
          <h4 class="font-bold text-slate-800 mb-2 flex items-center">
            <i class="fas fa-gamepad text-blue-600 mr-2"></i> {{ $t('notes.modularity.controller_title') }}
          </h4>
          <p class="text-sm text-slate-600 mb-4" v-html="$t('notes.modularity.controller_desc')"></p>
          <div class="bg-slate-50 p-3 rounded text-xs font-mono text-slate-700 mb-3 border border-slate-200">
            public class MyCtrl implements <span class="font-bold text-blue-600">IReadController</span>, <span
              class="font-bold text-purple-600">ICreateController</span> {...}
          </div>
          <a href="#controller-traits" class="text-xs font-bold text-blue-600 hover:underline">
            {{ $t('notes.modularity.controller_link') }} <i class="fas fa-arrow-right ml-1"></i>
          </a>
        </div>

        <!-- Service Tip -->
        <div class="bg-white border border-slate-200 rounded-lg p-5 shadow-sm hover:border-amber-400 transition-colors">
          <h4 class="font-bold text-slate-800 mb-2 flex items-center">
            <i class="fas fa-cogs text-amber-600 mr-2"></i> {{ $t('notes.modularity.service_title') }}
          </h4>
          <p class="text-sm text-slate-600 mb-4" v-html="$t('notes.modularity.service_desc')"></p>
          <div class="bg-slate-50 p-3 rounded text-xs font-mono text-slate-700 mb-3 border border-slate-200">
            public class MyService extends <span class="font-bold text-amber-600">AbReadDetailService</span> {...}
          </div>
          <a href="#core-service" class="text-xs font-bold text-amber-600 hover:underline">
            {{ $t('notes.modularity.service_link') }} <i class="fas fa-arrow-right ml-1"></i>
          </a>
        </div>
      </div>
    </article>

    <!-- 13.2 Advanced Patterns -->
    <article id="notes-advanced" class="mb-10 scroll-mt-24">
      <h3 class="text-xl font-bold text-slate-800 mb-3">
        <span class="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm mr-3">13.2</span>
        {{ $t('notes.advanced.title') }}
      </h3>
      <p class="text-slate-600 mb-6">{{ $t('notes.advanced.desc') }}</p>

      <div class="space-y-6">
        <!-- Composite Service -->
        <div class="bg-indigo-50 p-6 rounded-lg border-l-4 border-indigo-500 shadow-sm">
          <h4 class="text-lg font-bold text-indigo-800 mb-2">
            <i class="fas fa-layer-group mr-2"></i>{{ $t('notes.advanced.composite.title') }}
          </h4>
          <p class="text-sm text-indigo-700 mb-4">
            {{ $t('notes.advanced.composite.desc') }}
          </p>
          <CodeBlock filename="OrderService.java" :code="compositeServiceCode" />
        </div>

        <!-- Soft Delete -->
        <div class="bg-pink-50 p-6 rounded-lg border-l-4 border-pink-500 shadow-sm">
          <h4 class="text-lg font-bold text-pink-800 mb-2">
            <i class="fas fa-trash-restore mr-2"></i>{{ $t('notes.advanced.soft_delete.title') }}
          </h4>
          <p class="text-sm text-pink-700 mb-4">
            {{ $t('notes.advanced.soft_delete.desc') }}
          </p>

          <div class="space-y-4">
            <div>
              <h5 class="font-bold text-pink-900 mb-2 text-sm">{{ $t('notes.advanced.soft_delete.method1_title') }}</h5>
              <p class="text-xs text-pink-600 mb-2">{{ $t('notes.advanced.soft_delete.method1_desc') }}</p>
              <CodeBlock filename="BaseAppService.java" :code="softDeleteCode" />
            </div>

            <div>
              <h5 class="font-bold text-pink-900 mb-2 text-sm">{{ $t('notes.advanced.soft_delete.method2_title') }}</h5>
              <p class="text-xs text-pink-600 mb-2">{{ $t('notes.advanced.soft_delete.method2_desc') }}</p>
              <CodeBlock filename="BaseEntity.java" :code="hibernateSoftDeleteCode" />
            </div>
          </div>
        </div>

        <!-- Complex Dynamic Filtering -->
        <div class="bg-emerald-50 p-6 rounded-lg border-l-4 border-emerald-500 shadow-sm">
          <h4 class="text-lg font-bold text-emerald-800 mb-2">
            <i class="fas fa-filter mr-2"></i>{{ $t('notes.advanced.filter.title') }}
          </h4>
          <p class="text-sm text-emerald-700 mb-4" v-html="$t('notes.advanced.filter.desc')"></p>
          <CodeBlock filename="FilteringImplementation.java" :code="complexFilterCode" />
        </div>
      </div>
    </article>

    <!-- 13.3 Best Practices -->
    <article id="notes-best-practices" class="mb-10 scroll-mt-24">
      <h3 class="text-xl font-bold text-slate-800 mb-3">
        <span class="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm mr-3">13.3</span>
        {{ $t('notes.best_practices.title') }}
      </h3>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div class="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500 shadow-sm">
          <h4 class="text-lg font-bold text-blue-800 mb-2">
            <i class="fas fa-exclamation-triangle mr-2"></i>{{ $t('notes.best_practices.constructor_title') }}
          </h4>
          <p class="text-sm text-blue-700" v-html="$t('notes.best_practices.constructor_desc')"></p>
        </div>

        <div class="bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-500 shadow-sm">
          <h4 class="text-lg font-bold text-yellow-800 mb-2">
            <i class="fas fa-code-branch mr-2"></i>{{ $t('notes.best_practices.override_title') }}
          </h4>
          <ul class="text-sm text-yellow-800 list-disc list-inside">
            <li v-html="$t('notes.best_practices.override_create')"></li>
            <li v-html="$t('notes.best_practices.override_update')"></li>
            <li v-html="$t('notes.best_practices.override_res')"></li>
          </ul>
        </div>
      </div>

      <div class="bg-white border border-slate-200 rounded-lg p-6 shadow-sm mb-6">
        <h4 class="text-lg font-bold text-slate-800 mb-3"><i class="fas fa-lightbulb text-yellow-500 mr-2"></i>{{
          $t('notes.best_practices.optimization_title') }}</h4>
        <ul class="list-disc list-inside text-slate-600 space-y-2">
          <li v-html="$t('notes.best_practices.opt_index')"></li>
          <li v-html="$t('notes.best_practices.opt_lazy')"></li>
        </ul>
      </div>
    </article>

    <!-- 13.4 Troubleshooting -->
    <article id="notes-troubleshooting" class="mb-10 scroll-mt-24">
      <h3 class="text-xl font-bold text-slate-800 mb-3">
        <span class="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm mr-3">13.4</span>
        {{ $t('notes.troubleshooting.title') }}
      </h3>

      <!-- N+1 Solution -->
      <div class="bg-white border border-slate-200 rounded-lg p-6 shadow-sm mb-6">
        <h4 class="text-lg font-bold text-slate-800 mb-3 text-red-600"><i class="fas fa-bug mr-2"></i>{{
          $t('notes.troubleshooting.n1_title') }}</h4>
        <div class="space-y-4">
          <div class="p-4 bg-slate-50 rounded border border-slate-200">
            <h5 class="font-bold text-slate-700 mb-2 text-sm">{{ $t('notes.troubleshooting.n1_method1') }}</h5>
            <CodeBlock filename="UserRepository.java" :code="n1FixCode1" />
          </div>
          <div class="p-4 bg-slate-50 rounded border border-slate-200">
            <h5 class="font-bold text-slate-700 mb-2 text-sm">{{ $t('notes.troubleshooting.n1_method2') }}</h5>
            <CodeBlock filename="UserController.java" :code="n1FixCode2" />
          </div>
        </div>
      </div>

      <!-- Over-fetching Solution -->
      <div class="bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
        <h4 class="text-lg font-bold text-slate-800 mb-3 text-orange-600">
          <i class="fas fa-weight-hanging mr-2"></i>{{ $t('notes.troubleshooting.over_fetching_title') }}
        </h4>
        <div class="space-y-6">
          <div class="p-4 bg-orange-50 rounded border border-orange-200">
            <h5 class="font-bold text-orange-800 mb-2 text-sm">
              {{ $t('notes.troubleshooting.over_fetching_method') }}
            </h5>
            <CodeBlock filename="User.java" :code="overFetchingOneToOne" />
          </div>
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

const readOnlyControllerCode = computed(() => `@RestController
@RequestMapping("/api/v1/public/products")
public class ProductPublicController implements 
    IReadController<Product, Long>, ${t('notes.code.trait_read')}
    IBaseController<Product, Long>  ${t('notes.code.trait_base')}
{
    private final ProductService service;

    ${t('notes.code.inject_service')}
    public ProductPublicController(ProductService service) {
        this.service = service;
    }

    @Override
    public IService<Product, Long> getService() {
        return service;
    }
}
`);

const createOnlyControllerCode = computed(() => `@RestController
@RequestMapping("/api/v1/logs")
public class AuditLogController implements 
    ICreateController<Log, String, LogCreateReq> {
    
    private final LogService service;
    
    // ... Constructor & getService()
    
    @Override
    public <R extends IDto<Log>> Class<R> getResponseDetailDtoClass() {
        return (Class<R>) LogResponse.class;
    }
}
`);


const readOnlyServiceCode = computed(() => `@Service
public class ProductViewService extends AbReadDetailService<Product, Long> {
    public ProductViewService(ProductRepository repo) {
        super(repo);
    }
    ${t('notes.code.only_methods')}
    ${t('notes.code.no_methods')}
}
`);

const safeUpdateServiceCode = computed(() => `@Service
public class ConfigurationService extends AbUpdateService<Config, String> {
    public ConfigurationService(ConfigRepository repo) {
        super(repo);
    }
    ${t('notes.code.has_methods')}
    ${t('notes.code.no_delete')}
}
`);


const n1FixCode1 = computed(() => `package com.example.demo.repository;

import com.example.demo.entity.Product;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    @Override
    @EntityGraph(attributePaths = {"brand", "category", "model"}) 
    List<Product> findAll();
}
`);

const n1FixCode2 = computed(() => `// Trong ProductController / Service
import com.example.demo.entity.Product;
import com.example.demo.dto.res.ProductResponse;
import jakarta.persistence.criteria.JoinType;
import org.springframework.data.jpa.domain.Specification;

// ...
Specification<Product> spec = (root, query, cb) -> {
    ${t('notes.code.only_fetch')}
    if (query.getResultType() != Long.class && query.getResultType() != long.class) {
        root.fetch("brand", JoinType.LEFT);
        root.fetch("category", JoinType.LEFT);
    }
    return null; 
};
service.findAll(page, size, spec, ProductResponse.class);
`);

const overFetchingOneToOne = computed(() => `package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "products")
@Data
public class Product {
    @Id private Long id;
    private String name;

    ${t('notes.code.split_column')}
    ${t('notes.code.important_fetch')}
    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL, optional = false)
    @JoinColumn(name = "detail_id")
    private ProductDescription detail;
}

@Entity
@Table(name = "product_details")
@Data
public class ProductDescription {
    @Id private Long id;
    @Lob private String fullDescriptionHTML; ${t('notes.code.heavy_column')}
    @Column(columnDefinition="TEXT") private String technicalSpecs;
}
`);

const compositeServiceCode = computed(() => `@Service
public class OrderService {
    private final ProductService productService;
    private final CustomerService customerService;
    private final InventoryService inventoryService;

    @Transactional
    public void createOrder(OrderReq req) {
        ${t('notes.code.use_findbyid')}
        Product p = productService.findById(req.getProductId());
        Customer c = customerService.findById(req.getCustomerId());
        
        ${t('notes.code.business_logic')}
    }
}
`);

const softDeleteCode = computed(() => `public abstract class BaseAppService<E extends BaseEntity, ID> 
    extends AbService<E, ID> {
    
    @Override
    public void delete(ID id) {
        E entity = findById(id);
        entity.setDeleted(true); ${t('notes.code.soft_delete_logic')}
        repository.save(entity);
    }
}
`);

const hibernateSoftDeleteCode = computed(() => `@MappedSuperclass
@SQLDelete(sql = "UPDATE {table_name} SET deleted = true WHERE id = ?")
// Hibernate <= 6.2 dùng @Where(clause = "deleted = false")
@SQLRestriction("deleted = false") // Hibernate 6.3+
@Getter @Setter
public abstract class BaseEntity {
    @Column(name = "deleted", nullable = false)
    private boolean deleted = false;
}
`);

const complexFilterCode = computed(() => `${t('notes.code.param_filter')}
public class ProductFilterParam extends BaseRequestParam {
    private Double minPrice;
    private Double maxPrice;
    private String brandName;
}

${t('notes.code.spec_join')}
public class ProductSpecification extends GenericSpecification<Product> {
    private final ProductFilterParam param;

    public ProductSpecification(ProductFilterParam param) {
        super(param);
        this.param = param;
    }

    @Override
    public Predicate toPredicate(Root<Product> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
        List<Predicate> predicates = new ArrayList<>();
        ${t('notes.code.leverage_search')}
        predicates.add(super.toPredicate(root, query, cb));

        if (param.getMinPrice() != null) 
            predicates.add(cb.greaterThanOrEqualTo(root.get("price"), param.getMinPrice()));
            
        if (param.getBrandName() != null) {
            Join<Product, Brand> brand = root.join("brand", JoinType.INNER);
            predicates.add(cb.like(cb.lower(brand.get("name")), "%" + param.getBrandName().toLowerCase() + "%"));
        }

        return cb.and(predicates.toArray(new Predicate[0]));
    }
}
`);
</script>