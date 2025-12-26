import{_ as r}from"./CodeBlock-Buf5vUgz.js";import{f as c,c as d,o as p,a as i,b as t,e as o,d as a}from"./index-dSggIF9O.js";const m={id:"specifications",class:"scroll-mt-20 mb-16"},u={id:"spec-custom",class:"mb-10 scroll-mt-24"},h={__name:"SpecificationSection",setup(b){const s=c(`package com.example.demo.dto.product;

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
`),n=c(`package com.example.demo.specification;

import com.example.demo.domain.Brand;
import com.example.demo.domain.Product;
import com.example.demo.dto.product.ProductFilterParam;
import com.natswarchuan.genericservice.specification.GenericSpecification;
import jakarta.persistence.criteria.*;
import java.util.ArrayList;
import java.util.List;

public class ProductSpecification extends GenericSpecification<Product> {

    private final ProductFilterParam productParam;

    public ProductSpecification(ProductFilterParam requestParam) {
        super(requestParam);
        this.productParam = requestParam;
    }

    @Override
    public Predicate toPredicate(Root<Product> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
        // 1. Reuse logic default
        Predicate basePredicate = super.toPredicate(root, query, cb);
        List<Predicate> predicates = new ArrayList<>();
        predicates.add(basePredicate);

        // 2. Custom logic: Price Range
        if (productParam.getMinPrice() != null) {
            predicates.add(cb.greaterThanOrEqualTo(root.get("price"), productParam.getMinPrice()));
        }
        if (productParam.getMaxPrice() != null) {
            predicates.add(cb.lessThanOrEqualTo(root.get("price"), productParam.getMaxPrice()));
        }

        // 3. Custom logic: Join Brand
        if (productParam.getBrandName() != null && !productParam.getBrandName().isEmpty()) {
            Join<Product, Brand> brandJoin = root.join("brand", JoinType.INNER);
            predicates.add(cb.like(cb.lower(brandJoin.get("name")), 
                "%" + productParam.getBrandName().toLowerCase() + "%"));
        }

        return cb.and(predicates.toArray(new Predicate[0]));
    }
}
`),l=c(`@RestController
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
`);return(g,e)=>(p(),d("section",m,[e[5]||(e[5]=i('<h2 class="text-3xl font-bold text-slate-900 border-b pb-4 mb-8">10. Specification &amp; Tìm kiếm Động</h2><p class="text-slate-600 mb-6 italic">Hướng dẫn về cách tạo Specification động cho các truy vấn phức tạp.</p><article id="spec-default" class="mb-10 scroll-mt-24"><h3 class="text-xl font-bold text-slate-800 mb-3"><span class="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm mr-3">10.1</span> API Tìm kiếm Tích hợp </h3><p class="text-slate-600 mb-4"> Ngay khi kế thừa <code>AbController</code>, bạn đã có sẵn API <code>GET /api/products</code> hỗ trợ phân trang, sắp xếp và tìm kiếm cơ bản mà <strong>không cần viết thêm code</strong>. </p><div class="bg-slate-50 border border-slate-200 rounded-lg p-5 mb-6"><h4 class="font-bold text-slate-700 mb-3 text-sm uppercase">Tham số Truy vấn Hỗ trợ (Supported Query Parameters)</h4><ul class="space-y-3 text-sm font-mono text-slate-600"><li><span class="bg-blue-100 text-blue-800 px-2 py-0.5 rounded">page</span> : Số trang (bắt đầu từ 0). Mặc định: 0</li><li><span class="bg-blue-100 text-blue-800 px-2 py-0.5 rounded">size</span> : Số lượng bản ghi/trang. Mặc định: 10</li><li><span class="bg-purple-100 text-purple-800 px-2 py-0.5 rounded">sort</span> : Trường sắp xếp (VD: price). Mặc định: id</li><li><span class="bg-purple-100 text-purple-800 px-2 py-0.5 rounded">dir</span> : Hướng sắp xếp (asc/desc). Mặc định: asc</li><li><span class="bg-green-100 text-green-800 px-2 py-0.5 rounded">search</span> : Từ khóa tìm kiếm</li><li><span class="bg-green-100 text-green-800 px-2 py-0.5 rounded">searchField</span> : Trường cần tìm kiếm (VD: name)</li></ul></div><div class="mb-4"><h4 class="font-semibold text-slate-700 mb-2">Ví dụ Sử dụng (Example Usage):</h4><pre class="bg-slate-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">GET /api/products?page=0&amp;size=20&amp;sort=price&amp;dir=desc&amp;search=iphone&amp;searchField=name</pre><p class="text-xs text-slate-500 mt-2 italic"> -&gt; Lấy trang 0, 20 phần tử, sắp xếp giá giảm dần, tìm các sản phẩm có tên chứa &quot;iphone&quot;. </p></div></article>',3)),t("article",u,[e[0]||(e[0]=i('<h3 class="text-xl font-bold text-slate-800 mb-3"><span class="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm mr-3">10.2</span> Bộ lọc Tùy chỉnh (Advance) </h3><p class="text-slate-600 mb-4"> Khi bạn cần các bộ lọc phức tạp hơn (ví dụ: khoảng giá, lọc theo danh mục), hãy mở rộng <code>BaseRequestParam</code> và Override method trong Controller. </p><h4 class="font-bold text-slate-700 mt-6 mb-2">Bước 1: Tạo Request Param Custom</h4><p class="text-sm text-slate-600 mb-2">Kế thừa <code>BaseRequestParam</code> để thêm các field filter mới.</p>',4)),o(r,{filename:"ProductRequestParam.java",code:s.value},null,8,["code"]),e[1]||(e[1]=t("h4",{class:"font-bold text-slate-700 mt-6 mb-2"},"Bước 2: Triển khai Custom Specification",-1)),e[2]||(e[2]=t("p",{class:"text-sm text-slate-600 mb-2"},[a("Tạo class "),t("code",null,"ProductSpecification"),a(" kế thừa "),t("code",null,"GenericSpecification"),a(" để xử lý logic filter chuyên sâu.")],-1)),o(r,{filename:"ProductSpecification.java",code:n.value},null,8,["code"]),e[3]||(e[3]=t("h4",{class:"font-bold text-slate-700 mt-6 mb-2"},"Bước 3: Override Controller",-1)),e[4]||(e[4]=t("div",{class:"bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4 text-sm text-yellow-800"},[t("strong",null,"Lưu ý quan trọng:"),a(" Bạn bắt buộc phải override hàm "),t("code",null,"findAll"),a(" để Spring có thể map đúng class "),t("code",null,"ProductRequestParam"),a(" của bạn thay vì lớp cha. ")],-1)),o(r,{filename:"ProductController.java",code:l.value},null,8,["code"])])]))}};export{h as default};
