<template>
  <section id="usage" class="scroll-mt-20 mb-16">
    <h2 class="text-3xl font-bold text-slate-900 border-b pb-4 mb-8">3. Hướng dẫn sử dụng (DTO Pattern)</h2>
    
    <article id="usage-3-1" class="mb-10 scroll-mt-24">
      <h3 class="text-xl font-bold text-slate-800 mb-3">3.1. Request DTO (Create/Update)</h3>
      <p class="text-slate-600 mb-3">Tách biệt DTO tạo mới và cập nhật để kiểm soát dữ liệu đầu vào.</p>
      <CodeBlock filename="ProductCreateReq.java" :code="createReqCode" />
      <CodeBlock filename="ProductUpdateReq.java" :code="updateReqCode" />
    </article>

    <article id="usage-3-2" class="mb-10 scroll-mt-24">
      <h3 class="text-xl font-bold text-slate-800 mb-3">3.2. Response DTO</h3>
      <p class="text-slate-600 mb-3">Dữ liệu trả về cho client. Cần override <code>fromEntity</code>.</p>
      <CodeBlock filename="ProductResponse.java" :code="resCode" />
    </article>

    <article id="usage-3-3" class="mb-10 scroll-mt-24">
      <h3 class="text-xl font-bold text-slate-800 mb-3">3.3. Controller Injection</h3>
      <p class="text-slate-600 mb-3">Inject Interface thay vì Class Implementation.</p>
      <CodeBlock filename="ProductController.java" :code="ctrlCode" />
    </article>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import CodeBlock from '../CodeBlock.vue';

const createReqCode = ref(`
@Data
@NoArgsConstructor
public class ProductCreateReq implements IDto<Product> {
    private String name;
    private Double price;

    @Override
    public Product toEntity() {
        Product p = new Product();
        p.setName(this.name);
        p.setPrice(this.price);
        return p;
    }
}
`);

const updateReqCode = ref(`
@Data
@NoArgsConstructor
public class ProductUpdateReq implements IDto<Product> {
    private String name;
    private Double price;

    @Override
    public Product updateEntity(Product existingEntity) {
        if(this.name != null) existingEntity.setName(this.name);
        if(this.price != null) existingEntity.setPrice(this.price);
        return existingEntity;
    }
}
`);

const resCode = ref(`
@Data
@NoArgsConstructor
public class ProductResponse implements IDto<Product> {
    private Long id;
    private String name;
    private Double price;

    @Override
    public void fromEntity(Product entity) {
        this.id = entity.getId();
        this.name = entity.getName();
        this.price = entity.getPrice();
    }
}
`);

const ctrlCode = ref(`
@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final IProductService service; // Inject Interface

    public ProductController(IProductService service) { 
        this.service = service; 
    }

    @PostMapping
    public ProductResponse create(@RequestBody ProductCreateReq req) {
        return service.create(req, ProductResponse.class);
    }
}
`);
</script>