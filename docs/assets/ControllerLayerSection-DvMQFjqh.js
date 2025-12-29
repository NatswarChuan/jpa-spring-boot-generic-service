import{u,e as r,c as x,o as _,a as e,t as l,b as a,d as i,f as d}from"./index-CYRIV7B9.js";import{_ as n}from"./CodeBlock-BpSeFwgL.js";const g={class:"mb-16"},y={id:"controller-layer",class:"scroll-mt-20"},h={class:"text-3xl font-bold text-slate-900 border-b pb-4 mb-8"},f={class:"text-slate-600 italic mb-6"},v={id:"controller-hierarchy",class:"mb-10 scroll-mt-24"},$={class:"text-xl font-bold text-slate-800 mb-3"},C=["innerHTML"],P={class:"mb-8 p-6 bg-slate-50 rounded-xl border border-slate-200 shadow-inner"},w={class:"grid grid-cols-1 lg:grid-cols-12 gap-6 items-center"},R={class:"lg:col-span-3 flex flex-col items-center p-4 bg-white rounded-lg border border-slate-200 shadow-sm"},L={class:"font-bold text-slate-500 text-xs uppercase mb-3 tracking-wide"},S={class:"lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4"},I={class:"bg-white p-5 rounded-lg border-2 border-indigo-100 hover:border-indigo-300 transition-colors shadow-sm relative group"},T={class:"absolute -top-3 -right-3 bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded shadow-sm z-10"},M={class:"text-xs text-slate-500 border-t border-slate-100 pt-2 mt-2"},k=["innerHTML"],D={class:"bg-white p-5 rounded-lg border-2 border-slate-200 hover:border-slate-300 transition-colors shadow-sm relative group"},H={class:"absolute -top-3 -right-3 bg-slate-500 text-white text-xs font-bold px-2 py-1 rounded shadow-sm z-10"},j={class:"text-xs text-slate-500 border-t border-slate-100 pt-2 mt-2"},B={id:"core-controller",class:"mb-10 scroll-mt-24"},E={class:"text-xl font-bold text-slate-800 mb-3"},q=["innerHTML"],O=["innerHTML"],N={id:"controller-traits",class:"mb-10 scroll-mt-24"},V={class:"text-xl font-bold text-slate-800 mb-3"},A={class:"text-slate-600 mb-6"},G={class:"mb-8 overflow-hidden bg-white border border-slate-200 rounded-lg shadow-sm"},U={class:"w-full text-left text-sm"},z={class:"bg-slate-50 text-slate-700 font-bold border-b border-slate-200"},F={class:"p-3"},J={class:"p-3"},K={class:"p-3"},Q={class:"divide-y divide-slate-100"},W={class:"p-3 font-mono text-blue-600"},X={class:"p-3 text-slate-600"},Y={class:"p-3 font-mono text-cyan-600"},Z={class:"p-3 text-slate-600"},ee={class:"p-3 font-mono text-purple-600"},te={class:"p-3 text-slate-600"},se={class:"p-3 font-mono text-orange-600"},le={class:"p-3 text-slate-600"},oe={class:"p-3 font-mono text-red-600"},re={class:"p-3 text-slate-600"},ae=["innerHTML"],de={class:"font-bold text-slate-700 mb-4"},ne={class:"grid grid-cols-1 md:grid-cols-2 gap-6"},ie={class:"bg-slate-50 p-5 rounded-lg border border-slate-200"},ce={class:"flex items-center mb-3"},be={class:"font-bold text-slate-800"},pe={class:"text-xs text-slate-500 mb-3 ml-11"},me={class:"bg-slate-50 p-5 rounded-lg border border-slate-200"},ue={class:"flex items-center mb-3"},xe={class:"font-bold text-slate-800"},_e={class:"text-xs text-slate-500 mb-3 ml-11"},ge={id:"custom-api",class:"mb-10 scroll-mt-24"},ye={class:"text-xl font-bold text-slate-800 mb-3"},he={class:"text-slate-600 mb-4"},Ce={__name:"ControllerLayerSection",setup(fe){const{t:o}=u(),c=r(()=>`package com.example.demo.controller;

import com.example.demo.domain.Product;
import com.example.demo.dto.product.*;
import com.example.demo.service.ProductService;
import com.natswarchuan.genericservice.controller.IController;
import com.natswarchuan.genericservice.service.IBaseService;
import org.springframework.web.bind.annotation.*;

${o("controller_layer.code.comment_class")}
@RestController
@RequestMapping("/api/v1/products")
public class ProductController implements IController<Product, Long, ProductCreateReq, ProductUpdateReq> {

    private final ProductService service;

    public ProductController(ProductService service) {
        this.service = service;
    }

    @Override
    public ProductService getBaseService() {
        return service;
    }

    @Override
    public Class<ProductRes> getResponseSummaryDtoClass() {
        // ${o("controller_layer.code.comment_summ")}
        return ProductRes.class;
    }

    @Override
    public Class<ProductDetailRes> getResponseDetailDtoClass() {
        // ${o("controller_layer.code.comment_detail")}
        return ProductDetailRes.class;
    }
}
`),b=r(()=>`public class ReadOnlyProductController 
    implements IReadSummaryController<Product, Long>,
               IReadDetailController<Product, Long> {
    
    // ... overrides getBaseService(), etc.
    ${o("controller_layer.code.comment_readonly")}
}
`),p=r(()=>`public class PublicProductController 
    implements IReadDetailController<Product, Long>,
               ICreateController<Product, Long, ProductCreateReq> {
    
    // ... overrides getBaseService(), etc.
    ${o("controller_layer.code.comment_public")}
}
`),m=r(()=>`@GetMapping("/filter")
public ResponseEntity<HttpApiResponse<PagedResponse<ProductRes>>> filterProducts(
        ProductFilterParam requestParam) {
    ${o("controller_layer.code.comment_custom_filter")}
    return this.findAll(requestParam, "en");
}
`);return(t,s)=>(_(),x("section",g,[e("div",y,[e("h2",h,l(t.$t("controller_layer.title")),1),e("p",f,l(t.$t("controller_layer.subtitle")),1)]),e("article",v,[e("h3",$,[s[0]||(s[0]=e("span",{class:"bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm mr-3"},"8.1",-1)),a(" "+l(t.$t("controller_layer.hierarchy.title")),1)]),e("p",{class:"text-slate-600 mb-6",innerHTML:t.$t("controller_layer.hierarchy.desc")},null,8,C),e("div",P,[e("div",w,[e("div",R,[e("h4",L,l(t.$t("controller_layer.hierarchy.diagram.available_traits")),1),s[1]||(s[1]=i('<div class="flex flex-col gap-2 w-full"><div class="bg-blue-50 text-blue-700 px-3 py-2 rounded text-xs font-bold border border-blue-100 text-center">IReadSummary...</div><div class="bg-cyan-50 text-cyan-700 px-3 py-2 rounded text-xs font-bold border border-cyan-100 text-center">IReadDetail...</div><div class="bg-pink-50 text-pink-700 px-3 py-2 rounded text-xs font-bold border border-pink-100 text-center">ICreate...</div><div class="bg-purple-50 text-purple-700 px-3 py-2 rounded text-xs font-bold border border-purple-100 text-center">IUpdate...</div><div class="bg-red-50 text-red-700 px-3 py-2 rounded text-xs font-bold border border-red-100 text-center">IDelete...</div></div>',1))]),s[5]||(s[5]=e("div",{class:"lg:col-span-1 flex justify-center text-slate-300"},[e("i",{class:"fas fa-chevron-right text-2xl hidden lg:block"}),e("i",{class:"fas fa-chevron-down text-2xl lg:hidden"})],-1)),e("div",S,[e("div",I,[e("div",T,l(t.$t("controller_layer.hierarchy.diagram.standard")),1),s[2]||(s[2]=e("h5",{class:"font-bold text-indigo-900 mb-2"},"MyStandardController",-1)),s[3]||(s[3]=e("div",{class:"flex items-center gap-2 mb-3"},[e("span",{class:"text-xs text-slate-400 italic"},"implements"),e("span",{class:"bg-indigo-100 text-indigo-700 px-2 py-1 rounded text-xs font-bold"},"IController")],-1)),e("div",M,[e("span",{innerHTML:t.$t("controller_layer.hierarchy.diagram.inherits")},null,8,k)])]),e("div",D,[e("div",H,l(t.$t("controller_layer.hierarchy.diagram.custom")),1),s[4]||(s[4]=i('<h5 class="font-bold text-slate-800 mb-2">MyCustomController</h5><div class="flex flex-wrap items-center gap-2 mb-3"><span class="text-xs text-slate-400 italic">implements</span><span class="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-bold">IReadSummary...</span><span class="text-slate-300">+</span><span class="bg-pink-100 text-pink-700 px-2 py-1 rounded text-xs font-bold">ICreate...</span></div>',2)),e("div",j,l(t.$t("controller_layer.hierarchy.diagram.selected")),1)])])])])]),e("article",B,[e("h3",E,[s[6]||(s[6]=e("span",{class:"bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm mr-3"},"8.2",-1)),a(" "+l(t.$t("controller_layer.core.title")),1)]),e("p",{class:"text-slate-600 mb-3",innerHTML:t.$t("controller_layer.core.desc")},null,8,q),d(n,{filename:"ProductController.java",code:c.value},null,8,["code"]),e("div",{class:"bg-blue-50 border-l-4 border-blue-500 p-4 mb-4 mt-4 text-sm text-blue-800",innerHTML:t.$t("controller_layer.core.note")},null,8,O)]),e("article",N,[e("h3",V,[s[7]||(s[7]=e("span",{class:"bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm mr-3"},"8.3",-1)),a(" "+l(t.$t("controller_layer.traits.title")),1)]),e("p",A,l(t.$t("controller_layer.traits.desc")),1),e("div",G,[e("table",U,[e("thead",z,[e("tr",null,[e("th",F,l(t.$t("controller_layer.traits.table.header.trait")),1),e("th",J,l(t.$t("controller_layer.traits.table.header.endpoint")),1),e("th",K,l(t.$t("controller_layer.traits.table.header.usecase")),1)])]),e("tbody",Q,[e("tr",null,[e("td",W,l(t.$t("controller_layer.traits.table.read_summary.title")),1),s[8]||(s[8]=e("td",{class:"p-3"},[e("span",{class:"bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-bold"},"GET /")],-1)),e("td",X,l(t.$t("controller_layer.traits.table.read_summary.usecase")),1)]),e("tr",null,[e("td",Y,l(t.$t("controller_layer.traits.table.read_detail.title")),1),s[9]||(s[9]=e("td",{class:"p-3"},[e("span",{class:"bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-bold"},"GET /{id}")],-1)),e("td",Z,l(t.$t("controller_layer.traits.table.read_detail.usecase")),1)]),e("tr",null,[e("td",ee,l(t.$t("controller_layer.traits.table.create.title")),1),s[10]||(s[10]=e("td",{class:"p-3"},[e("span",{class:"bg-amber-100 text-amber-700 px-2 py-0.5 rounded text-xs font-bold"},"POST /")],-1)),e("td",te,l(t.$t("controller_layer.traits.table.create.usecase")),1)]),e("tr",null,[e("td",se,l(t.$t("controller_layer.traits.table.update.title")),1),s[11]||(s[11]=e("td",{class:"p-3 space-x-2"},[e("span",{class:"bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs font-bold"},"PUT /{id}")],-1)),e("td",le,l(t.$t("controller_layer.traits.table.update.usecase")),1)]),e("tr",null,[e("td",oe,l(t.$t("controller_layer.traits.table.delete.title")),1),s[12]||(s[12]=e("td",{class:"p-3"},[e("span",{class:"bg-red-100 text-red-700 px-2 py-0.5 rounded text-xs font-bold"},"DELETE /{id}")],-1)),e("td",re,l(t.$t("controller_layer.traits.table.delete.usecase")),1)])])])]),e("div",{class:"mb-8 p-4 bg-amber-50 border-l-4 border-amber-500 text-amber-900 text-sm rounded-r",innerHTML:t.$t("controller_layer.traits.tip")},null,8,ae),e("h4",de,l(t.$t("controller_layer.traits.mix_match_title")),1),e("div",ne,[e("div",ie,[e("div",ce,[s[13]||(s[13]=e("div",{class:"w-8 h-8 rounded bg-blue-100 text-blue-600 flex items-center justify-center mr-3"},[e("i",{class:"fas fa-eye"})],-1)),e("h5",be,l(t.$t("controller_layer.traits.read_only.title")),1)]),e("p",pe,l(t.$t("controller_layer.traits.read_only.desc")),1),d(n,{filename:"ProductPublicController.java",code:b.value},null,8,["code"])]),e("div",me,[e("div",ue,[s[14]||(s[14]=e("div",{class:"w-8 h-8 rounded bg-amber-100 text-amber-600 flex items-center justify-center mr-3"},[e("i",{class:"fas fa-edit"})],-1)),e("h5",xe,l(t.$t("controller_layer.traits.append_only.title")),1)]),e("p",_e,l(t.$t("controller_layer.traits.append_only.desc")),1),d(n,{filename:"SystemLogController.java",code:p.value},null,8,["code"])])])]),e("article",ge,[e("h3",ye,[s[15]||(s[15]=e("span",{class:"bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm mr-3"},"8.4",-1)),a(" "+l(t.$t("controller_layer.custom.title")),1)]),e("p",he,l(t.$t("controller_layer.custom.desc")),1),d(n,{filename:"ProductController.java",code:m.value},null,8,["code"])])]))}};export{Ce as default};
