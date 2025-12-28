import{u as d,g as p,e as m,c as n,o as a,a as t,t as o,h as u,F as v,r as _,n as b,i as g,b as k}from"./index-Dt1VOsda.js";import{_ as f}from"./CodeBlock-CkOxS9D9.js";const h={id:"quick-start",class:"scroll-mt-20 mb-16"},q={class:"text-4xl font-bold text-slate-900 mb-6"},y=["innerHTML"],P={class:"bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden"},R={class:"flex overflow-x-auto border-b border-slate-200 bg-slate-50"},x=["onClick"],D={class:"p-0"},C={key:0,class:"p-6 bg-blue-50 border-t border-blue-100"},S={class:"font-bold text-blue-900 mb-2"},I=["innerHTML"],w={class:"mt-8 text-center"},$={class:"text-slate-600 mb-4"},L={href:"#core-entity-repo",class:"inline-flex items-center text-blue-600 font-bold hover:underline"},E={__name:"QuickStartSection",setup(T){const{t:e}=d(),r=p("Entity"),s=m(()=>({Entity:{filename:"Product.java",title:e("quick_start.steps.entity.title"),desc:e("quick_start.steps.entity.desc"),code:`import jakarta.persistence.*;
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
}`},Repository:{filename:"ProductRepository.java",title:e("quick_start.steps.repo.title"),desc:e("quick_start.steps.repo.desc"),code:`import com.natswarchuan.genericservice.repository.IRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends IRepository<Product, Long> {
    ${e("quick_start.steps.repo.comment")}
}`},DTOs:{filename:"ProductDTOs.java",title:e("quick_start.steps.dto.title"),desc:e("quick_start.steps.dto.desc"),code:`import com.natswarchuan.genericservice.dto.IDto;
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
}`},Service:{filename:"ProductService.java",title:e("quick_start.steps.service.title"),desc:e("quick_start.steps.service.desc"),code:`import com.natswarchuan.genericservice.repository.IRepository;
import com.natswarchuan.genericservice.service.IService;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProductService implements IService<Product, Long> {
    
    private final ProductRepository repository;

    @Override
    public IRepository<Product, Long> getRepository() {
        return repository;
    }
}`},Controller:{filename:"ProductController.java",title:e("quick_start.steps.controller.title"),desc:e("quick_start.steps.controller.desc"),code:`import com.natswarchuan.genericservice.controller.IController;
import com.natswarchuan.genericservice.service.IBaseService;
import com.natswarchuan.genericservice.dto.IDto;
import org.springframework.web.bind.annotation.*;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/products")
@RequiredArgsConstructor
public class ProductController implements IController<Product, Long, ProductCreateReq, ProductUpdateReq> {

    private final ProductService service;

    @Override
    public <S extends IBaseService<Product, Long>> S getBaseService() {
        return (S) service;
    }

    ${e("quick_start.steps.controller.comment_summ")}
    @Override
    public Class<? extends IDto<Product>> getResponseSummaryDtoClass() {
        return ProductRes.class;
    }

    ${e("quick_start.steps.controller.comment_detail")}
    @Override
    public Class<? extends IDto<Product>> getResponseDetailDtoClass() {
        return ProductRes.class;
    }
}`}}));return(i,l)=>(a(),n("section",h,[t("h2",q,o(i.$t("quick_start.title")),1),t("p",{class:"text-lg text-slate-600 mb-8",innerHTML:i.$t("quick_start.intro")},null,8,y),t("div",P,[t("div",R,[(a(!0),n(v,null,_(s.value,(j,c)=>(a(),n("button",{key:c,onClick:A=>r.value=c,class:b(["px-6 py-3 text-sm font-bold whitespace-nowrap transition-colors",r.value===c?"bg-white text-blue-600 border-b-2 border-blue-600":"text-slate-500 hover:text-slate-700 hover:bg-slate-100"])},o(c),11,x))),128))]),t("div",D,[s.value[r.value]?(a(),g(f,{key:0,filename:s.value[r.value].filename,code:s.value[r.value].code,language:"java",class:"!m-0 rounded-none border-0"},null,8,["filename","code"])):u("",!0)]),s.value[r.value]?(a(),n("div",C,[t("h4",S,o(i.$t("quick_start.explain_label"))+": "+o(s.value[r.value].title),1),t("p",{class:"text-sm text-blue-800",innerHTML:s.value[r.value].desc},null,8,I)])):u("",!0)]),t("div",w,[t("p",$,o(i.$t("quick_start.more_info")),1),t("a",L,[k(o(i.$t("quick_start.view_details"))+" ",1),l[0]||(l[0]=t("i",{class:"fas fa-arrow-right ml-2"},null,-1))])])]))}};export{E as default};
