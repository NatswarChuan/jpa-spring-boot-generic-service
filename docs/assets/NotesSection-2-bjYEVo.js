import{u as g,e as i,c as _,o as f,a as e,t as o,b as r,f as n}from"./index-tzEnmmga.js";import{_ as a}from"./CodeBlock-43NKrjhX.js";const h={id:"notes",class:"scroll-mt-20 mb-16"},x={class:"text-3xl font-bold text-slate-900 border-b pb-4 mb-8"},y={class:"text-slate-600 mb-6 italic"},$={id:"notes-modularity",class:"mb-10 scroll-mt-24"},S={class:"text-xl font-bold text-slate-800 mb-3"},P=["innerHTML"],L={class:"grid grid-cols-1 md:grid-cols-2 gap-6"},T={class:"bg-white border border-slate-200 rounded-lg p-5 shadow-sm hover:border-blue-400 transition-colors"},C={class:"font-bold text-slate-800 mb-2 flex items-center"},w=["innerHTML"],R={href:"#controller-traits",class:"text-xs font-bold text-blue-600 hover:underline"},M={class:"bg-white border border-slate-200 rounded-lg p-5 shadow-sm hover:border-amber-400 transition-colors"},H={class:"font-bold text-slate-800 mb-2 flex items-center"},D=["innerHTML"],k={href:"#core-service",class:"text-xs font-bold text-amber-600 hover:underline"},I={id:"notes-advanced",class:"mb-10 scroll-mt-24"},E={class:"text-xl font-bold text-slate-800 mb-3"},B={class:"text-slate-600 mb-6"},j={class:"space-y-6"},q={class:"bg-indigo-50 p-6 rounded-lg border-l-4 border-indigo-500 shadow-sm"},A={class:"text-lg font-bold text-indigo-800 mb-2"},O={class:"text-sm text-indigo-700 mb-4"},F={class:"bg-pink-50 p-6 rounded-lg border-l-4 border-pink-500 shadow-sm"},N={class:"text-lg font-bold text-pink-800 mb-2"},J={class:"text-sm text-pink-700 mb-4"},U={class:"space-y-4"},V={class:"font-bold text-pink-900 mb-2 text-sm"},G={class:"text-xs text-pink-600 mb-2"},z={class:"font-bold text-pink-900 mb-2 text-sm"},Q={class:"text-xs text-pink-600 mb-2"},W={class:"bg-emerald-50 p-6 rounded-lg border-l-4 border-emerald-500 shadow-sm"},X={class:"text-lg font-bold text-emerald-800 mb-2"},Y=["innerHTML"],Z={id:"notes-best-practices",class:"mb-10 scroll-mt-24"},K={class:"text-xl font-bold text-slate-800 mb-3"},ee={class:"grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"},te={class:"bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500 shadow-sm"},se={class:"text-lg font-bold text-blue-800 mb-2"},oe=["innerHTML"],re={class:"bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-500 shadow-sm"},le={class:"text-lg font-bold text-yellow-800 mb-2"},ie={class:"text-sm text-yellow-800 list-disc list-inside"},ne=["innerHTML"],ae=["innerHTML"],de=["innerHTML"],ce={class:"bg-white border border-slate-200 rounded-lg p-6 shadow-sm mb-6"},pe={class:"text-lg font-bold text-slate-800 mb-3"},ue={class:"list-disc list-inside text-slate-600 space-y-2"},be=["innerHTML"],me=["innerHTML"],ve={id:"notes-troubleshooting",class:"mb-10 scroll-mt-24"},ge={class:"text-xl font-bold text-slate-800 mb-3"},_e={class:"bg-white border border-slate-200 rounded-lg p-6 shadow-sm mb-6"},fe={class:"text-lg font-bold text-slate-800 mb-3 text-red-600"},he={class:"space-y-4"},xe={class:"p-4 bg-slate-50 rounded border border-slate-200"},ye={class:"font-bold text-slate-700 mb-2 text-sm"},$e={class:"p-4 bg-slate-50 rounded border border-slate-200"},Se={class:"font-bold text-slate-700 mb-2 text-sm"},Pe={class:"bg-white border border-slate-200 rounded-lg p-6 shadow-sm"},Le={class:"text-lg font-bold text-slate-800 mb-3 text-orange-600"},Te={class:"space-y-6"},Ce={class:"p-4 bg-orange-50 rounded border border-orange-200"},we={class:"font-bold text-orange-800 mb-2 text-sm"},De={__name:"NotesSection",setup(Re){const{t:l}=g();i(()=>`@RestController
@RequestMapping("/api/v1/public/products")
public class ProductPublicController implements 
    IReadController<Product, Long>, ${l("notes.code.trait_read")}
    IBaseController<Product, Long>  ${l("notes.code.trait_base")}
{
    private final ProductService service;

    ${l("notes.code.inject_service")}
    public ProductPublicController(ProductService service) {
        this.service = service;
    }

    @Override
    public IService<Product, Long> getService() {
        return service;
    }
}
`),i(()=>`@RestController
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
`),i(()=>`@Service
public class ProductViewService extends AbReadDetailService<Product, Long> {
    public ProductViewService(ProductRepository repo) {
        super(repo);
    }
    ${l("notes.code.only_methods")}
    ${l("notes.code.no_methods")}
}
`),i(()=>`@Service
public class ConfigurationService extends AbUpdateService<Config, String> {
    public ConfigurationService(ConfigRepository repo) {
        super(repo);
    }
    ${l("notes.code.has_methods")}
    ${l("notes.code.no_delete")}
}
`);const d=i(()=>`package com.example.demo.repository;

import com.example.demo.entity.Product;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    @Override
    @EntityGraph(attributePaths = {"brand", "category", "model"}) 
    List<Product> findAll();
}
`),c=i(()=>`// Trong ProductController / Service
import com.example.demo.entity.Product;
import com.example.demo.dto.res.ProductResponse;
import jakarta.persistence.criteria.JoinType;
import org.springframework.data.jpa.domain.Specification;

// ...
Specification<Product> spec = (root, query, cb) -> {
    ${l("notes.code.only_fetch")}
    if (query.getResultType() != Long.class && query.getResultType() != long.class) {
        root.fetch("brand", JoinType.LEFT);
        root.fetch("category", JoinType.LEFT);
    }
    return null; 
};
service.findAll(page, size, spec, ProductResponse.class);
`),p=i(()=>`package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "products")
@Data
public class Product {
    @Id private Long id;
    private String name;

    ${l("notes.code.split_column")}
    ${l("notes.code.important_fetch")}
    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL, optional = false)
    @JoinColumn(name = "detail_id")
    private ProductDescription detail;
}

@Entity
@Table(name = "product_details")
@Data
public class ProductDescription {
    @Id private Long id;
    @Lob private String fullDescriptionHTML; ${l("notes.code.heavy_column")}
    @Column(columnDefinition="TEXT") private String technicalSpecs;
}
`),u=i(()=>`@Service
public class OrderService {
    private final ProductService productService;
    private final CustomerService customerService;
    private final InventoryService inventoryService;

    @Transactional
    public void createOrder(OrderReq req) {
        ${l("notes.code.use_findbyid")}
        Product p = productService.findById(req.getProductId());
        Customer c = customerService.findById(req.getCustomerId());
        
        ${l("notes.code.business_logic")}
    }
}
`),b=i(()=>`public abstract class BaseAppService<E extends BaseEntity, ID> 
    extends AbService<E, ID> {
    
    @Override
    public void delete(ID id) {
        E entity = findById(id);
        entity.setDeleted(true); ${l("notes.code.soft_delete_logic")}
        repository.save(entity);
    }
}
`),m=i(()=>`@MappedSuperclass
@SQLDelete(sql = "UPDATE {table_name} SET deleted = true WHERE id = ?")
// Hibernate <= 6.2 dùng @Where(clause = "deleted = false")
@SQLRestriction("deleted = false") // Hibernate 6.3+
@Getter @Setter
public abstract class BaseEntity {
    @Column(name = "deleted", nullable = false)
    private boolean deleted = false;
}
`),v=i(()=>`${l("notes.code.param_filter")}
public class ProductFilterParam extends BaseRequestParam {
    private Double minPrice;
    private Double maxPrice;
    private String brandName;
}

${l("notes.code.spec_join")}
public class ProductSpecification extends GenericSpecification<Product> {
    private final ProductFilterParam param;

    public ProductSpecification(ProductFilterParam param) {
        super(param);
        this.param = param;
    }

    @Override
    public Predicate toPredicate(Root<Product> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
        List<Predicate> predicates = new ArrayList<>();
        ${l("notes.code.leverage_search")}
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
`);return(t,s)=>(f(),_("section",h,[e("h2",x,o(t.$t("notes.title")),1),e("p",y,o(t.$t("notes.subtitle")),1),e("article",$,[e("h3",S,[s[0]||(s[0]=e("span",{class:"bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm mr-3"},"13.1",-1)),r(" "+o(t.$t("notes.modularity.title")),1)]),e("p",{class:"text-slate-600 mb-6",innerHTML:t.$t("notes.modularity.desc")},null,8,P),e("div",L,[e("div",T,[e("h4",C,[s[1]||(s[1]=e("i",{class:"fas fa-gamepad text-blue-600 mr-2"},null,-1)),r(" "+o(t.$t("notes.modularity.controller_title")),1)]),e("p",{class:"text-sm text-slate-600 mb-4",innerHTML:t.$t("notes.modularity.controller_desc")},null,8,w),s[3]||(s[3]=e("div",{class:"bg-slate-50 p-3 rounded text-xs font-mono text-slate-700 mb-3 border border-slate-200"},[r(" public class MyCtrl implements "),e("span",{class:"font-bold text-blue-600"},"IReadController"),r(", "),e("span",{class:"font-bold text-purple-600"},"ICreateController"),r(" {...} ")],-1)),e("a",R,[r(o(t.$t("notes.modularity.controller_link"))+" ",1),s[2]||(s[2]=e("i",{class:"fas fa-arrow-right ml-1"},null,-1))])]),e("div",M,[e("h4",H,[s[4]||(s[4]=e("i",{class:"fas fa-cogs text-amber-600 mr-2"},null,-1)),r(" "+o(t.$t("notes.modularity.service_title")),1)]),e("p",{class:"text-sm text-slate-600 mb-4",innerHTML:t.$t("notes.modularity.service_desc")},null,8,D),s[6]||(s[6]=e("div",{class:"bg-slate-50 p-3 rounded text-xs font-mono text-slate-700 mb-3 border border-slate-200"},[r(" public class MyService extends "),e("span",{class:"font-bold text-amber-600"},"AbReadDetailService"),r(" {...} ")],-1)),e("a",k,[r(o(t.$t("notes.modularity.service_link"))+" ",1),s[5]||(s[5]=e("i",{class:"fas fa-arrow-right ml-1"},null,-1))])])])]),e("article",I,[e("h3",E,[s[7]||(s[7]=e("span",{class:"bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm mr-3"},"13.2",-1)),r(" "+o(t.$t("notes.advanced.title")),1)]),e("p",B,o(t.$t("notes.advanced.desc")),1),e("div",j,[e("div",q,[e("h4",A,[s[8]||(s[8]=e("i",{class:"fas fa-layer-group mr-2"},null,-1)),r(o(t.$t("notes.advanced.composite.title")),1)]),e("p",O,o(t.$t("notes.advanced.composite.desc")),1),n(a,{filename:"OrderService.java",code:u.value},null,8,["code"])]),e("div",F,[e("h4",N,[s[9]||(s[9]=e("i",{class:"fas fa-trash-restore mr-2"},null,-1)),r(o(t.$t("notes.advanced.soft_delete.title")),1)]),e("p",J,o(t.$t("notes.advanced.soft_delete.desc")),1),e("div",U,[e("div",null,[e("h5",V,o(t.$t("notes.advanced.soft_delete.method1_title")),1),e("p",G,o(t.$t("notes.advanced.soft_delete.method1_desc")),1),n(a,{filename:"BaseAppService.java",code:b.value},null,8,["code"])]),e("div",null,[e("h5",z,o(t.$t("notes.advanced.soft_delete.method2_title")),1),e("p",Q,o(t.$t("notes.advanced.soft_delete.method2_desc")),1),n(a,{filename:"BaseEntity.java",code:m.value},null,8,["code"])])])]),e("div",W,[e("h4",X,[s[10]||(s[10]=e("i",{class:"fas fa-filter mr-2"},null,-1)),r(o(t.$t("notes.advanced.filter.title")),1)]),e("p",{class:"text-sm text-emerald-700 mb-4",innerHTML:t.$t("notes.advanced.filter.desc")},null,8,Y),n(a,{filename:"FilteringImplementation.java",code:v.value},null,8,["code"])])])]),e("article",Z,[e("h3",K,[s[11]||(s[11]=e("span",{class:"bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm mr-3"},"13.3",-1)),r(" "+o(t.$t("notes.best_practices.title")),1)]),e("div",ee,[e("div",te,[e("h4",se,[s[12]||(s[12]=e("i",{class:"fas fa-exclamation-triangle mr-2"},null,-1)),r(o(t.$t("notes.best_practices.constructor_title")),1)]),e("p",{class:"text-sm text-blue-700",innerHTML:t.$t("notes.best_practices.constructor_desc")},null,8,oe)]),e("div",re,[e("h4",le,[s[13]||(s[13]=e("i",{class:"fas fa-code-branch mr-2"},null,-1)),r(o(t.$t("notes.best_practices.override_title")),1)]),e("ul",ie,[e("li",{innerHTML:t.$t("notes.best_practices.override_create")},null,8,ne),e("li",{innerHTML:t.$t("notes.best_practices.override_update")},null,8,ae),e("li",{innerHTML:t.$t("notes.best_practices.override_res")},null,8,de)])])]),e("div",ce,[e("h4",pe,[s[14]||(s[14]=e("i",{class:"fas fa-lightbulb text-yellow-500 mr-2"},null,-1)),r(o(t.$t("notes.best_practices.optimization_title")),1)]),e("ul",ue,[e("li",{innerHTML:t.$t("notes.best_practices.opt_index")},null,8,be),e("li",{innerHTML:t.$t("notes.best_practices.opt_lazy")},null,8,me)])])]),e("article",ve,[e("h3",ge,[s[15]||(s[15]=e("span",{class:"bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm mr-3"},"13.4",-1)),r(" "+o(t.$t("notes.troubleshooting.title")),1)]),e("div",_e,[e("h4",fe,[s[16]||(s[16]=e("i",{class:"fas fa-bug mr-2"},null,-1)),r(o(t.$t("notes.troubleshooting.n1_title")),1)]),e("div",he,[e("div",xe,[e("h5",ye,o(t.$t("notes.troubleshooting.n1_method1")),1),n(a,{filename:"UserRepository.java",code:d.value},null,8,["code"])]),e("div",$e,[e("h5",Se,o(t.$t("notes.troubleshooting.n1_method2")),1),n(a,{filename:"UserController.java",code:c.value},null,8,["code"])])])]),e("div",Pe,[e("h4",Le,[s[17]||(s[17]=e("i",{class:"fas fa-weight-hanging mr-2"},null,-1)),r(o(t.$t("notes.troubleshooting.over_fetching_title")),1)]),e("div",Te,[e("div",Ce,[e("h5",we,o(t.$t("notes.troubleshooting.over_fetching_method")),1),n(a,{filename:"User.java",code:p.value},null,8,["code"])])])])])]))}};export{De as default};
