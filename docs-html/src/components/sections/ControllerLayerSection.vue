<template>
  <section id="controller-layer" class="scroll-mt-20 mb-16">
    <h2 class="text-3xl font-bold text-slate-900 border-b pb-4 mb-8">5. Controller Layer</h2>
    <p class="text-slate-600 italic mb-6">Định nghĩa API endpoint và các trait hỗ trợ.</p>

    <article id="core-controller" class="mb-10 scroll-mt-24">
      <h3 class="text-xl font-bold text-slate-800 mb-3">5.1. Standard Controller</h3>
      <p class="text-slate-600 mb-3">
        Kế thừa <code>AbController</code> và implement các trait (ICreateController, IReadController...) để kích hoạt API.
      </p>
      <CodeBlock filename="ProductController.java" :code="ctrlCode" />
      <div class="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4 mt-4 text-sm text-blue-800">
        <strong>Lưu ý:</strong> Override <code>getResponseSummaryDtoClass</code> và <code>getResponseDetailDtoClass</code> để xác định DTO trả về.
      </div>
    </article>

    <article id="controller-traits" class="mb-10 scroll-mt-24">
      <h3 class="text-xl font-bold text-slate-800 mb-3">5.2. Controller Traits (Modular API)</h3>
      <p class="text-slate-600 mb-4">Chọn lọc API muốn cung cấp bằng cách implement Interface Trait tương ứng.</p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-700">
        <div class="p-4 border border-slate-200 rounded-lg bg-slate-50">
          <p class="font-bold mb-2">🔥 Read-Only Controller</p>
          <CodeBlock filename="ReadOnlyController.java" :code="readOnlyCtrlCode" />
        </div>
        <div class="p-4 border border-slate-200 rounded-lg bg-slate-50">
          <p class="font-bold mb-2">🚀 Create & Read Only</p>
          <CodeBlock filename="PublicController.java" :code="publicCtrlCode" />
        </div>
      </div>
    </article>

    <article id="custom-api" class="mb-10 scroll-mt-24">
      <h3 class="text-xl font-bold text-slate-800 mb-3">5.3. Custom API Endpoints</h3>
      <p class="text-slate-600 mb-4">Thêm các xử lý riêng biệt bên cạnh generic API.</p>
      <CodeBlock filename="ProductController.java" :code="customApiCode" />
    </article>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import CodeBlock from '../CodeBlock.vue';

const ctrlCode = ref(`package com.example.demo.controller;

import com.example.demo.domain.Product;
import com.example.demo.dto.product.*;
import com.example.demo.service.ProductService;
import com.natswarchuan.genericservice.controller.AbController;
import com.natswarchuan.genericservice.controller.trait.*;
import com.natswarchuan.genericservice.dto.IDto;
import org.springframework.web.bind.annotation.*;

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
        return (Class<R>) ProductRes.class;
    }

    @Override
    @SuppressWarnings("unchecked")
    public <R extends IDto<Product>> Class<R> getResponseDetailDtoClass() {
        return (Class<R>) ProductDetailRes.class;
    }
}
`);

const readOnlyCtrlCode = ref(`public class ReadOnlyProductController 
    extends AbController<Product, Long>
    implements IReadController<Product, Long> {
    // Chỉ có GET / và GET /{id}
}
`);

const publicCtrlCode = ref(`public class PublicProductController 
    extends AbController<Product, Long>
    implements IReadController<Product, Long>,
               ICreateController<Product, Long, ProductCreateReq> {
    // Có GET và POST, không có PUT/DELETE
}
`);

const customApiCode = ref(`@GetMapping("/filter")
public ResponseEntity<HttpApiResponse<PagedResponse<ProductRes>>> filterProducts(
        ProductFilterParam requestParam) {
    // Gọi phương thức findAll của controller cơ sở
    return this.findAll(requestParam, "en");
}
`);
</script>
