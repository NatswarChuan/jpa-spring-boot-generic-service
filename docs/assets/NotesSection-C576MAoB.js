import{_ as s}from"./CodeBlock-BQU6-ZC9.js";import{r,c as p,o as m,a as g,b as e,e as o,d as i}from"./index-D9vsZoXm.js";const b={id:"notes",class:"scroll-mt-20 mb-16"},u={id:"notes-troubleshooting",class:"mb-10 scroll-mt-24"},v={class:"bg-white border border-slate-200 rounded-lg p-6 shadow-sm mb-6"},h={class:"space-y-4"},f={class:"p-4 bg-slate-50 rounded border border-slate-200"},x={class:"p-4 bg-slate-50 rounded border border-slate-200"},y={class:"bg-white border border-slate-200 rounded-lg p-6 shadow-sm"},S={class:"space-y-6"},T={class:"p-4 bg-orange-50 rounded border border-orange-200"},C={id:"notes-advanced",class:"mb-10 scroll-mt-24"},L={class:"space-y-6"},k={class:"bg-indigo-50 p-6 rounded-lg border-l-4 border-indigo-500 shadow-sm"},w={class:"bg-pink-50 p-6 rounded-lg border-l-4 border-pink-500 shadow-sm"},D={__name:"NotesSection",setup(P){const a=r(`package com.example.demo.repository;

import com.example.demo.entity.Product;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    @Override
    @EntityGraph(attributePaths = {"brand", "category", "model"}) 
    List<Product> findAll();
}
`),l=r(`// Trong ProductController / Service
import com.example.demo.entity.Product;
import com.example.demo.dto.res.ProductResponse;
import jakarta.persistence.criteria.JoinType;
import org.springframework.data.jpa.domain.Specification;

// ...
Specification<Product> spec = (root, query, cb) -> {
    // Chỉ fetch khi return type không phải là count (Long)
    if (query.getResultType() != Long.class && query.getResultType() != long.class) {
        root.fetch("brand", JoinType.LEFT);
        root.fetch("category", JoinType.LEFT);
    }
    return null; 
};
service.findAll(page, size, spec, ProductResponse.class);
`),n=r(`package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "products")
@Data
public class Product {
    @Id private Long id;
    private String name;

    // Tách cột nặng sang bảng 'product_details'
    // Quan trọng: fetch = LAZY và optional = false
    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL, optional = false)
    @JoinColumn(name = "detail_id")
    private ProductDescription detail;
}

@Entity
@Table(name = "product_details")
@Data
public class ProductDescription {
    @Id private Long id;
    @Lob private String fullDescriptionHTML; // Cột nặng
    @Column(columnDefinition="TEXT") private String technicalSpecs;
}
`),d=r(`@Service
public class OrderService {
    private final ProductService productService;
    private final CustomerService customerService;
    private final InventoryService inventoryService;

    @Transactional
    public void createOrder(OrderReq req) {
        // Tận dụng findById có sẵn của Generic Service
        Product p = productService.findById(req.getProductId());
        Customer c = customerService.findById(req.getCustomerId());
        
        // Thực hiện logic nghiệp vụ tổng hợp...
    }
}
`),c=r(`public abstract class BaseAppService<E extends BaseEntity, ID> 
    extends AbService<E, ID> {
    
    @Override
    public void delete(ID id) {
        E entity = findById(id);
        entity.setDeleted(true); // Logic xóa mềm
        repository.save(entity);
    }
}
`);return(O,t)=>(m(),p("section",b,[t[12]||(t[12]=g('<h2 class="text-3xl font-bold text-slate-900 border-b pb-4 mb-8">12. Important Notes</h2><p class="text-slate-600 mb-6 italic">Các lưu ý quan trọng để sử dụng framework hiệu quả và tránh các lỗi thường gặp.</p><article id="notes-best-practices" class="mb-10 scroll-mt-24"><h3 class="text-xl font-bold text-slate-800 mb-3">12.1. Best Practices</h3><div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"><div class="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500 shadow-sm"><h4 class="text-lg font-bold text-blue-800 mb-2"><i class="fas fa-exclamation-triangle mr-2"></i>DTO Constructor </h4><p class="text-sm text-blue-700"> Tất cả DTO bắt buộc phải có <strong>Public No-Args Constructor</strong> để Reflection hoạt động. </p></div><div class="bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-500 shadow-sm"><h4 class="text-lg font-bold text-yellow-800 mb-2"><i class="fas fa-code-branch mr-2"></i>Override Method </h4><ul class="text-sm text-yellow-800 list-disc list-inside"><li><strong>CreateReq:</strong> override <code>toEntity()</code></li><li><strong>UpdateReq:</strong> override <code>updateEntity()</code></li><li><strong>Response:</strong> override <code>fromEntity()</code></li></ul></div></div><div class="bg-white border border-slate-200 rounded-lg p-6 shadow-sm mb-6"><h4 class="text-lg font-bold text-slate-800 mb-3"><i class="fas fa-lightbulb text-yellow-500 mr-2"></i>Optimization Tips</h4><ul class="list-disc list-inside text-slate-600 space-y-2"><li>Đánh index cho các cột <code>@JoinColumn</code>.</li><li>Luôn dùng <code>FetchType.LAZY</code> cho quan hệ To-Many.</li></ul></div></article>',3)),e("article",u,[t[5]||(t[5]=e("h3",{class:"text-xl font-bold text-slate-800 mb-3"},"12.2. Troubleshooting",-1)),e("div",v,[t[2]||(t[2]=e("h4",{class:"text-lg font-bold text-slate-800 mb-3 text-red-600"},[e("i",{class:"fas fa-bug mr-2"}),o("Vấn đề N+1 Query")],-1)),e("div",h,[e("div",f,[t[0]||(t[0]=e("h5",{class:"font-bold text-slate-700 mb-2 text-sm"},"Cách 1: Sử dụng EntityGraph",-1)),i(s,{filename:"UserRepository.java",code:a.value},null,8,["code"])]),e("div",x,[t[1]||(t[1]=e("h5",{class:"font-bold text-slate-700 mb-2 text-sm"},"Cách 2: Sử dụng Specification fetch",-1)),i(s,{filename:"UserController.java",code:l.value},null,8,["code"])])])]),e("div",y,[t[4]||(t[4]=e("h4",{class:"text-lg font-bold text-slate-800 mb-3 text-orange-600"},[e("i",{class:"fas fa-weight-hanging mr-2"}),o("Vấn đề Over-fetching (Lấy dư dữ liệu) ")],-1)),e("div",S,[e("div",T,[t[3]||(t[3]=e("h5",{class:"font-bold text-orange-800 mb-2 text-sm"}," Tách bảng vật lý (OneToOne Lazy) ",-1)),i(s,{filename:"User.java",code:n.value},null,8,["code"])])])])]),e("article",C,[t[10]||(t[10]=e("h3",{class:"text-xl font-bold text-slate-800 mb-3"},"12.3. Advanced Usage Patterns",-1)),t[11]||(t[11]=e("p",{class:"text-slate-600 mb-6"},"Tận dụng tối đa sức mạnh của kế thừa và generic để xây dựng hệ thống linh hoạt.",-1)),e("div",L,[e("div",k,[t[6]||(t[6]=e("h4",{class:"text-lg font-bold text-indigo-800 mb-2"},[e("i",{class:"fas fa-layer-group mr-2"}),o("Composite Service (Aggregator) ")],-1)),t[7]||(t[7]=e("p",{class:"text-sm text-indigo-700 mb-4"},' Đừng cố nhồi nhét mọi thứ vào một Generic Service. Hãy tạo một Service "Điều phối" (Aggregator) để gọi nhiều Service generic khác nhau. ',-1)),i(s,{filename:"OrderService.java",code:d.value},null,8,["code"])]),e("div",w,[t[8]||(t[8]=e("h4",{class:"text-lg font-bold text-pink-800 mb-2"},[e("i",{class:"fas fa-trash-restore mr-2"}),o("Global Soft Delete Logic ")],-1)),t[9]||(t[9]=e("p",{class:"text-sm text-pink-700 mb-4"},[o(" Bạn có thể tạo một "),e("code",null,"BaseAppService"),o(" kế thừa "),e("code",null,"AbService"),o(" để triển khai Logic xóa mềm một lần duy nhất cho toàn bộ dự án. ")],-1)),i(s,{filename:"BaseAppService.java",code:c.value},null,8,["code"])])])])]))}};export{D as default};
