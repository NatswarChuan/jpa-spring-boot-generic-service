import{_ as o}from"./CodeBlock-CU_Z1Au-.js";import{r as n,c as d,o as c,b as t,d as s,a,e as r}from"./index-Do97FJc2.js";const i={id:"response-wrappers",class:"scroll-mt-20 mb-16"},u={id:"res-http",class:"mb-10 scroll-mt-24"},g={id:"res-paged",class:"mb-10 scroll-mt-24"},P={__name:"ResponseSection",setup(h){const l=n(`
// 1. Trả về thành công (data là Object/List)
@GetMapping("/{id}")
public HttpApiResponse<ProductResponse> getDetail(@PathVariable Long id) {
    ProductResponse res = service.findById(id, ProductResponse.class);
    return HttpApiResponse.success(res); 
}

// 2. Trả về lỗi (thường dùng trong GlobalExceptionHandler)
return HttpApiResponse.error("Không tìm thấy sản phẩm", 404);
`),p=n(`
@GetMapping
public HttpApiResponse<PagedResponse<ProductResponse>> getList(Pageable pageable) {
    // 1. Gọi Service lấy Page<DTO>
    Page<ProductResponse> page = service.findAll(pageable, spec, ProductResponse.class);
    
    // 2. Convert sang PagedResponse
    PagedResponse<ProductResponse> paged = PagedResponse.of(page);
    
    // 3. Wrap trong HttpApiResponse
    return HttpApiResponse.success(paged);
}
`);return(b,e)=>(c(),d("section",i,[e[2]||(e[2]=t("h2",{class:"text-3xl font-bold text-slate-900 border-b pb-4 mb-8"},"8. Cấu trúc phản hồi (Response Standards)",-1)),e[3]||(e[3]=t("p",{class:"text-slate-600 mb-6"},[s(" Để đảm bảo tính nhất quán cho API, thư viện cung cấp 2 lớp wrap response chuẩn: "),t("code",null,"HttpApiResponse"),s(" và "),t("code",null,"PagedResponse"),s(". ")],-1)),t("article",u,[e[0]||(e[0]=a(`<h3 class="text-xl font-bold text-slate-800 mb-3">8.1. Phản hồi chung (HttpApiResponse)</h3><p class="text-slate-600 mb-3"> Mọi API (trừ file download) nên trả về định dạng này để Client dễ dàng parse. </p><div class="bg-slate-50 p-4 rounded-lg border border-slate-200 mb-4"><h4 class="font-bold text-slate-700 mb-2 text-sm">Cấu trúc JSON</h4><pre class="text-xs text-slate-600 font-mono bg-white p-3 rounded border border-slate-100 overflow-x-auto">{
  &quot;status&quot;: 200,            // Mã HTTP Status (200, 400, 404, 500...)
  &quot;message&quot;: &quot;Success&quot;,     // Thông điệp mô tả (Human readable)
  &quot;data&quot;: { ... }           // Dữ liệu chính (Object, List, hoặc null)
}
        </pre></div>`,3)),r(o,{filename:"MyController.java",code:l.value},null,8,["code"])]),t("article",g,[e[1]||(e[1]=a(`<h3 class="text-xl font-bold text-slate-800 mb-3">8.2. Phản hồi phân trang (PagedResponse)</h3><p class="text-slate-600 mb-3"> Dùng cho các API trả về danh sách có phân trang. Thay thế cho <code>Page&lt;T&gt;</code> mặc định của Spring để custom fields dễ hơn. </p><div class="bg-slate-50 p-4 rounded-lg border border-slate-200 mb-4"><h4 class="font-bold text-slate-700 mb-2 text-sm">Cấu trúc JSON</h4><pre class="text-xs text-slate-600 font-mono bg-white p-3 rounded border border-slate-100 overflow-x-auto">{
  &quot;content&quot;: [ ... ],       // Danh sách item của trang hiện tại
  &quot;page&quot;: 0,                // Số trang hiện tại (bắt đầu từ 0)
  &quot;size&quot;: 10,               // Kích thước trang
  &quot;totalElements&quot;: 100,     // Tổng số bản ghi
  &quot;totalPages&quot;: 10,         // Tổng số trang
  &quot;last&quot;: false             // Có phải trang cuối không?
}
        </pre></div>`,3)),r(o,{filename:"ProductController.java",code:p.value},null,8,["code"])])]))}};export{P as default};
