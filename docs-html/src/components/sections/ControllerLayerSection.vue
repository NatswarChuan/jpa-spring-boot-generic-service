<template>
  <section class="mb-16">
    <div id="controller-layer" class="scroll-mt-20">
      <h2 class="text-3xl font-bold text-slate-900 border-b pb-4 mb-8">8. Tầng Controller</h2>
      <p class="text-slate-600 italic mb-6">Định nghĩa API endpoint và các trait hỗ trợ.</p>
    </div>

    <article id="controller-hierarchy" class="mb-10 scroll-mt-24">
      <h3 class="text-xl font-bold text-slate-800 mb-3">
        <span class="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm mr-3">8.1</span>
        Phân cấp Class
      </h3>
      <p class="text-slate-600 mb-6">
        Controller được xây dựng dựa trên sự kết hợp giữa Base Controller và các Interface Traits.
      </p>
      
      <div class="mb-6 bg-white border border-slate-200 rounded-lg p-6 shadow-sm overflow-x-auto">
        <div class="space-y-2 font-mono text-sm leading-relaxed">
          <div class="flex items-center">
            <span class="bg-slate-500 text-white px-3 py-0.5 rounded shadow-sm">IBaseController</span>
            <span class="mx-3 text-slate-400">→ Cung cấp getService()</span>
          </div>
          <div class="ml-8 border-l-2 border-slate-200 pl-4 space-y-2">
            <div class="flex items-center">
              <span class="bg-indigo-600 text-white px-3 py-0.5 rounded shadow-sm">AbController</span>
              <span class="mx-3 text-slate-400">→ Lớp Abstract Base (DI Service + Utils)</span>
            </div>
            
            <div class="ml-8 border-l-2 border-slate-200 pl-4 space-y-4 pt-2">
              <div class="flex items-center">
                <span class="bg-green-100 text-green-800 border border-green-200 px-3 py-0.5 rounded shadow-sm">MyController</span>
                <span class="mx-3 text-slate-500 text-xs italic"> implements </span>
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
        Controller Tiêu chuẩn
      </h3>
      <p class="text-slate-600 mb-3">
        Kế thừa <code>AbController</code> và implement các trait (ICreateController, IReadController...) để kích hoạt API.
      </p>
      <CodeBlock filename="ProductController.java" :code="ctrlCode" />
      <div class="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4 mt-4 text-sm text-blue-800">
        <strong>Lưu ý:</strong> Override <code>getResponseSummaryDtoClass</code> và <code>getResponseDetailDtoClass</code> để xác định DTO trả về.
      </div>
    </article>

    <article id="controller-traits" class="mb-10 scroll-mt-24">
      <h3 class="text-xl font-bold text-slate-800 mb-3">
        <span class="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm mr-3">8.3</span>
        Controller Traits (Module hóa)
      </h3>
      <p class="text-slate-600 mb-6">
        Thay vì kế thừa một cụm chức năng cố định, Framework cung cấp một "Menu" các Traits. Bạn chỉ cần implement interface tương ứng để kích hoạt API mong muốn.
      </p>

      <!-- Trait Menu Table -->
      <div class="mb-8 overflow-hidden bg-white border border-slate-200 rounded-lg shadow-sm">
        <table class="w-full text-left text-sm">
          <thead class="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
            <tr>
              <th class="p-3">Trait Interface</th>
              <th class="p-3">Endpoints Kích hoạt</th>
              <th class="p-3">Trường hợp sử dụng</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr>
              <td class="p-3 font-mono text-blue-600">IReadController</td>
              <td class="p-3 space-x-2">
                <span class="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-bold">GET /</span>
                <span class="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-bold">GET /{id}</span>
              </td>
              <td class="p-3 text-slate-600">Dữ liệu Công khai, Danh mục</td>
            </tr>
            <tr>
              <td class="p-3 font-mono text-purple-600">ICreateController</td>
              <td class="p-3">
                <span class="bg-amber-100 text-amber-700 px-2 py-0.5 rounded text-xs font-bold">POST /</span>
              </td>
              <td class="p-3 text-slate-600">Đăng ký, Logs, Phản hồi</td>
            </tr>
            <tr>
              <td class="p-3 font-mono text-orange-600">IUpdateController</td>
              <td class="p-3 space-x-2">
                <span class="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs font-bold">PUT /{id}</span>
                <span class="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs font-bold">PATCH /{id}</span>
              </td>
              <td class="p-3 text-slate-600">Chỉnh sửa Admin, Cập nhật trạng thái</td>
            </tr>
            <tr>
              <td class="p-3 font-mono text-red-600">IDeleteController</td>
              <td class="p-3">
                <span class="bg-red-100 text-red-700 px-2 py-0.5 rounded text-xs font-bold">DELETE /{id}</span>
              </td>
              <td class="p-3 text-slate-600">Dọn dẹp, Lưu trữ</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Mix & Match Examples -->
      <h4 class="font-bold text-slate-700 mb-4">Các ví dụ kết hợp (Mix & Match)</h4>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Read Only -->
        <div class="bg-slate-50 p-5 rounded-lg border border-slate-200">
           <div class="flex items-center mb-3">
              <div class="w-8 h-8 rounded bg-blue-100 text-blue-600 flex items-center justify-center mr-3">
                <i class="fas fa-eye"></i>
              </div>
              <h5 class="font-bold text-slate-800">1. Chỉ Đọc (Read-Only API)</h5>
           </div>
           <p class="text-xs text-slate-500 mb-3 ml-11">Chỉ cho phép xem, không cho phép sửa đổi.</p>
           <CodeBlock filename="ProductPublicController.java" :code="readOnlyCtrlCode" />
        </div>

        <!-- Write Only -->
        <div class="bg-slate-50 p-5 rounded-lg border border-slate-200">
           <div class="flex items-center mb-3">
              <div class="w-8 h-8 rounded bg-amber-100 text-amber-600 flex items-center justify-center mr-3">
                <i class="fas fa-edit"></i>
              </div>
              <h5 class="font-bold text-slate-800">2. Tạo & Đọc (Append Only)</h5>
           </div>
           <p class="text-xs text-slate-500 mb-3 ml-11">Cho phép thêm mới và xem, nhưng không xóa/sửa (VD: Log hệ thống).</p>
           <CodeBlock filename="SystemLogController.java" :code="publicCtrlCode" />
        </div>
      </div>
    </article>

    <article id="custom-api" class="mb-10 scroll-mt-24">
      <h3 class="text-xl font-bold text-slate-800 mb-3">
        <span class="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm mr-3">8.4</span>
        API Custom (Tùy chỉnh)
      </h3>
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

/**
 * Controller quản lý Sản phẩm (Product).
 * Kế thừa AbController và implement các trait để kích hoạt API CRUD.
 */
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
