import{_ as s}from"./CodeBlock-DBZk2lcI.js";import{_ as v}from"./_plugin-vue_export-helper-DlAUqK2U.js";import{c,o as l,a as n,r as a,b as t,d as o,e as r}from"./index-B66TvSSb.js";const b={},g={class:"py-8 overflow-x-auto"};function f(d,i){return l(),c("div",g,[...i[0]||(i[0]=[n('<div class="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4 min-w-[600px]"><div class="flex flex-col items-center group"><div class="w-48 p-4 bg-white border-2 border-blue-500 rounded-lg shadow-lg relative z-10 transition-transform group-hover:-translate-y-1"><div class="text-xs text-blue-500 font-bold uppercase mb-1">Layer 1</div><h4 class="font-bold text-slate-800">Controller</h4><p class="text-xs text-slate-500 mt-1">extends AbController</p><div class="mt-2 text-[10px] bg-blue-50 p-1 rounded text-blue-700"><div>GET /api/products</div><div>POST /api/products</div></div></div></div><div class="hidden md:block text-slate-300"><i class="fas fa-arrow-right text-xl"></i></div><div class="md:hidden text-slate-300"><i class="fas fa-arrow-down text-xl"></i></div><div class="flex flex-col items-center group"><div class="w-48 p-4 bg-white border-2 border-purple-500 rounded-lg shadow-lg relative z-10 transition-transform group-hover:-translate-y-1"><div class="text-xs text-purple-500 font-bold uppercase mb-1">Layer 2</div><h4 class="font-bold text-slate-800">Service</h4><p class="text-xs text-slate-500 mt-1">extends AbService</p><div class="mt-2 text-[10px] bg-purple-50 p-1 rounded text-purple-700"><div>Business Logic</div><div>Transaction</div></div></div></div><div class="hidden md:block text-slate-300"><i class="fas fa-arrow-right text-xl"></i></div><div class="md:hidden text-slate-300"><i class="fas fa-arrow-down text-xl"></i></div><div class="flex flex-col items-center group"><div class="w-48 p-4 bg-white border-2 border-green-500 rounded-lg shadow-lg relative z-10 transition-transform group-hover:-translate-y-1"><div class="text-xs text-green-500 font-bold uppercase mb-1">Layer 3</div><h4 class="font-bold text-slate-800">Repository</h4><p class="text-xs text-slate-500 mt-1">extends JpaRepository</p><div class="mt-2 text-[10px] bg-green-50 p-1 rounded text-green-700"><div>Database Query</div><div>Specification</div></div></div></div></div><div class="mt-8 text-center text-sm text-slate-500"><p>Data flows from <span class="text-blue-600 font-medium">Controller</span> to <span class="text-purple-600 font-medium">Service</span> to <span class="text-green-600 font-medium">Repository</span> clearly.</p></div>',2)])])}const P=v(b,[["render",f]]),y={id:"core-arch",class:"scroll-mt-20 mb-16"},h={class:"mb-10 bg-slate-50 rounded-xl p-4 border border-slate-200"},R={id:"core-entity",class:"mb-10 scroll-mt-24"},w={class:"mb-4"},S={id:"core-service",class:"mb-10 scroll-mt-24"},C={id:"core-controller",class:"mb-10 scroll-mt-24"},j={__name:"ImplementationSection",setup(d){const i=a(`package com.example.demo.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

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
`),p=a(`package com.example.demo.repository;

import com.example.demo.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long>, 
                                           JpaSpecificationExecutor<Product> {
}
`),m=a(`package com.example.demo.service;

import com.example.demo.entity.Product;
import com.natswarchuan.genericservice.service.IService;

public interface IProductService extends IService<Product, Long> {
    // Định nghĩa thêm hàm riêng nếu cần
}
`),u=a(`package com.example.demo.service.impl;

import com.example.demo.entity.Product;
import com.example.demo.repository.ProductRepository;
import com.example.demo.service.IProductService;
import com.natswarchuan.genericservice.service.AbService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class ProductServiceImpl extends AbService<Product, Long> implements IProductService {

    @Autowired
    public ProductServiceImpl(ProductRepository repository) {
        super(repository);
    }
}
`),x=a(`package com.example.demo.controller;

import com.example.demo.dto.ProductCreateReq;
import com.example.demo.dto.ProductResponse;
import com.example.demo.dto.ProductUpdateReq;
import com.example.demo.dto.ProductRequestParam;
import com.example.demo.entity.Product;
import com.example.demo.service.IProductService;
import com.natswarchuan.genericservice.controller.AbController;
import com.natswarchuan.genericservice.payload.request.BaseRequestParam;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/products")
public class ProductController extends AbController<
    Product, 
    Long, 
    ProductResponse,       // R
    ProductCreateReq,      // C
    ProductUpdateReq       // U
> {

    public ProductController(IProductService service) { 
        super(service); 
    }

    @Override
    protected Class<ProductResponse> getResponseDtoClass() {
        return ProductResponse.class;
    }

    // Quan trọng: Override findAll để Spring bind đúng fields của ProductRequestParam
    @Override
    @GetMapping
    public ResponseEntity<HttpApiResponse<PagedResponse<ProductResponse>>> findAll(ProductRequestParam requestParam) {
        return super.findAll(requestParam);
    }

    // Override để thêm custom logic filter
    @Override
    protected Specification<Product> getSpecification(BaseRequestParam baseParam) {
        Specification<Product> spec = super.getSpecification(baseParam);
        
        // Cast về kiểu custom để lấy field
        if (baseParam instanceof ProductRequestParam param) {
             if (param.getMinPrice() != null) {
                 spec = spec.and((root, query, cb) -> cb.ge(root.get("price"), param.getMinPrice()));
             }
        }
        
        return spec;
    }
}
`);return(k,e)=>(l(),c("section",y,[e[12]||(e[12]=t("h2",{class:"text-3xl font-bold text-slate-900 border-b pb-4 mb-8"},"3. Core Architecture",-1)),e[13]||(e[13]=t("p",{class:"text-slate-600 italic mb-6"},[o("Ví dụ minh họa cho module quản lý "),t("strong",null,"Product"),o(". Flow dữ liệu cơ bản:")],-1)),t("div",h,[r(P)]),t("article",R,[e[1]||(e[1]=t("h3",{class:"text-xl font-bold text-slate-800 mb-3"},"3.1. Entity & Repository",-1)),e[2]||(e[2]=t("p",{class:"text-slate-600 mb-3"},"Ánh xạ với bảng trong database và Repository JPA.",-1)),t("div",w,[e[0]||(e[0]=t("h4",{class:"font-semibold text-slate-700 mb-2"},"Entity",-1)),r(s,{filename:"Product.java",code:i.value},null,8,["code"])]),e[3]||(e[3]=t("h4",{class:"font-semibold text-slate-700 mb-2"},"Repository",-1)),r(s,{filename:"ProductRepository.java",code:p.value},null,8,["code"]),e[4]||(e[4]=t("div",{class:"bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4 mt-4 text-sm text-yellow-800"},[t("strong",null,"Lưu ý:"),o(" Repository bắt buộc phải extends "),t("code",null,"JpaSpecificationExecutor"),o(" để hỗ trợ bộ lọc nâng cao. ")],-1))]),t("article",S,[e[5]||(e[5]=t("h3",{class:"text-xl font-bold text-slate-800 mb-3"},"3.2. Service Layer",-1)),e[6]||(e[6]=t("p",{class:"text-slate-600 mb-3"},[o("Kế thừa "),t("code",null,"AbService"),o(" để có sẵn logic CRUD và Validation.")],-1)),e[7]||(e[7]=t("h4",{class:"font-semibold text-slate-700 mb-2"},"Interface",-1)),r(s,{filename:"IProductService.java",code:m.value},null,8,["code"]),e[8]||(e[8]=t("h4",{class:"font-semibold text-slate-700 mb-2 mt-4"},"Implementation",-1)),r(s,{filename:"ProductServiceImpl.java",code:u.value},null,8,["code"])]),t("article",C,[e[9]||(e[9]=t("h3",{class:"text-xl font-bold text-slate-800 mb-3"},"3.3. Controller Layer",-1)),e[10]||(e[10]=t("p",{class:"text-slate-600 mb-3"},[o(" Kế thừa "),t("code",null,"AbController"),o(" để tự động có các API CRUD chuẩn hóa (PagedResponse, Advanced Search). Chỉ cần định nghĩa các DTO Type và Inject Service. ")],-1)),r(s,{filename:"ProductController.java",code:x.value},null,8,["code"]),e[11]||(e[11]=n('<div class="bg-orange-50 border-l-4 border-orange-500 p-4 mb-4 mt-4 text-sm text-orange-800"><h4 class="font-bold flex items-center mb-1"><i class="fas fa-exclamation-triangle mr-2"></i> Lưu ý quan trọng: Custom Filter</h4><p> Khi bạn muốn dùng Custom Request Param (VD: <code>ProductRequestParam</code> có thêm <code>minPrice</code>), bạn <strong>BẮT BUỘC phải Override lại hàm <code>findAll</code></strong> trong Controller con. </p><p class="mt-1 text-xs"> Lý do: Spring MVC cần biết chính xác class cụ thể để bind dữ liệu. Nếu không override, nó sẽ gọi hàm gốc của cha (nhận <code>BaseRequestParam</code>) và bỏ qua các field custom của bạn. </p></div>',1))])]))}};export{j as default};
