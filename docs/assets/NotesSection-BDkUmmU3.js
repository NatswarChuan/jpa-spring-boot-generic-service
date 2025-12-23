import{_ as r}from"./CodeBlock-BkvZVepJ.js";import{r as i,c as u,o as b,a as g,b as e,e as o,d as s}from"./index-BT1pOG7q.js";const v={id:"notes",class:"scroll-mt-20 mb-16"},f={id:"notes-troubleshooting",class:"mb-10 scroll-mt-24"},h={class:"bg-white border border-slate-200 rounded-lg p-6 shadow-sm mb-6"},x={class:"space-y-4"},y={class:"p-4 bg-slate-50 rounded border border-slate-200"},S={class:"p-4 bg-slate-50 rounded border border-slate-200"},P={class:"bg-white border border-slate-200 rounded-lg p-6 shadow-sm"},T={class:"space-y-6"},C={class:"p-4 bg-orange-50 rounded border border-orange-200"},k={id:"notes-advanced",class:"mb-10 scroll-mt-24"},L={class:"space-y-6"},w={class:"bg-indigo-50 p-6 rounded-lg border-l-4 border-indigo-500 shadow-sm"},E={class:"bg-pink-50 p-6 rounded-lg border-l-4 border-pink-500 shadow-sm"},D={class:"space-y-4"},O={class:"bg-emerald-50 p-6 rounded-lg border-l-4 border-emerald-500 shadow-sm"},j={__name:"NotesSection",setup(R){const a=i(`package com.example.demo.repository;

import com.example.demo.entity.Product;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    @Override
    @EntityGraph(attributePaths = {"brand", "category", "model"}) 
    List<Product> findAll();
}
`),n=i(`// Trong ProductController / Service
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
`),l=i(`package com.example.demo.entity;

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
`),d=i(`@Service
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
`),c=i(`public abstract class BaseAppService<E extends BaseEntity, ID> 
    extends AbService<E, ID> {
    
    @Override
    public void delete(ID id) {
        E entity = findById(id);
        entity.setDeleted(true); // Logic xóa mềm
        repository.save(entity);
    }
}
`),p=i(`@MappedSuperclass
@SQLDelete(sql = "UPDATE {table_name} SET deleted = true WHERE id = ?")
// Hibernate <= 6.2 dùng @Where(clause = "deleted = false")
@SQLRestriction("deleted = false") // Hibernate 6.3+
@Getter @Setter
public abstract class BaseEntity {
    @Column(name = "deleted", nullable = false)
    private boolean deleted = false;
}
`),m=i(`// 1. Request Param hỗ trợ filter đa dạng
public class ProductFilterParam extends BaseRequestParam {
    private Double minPrice;
    private Double maxPrice;
    private String brandName;
}

// 2. Specification xử lý Join và Range
public class ProductSpecification extends GenericSpecification<Product> {
    private final ProductFilterParam param;

    public ProductSpecification(ProductFilterParam param) {
        super(param);
        this.param = param;
    }

    @Override
    public Predicate toPredicate(Root<Product> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
        List<Predicate> predicates = new ArrayList<>();
        // Tận dụng logic search cơ bản của framework
        predicates.add(super.toPredicate(root, query, cb));

        if (param.getMinPrice() != null) 
            predicates.add(cb.greaterThanOrEqualTo(root.get("price"), param.getMinPrice()));
            
        if (param.getBrandName() != null) {
            Join<Product, Brand> brand = root.join("brand", JoinType.INNER);
            predicates.add(cb.like(cb.lower(brand.get("name")), "%" + param.getBrandName().toLowerCase() + "%"));
        }

        return cb.and(predicates.toArray(new Predicate[0]));
    }
}
`);return(q,t)=>(b(),u("section",v,[t[18]||(t[18]=g('<h2 class="text-3xl font-bold text-slate-900 border-b pb-4 mb-8">12. Important Notes</h2><p class="text-slate-600 mb-6 italic">Các lưu ý quan trọng để sử dụng framework hiệu quả và tránh các lỗi thường gặp.</p><article id="notes-best-practices" class="mb-10 scroll-mt-24"><h3 class="text-xl font-bold text-slate-800 mb-3">12.1. Best Practices</h3><div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"><div class="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500 shadow-sm"><h4 class="text-lg font-bold text-blue-800 mb-2"><i class="fas fa-exclamation-triangle mr-2"></i>DTO Constructor </h4><p class="text-sm text-blue-700"> Tất cả DTO bắt buộc phải có <strong>Public No-Args Constructor</strong> để Reflection hoạt động. </p></div><div class="bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-500 shadow-sm"><h4 class="text-lg font-bold text-yellow-800 mb-2"><i class="fas fa-code-branch mr-2"></i>Override Method </h4><ul class="text-sm text-yellow-800 list-disc list-inside"><li><strong>CreateReq:</strong> override <code>toEntity()</code></li><li><strong>UpdateReq:</strong> override <code>updateEntity()</code></li><li><strong>Response:</strong> override <code>fromEntity()</code></li></ul></div></div><div class="bg-white border border-slate-200 rounded-lg p-6 shadow-sm mb-6"><h4 class="text-lg font-bold text-slate-800 mb-3"><i class="fas fa-lightbulb text-yellow-500 mr-2"></i>Optimization Tips</h4><ul class="list-disc list-inside text-slate-600 space-y-2"><li>Đánh index cho các cột <code>@JoinColumn</code>.</li><li>Luôn dùng <code>FetchType.LAZY</code> cho quan hệ To-Many.</li></ul></div></article>',3)),e("article",f,[t[5]||(t[5]=e("h3",{class:"text-xl font-bold text-slate-800 mb-3"},"12.2. Troubleshooting",-1)),e("div",h,[t[2]||(t[2]=e("h4",{class:"text-lg font-bold text-slate-800 mb-3 text-red-600"},[e("i",{class:"fas fa-bug mr-2"}),o("Vấn đề N+1 Query")],-1)),e("div",x,[e("div",y,[t[0]||(t[0]=e("h5",{class:"font-bold text-slate-700 mb-2 text-sm"},"Cách 1: Sử dụng EntityGraph",-1)),s(r,{filename:"UserRepository.java",code:a.value},null,8,["code"])]),e("div",S,[t[1]||(t[1]=e("h5",{class:"font-bold text-slate-700 mb-2 text-sm"},"Cách 2: Sử dụng Specification fetch",-1)),s(r,{filename:"UserController.java",code:n.value},null,8,["code"])])])]),e("div",P,[t[4]||(t[4]=e("h4",{class:"text-lg font-bold text-slate-800 mb-3 text-orange-600"},[e("i",{class:"fas fa-weight-hanging mr-2"}),o("Vấn đề Over-fetching (Lấy dư dữ liệu) ")],-1)),e("div",T,[e("div",C,[t[3]||(t[3]=e("h5",{class:"font-bold text-orange-800 mb-2 text-sm"}," Tách bảng vật lý (OneToOne Lazy) ",-1)),s(r,{filename:"User.java",code:l.value},null,8,["code"])])])])]),e("article",k,[t[16]||(t[16]=e("h3",{class:"text-xl font-bold text-slate-800 mb-3"},"12.3. Advanced Usage Patterns",-1)),t[17]||(t[17]=e("p",{class:"text-slate-600 mb-6"},"Tận dụng tối đa sức mạnh của kế thừa và generic để xây dựng hệ thống linh hoạt.",-1)),e("div",L,[e("div",w,[t[6]||(t[6]=e("h4",{class:"text-lg font-bold text-indigo-800 mb-2"},[e("i",{class:"fas fa-layer-group mr-2"}),o("Composite Service (Aggregator) ")],-1)),t[7]||(t[7]=e("p",{class:"text-sm text-indigo-700 mb-4"},' Đừng cố nhồi nhét mọi thứ vào một Generic Service. Hãy tạo một Service "Điều phối" (Aggregator) để gọi nhiều Service generic khác nhau. ',-1)),s(r,{filename:"OrderService.java",code:d.value},null,8,["code"])]),e("div",E,[t[12]||(t[12]=e("h4",{class:"text-lg font-bold text-pink-800 mb-2"},[e("i",{class:"fas fa-trash-restore mr-2"}),o("Global Soft Delete Logic ")],-1)),t[13]||(t[13]=e("p",{class:"text-sm text-pink-700 mb-4"}," Triển khai xóa mềm (không xóa vật lý khỏi DB) theo hai cách phổ biến: ",-1)),e("div",D,[e("div",null,[t[8]||(t[8]=e("h5",{class:"font-bold text-pink-900 mb-2 text-sm"},"Cách 1: Override tại Service Layer",-1)),t[9]||(t[9]=e("p",{class:"text-xs text-pink-600 mb-2"},"Phù hợp khi bạn muốn kiểm soát logic xóa tập trung tại Service.",-1)),s(r,{filename:"BaseAppService.java",code:c.value},null,8,["code"])]),e("div",null,[t[10]||(t[10]=e("h5",{class:"font-bold text-pink-900 mb-2 text-sm"},"Cách 2: Sử dụng Hibernate Annotation tại Entity",-1)),t[11]||(t[11]=e("p",{class:"text-xs text-pink-600 mb-2"},"Trong suốt (transparent), tự động áp dụng cho tất cả các câu query (Find, List, v.v.).",-1)),s(r,{filename:"BaseEntity.java",code:p.value},null,8,["code"])])])]),e("div",O,[t[14]||(t[14]=e("h4",{class:"text-lg font-bold text-emerald-800 mb-2"},[e("i",{class:"fas fa-filter mr-2"}),o("Complex Dynamic Filtering (Full Spec) ")],-1)),t[15]||(t[15]=e("p",{class:"text-sm text-emerald-700 mb-4"},[o(" Khi cần lọc nâng cao (khoảng giá, join bảng phức tạp), hãy kết hợp "),e("code",null,"Custom Param"),o(" và "),e("code",null,"Custom Specification"),o(". ")],-1)),s(r,{filename:"FilteringImplementation.java",code:m.value},null,8,["code"])])])])]))}};export{j as default};
