import{_ as s}from"./CodeBlock-Jn8FeY8H.js";import{r as o,c,o as i,b as t,d as a,e as l}from"./index-Cgj9ESEa.js";const p={id:"spec-examples",class:"scroll-mt-20 mb-16"},d={id:"spec-search",class:"mb-10 scroll-mt-24"},u={id:"spec-pageable",class:"mb-10 scroll-mt-24"},P={__name:"SpecificationSection",setup(m){const r=o(`
@GetMapping("/search")
public Page<ProductResponse> search(@RequestParam String name, 
                                    @RequestParam int page, 
                                    @RequestParam int size) {
    Specification<Product> spec = (root, query, cb) -> {
        if (name == null) return null;
        return cb.like(cb.lower(root.get("name")), "%" + name.toLowerCase() + "%");
    };
    return service.findAll(page, size, spec, ProductResponse.class);
}
`),n=o(`
@GetMapping("/list")
public Page<ProductResponse> list(@RequestParam(defaultValue = "0") int page,
                                  @RequestParam(defaultValue = "price") String sort,
                                  @RequestParam(defaultValue = "asc") String dir) {
    
    Sort.Direction direction = "desc".equals(dir) ? Sort.Direction.DESC : Sort.Direction.ASC;
    Pageable pageable = PageRequest.of(page, 10, Sort.by(direction, sort));
    
    return service.findAll(pageable, Specification.where(null), ProductResponse.class);
}
`);return(b,e)=>(i(),c("section",p,[e[3]||(e[3]=t("h2",{class:"text-3xl font-bold text-slate-900 border-b pb-4 mb-8"},"6. Ví dụ nâng cao: Specification",-1)),e[4]||(e[4]=t("p",{class:"text-slate-600 mb-6"},[a("Sử dụng "),t("code",null,"Specification"),a(" để xây dựng các bộ lọc động phức tạp.")],-1)),t("article",d,[e[0]||(e[0]=t("h3",{class:"text-xl font-bold text-slate-800 mb-3"},"6.1. Tìm kiếm cơ bản",-1)),l(s,{filename:"ProductController.java",code:r.value},null,8,["code"])]),t("article",u,[e[1]||(e[1]=t("h3",{class:"text-xl font-bold text-slate-800 mb-3"},"6.2. Phân trang & Sắp xếp",-1)),e[2]||(e[2]=t("p",{class:"text-slate-600 mb-3"},[a("Kết hợp "),t("code",null,"PageRequest"),a(" và "),t("code",null,"Sort"),a(".")],-1)),l(s,{filename:"ProductController.java",code:n.value},null,8,["code"])])]))}};export{P as default};
