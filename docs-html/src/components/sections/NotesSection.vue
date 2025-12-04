<template>
  <section id="notes" class="scroll-mt-20 mb-16">
    <h2 class="text-3xl font-bold text-red-600 border-b border-red-200 pb-4 mb-8">6. Lưu ý quan trọng & Tips</h2>
    
    <!-- 6.1 Common Errors -->
    <article id="notes-common" class="mb-10 scroll-mt-24">
      <h3 class="text-xl font-bold text-slate-800 mb-4 flex items-center">
        <span class="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm mr-3">6.1</span>
        Các lỗi thường gặp
      </h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div class="bg-red-50 p-6 rounded-lg border-l-4 border-red-500 shadow-sm">
          <h4 class="text-lg font-bold text-red-800 mb-2">
            <i class="fas fa-exclamation-triangle mr-2"></i>DTO Constructor
          </h4>
          <p class="text-sm text-red-700">
            Tất cả DTO (đặc biệt là Response DTO) bắt buộc phải có <strong>Public No-Args Constructor</strong> để Reflection hoạt động.
          </p>
        </div>

        <div class="bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-500 shadow-sm">
          <h4 class="text-lg font-bold text-yellow-800 mb-2">
            <i class="fas fa-code-branch mr-2"></i>Override Method
          </h4>
          <ul class="text-sm text-yellow-800 list-disc list-inside">
            <li><strong>CreateReq:</strong> override <code>toEntity()</code></li>
            <li><strong>UpdateReq:</strong> override <code>updateEntity()</code></li>
            <li><strong>Response:</strong> override <code>fromEntity()</code></li>
          </ul>
        </div>
      </div>
    </article>

    <!-- 6.2 Pros/Cons & N+1 -->
    <article id="notes-n1" class="mb-10 scroll-mt-24">
      <h3 class="text-xl font-bold text-slate-800 mb-4 flex items-center">
        <span class="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm mr-3">6.2</span>
        Ưu điểm & Cách phòng tránh lỗi N+1
      </h3>

      <!-- Strengths/Weaknesses Grid (Giữ nguyên) -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div class="bg-green-50 p-5 rounded-lg border border-green-100">
          <h4 class="font-bold text-green-800 mb-2 flex items-center"><i class="fas fa-check-circle mr-2"></i> Điểm mạnh</h4>
          <ul class="list-disc list-inside text-sm text-green-700 space-y-1">
            <li><strong>Tốc độ:</strong> Có ngay 15+ hàm CRUD.</li>
            <li><strong>Chuẩn hóa:</strong> Code đồng nhất, dễ bảo trì.</li>
          </ul>
        </div>
        <div class="bg-red-50 p-5 rounded-lg border border-red-100">
          <h4 class="font-bold text-red-800 mb-2 flex items-center"><i class="fas fa-exclamation-circle mr-2"></i> Điểm yếu tiềm ẩn</h4>
          <ul class="list-disc list-inside text-sm text-red-700 space-y-1">
            <li><strong>N+1 Query:</strong> Dễ mắc với Lazy Loading.</li>
            <li><strong>Over-fetching:</strong> Lấy dư dữ liệu BLOB/TEXT.</li>
          </ul>
        </div>
      </div>

      <!-- N+1 Solution (Giữ nguyên) -->
      <div class="bg-white border border-slate-200 rounded-lg p-6 shadow-sm mb-6">
        <h4 class="text-lg font-bold text-slate-800 mb-3 text-red-600"><i class="fas fa-bug mr-2"></i>Vấn đề N+1 Query</h4>
        <div class="space-y-4">
          <div class="p-4 bg-slate-50 rounded border border-slate-200">
            <h5 class="font-bold text-slate-700 mb-2 text-sm">Cách 1: Sử dụng EntityGraph</h5>
            <CodeBlock filename="UserRepository.java" :code="n1FixCode1" />
          </div>
          <div class="p-4 bg-slate-50 rounded border border-slate-200">
            <h5 class="font-bold text-slate-700 mb-2 text-sm">Cách 2: Sử dụng Specification fetch</h5>
            <CodeBlock filename="UserController.java" :code="n1FixCode2" />
          </div>
        </div>
      </div>

      <!-- Over-fetching Solution Detail (CẬP NHẬT) -->
      <div class="bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
        <h4 class="text-lg font-bold text-slate-800 mb-3 text-orange-600">
          <i class="fas fa-weight-hanging mr-2"></i>Vấn đề Over-fetching (Lấy dư dữ liệu)
        </h4>
        <p class="text-slate-600 mb-4 text-sm">
          Khi bảng có các cột dữ liệu lớn (TEXT, BLOB), việc <code>SELECT *</code> mặc định sẽ gây chậm hệ thống.
          Dưới đây là 2 chiến lược thiết kế Entity để khắc phục:
        </p>

        <div class="space-y-6">
          <!-- Solution 1: OneToOne -->
          <div class="p-4 bg-orange-50 rounded border border-orange-200">
            <h5 class="font-bold text-orange-800 mb-2 text-sm flex items-center">
              <span class="bg-orange-200 text-orange-800 px-2 py-0.5 rounded text-xs mr-2">Option 1</span>
              Tách bảng vật lý (Physical Table Splitting)
            </h5>
            <p class="text-xs text-slate-600 mb-2">
              Tách các cột nặng ra một bảng riêng (VD: <code>user_details</code>). Dùng quan hệ <code>@OneToOne(fetch = LAZY)</code> để liên kết.
              Chỉ khi nào gọi <code>user.getUserDetail()</code> thì dữ liệu nặng mới được tải.
            </p>
            <CodeBlock filename="User.java" :code="overFetchingOneToOne" />
          </div>

          <!-- Solution 2: Inheritance -->
          <div class="p-4 bg-blue-50 rounded border border-blue-200">
            <h5 class="font-bold text-blue-800 mb-2 text-sm flex items-center">
              <span class="bg-blue-200 text-blue-800 px-2 py-0.5 rounded text-xs mr-2">Option 2</span>
              Kế thừa Entity (Logical Splitting)
            </h5>
            <p class="text-xs text-slate-600 mb-2">
              Vẫn dùng <strong>1 bảng duy nhất</strong> nhưng chia thành 2 Entity class. Class cha chỉ map cột nhẹ, Class con map thêm cột nặng.
              JPA sẽ tự động sinh câu SQL chỉ select các cột tương ứng với Class bạn query.
            </p>
            <CodeBlock filename="UserEntityInheritance.java" :code="overFetchingInheritance" />
          </div>
        </div>
      </div>
    </article>

    <!-- 6.3 Tips -->
    <article id="notes-tips" class="mb-10 scroll-mt-24">
      <h3 class="text-xl font-bold text-slate-800 mb-4 flex items-center">
        <span class="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm mr-3">6.3</span>
        Mẹo tối ưu cho Developer
      </h3>
      <div class="bg-blue-50 border border-blue-200 rounded-lg p-6 shadow-sm">
        <div class="space-y-4">
          <div class="flex gap-3">
            <div class="flex-shrink-0 w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center text-blue-700 font-bold">1</div>
            <div>
              <h5 class="font-bold text-slate-800">Đánh Index cho Khóa Ngoại</h5>
              <p class="text-sm text-slate-600 mt-1">Luôn đánh index cho các cột <code>@JoinColumn</code> để tối ưu query JOIN.</p>
            </div>
          </div>
          <div class="flex gap-3">
            <div class="flex-shrink-0 w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center text-blue-700 font-bold">2</div>
            <div>
              <h5 class="font-bold text-slate-800">Dùng FetchType.LAZY</h5>
              <p class="text-sm text-slate-600 mt-1">Mặc định nên là LAZY cho mọi quan hệ to-Many.</p>
            </div>
          </div>
        </div>
      </div>
    </article>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import CodeBlock from '../CodeBlock.vue';

const n1FixCode1 = ref(`
@Override
@EntityGraph(attributePaths = {"roles", "profile"}) 
List<User> findAll();
`);

const n1FixCode2 = ref(`
Specification<User> spec = (root, query, cb) -> {
    if (query.getResultType() != Long.class && query.getResultType() != long.class) {
        root.fetch("roles", JoinType.LEFT);
    }
    return null; 
};
service.findAll(page, size, spec, UserResponse.class);
`);

const overFetchingOneToOne = ref(`
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
`);

const overFetchingInheritance = ref(`
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
`);
</script>