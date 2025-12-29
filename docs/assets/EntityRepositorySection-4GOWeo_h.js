import{u as p,e as r,c,o as m,a as e,t as s,f as i}from"./index-CYRIV7B9.js";import{_ as a}from"./CodeBlock-BpSeFwgL.js";const u={id:"core-entity-repo",class:"scroll-mt-20 mb-16"},b={class:"text-3xl font-bold text-slate-900 border-b pb-4 mb-8"},y={class:"text-slate-600 italic mb-6"},_={id:"core-entity",class:"mb-10 scroll-mt-24"},x={class:"text-xl font-bold text-slate-800 mb-6"},g=["innerHTML"],h={class:"grid grid-cols-1 md:grid-cols-2 gap-4 mb-6"},f={class:"bg-white border border-slate-200 rounded-lg p-4 shadow-sm"},v={class:"flex items-center gap-2 mb-2"},T={class:"text-xs font-bold text-slate-500 uppercase"},L=["innerHTML"],C={class:"bg-white border border-slate-200 rounded-lg p-4 shadow-sm"},$={class:"flex items-center gap-2 mb-2"},w={class:"text-xs font-bold text-slate-500 uppercase"},M=["innerHTML"],H={class:"bg-white border border-slate-200 rounded-lg p-4 shadow-sm"},S=["innerHTML"],k={class:"bg-white border border-slate-200 rounded-lg p-4 shadow-sm"},I=["innerHTML"],B={id:"core-repo",class:"mb-10 scroll-mt-24"},R={class:"text-xl font-bold text-slate-800 mb-6"},A={class:"flex flex-col md:flex-row items-center gap-4 bg-slate-50 p-6 rounded-xl border border-slate-200 mb-6"},P={class:"flex-1 text-center md:text-right"},j={class:"text-xs text-slate-500"},N={class:"flex-1 text-center md:text-left"},D={class:"text-xs text-blue-500 font-bold"},E={class:"flex-1 bg-white p-3 rounded shadow-sm border border-green-200 text-center"},z={class:"block text-sm font-bold text-green-700"},O={class:"text-xs text-slate-500"},Y=["innerHTML"],F=["innerHTML"],Z={__name:"EntityRepositorySection",setup(G){const{t:n}=p(),l=r(()=>`package com.example.demo.domain;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Nationalized;

import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * ${n("entity_repo.entity.code.comment")}
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

    ${n("entity_repo.entity.code.comment_helper")}
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
`),d=r(()=>`package com.example.demo.repository;

import com.example.demo.domain.Product;
import com.natswarchuan.genericservice.repository.IRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends IRepository<Product, Long> {
}
`);return(t,o)=>(m(),c("section",u,[e("h2",b,s(t.$t("entity_repo.title")),1),e("p",y,s(t.$t("entity_repo.subtitle")),1),e("article",_,[e("h3",x,s(t.$t("entity_repo.entity.title")),1),e("p",{class:"text-slate-600 mb-6",innerHTML:t.$t("entity_repo.entity.desc")},null,8,g),e("div",h,[e("div",f,[e("div",v,[o[0]||(o[0]=e("code",{class:"text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded"},"@Entity",-1)),e("span",T,s(t.$t("entity_repo.entity.required")),1)]),e("p",{class:"text-sm text-slate-600",innerHTML:t.$t("entity_repo.entity.annotations.entity")},null,8,L)]),e("div",C,[e("div",$,[o[1]||(o[1]=e("code",{class:"text-purple-600 font-bold bg-purple-50 px-2 py-0.5 rounded"},"@Table",-1)),e("span",w,s(t.$t("entity_repo.entity.optional")),1)]),e("p",{class:"text-sm text-slate-600",innerHTML:t.$t("entity_repo.entity.annotations.table")},null,8,M)]),e("div",H,[o[2]||(o[2]=e("div",{class:"flex items-center gap-2 mb-2"},[e("code",{class:"text-amber-600 font-bold bg-amber-50 px-2 py-0.5 rounded"},"@Nationalized"),e("span",{class:"text-xs font-bold text-slate-500 uppercase"},"SQL Server")],-1)),e("p",{class:"text-sm text-slate-600",innerHTML:t.$t("entity_repo.entity.annotations.nationalized")},null,8,S)]),e("div",k,[o[3]||(o[3]=e("div",{class:"flex items-center gap-2 mb-2"},[e("code",{class:"text-green-600 font-bold bg-green-50 px-2 py-0.5 rounded"},"@Builder"),e("span",{class:"text-xs font-bold text-slate-500 uppercase"},"Lombok")],-1)),e("p",{class:"text-sm text-slate-600",innerHTML:t.$t("entity_repo.entity.annotations.builder")},null,8,I)])]),i(a,{filename:"Product.java",code:l.value},null,8,["code"])]),e("article",B,[e("h3",R,s(t.$t("entity_repo.repo.title")),1),e("div",A,[e("div",P,[o[4]||(o[4]=e("span",{class:"block font-mono font-bold text-slate-700"},"IRepository",-1)),e("span",j,s(t.$t("entity_repo.repo.diagram.standard"))+" + "+s(t.$t("entity_repo.repo.diagram.advanced")),1)]),o[6]||(o[6]=e("div",{class:"text-slate-400 text-2xl font-bold"},"=",-1)),e("div",N,[o[5]||(o[5]=e("span",{class:"block font-mono font-bold text-blue-600"},"Unified Interface",-1)),e("span",D,s(t.$t("entity_repo.repo.diagram.ready")),1)]),o[7]||(o[7]=e("div",{class:"hidden md:block h-12 w-px bg-slate-300 mx-2"},null,-1)),e("div",E,[e("span",z,s(t.$t("entity_repo.repo.diagram.ready")),1),e("span",O,s(t.$t("entity_repo.repo.diagram.required")),1)])]),e("p",{class:"text-slate-600 mb-3",innerHTML:t.$t("entity_repo.repo.desc")},null,8,Y),i(a,{filename:"ProductRepository.java",code:d.value},null,8,["code"]),e("div",{class:"bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4 mt-4 text-sm text-yellow-800",innerHTML:t.$t("entity_repo.repo.note")},null,8,F)])]))}};export{Z as default};
