import{u as d,g as p,e as m,c as l,o as a,a as t,t as s,h as u,F as v,r as _,n as b,i as g,b as k}from"./index-tzEnmmga.js";import{_ as f}from"./CodeBlock-43NKrjhX.js";const P={id:"quick-start",class:"scroll-mt-20 mb-16"},h={class:"text-4xl font-bold text-slate-900 mb-6"},q={class:"text-lg text-slate-600 mb-8"},x={class:"bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden"},C={class:"flex overflow-x-auto border-b border-slate-200 bg-slate-50"},R=["onClick"],y={class:"p-0"},D={key:0,class:"p-6 bg-blue-50 border-t border-blue-100"},w={class:"font-bold text-blue-900 mb-2"},S={class:"text-sm text-blue-800"},I={class:"mt-8 text-center"},$={class:"text-slate-600 mb-4"},L={href:"#core-entity-repo",class:"inline-flex items-center text-blue-600 font-bold hover:underline"},B={__name:"QuickStartSection",setup(j){const{t:e}=d(),r=p("1. Entity"),o=m(()=>({"1. Entity":{filename:"Product.java",title:e("quick_start.steps.entity.title"),desc:e("quick_start.steps.entity.desc"),code:`import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "product")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private Double price;
}`},"2. Repository":{filename:"ProductRepo.java",title:e("quick_start.steps.repo.title"),desc:e("quick_start.steps.repo.desc"),code:`import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepo extends JpaRepository<Product, Long>, JpaSpecificationExecutor<Product> {
    ${e("quick_start.steps.repo.comment")}
}`},"3. DTOs":{filename:"ProductDTOs.java",title:e("quick_start.steps.dto.title"),desc:e("quick_start.steps.dto.desc"),code:`import com.natswarchuan.genericservice.dto.IDto;
import lombok.Data;

${e("quick_start.steps.dto.comment_create")}
@Data
public class ProductCreateReq implements IDto<Product> {
    private String name;
    private Double price;
}

${e("quick_start.steps.dto.comment_update")}
@Data
public class ProductUpdateReq implements IDto<Product> {
    private String name;
    private Double price;
}

${e("quick_start.steps.dto.comment_res")}
@Data
public class ProductRes implements IDto<Product> {
    private Long id;
    private String name;
    private Double price;
}`},"4. Service":{filename:"ProductService.java",title:e("quick_start.steps.service.title"),desc:e("quick_start.steps.service.desc"),code:`import com.natswarchuan.genericservice.service.AbService;
import org.springframework.stereotype.Service;

@Service
public class ProductService extends AbService<Product, Long> {
    
    public ProductService(ProductRepo repo) {
        super(repo);
    }
}`},"5. Controller":{filename:"ProductController.java",title:e("quick_start.steps.controller.title"),desc:e("quick_start.steps.controller.desc"),code:`import com.natswarchuan.genericservice.controller.AbController;
import com.natswarchuan.genericservice.controller.trait.*;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/products")
public class ProductController extends AbController<Product, Long> 
    implements ICreateController<Product, Long, ProductCreateReq>,
               IUpdateController<Product, Long, ProductUpdateReq>,
               IDeleteController<Product, Long>,
               IReadController<Product, Long> {

    public ProductController(ProductService service) {
        super(service);
    }

    ${e("quick_start.steps.controller.comment_summ")}
    @Override
    public <R extends IDto<Product>> Class<R> getResponseSummaryDtoClass() {
        return (Class<R>) ProductRes.class;
    }

    ${e("quick_start.steps.controller.comment_detail")}
    @Override
    public <R extends IDto<Product>> Class<R> getResponseDetailDtoClass() {
        return (Class<R>) ProductRes.class;
    }
}`}}));return(c,n)=>(a(),l("section",P,[t("h2",h,s(c.$t("quick_start.title")),1),t("p",q,s(c.$t("quick_start.intro")),1),t("div",x,[t("div",C,[(a(!0),l(v,null,_(o.value,(T,i)=>(a(),l("button",{key:i,onClick:A=>r.value=i,class:b(["px-6 py-3 text-sm font-bold whitespace-nowrap transition-colors",r.value===i?"bg-white text-blue-600 border-b-2 border-blue-600":"text-slate-500 hover:text-slate-700 hover:bg-slate-100"])},s(i),11,R))),128))]),t("div",y,[o.value[r.value]?(a(),g(f,{key:0,filename:o.value[r.value].filename,code:o.value[r.value].code,language:"java",class:"!m-0 rounded-none border-0"},null,8,["filename","code"])):u("",!0)]),o.value[r.value]?(a(),l("div",D,[t("h4",w,"Giải thích: "+s(o.value[r.value].title),1),t("p",S,s(o.value[r.value].desc),1)])):u("",!0)]),t("div",I,[t("p",$,s(c.$t("quick_start.more_info")),1),t("a",L,[k(s(c.$t("quick_start.view_details"))+" ",1),n[0]||(n[0]=t("i",{class:"fas fa-arrow-right ml-2"},null,-1))])])]))}};export{B as default};
