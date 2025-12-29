import{u as c,e as n,c as d,o as m,a as e,t,f as r}from"./index-CYRIV7B9.js";import{_ as a}from"./CodeBlock-BpSeFwgL.js";const g={id:"response-handling",class:"scroll-mt-20 mb-16"},_={class:"text-3xl font-bold text-slate-900 border-b pb-4 mb-8"},u={class:"text-slate-600 mb-6 italic"},h={id:"res-structure",class:"mb-10 scroll-mt-24"},b={class:"text-xl font-bold text-slate-800 mb-3"},f=["innerHTML"],w={class:"bg-slate-50 p-4 rounded-lg border border-slate-200 mb-4"},x={class:"font-bold text-slate-700 mb-2 text-sm"},R={class:"text-xs text-slate-600 font-mono bg-white p-3 rounded border border-slate-100 overflow-x-auto"},v={class:"font-bold text-slate-700 mt-6 mb-2"},H=["innerHTML"],$={id:"res-exception",class:"mb-10 scroll-mt-24"},P={class:"text-xl font-bold text-slate-800 mb-3"},k=["innerHTML"],C={class:"grid grid-cols-1 md:grid-cols-2 gap-6"},M={class:"bg-slate-50 p-6 rounded-lg border border-slate-200 shadow-sm"},S={class:"text-lg font-bold text-slate-800 mb-2 font-mono text-sm"},y={class:"bg-slate-50 p-6 rounded-lg border border-slate-200 shadow-sm"},A={class:"text-lg font-bold text-slate-800 mb-2 font-mono text-sm"},L={class:"text-xs text-slate-600 font-mono bg-white p-3 rounded border border-slate-100 h-full"},V={__name:"ResponseSection",setup(T){const{t:o}=c(),l=n(()=>`package com.example.demo.controller;

import com.example.demo.dto.ProductResponse;
import com.natswarchuan.genericservice.payload.response.HttpApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MyController { // ...
    
    `+o("response_handling.code.comment_success")+`
    @GetMapping("/{id}")
    public HttpApiResponse<ProductResponse> getDetail(@PathVariable Long id) {
        ProductResponse res = service.findById(id, ProductResponse.class);
        return HttpApiResponse.success(res); 
    }

    `+o("response_handling.code.comment_manual_error")+`
    public HttpApiResponse<Void> handleError() {
        return HttpApiResponse.error(`+o("response_handling.code.msg_not_found")+`, HttpStatus.NOT_FOUND);
    }
}
`),i=n(()=>`package com.example.demo.controller;

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
        `+o("response_handling.code.comment_call_service")+`
        Page<ProductResponse> page = service.findAll(pageable, spec, ProductResponse.class);
        
        `+o("response_handling.code.comment_wrap")+`
        return HttpApiResponse.success(PagedResponse.of(page));
    }
}
`),p=n(()=>`package com.example.demo.service.impl;

import com.natswarchuan.genericservice.exception.HttpException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    
    public void deleteUser(Long id) {
        `+o("response_handling.code.comment_throw")+`
        throw new HttpException(
            HttpStatus.NOT_FOUND, 
            `+o("response_handling.code.msg_user_not_found")+`
        );
    }
}
`);return(s,N)=>(m(),d("section",g,[e("h2",_,t(s.$t("response_handling.title")),1),e("p",u,t(s.$t("response_handling.subtitle")),1),e("article",h,[e("h3",b,t(s.$t("response_handling.structure.title")),1),e("p",{class:"text-slate-600 mb-3",innerHTML:s.$t("response_handling.structure.desc")},null,8,f),e("div",w,[e("h4",x,t(s.$t("response_handling.structure.json_title")),1),e("pre",R,`{
  "status": 200,            `+t(s.$t("response_handling.code.comment_status"))+`
  "message": `+t(s.$t("response_handling.code.msg_success"))+",     "+t(s.$t("response_handling.code.comment_msg"))+`
  "success": true,          `+t(s.$t("response_handling.code.comment_success_flag"))+`
  "data": { ... }           `+t(s.$t("response_handling.code.comment_payload"))+`
}
        `,1)]),r(a,{filename:"MyController.java",code:l.value},null,8,["code"]),e("h4",v,t(s.$t("response_handling.structure.paged_title")),1),e("p",{class:"text-slate-600 mb-3 text-sm",innerHTML:s.$t("response_handling.structure.paged_desc")},null,8,H),r(a,{filename:"CustomController.java",code:i.value},null,8,["code"])]),e("article",$,[e("h3",P,t(s.$t("response_handling.exception.title")),1),e("p",{class:"text-slate-600 mb-4",innerHTML:s.$t("response_handling.exception.desc")},null,8,k),e("div",C,[e("div",M,[e("h4",S,t(s.$t("response_handling.exception.throw_title")),1),r(a,{filename:"UserService.java",code:p.value},null,8,["code"])]),e("div",y,[e("h4",A,t(s.$t("response_handling.exception.standard_title")),1),e("pre",L,`{
  "status": 404,
  "message": `+t(s.$t("response_handling.code.msg_user_404"))+`,
  "success": false,
  "data": null
}
          `,1)])])])]))}};export{V as default};
