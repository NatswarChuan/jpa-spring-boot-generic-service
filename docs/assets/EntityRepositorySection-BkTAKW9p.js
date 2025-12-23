import{_ as s}from"./CodeBlock-DU0nxMW6.js";import{_ as p}from"./_plugin-vue_export-helper-DlAUqK2U.js";import{c as l,o as d,a as m,r as i,b as t,d as a,e as r}from"./index-BKqiAm5w.js";const u={},x={class:"py-8 overflow-x-auto"};function v(n,o){return d(),l("div",x,[...o[0]||(o[0]=[m('<div class="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4 min-w-[600px]"><div class="flex flex-col items-center group"><div class="w-48 p-4 bg-white border-2 border-blue-500 rounded-lg shadow-lg relative z-10 transition-transform group-hover:-translate-y-1"><div class="text-xs text-blue-500 font-bold uppercase mb-1">Layer 1</div><h4 class="font-bold text-slate-800">Controller</h4><p class="text-xs text-slate-500 mt-1">extends AbController</p><div class="mt-2 text-[10px] bg-blue-50 p-1 rounded text-blue-700"><div>GET /api/products</div><div>POST /api/products</div></div></div></div><div class="hidden md:block text-slate-300"><i class="fas fa-arrow-right text-xl"></i></div><div class="md:hidden text-slate-300"><i class="fas fa-arrow-down text-xl"></i></div><div class="flex flex-col items-center group"><div class="w-48 p-4 bg-white border-2 border-purple-500 rounded-lg shadow-lg relative z-10 transition-transform group-hover:-translate-y-1"><div class="text-xs text-purple-500 font-bold uppercase mb-1">Layer 2</div><h4 class="font-bold text-slate-800">Service</h4><p class="text-xs text-slate-500 mt-1">extends AbService</p><div class="mt-2 text-[10px] bg-purple-50 p-1 rounded text-purple-700"><div>Business Logic</div><div>Transaction</div></div></div></div><div class="hidden md:block text-slate-300"><i class="fas fa-arrow-right text-xl"></i></div><div class="md:hidden text-slate-300"><i class="fas fa-arrow-down text-xl"></i></div><div class="flex flex-col items-center group"><div class="w-48 p-4 bg-white border-2 border-green-500 rounded-lg shadow-lg relative z-10 transition-transform group-hover:-translate-y-1"><div class="text-xs text-green-500 font-bold uppercase mb-1">Layer 3</div><h4 class="font-bold text-slate-800">Repository</h4><p class="text-xs text-slate-500 mt-1">extends JpaRepository</p><div class="mt-2 text-[10px] bg-green-50 p-1 rounded text-green-700"><div>Database Query</div><div>Specification</div></div></div></div></div><div class="mt-8 text-center text-sm text-slate-500"><p>Data flows from <span class="text-blue-600 font-medium">Controller</span> to <span class="text-purple-600 font-medium">Service</span> to <span class="text-green-600 font-medium">Repository</span> clearly.</p></div>',2)])])}const b=p(u,[["render",v]]),f={id:"core-arch",class:"scroll-mt-20 mb-16"},g={class:"mb-10 bg-slate-50 rounded-xl p-4 border border-slate-200"},y={id:"core-entity",class:"mb-10 scroll-mt-24"},h={id:"core-repo",class:"mb-10 scroll-mt-24"},T={__name:"EntityRepositorySection",setup(n){const o=i(`package com.example.demo.domain;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Nationalized;

import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * Entity đại diện cho Sản phẩm (Product).
 */
@Entity
@Table(name = "products", indexes = {
        @Index(name = "idx_product_brand", columnList = "brand_id"),
        @Index(name = "idx_product_model", columnList = "model_id"),
        @Index(name = "idx_product_store", columnList = "store_id")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Nationalized
    @Column(nullable = false)
    private String name;

    @Column(precision = 19, scale = 4)
    private BigDecimal price;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "brand_id")
    private Brand brand;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "model_id")
    private Model model;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "store_id")
    private Store store;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private Set<ProductCategory> productCategories = new HashSet<>();

    // Helper method for Many-to-Many via transient
    @Transient
    public void setCategories(Set<Category> categories) {
        if (this.productCategories == null) {
            this.productCategories = new HashSet<>();
        }
        this.productCategories.clear();
        if (categories != null) {
            this.productCategories.addAll(categories.stream()
                    .map(cat -> ProductCategory.builder()
                            .product(this)
                            .category(cat)
                            .build())
                    .collect(Collectors.toSet()));
        }
    }
}
`),c=i(`package com.example.demo.repository;

import com.example.demo.domain.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long>,
                                           JpaSpecificationExecutor<Product> {
}
`);return(w,e)=>(d(),l("section",f,[e[5]||(e[5]=t("h2",{class:"text-3xl font-bold text-slate-900 border-b pb-4 mb-8"},"3. Entity & Repository Layer",-1)),e[6]||(e[6]=t("p",{class:"text-slate-600 italic mb-6"},"Ánh xạ với bảng trong database và Repository JPA cho module Product.",-1)),t("div",g,[a(b)]),t("article",y,[e[0]||(e[0]=t("h3",{class:"text-xl font-bold text-slate-800 mb-3"},[t("span",{class:"bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm mr-3"},"3.1"),r(" Entity Definition ")],-1)),e[1]||(e[1]=t("p",{class:"text-slate-600 mb-3"},"Định nghĩa cấu trúc bảng và các mối quan hệ (ManyToOne, OneToMany).",-1)),a(s,{filename:"Product.java",code:o.value},null,8,["code"])]),t("article",h,[e[2]||(e[2]=t("h3",{class:"text-xl font-bold text-slate-800 mb-3"},[t("span",{class:"bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm mr-3"},"3.2"),r(" Repository Implementation ")],-1)),e[3]||(e[3]=t("p",{class:"text-slate-600 mb-3"},"Sử dụng Spring Data JPA Repository.",-1)),a(s,{filename:"ProductRepository.java",code:c.value},null,8,["code"]),e[4]||(e[4]=t("div",{class:"bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4 mt-4 text-sm text-yellow-800"},[t("strong",null,"Lưu ý:"),r(" Repository bắt buộc phải extends "),t("code",null,"JpaSpecificationExecutor"),r(" để hỗ trợ bộ lọc nâng cao (Specification). ")],-1))])]))}};export{T as default};
