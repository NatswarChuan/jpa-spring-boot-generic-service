<template>
  <aside class="w-full md:w-72 bg-white border-r border-slate-200 h-screen sticky top-0 z-40 hidden md:flex md:flex-col" id="sidebar">
    <div class="p-6 border-b border-slate-100 bg-white flex-shrink-0">
      <h1 class="text-xl font-bold text-slate-800 flex items-center">
        <i class="fas fa-cube text-blue-500 mr-2"></i>
        Generic Service
      </h1>
    </div>
    
    <nav class="p-4 space-y-1 flex-1 overflow-y-auto">
      <div v-for="section in sections" :key="section.id">
        <div class="flex items-center justify-between group rounded-md hover:bg-slate-50 transition-colors"
             :class="{ 'bg-blue-50': isSectionActive(section) }">
          <a 
            :href="`#${section.id}`"
            class="block flex-1 px-3 py-2 text-sm font-medium truncate transition-colors"
            :class="isSectionActive(section) ? 'text-blue-700' : 'text-slate-600 group-hover:text-blue-600'"
            @click="handleSectionClick($event, section)"
          >
            {{ section.title }}
          </a>
          
          <!-- Toggle Button -->
          <button 
            v-if="section.subs && section.subs.length > 0"
            @click.stop="toggleSection(section.id)"
            class="p-2 text-slate-400 hover:text-blue-600 transition-colors focus:outline-none"
          >
            <i class="fas text-xs transition-transform duration-200" 
               :class="isOpen(section.id) ? 'fa-chevron-down' : 'fa-chevron-right'"></i>
          </button>
        </div>
        
        <!-- Submenu (Expandable) -->
        <div 
          v-if="section.subs && section.subs.length > 0" 
          v-show="isOpen(section.id)"
          class="ml-4 mt-1 pl-3 border-l border-slate-200 space-y-1 transition-all duration-300"
        >
          <a 
            v-for="sub in section.subs" 
            :key="sub.id" 
            :href="`#${sub.id}`"
            class="nav-sublink block text-xs py-1 transition-colors truncate"
            :class="currentSectionId === sub.id ? 'text-blue-600 font-medium' : 'text-slate-500 hover:text-blue-600'"
          >
            {{ sub.title }}
          </a>
        </div>
      </div>
    </nav>
    
    <!-- Author Footer -->
    <div class="p-4 border-t border-slate-100 bg-slate-50 text-xs text-slate-500 text-center flex-shrink-0">
      <p>Tác giả: <strong class="text-slate-700">NatswarChuan</strong></p>
      <p class="mt-1 opacity-75">&copy; 2024 Generic Service</p>
    </div>
  </aside>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';

const props = defineProps({
  sections: Array,
  currentSectionId: String
});

const openSections = ref(new Set());

const isOpen = (id) => openSections.value.has(id);

const toggleSection = (id) => {
  if (openSections.value.has(id)) {
    openSections.value.delete(id);
  } else {
    openSections.value.add(id);
  }
};

const forceOpen = (id) => {
  openSections.value.add(id);
};

const handleSectionClick = (event, section) => {
  // Nếu section có sub-menu
  if (section.subs && section.subs.length > 0) {
    if (openSections.value.has(section.id)) {
      // Nếu đang mở -> Đóng lại và CHẶN navigation
      event.preventDefault();
      openSections.value.delete(section.id);
    } else {
      // Nếu đang đóng -> Mở ra và cho phép navigation bình thường
      openSections.value.add(section.id);
    }
  }
  // Nếu không có sub-menu thì hành xử như link bình thường (không cần code gì thêm)
};

// Helper: Check if a section or its children are active
const isSectionActive = (section) => {
  if (props.currentSectionId === section.id) return true;
  return section.subs && section.subs.some(sub => sub.id === props.currentSectionId);
};

// Watch for currentSectionId changes to auto-expand parent
watch(() => props.currentSectionId, (newId) => {
  if (!newId) return;
  
  // Find parent section of the current ID
  const parent = props.sections.find(s => 
    s.id === newId || (s.subs && s.subs.some(sub => sub.id === newId))
  );

  if (parent) {
    openSections.value.add(parent.id);
  }
}, { immediate: true });

onMounted(() => {
  // Initial expand based on active section
  if (props.currentSectionId) {
    const parent = props.sections.find(s => 
      s.id === props.currentSectionId || (s.subs && s.subs.some(sub => sub.id === props.currentSectionId))
    );
    if (parent) openSections.value.add(parent.id);
  }
});
</script>