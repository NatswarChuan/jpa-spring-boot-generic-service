import{_ as a}from"./CodeBlock-rhId-KlK.js";import{_ as x}from"./_plugin-vue_export-helper-DlAUqK2U.js";import{c,o as n,a as l,r as o,b as t,d as s,e as r}from"./index-NytfIO67.js";const b={},g={class:"py-8 overflow-x-auto"};function f(d,i){return n(),c("div",g,[...i[0]||(i[0]=[l('<div class="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4 min-w-[600px]"><div class="flex flex-col items-center group"><div class="w-48 p-4 bg-white border-2 border-blue-500 rounded-lg shadow-lg relative z-10 transition-transform group-hover:-translate-y-1"><div class="text-xs text-blue-500 font-bold uppercase mb-1">Layer 1</div><h4 class="font-bold text-slate-800">Controller</h4><p class="text-xs text-slate-500 mt-1">extends AbController</p><div class="mt-2 text-[10px] bg-blue-50 p-1 rounded text-blue-700"><div>GET /api/products</div><div>POST /api/products</div></div></div></div><div class="hidden md:block text-slate-300"><i class="fas fa-arrow-right text-xl"></i></div><div class="md:hidden text-slate-300"><i class="fas fa-arrow-down text-xl"></i></div><div class="flex flex-col items-center group"><div class="w-48 p-4 bg-white border-2 border-purple-500 rounded-lg shadow-lg relative z-10 transition-transform group-hover:-translate-y-1"><div class="text-xs text-purple-500 font-bold uppercase mb-1">Layer 2</div><h4 class="font-bold text-slate-800">Service</h4><p class="text-xs text-slate-500 mt-1">extends AbService</p><div class="mt-2 text-[10px] bg-purple-50 p-1 rounded text-purple-700"><div>Business Logic</div><div>Transaction</div></div></div></div><div class="hidden md:block text-slate-300"><i class="fas fa-arrow-right text-xl"></i></div><div class="md:hidden text-slate-300"><i class="fas fa-arrow-down text-xl"></i></div><div class="flex flex-col items-center group"><div class="w-48 p-4 bg-white border-2 border-green-500 rounded-lg shadow-lg relative z-10 transition-transform group-hover:-translate-y-1"><div class="text-xs text-green-500 font-bold uppercase mb-1">Layer 3</div><h4 class="font-bold text-slate-800">Repository</h4><p class="text-xs text-slate-500 mt-1">extends JpaRepository</p><div class="mt-2 text-[10px] bg-green-50 p-1 rounded text-green-700"><div>Database Query</div><div>Specification</div></div></div></div></div><div class="mt-8 text-center text-sm text-slate-500"><p>Data flows from <span class="text-blue-600 font-medium">Controller</span> to <span class="text-purple-600 font-medium">Service</span> to <span class="text-green-600 font-medium">Repository</span> clearly.</p></div>',2)])])}const y=x(b,[["render",f]]),h={id:"core-arch",class:"scroll-mt-20 mb-16"},P={class:"mb-10 bg-slate-50 rounded-xl p-4 border border-slate-200"},w={id:"core-entity",class:"mb-10 scroll-mt-24"},S={class:"mb-4"},R={id:"core-service",class:"mb-10 scroll-mt-24"},C={id:"core-controller",class:"mb-10 scroll-mt-24"},D={__name:"ImplementationSection",setup(d){const i=o(`package com.example.demo.entity;

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
`),p=o(`package com.example.demo.repository;

import com.example.demo.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long>, 
                                           JpaSpecificationExecutor<Product> {
}
`),m=o(`package com.example.demo.service;

import com.example.demo.entity.Product;
import com.natswarchuan.genericservice.service.IService;

public interface IProductService extends IService<Product, Long> {
    // Định nghĩa thêm hàm riêng nếu cần
}
`),u=o(`package com.example.demo.service.impl;

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
`),v=o(`package com.example.demo.controller;

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
    ProductCreateReq,      // C
    ProductUpdateReq       // U
> {

    public ProductController(IProductService service) { 
        super(service); 
    }

    @Override
    protected Class<ProductResponse> getResponseSummaryDtoClass() {
        return ProductResponse.class;
    }

    @Override
    protected Class<ProductResponse> getResponseDetailDtoClass() {
        return ProductResponse.class;
    }

    // Quan trọng: Override findAll để Spring bind đúng fields của ProductRequestParam
    @Override
    @GetMapping
    public ResponseEntity<HttpApiResponse<PagedResponse<ProductResponse>>> findAll(
            ProductRequestParam requestParam,
            @RequestHeader(name = "Accept-Language", defaultValue = "en") String language) {
        return super.findAll(requestParam, language);
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
`);return(k,e)=>(n(),c("section",h,[e[12]||(e[12]=t("h2",{class:"text-3xl font-bold text-slate-900 border-b pb-4 mb-8"},"3. Core Architecture",-1)),e[13]||(e[13]=t("p",{class:"text-slate-600 italic mb-6"},[s("Ví dụ minh họa cho module quản lý "),t("strong",null,"Product"),s(". Flow dữ liệu cơ bản:")],-1)),t("div",P,[r(y)]),t("article",w,[e[1]||(e[1]=t("h3",{class:"text-xl font-bold text-slate-800 mb-3"},"3.1. Entity & Repository",-1)),e[2]||(e[2]=t("p",{class:"text-slate-600 mb-3"},"Ánh xạ với bảng trong database và Repository JPA.",-1)),t("div",S,[e[0]||(e[0]=t("h4",{class:"font-semibold text-slate-700 mb-2"},"Entity",-1)),r(a,{filename:"Product.java",code:i.value},null,8,["code"])]),e[3]||(e[3]=t("h4",{class:"font-semibold text-slate-700 mb-2"},"Repository",-1)),r(a,{filename:"ProductRepository.java",code:p.value},null,8,["code"]),e[4]||(e[4]=t("div",{class:"bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4 mt-4 text-sm text-yellow-800"},[t("strong",null,"Lưu ý:"),s(" Repository bắt buộc phải extends "),t("code",null,"JpaSpecificationExecutor"),s(" để hỗ trợ bộ lọc nâng cao. ")],-1))]),t("article",R,[e[5]||(e[5]=t("h3",{class:"text-xl font-bold text-slate-800 mb-3"},"3.2. Service Layer",-1)),e[6]||(e[6]=t("p",{class:"text-slate-600 mb-3"},[s("Kế thừa "),t("code",null,"AbService"),s(" để có sẵn logic CRUD và Validation.")],-1)),e[7]||(e[7]=t("h4",{class:"font-semibold text-slate-700 mb-2"},"Interface",-1)),r(a,{filename:"IProductService.java",code:m.value},null,8,["code"]),e[8]||(e[8]=t("h4",{class:"font-semibold text-slate-700 mb-2 mt-4"},"Implementation",-1)),r(a,{filename:"ProductServiceImpl.java",code:u.value},null,8,["code"])]),t("article",C,[e[9]||(e[9]=t("h3",{class:"text-xl font-bold text-slate-800 mb-3"},"3.3. Controller Layer",-1)),e[10]||(e[10]=t("p",{class:"text-slate-600 mb-3"},[s(" Kế thừa "),t("code",null,"AbController"),s(" để tự động có các API CRUD chuẩn hóa (PagedResponse, Advanced Search). Chỉ cần định nghĩa các DTO Type và Inject Service. ")],-1)),r(a,{filename:"ProductController.java",code:v.value},null,8,["code"]),e[11]||(e[11]=l('<div class="bg-orange-50 border-l-4 border-orange-500 p-4 mb-4 mt-4 text-sm text-orange-800"><h4 class="font-bold flex items-center mb-1"><i class="fas fa-exclamation-triangle mr-2"></i> Lưu ý quan trọng: Custom Filter</h4><p> Khi bạn muốn dùng Custom Request Param (VD: <code>ProductRequestParam</code> có thêm <code>minPrice</code>), bạn <strong>BẮT BUỘC phải Override lại hàm <code>findAll</code></strong> trong Controller con. </p><p class="mt-1 text-xs"> Lý do: Spring MVC cần biết chính xác class cụ thể để bind dữ liệu. Nếu không override, nó sẽ gọi hàm gốc của cha (nhận <code>BaseRequestParam</code>) và bỏ qua các field custom của bạn. </p></div>',1))]),e[14]||(e[14]=l('<article id="framework-spec" class="mb-10 scroll-mt-24"><h3 class="text-xl font-bold text-slate-800 mb-3">3.4. Đặc tả Framework &amp; Phân cấp lớp</h3><p class="text-slate-600 mb-4"> Framework được thiết kế theo mô hình phân tầng (Layered Inheritance), phân chia rạch ròi trách nhiệm giữa các loại thao tác. </p><div class="mb-6 bg-white border border-slate-200 rounded-lg p-6 shadow-sm overflow-x-auto"><h4 class="font-bold text-slate-700 mb-4 flex items-center"><i class="fas fa-sitemap mr-2 text-blue-500"></i> Class Hierarchy (Service Layer) </h4><div class="space-y-2 font-mono text-sm"><div class="flex items-center"><span class="bg-blue-600 text-white px-3 py-1 rounded">AbService</span><span class="mx-2 text-slate-400">→ Cung cấp full CRUD + Spec</span></div><div class="ml-8 border-l-2 border-slate-200 pl-4 space-y-2"><div class="flex items-center"><span class="bg-indigo-500 text-white px-3 py-1 rounded">AbDeleteService</span><span class="mx-2 text-slate-400">→ Xử lý logic Xóa (Delete)</span></div><div class="ml-8 border-l-2 border-slate-200 pl-4 space-y-2"><div class="flex items-center"><span class="bg-purple-500 text-white px-3 py-1 rounded">AbUpdateService</span><span class="mx-2 text-slate-400">→ Xử lý logic Cập nhật &amp; Lưu (Update/Save)</span></div><div class="ml-8 border-l-2 border-slate-200 pl-4 space-y-2"><div class="flex items-center"><span class="bg-pink-500 text-white px-3 py-1 rounded">AbCreateService</span><span class="mx-2 text-slate-400">→ Xử lý logic Tạo mới (Create)</span></div><div class="ml-8 border-l-2 border-slate-200 pl-4 space-y-2"><div class="flex items-center"><span class="bg-orange-500 text-white px-3 py-1 rounded">AbReadDetailService</span><span class="mx-2 text-slate-400">→ Xử lý logic Đọc chi tiết (FindOne/ById)</span></div><div class="ml-8 border-l-2 border-slate-200 pl-4 space-y-2"><div class="flex items-center"><span class="bg-amber-500 text-white px-3 py-1 rounded">AbReadSummaryService</span><span class="mx-2 text-slate-400">→ Xử lý logic Đọc danh sách (FindAll/Paging)</span></div><div class="ml-8 border-l-2 border-slate-200 pl-4"><div class="flex items-center"><span class="bg-slate-500 text-white px-3 py-1 rounded">AbBaseService</span><span class="mx-2 text-slate-400">→ Chứa Utils (Mapping, Logging, Base Fields)</span></div></div></div></div></div></div></div></div></div><div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div class="p-5 bg-slate-50 border border-slate-200 rounded-lg"><h4 class="font-bold text-slate-800 mb-2">Package Structure</h4><ul class="text-sm space-y-1 text-slate-600 font-mono"><li><i class="fas fa-folder text-yellow-500 mr-2"></i>.controller</li><li class="pl-4">└── AbController.java</li><li><i class="fas fa-folder text-yellow-500 mr-2"></i>.dto</li><li class="pl-4">└── IDto.java</li><li><i class="fas fa-folder text-yellow-500 mr-2"></i>.service</li><li class="pl-4">├── IService.java</li><li class="pl-4">└── AbService.java (và các Base Classes)</li><li><i class="fas fa-folder text-yellow-500 mr-2"></i>.payload</li><li class="pl-4">├── .request (BaseRequestParam)</li><li class="pl-4">└── .response (HttpApiResponse, PagedResponse)</li></ul></div><div class="p-5 bg-blue-50 border border-blue-100 rounded-lg"><h4 class="font-bold text-blue-900 mb-2">Core Principles</h4><ul class="text-sm space-y-2 text-blue-800"><li class="flex items-start"><i class="fas fa-check mt-1 mr-2 opacity-50"></i> <strong>Generics Everywhere:</strong> Sử dụng triệt để Generics &lt;E, ID&gt; để đảm bảo type-safe.</li><li class="flex items-start"><i class="fas fa-check mt-1 mr-2 opacity-50"></i> <strong>Separation of Concerns:</strong> DTO gánh vác việc giao tiếp API, Entity gánh vác việc lưu trữ DB.</li><li class="flex items-start"><i class="fas fa-check mt-1 mr-2 opacity-50"></i> <strong>Hook-based Extension:</strong> Mở rộng tính năng qua các &quot;Life-cycle hooks&quot; thay vì sửa code lõi.</li></ul></div></div></article>',1))]))}};export{D as default};
