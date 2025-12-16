import{_ as l}from"./CodeBlock-Jn8FeY8H.js";import{r as n,c as b,o as g,a as r,b as e,d as s,e as i}from"./index-Cgj9ESEa.js";const m={id:"notes",class:"scroll-mt-20 mb-16"},p={id:"notes-n1",class:"mb-10 scroll-mt-24"},u={class:"bg-white border border-slate-200 rounded-lg p-6 shadow-sm mb-6"},h={class:"space-y-4"},x={class:"p-4 bg-slate-50 rounded border border-slate-200"},f={class:"p-4 bg-slate-50 rounded border border-slate-200"},v={class:"bg-white border border-slate-200 rounded-lg p-6 shadow-sm"},y={class:"space-y-6"},T={class:"p-4 bg-orange-50 rounded border border-orange-200"},C={class:"p-4 bg-blue-50 rounded border border-blue-200"},O={__name:"NotesSection",setup(L){const o=n(`
@Override
@EntityGraph(attributePaths = {"roles", "profile"}) 
List<User> findAll();
`),a=n(`
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
`);return(E,t)=>(g(),b("section",m,[t[10]||(t[10]=r('<h2 class="text-3xl font-bold text-red-600 border-b border-red-200 pb-4 mb-8">7. Lưu ý quan trọng &amp; Tips</h2><article id="notes-common" class="mb-10 scroll-mt-24"><h3 class="text-xl font-bold text-slate-800 mb-4 flex items-center"><span class="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm mr-3">7.1</span> Các lỗi thường gặp </h3><div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"><div class="bg-red-50 p-6 rounded-lg border-l-4 border-red-500 shadow-sm"><h4 class="text-lg font-bold text-red-800 mb-2"><i class="fas fa-exclamation-triangle mr-2"></i>DTO Constructor </h4><p class="text-sm text-red-700"> Tất cả DTO (đặc biệt là Response DTO) bắt buộc phải có <strong>Public No-Args Constructor</strong> để Reflection hoạt động. </p></div><div class="bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-500 shadow-sm"><h4 class="text-lg font-bold text-yellow-800 mb-2"><i class="fas fa-code-branch mr-2"></i>Override Method </h4><ul class="text-sm text-yellow-800 list-disc list-inside"><li><strong>CreateReq:</strong> override <code>toEntity()</code></li><li><strong>UpdateReq:</strong> override <code>updateEntity()</code></li><li><strong>Response:</strong> override <code>fromEntity()</code></li></ul></div></div></article>',2)),e("article",p,[t[9]||(t[9]=r('<h3 class="text-xl font-bold text-slate-800 mb-4 flex items-center"><span class="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm mr-3">7.2</span> Ưu điểm &amp; Cách phòng tránh lỗi N+1 </h3><div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"><div class="bg-green-50 p-5 rounded-lg border border-green-100"><h4 class="font-bold text-green-800 mb-2 flex items-center"><i class="fas fa-check-circle mr-2"></i> Điểm mạnh</h4><ul class="list-disc list-inside text-sm text-green-700 space-y-1"><li><strong>Tốc độ:</strong> Có ngay 15+ hàm CRUD.</li><li><strong>Chuẩn hóa:</strong> Code đồng nhất, dễ bảo trì.</li></ul></div><div class="bg-red-50 p-5 rounded-lg border border-red-100"><h4 class="font-bold text-red-800 mb-2 flex items-center"><i class="fas fa-exclamation-circle mr-2"></i> Điểm yếu tiềm ẩn</h4><ul class="list-disc list-inside text-sm text-red-700 space-y-1"><li><strong>N+1 Query:</strong> Dễ mắc với Lazy Loading.</li><li><strong>Over-fetching:</strong> Lấy dư dữ liệu BLOB/TEXT.</li></ul></div></div>',2)),e("div",u,[t[2]||(t[2]=e("h4",{class:"text-lg font-bold text-slate-800 mb-3 text-red-600"},[e("i",{class:"fas fa-bug mr-2"}),s("Vấn đề N+1 Query")],-1)),e("div",h,[e("div",x,[t[0]||(t[0]=e("h5",{class:"font-bold text-slate-700 mb-2 text-sm"},"Cách 1: Sử dụng EntityGraph",-1)),i(l,{filename:"UserRepository.java",code:o.value},null,8,["code"])]),e("div",f,[t[1]||(t[1]=e("h5",{class:"font-bold text-slate-700 mb-2 text-sm"},"Cách 2: Sử dụng Specification fetch",-1)),i(l,{filename:"UserController.java",code:a.value},null,8,["code"])])])]),e("div",v,[t[7]||(t[7]=e("h4",{class:"text-lg font-bold text-slate-800 mb-3 text-orange-600"},[e("i",{class:"fas fa-weight-hanging mr-2"}),s("Vấn đề Over-fetching (Lấy dư dữ liệu) ")],-1)),t[8]||(t[8]=e("p",{class:"text-slate-600 mb-4 text-sm"},[s(" Khi bảng có các cột dữ liệu lớn (TEXT, BLOB), việc "),e("code",null,"SELECT *"),s(" mặc định sẽ gây chậm hệ thống. Dưới đây là 2 chiến lược thiết kế Entity để khắc phục: ")],-1)),e("div",y,[e("div",T,[t[3]||(t[3]=e("h5",{class:"font-bold text-orange-800 mb-2 text-sm flex items-center"},[e("span",{class:"bg-orange-200 text-orange-800 px-2 py-0.5 rounded text-xs mr-2"},"Option 1"),s(" Tách bảng vật lý (Physical Table Splitting) ")],-1)),t[4]||(t[4]=e("p",{class:"text-xs text-slate-600 mb-2"},[s(" Tách các cột nặng ra một bảng riêng (VD: "),e("code",null,"user_details"),s("). Dùng quan hệ "),e("code",null,"@OneToOne(fetch = LAZY)"),s(" để liên kết. Chỉ khi nào gọi "),e("code",null,"user.getUserDetail()"),s(" thì dữ liệu nặng mới được tải. ")],-1)),i(l,{filename:"User.java",code:d.value},null,8,["code"])]),e("div",C,[t[5]||(t[5]=e("h5",{class:"font-bold text-blue-800 mb-2 text-sm flex items-center"},[e("span",{class:"bg-blue-200 text-blue-800 px-2 py-0.5 rounded text-xs mr-2"},"Option 2"),s(" Kế thừa Entity (Logical Splitting) ")],-1)),t[6]||(t[6]=e("p",{class:"text-xs text-slate-600 mb-2"},[s(" Vẫn dùng "),e("strong",null,"1 bảng duy nhất"),s(" nhưng chia thành 2 Entity class. Class cha chỉ map cột nhẹ, Class con map thêm cột nặng. JPA sẽ tự động sinh câu SQL chỉ select các cột tương ứng với Class bạn query. ")],-1)),i(l,{filename:"UserEntityInheritance.java",code:c.value},null,8,["code"])])])])]),t[11]||(t[11]=r('<article id="notes-tips" class="mb-10 scroll-mt-24"><h3 class="text-xl font-bold text-slate-800 mb-4 flex items-center"><span class="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm mr-3">7.3</span> Mẹo tối ưu cho Developer </h3><div class="bg-blue-50 border border-blue-200 rounded-lg p-6 shadow-sm"><div class="space-y-4"><div class="flex gap-3"><div class="flex-shrink-0 w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center text-blue-700 font-bold">1</div><div><h5 class="font-bold text-slate-800">Đánh Index cho Khóa Ngoại</h5><p class="text-sm text-slate-600 mt-1">Luôn đánh index cho các cột <code>@JoinColumn</code> để tối ưu query JOIN.</p></div></div><div class="flex gap-3"><div class="flex-shrink-0 w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center text-blue-700 font-bold">2</div><div><h5 class="font-bold text-slate-800">Dùng FetchType.LAZY</h5><p class="text-sm text-slate-600 mt-1">Mặc định nên là LAZY cho mọi quan hệ to-Many.</p></div></div></div></div></article>',1))]))}};export{O as default};
