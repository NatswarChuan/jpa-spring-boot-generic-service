<template>
  <aside class="w-full md:w-72 bg-white border-r border-slate-200 h-screen sticky top-0 overflow-y-auto z-40 hidden md:block" id="sidebar">
    <div class="p-6 border-b border-slate-100 bg-white sticky top-0 z-10">
      <h1 class="text-xl font-bold text-slate-800 flex items-center">
        <i class="fas fa-cube text-blue-500 mr-2"></i>
        Generic Service
      </h1>
    </div>
    
    <nav class="p-4 space-y-1">
      <div v-for="section in sections" :key="section.id">
        <a 
          :href="`#${section.id}`"
          class="nav-link block px-3 py-2 rounded-md text-sm text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition-colors"
          :class="{ 'active': currentSectionId === section.id }"
        >
          {{ section.title }}
        </a>
        
        <!-- Submenu -->
        <div v-if="section.subs && section.subs.length > 0" class="ml-4 mt-1 pl-3 border-l border-slate-200 space-y-1">
          <a 
            v-for="sub in section.subs" 
            :key="sub.id" 
            :href="`#${sub.id}`"
            class="nav-sublink block text-xs text-slate-500 hover:text-blue-600 py-1 transition-colors"
          >
            {{ sub.title }}
          </a>
        </div>
      </div>
    </nav>
  </aside>
</template>

<script setup>
defineProps({
  sections: Array,
  currentSectionId: String
});
</script>