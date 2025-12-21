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

      <div class="bg-orange-50 border-l-4 border-orange-500 p-4 mb-4 mt-4 text-sm text-orange-800">
        <h4 class="font-bold flex items-center mb-1"><i class="fas fa-exclamation-triangle mr-2"></i> Lưu ý quan trọng: Custom Filter</h4>
        <p>
          Khi bạn muốn dùng Custom Request Param (VD: <code>ProductRequestParam</code> có thêm <code>minPrice</code>), 
          bạn <strong>BẮT BUỘC phải Override lại hàm <code>findAll</code></strong> trong Controller con.
        </p>
        <p class="mt-1 text-xs">
          Lý do: Spring MVC cần biết chính xác class cụ thể để bind dữ liệu. Nếu không override, nó sẽ gọi hàm gốc của cha (nhận <code>BaseRequestParam</code>) và bỏ qua các field custom của bạn.
        </p>
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

const entityCode = ref(`package com.example.demo.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "products")
@Data
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private Double price;
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
    // Định nghĩa thêm hàm riêng nếu cần
}
`);

const implCode = ref(`package com.example.demo.service.impl;

import com.example.demo.entity.Product;
import com.example.demo.repository.ProductRepository;
import com.example.demo.service.IProductService;
import com.natswarchuan.genericservice.service.AbService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class ProductServiceImpl extends AbService<Product, Long> implements IProductService {

    @Autowired
    public ProductServiceImpl(ProductRepository repository) {
        super(repository);
    }
}
`);

const ctrlCode = ref(`package com.example.demo.controller;

import com.example.demo.dto.ProductCreateReq;
import com.example.demo.dto.ProductResponse;
import com.example.demo.dto.ProductUpdateReq;
import com.example.demo.dto.ProductRequestParam;
import com.example.demo.entity.Product;
import com.example.demo.service.IProductService;
import com.natswarchuan.genericservice.controller.AbController;
import com.natswarchuan.genericservice.payload.request.BaseRequestParam;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/products")
public class ProductController extends AbController<
    Product, 
    Long, 
    ProductCreateReq,      // C
    ProductUpdateReq       // U
> {

    public ProductController(IProductService service) { 
        super(service); 
    }

    @Override
    protected Class<ProductResponse> getResponseSummaryDtoClass() {
        return ProductResponse.class;
    }

    @Override
    protected Class<ProductResponse> getResponseDetailDtoClass() {
        return ProductResponse.class;
    }

    // Quan trọng: Override findAll để Spring bind đúng fields của ProductRequestParam
    @Override
    @GetMapping
    public ResponseEntity<HttpApiResponse<PagedResponse<ProductResponse>>> findAll(
            ProductRequestParam requestParam,
            @RequestHeader(name = "Accept-Language", defaultValue = "en") String language) {
        return super.findAll(requestParam, language);
    }

    // Override để thêm custom logic filter
    @Override
    protected Specification<Product> getSpecification(BaseRequestParam baseParam) {
        Specification<Product> spec = super.getSpecification(baseParam);
        
        // Cast về kiểu custom để lấy field
        if (baseParam instanceof ProductRequestParam param) {
             if (param.getMinPrice() != null) {
                 spec = spec.and((root, query, cb) -> cb.ge(root.get("price"), param.getMinPrice()));
             }
        }
        
        return spec;
    }
}
`);
</script>