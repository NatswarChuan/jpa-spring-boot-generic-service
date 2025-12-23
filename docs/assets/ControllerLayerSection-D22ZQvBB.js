import{_ as r}from"./CodeBlock-BkvZVepJ.js";import{r as l,c as i,o as u,b as t,d as s,e as o}from"./index-BT1pOG7q.js";const m={id:"controller-layer",class:"scroll-mt-20 mb-16"},p={id:"core-controller",class:"mb-10 scroll-mt-24"},b={id:"controller-traits",class:"mb-10 scroll-mt-24"},C={class:"grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-700"},P={class:"p-4 border border-slate-200 rounded-lg bg-slate-50"},g={class:"p-4 border border-slate-200 rounded-lg bg-slate-50"},x={id:"custom-api",class:"mb-10 scroll-mt-24"},A={__name:"ControllerLayerSection",setup(v){const n=l(`package com.example.demo.controller;

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
`),a=l(`public class ReadOnlyProductController 
    extends AbController<Product, Long>
    implements IReadController<Product, Long> {
    // Chỉ có GET / và GET /{id}
}
`),c=l(`public class PublicProductController 
    extends AbController<Product, Long>
    implements IReadController<Product, Long>,
               ICreateController<Product, Long, ProductCreateReq> {
    // Có GET và POST, không có PUT/DELETE
}
`),d=l(`@GetMapping("/filter")
public ResponseEntity<HttpApiResponse<PagedResponse<ProductRes>>> filterProducts(
        ProductFilterParam requestParam) {
    // Gọi phương thức findAll của controller cơ sở
    return this.findAll(requestParam, "en");
}
`);return(R,e)=>(u(),i("section",m,[e[9]||(e[9]=t("h2",{class:"text-3xl font-bold text-slate-900 border-b pb-4 mb-8"},"5. Controller Layer",-1)),e[10]||(e[10]=t("p",{class:"text-slate-600 italic mb-6"},"Định nghĩa API endpoint và các trait hỗ trợ.",-1)),t("article",p,[e[0]||(e[0]=t("h3",{class:"text-xl font-bold text-slate-800 mb-3"},"5.1. Standard Controller",-1)),e[1]||(e[1]=t("p",{class:"text-slate-600 mb-3"},[o(" Kế thừa "),t("code",null,"AbController"),o(" và implement các trait (ICreateController, IReadController...) để kích hoạt API. ")],-1)),s(r,{filename:"ProductController.java",code:n.value},null,8,["code"]),e[2]||(e[2]=t("div",{class:"bg-blue-50 border-l-4 border-blue-500 p-4 mb-4 mt-4 text-sm text-blue-800"},[t("strong",null,"Lưu ý:"),o(" Override "),t("code",null,"getResponseSummaryDtoClass"),o(" và "),t("code",null,"getResponseDetailDtoClass"),o(" để xác định DTO trả về. ")],-1))]),t("article",b,[e[5]||(e[5]=t("h3",{class:"text-xl font-bold text-slate-800 mb-3"},"5.2. Controller Traits (Modular API)",-1)),e[6]||(e[6]=t("p",{class:"text-slate-600 mb-4"},"Chọn lọc API muốn cung cấp bằng cách implement Interface Trait tương ứng.",-1)),t("div",C,[t("div",P,[e[3]||(e[3]=t("p",{class:"font-bold mb-2"},"🔥 Read-Only Controller",-1)),s(r,{filename:"ReadOnlyController.java",code:a.value},null,8,["code"])]),t("div",g,[e[4]||(e[4]=t("p",{class:"font-bold mb-2"},"🚀 Create & Read Only",-1)),s(r,{filename:"PublicController.java",code:c.value},null,8,["code"])])])]),t("article",x,[e[7]||(e[7]=t("h3",{class:"text-xl font-bold text-slate-800 mb-3"},"5.3. Custom API Endpoints",-1)),e[8]||(e[8]=t("p",{class:"text-slate-600 mb-4"},"Thêm các xử lý riêng biệt bên cạnh generic API.",-1)),s(r,{filename:"ProductController.java",code:d.value},null,8,["code"])])]))}};export{A as default};
