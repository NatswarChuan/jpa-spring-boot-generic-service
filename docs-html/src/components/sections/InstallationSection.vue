<template>
  <section id="installation" class="scroll-mt-20 mb-16">
    <h2 class="text-4xl font-bold text-slate-900 mb-6">2. Cài đặt</h2>
    
    <p class="text-lg text-slate-600 leading-relaxed mb-6">
      Thư viện này đã được publish lên <strong>Maven Central</strong>. Bạn có thể dễ dàng tích hợp vào dự án Spring Boot của mình bằng Maven hoặc Gradle mà không cần cấu hình repository phức tạp.
    </p>

    <!-- Maven Tab -->
    <div class="mb-8">
      <h3 class="text-2xl font-bold text-slate-800 mb-4 flex items-center">
        <i class="fab fa-java text-orange-600 mr-2"></i> Maven
      </h3>
      
      <div class="bg-slate-900 rounded-lg p-4 shadow-lg overflow-x-auto">
        <p class="text-slate-400 text-sm mb-2 font-mono">&lt;!-- Thêm dependency vào pom.xml --&gt;</p>
        <pre class="text-green-400 font-mono text-sm">
&lt;dependency&gt;
    &lt;groupId&gt;io.github.natswarchuan&lt;/groupId&gt;
    &lt;artifactId&gt;jpa-spring-boot-generic-service&lt;/artifactId&gt;
    &lt;version&gt;1.3.5&lt;/version&gt;
&lt;/dependency&gt;</pre>
      </div>
    </div>

    <!-- Gradle Tab -->
    <div class="mb-10">
      <h3 class="text-2xl font-bold text-slate-800 mb-4 flex items-center">
        <i class="fas fa-cubes text-blue-600 mr-2"></i> Gradle
      </h3>
      
      <div class="bg-slate-900 rounded-lg p-4 shadow-lg overflow-x-auto">
        <p class="text-slate-400 text-sm mb-2 font-mono">// Thêm dependency vào build.gradle</p>
        <pre class="text-green-400 font-mono text-sm">
dependencies {
    implementation 'io.github.natswarchuan:jpa-spring-boot-generic-service:1.3.5'
}</pre>
      </div>
    </div>

    <!-- Local Installation -->
    <div id="installation-local" class="mb-10 p-6 bg-slate-50 border border-slate-200 rounded-xl scroll-mt-24">
      <h3 class="text-2xl font-bold text-slate-800 mb-4 flex items-center">
        <i class="fas fa-tools text-slate-600 mr-2"></i> Local Development
      </h3>
      <p class="text-slate-600 mb-4">
        Nếu bạn đang phát triển hoặc tùy chỉnh trực tiếp mã nguồn của framework, hãy cài đặt nó vào Local Maven Repository của bạn:
      </p>
      
      <div class="bg-slate-900 rounded-lg p-4 mb-4 font-mono text-sm text-green-400">
        # Chạy lệnh này tại thư mục java-core<br/>
        mvn clean install
      </div>

      <p class="text-sm text-slate-500 italic">
        Sau khi chạy lệnh trên, bạn có thể sử dụng version <code>1.3.5</code> trong các dự án local khác.
      </p>
    </div>

    <!-- Package Scanning -->
    <div id="installation-config" class="mb-10 scroll-mt-24">
      <h3 class="text-2xl font-bold text-slate-800 mb-4 flex items-center">
        <i class="fas fa-cog text-indigo-600 mr-2"></i> Configuration
      </h3>
      <p class="text-slate-600 mb-4">
        Để Spring Boot có thể nhận diện các Beans và Validators từ thư viện, bạn cần cấu hình Package Scanning tại lớp Application chính.
      </p>

      <div class="bg-slate-900 rounded-lg p-4 shadow-lg overflow-x-auto">
        <pre class="text-green-400 font-mono text-sm">
@SpringBootApplication(scanBasePackages = { 
    "com.your.package",             // Package dự án của bạn
    "com.natswarchuan.genericservice" // Package của thư viện
})
public class YourApplication { ... }</pre>
      </div>
    </div>

    <div class="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-lg">
      <p class="text-yellow-800">
        <strong>Quan trọng:</strong> Hãy kiểm tra và sử dụng phiên bản (Release Tag) mới nhất tại 
        <a href="https://github.com/NatswarChuan/jpa-spring-boot-generic-service/releases" target="_blank" class="underline font-bold text-blue-700">
          GitHub Releases <i class="fas fa-external-link-alt ml-1"></i>
        </a>
      </p>
    </div>
  </section>
</template>
