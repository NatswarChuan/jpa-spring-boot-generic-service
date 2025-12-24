import{_ as o}from"./CodeBlock-CUrVyKBF.js";import{f as a,c as d,o as c,b as t,a as s,e as r,d as l}from"./index-ByupLFOq.js";const p={id:"core-entity-repo",class:"scroll-mt-20 mb-16"},m={id:"core-entity",class:"mb-10 scroll-mt-24"},b={id:"core-repo",class:"mb-10 scroll-mt-24"},v={__name:"EntityRepositorySection",setup(u){const i=a(`package com.example.demo.domain;

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
`),n=a(`package com.example.demo.repository;

import com.example.demo.domain.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long>,
                                           JpaSpecificationExecutor<Product> {
}
`);return(x,e)=>(c(),d("section",p,[e[3]||(e[3]=t("h2",{class:"text-3xl font-bold text-slate-900 border-b pb-4 mb-8"},"5. Tầng Entity & Repository",-1)),e[4]||(e[4]=t("p",{class:"text-slate-600 italic mb-6"},"Ánh xạ với bảng trong database và Repository JPA cho module Product.",-1)),t("article",m,[e[0]||(e[0]=s('<h3 class="text-xl font-bold text-slate-800 mb-6"><span class="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm mr-3">5.1</span> Định nghĩa Entity </h3><p class="text-slate-600 mb-6">Định nghĩa cấu trúc bảng và các mối quan hệ (ManyToOne, OneToMany).</p><div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6"><div class="bg-white border border-slate-200 rounded-lg p-4 shadow-sm"><div class="flex items-center gap-2 mb-2"><code class="text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded">@Entity</code><span class="text-xs font-bold text-slate-500 uppercase">Bắt buộc</span></div><p class="text-sm text-slate-600">Đánh dấu class là một JPA Entity mapped với Database.</p></div><div class="bg-white border border-slate-200 rounded-lg p-4 shadow-sm"><div class="flex items-center gap-2 mb-2"><code class="text-purple-600 font-bold bg-purple-50 px-2 py-0.5 rounded">@Table</code><span class="text-xs font-bold text-slate-500 uppercase">Tùy chọn</span></div><p class="text-sm text-slate-600">Tùy chỉnh tên bảng và Index (Performance tuning).</p></div><div class="bg-white border border-slate-200 rounded-lg p-4 shadow-sm"><div class="flex items-center gap-2 mb-2"><code class="text-amber-600 font-bold bg-amber-50 px-2 py-0.5 rounded">@Nationalized</code><span class="text-xs font-bold text-slate-500 uppercase">SQL Server</span></div><p class="text-sm text-slate-600">Hỗ trợ lưu chuỗi Unicode (NVARCHAR) cho SQL Server.</p></div><div class="bg-white border border-slate-200 rounded-lg p-4 shadow-sm"><div class="flex items-center gap-2 mb-2"><code class="text-green-600 font-bold bg-green-50 px-2 py-0.5 rounded">@Builder</code><span class="text-xs font-bold text-slate-500 uppercase">Lombok</span></div><p class="text-sm text-slate-600">Tạo Builder pattern giúp khởi tạo object dễ dãng.</p></div></div>',3)),r(o,{filename:"Product.java",code:i.value},null,8,["code"])]),t("article",b,[e[1]||(e[1]=s('<h3 class="text-xl font-bold text-slate-800 mb-6"><span class="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm mr-3">5.2</span> Triển khai Repository </h3><div class="flex flex-col md:flex-row items-center gap-4 bg-slate-50 p-6 rounded-xl border border-slate-200 mb-6"><div class="flex-1 text-center md:text-right"><span class="block font-mono font-bold text-slate-700">JpaRepository</span><span class="text-xs text-slate-500">Standard CRUD</span></div><div class="text-slate-400 text-2xl font-bold">+</div><div class="flex-1 text-center md:text-left"><span class="block font-mono font-bold text-blue-600">JpaSpecificationExecutor</span><span class="text-xs text-blue-500 font-bold">Advanced Filters &amp; Search</span></div><div class="hidden md:block h-12 w-px bg-slate-300 mx-2"></div><div class="flex-1 bg-white p-3 rounded shadow-sm border border-green-200 text-center"><span class="block text-sm font-bold text-green-700">Ready for Generic Service</span><span class="text-xs text-slate-500">Required by AbService</span></div></div><p class="text-slate-600 mb-3">Triển khai Repository cực kỳ đơn giản, chỉ cần define Interface:</p>',3)),r(o,{filename:"ProductRepository.java",code:n.value},null,8,["code"]),e[2]||(e[2]=t("div",{class:"bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4 mt-4 text-sm text-yellow-800"},[t("strong",null,"Lưu ý:"),l(" Repository bắt buộc phải extends "),t("code",null,"JpaSpecificationExecutor"),l(" để hỗ trợ bộ lọc nâng cao (Specification). ")],-1))])]))}};export{v as default};
