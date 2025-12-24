import{_ as c}from"./CodeBlock-CUrVyKBF.js";import{f as l,c as s,o as i,b as e,F as d,r as p,n as u,t as n,e as m,d as h}from"./index-ByupLFOq.js";const b={id:"quick-start",class:"scroll-mt-20 mb-16"},g={class:"bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden"},v={class:"flex overflow-x-auto border-b border-slate-200 bg-slate-50"},P=["onClick"],f={class:"p-0"},D={class:"p-6 bg-blue-50 border-t border-blue-100"},R={class:"font-bold text-blue-900 mb-2"},C={class:"text-sm text-blue-800"},w={__name:"QuickStartSection",setup(x){const t=l("1. Entity"),r={"1. Entity":{filename:"Product.java",title:"Định nghĩa Entity",desc:"Entity JPA tiêu chuẩn. Framework hỗ trợ mọi loại ID (Long, String, UUID...).",code:`import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "product")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private Double price;
}`},"2. Repository":{filename:"ProductRepo.java",title:"Tạo Repository",desc:"Kế thừa JpaRepository và JpaSpecificationExecutor để hỗ trợ CRUD và tìm kiếm động.",code:`import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepo extends JpaRepository<Product, Long>, JpaSpecificationExecutor<Product> {
    // Không cần viết thêm code nào
}`},"3. DTOs":{filename:"ProductDTOs.java",title:"Định nghĩa các DTO",desc:"Implement IDto<E> để mapping tự động. Tách biệt Create, Update và Response.",code:`import com.natswarchuan.genericservice.dto.IDto;
import lombok.Data;

// 1. Request tạo mới
@Data
public class ProductCreateReq implements IDto<Product> {
    private String name;
    private Double price;
}

// 2. Request cập nhật
@Data
public class ProductUpdateReq implements IDto<Product> {
    private String name;
    private Double price;
}

// 3. Response trả về
@Data
public class ProductRes implements IDto<Product> {
    private Long id;
    private String name;
    private Double price;
}`},"4. Service":{filename:"ProductService.java",title:"Extend Base Service",desc:"Kế thừa AbService<E, ID> để có đầy đủ tính năng CRUD. Không cần khai báo DTO type tại đây.",code:`import com.natswarchuan.genericservice.service.AbService;
import org.springframework.stereotype.Service;

@Service
public class ProductService extends AbService<Product, Long> {
    
    public ProductService(ProductRepo repo) {
        super(repo);
    }
}`},"5. Controller":{filename:"ProductController.java",title:"Extend Base Controller",desc:"Kế thừa AbController và implement các interface Traits (ICreate, IUpdate...) để kích hoạt API.",code:`import com.natswarchuan.genericservice.controller.AbController;
import com.natswarchuan.genericservice.controller.trait.*;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/products")
public class ProductController extends AbController<Product, Long> 
    implements ICreateController<Product, Long, ProductCreateReq>,
               IUpdateController<Product, Long, ProductUpdateReq>,
               IDeleteController<Product, Long>,
               IReadController<Product, Long> {

    public ProductController(ProductService service) {
        super(service);
    }

    // Chỉ định DTO dùng cho phản hồi danh sách
    @Override
    public <R extends IDto<Product>> Class<R> getResponseSummaryDtoClass() {
        return (Class<R>) ProductRes.class;
    }

    // Chỉ định DTO dùng cho phản hồi chi tiết
    @Override
    public <R extends IDto<Product>> Class<R> getResponseDetailDtoClass() {
        return (Class<R>) ProductRes.class;
    }
}`}};return(y,o)=>(i(),s("section",b,[o[0]||(o[0]=e("h2",{class:"text-4xl font-bold text-slate-900 mb-6"},"4. Bắt đầu nhanh (Quick Start)",-1)),o[1]||(o[1]=e("p",{class:"text-lg text-slate-600 mb-8"}," Tạo ngay một bộ CRUD API hoàn chỉnh chỉ trong vài phút. Dưới đây là mã nguồn tối thiểu cần thiết cho một module quản lý sản phẩm (Product). ",-1)),e("div",g,[e("div",v,[(i(),s(d,null,p(r,(S,a)=>e("button",{key:a,onClick:I=>t.value=a,class:u(["px-6 py-3 text-sm font-bold whitespace-nowrap transition-colors",t.value===a?"bg-white text-blue-600 border-b-2 border-blue-600":"text-slate-500 hover:text-slate-700 hover:bg-slate-100"])},n(a),11,P)),64))]),e("div",f,[m(c,{filename:r[t.value].filename,code:r[t.value].code,language:"java",class:"!m-0 rounded-none border-0"},null,8,["filename","code"])]),e("div",D,[e("h4",R,"Giải thích: "+n(r[t.value].title),1),e("p",C,n(r[t.value].desc),1)])]),o[2]||(o[2]=e("div",{class:"mt-8 text-center"},[e("p",{class:"text-slate-600 mb-4"},"Bạn muốn hiểu rõ hơn về từng thành phần?"),e("a",{href:"#core-entity-repo",class:"inline-flex items-center text-blue-600 font-bold hover:underline"},[h(" Xem hướng dẫn chi tiết từng bước "),e("i",{class:"fas fa-arrow-right ml-2"})])],-1))]))}};export{w as default};
