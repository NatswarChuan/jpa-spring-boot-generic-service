<template>
  <section id="quick-start" class="scroll-mt-20 mb-16">
    <h2 class="text-4xl font-bold text-slate-900 mb-6">4. Bắt đầu nhanh (Quick Start)</h2>
    <p class="text-lg text-slate-600 mb-8">
      Tạo ngay một bộ CRUD API hoàn chỉnh chỉ trong vài phút. Dưới đây là mã nguồn tối thiểu cần thiết cho một module quản lý sản phẩm (Product).
    </p>

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
          :filename="steps[activeTab].filename" 
          :code="steps[activeTab].code" 
          language="java"
          class="!m-0 rounded-none border-0"
        />
      </div>
      
      <!-- Explanation -->
      <div class="p-6 bg-blue-50 border-t border-blue-100">
        <h4 class="font-bold text-blue-900 mb-2">Giải thích: {{ steps[activeTab].title }}</h4>
        <p class="text-sm text-blue-800">{{ steps[activeTab].desc }}</p>
      </div>
    </div>

    <div class="mt-8 text-center">
      <p class="text-slate-600 mb-4">Bạn muốn hiểu rõ hơn về từng thành phần?</p>
      <a href="#core-entity-repo" class="inline-flex items-center text-blue-600 font-bold hover:underline">
        Xem hướng dẫn chi tiết từng bước <i class="fas fa-arrow-right ml-2"></i>
      </a>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import CodeBlock from '../CodeBlock.vue';

const activeTab = ref('1. Entity');

const steps = {
  '1. Entity': {
    filename: 'Product.java',
    title: 'Định nghĩa Entity',
    desc: 'Entity JPA tiêu chuẩn. Framework hỗ trợ mọi loại ID (Long, String, UUID...).',
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
    title: 'Tạo Repository',
    desc: 'Kế thừa JpaRepository và JpaSpecificationExecutor để hỗ trợ CRUD và tìm kiếm động.',
    code: `import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepo extends JpaRepository<Product, Long>, JpaSpecificationExecutor<Product> {
    // Không cần viết thêm code nào
}`
  },
  '3. DTOs': {
    filename: 'ProductDTOs.java',
    title: 'Định nghĩa các DTO',
    desc: 'Implement IDto<E> để mapping tự động. Tách biệt Create, Update và Response.',
    code: `import com.natswarchuan.genericservice.dto.IDto;
import lombok.Data;

// 1. Request tạo mới
@Data
public class ProductCreateReq implements IDto<Product> {
    private String name;
    private Double price;
}

// 2. Request cập nhật
@Data
public class ProductUpdateReq implements IDto<Product> {
    private String name;
    private Double price;
}

// 3. Response trả về
@Data
public class ProductRes implements IDto<Product> {
    private Long id;
    private String name;
    private Double price;
}`
  },
  '4. Service': {
    filename: 'ProductService.java',
    title: 'Extend Base Service',
    desc: 'Kế thừa AbService<E, ID> để có đầy đủ tính năng CRUD. Không cần khai báo DTO type tại đây.',
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
    title: 'Extend Base Controller',
    desc: 'Kế thừa AbController và implement các interface Traits (ICreate, IUpdate...) để kích hoạt API.',
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

    // Chỉ định DTO dùng cho phản hồi danh sách
    @Override
    public <R extends IDto<Product>> Class<R> getResponseSummaryDtoClass() {
        return (Class<R>) ProductRes.class;
    }

    // Chỉ định DTO dùng cho phản hồi chi tiết
    @Override
    public <R extends IDto<Product>> Class<R> getResponseDetailDtoClass() {
        return (Class<R>) ProductRes.class;
    }
}`
  }
};
</script>
