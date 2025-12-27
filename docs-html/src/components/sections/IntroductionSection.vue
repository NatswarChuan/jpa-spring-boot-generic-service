<template>
  <section id="intro" class="scroll-mt-20 mb-16 relative">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-4xl font-bold text-slate-900">{{ $t('intro.title') }}</h2>
    </div>

    <!-- Inclusive Narrative Intro (5W1H Integrated) -->
    <div class="mb-12 text-lg text-slate-600 leading-relaxed space-y-6 text-justify">
      <p v-html="$t('intro.p1')"></p>

      <p v-html="$t('intro.p2')"></p>

      <div class="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg my-6">
        <p class="text-slate-800 italic" v-html="$t('intro.quote')"></p>
      </div>
    </div>

    <!-- Quick Links -->
    <div class="flex flex-wrap gap-4 mb-16">
      <a href="https://github.com/NatswarChuan/jpa-spring-boot-generic-service/tree/main/java-demo" target="_blank"
        class="inline-flex items-center px-6 py-3 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 transition-colors shadow-lg group">
        <i class="fab fa-github text-xl mr-3 group-hover:scale-110 transition-transform"></i>
        <span>{{ $t('intro.demo_link') }}</span>
      </a>
      <a href="https://github.com/NatswarChuan/jpa-spring-boot-generic-service" target="_blank"
        class="inline-flex items-center px-6 py-3 bg-white text-slate-700 font-bold rounded-lg border border-slate-300 hover:bg-slate-50 transition-colors shadow-sm">
        <i class="fas fa-star text-yellow-500 mr-2"></i>
        <span>{{ $t('intro.star_link') }}</span>
      </a>
    </div>

    <!-- Detailed Features -->
    <div id="intro-features" class="mt-12 scroll-mt-24">
      <h3 class="text-2xl font-bold text-slate-800 mb-6">
        <span class="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm mr-3">1.2</span>
        {{ $t('intro.features_title') }}
      </h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
        <div class="flex items-start">
          <div class="text-blue-500 mt-1 mr-4"><i class="fas fa-check-circle text-lg"></i></div>
          <div>
            <h4 class="font-bold text-slate-800">{{ $t('intro.features.crud.title') }}</h4>
            <p class="text-slate-600">{{ $t('intro.features.crud.desc') }}</p>
          </div>
        </div>
        <div class="flex items-start">
          <div class="text-green-500 mt-1 mr-4"><i class="fas fa-check-circle text-lg"></i></div>
          <div>
            <h4 class="font-bold text-slate-800">{{ $t('intro.features.filter.title') }}</h4>
            <p class="text-slate-600">{{ $t('intro.features.filter.desc') }}</p>
          </div>
        </div>
        <div class="flex items-start">
          <div class="text-purple-500 mt-1 mr-4"><i class="fas fa-check-circle text-lg"></i></div>
          <div>
            <h4 class="font-bold text-slate-800">{{ $t('intro.features.mapping.title') }}</h4>
            <p class="text-slate-600">{{ $t('intro.features.mapping.desc') }}</p>
          </div>
        </div>
        <div class="flex items-start">
          <div class="text-orange-500 mt-1 mr-4"><i class="fas fa-check-circle text-lg"></i></div>
          <div>
            <h4 class="font-bold text-slate-800">{{ $t('intro.features.i18n.title') }}</h4>
            <p class="text-slate-600">{{ $t('intro.features.i18n.desc') }}</p>
          </div>
        </div>
        <div class="flex items-start">
          <div class="text-indigo-500 mt-1 mr-4"><i class="fas fa-check-circle text-lg"></i></div>
          <div>
            <h4 class="font-bold text-slate-800">{{ $t('intro.features.hooks.title') }}</h4>
            <p class="text-slate-600">{{ $t('intro.features.hooks.desc') }}</p>
          </div>
        </div>
        <div class="flex items-start">
          <div class="text-red-500 mt-1 mr-4"><i class="fas fa-check-circle text-lg"></i></div>
          <div>
            <h4 class="font-bold text-slate-800">{{ $t('intro.features.error.title') }}</h4>
            <p class="text-slate-600">{{ $t('intro.features.error.desc') }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Pros and Cons -->
    <div id="intro-pros-cons" class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16 scroll-mt-24">
      <div class="bg-emerald-50 rounded-xl p-8 border border-emerald-100">
        <h3 class="text-xl font-bold text-emerald-900 mb-4 flex items-center">
          <span class="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm mr-3">1.3</span>
          {{ $t('intro.pros_title') }}
        </h3>
        <ul class="space-y-3 text-emerald-800">
          <li class="flex items-start"><i class="fas fa-caret-right mt-1.5 mr-2 opacity-50"></i> <span
              v-html="$t('intro.pros.boilerplate')"></span></li>
          <li class="flex items-start"><i class="fas fa-caret-right mt-1.5 mr-2 opacity-50"></i> <span
              v-html="$t('intro.pros.consistency')"></span></li>
          <li class="flex items-start"><i class="fas fa-caret-right mt-1.5 mr-2 opacity-50"></i> <span
              v-html="$t('intro.pros.maintainability')"></span></li>
          <li class="flex items-start"><i class="fas fa-caret-right mt-1.5 mr-2 opacity-50"></i> <span
              v-html="$t('intro.pros.extensibility')"></span></li>
        </ul>
      </div>
      <div class="bg-rose-50 rounded-xl p-8 border border-rose-100">
        <h3 class="text-xl font-bold text-rose-900 mb-4 flex items-center">
          <i class="fas fa-minus-circle mr-2"></i> {{ $t('intro.cons_title') }}
        </h3>
        <ul class="space-y-3 text-rose-800">
          <li class="flex items-start"><i class="fas fa-caret-right mt-1.5 mr-2 opacity-50"></i> <span
              v-html="$t('intro.cons.learning_curve')"></span></li>
          <li class="flex items-start"><i class="fas fa-caret-right mt-1.5 mr-2 opacity-50"></i> <span
              v-html="$t('intro.cons.abstraction')"></span></li>
          <li class="flex items-start"><i class="fas fa-caret-right mt-1.5 mr-2 opacity-50"></i> <span
              v-html="$t('intro.cons.complexity')"></span></li>
        </ul>
      </div>
    </div>

    <!-- Security & Transparency -->
    <div id="intro-security" class="mt-16 bg-slate-50 border border-slate-200 rounded-xl p-8 scroll-mt-24">
      <h3 class="text-xl font-bold text-slate-800 mb-4 flex items-center">
        <i class="fas fa-shield-alt text-slate-500 mr-2"></i>
        {{ $t('intro.security_title') }}
      </h3>
      <p class="text-slate-600 mb-4 leading-relaxed" v-html="$t('intro.security_p1')"></p>
      <p class="text-slate-600 mb-6 leading-relaxed" v-html="$t('intro.security_p2')"></p>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="p-4 bg-white rounded-lg shadow-sm border border-slate-100">
          <h4 class="font-bold text-slate-900 mb-2 text-sm">{{ $t('intro.security_items.opensource.title') }}</h4>
          <p class="text-xs text-slate-500">{{ $t('intro.security_items.opensource.desc') }}</p>
        </div>
        <div class="p-4 bg-white rounded-lg shadow-sm border border-slate-100">
          <h4 class="font-bold text-slate-900 mb-2 text-sm">{{ $t('intro.security_items.dependencies.title') }}</h4>
          <p class="text-xs text-slate-500">{{ $t('intro.security_items.dependencies.desc') }}</p>
        </div>
        <div class="p-4 bg-white rounded-lg shadow-sm border border-slate-100">
          <h4 class="font-bold text-slate-900 mb-2 text-sm">{{ $t('intro.security_items.verify.title') }}</h4>
          <p class="text-xs text-slate-500" v-html="$t('intro.security_items.verify.desc')"></p>
        </div>
      </div>
      <div class="mt-6 text-center">
        <a href="https://github.com/NatswarChuan/jpa-spring-boot-generic-service/tree/main/java-core" target="_blank"
          class="text-blue-600 font-bold hover:underline text-sm inline-flex items-center">
          <i class="fas fa-code mr-2"></i>
          {{ $t('intro.view_source') }}
        </a>
      </div>
    </div>

  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
// No script logic needed for toggle anymore
</script>