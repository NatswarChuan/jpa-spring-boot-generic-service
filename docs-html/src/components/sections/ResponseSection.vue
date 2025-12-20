<template>
  <section id="response-wrappers" class="scroll-mt-20 mb-16">
    <h2 class="text-3xl font-bold text-slate-900 border-b pb-4 mb-8">8. Cấu trúc phản hồi (Response Standards)</h2>
    <p class="text-slate-600 mb-6">
      Để đảm bảo tính nhất quán cho API, thư viện cung cấp 2 lớp wrap response chuẩn: <code>HttpApiResponse</code> và <code>PagedResponse</code>.
    </p>

    <!-- 7.1 HttpApiResponse -->
    <article id="res-http" class="mb-10 scroll-mt-24">
      <h3 class="text-xl font-bold text-slate-800 mb-3">8.1. Phản hồi chung (HttpApiResponse)</h3>
      <p class="text-slate-600 mb-3">
        Mọi API (trừ file download) nên trả về định dạng này để Client dễ dàng parse.
      </p>
      
      <div class="bg-slate-50 p-4 rounded-lg border border-slate-200 mb-4">
        <h4 class="font-bold text-slate-700 mb-2 text-sm">Cấu trúc JSON</h4>
        <pre class="text-xs text-slate-600 font-mono bg-white p-3 rounded border border-slate-100 overflow-x-auto">
{
  "status": 200,            // Mã HTTP Status (200, 400, 404, 500...)
  "message": "Success",     // Thông điệp mô tả (Human readable)
  "data": { ... }           // Dữ liệu chính (Object, List, hoặc null)
}
        </pre>
      </div>

      <CodeBlock filename="MyController.java" :code="httpResCode" />
    </article>

    <!-- 7.2 PagedResponse -->
    <article id="res-paged" class="mb-10 scroll-mt-24">
      <h3 class="text-xl font-bold text-slate-800 mb-3">8.2. Phản hồi phân trang (PagedResponse)</h3>
      <p class="text-slate-600 mb-3">
        Dùng cho các API trả về danh sách có phân trang. Thay thế cho <code>Page&lt;T&gt;</code> mặc định của Spring để custom fields dễ hơn.
      </p>

      <div class="bg-slate-50 p-4 rounded-lg border border-slate-200 mb-4">
        <h4 class="font-bold text-slate-700 mb-2 text-sm">Cấu trúc JSON</h4>
        <pre class="text-xs text-slate-600 font-mono bg-white p-3 rounded border border-slate-100 overflow-x-auto">
{
  "content": [ ... ],       // Danh sách item của trang hiện tại
  "page": 0,                // Số trang hiện tại (bắt đầu từ 0)
  "size": 10,               // Kích thước trang
  "totalElements": 100,     // Tổng số bản ghi
  "totalPages": 10,         // Tổng số trang
  "last": false             // Có phải trang cuối không?
}
        </pre>
      </div>

      <CodeBlock filename="ProductController.java" :code="pagedResCode" />
    </article>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import CodeBlock from '../CodeBlock.vue';

const httpResCode = ref(`
// 1. Trả về thành công (data là Object/List)
@GetMapping("/{id}")
public HttpApiResponse<ProductResponse> getDetail(@PathVariable Long id) {
    ProductResponse res = service.findById(id, ProductResponse.class);
    return HttpApiResponse.success(res); 
}

// 2. Trả về lỗi (thường dùng trong GlobalExceptionHandler)
return HttpApiResponse.error("Không tìm thấy sản phẩm", 404);
`);

const pagedResCode = ref(`
@GetMapping
public HttpApiResponse<PagedResponse<ProductResponse>> getList(Pageable pageable) {
    // 1. Gọi Service lấy Page<DTO>
    Page<ProductResponse> page = service.findAll(pageable, spec, ProductResponse.class);
    
    // 2. Convert sang PagedResponse
    PagedResponse<ProductResponse> paged = PagedResponse.of(page);
    
    // 3. Wrap trong HttpApiResponse
    return HttpApiResponse.success(paged);
}
`);
</script>
