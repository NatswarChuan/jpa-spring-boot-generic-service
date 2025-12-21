import{_ as r}from"./CodeBlock-DBZk2lcI.js";import{r as a,c as l,o as c,b as o,d as t,e as i}from"./index-B66TvSSb.js";const p={id:"specifications",class:"scroll-mt-20 mb-16"},m={id:"spec-basic",class:"mb-10 scroll-mt-24"},d={id:"spec-adv",class:"mb-10 scroll-mt-24"},P={__name:"SpecificationSection",setup(g){const n=a(`package com.example.demo.controller;

import com.example.demo.dto.ProductResponse;
import com.example.demo.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ProductController { // ... extends AbController

    @GetMapping("/search")
    public Page<ProductResponse> search(@RequestParam String name, 
                                        @RequestParam int page, 
                                        @RequestParam int size) {
        Specification<Product> spec = (root, query, cb) -> {
            if (name == null) return null;
            return cb.like(cb.lower(root.get("name")), "%" + name.toLowerCase() + "%");
        };
        return service.findAll(page, size, spec, ProductResponse.class);
    }
}
`),s=a(`package com.example.demo.controller;

import com.example.demo.dto.ProductResponse;
import com.example.demo.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ProductController { // ... extends AbController

    @GetMapping("/list")
    public Page<ProductResponse> list(@RequestParam(defaultValue = "0") int page,
                                      @RequestParam(defaultValue = "price") String sort,
                                      @RequestParam(defaultValue = "asc") String dir) {
        
        Sort.Direction direction = "desc".equals(dir) ? Sort.Direction.DESC : Sort.Direction.ASC;
        Pageable pageable = PageRequest.of(page, 10, Sort.by(direction, sort));
        
        return service.findAll(pageable, Specification.where(null), ProductResponse.class);
    }
}
`);return(u,e)=>(c(),l("section",p,[e[3]||(e[3]=o("h2",{class:"text-3xl font-bold text-slate-900 border-b pb-4 mb-8"},"6. Specification & Search",-1)),e[4]||(e[4]=o("p",{class:"text-slate-600 mb-6"},[t("Sử dụng "),o("code",null,"Specification"),t(" để xây dựng các bộ lọc động phức tạp.")],-1)),o("article",m,[e[0]||(e[0]=o("h3",{class:"text-xl font-bold text-slate-800 mb-3"},"6.1. Basic Search",-1)),i(r,{filename:"ProductController.java",code:n.value},null,8,["code"])]),o("article",d,[e[1]||(e[1]=o("h3",{class:"text-xl font-bold text-slate-800 mb-3"},"6.2. Advanced Features (Pageable & Sort)",-1)),e[2]||(e[2]=o("p",{class:"text-slate-600 mb-3"},[t("Kết hợp "),o("code",null,"PageRequest"),t(" và "),o("code",null,"Sort"),t(".")],-1)),i(r,{filename:"ProductController.java",code:s.value},null,8,["code"])])]))}};export{P as default};
