import{_ as l}from"./CodeBlock-BG1DIOSQ.js";import{r as s,c as d,o as p,b as e,d as o,e as r}from"./index-BqOVmnp8.js";const m={id:"implementation",class:"scroll-mt-20 mb-16"},u={id:"step2-1",class:"mb-10 scroll-mt-24"},b={id:"step2-2",class:"mb-10 scroll-mt-24"},x={id:"step2-3",class:"mb-10 scroll-mt-24"},v={id:"step2-4",class:"mb-10 scroll-mt-24"},P={__name:"ImplementationSection",setup(f){const n=s(`
@Entity
@Table(name = "products")
@Data
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private Double price;
}
`),i=s(`
@Repository
public interface ProductRepository extends JpaRepository<Product, Long>, 
                                           JpaSpecificationExecutor<Product> {
}
`),a=s(`
public interface IProductService extends IService<Product, Long> {
    // Định nghĩa thêm hàm riêng nếu cần
}
`),c=s(`
@Service
@Transactional
public class ProductServiceImpl extends AbService<Product, Long> implements IProductService {

    @Autowired
    public ProductServiceImpl(ProductRepository repository) {
        super(repository);
    }
}
`);return(g,t)=>(p(),d("section",m,[t[8]||(t[8]=e("h2",{class:"text-3xl font-bold text-slate-900 border-b pb-4 mb-8"},"2. Hướng dẫn triển khai",-1)),t[9]||(t[9]=e("p",{class:"text-slate-600 italic mb-6"},[o("Ví dụ minh họa cho module quản lý "),e("strong",null,"Product"),o(".")],-1)),e("article",u,[t[0]||(t[0]=e("h3",{class:"text-xl font-bold text-slate-800 mb-3"},"2.1. Định nghĩa Entity",-1)),t[1]||(t[1]=e("p",{class:"text-slate-600 mb-3"},"Ánh xạ với bảng trong database.",-1)),r(l,{filename:"Product.java",code:n.value},null,8,["code"])]),e("article",b,[t[2]||(t[2]=e("h3",{class:"text-xl font-bold text-slate-800 mb-3"},"2.2. Tạo Repository",-1)),t[3]||(t[3]=e("div",{class:"bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4 text-sm text-yellow-800"},[e("strong",null,"Lưu ý:"),o(" Bắt buộc phải extends "),e("code",null,"JpaSpecificationExecutor"),o(" để hỗ trợ bộ lọc nâng cao. ")],-1)),r(l,{filename:"ProductRepository.java",code:i.value},null,8,["code"])]),e("article",x,[t[4]||(t[4]=e("h3",{class:"text-xl font-bold text-slate-800 mb-3"},"2.3. Tạo Service Interface",-1)),t[5]||(t[5]=e("p",{class:"text-slate-600 mb-3"},[o("Kế thừa từ "),e("code",null,"IService"),o(" để có sẵn hợp đồng CRUD.")],-1)),r(l,{filename:"IProductService.java",code:a.value},null,8,["code"])]),e("article",v,[t[6]||(t[6]=e("h3",{class:"text-xl font-bold text-slate-800 mb-3"},"2.4. Tạo Service Implementation",-1)),t[7]||(t[7]=e("p",{class:"text-slate-600 mb-3"},[o("Kế thừa "),e("code",null,"AbService"),o(" để tái sử dụng logic.")],-1)),r(l,{filename:"ProductServiceImpl.java",code:c.value},null,8,["code"])])]))}};export{P as default};
