import{_ as l}from"./CodeBlock-DU0nxMW6.js";import{r,c as i,o as u,b as e,d as s,e as o}from"./index-BKqiAm5w.js";const m={id:"controller-layer",class:"scroll-mt-20 mb-16"},p={id:"core-controller",class:"mb-10 scroll-mt-24"},b={id:"controller-traits",class:"mb-10 scroll-mt-24"},C={class:"grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-700"},g={class:"p-4 border border-slate-200 rounded-lg bg-slate-50"},P={class:"p-4 border border-slate-200 rounded-lg bg-slate-50"},x={id:"custom-api",class:"mb-10 scroll-mt-24"},A={__name:"ControllerLayerSection",setup(v){const n=r(`package com.example.demo.controller;

import com.example.demo.domain.Product;
import com.example.demo.dto.product.*;
import com.example.demo.service.ProductService;
import com.natswarchuan.genericservice.controller.AbController;
import com.natswarchuan.genericservice.controller.trait.*;
import com.natswarchuan.genericservice.dto.IDto;
import org.springframework.web.bind.annotation.*;

/**
 * Controller quản lý Sản phẩm (Product).
 * Kế thừa AbController và implement các trait để kích hoạt API CRUD.
 */
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
        return (Class<R>) ProductRes.class;
    }

    @Override
    @SuppressWarnings("unchecked")
    public <R extends IDto<Product>> Class<R> getResponseDetailDtoClass() {
        return (Class<R>) ProductDetailRes.class;
    }
}
`),a=r(`public class ReadOnlyProductController 
    extends AbController<Product, Long>
    implements IReadController<Product, Long> {
    // Chỉ có GET / và GET /{id}
}
`),c=r(`public class PublicProductController 
    extends AbController<Product, Long>
    implements IReadController<Product, Long>,
               ICreateController<Product, Long, ProductCreateReq> {
    // Có GET và POST, không có PUT/DELETE
}
`),d=r(`@GetMapping("/filter")
public ResponseEntity<HttpApiResponse<PagedResponse<ProductRes>>> filterProducts(
        ProductFilterParam requestParam) {
    // Gọi phương thức findAll của controller cơ sở
    return this.findAll(requestParam, "en");
}
`);return(R,t)=>(u(),i("section",m,[t[9]||(t[9]=e("h2",{class:"text-3xl font-bold text-slate-900 border-b pb-4 mb-8"},"5. Controller Layer",-1)),t[10]||(t[10]=e("p",{class:"text-slate-600 italic mb-6"},"Định nghĩa API endpoint và các trait hỗ trợ.",-1)),e("article",p,[t[0]||(t[0]=e("h3",{class:"text-xl font-bold text-slate-800 mb-3"},[e("span",{class:"bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm mr-3"},"5.1"),o(" Standard Controller ")],-1)),t[1]||(t[1]=e("p",{class:"text-slate-600 mb-3"},[o(" Kế thừa "),e("code",null,"AbController"),o(" và implement các trait (ICreateController, IReadController...) để kích hoạt API. ")],-1)),s(l,{filename:"ProductController.java",code:n.value},null,8,["code"]),t[2]||(t[2]=e("div",{class:"bg-blue-50 border-l-4 border-blue-500 p-4 mb-4 mt-4 text-sm text-blue-800"},[e("strong",null,"Lưu ý:"),o(" Override "),e("code",null,"getResponseSummaryDtoClass"),o(" và "),e("code",null,"getResponseDetailDtoClass"),o(" để xác định DTO trả về. ")],-1))]),e("article",b,[t[5]||(t[5]=e("h3",{class:"text-xl font-bold text-slate-800 mb-3"},[e("span",{class:"bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm mr-3"},"5.2"),o(" Controller Traits (Modular API) ")],-1)),t[6]||(t[6]=e("p",{class:"text-slate-600 mb-4"},"Chọn lọc API muốn cung cấp bằng cách implement Interface Trait tương ứng.",-1)),e("div",C,[e("div",g,[t[3]||(t[3]=e("p",{class:"font-bold mb-2"},"🔥 Read-Only Controller",-1)),s(l,{filename:"ReadOnlyController.java",code:a.value},null,8,["code"])]),e("div",P,[t[4]||(t[4]=e("p",{class:"font-bold mb-2"},"🚀 Create & Read Only",-1)),s(l,{filename:"PublicController.java",code:c.value},null,8,["code"])])])]),e("article",x,[t[7]||(t[7]=e("h3",{class:"text-xl font-bold text-slate-800 mb-3"},[e("span",{class:"bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm mr-3"},"5.3"),o(" Custom API Endpoints ")],-1)),t[8]||(t[8]=e("p",{class:"text-slate-600 mb-4"},"Thêm các xử lý riêng biệt bên cạnh generic API.",-1)),s(l,{filename:"ProductController.java",code:d.value},null,8,["code"])])]))}};export{A as default};
