import{_ as a}from"./CodeBlock-rhId-KlK.js";import{r as o,c as d,o as g,b as t,e as n,d as i}from"./index-NytfIO67.js";const u={id:"validation",class:"scroll-mt-20 mb-16"},b={id:"val-basic",class:"mb-10 scroll-mt-24"},v={class:"space-y-6"},x={id:"val-custom",class:"mb-10 scroll-mt-24"},C={__name:"ValidationSection",setup(h){const s=o(`package com.example.demo.dto;

import com.example.demo.entity.Category;
import com.natswarchuan.genericservice.validation.Exists;
import com.natswarchuan.genericservice.validation.Unique;
import lombok.Data;

@Data
public class CategoryRequest {
    // ID danh mục cha phải TỒN TẠI trong bảng categories
    @Exists(entity = Category.class, message = "Danh mục cha không tồn tại")
    private Long parentId;

    // Tên danh mục phải là DUY NHẤT
    @Unique(entity = Category.class, field = "name", message = "Tên danh mục đã được sử dụng")
    private String name;
}
`),l=o(`package com.example.demo.dto;

import com.natswarchuan.genericservice.validation.EnumValue;
import lombok.Data;

public enum UserStatus { ACTIVE, INACTIVE, BANNED }

@Data
public class UserRequest {
    // Giá trị phải là "ACTIVE", "INACTIVE" hoặc "BANNED"
    @EnumValue(enumClass = UserStatus.class, message = "Trạng thái không hợp lệ")
    private String status;
}
`),r=o(`package com.example.demo.dto;

import com.natswarchuan.genericservice.validation.NoSpecialChars;
import com.natswarchuan.genericservice.validation.PhoneNumber;
import lombok.Data;

@Data
public class ProfileRequest {
    @PhoneNumber(message = "SĐT không đúng định dạng quốc tế")
    private String phone;

    @NoSpecialChars(message = "Tên đăng nhập không được chứa ký tự đặc biệt")
    private String username;
}
`),m=o(`package com.example.demo.dto;

import com.example.demo.entity.Department;
import com.example.demo.specification.ActiveDepartmentSpecLoader;
import com.natswarchuan.genericservice.validation.SpecValidation;
import lombok.Data;

@Data
public class ProductDto {
    // Kiểm tra departmentId phải thuộc về một Company đang Active
    @SpecValidation(
        entity = Department.class, 
        loader = ActiveDepartmentSpecLoader.class, 
        message = "Phòng ban không hợp lệ hoặc không hoạt động"
    )
    private Long departmentId;
}
`),c=o(`package com.example.demo.dto;

import com.example.demo.entity.User;
import com.example.demo.specification.UserUniqueInDeptSpec;
import com.natswarchuan.genericservice.dto.IDto;
import com.natswarchuan.genericservice.validation.DtoSpecValidation;
import lombok.Data;

@Data
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
`),p=o(`package com.example.demo.specification;

import com.example.demo.entity.User;
import com.natswarchuan.genericservice.validation.SpecificationLoader;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

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
`);return(S,e)=>(g(),d("section",u,[e[15]||(e[15]=t("h2",{class:"text-3xl font-bold text-slate-900 border-b pb-4 mb-8"},"7. Validation System",-1)),e[16]||(e[16]=t("p",{class:"text-slate-600 mb-6"},"Thư viện cung cấp bộ Annotation mạnh mẽ, tích hợp sẵn với Hibernate Validator và Spring Data JPA.",-1)),t("article",b,[e[6]||(e[6]=t("h3",{class:"text-xl font-bold text-slate-800 mb-3"},"7.1. Basic Constraints",-1)),e[7]||(e[7]=t("p",{class:"text-slate-600 mb-4"},"Các annotation kiểm tra định dạng hoặc ràng buộc đơn giản.",-1)),t("div",v,[t("div",null,[e[0]||(e[0]=t("h4",{class:"font-semibold text-slate-700"},"@Exists & @Unique",-1)),e[1]||(e[1]=t("p",{class:"text-sm text-slate-600 mb-2"},"Kiểm tra sự tồn tại của dữ liệu trong Database.",-1)),n(a,{filename:"CategoryRequest.java",code:s.value},null,8,["code"])]),t("div",null,[e[2]||(e[2]=t("h4",{class:"font-semibold text-slate-700"},"@EnumValue",-1)),e[3]||(e[3]=t("p",{class:"text-sm text-slate-600 mb-2"},"Kiểm tra giá trị String/Int có nằm trong tập hằng số của Enum hay không.",-1)),n(a,{filename:"UserRequest.java",code:l.value},null,8,["code"])]),t("div",null,[e[4]||(e[4]=t("h4",{class:"font-semibold text-slate-700"},"@PhoneNumber & @NoSpecialChars",-1)),e[5]||(e[5]=t("p",{class:"text-sm text-slate-600 mb-2"},"Validation số điện thoại và ký tự đặc biệt.",-1)),n(a,{filename:"ProfileRequest.java",code:r.value},null,8,["code"])])])]),t("article",x,[e[8]||(e[8]=t("h3",{class:"text-xl font-bold text-slate-800 mb-3"},"7.2. Custom Validators (Specification)",-1)),e[9]||(e[9]=t("p",{class:"text-slate-600 mb-4"},[i("Sử dụng "),t("strong",null,"Specification"),i(" để thực hiện các validation phức tạp.")],-1)),e[10]||(e[10]=t("h4",{class:"font-semibold text-slate-700 mt-4"},"@SpecValidation (Field Level)",-1)),e[11]||(e[11]=t("p",{class:"text-sm text-slate-600 mb-2"},"Validate trên một trường cụ thể.",-1)),n(a,{filename:"ProductDto.java",code:m.value},null,8,["code"]),e[12]||(e[12]=t("h4",{class:"font-semibold text-slate-700 mt-6"},"@DtoSpecValidation (Class Level)",-1)),e[13]||(e[13]=t("p",{class:"text-sm text-slate-600 mb-2"},[i("Khi logic validation phụ thuộc vào "),t("strong",null,"nhiều trường"),i(".")],-1)),n(a,{filename:"AddUserToDeptRequest.java",code:c.value},null,8,["code"]),e[14]||(e[14]=t("p",{class:"text-sm text-slate-600 mt-4 mb-2"},"Implement Loader:",-1)),n(a,{filename:"UserUniqueInDeptSpec.java",code:p.value},null,8,["code"])])]))}};export{C as default};
