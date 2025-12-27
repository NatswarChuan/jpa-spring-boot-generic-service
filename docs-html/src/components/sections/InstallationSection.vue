<template>
  <section id="installation" class="scroll-mt-20 mb-16">
    <h2 class="text-4xl font-bold text-slate-900 mb-6">{{ $t('install.title') }}</h2>

    <p class="text-lg text-slate-600 leading-relaxed mb-8" v-html="$t('install.intro')"></p>


    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
      <div class="bg-blue-50 border border-blue-200 rounded-lg p-5">
        <h4 class="font-bold text-blue-900 mb-3 flex items-center">
          <i class="fas fa-check-circle mr-2"></i> {{ $t('install.requirements.title') }}
        </h4>
        <ul class="space-y-2 text-sm text-blue-800">
          <li class="flex items-center"><span class="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>{{ $t('install.requirements.java') }}</li>
          <li class="flex items-center"><span class="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>{{ $t('install.requirements.springboot') }}</li>
          <li class="flex items-center"><span class="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>{{ $t('install.requirements.hibernate') }}
          </li>
        </ul>
      </div>
      <div class="bg-green-50 border border-green-200 rounded-lg p-5">
        <h4 class="font-bold text-green-900 mb-3 flex items-center">
          <i class="fas fa-flask mr-2"></i> {{ $t('install.tested_versions.title') }}
        </h4>
        <div class="flex flex-wrap gap-2">
          <span
            class="bg-white border border-green-200 text-green-700 px-3 py-1 rounded-full text-xs font-bold shadow-sm">Spring
            Boot 3.3.x</span>
          <span
            class="bg-white border-green-200 text-green-700 px-3 py-1 rounded-full text-xs font-bold shadow-sm">Spring
            Boot 3.2.x</span>
          <span
            class="bg-white border-green-200 text-green-700 px-3 py-1 rounded-full text-xs font-bold shadow-sm">Spring
            Boot 3.1.x</span>
        </div>
        <p class="text-xs text-green-700 mt-3 pt-3 border-t border-green-200 uppercase font-bold">
          {{ $t('install.tested_versions.priority_label') }} <span class="bg-green-200 text-green-900 px-1 rounded">{{ $t('install.tested_versions.priority_value') }}</span>
        </p>
      </div>
    </div>


    <div id="installation-maven" class="mb-8 scroll-mt-24">
      <h3 class="text-2xl font-bold text-slate-800 mb-4 flex items-center">
        <span class="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm mr-3">3.1</span>
        {{ $t('install.maven.title') }}
      </h3>

      <div class="bg-slate-900 rounded-lg p-4 shadow-lg overflow-x-auto">
        <p class="text-slate-400 text-sm mb-2 font-mono" v-html="$t('install.maven.comment_xml')"></p>
        <pre class="text-green-400 font-mono text-sm">
&lt;dependency&gt;
    &lt;groupId&gt;io.github.natswarchuan&lt;/groupId&gt;
    &lt;artifactId&gt;jpa-spring-boot-generic-service&lt;/artifactId&gt;
    &lt;version&gt;LATEST_VERSION&lt;/version&gt; <span class="text-slate-500" v-html="$t('install.maven.comment_version')"></span>
&lt;/dependency&gt;</pre>
      </div>
    </div>


    <div class="mb-10">

      <h4 class="font-bold text-slate-700 mb-3 mt-6 flex items-center">
        <i class="fas fa-cubes text-blue-600 mr-2"></i> {{ $t('install.gradle.title') }}
      </h4>

      <div class="bg-slate-900 rounded-lg p-4 shadow-lg overflow-x-auto">
        <p class="text-slate-400 text-sm mb-2 font-mono" v-html="$t('install.gradle.comment_file')"></p>
        <pre class="text-green-400 font-mono text-sm">
dependencies {
    <span class="text-slate-500" v-html="$t('install.gradle.comment_version')"></span>
    implementation 'io.github.natswarchuan:jpa-spring-boot-generic-service:LATEST_VERSION'
}</pre>
      </div>
    </div>


    <div id="installation-local" class="mb-10 p-6 bg-slate-50 border border-slate-200 rounded-xl scroll-mt-24">
      <h3 class="text-2xl font-bold text-slate-800 mb-4 flex items-center">
        <span class="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm mr-3">3.2</span>
        {{ $t('install.local.title') }}
      </h3>
      <p class="text-slate-600 mb-4">
        {{ $t('install.local.desc') }}
      </p>

      <div class="bg-slate-900 rounded-lg p-4 mb-4 font-mono text-sm text-green-400">
        <span class="text-slate-500" v-html="$t('install.local.comment_cmd')"></span><br />
        mvn clean install
      </div>

      <p class="text-sm text-slate-500 italic" v-html="$t('install.local.note')"></p>
    </div>


    <div id="installation-config" class="mb-10 scroll-mt-24">
      <h3 class="text-2xl font-bold text-slate-800 mb-4 flex items-center">
        <span class="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm mr-3">3.3</span>
        {{ $t('install.config.title') }}
      </h3>
      <p class="text-slate-600 mb-4">
        {{ $t('install.config.desc') }}
      </p>

      <div class="bg-slate-900 rounded-lg p-4 shadow-lg overflow-x-auto">
        <pre class="text-green-400 font-mono text-sm">
@SpringBootApplication(scanBasePackages = { 
    "com.your.package",             <span class="text-slate-500" v-html="$t('install.config.comment_package')"></span>
    "com.natswarchuan.genericservice" <span class="text-slate-500" v-html="$t('install.config.comment_lib')"></span>
})
public class YourApplication { ... }</pre>
      </div>
    </div>

    <div class="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-lg">
      <p class="text-yellow-800">
        <span v-html="$t('install.important')"></span>
        <a href="https://github.com/NatswarChuan/jpa-spring-boot-generic-service/releases" target="_blank"
          class="underline font-bold text-blue-700">
          GitHub Releases <i class="fas fa-external-link-alt ml-1"></i>
        </a>
      </p>
    </div>
  </section>
</template>
