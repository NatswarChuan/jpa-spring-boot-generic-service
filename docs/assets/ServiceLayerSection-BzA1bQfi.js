import{_ as s}from"./CodeBlock-DU0nxMW6.js";import{r,c as n,o as a,b as t,d as l,e as o,a as p}from"./index-BKqiAm5w.js";const d={id:"service-layer",class:"scroll-mt-20 mb-16"},m={id:"core-service",class:"mb-10 scroll-mt-24"},u={id:"service-hooks",class:"mb-10 scroll-mt-24"},b={class:"space-y-4"},f={__name:"ServiceLayerSection",setup(g){const i=r(`package com.example.demo.service;

import com.example.demo.domain.Product;
import com.example.demo.repository.ProductRepository;
import com.natswarchuan.genericservice.service.AbService;
import org.springframework.stereotype.Service;
import org.springframework.lang.NonNull;

/**
 * Service xử lý nghiệp vụ cho Product.
 * Kế thừa AbService để tận dụng logic CRUD có sẵn.
 */
@Service
public class ProductService extends AbService<Product, Long> {

    public ProductService(@NonNull ProductRepository repository) {
        super(repository);
    }
}
`),c=r(`@Override
protected void beforeCreate(Product entity) {
    // Tự động tính toán giá khuyến mãi
    if (entity.getPrice().compareTo(BigDecimal.valueOf(1000)) > 0) {
        entity.setPrice(entity.getPrice().multiply(BigDecimal.valueOf(0.9)));
    }
}

@Override
protected void afterCreate(Product entity) {
    // Gửi thông báo sau khi tạo thành công
    notificationService.send("New product added: " + entity.getName());
}
`);return(v,e)=>(a(),n("section",d,[e[6]||(e[6]=t("h2",{class:"text-3xl font-bold text-slate-900 border-b pb-4 mb-8"},"4. Service Layer",-1)),e[7]||(e[7]=t("p",{class:"text-slate-600 italic mb-6"},"Xử lý logic nghiệp vụ và tích hợp các life-cycle hooks.",-1)),t("article",m,[e[0]||(e[0]=t("h3",{class:"text-xl font-bold text-slate-800 mb-3"},[t("span",{class:"bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm mr-3"},"4.1"),o(" Basic Service ")],-1)),e[1]||(e[1]=t("p",{class:"text-slate-600 mb-3"},[o("Kế thừa "),t("code",null,"AbService"),o(" để có sẵn các phương thức CRUD chuẩn hóa.")],-1)),l(s,{filename:"ProductService.java",code:i.value},null,8,["code"]),e[2]||(e[2]=t("div",{class:"bg-green-50 border-l-4 border-green-500 p-4 mb-4 mt-4 text-sm text-green-800 shadow-sm"},[t("strong",null,"Tips:"),o(" Bạn không nhất thiết phải tạo Interface cho Service. "),t("code",null,"AbService"),o(" đã cung cấp đủ các phương thức thông dụng. ")],-1))]),t("article",u,[e[4]||(e[4]=t("h3",{class:"text-xl font-bold text-slate-800 mb-3"},[t("span",{class:"bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm mr-3"},"4.2"),o(" Life-cycle Hooks ")],-1)),e[5]||(e[5]=t("p",{class:"text-slate-600 mb-4"},' Framework cho phép "can thiệp" vào luồng xử lý mà không cần override toàn bộ phương thức. ',-1)),t("div",b,[e[3]||(e[3]=p('<div class="bg-slate-900 rounded-lg p-4 font-mono text-sm text-green-400"><p class="text-slate-500 mb-2">// Các hook hỗ trợ trong AbService:</p><ul class="space-y-1"><li>- <span class="text-blue-400">beforeCreate</span>(E entity)</li><li>- <span class="text-blue-400">afterCreate</span>(E entity)</li><li>- <span class="text-blue-400">beforeUpdate</span>(E newEntity, E oldEntity)</li><li>- <span class="text-blue-400">afterUpdate</span>(E savedEntity, E oldEntity)</li><li>- <span class="text-blue-400">beforeDelete</span>(E entity)</li><li>- <span class="text-blue-400">afterDelete</span>(E entity)</li></ul></div><p class="text-sm text-slate-600">Ví dụ: Tự động tính toán hoặc gửi thông báo:</p>',2)),l(s,{filename:"ProductService.java",code:c.value},null,8,["code"])])])]))}};export{f as default};
