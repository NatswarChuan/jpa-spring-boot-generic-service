import{u as c,e as r,c as m,o as b,a as t,t as s,f as a,b as i}from"./index-tzEnmmga.js";import{_ as n}from"./CodeBlock-43NKrjhX.js";const u={id:"core-entity-repo",class:"scroll-mt-20 mb-16"},x={class:"text-3xl font-bold text-slate-900 border-b pb-4 mb-8"},y={class:"text-slate-600 italic mb-6"},g={id:"core-entity",class:"mb-10 scroll-mt-24"},_={class:"text-xl font-bold text-slate-800 mb-6"},f={class:"text-slate-600 mb-6"},h={class:"grid grid-cols-1 md:grid-cols-2 gap-4 mb-6"},v={class:"bg-white border border-slate-200 rounded-lg p-4 shadow-sm"},C={class:"flex items-center gap-2 mb-2"},w={class:"text-xs font-bold text-slate-500 uppercase"},$={class:"text-sm text-slate-600"},S={class:"bg-white border border-slate-200 rounded-lg p-4 shadow-sm"},T={class:"flex items-center gap-2 mb-2"},k={class:"text-xs font-bold text-slate-500 uppercase"},L={class:"text-sm text-slate-600"},B={class:"bg-white border border-slate-200 rounded-lg p-4 shadow-sm"},j={class:"text-sm text-slate-600"},J={class:"bg-white border border-slate-200 rounded-lg p-4 shadow-sm"},M={class:"text-sm text-slate-600"},P={id:"core-repo",class:"mb-10 scroll-mt-24"},R={class:"text-xl font-bold text-slate-800 mb-6"},A={class:"flex flex-col md:flex-row items-center gap-4 bg-slate-50 p-6 rounded-xl border border-slate-200 mb-6"},E={class:"flex-1 text-center md:text-right"},N={class:"text-xs text-slate-500"},I={class:"flex-1 text-center md:text-left"},H={class:"text-xs text-blue-500 font-bold"},D={class:"flex-1 bg-white p-3 rounded shadow-sm border border-green-200 text-center"},z={class:"block text-sm font-bold text-green-700"},O={class:"text-xs text-slate-500"},V={class:"text-slate-600 mb-3"},Y=["innerHTML"],q={__name:"EntityRepositorySection",setup(F){const{t:l}=c(),d=r(()=>`package com.example.demo.domain;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Nationalized;

import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * ${l("entity_repo.entity.code.comment")}
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
`),p=r(()=>`package com.example.demo.repository;

import com.example.demo.domain.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long>,
                                           JpaSpecificationExecutor<Product> {
}
`);return(o,e)=>(b(),m("section",u,[t("h2",x,s(o.$t("entity_repo.title")),1),t("p",y,s(o.$t("entity_repo.subtitle")),1),t("article",g,[t("h3",_,[e[0]||(e[0]=t("span",{class:"bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm mr-3"},"5.1",-1)),i(" "+s(o.$t("entity_repo.entity.title")),1)]),t("p",f,s(o.$t("entity_repo.entity.desc")),1),t("div",h,[t("div",v,[t("div",C,[e[1]||(e[1]=t("code",{class:"text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded"},"@Entity",-1)),t("span",w,s(o.$t("entity_repo.entity.required")),1)]),t("p",$,s(o.$t("entity_repo.entity.annotations.entity")),1)]),t("div",S,[t("div",T,[e[2]||(e[2]=t("code",{class:"text-purple-600 font-bold bg-purple-50 px-2 py-0.5 rounded"},"@Table",-1)),t("span",k,s(o.$t("entity_repo.entity.optional")),1)]),t("p",L,s(o.$t("entity_repo.entity.annotations.table")),1)]),t("div",B,[e[3]||(e[3]=t("div",{class:"flex items-center gap-2 mb-2"},[t("code",{class:"text-amber-600 font-bold bg-amber-50 px-2 py-0.5 rounded"},"@Nationalized"),t("span",{class:"text-xs font-bold text-slate-500 uppercase"},"SQL Server")],-1)),t("p",j,s(o.$t("entity_repo.entity.annotations.nationalized")),1)]),t("div",J,[e[4]||(e[4]=t("div",{class:"flex items-center gap-2 mb-2"},[t("code",{class:"text-green-600 font-bold bg-green-50 px-2 py-0.5 rounded"},"@Builder"),t("span",{class:"text-xs font-bold text-slate-500 uppercase"},"Lombok")],-1)),t("p",M,s(o.$t("entity_repo.entity.annotations.builder")),1)])]),a(n,{filename:"Product.java",code:d.value},null,8,["code"])]),t("article",P,[t("h3",R,[e[5]||(e[5]=t("span",{class:"bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm mr-3"},"5.2",-1)),i(" "+s(o.$t("entity_repo.repo.title")),1)]),t("div",A,[t("div",E,[e[6]||(e[6]=t("span",{class:"block font-mono font-bold text-slate-700"},"JpaRepository",-1)),t("span",N,s(o.$t("entity_repo.repo.diagram.standard")),1)]),e[8]||(e[8]=t("div",{class:"text-slate-400 text-2xl font-bold"},"+",-1)),t("div",I,[e[7]||(e[7]=t("span",{class:"block font-mono font-bold text-blue-600"},"JpaSpecificationExecutor",-1)),t("span",H,s(o.$t("entity_repo.repo.diagram.advanced")),1)]),e[9]||(e[9]=t("div",{class:"hidden md:block h-12 w-px bg-slate-300 mx-2"},null,-1)),t("div",D,[t("span",z,s(o.$t("entity_repo.repo.diagram.ready")),1),t("span",O,s(o.$t("entity_repo.repo.diagram.required")),1)])]),t("p",V,s(o.$t("entity_repo.repo.desc")),1),a(n,{filename:"ProductRepository.java",code:p.value},null,8,["code"]),t("div",{class:"bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4 mt-4 text-sm text-yellow-800",innerHTML:o.$t("entity_repo.repo.note")},null,8,Y)])]))}};export{q as default};
