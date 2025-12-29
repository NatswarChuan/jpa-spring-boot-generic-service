import{u as _,e as l,c as g,o as f,a as e,t as s,b as i,f as n}from"./index-CYRIV7B9.js";import{_ as a}from"./CodeBlock-BpSeFwgL.js";const h={id:"notes",class:"scroll-mt-20 mb-16"},y={class:"text-3xl font-bold text-slate-900 border-b pb-4 mb-8"},x={class:"text-slate-600 mb-6 italic"},P={id:"notes-modularity",class:"mb-10 scroll-mt-24"},S={class:"text-xl font-bold text-slate-800 mb-3"},L=["innerHTML"],C={class:"grid grid-cols-1 md:grid-cols-2 gap-6"},T={class:"bg-white border border-slate-200 rounded-lg p-5 shadow-sm hover:border-blue-400 transition-colors"},R={class:"font-bold text-slate-800 mb-2 flex items-center"},$=["innerHTML"],w={href:"#controller-traits",class:"text-xs font-bold text-blue-600 hover:underline"},I={class:"bg-white border border-slate-200 rounded-lg p-5 shadow-sm hover:border-amber-400 transition-colors"},M={class:"font-bold text-slate-800 mb-2 flex items-center"},D=["innerHTML"],H={href:"#core-service",class:"text-xs font-bold text-amber-600 hover:underline"},k={id:"notes-advanced",class:"mb-10 scroll-mt-24"},E={class:"text-xl font-bold text-slate-800 mb-3"},B={class:"text-slate-600 mb-6"},j={class:"space-y-6"},O={class:"bg-indigo-50 p-6 rounded-lg border-l-4 border-indigo-500 shadow-sm"},q={class:"text-lg font-bold text-indigo-800 mb-2"},F={class:"text-sm text-indigo-700 mb-4"},A={class:"bg-pink-50 p-6 rounded-lg border-l-4 border-pink-500 shadow-sm"},N={class:"text-lg font-bold text-pink-800 mb-2"},J={class:"text-sm text-pink-700 mb-4"},U={class:"space-y-4"},V={class:"font-bold text-pink-900 mb-2 text-sm"},G={class:"text-xs text-pink-600 mb-2"},z={class:"font-bold text-pink-900 mb-2 text-sm"},Q={class:"text-xs text-pink-600 mb-2"},W={class:"bg-emerald-50 p-6 rounded-lg border-l-4 border-emerald-500 shadow-sm"},X={class:"text-lg font-bold text-emerald-800 mb-2"},Y=["innerHTML"],Z={id:"notes-best-practices",class:"mb-10 scroll-mt-24"},K={class:"text-xl font-bold text-slate-800 mb-3"},ee={class:"grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"},te={class:"bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500 shadow-sm"},oe={class:"text-lg font-bold text-blue-800 mb-2"},se=["innerHTML"],re={class:"bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-500 shadow-sm"},ie={class:"text-lg font-bold text-yellow-800 mb-2"},le={class:"text-sm text-yellow-800 list-disc list-inside"},ne=["innerHTML"],ae=["innerHTML"],de=["innerHTML"],ce={class:"bg-white border border-slate-200 rounded-lg p-6 shadow-sm mb-6"},pe={class:"text-lg font-bold text-slate-800 mb-3"},me={class:"list-disc list-inside text-slate-600 space-y-2"},ue=["innerHTML"],be=["innerHTML"],ve={id:"notes-troubleshooting",class:"mb-10 scroll-mt-24"},_e={class:"text-xl font-bold text-slate-800 mb-3"},ge={class:"bg-white border border-slate-200 rounded-lg p-6 shadow-sm mb-6"},fe={class:"text-lg font-bold text-slate-800 mb-3 text-red-600"},he={class:"space-y-4"},ye={class:"p-4 bg-slate-50 rounded border border-slate-200"},xe={class:"font-bold text-slate-700 mb-2 text-sm"},Pe={class:"p-4 bg-slate-50 rounded border border-slate-200"},Se={class:"font-bold text-slate-700 mb-2 text-sm"},Le={class:"bg-white border border-slate-200 rounded-lg p-6 shadow-sm"},Ce={class:"text-lg font-bold text-slate-800 mb-3 text-orange-600"},Te={class:"space-y-6"},Re={class:"p-4 bg-orange-50 rounded border border-orange-200"},$e={class:"font-bold text-orange-800 mb-2 text-sm"},De={__name:"NotesSection",setup(we){const{t:r}=_();l(()=>`@RestController
@RequestMapping("/api/v1/public/products")
public class ProductPublicController implements 
    IReadSummaryController<Product, Long, ProductResponse>,
    IReadDetailController<Product, Long, ProductResponse>,
    IBaseController<Product, Long>  `+r("notes.code.trait_base")+`
{
    private final ProductService service;

    `+r("notes.code.inject_service")+`
    public ProductPublicController(ProductService service) {
        this.service = service;
    }

    @Override
    public IService<Product, Long> getService() {
        return service;
    }
}
`),l(()=>`@RestController
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
`),l(()=>`@Service
public class ProductViewService implements IReadDetailService<Product, Long> {
    private final ProductRepository repository;

    public ProductViewService(ProductRepository repository) {
        this.repository = repository;
    }

    @Override
    public IRepository<Product, Long> getRepository() {
        return repository;
    }

    `+r("notes.code.only_methods")+`
    `+r("notes.code.no_methods")+`
}
`),l(()=>`@Service
public class ConfigurationService implements IUpdateService<Config, String> {
    private final ConfigRepository repository;

    public ConfigurationService(ConfigRepository repository) {
        this.repository = repository;
    }

    @Override
    public IRepository<Config, String> getRepository() {
        return repository;
    }

    `+r("notes.code.has_methods")+`
    `+r("notes.code.no_delete")+`
}
`);const d=l(()=>`package com.example.demo.repository;

import com.example.demo.entity.Product;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    @Override
    @EntityGraph(attributePaths = {"brand", "category", "model"}) 
    List<Product> findAll();
}
`),c=l(()=>`// Trong ProductController / Service
import com.example.demo.entity.Product;
import com.example.demo.dto.res.ProductResponse;
import jakarta.persistence.criteria.JoinType;
import org.springframework.data.jpa.domain.Specification;

// ...
Specification<Product> spec = (root, query, cb) -> {
    `+r("notes.code.only_fetch")+`
    if (query.getResultType() != Long.class && query.getResultType() != long.class) {
        root.fetch("brand", JoinType.LEFT);
        root.fetch("category", JoinType.LEFT);
    }
    return null; 
};
service.findAll(page, size, spec, ProductResponse.class);
`),p=l(()=>`package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "products")
@Data
public class Product {
    @Id private Long id;
    private String name;

    `+r("notes.code.split_column")+`
    `+r("notes.code.important_fetch")+`
    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL, optional = false)
    @JoinColumn(name = "detail_id")
    private ProductDescription detail;
}

@Entity
@Table(name = "product_details")
@Data
public class ProductDescription {
    @Id private Long id;
    @Lob private String fullDescriptionHTML; `+r("notes.code.heavy_column")+`
    @Column(columnDefinition="TEXT") private String technicalSpecs;
}
`),m=l(()=>`@Service
public class OrderService {
    private final ProductService productService;
    private final CustomerService customerService;
    private final InventoryService inventoryService;

    @Transactional
    public void createOrder(OrderReq req) {
        `+r("notes.code.use_findbyid")+`
        Product p = productService.findById(req.getProductId());
        Customer c = customerService.findById(req.getCustomerId());
        
        `+r("notes.code.business_logic")+`
    }
}
`),u=l(()=>`public abstract class BaseAppService<E extends BaseEntity, ID> 
    implements IService<E, ID> {
    
    @Override
    public void delete(ID id) {
        E entity = findById(id);
        entity.setDeleted(true); `+r("notes.code.soft_delete_logic")+`
        repository.save(entity);
    }
}
`),b=l(()=>`@MappedSuperclass
@SQLDelete(sql = "UPDATE {table_name} SET deleted = true WHERE id = ?")
`+r("notes.soft_delete.hibernate_old")+`
@SQLRestriction("deleted = false") `+r("notes.soft_delete.hibernate_new")+`
@Getter @Setter
public abstract class BaseEntity {
    @Column(name = "deleted", nullable = false)
    private boolean deleted = false;
}
`),v=l(()=>""+r("notes.code.param_filter")+`
public class ProductFilterParam extends BaseRequestParam {
    private Double minPrice;
    private Double maxPrice;
    private String brandName;
}

`+r("notes.code.spec_join")+`
public class ProductSpecification extends GenericSpecification<Product> {
    private final ProductFilterParam param;

    public ProductSpecification(ProductFilterParam param) {
        super(param);
        this.param = param;
    }

    @Override
    public Predicate toPredicate(Root<Product> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
        List<Predicate> predicates = new ArrayList<>();
        `+r("notes.code.leverage_search")+`
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
`);return(t,o)=>(f(),g("section",h,[e("h2",y,s(t.$t("notes.title")),1),e("p",x,s(t.$t("notes.subtitle")),1),e("article",P,[e("h3",S,s(t.$t("notes.modularity.title")),1),e("p",{class:"text-slate-600 mb-6",innerHTML:t.$t("notes.modularity.desc")},null,8,L),e("div",C,[e("div",T,[e("h4",R,[o[0]||(o[0]=e("i",{class:"fas fa-gamepad text-blue-600 mr-2"},null,-1)),i(" "+s(t.$t("notes.modularity.controller_title")),1)]),e("p",{class:"text-sm text-slate-600 mb-4",innerHTML:t.$t("notes.modularity.controller_desc")},null,8,$),o[2]||(o[2]=e("div",{class:"bg-slate-50 p-3 rounded text-xs font-mono text-slate-700 mb-3 border border-slate-200"},[i(" public class MyCtrl implements "),e("span",{class:"font-bold text-blue-600"},"IReadSummaryController"),i(", "),e("span",{class:"font-bold text-blue-600"},"IReadDetailController"),i(", "),e("span",{class:"font-bold text-purple-600"},"ICreateController"),i(" {...} ")],-1)),e("a",w,[i(s(t.$t("notes.modularity.controller_link"))+" ",1),o[1]||(o[1]=e("i",{class:"fas fa-arrow-right ml-1"},null,-1))])]),e("div",I,[e("h4",M,[o[3]||(o[3]=e("i",{class:"fas fa-cogs text-amber-600 mr-2"},null,-1)),i(" "+s(t.$t("notes.modularity.service_title")),1)]),e("p",{class:"text-sm text-slate-600 mb-4",innerHTML:t.$t("notes.modularity.service_desc")},null,8,D),o[5]||(o[5]=e("div",{class:"bg-slate-50 p-3 rounded text-xs font-mono text-slate-700 mb-3 border border-slate-200"},[i(" public class MyService implements "),e("span",{class:"font-bold text-amber-600"},"IReadDetailService"),i(" {...} ")],-1)),e("a",H,[i(s(t.$t("notes.modularity.service_link"))+" ",1),o[4]||(o[4]=e("i",{class:"fas fa-arrow-right ml-1"},null,-1))])])])]),e("article",k,[e("h3",E,s(t.$t("notes.advanced.title")),1),e("p",B,s(t.$t("notes.advanced.desc")),1),e("div",j,[e("div",O,[e("h4",q,[o[6]||(o[6]=e("i",{class:"fas fa-layer-group mr-2"},null,-1)),i(s(t.$t("notes.advanced.composite.title")),1)]),e("p",F,s(t.$t("notes.advanced.composite.desc")),1),n(a,{filename:"OrderService.java",code:m.value},null,8,["code"])]),e("div",A,[e("h4",N,[o[7]||(o[7]=e("i",{class:"fas fa-trash-restore mr-2"},null,-1)),i(s(t.$t("notes.advanced.soft_delete.title")),1)]),e("p",J,s(t.$t("notes.advanced.soft_delete.desc")),1),e("div",U,[e("div",null,[e("h5",V,s(t.$t("notes.advanced.soft_delete.method1_title")),1),e("p",G,s(t.$t("notes.advanced.soft_delete.method1_desc")),1),n(a,{filename:"BaseAppService.java",code:u.value},null,8,["code"])]),e("div",null,[e("h5",z,s(t.$t("notes.advanced.soft_delete.method2_title")),1),e("p",Q,s(t.$t("notes.advanced.soft_delete.method2_desc")),1),n(a,{filename:"BaseEntity.java",code:b.value},null,8,["code"])])])]),e("div",W,[e("h4",X,[o[8]||(o[8]=e("i",{class:"fas fa-filter mr-2"},null,-1)),i(s(t.$t("notes.advanced.filter.title")),1)]),e("p",{class:"text-sm text-emerald-700 mb-4",innerHTML:t.$t("notes.advanced.filter.desc")},null,8,Y),n(a,{filename:"FilteringImplementation.java",code:v.value},null,8,["code"])])])]),e("article",Z,[e("h3",K,s(t.$t("notes.best_practices.title")),1),e("div",ee,[e("div",te,[e("h4",oe,[o[9]||(o[9]=e("i",{class:"fas fa-exclamation-triangle mr-2"},null,-1)),i(s(t.$t("notes.best_practices.constructor_title")),1)]),e("p",{class:"text-sm text-blue-700",innerHTML:t.$t("notes.best_practices.constructor_desc")},null,8,se)]),e("div",re,[e("h4",ie,[o[10]||(o[10]=e("i",{class:"fas fa-code-branch mr-2"},null,-1)),i(s(t.$t("notes.best_practices.override_title")),1)]),e("ul",le,[e("li",{innerHTML:t.$t("notes.best_practices.override_create")},null,8,ne),e("li",{innerHTML:t.$t("notes.best_practices.override_update")},null,8,ae),e("li",{innerHTML:t.$t("notes.best_practices.override_res")},null,8,de)])])]),e("div",ce,[e("h4",pe,[o[11]||(o[11]=e("i",{class:"fas fa-lightbulb text-yellow-500 mr-2"},null,-1)),i(s(t.$t("notes.best_practices.optimization_title")),1)]),e("ul",me,[e("li",{innerHTML:t.$t("notes.best_practices.opt_index")},null,8,ue),e("li",{innerHTML:t.$t("notes.best_practices.opt_lazy")},null,8,be)])])]),e("article",ve,[e("h3",_e,s(t.$t("notes.troubleshooting.title")),1),e("div",ge,[e("h4",fe,[o[12]||(o[12]=e("i",{class:"fas fa-bug mr-2"},null,-1)),i(s(t.$t("notes.troubleshooting.n1_title")),1)]),e("div",he,[e("div",ye,[e("h5",xe,s(t.$t("notes.troubleshooting.n1_method1")),1),n(a,{filename:"UserRepository.java",code:d.value},null,8,["code"])]),e("div",Pe,[e("h5",Se,s(t.$t("notes.troubleshooting.n1_method2")),1),n(a,{filename:"UserController.java",code:c.value},null,8,["code"])])])]),e("div",Le,[e("h4",Ce,[o[13]||(o[13]=e("i",{class:"fas fa-weight-hanging mr-2"},null,-1)),i(s(t.$t("notes.troubleshooting.over_fetching_title")),1)]),e("div",Te,[e("div",Re,[e("h5",$e,s(t.$t("notes.troubleshooting.over_fetching_method")),1),n(a,{filename:"User.java",code:p.value},null,8,["code"])])])])])]))}};export{De as default};
