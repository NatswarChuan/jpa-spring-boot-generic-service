import{u as m,e as r,c as g,o as u,a as e,t,f as a,b as i}from"./index-tzEnmmga.js";import{_ as l}from"./CodeBlock-43NKrjhX.js";const _={id:"response-handling",class:"scroll-mt-20 mb-16"},b={class:"text-3xl font-bold text-slate-900 border-b pb-4 mb-8"},h={class:"text-slate-600 mb-6 italic"},f={id:"res-structure",class:"mb-10 scroll-mt-24"},x={class:"text-xl font-bold text-slate-800 mb-3"},w=["innerHTML"],R={class:"bg-slate-50 p-4 rounded-lg border border-slate-200 mb-4"},v={class:"font-bold text-slate-700 mb-2 text-sm"},$={class:"text-xs text-slate-600 font-mono bg-white p-3 rounded border border-slate-100 overflow-x-auto"},H={class:"font-bold text-slate-700 mt-6 mb-2"},P=["innerHTML"],k={id:"res-exception",class:"mb-10 scroll-mt-24"},C={class:"text-xl font-bold text-slate-800 mb-3"},M=["innerHTML"],y={class:"grid grid-cols-1 md:grid-cols-2 gap-6"},A={class:"bg-slate-50 p-6 rounded-lg border border-slate-200 shadow-sm"},L={class:"text-lg font-bold text-slate-800 mb-2 font-mono text-sm"},S={class:"bg-slate-50 p-6 rounded-lg border border-slate-200 shadow-sm"},T={class:"text-lg font-bold text-slate-800 mb-2 font-mono text-sm"},V={class:"text-xs text-slate-600 font-mono bg-white p-3 rounded border border-slate-100 h-full"},B={__name:"ResponseSection",setup(E){const{t:o}=m(),d=r(()=>`package com.example.demo.controller;

import com.example.demo.dto.ProductResponse;
import com.natswarchuan.genericservice.payload.response.HttpApiResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MyController { // ...
    
    ${o("response_handling.code.comment_success")}
    @GetMapping("/{id}")
    public HttpApiResponse<ProductResponse> getDetail(@PathVariable Long id) {
        ProductResponse res = service.findById(id, ProductResponse.class);
        return HttpApiResponse.success(res); 
    }

    ${o("response_handling.code.comment_manual_error")}
    public HttpApiResponse<Void> handleError() {
        return HttpApiResponse.error(${o("response_handling.code.msg_not_found")}, 404);
    }
}
`),p=r(()=>`package com.example.demo.controller;

import com.example.demo.dto.res.ProductResponse;
import com.natswarchuan.genericservice.payload.response.HttpApiResponse;
import com.natswarchuan.genericservice.payload.response.PagedResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CustomController { // ...

    @GetMapping
    public HttpApiResponse<PagedResponse<ProductResponse>> getList(Pageable pageable) {
        ${o("response_handling.code.comment_call_service")}
        Page<ProductResponse> page = service.findAll(pageable, spec, ProductResponse.class);
        
        ${o("response_handling.code.comment_wrap")}
        return HttpApiResponse.success(PagedResponse.of(page));
    }
}
`),c=r(()=>`package com.example.demo.service.impl;

import com.natswarchuan.genericservice.exception.HttpException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    
    public void deleteUser(Long id) {
        ${o("response_handling.code.comment_throw")}
        throw new HttpException(
            HttpStatus.NOT_FOUND, 
            ${o("response_handling.code.msg_user_not_found")}
        );
    }
}
`);return(s,n)=>(u(),g("section",_,[e("h2",b,t(s.$t("response_handling.title")),1),e("p",h,t(s.$t("response_handling.subtitle")),1),e("article",f,[e("h3",x,[n[0]||(n[0]=e("span",{class:"bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm mr-3"},"11.1",-1)),i(" "+t(s.$t("response_handling.structure.title")),1)]),e("p",{class:"text-slate-600 mb-3",innerHTML:s.$t("response_handling.structure.desc")},null,8,w),e("div",R,[e("h4",v,t(s.$t("response_handling.structure.json_title")),1),e("pre",$,`{
  "status": 200,            `+t(s.$t("response_handling.code.comment_status"))+`
  "message": `+t(s.$t("response_handling.code.msg_success"))+",     "+t(s.$t("response_handling.code.comment_msg"))+`
  "data": { ... }           `+t(s.$t("response_handling.code.comment_payload"))+`
}
        `,1)]),a(l,{filename:"MyController.java",code:d.value},null,8,["code"]),e("h4",H,t(s.$t("response_handling.structure.paged_title")),1),e("p",{class:"text-slate-600 mb-3 text-sm",innerHTML:s.$t("response_handling.structure.paged_desc")},null,8,P),a(l,{filename:"CustomController.java",code:p.value},null,8,["code"])]),e("article",k,[e("h3",C,[n[1]||(n[1]=e("span",{class:"bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm mr-3"},"11.2",-1)),i(" "+t(s.$t("response_handling.exception.title")),1)]),e("p",{class:"text-slate-600 mb-4",innerHTML:s.$t("response_handling.exception.desc")},null,8,M),e("div",y,[e("div",A,[e("h4",L,t(s.$t("response_handling.exception.throw_title")),1),a(l,{filename:"UserService.java",code:c.value},null,8,["code"])]),e("div",S,[e("h4",T,t(s.$t("response_handling.exception.standard_title")),1),e("pre",V,`{
  "status": 404,
  "message": `+t(s.$t("response_handling.code.msg_user_404"))+`,
  "data": null
}
          `,1)])])])]))}};export{B as default};
