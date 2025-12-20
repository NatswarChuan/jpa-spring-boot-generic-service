<template>
  <section id="validation" class="scroll-mt-20 mb-16">
    <h2 class="text-3xl font-bold text-slate-900 border-b pb-4 mb-8">7. Validation Annotations</h2>
    <p class="text-slate-600 mb-6">Thư viện cung cấp bộ Annotation mạnh mẽ, tích hợp sẵn với Hibernate Validator và Spring Data JPA để kiểm tra tính hợp lệ của dữ liệu.</p>

    <!-- 7.1 Basic Validation -->
    <article id="val-basic" class="mb-10 scroll-mt-24">
      <h3 class="text-xl font-bold text-slate-800 mb-3">7.1. Validation Cơ bản</h3>
      <p class="text-slate-600 mb-4">Các annotation kiểm tra định dạng hoặc ràng buộc đơn giản.</p>
      
      <div class="space-y-6">
        <div>
          <h4 class="font-semibold text-slate-700">@Exists & @Unique</h4>
          <p class="text-sm text-slate-600 mb-2">Kiểm tra sự tồn tại của dữ liệu trong Database. Yêu cầu Entity phải được quản lý bởi JPA.</p>
          <CodeBlock filename="UserDto.java" :code="existsUniqueCode" />
        </div>

        <div>
          <h4 class="font-semibold text-slate-700">@EnumValue</h4>
          <p class="text-sm text-slate-600 mb-2">Kiểm tra giá trị String/Int có nằm trong tập hằng số của Enum hay không.</p>
          <CodeBlock filename="UserDto.java" :code="enumValCode" />
        </div>

        <div>
          <h4 class="font-semibold text-slate-700">@PhoneNumber & @NoSpecialChars</h4>
          <p class="text-sm text-slate-600 mb-2">Validation số điện thoại và ký tự đặc biệt.</p>
          <CodeBlock filename="UserDto.java" :code="formatCode" />
        </div>
      </div>
    </article>

    <!-- 7.2 Specification Validation -->
    <article id="val-spec" class="mb-10 scroll-mt-24">
      <h3 class="text-xl font-bold text-slate-800 mb-3">7.2. Advanced Specification Validation</h3>
      <p class="text-slate-600 mb-4">
        Sử dụng <strong>Specification</strong> để thực hiện các validation phức tạp (VD: kiểm tra quan hệ nhiều bảng, logic nghiệp vụ động).
      </p>

      <div class="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
        <h4 class="font-bold text-blue-700">Cơ chế SpecificationLoader</h4>
        <p class="text-sm text-blue-800 mt-1">
          Để sử dụng tính năng này, bạn cần implement interface <code>SpecificationLoader</code>. 
          Phương thức <code>getSpecification(T... args)</code> sẽ nhận vào các tham số cần thiết để tạo query.
        </p>
      </div>

      <h4 class="font-semibold text-slate-700 mt-4">@SpecValidation (Field Level)</h4>
      <p class="text-sm text-slate-600 mb-2">Validate trên một trường cụ thể.</p>
      <CodeBlock filename="ProductDto.java" :code="specValCode" />
    </article>

    <!-- 7.3 DTO Validation -->
    <article id="val-dto" class="mb-10 scroll-mt-24">
      <h3 class="text-xl font-bold text-slate-800 mb-3">7.3. DTO Level Validation</h3>
      <p class="text-slate-600 mb-4">
        Khi logic validation phụ thuộc vào <strong>nhiều trường</strong> trong DTO cùng lúc.
      </p>

      <h4 class="font-semibold text-slate-700">@DtoSpecValidation</h4>
      <p class="text-sm text-slate-600 mb-2">
        Annotation đặt trên Class level. Validator sẽ truyền <strong>giá trị của tất cả các field</strong> trong DTO vào <code>SpecificationLoader</code>.
      </p>
      <CodeBlock filename="OrderDto.java" :code="dtoSpecCode" />
      
      <p class="text-sm text-slate-600 mt-4 mb-2">Implement Loader nhận dynamic arguments:</p>
      <CodeBlock filename="UniqueUserInDeptSpec.java" :code="loaderImplCode" />
    </article>

  </section>
</template>

<script setup>
import { ref } from 'vue';
import CodeBlock from '../CodeBlock.vue';

const existsUniqueCode = ref(`
public class CategoryRequest {
    // ID danh mục cha phải TỒN TẠI trong bảng categories
    @Exists(entity = Category.class, message = "Danh mục cha không tồn tại")
    private Long parentId;

    // Tên danh mục phải là DUY NHẤT
    @Unique(entity = Category.class, field = "name", message = "Tên danh mục đã được sử dụng")
    private String name;
}
`);

const enumValCode = ref(`
public enum UserStatus { ACTIVE, INACTIVE, BANNED }

public class UserRequest {
    // Giá trị phải là "ACTIVE", "INACTIVE" hoặc "BANNED"
    @EnumValue(enumClass = UserStatus.class, message = "Trạng thái không hợp lệ")
    private String status;
}
`);

const formatCode = ref(`
public class ProfileRequest {
    @PhoneNumber(message = "SĐT không đúng định dạng quốc tế")
    private String phone;

    @NoSpecialChars(message = "Tên đăng nhập không được chứa ký tự đặc biệt")
    private String username;
}
`);

const specValCode = ref(`
// Kiểm tra departmentId phải thuộc về một Company đang Active
@SpecValidation(
    entity = Department.class, 
    loader = ActiveDepartmentSpecLoader.class, 
    message = "Phòng ban không hợp lệ hoặc không hoạt động"
)
private Long departmentId;
`);

const dtoSpecCode = ref(`
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
`);

const loaderImplCode = ref(`
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
`);
</script>
