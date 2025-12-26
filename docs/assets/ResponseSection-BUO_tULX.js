import{_ as s}from"./CodeBlock-Buf5vUgz.js";import{f as n,c as i,o as d,b as t,a as c,e as r,d as o}from"./index-dSggIF9O.js";const m={id:"response-handling",class:"scroll-mt-20 mb-16"},g={id:"res-structure",class:"mb-10 scroll-mt-24"},u={id:"res-exception",class:"mb-10 scroll-mt-24"},b={class:"grid grid-cols-1 md:grid-cols-2 gap-6"},x={class:"bg-slate-50 p-6 rounded-lg border border-slate-200 shadow-sm"},w={__name:"ResponseSection",setup(h){const a=n(`package com.example.demo.controller;

import com.example.demo.dto.ProductResponse;
import com.natswarchuan.genericservice.payload.response.HttpApiResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MyController { // ...
    
    // 1. Trả về thành công
    @GetMapping("/{id}")
    public HttpApiResponse<ProductResponse> getDetail(@PathVariable Long id) {
        ProductResponse res = service.findById(id, ProductResponse.class);
        return HttpApiResponse.success(res); 
    }

    // 2. Trả về lỗi thủ công (ít dùng, thường throw Exception)
    public HttpApiResponse<Void> handleError() {
        return HttpApiResponse.error("Không tìm thấy sản phẩm", 404);
    }
}
`),l=n(`package com.example.demo.controller;

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
        // 1. Gọi Service lấy Page<DTO>
        Page<ProductResponse> page = service.findAll(pageable, spec, ProductResponse.class);
        
        // 2. Wrap vào PagedResponse & HttpApiResponse
        return HttpApiResponse.success(PagedResponse.of(page));
    }
}
`),p=n(`package com.example.demo.service.impl;

import com.natswarchuan.genericservice.exception.HttpException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    
    public void deleteUser(Long id) {
        // Ném lỗi với Status Code và Message tùy chỉnh
        throw new HttpException(
            HttpStatus.NOT_FOUND, 
            "Không tìm thấy người dùng với ID: " + id
        );
    }
}
`);return(f,e)=>(d(),i("section",m,[e[7]||(e[7]=t("h2",{class:"text-3xl font-bold text-slate-900 border-b pb-4 mb-8"},"11. Xử lý Phản hồi (Response)",-1)),e[8]||(e[8]=t("p",{class:"text-slate-600 mb-6 italic"},"Cấu trúc kết quả trả về đồng nhất và cơ chế xử lý lỗi tập trung.",-1)),t("article",g,[e[0]||(e[0]=c(`<h3 class="text-xl font-bold text-slate-800 mb-3"><span class="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm mr-3">11.1</span> Cấu trúc Phản hồi </h3><p class="text-slate-600 mb-3"> Thư viện cung cấp 2 lớp wrap chuẩn: <code>HttpApiResponse</code> cho đối tượng đơn/list và <code>PagedResponse</code> cho phân trang. </p><div class="bg-slate-50 p-4 rounded-lg border border-slate-200 mb-4"><h4 class="font-bold text-slate-700 mb-2 text-sm">Cấu trúc JSON (HttpApiResponse)</h4><pre class="text-xs text-slate-600 font-mono bg-white p-3 rounded border border-slate-100 overflow-x-auto">{
  &quot;status&quot;: 200,            // Mã HTTP Status
  &quot;message&quot;: &quot;Success&quot;,     // Thông điệp Human readable
  &quot;data&quot;: { ... }           // Payload chi tiết
}
        </pre></div>`,3)),r(s,{filename:"MyController.java",code:a.value},null,8,["code"]),e[1]||(e[1]=t("h4",{class:"font-bold text-slate-700 mt-6 mb-2"},"PagedResponse (Phân trang)",-1)),e[2]||(e[2]=t("p",{class:"text-slate-600 mb-3 text-sm"},[o("Thay thế "),t("code",null,"Page<T>"),o(" mặc định để custom fields.")],-1)),r(s,{filename:"CustomController.java",code:l.value},null,8,["code"])]),t("article",u,[e[5]||(e[5]=t("h3",{class:"text-xl font-bold text-slate-800 mb-3"},[t("span",{class:"bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm mr-3"},"11.2"),o(" Xử lý Ngoại lệ ")],-1)),e[6]||(e[6]=t("p",{class:"text-slate-600 mb-4"},[o(" Sử dụng "),t("code",null,"HttpException"),o(" để ném lỗi từ Service/Controller. "),t("code",null,"GlobalExceptionHandler"),o(" sẽ tự động bắt và trả về format chuẩn. ")],-1)),t("div",b,[t("div",x,[e[3]||(e[3]=t("h4",{class:"text-lg font-bold text-slate-800 mb-2 font-mono text-sm"},"Throw Exception (Ném Lỗi)",-1)),r(s,{filename:"UserService.java",code:p.value},null,8,["code"])]),e[4]||(e[4]=t("div",{class:"bg-slate-50 p-6 rounded-lg border border-slate-200 shadow-sm"},[t("h4",{class:"text-lg font-bold text-slate-800 mb-2 font-mono text-sm"},"Standard Response (Phản hồi Chuẩn)"),t("pre",{class:"text-xs text-slate-600 font-mono bg-white p-3 rounded border border-slate-100 h-full"},`{
  "status": 404,
  "message": "Không tìm thấy người dùng với ID: 123",
  "data": null
}
          `)],-1))])])]))}};export{w as default};
