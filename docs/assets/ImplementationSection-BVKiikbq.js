import{_ as r}from"./CodeBlock-Bl3isb_5.js";import{_ as x}from"./_plugin-vue_export-helper-DlAUqK2U.js";import{c as i,o as c,a as n,r as l,b as t,d as s,e as o}from"./index-BCAyzHOy.js";const b={},g={class:"py-8 overflow-x-auto"};function f(d,a){return c(),i("div",g,[...a[0]||(a[0]=[n('<div class="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4 min-w-[600px]"><div class="flex flex-col items-center group"><div class="w-48 p-4 bg-white border-2 border-blue-500 rounded-lg shadow-lg relative z-10 transition-transform group-hover:-translate-y-1"><div class="text-xs text-blue-500 font-bold uppercase mb-1">Layer 1</div><h4 class="font-bold text-slate-800">Controller</h4><p class="text-xs text-slate-500 mt-1">extends AbController</p><div class="mt-2 text-[10px] bg-blue-50 p-1 rounded text-blue-700"><div>GET /api/products</div><div>POST /api/products</div></div></div></div><div class="hidden md:block text-slate-300"><i class="fas fa-arrow-right text-xl"></i></div><div class="md:hidden text-slate-300"><i class="fas fa-arrow-down text-xl"></i></div><div class="flex flex-col items-center group"><div class="w-48 p-4 bg-white border-2 border-purple-500 rounded-lg shadow-lg relative z-10 transition-transform group-hover:-translate-y-1"><div class="text-xs text-purple-500 font-bold uppercase mb-1">Layer 2</div><h4 class="font-bold text-slate-800">Service</h4><p class="text-xs text-slate-500 mt-1">extends AbService</p><div class="mt-2 text-[10px] bg-purple-50 p-1 rounded text-purple-700"><div>Business Logic</div><div>Transaction</div></div></div></div><div class="hidden md:block text-slate-300"><i class="fas fa-arrow-right text-xl"></i></div><div class="md:hidden text-slate-300"><i class="fas fa-arrow-down text-xl"></i></div><div class="flex flex-col items-center group"><div class="w-48 p-4 bg-white border-2 border-green-500 rounded-lg shadow-lg relative z-10 transition-transform group-hover:-translate-y-1"><div class="text-xs text-green-500 font-bold uppercase mb-1">Layer 3</div><h4 class="font-bold text-slate-800">Repository</h4><p class="text-xs text-slate-500 mt-1">extends JpaRepository</p><div class="mt-2 text-[10px] bg-green-50 p-1 rounded text-green-700"><div>Database Query</div><div>Specification</div></div></div></div></div><div class="mt-8 text-center text-sm text-slate-500"><p>Data flows from <span class="text-blue-600 font-medium">Controller</span> to <span class="text-purple-600 font-medium">Service</span> to <span class="text-green-600 font-medium">Repository</span> clearly.</p></div>',2)])])}const y=x(b,[["render",f]]),h={id:"core-arch",class:"scroll-mt-20 mb-16"},w={class:"mb-10 bg-slate-50 rounded-xl p-4 border border-slate-200"},S={id:"core-entity",class:"mb-10 scroll-mt-24"},P={class:"mb-4"},C={id:"core-service",class:"mb-10 scroll-mt-24"},R={id:"core-controller",class:"mb-10 scroll-mt-24"},L={__name:"ImplementationSection",setup(d){const a=l(`package com.example.demo.entity;

import jakarta.persistence.*;
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
    private String description;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @ManyToOne
    @JoinColumn(name = "brand_id")
    private Brand brand;

    @ManyToOne
    @JoinColumn(name = "model_id")
    private Model model;
}
`),p=l(`package com.example.demo.repository;

import com.example.demo.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long>,
                                           JpaSpecificationExecutor<Product> {
}
`),m=l(`package com.example.demo.service;

import com.example.demo.entity.Product;
import com.natswarchuan.genericservice.service.IService;

public interface IProductService extends IService<Product, Long> {
}
`),v=l(`package com.example.demo.service.impl;

import com.example.demo.entity.Product;
import com.example.demo.repository.ProductRepository;
import com.example.demo.service.IProductService;
import com.natswarchuan.genericservice.service.AbService;

import jakarta.annotation.Nonnull;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class ProductServiceImpl extends AbService<Product, Long> implements IProductService {
    @SuppressWarnings("null")
    public ProductServiceImpl(@Nonnull ProductRepository repository) {
        super(repository);
    }
}
`),u=l(`package com.example.demo.controller;

import com.example.demo.dto.req.ProductCreateReq;
import com.example.demo.dto.req.ProductUpdateReq;
import com.example.demo.dto.res.ProductResponse;
import com.example.demo.entity.Product;
import com.example.demo.service.IProductService;
import com.natswarchuan.genericservice.controller.AbController;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/products")
public class ProductController
        extends AbController<Product, Long, ProductCreateReq, ProductUpdateReq> {

    public ProductController(IProductService service) {
        super(service);
    }


    @Override
    @SuppressWarnings("unchecked")
    protected Class<ProductResponse> getResponseDetailDtoClass() {
        return ProductResponse.class;
    }

    @Override
    @SuppressWarnings("unchecked")
    protected Class<ProductResponse> getResponseSummaryDtoClass() {
        return ProductResponse.class;
    }
}
`);return(k,e)=>(c(),i("section",h,[e[12]||(e[12]=t("h2",{class:"text-3xl font-bold text-slate-900 border-b pb-4 mb-8"},"3. Core Architecture",-1)),e[13]||(e[13]=t("p",{class:"text-slate-600 italic mb-6"},[s("Ví dụ minh họa cho module quản lý "),t("strong",null,"Product"),s(". Flow dữ liệu cơ bản:")],-1)),t("div",w,[o(y)]),t("article",S,[e[1]||(e[1]=t("h3",{class:"text-xl font-bold text-slate-800 mb-3"},"3.1. Entity & Repository",-1)),e[2]||(e[2]=t("p",{class:"text-slate-600 mb-3"},"Ánh xạ với bảng trong database và Repository JPA.",-1)),t("div",P,[e[0]||(e[0]=t("h4",{class:"font-semibold text-slate-700 mb-2"},"Entity",-1)),o(r,{filename:"Product.java",code:a.value},null,8,["code"])]),e[3]||(e[3]=t("h4",{class:"font-semibold text-slate-700 mb-2"},"Repository",-1)),o(r,{filename:"ProductRepository.java",code:p.value},null,8,["code"]),e[4]||(e[4]=t("div",{class:"bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4 mt-4 text-sm text-yellow-800"},[t("strong",null,"Lưu ý:"),s(" Repository bắt buộc phải extends "),t("code",null,"JpaSpecificationExecutor"),s(" để hỗ trợ bộ lọc nâng cao. ")],-1))]),t("article",C,[e[5]||(e[5]=t("h3",{class:"text-xl font-bold text-slate-800 mb-3"},"3.2. Service Layer",-1)),e[6]||(e[6]=t("p",{class:"text-slate-600 mb-3"},[s("Kế thừa "),t("code",null,"AbService"),s(" để có sẵn logic CRUD và Validation.")],-1)),e[7]||(e[7]=t("h4",{class:"font-semibold text-slate-700 mb-2"},"Interface",-1)),o(r,{filename:"IProductService.java",code:m.value},null,8,["code"]),e[8]||(e[8]=t("h4",{class:"font-semibold text-slate-700 mb-2 mt-4"},"Implementation",-1)),o(r,{filename:"ProductServiceImpl.java",code:v.value},null,8,["code"])]),t("article",R,[e[9]||(e[9]=t("h3",{class:"text-xl font-bold text-slate-800 mb-3"},"3.3. Controller Layer",-1)),e[10]||(e[10]=t("p",{class:"text-slate-600 mb-3"},[s(" Kế thừa "),t("code",null,"AbController"),s(" để tự động có các API CRUD chuẩn hóa (PagedResponse, Advanced Search). Chỉ cần định nghĩa các DTO Type và Inject Service. ")],-1)),o(r,{filename:"ProductController.java",code:u.value},null,8,["code"]),e[11]||(e[11]=t("div",{class:"bg-blue-50 border-l-4 border-blue-500 p-4 mb-4 mt-4 text-sm text-blue-800"},[t("strong",null,"Lưu ý:"),s(" Bạn cần override "),t("code",null,"getResponseDetailDtoClass"),s(" và "),t("code",null,"getResponseSummaryDtoClass"),s(" để framework biết được DTO nào sẽ được dùng để serialize response. ")],-1))]),e[14]||(e[14]=n('<article id="framework-spec" class="mb-10 scroll-mt-24"><h3 class="text-xl font-bold text-slate-800 mb-3">3.4. Đặc tả Framework &amp; Phân cấp lớp</h3><p class="text-slate-600 mb-4"> Framework được thiết kế theo mô hình phân tầng (Layered Inheritance), phân chia rạch ròi trách nhiệm giữa các loại thao tác. </p><div class="mb-6 bg-white border border-slate-200 rounded-lg p-6 shadow-sm overflow-x-auto"><h4 class="font-bold text-slate-700 mb-4 flex items-center"><i class="fas fa-sitemap mr-2 text-blue-500"></i> Class Hierarchy (Service Layer) </h4><div class="space-y-2 font-mono text-sm"><div class="flex items-center"><span class="bg-blue-600 text-white px-3 py-1 rounded">AbService</span><span class="mx-2 text-slate-400">→ Cung cấp full CRUD + Spec</span></div><div class="ml-8 border-l-2 border-slate-200 pl-4 space-y-2"><div class="flex items-center"><span class="bg-indigo-500 text-white px-3 py-1 rounded">AbDeleteService</span><span class="mx-2 text-slate-400">→ Xử lý logic Xóa (Delete)</span></div><div class="ml-8 border-l-2 border-slate-200 pl-4 space-y-2"><div class="flex items-center"><span class="bg-purple-500 text-white px-3 py-1 rounded">AbUpdateService</span><span class="mx-2 text-slate-400">→ Xử lý logic Cập nhật &amp; Lưu (Update/Save)</span></div><div class="ml-8 border-l-2 border-slate-200 pl-4 space-y-2"><div class="flex items-center"><span class="bg-pink-500 text-white px-3 py-1 rounded">AbCreateService</span><span class="mx-2 text-slate-400">→ Xử lý logic Tạo mới (Create)</span></div><div class="ml-8 border-l-2 border-slate-200 pl-4 space-y-2"><div class="flex items-center"><span class="bg-orange-500 text-white px-3 py-1 rounded">AbReadDetailService</span><span class="mx-2 text-slate-400">→ Xử lý logic Đọc chi tiết (FindOne/ById)</span></div><div class="ml-8 border-l-2 border-slate-200 pl-4 space-y-2"><div class="flex items-center"><span class="bg-amber-500 text-white px-3 py-1 rounded">AbReadSummaryService</span><span class="mx-2 text-slate-400">→ Xử lý logic Đọc danh sách (FindAll/Paging)</span></div><div class="ml-8 border-l-2 border-slate-200 pl-4"><div class="flex items-center"><span class="bg-slate-500 text-white px-3 py-1 rounded">AbBaseService</span><span class="mx-2 text-slate-400">→ Chứa Utils (Mapping, Logging, Base Fields)</span></div></div></div></div></div></div></div></div></div><div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div class="p-5 bg-slate-50 border border-slate-200 rounded-lg"><h4 class="font-bold text-slate-800 mb-2">Package Structure</h4><ul class="text-sm space-y-1 text-slate-600 font-mono"><li><i class="fas fa-folder text-yellow-500 mr-2"></i>.controller</li><li class="pl-4">└── AbController.java</li><li><i class="fas fa-folder text-yellow-500 mr-2"></i>.dto</li><li class="pl-4">└── IDto.java</li><li><i class="fas fa-folder text-yellow-500 mr-2"></i>.service</li><li class="pl-4">├── IService.java</li><li class="pl-4">└── AbService.java (và các Base Classes)</li><li><i class="fas fa-folder text-yellow-500 mr-2"></i>.payload</li><li class="pl-4">├── .request (BaseRequestParam)</li><li class="pl-4">└── .response (HttpApiResponse, PagedResponse)</li></ul></div><div class="p-5 bg-blue-50 border border-blue-100 rounded-lg"><h4 class="font-bold text-blue-900 mb-2">Core Principles</h4><ul class="text-sm space-y-2 text-blue-800"><li class="flex items-start"><i class="fas fa-check mt-1 mr-2 opacity-50"></i> <strong>Generics Everywhere:</strong> Sử dụng triệt để Generics &lt;E, ID&gt; để đảm bảo type-safe.</li><li class="flex items-start"><i class="fas fa-check mt-1 mr-2 opacity-50"></i> <strong>Separation of Concerns:</strong> DTO gánh vác việc giao tiếp API, Entity gánh vác việc lưu trữ DB.</li><li class="flex items-start"><i class="fas fa-check mt-1 mr-2 opacity-50"></i> <strong>Hook-based Extension:</strong> Mở rộng tính năng qua các &quot;Life-cycle hooks&quot; thay vì sửa code lõi.</li></ul></div></div></article>',1))]))}};export{L as default};
