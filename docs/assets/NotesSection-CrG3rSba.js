import{_ as l}from"./CodeBlock-CU_Z1Au-.js";import{r as n,c as b,o as p,a as i,b as t,d as s,e as o}from"./index-Do97FJc2.js";const u={id:"notes",class:"scroll-mt-20 mb-16"},h={id:"notes-n1",class:"mb-10 scroll-mt-24"},x={class:"bg-white border border-slate-200 rounded-lg p-6 shadow-sm mb-6"},v={class:"space-y-4"},f={class:"p-4 bg-slate-50 rounded border border-slate-200"},y={class:"p-4 bg-slate-50 rounded border border-slate-200"},T={class:"bg-white border border-slate-200 rounded-lg p-6 shadow-sm"},E={class:"space-y-6"},C={class:"p-4 bg-orange-50 rounded border border-orange-200"},L={class:"p-4 bg-blue-50 rounded border border-blue-200"},D={id:"notes-exception",class:"mb-10 scroll-mt-24"},w={class:"grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"},U={class:"bg-slate-50 p-6 rounded-lg border border-slate-200 shadow-sm"},S={class:"bg-slate-50 p-6 rounded-lg border border-slate-200 shadow-sm"},q={__name:"NotesSection",setup(N){const a=n(`
@Override
@EntityGraph(attributePaths = {"roles", "profile"}) 
List<User> findAll();
`),r=n(`
Specification<User> spec = (root, query, cb) -> {
    if (query.getResultType() != Long.class && query.getResultType() != long.class) {
        root.fetch("roles", JoinType.LEFT);
    }
    return null; 
};
service.findAll(page, size, spec, UserResponse.class);
`),d=n(`
@Entity
@Table(name = "users")
public class User {
    @Id private Long id;
    private String name;

    // Tách cột nặng sang bảng 'user_details'
    // Quan trọng: fetch = LAZY và optional = false (để Hibernate proxy tốt hơn)
    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL, optional = false)
    @JoinColumn(name = "detail_id")
    private UserDetail userDetail;
}

@Entity
@Table(name = "user_details")
public class UserDetail {
    @Id private Long id;
    @Lob private byte[] avatar; // Cột nặng
    @Column(columnDefinition="TEXT") private String bio;
}
`),c=n(`
// Cả 2 class cùng map vào bảng 'users'
@Entity
@Table(name = "users")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "dtype", discriminatorType = DiscriminatorType.STRING)
public class User { // Class Cha: Chỉ chứa cột nhẹ
    @Id private Long id;
    private String name;
}

@Entity
@DiscriminatorValue("detail")
public class UserDetail extends User { // Class Con: Chứa cột nặng
    @Lob private byte[] avatar;
    @Column(columnDefinition="TEXT") private String bio;
}

// Khi dùng UserRepository (trả về User), Hibernate chỉ select id, name.
// Khi dùng UserDetailRepository, Hibernate select id, name, avatar, bio.
`),g=n(`
// Ném lỗi với mã trạng thái và thông điệp tùy chỉnh
throw new HttpException(
    HttpStatus.NOT_FOUND, 
    "Không tìm thấy người dùng với ID: " + id
);

// Ném lỗi kèm dữ liệu bổ sung
throw new HttpException(
    HttpStatus.BAD_REQUEST, 
    "Dữ liệu không hợp lệ", 
    validationErrors
);
`),m=n(`
{
  "status": 404,
  "message": "Không tìm thấy người dùng với ID: 123",
  "data": null
}
`);return(O,e)=>(p(),b("section",u,[e[16]||(e[16]=i('<h2 class="text-3xl font-bold text-red-600 border-b border-red-200 pb-4 mb-8">9. Lưu ý quan trọng</h2><article id="notes-common" class="mb-10 scroll-mt-24"><h3 class="text-xl font-bold text-slate-800 mb-4 flex items-center"><span class="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm mr-3">9.1</span> Lỗi thường gặp </h3><div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"><div class="bg-red-50 p-6 rounded-lg border-l-4 border-red-500 shadow-sm"><h4 class="text-lg font-bold text-red-800 mb-2"><i class="fas fa-exclamation-triangle mr-2"></i>DTO Constructor </h4><p class="text-sm text-red-700"> Tất cả DTO (đặc biệt là Response DTO) bắt buộc phải có <strong>Public No-Args Constructor</strong> để Reflection hoạt động. </p></div><div class="bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-500 shadow-sm"><h4 class="text-lg font-bold text-yellow-800 mb-2"><i class="fas fa-code-branch mr-2"></i>Override Method </h4><ul class="text-sm text-yellow-800 list-disc list-inside"><li><strong>CreateReq:</strong> override <code>toEntity()</code></li><li><strong>UpdateReq:</strong> override <code>updateEntity()</code></li><li><strong>Response:</strong> override <code>fromEntity()</code></li></ul></div></div></article>',2)),t("article",h,[e[9]||(e[9]=i('<h3 class="text-xl font-bold text-slate-800 mb-4 flex items-center"><span class="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm mr-3">9.2</span> Ưu điểm &amp; N+1 </h3><div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"><div class="bg-green-50 p-5 rounded-lg border border-green-100"><h4 class="font-bold text-green-800 mb-2 flex items-center"><i class="fas fa-check-circle mr-2"></i> Điểm mạnh</h4><ul class="list-disc list-inside text-sm text-green-700 space-y-1"><li><strong>Tốc độ:</strong> Có ngay 15+ hàm CRUD.</li><li><strong>Chuẩn hóa:</strong> Code đồng nhất, dễ bảo trì.</li></ul></div><div class="bg-red-50 p-5 rounded-lg border border-red-100"><h4 class="font-bold text-red-800 mb-2 flex items-center"><i class="fas fa-exclamation-circle mr-2"></i> Điểm yếu tiềm ẩn</h4><ul class="list-disc list-inside text-sm text-red-700 space-y-1"><li><strong>N+1 Query:</strong> Dễ mắc với Lazy Loading.</li><li><strong>Over-fetching:</strong> Lấy dư dữ liệu BLOB/TEXT.</li></ul></div></div>',2)),t("div",x,[e[2]||(e[2]=t("h4",{class:"text-lg font-bold text-slate-800 mb-3 text-red-600"},[t("i",{class:"fas fa-bug mr-2"}),s("Vấn đề N+1 Query")],-1)),t("div",v,[t("div",f,[e[0]||(e[0]=t("h5",{class:"font-bold text-slate-700 mb-2 text-sm"},"Cách 1: Sử dụng EntityGraph",-1)),o(l,{filename:"UserRepository.java",code:a.value},null,8,["code"])]),t("div",y,[e[1]||(e[1]=t("h5",{class:"font-bold text-slate-700 mb-2 text-sm"},"Cách 2: Sử dụng Specification fetch",-1)),o(l,{filename:"UserController.java",code:r.value},null,8,["code"])])])]),t("div",T,[e[7]||(e[7]=t("h4",{class:"text-lg font-bold text-slate-800 mb-3 text-orange-600"},[t("i",{class:"fas fa-weight-hanging mr-2"}),s("Vấn đề Over-fetching (Lấy dư dữ liệu) ")],-1)),e[8]||(e[8]=t("p",{class:"text-slate-600 mb-4 text-sm"},[s(" Khi bảng có các cột dữ liệu lớn (TEXT, BLOB), việc "),t("code",null,"SELECT *"),s(" mặc định sẽ gây chậm hệ thống. Dưới đây là 2 chiến lược thiết kế Entity để khắc phục: ")],-1)),t("div",E,[t("div",C,[e[3]||(e[3]=t("h5",{class:"font-bold text-orange-800 mb-2 text-sm flex items-center"},[t("span",{class:"bg-orange-200 text-orange-800 px-2 py-0.5 rounded text-xs mr-2"},"Option 1"),s(" Tách bảng vật lý (Physical Table Splitting) ")],-1)),e[4]||(e[4]=t("p",{class:"text-xs text-slate-600 mb-2"},[s(" Tách các cột nặng ra một bảng riêng (VD: "),t("code",null,"user_details"),s("). Dùng quan hệ "),t("code",null,"@OneToOne(fetch = LAZY)"),s(" để liên kết. Chỉ khi nào gọi "),t("code",null,"user.getUserDetail()"),s(" thì dữ liệu nặng mới được tải. ")],-1)),o(l,{filename:"User.java",code:d.value},null,8,["code"])]),t("div",L,[e[5]||(e[5]=t("h5",{class:"font-bold text-blue-800 mb-2 text-sm flex items-center"},[t("span",{class:"bg-blue-200 text-blue-800 px-2 py-0.5 rounded text-xs mr-2"},"Option 2"),s(" Kế thừa Entity (Logical Splitting) ")],-1)),e[6]||(e[6]=t("p",{class:"text-xs text-slate-600 mb-2"},[s(" Vẫn dùng "),t("strong",null,"1 bảng duy nhất"),s(" nhưng chia thành 2 Entity class. Class cha chỉ map cột nhẹ, Class con map thêm cột nặng. JPA sẽ tự động sinh câu SQL chỉ select các cột tương ứng với Class bạn query. ")],-1)),o(l,{filename:"UserEntityInheritance.java",code:c.value},null,8,["code"])])])])]),e[17]||(e[17]=i('<article id="notes-validation-perf" class="mb-10 scroll-mt-24"><h3 class="text-xl font-bold text-slate-800 mb-4 flex items-center"><span class="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm mr-3">9.3</span> Hiệu năng Validation </h3><p class="text-slate-600 mb-6"> Các validation logic liên quan đến DB (<code>@Exists</code>, <code>@Unique</code>, <code>@SpecValidation</code>) tuy tiện lợi nhưng có thể gây ảnh hưởng hiệu năng nếu dùng sai cách. </p><div class="space-y-6"><div class="bg-orange-50 border-l-4 border-orange-400 p-4 shadow-sm"><h4 class="font-bold text-orange-800 mb-2 text-sm"><i class="fas fa-exclamation-triangle mr-1"></i> Vấn đề: N+1 trên List</h4><div class="text-sm text-slate-700"><p class="mb-2">Nếu bạn validate một List có 1000 item, và mỗi item đều có <code>@Exists</code>, hệ thống sẽ bắn <strong>1000 câu query</strong> kiểm tra tồn tại vào DB.</p><p><strong>Giải pháp:</strong></p><ul class="list-disc list-inside ml-2 text-slate-600"><li>Dùng <code>@DtoSpecValidation</code> để validate cả list 1 lần (nếu logic cho phép).</li><li>Hoặc viết Custom Validator nhận vào cả List để query bằng <code>WHERE id IN (...)</code>.</li></ul></div></div><div class="bg-blue-50 border-l-4 border-blue-400 p-4 shadow-sm"><h4 class="font-bold text-blue-800 mb-2 text-sm"><i class="fas fa-database mr-1"></i> Vấn đề: Indexing</h4><div class="text-sm text-slate-700"><p class="mb-2">Các cột được dùng trong <code>@Unique</code> hoặc <code>@Exists</code> thường nằm trong mệnh đề WHERE.</p><p><strong>Giải pháp:</strong> Đảm bảo các cột này đã được đánh Index trong Database để query nhanh nhất.</p></div></div></div></article><article id="notes-tips" class="mb-10 scroll-mt-24"><h3 class="text-xl font-bold text-slate-800 mb-4 flex items-center"><span class="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm mr-3">9.4</span> Mẹo tối ưu </h3><div class="bg-blue-50 border border-blue-200 rounded-lg p-6 shadow-sm"><div class="space-y-4"><div class="flex gap-3"><div class="flex-shrink-0 w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center text-blue-700 font-bold">1</div><div><h5 class="font-bold text-slate-800">Đánh Index cho Khóa Ngoại</h5><p class="text-sm text-slate-600 mt-1">Luôn đánh index cho các cột <code>@JoinColumn</code> để tối ưu query JOIN.</p></div></div><div class="flex gap-3"><div class="flex-shrink-0 w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center text-blue-700 font-bold">2</div><div><h5 class="font-bold text-slate-800">Dùng FetchType.LAZY</h5><p class="text-sm text-slate-600 mt-1">Mặc định nên là LAZY cho mọi quan hệ to-Many.</p></div></div></div></div></article>',2)),t("article",D,[e[14]||(e[14]=t("h3",{class:"text-xl font-bold text-slate-800 mb-4 flex items-center"},[t("span",{class:"bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm mr-3"},"9.5"),s(" Xử lý lỗi ")],-1)),e[15]||(e[15]=t("p",{class:"text-slate-600 mb-6"},[s(" Framework cung cấp sẵn "),t("code",null,"HttpException"),s(" và "),t("code",null,"GlobalExceptionHandler"),s(" để chuẩn hóa phản hồi lỗi về dạng "),t("code",null,"HttpApiResponse"),s(". ")],-1)),t("div",w,[t("div",U,[e[10]||(e[10]=t("h4",{class:"text-lg font-bold text-slate-800 mb-2 font-mono text-sm"},"Ném ngoại lệ (Throwing)",-1)),e[11]||(e[11]=t("p",{class:"text-xs text-slate-600 mb-4"},"Bạn có thể ném lỗi ở bất kỳ đâu (Controller, Service) mà không cần try-catch.",-1)),o(l,{filename:"UserService.java",code:g.value},null,8,["code"])]),t("div",S,[e[12]||(e[12]=t("h4",{class:"text-lg font-bold text-slate-800 mb-2 font-mono text-sm"},"Handler Framework",-1)),e[13]||(e[13]=t("p",{class:"text-xs text-slate-600 mb-4"},[t("code",null,"GlobalExceptionHandler"),s(" sẽ tự động bắt và format response.")],-1)),o(l,{filename:"Response Format",code:m.value},null,8,["code"])])])])]))}};export{q as default};
