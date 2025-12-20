<template>
  <section id="installation" class="scroll-mt-20 mb-16">
    <h2 class="text-4xl font-bold text-slate-900 mb-6">2. Cài đặt</h2>
    
    <p class="text-lg text-slate-600 leading-relaxed mb-6">
      Thư viện này được phân phối thông qua <strong>JitPack</strong>. Bạn có thể dễ dàng tích hợp vào dự án Spring Boot của mình bằng Maven hoặc Gradle.
    </p>

    <!-- Maven Tab -->
    <div class="mb-8">
      <h3 class="text-2xl font-bold text-slate-800 mb-4 flex items-center">
        <i class="fab fa-java text-orange-600 mr-2"></i> Maven
      </h3>
      
      <div class="bg-slate-900 rounded-lg p-4 shadow-lg overflow-x-auto">
        <p class="text-slate-400 text-sm mb-2 font-mono">&lt;!-- 1. Thêm repository JitPack vào pom.xml --&gt;</p>
        <pre class="text-green-400 font-mono text-sm">
&lt;repositories&gt;
    &lt;repository&gt;
        &lt;id&gt;jitpack.io&lt;/id&gt;
        &lt;url&gt;https://jitpack.io&lt;/url&gt;
    &lt;/repository&gt;
&lt;/repositories&gt;</pre>
        
        <div class="border-t border-slate-700 my-4"></div>
        
        <p class="text-slate-400 text-sm mb-2 font-mono">&lt;!-- 2. Thêm dependency --&gt;</p>
        <pre class="text-green-400 font-mono text-sm">
&lt;dependency&gt;
    &lt;groupId&gt;com.github.NatswarChuan&lt;/groupId&gt;
    &lt;artifactId&gt;jpa-spring-boot-generic-service&lt;/artifactId&gt;
    &lt;version&gt;LATEST_VERSION&lt;/version&gt; &lt;!-- Thay thế bằng version mới nhất trên GitHub --&gt;
&lt;/dependency&gt;</pre>
      </div>
    </div>

    <!-- Gradle Tab -->
    <div class="mb-8">
      <h3 class="text-2xl font-bold text-slate-800 mb-4 flex items-center">
        <i class="fas fa-cubes text-blue-600 mr-2"></i> Gradle
      </h3>
      
      <div class="bg-slate-900 rounded-lg p-4 shadow-lg overflow-x-auto">
        <p class="text-slate-400 text-sm mb-2 font-mono">// 1. Thêm vào root build.gradle</p>
        <pre class="text-green-400 font-mono text-sm">
allprojects {
    repositories {
        ...
        maven { url 'https://jitpack.io' }
    }
}</pre>
        
        <div class="border-t border-slate-700 my-4"></div>
        
        <p class="text-slate-400 text-sm mb-2 font-mono">// 2. Thêm dependency</p>
        <pre class="text-green-400 font-mono text-sm">
dependencies {
    implementation 'com.github.NatswarChuan:jpa-spring-boot-generic-service:LATEST_VERSION' // Thay thế bằng version mới nhất
}</pre>
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
