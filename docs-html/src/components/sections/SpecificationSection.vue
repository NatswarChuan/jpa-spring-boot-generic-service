<template>
  <section id="spec-examples" class="scroll-mt-20 mb-16">
    <h2 class="text-3xl font-bold text-slate-900 border-b pb-4 mb-8">6. Ví dụ nâng cao: Specification</h2>
    <p class="text-slate-600 mb-6">Sử dụng <code>Specification</code> để xây dựng các bộ lọc động phức tạp.</p>

    <article id="spec-search" class="mb-10 scroll-mt-24">
      <h3 class="text-xl font-bold text-slate-800 mb-3">6.1. Tìm kiếm cơ bản</h3>
      <CodeBlock filename="ProductController.java" :code="searchCode" />
    </article>

    <!-- Đã sửa tiêu đề từ 5.4 -> 5.2 -->
    <article id="spec-pageable" class="mb-10 scroll-mt-24">
      <h3 class="text-xl font-bold text-slate-800 mb-3">6.2. Phân trang & Sắp xếp</h3>
      <p class="text-slate-600 mb-3">Kết hợp <code>PageRequest</code> và <code>Sort</code>.</p>
      <CodeBlock filename="ProductController.java" :code="pageableCode" />
    </article>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import CodeBlock from '../CodeBlock.vue';

const searchCode = ref(`
@GetMapping("/search")
public Page<ProductResponse> search(@RequestParam String name, 
                                    @RequestParam int page, 
                                    @RequestParam int size) {
    Specification<Product> spec = (root, query, cb) -> {
        if (name == null) return null;
        return cb.like(cb.lower(root.get("name")), "%" + name.toLowerCase() + "%");
    };
    return service.findAll(page, size, spec, ProductResponse.class);
}
`);

const pageableCode = ref(`
@GetMapping("/list")
public Page<ProductResponse> list(@RequestParam(defaultValue = "0") int page,
                                  @RequestParam(defaultValue = "price") String sort,
                                  @RequestParam(defaultValue = "asc") String dir) {
    
    Sort.Direction direction = "desc".equals(dir) ? Sort.Direction.DESC : Sort.Direction.ASC;
    Pageable pageable = PageRequest.of(page, 10, Sort.by(direction, sort));
    
    return service.findAll(pageable, Specification.where(null), ProductResponse.class);
}
`);
</script>