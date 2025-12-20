import{_ as n}from"./CodeBlock-CU_Z1Au-.js";import{r as s,c as p,o as g,b as e,e as a,a as u,d as l}from"./index-Do97FJc2.js";const b={id:"validation",class:"scroll-mt-20 mb-16"},h={id:"val-basic",class:"mb-10 scroll-mt-24"},v={class:"space-y-6"},x={id:"val-spec",class:"mb-10 scroll-mt-24"},f={id:"val-dto",class:"mb-10 scroll-mt-24"},I={__name:"ValidationSection",setup(S){const i=s(`
public class CategoryRequest {
    // ID danh mục cha phải TỒN TẠI trong bảng categories
    @Exists(entity = Category.class, message = "Danh mục cha không tồn tại")
    private Long parentId;

    // Tên danh mục phải là DUY NHẤT
    @Unique(entity = Category.class, field = "name", message = "Tên danh mục đã được sử dụng")
    private String name;
}
`),o=s(`
public enum UserStatus { ACTIVE, INACTIVE, BANNED }

public class UserRequest {
    // Giá trị phải là "ACTIVE", "INACTIVE" hoặc "BANNED"
    @EnumValue(enumClass = UserStatus.class, message = "Trạng thái không hợp lệ")
    private String status;
}
`),r=s(`
public class ProfileRequest {
    @PhoneNumber(message = "SĐT không đúng định dạng quốc tế")
    private String phone;

    @NoSpecialChars(message = "Tên đăng nhập không được chứa ký tự đặc biệt")
    private String username;
}
`),c=s(`
// Kiểm tra departmentId phải thuộc về một Company đang Active
@SpecValidation(
    entity = Department.class, 
    loader = ActiveDepartmentSpecLoader.class, 
    message = "Phòng ban không hợp lệ hoặc không hoạt động"
)
private Long departmentId;
`),d=s(`
@DtoSpecValidation(
    loader = UserUniqueInDeptSpec.class,
    mustExist = false, // Yêu cầu KHÔNG ĐƯỢC tồn tại (Check trùng)
    message = "User này đã tồn tại trong phòng ban này rồi"
)
public class AddUserToDeptRequest implements IDto<User> {
    private Long departmentId;
    private String employeeCode;
    // ...
}
`),m=s(`
@Component
public class UserUniqueInDeptSpec implements SpecificationLoader<Object, User> {
    @Override
    public Specification<User> getSpecification(Object... args) {
        // args[0] = departmentId
        // args[1] = employeeCode
        Long deptId = (Long) args[0];
        String empCode = (String) args[1];

        return (root, query, cb) -> cb.and(
            cb.equal(root.get("department").get("id"), deptId),
            cb.equal(root.get("employeeCode"), empCode)
        );
    }
}
`);return(C,t)=>(g(),p("section",b,[t[14]||(t[14]=e("h2",{class:"text-3xl font-bold text-slate-900 border-b pb-4 mb-8"},"7. Validation Annotations",-1)),t[15]||(t[15]=e("p",{class:"text-slate-600 mb-6"},"Thư viện cung cấp bộ Annotation mạnh mẽ, tích hợp sẵn với Hibernate Validator và Spring Data JPA để kiểm tra tính hợp lệ của dữ liệu.",-1)),e("article",h,[t[6]||(t[6]=e("h3",{class:"text-xl font-bold text-slate-800 mb-3"},"7.1. Validation Cơ bản",-1)),t[7]||(t[7]=e("p",{class:"text-slate-600 mb-4"},"Các annotation kiểm tra định dạng hoặc ràng buộc đơn giản.",-1)),e("div",v,[e("div",null,[t[0]||(t[0]=e("h4",{class:"font-semibold text-slate-700"},"@Exists & @Unique",-1)),t[1]||(t[1]=e("p",{class:"text-sm text-slate-600 mb-2"},"Kiểm tra sự tồn tại của dữ liệu trong Database. Yêu cầu Entity phải được quản lý bởi JPA.",-1)),a(n,{filename:"UserDto.java",code:i.value},null,8,["code"])]),e("div",null,[t[2]||(t[2]=e("h4",{class:"font-semibold text-slate-700"},"@EnumValue",-1)),t[3]||(t[3]=e("p",{class:"text-sm text-slate-600 mb-2"},"Kiểm tra giá trị String/Int có nằm trong tập hằng số của Enum hay không.",-1)),a(n,{filename:"UserDto.java",code:o.value},null,8,["code"])]),e("div",null,[t[4]||(t[4]=e("h4",{class:"font-semibold text-slate-700"},"@PhoneNumber & @NoSpecialChars",-1)),t[5]||(t[5]=e("p",{class:"text-sm text-slate-600 mb-2"},"Validation số điện thoại và ký tự đặc biệt.",-1)),a(n,{filename:"UserDto.java",code:r.value},null,8,["code"])])])]),e("article",x,[t[8]||(t[8]=u('<h3 class="text-xl font-bold text-slate-800 mb-3">7.2. Advanced Specification Validation</h3><p class="text-slate-600 mb-4"> Sử dụng <strong>Specification</strong> để thực hiện các validation phức tạp (VD: kiểm tra quan hệ nhiều bảng, logic nghiệp vụ động). </p><div class="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6"><h4 class="font-bold text-blue-700">Cơ chế SpecificationLoader</h4><p class="text-sm text-blue-800 mt-1"> Để sử dụng tính năng này, bạn cần implement interface <code>SpecificationLoader</code>. Phương thức <code>getSpecification(T... args)</code> sẽ nhận vào các tham số cần thiết để tạo query. </p></div><h4 class="font-semibold text-slate-700 mt-4">@SpecValidation (Field Level)</h4><p class="text-sm text-slate-600 mb-2">Validate trên một trường cụ thể.</p>',5)),a(n,{filename:"ProductDto.java",code:c.value},null,8,["code"])]),e("article",f,[t[9]||(t[9]=e("h3",{class:"text-xl font-bold text-slate-800 mb-3"},"7.3. DTO Level Validation",-1)),t[10]||(t[10]=e("p",{class:"text-slate-600 mb-4"},[l(" Khi logic validation phụ thuộc vào "),e("strong",null,"nhiều trường"),l(" trong DTO cùng lúc. ")],-1)),t[11]||(t[11]=e("h4",{class:"font-semibold text-slate-700"},"@DtoSpecValidation",-1)),t[12]||(t[12]=e("p",{class:"text-sm text-slate-600 mb-2"},[l(" Annotation đặt trên Class level. Validator sẽ truyền "),e("strong",null,"giá trị của tất cả các field"),l(" trong DTO vào "),e("code",null,"SpecificationLoader"),l(". ")],-1)),a(n,{filename:"OrderDto.java",code:d.value},null,8,["code"]),t[13]||(t[13]=e("p",{class:"text-sm text-slate-600 mt-4 mb-2"},"Implement Loader nhận dynamic arguments:",-1)),a(n,{filename:"UniqueUserInDeptSpec.java",code:m.value},null,8,["code"])])]))}};export{I as default};
