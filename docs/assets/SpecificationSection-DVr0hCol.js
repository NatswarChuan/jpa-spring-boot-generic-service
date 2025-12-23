import{_ as s}from"./CodeBlock-DU0nxMW6.js";import{r,c as p,o as i,a as l,b as t,d as c,e as a}from"./index-BKqiAm5w.js";const d={id:"specifications",class:"scroll-mt-20 mb-16"},m={id:"spec-custom",class:"mb-10 scroll-mt-24"},h={__name:"SpecificationSection",setup(u){const o=r(`package com.example.demo.dto.product;

import com.natswarchuan.genericservice.payload.request.BaseRequestParam;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class ProductFilterParam extends BaseRequestParam {
    private Double minPrice;
    private Double maxPrice;
    private String brandName; // Lọc theo tên Brand (Join)
    // Các field khác: modelId, categoryId...
}
`),n=r(`@RestController
@RequestMapping("/api/products")
public class ProductController extends AbController<Product, Long, ProductCreateReq, ProductUpdateReq> {

    // ... constructor ...

    // 1. Override findAll để bind đúng class Param
    @Override
    @GetMapping
    public ResponseEntity<HttpApiResponse<PagedResponse<ProductRes>>> findAll(
            ProductFilterParam requestParam, // <-- Dùng class custom param
            @RequestHeader(name = "Accept-Language", defaultValue = "en") String language) {
        return super.findAll(requestParam, language);
    }

    // 2. Override getSpecification để trả về Specification tùy chỉnh
    @Override
    protected Specification<Product> getSpecification(BaseRequestParam baseParam) {
        if (baseParam instanceof ProductFilterParam param) {
            // Trả về ProductSpecification để xử lý logic lọc nâng cao (minPrice, brandName, etc)
            return new ProductSpecification(param);
        }
        return super.getSpecification(baseParam);
    }
}
`);return(b,e)=>(i(),p("section",d,[e[3]||(e[3]=l('<h2 class="text-3xl font-bold text-slate-900 border-b pb-4 mb-8">9. Specification &amp; Dynamic Search</h2><p class="text-slate-600 mb-6 italic">Hướng dẫn về cách tạo Specification động cho các truy vấn phức tạp.</p><article id="spec-default" class="mb-10 scroll-mt-24"><h3 class="text-xl font-bold text-slate-800 mb-3"><span class="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm mr-3">9.1</span> Built-in Search API </h3><p class="text-slate-600 mb-4"> Ngay khi kế thừa <code>AbController</code>, bạn đã có sẵn API <code>GET /api/products</code> hỗ trợ phân trang, sắp xếp và tìm kiếm cơ bản mà <strong>không cần viết thêm code</strong>. </p><div class="bg-slate-50 border border-slate-200 rounded-lg p-5 mb-6"><h4 class="font-bold text-slate-700 mb-3 text-sm uppercase">Supported Query Parameters</h4><ul class="space-y-3 text-sm font-mono text-slate-600"><li><span class="bg-blue-100 text-blue-800 px-2 py-0.5 rounded">page</span> : Số trang (bắt đầu từ 0). Mặc định: 0</li><li><span class="bg-blue-100 text-blue-800 px-2 py-0.5 rounded">size</span> : Số lượng bản ghi/trang. Mặc định: 10</li><li><span class="bg-purple-100 text-purple-800 px-2 py-0.5 rounded">sort</span> : Trường sắp xếp (VD: price). Mặc định: id</li><li><span class="bg-purple-100 text-purple-800 px-2 py-0.5 rounded">dir</span> : Hướng sắp xếp (asc/desc). Mặc định: asc</li><li><span class="bg-green-100 text-green-800 px-2 py-0.5 rounded">search</span> : Từ khóa tìm kiếm</li><li><span class="bg-green-100 text-green-800 px-2 py-0.5 rounded">searchField</span> : Trường cần tìm kiếm (VD: name)</li></ul></div><div class="mb-4"><h4 class="font-semibold text-slate-700 mb-2">Example Usage:</h4><pre class="bg-slate-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">GET /api/products?page=0&amp;size=20&amp;sort=price&amp;dir=desc&amp;search=iphone&amp;searchField=name</pre><p class="text-xs text-slate-500 mt-2 italic"> -&gt; Lấy trang 0, 20 phần tử, sắp xếp giá giảm dần, tìm các sản phẩm có tên chứa &quot;iphone&quot;. </p></div></article>',3)),t("article",m,[e[0]||(e[0]=l('<h3 class="text-xl font-bold text-slate-800 mb-3"><span class="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm mr-3">9.2</span> Custom Filter (Advanced) </h3><p class="text-slate-600 mb-4"> Khi bạn cần các bộ lọc phức tạp hơn (ví dụ: khoảng giá, lọc theo danh mục), hãy mở rộng <code>BaseRequestParam</code> và Override method trong Controller. </p><h4 class="font-bold text-slate-700 mt-6 mb-2">Step 1: Tạo Request Param Custom</h4><p class="text-sm text-slate-600 mb-2">Kế thừa <code>BaseRequestParam</code> để thêm các field filter mới.</p>',4)),c(s,{filename:"ProductRequestParam.java",code:o.value},null,8,["code"]),e[1]||(e[1]=t("h4",{class:"font-bold text-slate-700 mt-6 mb-2"},"Step 2: Override Controller",-1)),e[2]||(e[2]=t("div",{class:"bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4 text-sm text-yellow-800"},[t("strong",null,"Lưu ý quan trọng:"),a(" Bạn bắt buộc phải override hàm "),t("code",null,"findAll"),a(" để Spring có thể map đúng class "),t("code",null,"ProductRequestParam"),a(" của bạn thay vì lớp cha. ")],-1)),c(s,{filename:"ProductController.java",code:n.value},null,8,["code"])])]))}};export{h as default};
