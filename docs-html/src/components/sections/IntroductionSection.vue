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
    <div class="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg mb-8 shadow-sm">
      <h3 class="text-xl font-bold text-blue-900 mb-2">Giải pháp: Generic Service Framework</h3>
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
    
    <!-- Key Benefits Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
      <!-- Card 1: Speed -> Implementation -->
      <a href="#implementation" class="block bg-white p-6 rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-all hover:border-blue-400 group cursor-pointer no-underline">
        <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 text-blue-600 group-hover:scale-110 transition-transform">
          <i class="fas fa-bolt text-xl"></i>
        </div>
        <h3 class="text-lg font-bold text-slate-800 mb-2 group-hover:text-blue-700 transition-colors">Tốc độ vượt trội</h3>
        <p class="text-sm text-slate-600">Triển khai toàn bộ API CRUD chuẩn mực cho một Entity mới chỉ trong vài phút.</p>
      </a>

      <!-- Card 2: Standardization -> API Methods -->
      <a href="#abservice-methods" class="block bg-white p-6 rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-all hover:border-green-400 group cursor-pointer no-underline">
        <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 text-green-600 group-hover:scale-110 transition-transform">
          <i class="fas fa-code text-xl"></i>
        </div>
        <h3 class="text-lg font-bold text-slate-800 mb-2 group-hover:text-green-700 transition-colors">Chuẩn hóa Code</h3>
        <p class="text-sm text-slate-600">Mã nguồn đồng nhất giữa các module, dễ đọc, dễ hiểu và cực kỳ dễ bảo trì.</p>
      </a>

      <!-- Card 3: Auto DTO -> Usage -->
      <a href="#usage" class="block bg-white p-6 rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-all hover:border-purple-400 group cursor-pointer no-underline">
        <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 text-purple-600 group-hover:scale-110 transition-transform">
          <i class="fas fa-layer-group text-xl"></i>
        </div>
        <h3 class="text-lg font-bold text-slate-800 mb-2 group-hover:text-purple-700 transition-colors">Auto DTO Mapping</h3>
        <p class="text-sm text-slate-600">Tự động chuyển đổi dữ liệu hai chiều giữa Entity và DTO một cách thông minh.</p>
      </a>
    </div>
  </section>
</template>