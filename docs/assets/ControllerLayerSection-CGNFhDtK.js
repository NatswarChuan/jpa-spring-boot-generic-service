import{u,e as r,c as b,o as x,a as e,t as l,b as a,d as _,f as n}from"./index-tzEnmmga.js";import{_ as d}from"./CodeBlock-43NKrjhX.js";const y={class:"mb-16"},g={id:"controller-layer",class:"scroll-mt-20"},h={class:"text-3xl font-bold text-slate-900 border-b pb-4 mb-8"},f={class:"text-slate-600 italic mb-6"},C={id:"controller-hierarchy",class:"mb-10 scroll-mt-24"},v={class:"text-xl font-bold text-slate-800 mb-3"},P={class:"text-slate-600 mb-6"},$={class:"mb-6 bg-white border border-slate-200 rounded-lg p-6 shadow-sm overflow-x-auto"},R={class:"space-y-2 font-mono text-sm leading-relaxed"},w={class:"flex items-center"},I={class:"mx-3 text-slate-400"},L={class:"ml-8 border-l-2 border-slate-200 pl-4 space-y-2"},D={class:"flex items-center"},T={class:"mx-3 text-slate-400"},S={class:"ml-8 border-l-2 border-slate-200 pl-4 space-y-4 pt-2"},A={class:"flex items-center"},k={class:"mx-3 text-slate-500 text-xs italic"},E={id:"core-controller",class:"mb-10 scroll-mt-24"},M={class:"text-xl font-bold text-slate-800 mb-3"},j=["innerHTML"],q=["innerHTML"],H={id:"controller-traits",class:"mb-10 scroll-mt-24"},O={class:"text-xl font-bold text-slate-800 mb-3"},U={class:"text-slate-600 mb-6"},B={class:"mb-8 overflow-hidden bg-white border border-slate-200 rounded-lg shadow-sm"},N={class:"w-full text-left text-sm"},V={class:"bg-slate-50 text-slate-700 font-bold border-b border-slate-200"},G={class:"p-3"},W={class:"p-3"},F={class:"p-3"},z={class:"divide-y divide-slate-100"},J={class:"p-3 text-slate-600"},K={class:"p-3 text-slate-600"},Q={class:"p-3 text-slate-600"},X={class:"p-3 text-slate-600"},Y={class:"font-bold text-slate-700 mb-4"},Z={class:"grid grid-cols-1 md:grid-cols-2 gap-6"},ee={class:"bg-slate-50 p-5 rounded-lg border border-slate-200"},te={class:"flex items-center mb-3"},se={class:"font-bold text-slate-800"},le={class:"text-xs text-slate-500 mb-3 ml-11"},oe={class:"bg-slate-50 p-5 rounded-lg border border-slate-200"},re={class:"flex items-center mb-3"},ae={class:"font-bold text-slate-800"},ne={class:"text-xs text-slate-500 mb-3 ml-11"},de={id:"custom-api",class:"mb-10 scroll-mt-24"},ce={class:"text-xl font-bold text-slate-800 mb-3"},ie={class:"text-slate-600 mb-4"},be={__name:"ControllerLayerSection",setup(pe){const{t:o}=u(),c=r(()=>`package com.example.demo.controller;

import com.example.demo.domain.Product;
import com.example.demo.dto.product.*;
import com.example.demo.service.ProductService;
import com.natswarchuan.genericservice.controller.AbController;
import com.natswarchuan.genericservice.controller.trait.*;
import com.natswarchuan.genericservice.dto.IDto;
import org.springframework.web.bind.annotation.*;

${o("controller_layer.code.comment_class")}
@RestController
@RequestMapping("/api/v1/products")
public class ProductController extends AbController<Product, Long>
        implements
        ICreateController<Product, Long, ProductCreateReq>,
        IUpdateController<Product, Long, ProductUpdateReq>,
        IDeleteController<Product, Long>,
        IReadController<Product, Long> {

    public ProductController(ProductService service) {
        super(service);
    }

    @Override
    @SuppressWarnings("unchecked")
    public <R extends IDto<Product>> Class<R> getResponseSummaryDtoClass() {
        // ${o("controller_layer.code.comment_summ")}
        return (Class<R>) ProductRes.class;
    }

    @Override
    @SuppressWarnings("unchecked")
    public <R extends IDto<Product>> Class<R> getResponseDetailDtoClass() {
        // ${o("controller_layer.code.comment_detail")}
        return (Class<R>) ProductDetailRes.class;
    }
}
`),i=r(()=>`public class ReadOnlyProductController 
    extends AbController<Product, Long>
    implements IReadController<Product, Long> {
    ${o("controller_layer.code.comment_readonly")}
}
`),p=r(()=>`public class PublicProductController 
    extends AbController<Product, Long>
    implements IReadController<Product, Long>,
               ICreateController<Product, Long, ProductCreateReq> {
    ${o("controller_layer.code.comment_public")}
}
`),m=r(()=>`@GetMapping("/filter")
public ResponseEntity<HttpApiResponse<PagedResponse<ProductRes>>> filterProducts(
        ProductFilterParam requestParam) {
    ${o("controller_layer.code.comment_custom_filter")}
    return this.findAll(requestParam, "en");
}
`);return(s,t)=>(x(),b("section",y,[e("div",g,[e("h2",h,l(s.$t("controller_layer.title")),1),e("p",f,l(s.$t("controller_layer.subtitle")),1)]),e("article",C,[e("h3",v,[t[0]||(t[0]=e("span",{class:"bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm mr-3"},"8.1",-1)),a(" "+l(s.$t("controller_layer.hierarchy.title")),1)]),e("p",P,l(s.$t("controller_layer.hierarchy.desc")),1),e("div",$,[e("div",R,[e("div",w,[t[1]||(t[1]=e("span",{class:"bg-slate-500 text-white px-3 py-0.5 rounded shadow-sm"},"IBaseController",-1)),e("span",I,l(s.$t("controller_layer.hierarchy.base_desc")),1)]),e("div",L,[e("div",D,[t[2]||(t[2]=e("span",{class:"bg-indigo-600 text-white px-3 py-0.5 rounded shadow-sm"},"AbController",-1)),e("span",T,l(s.$t("controller_layer.hierarchy.abstract_desc")),1)]),e("div",S,[e("div",A,[t[3]||(t[3]=e("span",{class:"bg-green-100 text-green-800 border border-green-200 px-3 py-0.5 rounded shadow-sm"},"MyController",-1)),e("span",k,l(s.$t("controller_layer.hierarchy.implements")),1),t[4]||(t[4]=_('<div class="flex flex-wrap gap-2"><span class="bg-amber-500 text-white px-2 py-0.5 rounded text-xs">IReadController</span><span class="bg-pink-500 text-white px-2 py-0.5 rounded text-xs">ICreateController</span><span class="bg-purple-500 text-white px-2 py-0.5 rounded text-xs">IUpdateController</span><span class="bg-red-500 text-white px-2 py-0.5 rounded text-xs">IDeleteController</span></div>',1))])])])])])]),e("article",E,[e("h3",M,[t[5]||(t[5]=e("span",{class:"bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm mr-3"},"8.2",-1)),a(" "+l(s.$t("controller_layer.core.title")),1)]),e("p",{class:"text-slate-600 mb-3",innerHTML:s.$t("controller_layer.core.desc")},null,8,j),n(d,{filename:"ProductController.java",code:c.value},null,8,["code"]),e("div",{class:"bg-blue-50 border-l-4 border-blue-500 p-4 mb-4 mt-4 text-sm text-blue-800",innerHTML:s.$t("controller_layer.core.note")},null,8,q)]),e("article",H,[e("h3",O,[t[6]||(t[6]=e("span",{class:"bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm mr-3"},"8.3",-1)),a(" "+l(s.$t("controller_layer.traits.title")),1)]),e("p",U,l(s.$t("controller_layer.traits.desc")),1),e("div",B,[e("table",N,[e("thead",V,[e("tr",null,[e("th",G,l(s.$t("controller_layer.traits.table.header.trait")),1),e("th",W,l(s.$t("controller_layer.traits.table.header.endpoint")),1),e("th",F,l(s.$t("controller_layer.traits.table.header.usecase")),1)])]),e("tbody",z,[e("tr",null,[t[7]||(t[7]=e("td",{class:"p-3 font-mono text-blue-600"},"IReadController",-1)),t[8]||(t[8]=e("td",{class:"p-3 space-x-2"},[e("span",{class:"bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-bold"},"GET /"),e("span",{class:"bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-bold"},"GET /{id}")],-1)),e("td",J,l(s.$t("controller_layer.traits.table.read.usecase")),1)]),e("tr",null,[t[9]||(t[9]=e("td",{class:"p-3 font-mono text-purple-600"},"ICreateController",-1)),t[10]||(t[10]=e("td",{class:"p-3"},[e("span",{class:"bg-amber-100 text-amber-700 px-2 py-0.5 rounded text-xs font-bold"},"POST /")],-1)),e("td",K,l(s.$t("controller_layer.traits.table.create.usecase")),1)]),e("tr",null,[t[11]||(t[11]=e("td",{class:"p-3 font-mono text-orange-600"},"IUpdateController",-1)),t[12]||(t[12]=e("td",{class:"p-3 space-x-2"},[e("span",{class:"bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs font-bold"},"PUT /{id}"),e("span",{class:"bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs font-bold"},"PATCH /{id}")],-1)),e("td",Q,l(s.$t("controller_layer.traits.table.update.usecase")),1)]),e("tr",null,[t[13]||(t[13]=e("td",{class:"p-3 font-mono text-red-600"},"IDeleteController",-1)),t[14]||(t[14]=e("td",{class:"p-3"},[e("span",{class:"bg-red-100 text-red-700 px-2 py-0.5 rounded text-xs font-bold"},"DELETE /{id}")],-1)),e("td",X,l(s.$t("controller_layer.traits.table.delete.usecase")),1)])])])]),e("h4",Y,l(s.$t("controller_layer.traits.mix_match_title")),1),e("div",Z,[e("div",ee,[e("div",te,[t[15]||(t[15]=e("div",{class:"w-8 h-8 rounded bg-blue-100 text-blue-600 flex items-center justify-center mr-3"},[e("i",{class:"fas fa-eye"})],-1)),e("h5",se,l(s.$t("controller_layer.traits.read_only.title")),1)]),e("p",le,l(s.$t("controller_layer.traits.read_only.desc")),1),n(d,{filename:"ProductPublicController.java",code:i.value},null,8,["code"])]),e("div",oe,[e("div",re,[t[16]||(t[16]=e("div",{class:"w-8 h-8 rounded bg-amber-100 text-amber-600 flex items-center justify-center mr-3"},[e("i",{class:"fas fa-edit"})],-1)),e("h5",ae,l(s.$t("controller_layer.traits.append_only.title")),1)]),e("p",ne,l(s.$t("controller_layer.traits.append_only.desc")),1),n(d,{filename:"SystemLogController.java",code:p.value},null,8,["code"])])])]),e("article",de,[e("h3",ce,[t[17]||(t[17]=e("span",{class:"bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm mr-3"},"8.4",-1)),a(" "+l(s.$t("controller_layer.custom.title")),1)]),e("p",ie,l(s.$t("controller_layer.custom.desc")),1),n(d,{filename:"ProductController.java",code:m.value},null,8,["code"])])]))}};export{be as default};
