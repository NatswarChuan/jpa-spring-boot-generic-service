import{_ as s}from"./CodeBlock-Jn8FeY8H.js";import{r,c as d,o as u,b as t,e as o,d as i}from"./index-Cgj9ESEa.js";const p={id:"usage",class:"scroll-mt-20 mb-16"},m={id:"usage-3-1",class:"mb-10 scroll-mt-24"},b={id:"usage-3-2",class:"mb-10 scroll-mt-24"},v={id:"usage-3-3",class:"mb-10 scroll-mt-24"},C={__name:"UsageSection",setup(P){const l=r(`
@Data
@NoArgsConstructor
public class ProductCreateReq implements IDto<Product> {
    private String name;
    private Double price;

    @Override
    public Product toEntity() {
        Product p = new Product();
        p.setName(this.name);
        p.setPrice(this.price);
        return p;
    }
}
`),n=r(`
@Data
@NoArgsConstructor
public class ProductUpdateReq implements IDto<Product> {
    private String name;
    private Double price;

    @Override
    public Product updateEntity(Product existingEntity) {
        if(this.name != null) existingEntity.setName(this.name);
        if(this.price != null) existingEntity.setPrice(this.price);
        return existingEntity;
    }
}
`),a=r(`
@Data
@NoArgsConstructor
public class ProductResponse implements IDto<Product> {
    private Long id;
    private String name;
    private Double price;

    @Override
    public void fromEntity(Product entity) {
        this.id = entity.getId();
        this.name = entity.getName();
        this.price = entity.getPrice();
    }
}
`),c=r(`
@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final IProductService service; // Inject Interface

    public ProductController(IProductService service) { 
        this.service = service; 
    }

    @PostMapping
    public ProductResponse create(@RequestBody ProductCreateReq req) {
        return service.create(req, ProductResponse.class);
    }
}
`);return(g,e)=>(u(),d("section",p,[e[6]||(e[6]=t("h2",{class:"text-3xl font-bold text-slate-900 border-b pb-4 mb-8"},"4. Hướng dẫn sử dụng (DTO Pattern)",-1)),t("article",m,[e[0]||(e[0]=t("h3",{class:"text-xl font-bold text-slate-800 mb-3"},"4.1. Request DTO (Create/Update)",-1)),e[1]||(e[1]=t("p",{class:"text-slate-600 mb-3"},"Tách biệt DTO tạo mới và cập nhật để kiểm soát dữ liệu đầu vào.",-1)),o(s,{filename:"ProductCreateReq.java",code:l.value},null,8,["code"]),o(s,{filename:"ProductUpdateReq.java",code:n.value},null,8,["code"])]),t("article",b,[e[2]||(e[2]=t("h3",{class:"text-xl font-bold text-slate-800 mb-3"},"4.2. Response DTO",-1)),e[3]||(e[3]=t("p",{class:"text-slate-600 mb-3"},[i("Dữ liệu trả về cho client. Cần override "),t("code",null,"fromEntity"),i(".")],-1)),o(s,{filename:"ProductResponse.java",code:a.value},null,8,["code"])]),t("article",v,[e[4]||(e[4]=t("h3",{class:"text-xl font-bold text-slate-800 mb-3"},"4.3. Controller Injection",-1)),e[5]||(e[5]=t("p",{class:"text-slate-600 mb-3"},"Inject Interface thay vì Class Implementation.",-1)),o(s,{filename:"ProductController.java",code:c.value},null,8,["code"])])]))}};export{C as default};
