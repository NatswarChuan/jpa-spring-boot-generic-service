<template>
  <div class="flex min-h-screen relative">
    <!-- Mobile Menu Button -->
    <button @click="toggleSidebar" class="md:hidden fixed top-4 right-4 z-50 bg-blue-600 text-white p-2 rounded shadow-lg">
      <i class="fas" :class="isSidebarOpen ? 'fa-times' : 'fa-bars'"></i>
    </button>

    <!-- Sidebar Overlay for Mobile -->
    <div v-if="isSidebarOpen" @click="closeSidebar" class="fixed inset-0 bg-black/50 z-30 md:hidden"></div>

    <!-- Sidebar -->
    <div :class="['fixed md:sticky top-0 h-screen bg-white z-40 transition-transform duration-300 ease-in-out md:translate-x-0', isSidebarOpen ? 'translate-x-0' : '-translate-x-full']">
      <Sidebar :sections="sections" :current-section-id="currentSection.id" />
    </div>

    <!-- Main Content -->
    <MainContent 
      :is-first-section="isFirstSection" 
      :is-last-section="isLastSection"
      :previous-section-title="previousSectionTitle" 
      :next-section-title="nextSectionTitle" 
      @next="goToNextSection"
      @prev="goToPreviousSection"
    >
      <component :is="sectionComponents[currentSection.component]" />
    </MainContent>
  </div>
</template>

<script setup>
import { ref, computed, defineAsyncComponent, onMounted, onUnmounted, nextTick } from 'vue';
import Sidebar from './components/Sidebar.vue';
import MainContent from './components/MainContent.vue';

// Async load components for better performance
const sectionComponents = {
  IntroductionSection: defineAsyncComponent(() => import('./components/sections/IntroductionSection.vue')),
  ImplementationSection: defineAsyncComponent(() => import('./components/sections/ImplementationSection.vue')),
  UsageSection: defineAsyncComponent(() => import('./components/sections/UsageSection.vue')),
  ApiListSection: defineAsyncComponent(() => import('./components/sections/ApiListSection.vue')),
  SpecificationSection: defineAsyncComponent(() => import('./components/sections/SpecificationSection.vue')),
  NotesSection: defineAsyncComponent(() => import('./components/sections/NotesSection.vue')),
};

const sections = ref([
  { id: 'intro', title: '1. Giới thiệu', component: 'IntroductionSection', subs: [] },
  { 
    id: 'implementation', title: '2. Hướng dẫn Triển khai', component: 'ImplementationSection', 
    subs: [
      { id: 'step2-1', title: '2.1. Định nghĩa Entity' },
      { id: 'step2-2', title: '2.2. Tạo Repository' },
      { id: 'step2-3', title: '2.3. Service Interface' },
      { id: 'step2-4', title: '2.4. Service Impl' }
    ]
  },
  { 
    id: 'usage', title: '3. Hướng dẫn sử dụng', component: 'UsageSection', 
    subs: [
      { id: 'usage-3-1', title: '3.1. Request DTO' },
      { id: 'usage-3-2', title: '3.2. Response DTO' },
      { id: 'usage-3-3', title: '3.3. Controller' }
    ]
  },
  { 
    id: 'abservice-methods', title: '4. Danh sách hàm (API)', component: 'ApiListSection', 
    subs: [
      { id: 'api-read-single', title: '4.1. Read (Single)' },
      { id: 'api-read-list', title: '4.2. Read (List)' },
      { id: 'api-write', title: '4.3. Write (C/U/D)' }
    ]
  },
  { 
    id: 'spec-examples', title: '5. Ví dụ Specification', component: 'SpecificationSection', 
    subs: [
      { id: 'spec-search', title: '5.1. Tìm kiếm cơ bản' },
      { id: 'spec-pageable', title: '5.4. Phân trang & Sắp xếp' }
    ]
  },
  { id: 'notes', title: '6. Lưu ý quan trọng', component: 'NotesSection', subs: [] }
]);

const currentSectionIndex = ref(0);
const isSidebarOpen = ref(false);

const handleHashChange = () => {
  const hash = window.location.hash.replace('#', '');
  const sectionId = hash || sections.value[0].id;

  let targetIndex = sections.value.findIndex(s => s.id === sectionId);
  let anchorId = null;

  // If hash is a subsection, find parent section
  if (targetIndex === -1) {
    for (let i = 0; i < sections.value.length; i++) {
      if (sections.value[i].subs.some(sub => sub.id === sectionId)) {
        targetIndex = i;
        anchorId = sectionId;
        break;
      }
    }
  }

  if (targetIndex !== -1) {
    if (currentSectionIndex.value !== targetIndex) {
      currentSectionIndex.value = targetIndex;
    }
    
    nextTick(() => {
      const el = document.getElementById(anchorId || sectionId);
      if (el) {
        if (anchorId) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          window.scrollTo(0, 0);
        }
      }
    });
  }
};

onMounted(() => {
  window.addEventListener('hashchange', handleHashChange);
  handleHashChange();
});

onUnmounted(() => {
  window.removeEventListener('hashchange', handleHashChange);
});

// Computed properties for navigation
const currentSection = computed(() => sections.value[currentSectionIndex.value]);
const isFirstSection = computed(() => currentSectionIndex.value === 0);
const isLastSection = computed(() => currentSectionIndex.value === sections.value.length - 1);

const previousSectionTitle = computed(() => 
  !isFirstSection.value ? sections.value[currentSectionIndex.value - 1].title : null
);

const nextSectionTitle = computed(() => 
  !isLastSection.value ? sections.value[currentSectionIndex.value + 1].title : null
);

// Navigation actions
const goToNextSection = () => {
  if (!isLastSection.value) {
    window.location.hash = sections.value[currentSectionIndex.value + 1].id;
  }
};

const goToPreviousSection = () => {
  if (!isFirstSection.value) {
    window.location.hash = sections.value[currentSectionIndex.value - 1].id;
  }
};

// Sidebar actions
const toggleSidebar = () => isSidebarOpen.value = !isSidebarOpen.value;
const closeSidebar = () => isSidebarOpen.value = false;
</script>