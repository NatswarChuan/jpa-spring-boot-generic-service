<template>
  <section id="core-arch" class="scroll-mt-20 mb-16">
    <h2 class="text-3xl font-bold text-slate-900 border-b pb-4 mb-8">3. Core Architecture</h2>
    <p class="text-slate-600 italic mb-6">Ví dụ minh họa cho module quản lý <strong>Product</strong>. Flow dữ liệu cơ bản:</p>
    
    <!-- Architecture Overview Diagram -->
    <div class="mb-10 bg-slate-50 rounded-xl p-4 border border-slate-200">
       <ArchitectureDiagram />
    </div>

    <article id="core-entity" class="mb-10 scroll-mt-24">
      <h3 class="text-xl font-bold text-slate-800 mb-3">3.1. Entity & Repository</h3>
      <p class="text-slate-600 mb-3">Ánh xạ với bảng trong database và Repository JPA.</p>
      
      <div class="mb-4">
        <h4 class="font-semibold text-slate-700 mb-2">Entity</h4>
        <CodeBlock filename="Product.java" :code="entityCode" />
      </div>

      <h4 class="font-semibold text-slate-700 mb-2">Repository</h4>
      <CodeBlock filename="ProductRepository.java" :code="repoCode" />
      
      <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4 mt-4 text-sm text-yellow-800">
        <strong>Lưu ý:</strong> Repository bắt buộc phải extends <code>JpaSpecificationExecutor</code> để hỗ trợ bộ lọc nâng cao.
      </div>
    </article>

    <article id="core-service" class="mb-10 scroll-mt-24">
      <h3 class="text-xl font-bold text-slate-800 mb-3">3.2. Service Layer</h3>
      <p class="text-slate-600 mb-3">Kế thừa <code>AbService</code> để có sẵn logic CRUD và Validation.</p>
      
      <h4 class="font-semibold text-slate-700 mb-2">Interface</h4>
      <CodeBlock filename="IProductService.java" :code="interfaceCode" />
      
      <h4 class="font-semibold text-slate-700 mb-2 mt-4">Implementation</h4>
      <CodeBlock filename="ProductServiceImpl.java" :code="implCode" />
    </article>

    <article id="core-controller" class="mb-10 scroll-mt-24">
      <h3 class="text-xl font-bold text-slate-800 mb-3">3.3. Controller Layer</h3>
      <p class="text-slate-600 mb-3">
        Kế thừa <code>AbController</code> để tự động có các API CRUD chuẩn hóa (PagedResponse, Advanced Search).
        Chỉ cần định nghĩa các DTO Type và Inject Service.
      </p>
      
      <CodeBlock filename="ProductController.java" :code="ctrlCode" />

      <div class="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4 mt-4 text-sm text-blue-800">
        <strong>Lưu ý:</strong> Bạn cần override <code>getResponseDetailDtoClass</code> và <code>getResponseSummaryDtoClass</code> để framework biết được DTO nào sẽ được dùng để serialize response.
      </div>
    </article>

    <article id="framework-spec" class="mb-10 scroll-mt-24">
      <h3 class="text-xl font-bold text-slate-800 mb-3">3.4. Đặc tả Framework & Phân cấp lớp</h3>
      <p class="text-slate-600 mb-4">
        Framework được thiết kế theo mô hình phân tầng (Layered Inheritance), phân chia rạch ròi trách nhiệm giữa các loại thao tác.
      </p>
      
      <div class="mb-6 bg-white border border-slate-200 rounded-lg p-6 shadow-sm overflow-x-auto">
        <h4 class="font-bold text-slate-700 mb-4 flex items-center">
          <i class="fas fa-sitemap mr-2 text-blue-500"></i> Class Hierarchy (Service Layer)
        </h4>
        <div class="space-y-2 font-mono text-sm">
          <div class="flex items-center">
            <span class="bg-blue-600 text-white px-3 py-1 rounded">AbService</span>
            <span class="mx-2 text-slate-400">→ Cung cấp full CRUD + Spec</span>
          </div>
          <div class="ml-8 border-l-2 border-slate-200 pl-4 space-y-2">
             <div class="flex items-center">
               <span class="bg-indigo-500 text-white px-3 py-1 rounded">AbDeleteService</span>
               <span class="mx-2 text-slate-400">→ Xử lý logic Xóa (Delete)</span>
             </div>
             <div class="ml-8 border-l-2 border-slate-200 pl-4 space-y-2">
                <div class="flex items-center">
                  <span class="bg-purple-500 text-white px-3 py-1 rounded">AbUpdateService</span>
                  <span class="mx-2 text-slate-400">→ Xử lý logic Cập nhật & Lưu (Update/Save)</span>
                </div>
                <div class="ml-8 border-l-2 border-slate-200 pl-4 space-y-2">
                  <div class="flex items-center">
                    <span class="bg-pink-500 text-white px-3 py-1 rounded">AbCreateService</span>
                    <span class="mx-2 text-slate-400">→ Xử lý logic Tạo mới (Create)</span>
                  </div>
                  <div class="ml-8 border-l-2 border-slate-200 pl-4 space-y-2">
                    <div class="flex items-center">
                      <span class="bg-orange-500 text-white px-3 py-1 rounded">AbReadDetailService</span>
                      <span class="mx-2 text-slate-400">→ Xử lý logic Đọc chi tiết (FindOne/ById)</span>
                    </div>
                    <div class="ml-8 border-l-2 border-slate-200 pl-4 space-y-2">
                       <div class="flex items-center">
                         <span class="bg-amber-500 text-white px-3 py-1 rounded">AbReadSummaryService</span>
                         <span class="mx-2 text-slate-400">→ Xử lý logic Đọc danh sách (FindAll/Paging)</span>
                       </div>
                       <div class="ml-8 border-l-2 border-slate-200 pl-4">
                          <div class="flex items-center">
                            <span class="bg-slate-500 text-white px-3 py-1 rounded">AbBaseService</span>
                            <span class="mx-2 text-slate-400">→ Chứa Utils (Mapping, Logging, Base Fields)</span>
                          </div>
                       </div>
                    </div>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="p-5 bg-slate-50 border border-slate-200 rounded-lg">
          <h4 class="font-bold text-slate-800 mb-2">Package Structure</h4>
          <ul class="text-sm space-y-1 text-slate-600 font-mono">
            <li><i class="fas fa-folder text-yellow-500 mr-2"></i>.controller</li>
            <li class="pl-4">└── AbController.java</li>
            <li><i class="fas fa-folder text-yellow-500 mr-2"></i>.dto</li>
            <li class="pl-4">└── IDto.java</li>
            <li><i class="fas fa-folder text-yellow-500 mr-2"></i>.service</li>
            <li class="pl-4">├── IService.java</li>
            <li class="pl-4">└── AbService.java (và các Base Classes)</li>
            <li><i class="fas fa-folder text-yellow-500 mr-2"></i>.payload</li>
            <li class="pl-4">├── .request (BaseRequestParam)</li>
            <li class="pl-4">└── .response (HttpApiResponse, PagedResponse)</li>
          </ul>
        </div>
        <div class="p-5 bg-blue-50 border border-blue-100 rounded-lg">
          <h4 class="font-bold text-blue-900 mb-2">Core Principles</h4>
          <ul class="text-sm space-y-2 text-blue-800">
            <li class="flex items-start"><i class="fas fa-check mt-1 mr-2 opacity-50"></i> <strong>Generics Everywhere:</strong> Sử dụng triệt để Generics &lt;E, ID&gt; để đảm bảo type-safe.</li>
            <li class="flex items-start"><i class="fas fa-check mt-1 mr-2 opacity-50"></i> <strong>Separation of Concerns:</strong> DTO gánh vác việc giao tiếp API, Entity gánh vác việc lưu trữ DB.</li>
            <li class="flex items-start"><i class="fas fa-check mt-1 mr-2 opacity-50"></i> <strong>Hook-based Extension:</strong> Mở rộng tính năng qua các "Life-cycle hooks" thay vì sửa code lõi.</li>
          </ul>
        </div>
      </div>
    </article>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import CodeBlock from '../CodeBlock.vue';
import ArchitectureDiagram from '../ArchitectureDiagram.vue';

const entityCode = ref(`package com.example.demo.domain;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Nationalized;

import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * Entity đại diện cho Sản phẩm (Product).
 */
@Entity
@Table(name = "products", indexes = {
        @Index(name = "idx_product_brand", columnList = "brand_id"),
        @Index(name = "idx_product_model", columnList = "model_id"),
        @Index(name = "idx_product_store", columnList = "store_id")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Nationalized
    @Column(nullable = false)
    private String name;

    @Column(precision = 19, scale = 4)
    private BigDecimal price;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "brand_id")
    private Brand brand;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "model_id")
    private Model model;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "store_id")
    private Store store;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private Set<ProductCategory> productCategories = new HashSet<>();

    // Helper methods for safe relationship management
    @Transient
    public void setCategoryIds(Set<Long> categoryIds) {
        if (this.productCategories == null) {
            this.productCategories = new HashSet<>();
        }
        this.productCategories.clear();
        if (categoryIds != null) {
            this.productCategories.addAll(categoryIds.stream()
                    .map(catId -> ProductCategory.builder()
                            .product(this)
                            .category(Category.builder().id(catId).build())
                            .build())
                    .collect(Collectors.toSet()));
        }
    }
}
`);

const repoCode = ref(`package com.example.demo.repository;

import com.example.demo.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long>,
                                           JpaSpecificationExecutor<Product> {
}
`);

const interfaceCode = ref(`package com.example.demo.service;

import com.example.demo.entity.Product;
import com.natswarchuan.genericservice.service.IService;

public interface IProductService extends IService<Product, Long> {
}
`);

const implCode = ref(`package com.example.demo.service.impl;

import com.example.demo.entity.Product;
import com.example.demo.repository.ProductRepository;
import com.example.demo.service.IProductService;
import com.natswarchuan.genericservice.service.AbService;

import jakarta.annotation.Nonnull;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class ProductServiceImpl extends AbService<Product, Long> implements IProductService {
    @SuppressWarnings("null")
    public ProductServiceImpl(@Nonnull ProductRepository repository) {
        super(repository);
    }
}
`);

const ctrlCode = ref(`package com.example.demo.controller;

import com.example.demo.dto.req.ProductCreateReq;
import com.example.demo.dto.req.ProductUpdateReq;
import com.example.demo.dto.res.ProductResponse;
import com.example.demo.entity.Product;
import com.example.demo.service.IProductService;
import com.natswarchuan.genericservice.controller.AbController;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/products")
public class ProductController
        extends AbController<Product, Long, ProductCreateReq, ProductUpdateReq> {

    public ProductController(IProductService service) {
        super(service);
    }


    @Override
    @SuppressWarnings("unchecked")
    protected Class<ProductResponse> getResponseDetailDtoClass() {
        return ProductResponse.class;
    }

    @Override
    @SuppressWarnings("unchecked")
    protected Class<ProductResponse> getResponseSummaryDtoClass() {
        return ProductResponse.class;
    }
}
`);
</script>