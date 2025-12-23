<template>
  <section id="intro" class="scroll-mt-20 mb-16">
    <h2 class="text-4xl font-bold text-slate-900 mb-6">1. Giới thiệu</h2>
    
    <!-- Problem Statement -->
    <div class="mb-8">
      <p class="text-lg text-slate-600 leading-relaxed mb-4">
        Trong quá trình phát triển Backend với Spring Boot, bạn có thường xuyên gặp phải tình trạng phải viết đi viết lại những đoạn mã giống hệt nhau cho các chức năng cơ bản như <strong>Create, Read, Update, Delete (CRUD)</strong>?
      </p>
      <p class="text-lg text-slate-600 leading-relaxed mb-4">
        Việc phải tạo thủ công từng phương thức <code>findById</code>, <code>save</code>, <code>delete</code>, hay xử lý chuyển đổi dữ liệu giữa Entity và DTO cho mỗi bảng mới không chỉ <strong>tốn thời gian</strong> mà còn dễ dẫn đến <strong>sai sót</strong> và khó bảo trì khi dự án mở rộng.
      </p>
    </div>

    <!-- Solution -->
    <div id="intro-solution" class="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg mb-8 shadow-sm scroll-mt-24">
      <h3 class="text-xl font-bold text-blue-900 mb-2">
        <span class="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm mr-3">1.1</span>
        Giải pháp: Generic Service Framework
      </h3>
      <p class="text-slate-700 leading-relaxed">
        Hệ thống <strong>Generic Service</strong> ra đời để giải quyết triệt để vấn đề này. Bằng cách tận dụng sức mạnh của Java Generics và Reflection, framework cung cấp một lớp nền tảng (Base Service) đã được cài đặt sẵn mọi logic nghiệp vụ cốt lõi.
      </p>
      <p class="text-slate-700 mt-2">
        Giờ đây, bạn chỉ cần <strong>kế thừa</strong> và tập trung hoàn toàn vào các nghiệp vụ đặc thù (Business Logic). Framework cung cấp sẵn:
      </p>
      <ul class="list-disc list-inside mt-3 space-y-1 text-slate-700 ml-2">
        <li><strong>CRUD toàn diện:</strong> Tự động hóa các thao tác cơ sở dữ liệu.</li>
        <li><strong>Validation mạnh mẽ:</strong> Tích hợp các Annotation kiểm tra dữ liệu và logic nghiệp vụ phức tạp.</li>
        <li><strong>Tra cứu linh hoạt:</strong> Hỗ trợ tìm kiếm động với JPA Specification.</li>
        <li><strong>Đa ngôn ngữ:</strong> Xử lý Localization ngay từ tầng Service.</li>
      </ul>
    </div>

    <!-- Quick Links -->
    <div class="flex flex-wrap gap-4 mb-12">
      <a href="https://github.com/NatswarChuan/jpa-spring-boot-generic-service/tree/main/java-demo" target="_blank" 
         class="inline-flex items-center px-6 py-3 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 transition-colors shadow-lg group">
        <i class="fab fa-github text-xl mr-3 group-hover:scale-110 transition-transform"></i>
        <span>Xem Source Code Demo</span>
      </a>
      <a href="https://github.com/NatswarChuan/jpa-spring-boot-generic-service" target="_blank"
         class="inline-flex items-center px-6 py-3 bg-white text-slate-700 font-bold rounded-lg border border-slate-300 hover:bg-slate-50 transition-colors shadow-sm">
        <i class="fas fa-star text-yellow-500 mr-2"></i>
        <span>Star on GitHub</span>
      </a>
    </div>
    
    <!-- Detailed Features -->
    <div id="intro-features" class="mt-12 scroll-mt-24">
      <h3 class="text-2xl font-bold text-slate-800 mb-6">
        <span class="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm mr-3">1.2</span>
        Các chức năng chính
      </h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
        <div class="flex items-start">
          <div class="text-blue-500 mt-1 mr-4"><i class="fas fa-check-circle text-lg"></i></div>
          <div>
            <h4 class="font-bold text-slate-800">Generic CRUD Operations</h4>
            <p class="text-slate-600">Cung cấp đầy đủ các thao tác Thêm, Đọc, Sửa, Xóa cơ bản cho cả Entity và DTO.</p>
          </div>
        </div>
        <div class="flex items-start">
          <div class="text-green-500 mt-1 mr-4"><i class="fas fa-check-circle text-lg"></i></div>
          <div>
            <h4 class="font-bold text-slate-800">Dynamic Filtering (JPA Spec)</h4>
            <p class="text-slate-600">Tích hợp sẵn Generic Specification cho phép lọc dữ liệu động cực kỳ linh hoạt.</p>
          </div>
        </div>
        <div class="flex items-start">
          <div class="text-purple-500 mt-1 mr-4"><i class="fas fa-check-circle text-lg"></i></div>
          <div>
            <h4 class="font-bold text-slate-800">Automatic DTO Mapping</h4>
            <p class="text-slate-600">Chuyển đổi DTO - Entity hai chiều tự động, tách biệt hoàn toàn lớp Response và Database.</p>
          </div>
        </div>
        <div class="flex items-start">
          <div class="text-orange-500 mt-1 mr-4"><i class="fas fa-check-circle text-lg"></i></div>
          <div>
            <h4 class="font-bold text-slate-800">Multi-language (I18n)</h4>
            <p class="text-slate-600">Hỗ trợ trả về dữ liệu theo ngôn ngữ yêu cầu (Localization) ngay tại tầng Service.</p>
          </div>
        </div>
        <div class="flex items-start">
          <div class="text-indigo-500 mt-1 mr-4"><i class="fas fa-check-circle text-lg"></i></div>
          <div>
            <h4 class="font-bold text-slate-800">Service Hooks</h4>
            <p class="text-slate-600">Cung cấp các điểm can thiệp (before/after hooks) để tùy biến logic nghiệp vụ dễ dàng.</p>
          </div>
        </div>
        <div class="flex items-start">
          <div class="text-red-500 mt-1 mr-4"><i class="fas fa-check-circle text-lg"></i></div>
          <div>
            <h4 class="font-bold text-slate-800">Standardized Error Handling</h4>
            <p class="text-slate-600">Xử lý ngoại lệ tập trung, đảm bảo mọi API luôn trả về format lỗi đồng nhất.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Pros and Cons -->
    <div id="intro-pros-cons" class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16 scroll-mt-24">
      <div class="bg-emerald-50 rounded-xl p-8 border border-emerald-100">
        <h3 class="text-xl font-bold text-emerald-900 mb-4 flex items-center">
          <span class="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm mr-3">1.3</span>
          Ưu điểm
        </h3>
        <ul class="space-y-3 text-emerald-800">
          <li class="flex items-start"><i class="fas fa-caret-right mt-1.5 mr-2 opacity-50"></i> <strong>Giảm 80% boilerplate code:</strong> Không còn phải viết hàng ngàn dòng code CRUD lặp lại.</li>
          <li class="flex items-start"><i class="fas fa-caret-right mt-1.5 mr-2 opacity-50"></i> <strong>Tính nhất quán cao:</strong> Toàn bộ team sử dụng chung một cấu trúc chuẩn mực.</li>
          <li class="flex items-start"><i class="fas fa-caret-right mt-1.5 mr-2 opacity-50"></i> <strong>Dễ bảo trì:</strong> Logic CRUD tập trung tại framework, fix một nơi - áp dụng everywhere.</li>
          <li class="flex items-start"><i class="fas fa-caret-right mt-1.5 mr-2 opacity-50"></i> <strong>Mở rộng linh hoạt:</strong> Override bất kỳ phương thức nào khi cần nghiệp vụ phức tạp.</li>
        </ul>
      </div>
      <div class="bg-rose-50 rounded-xl p-8 border border-rose-100">
        <h3 class="text-xl font-bold text-rose-900 mb-4 flex items-center">
          <i class="fas fa-minus-circle mr-2"></i> Nhược điểm
        </h3>
        <ul class="space-y-3 text-rose-800">
          <li class="flex items-start"><i class="fas fa-caret-right mt-1.5 mr-2 opacity-50"></i> <strong>Đường cong học tập:</strong> Cần hiểu về Java Generics và cấu trúc hooks của framework.</li>
          <li class="flex items-start"><i class="fas fa-caret-right mt-1.5 mr-2 opacity-50"></i> <strong>Trừu tượng hóa cao:</strong> Đôi khi gây khó khăn cho việc debug nếu không quen với base code.</li>
          <li class="flex items-start"><i class="fas fa-caret-right mt-1.5 mr-2 opacity-50"></i> <strong>Hạn chế khi quá phức tạp:</strong> Các nghiệp vụ cực kỳ đặc thù vẫn cần viết service riêng biệt.</li>
        </ul>
      </div>
    </div>

  </section>
</template>