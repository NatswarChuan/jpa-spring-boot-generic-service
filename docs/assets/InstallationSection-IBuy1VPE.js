import{_ as e}from"./_plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o,a as n}from"./index-Cgj9ESEa.js";const l={},a={id:"installation",class:"scroll-mt-20 mb-16"};function r(i,t){return o(),s("section",a,[...t[0]||(t[0]=[n(`<h2 class="text-4xl font-bold text-slate-900 mb-6">2. Cài đặt</h2><p class="text-lg text-slate-600 leading-relaxed mb-6"> Thư viện này được phân phối thông qua <strong>JitPack</strong>. Bạn có thể dễ dàng tích hợp vào dự án Spring Boot của mình bằng Maven hoặc Gradle. </p><div class="mb-8"><h3 class="text-2xl font-bold text-slate-800 mb-4 flex items-center"><i class="fab fa-java text-orange-600 mr-2"></i> Maven </h3><div class="bg-slate-900 rounded-lg p-4 shadow-lg overflow-x-auto"><p class="text-slate-400 text-sm mb-2 font-mono">&lt;!-- 1. Thêm repository JitPack vào pom.xml --&gt;</p><pre class="text-green-400 font-mono text-sm">&lt;repositories&gt;
    &lt;repository&gt;
        &lt;id&gt;jitpack.io&lt;/id&gt;
        &lt;url&gt;https://jitpack.io&lt;/url&gt;
    &lt;/repository&gt;
&lt;/repositories&gt;</pre><div class="border-t border-slate-700 my-4"></div><p class="text-slate-400 text-sm mb-2 font-mono">&lt;!-- 2. Thêm dependency --&gt;</p><pre class="text-green-400 font-mono text-sm">&lt;dependency&gt;
    &lt;groupId&gt;com.github.NatswarChuan&lt;/groupId&gt;
    &lt;artifactId&gt;jpa-spring-boot-generic-service&lt;/artifactId&gt;
    &lt;version&gt;v1.0.0&lt;/version&gt;
&lt;/dependency&gt;</pre></div></div><div class="mb-8"><h3 class="text-2xl font-bold text-slate-800 mb-4 flex items-center"><i class="fas fa-cubes text-blue-600 mr-2"></i> Gradle </h3><div class="bg-slate-900 rounded-lg p-4 shadow-lg overflow-x-auto"><p class="text-slate-400 text-sm mb-2 font-mono">// 1. Thêm vào root build.gradle</p><pre class="text-green-400 font-mono text-sm">allprojects {
    repositories {
        ...
        maven { url &#39;https://jitpack.io&#39; }
    }
}</pre><div class="border-t border-slate-700 my-4"></div><p class="text-slate-400 text-sm mb-2 font-mono">// 2. Thêm dependency</p><pre class="text-green-400 font-mono text-sm">dependencies {
    implementation &#39;com.github.NatswarChuan:jpa-spring-boot-generic-service:v1.0.0&#39;
}</pre></div></div><div class="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-lg"><p class="text-yellow-800"><strong>Lưu ý:</strong> Thay thế <code>v1.0.0</code> bằng phiên bản mới nhất mà bạn muốn sử dụng. Kiểm tra các phiên bản tại <a href="https://github.com/NatswarChuan/jpa-spring-boot-generic-service/releases" target="_blank" class="underline font-bold">GitHub Releases</a>. </p></div>`,5)])])}const p=e(l,[["render",r]]);export{p as default};
