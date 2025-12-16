<template>
  <section id="implementation" class="scroll-mt-20 mb-16">
    <h2 class="text-3xl font-bold text-slate-900 border-b pb-4 mb-8">3. Hướng dẫn triển khai</h2>
    <p class="text-slate-600 italic mb-6">Ví dụ minh họa cho module quản lý <strong>Product</strong>.</p>

    <article id="step2-1" class="mb-10 scroll-mt-24">
      <h3 class="text-xl font-bold text-slate-800 mb-3">3.1. Định nghĩa Entity</h3>
      <p class="text-slate-600 mb-3">Ánh xạ với bảng trong database.</p>
      <CodeBlock filename="Product.java" :code="entityCode" />
    </article>

    <article id="step2-2" class="mb-10 scroll-mt-24">
      <h3 class="text-xl font-bold text-slate-800 mb-3">3.2. Tạo Repository</h3>
      <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4 text-sm text-yellow-800">
        <strong>Lưu ý:</strong> Bắt buộc phải extends <code>JpaSpecificationExecutor</code> để hỗ trợ bộ lọc nâng cao.
      </div>
      <CodeBlock filename="ProductRepository.java" :code="repoCode" />
    </article>

    <article id="step2-3" class="mb-10 scroll-mt-24">
      <h3 class="text-xl font-bold text-slate-800 mb-3">3.3. Tạo Service Interface</h3>
      <p class="text-slate-600 mb-3">Kế thừa từ <code>IService</code> để có sẵn hợp đồng CRUD.</p>
      <CodeBlock filename="IProductService.java" :code="interfaceCode" />
    </article>

    <article id="step2-4" class="mb-10 scroll-mt-24">
      <h3 class="text-xl font-bold text-slate-800 mb-3">3.4. Tạo Service Implementation</h3>
      <p class="text-slate-600 mb-3">Kế thừa <code>AbService</code> để tái sử dụng logic.</p>
      <CodeBlock filename="ProductServiceImpl.java" :code="implCode" />
    </article>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import CodeBlock from '../CodeBlock.vue';

const entityCode = ref(`
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

const repoCode = ref(`
@Repository
public interface ProductRepository extends JpaRepository<Product, Long>, 
                                           JpaSpecificationExecutor<Product> {
}
`);

const interfaceCode = ref(`
public interface IProductService extends IService<Product, Long> {
    // Định nghĩa thêm hàm riêng nếu cần
}
`);

const implCode = ref(`
@Service
@Transactional
public class ProductServiceImpl extends AbService<Product, Long> implements IProductService {

    @Autowired
    public ProductServiceImpl(ProductRepository repository) {
        super(repository);
    }
}
`);
</script>