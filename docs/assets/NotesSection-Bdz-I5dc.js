import{_ as s}from"./CodeBlock-CUrVyKBF.js";import{f as r,c as b,o as g,a,b as e,d as o,e as i}from"./index-ByupLFOq.js";const v={id:"notes",class:"scroll-mt-20 mb-16"},f={id:"notes-advanced",class:"mb-10 scroll-mt-24"},x={class:"space-y-6"},h={class:"bg-indigo-50 p-6 rounded-lg border-l-4 border-indigo-500 shadow-sm"},y={class:"bg-pink-50 p-6 rounded-lg border-l-4 border-pink-500 shadow-sm"},S={class:"space-y-4"},C={class:"bg-emerald-50 p-6 rounded-lg border-l-4 border-emerald-500 shadow-sm"},P={id:"notes-troubleshooting",class:"mb-10 scroll-mt-24"},T={class:"bg-white border border-slate-200 rounded-lg p-6 shadow-sm mb-6"},L={class:"space-y-4"},R={class:"p-4 bg-slate-50 rounded border border-slate-200"},w={class:"p-4 bg-slate-50 rounded border border-slate-200"},k={class:"bg-white border border-slate-200 rounded-lg p-6 shadow-sm"},D={class:"space-y-6"},q={class:"p-4 bg-orange-50 rounded border border-orange-200"},A={__name:"NotesSection",setup(E){r(`@RestController
@RequestMapping("/api/v1/public/products")
public class ProductPublicController implements 
    IReadController<Product, Long>, // 1. Trait Read
    IBaseController<Product, Long>  // 2. Base
{
    private final ProductService service;

    // Inject Service (có thể là ReadOnlyService)
    public ProductPublicController(ProductService service) {
        this.service = service;
    }

    @Override
    public IService<Product, Long> getService() {
        return service;
    }
}
`),r(`@RestController
@RequestMapping("/api/v1/logs")
public class AuditLogController implements 
    ICreateController<Log, String, LogCreateReq> {
    
    private final LogService service;
    
    // ... Constructor & getService()
    
    @Override
    public <R extends IDto<Log>> Class<R> getResponseDetailDtoClass() {
        return (Class<R>) LogResponse.class;
    }
}
`),r(`@Service
public class ProductViewService extends AbReadDetailService<Product, Long> {
    public ProductViewService(ProductRepository repo) {
        super(repo);
    }
    // Chỉ có các method: findById, findAll, findOne...
    // Không có: create, update, delete
}
`),r(`@Service
public class ConfigurationService extends AbUpdateService<Config, String> {
    public ConfigurationService(ConfigRepository repo) {
        super(repo);
    }
    // Có: create, update, save, find...
    // KHÔNG CÓ: delete
}
`);const l=r(`package com.example.demo.repository;

import com.example.demo.entity.Product;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    @Override
    @EntityGraph(attributePaths = {"brand", "category", "model"}) 
    List<Product> findAll();
}
`),n=r(`// Trong ProductController / Service
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
`),d=r(`package com.example.demo.entity;

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
`),c=r(`@Service
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
`),p=r(`public abstract class BaseAppService<E extends BaseEntity, ID> 
    extends AbService<E, ID> {
    
    @Override
    public void delete(ID id) {
        E entity = findById(id);
        entity.setDeleted(true); // Logic xóa mềm
        repository.save(entity);
    }
}
`),u=r(`@MappedSuperclass
@SQLDelete(sql = "UPDATE {table_name} SET deleted = true WHERE id = ?")
// Hibernate <= 6.2 dùng @Where(clause = "deleted = false")
@SQLRestriction("deleted = false") // Hibernate 6.3+
@Getter @Setter
public abstract class BaseEntity {
    @Column(name = "deleted", nullable = false)
    private boolean deleted = false;
}
`),m=r(`// 1. Request Param hỗ trợ filter đa dạng
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
`);return(I,t)=>(g(),b("section",v,[t[18]||(t[18]=a('<h2 class="text-3xl font-bold text-slate-900 border-b pb-4 mb-8">13. Lưu ý Quan trọng</h2><p class="text-slate-600 mb-6 italic">Các lưu ý quan trọng để sử dụng framework hiệu quả và tránh các lỗi thường gặp.</p><article id="notes-modularity" class="mb-10 scroll-mt-24"><h3 class="text-xl font-bold text-slate-800 mb-3"><span class="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm mr-3">13.1</span> Chiến lược Module hóa </h3><p class="text-slate-600 mb-6"> Thay vì tạo ra các &quot;God Class&quot; khổng lồ, hãy áp dụng chiến lược <strong>&quot;Right-sizing&quot;</strong> (dùng đủ chức năng) cho cả Controller và Service. </p><div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div class="bg-white border border-slate-200 rounded-lg p-5 shadow-sm hover:border-blue-400 transition-colors"><h4 class="font-bold text-slate-800 mb-2 flex items-center"><i class="fas fa-gamepad text-blue-600 mr-2"></i> Controller Layer </h4><p class="text-sm text-slate-600 mb-4"> Dùng cơ chế <strong>Traits (Interface)</strong> để lắp ghép API. </p><div class="bg-slate-50 p-3 rounded text-xs font-mono text-slate-700 mb-3 border border-slate-200"> public class MyCtrl implements <span class="font-bold text-blue-600">IReadController</span>, <span class="font-bold text-purple-600">ICreateController</span> {...} </div><a href="#controller-traits" class="text-xs font-bold text-blue-600 hover:underline"> Xem Menu Traits tại Section 8.3 <i class="fas fa-arrow-right ml-1"></i></a></div><div class="bg-white border border-slate-200 rounded-lg p-5 shadow-sm hover:border-amber-400 transition-colors"><h4 class="font-bold text-slate-800 mb-2 flex items-center"><i class="fas fa-cogs text-amber-600 mr-2"></i> Service Layer </h4><p class="text-sm text-slate-600 mb-4"> Chọn đúng <strong>Base Class</strong> để giới hạn quyền truy cập DB. </p><div class="bg-slate-50 p-3 rounded text-xs font-mono text-slate-700 mb-3 border border-slate-200"> public class MyService extends <span class="font-bold text-amber-600">AbReadDetailService</span> {...} </div><a href="#core-service" class="text-xs font-bold text-amber-600 hover:underline"> Xem Base Class Selector tại Section 7.1 <i class="fas fa-arrow-right ml-1"></i></a></div></div></article>',3)),e("article",f,[t[10]||(t[10]=e("h3",{class:"text-xl font-bold text-slate-800 mb-3"},[e("span",{class:"bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm mr-3"},"13.2"),o(" Mẫu Sử dụng Nâng cao ")],-1)),t[11]||(t[11]=e("p",{class:"text-slate-600 mb-6"},"Tận dụng tối đa sức mạnh của kế thừa và generic để xây dựng hệ thống linh hoạt.",-1)),e("div",x,[e("div",h,[t[0]||(t[0]=e("h4",{class:"text-lg font-bold text-indigo-800 mb-2"},[e("i",{class:"fas fa-layer-group mr-2"}),o("Composite Service (Aggregator) ")],-1)),t[1]||(t[1]=e("p",{class:"text-sm text-indigo-700 mb-4"},' Đừng cố nhồi nhét mọi thứ vào một Generic Service. Hãy tạo một Service "Điều phối" (Aggregator) để gọi nhiều Service generic khác nhau. ',-1)),i(s,{filename:"OrderService.java",code:c.value},null,8,["code"])]),e("div",y,[t[6]||(t[6]=e("h4",{class:"text-lg font-bold text-pink-800 mb-2"},[e("i",{class:"fas fa-trash-restore mr-2"}),o("Global Soft Delete Logic ")],-1)),t[7]||(t[7]=e("p",{class:"text-sm text-pink-700 mb-4"}," Triển khai xóa mềm (không xóa vật lý khỏi DB) theo hai cách phổ biến: ",-1)),e("div",S,[e("div",null,[t[2]||(t[2]=e("h5",{class:"font-bold text-pink-900 mb-2 text-sm"},"Cách 1: Override tại Service Layer",-1)),t[3]||(t[3]=e("p",{class:"text-xs text-pink-600 mb-2"},"Phù hợp khi bạn muốn kiểm soát logic xóa tập trung tại Service.",-1)),i(s,{filename:"BaseAppService.java",code:p.value},null,8,["code"])]),e("div",null,[t[4]||(t[4]=e("h5",{class:"font-bold text-pink-900 mb-2 text-sm"},"Cách 2: Sử dụng Hibernate Annotation tại Entity",-1)),t[5]||(t[5]=e("p",{class:"text-xs text-pink-600 mb-2"},"Trong suốt (transparent), tự động áp dụng cho tất cả các câu query (Find, List, v.v.).",-1)),i(s,{filename:"BaseEntity.java",code:u.value},null,8,["code"])])])]),e("div",C,[t[8]||(t[8]=e("h4",{class:"text-lg font-bold text-emerald-800 mb-2"},[e("i",{class:"fas fa-filter mr-2"}),o("Complex Dynamic Filtering (Full Spec) ")],-1)),t[9]||(t[9]=e("p",{class:"text-sm text-emerald-700 mb-4"},[o(" Khi cần lọc nâng cao (khoảng giá, join bảng phức tạp), hãy kết hợp "),e("code",null,"Custom Param"),o(" và "),e("code",null,"Custom Specification"),o(". ")],-1)),i(s,{filename:"FilteringImplementation.java",code:m.value},null,8,["code"])])])]),t[19]||(t[19]=a('<article id="notes-best-practices" class="mb-10 scroll-mt-24"><h3 class="text-xl font-bold text-slate-800 mb-3"><span class="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm mr-3">13.3</span> Thực hành Tốt nhất </h3><div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"><div class="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500 shadow-sm"><h4 class="text-lg font-bold text-blue-800 mb-2"><i class="fas fa-exclamation-triangle mr-2"></i>DTO Constructor </h4><p class="text-sm text-blue-700"> Tất cả DTO bắt buộc phải có <strong>Public No-Args Constructor</strong> để Reflection hoạt động. </p></div><div class="bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-500 shadow-sm"><h4 class="text-lg font-bold text-yellow-800 mb-2"><i class="fas fa-code-branch mr-2"></i>Override Method </h4><ul class="text-sm text-yellow-800 list-disc list-inside"><li><strong>CreateReq:</strong> override <code>toEntity()</code></li><li><strong>UpdateReq:</strong> override <code>updateEntity()</code></li><li><strong>Response:</strong> override <code>fromEntity()</code></li></ul></div></div><div class="bg-white border border-slate-200 rounded-lg p-6 shadow-sm mb-6"><h4 class="text-lg font-bold text-slate-800 mb-3"><i class="fas fa-lightbulb text-yellow-500 mr-2"></i>Mẹo Tối ưu (Optimization Tips)</h4><ul class="list-disc list-inside text-slate-600 space-y-2"><li>Đánh index cho các cột <code>@JoinColumn</code>.</li><li>Luôn dùng <code>FetchType.LAZY</code> cho quan hệ To-Many.</li></ul></div></article>',1)),e("article",P,[t[17]||(t[17]=e("h3",{class:"text-xl font-bold text-slate-800 mb-3"},[e("span",{class:"bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm mr-3"},"13.4"),o(" Xử lý Sự cố ")],-1)),e("div",T,[t[14]||(t[14]=e("h4",{class:"text-lg font-bold text-slate-800 mb-3 text-red-600"},[e("i",{class:"fas fa-bug mr-2"}),o("Vấn đề N+1 Query")],-1)),e("div",L,[e("div",R,[t[12]||(t[12]=e("h5",{class:"font-bold text-slate-700 mb-2 text-sm"},"Cách 1: Sử dụng EntityGraph",-1)),i(s,{filename:"UserRepository.java",code:l.value},null,8,["code"])]),e("div",w,[t[13]||(t[13]=e("h5",{class:"font-bold text-slate-700 mb-2 text-sm"},"Cách 2: Sử dụng Specification fetch",-1)),i(s,{filename:"UserController.java",code:n.value},null,8,["code"])])])]),e("div",k,[t[16]||(t[16]=e("h4",{class:"text-lg font-bold text-slate-800 mb-3 text-orange-600"},[e("i",{class:"fas fa-weight-hanging mr-2"}),o("Vấn đề Over-fetching (Lấy dư dữ liệu) ")],-1)),e("div",D,[e("div",q,[t[15]||(t[15]=e("h5",{class:"font-bold text-orange-800 mb-2 text-sm"}," Tách bảng vật lý (OneToOne Lazy) ",-1)),i(s,{filename:"User.java",code:d.value},null,8,["code"])])])])])]))}};export{A as default};
