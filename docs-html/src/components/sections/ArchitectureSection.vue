<template>
  <section id="architecture-system" class="scroll-mt-20 mb-16">
    <h2 class="text-3xl font-bold text-slate-900 border-b pb-4 mb-8">{{ $t('arch.title') }}</h2>
    <p class="text-slate-600 italic mb-6">{{ $t('arch.subtitle') }}</p>


    <!-- Architecture Overview Diagram -->
    <article id="architecture-diagram" class="mb-10 scroll-mt-24">
       <h3 class="text-xl font-bold text-slate-800 mb-3">
        <span class="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm mr-3">2.1</span>
        {{ $t('arch.diagram_title') }}
      </h3>
      <p class="text-slate-600 mb-4">{{ $t('arch.diagram_desc') }}</p>
      <div class="bg-slate-50 rounded-xl p-4 border border-slate-200">
         <ArchitectureDiagram />
      </div>
    </article>

    <article id="framework-spec" class="mb-10 scroll-mt-24">
      <h3 class="text-xl font-bold text-slate-800 mb-3">
        <span class="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm mr-3">2.2</span>
        {{ $t('arch.class_hierarchy_title') }}
      </h3>
      <p class="text-slate-600 mb-6">
        {{ $t('arch.class_hierarchy_desc') }}
      </p>
      
      <div class="mb-6 bg-white border border-slate-200 rounded-lg p-6 shadow-sm overflow-x-auto">
        <div class="space-y-2 font-mono text-sm leading-relaxed">
          <div class="flex items-center">
            <span class="bg-slate-500 text-white px-3 py-0.5 rounded shadow-sm">AbBaseService</span>
            <span class="mx-3 text-slate-400">→ {{ $t('arch.services.base') }}</span>
          </div>
          <div class="ml-8 border-l-2 border-slate-200 pl-4 space-y-2">
            <div class="flex items-center">
              <span class="bg-amber-500 text-white px-3 py-0.5 rounded shadow-sm">AbReadSummaryService</span>
              <span class="mx-3 text-slate-400">→ {{ $t('arch.services.read_summary') }}</span>
            </div>
            <div class="ml-8 border-l-2 border-slate-200 pl-4 space-y-2">
              <div class="flex items-center">
                <span class="bg-orange-500 text-white px-3 py-0.5 rounded shadow-sm">AbReadDetailService</span>
                <span class="mx-3 text-slate-400">→ {{ $t('arch.services.read_detail') }}</span>
              </div>
              <div class="ml-8 border-l-2 border-slate-200 pl-4 space-y-2">
                <div class="flex items-center">
                  <span class="bg-pink-500 text-white px-3 py-0.5 rounded shadow-sm">AbCreateService</span>
                  <span class="mx-3 text-slate-400">→ {{ $t('arch.services.create') }}</span>
                </div>
                <div class="ml-8 border-l-2 border-slate-200 pl-4 space-y-2">
                  <div class="flex items-center">
                    <span class="bg-purple-500 text-white px-3 py-0.5 rounded shadow-sm">AbUpdateService</span>
                    <span class="mx-3 text-slate-400">→ {{ $t('arch.services.update') }}</span>
                  </div>
                  <div class="ml-8 border-l-2 border-slate-200 pl-4 space-y-2">
                    <div class="flex items-center">
                      <span class="bg-indigo-500 text-white px-3 py-0.5 rounded shadow-sm">AbDeleteService</span>
                      <span class="mx-3 text-slate-400">→ {{ $t('arch.services.delete') }}</span>
                    </div>
                    <div class="ml-8 border-l-2 border-slate-200 pl-4">
                      <div class="flex items-center">
                        <span class="bg-blue-600 text-white px-3 py-0.5 rounded shadow-sm">AbService</span>
                        <span class="mx-3 text-slate-400 font-bold">→ {{ $t('arch.services.full') }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>

    <article id="generic-system" class="mb-10 scroll-mt-24">
      <h3 class="text-xl font-bold text-slate-800 mb-3">
        <span class="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm mr-3">2.3</span>
        {{ $t('arch.generic_type_title') }}
      </h3>
      <p class="text-slate-600 mb-4">{{ $t('arch.generic_type_desc') }}</p>
      
      <div class="overflow-x-auto rounded-lg border border-slate-200">
        <table class="w-full text-left text-sm border-collapse">
          <thead>
            <tr class="bg-slate-50 text-slate-600 italic">
              <th class="p-3 border-b">{{ $t('arch.table.type') }}</th>
              <th class="p-3 border-b">{{ $t('arch.table.desc') }}</th>
            </tr>
          </thead>
          <tbody class="text-slate-700">
            <tr>
              <td class="p-3 border-b font-mono font-bold text-blue-600">E</td>
              <td class="p-3 border-b" v-html="$t('arch.types.e')"></td>
            </tr>
            <tr>
              <td class="p-3 border-b font-mono font-bold text-blue-600">ID</td>
              <td class="p-3 border-b" v-html="$t('arch.types.id')"></td>
            </tr>
            <tr>
              <td class="p-3 border-b font-mono font-bold text-blue-600">RQ</td>
              <td class="p-3 border-b" v-html="$t('arch.types.rq')"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </article>

    <article id="request-lifecycle" class="mb-10 scroll-mt-24">
      <h3 class="text-xl font-bold text-slate-800 mb-3">
        <span class="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm mr-3">2.4</span>
        {{ $t('arch.lifecycle_title') }}
      </h3>
      <p class="text-slate-600 mb-6" v-html="$t('arch.lifecycle_desc')"></p>
      
      <div class="relative pl-8 border-l-2 border-blue-500 space-y-8 ml-4">
        <div v-for="(step, index) in lifecycleSteps" :key="index" class="relative">
          <div class="absolute -left-[41px] top-1.5 w-4 h-4 rounded-full bg-blue-500 border-4 border-white shadow-sm"></div>
          <h4 class="font-bold text-slate-800 text-sm uppercase tracking-wider mb-1">{{ index + 1 }}. {{ step.title }}</h4>
          <p class="text-sm text-slate-500">{{ step.desc }}</p>
        </div>
      </div>
    </article>
  </section>
</template>

<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import ArchitectureDiagram from '../ArchitectureDiagram.vue';

const { t } = useI18n();

const lifecycleSteps = computed(() => [
  { title: t('arch.steps.validation.title'), desc: t('arch.steps.validation.desc') },
  { title: t('arch.steps.mapping.title'), desc: t('arch.steps.mapping.desc') },
  { title: t('arch.steps.before_hook.title'), desc: t('arch.steps.before_hook.desc') },
  { title: t('arch.steps.persistence.title'), desc: t('arch.steps.persistence.desc') },
  { title: t('arch.steps.after_hook.title'), desc: t('arch.steps.after_hook.desc') },
  { title: t('arch.steps.final_mapping.title'), desc: t('arch.steps.final_mapping.desc') }
]);
</script>
