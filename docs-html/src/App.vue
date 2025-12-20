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

// Async load components
const sectionComponents = {
  IntroductionSection: defineAsyncComponent(() => import('./components/sections/IntroductionSection.vue')),
  InstallationSection: defineAsyncComponent(() => import('./components/sections/InstallationSection.vue')),
  ImplementationSection: defineAsyncComponent(() => import('./components/sections/ImplementationSection.vue')),
  UsageSection: defineAsyncComponent(() => import('./components/sections/UsageSection.vue')),
  ApiListSection: defineAsyncComponent(() => import('./components/sections/ApiListSection.vue')),
  SpecificationSection: defineAsyncComponent(() => import('./components/sections/SpecificationSection.vue')),
  ValidationSection: defineAsyncComponent(() => import('./components/sections/ValidationSection.vue')),
  ResponseSection: defineAsyncComponent(() => import('./components/sections/ResponseSection.vue')),
  NotesSection: defineAsyncComponent(() => import('./components/sections/NotesSection.vue')),
};

const sections = ref([
  { id: 'intro', title: '1. Giới thiệu', component: 'IntroductionSection', subs: [] },
  { id: 'installation', title: '2. Cài đặt', component: 'InstallationSection', subs: [] },
  { 
    id: 'implementation', title: '3. Hướng dẫn Triển khai', component: 'ImplementationSection', 
    subs: [
      { id: 'step2-1', title: '3.1. Định nghĩa Entity' },
      { id: 'step2-2', title: '3.2. Tạo Repository' },
      { id: 'step2-3', title: '3.3. Service Interface' },
      { id: 'step2-4', title: '3.4. Service Impl' }
    ]
  },
  { 
    id: 'usage', title: '4. Hướng dẫn sử dụng', component: 'UsageSection', 
    subs: [
      { id: 'usage-3-1', title: '4.1. Request DTO' },
      { id: 'usage-3-2', title: '4.2. Response DTO' },
      { id: 'usage-3-3', title: '4.3. Controller' }
    ]
  },
  { 
    id: 'abservice-methods', title: '5. Danh sách hàm (API)', component: 'ApiListSection', 
    subs: [
      { id: 'api-read-single', title: '5.1. Read (Single)' },
      { id: 'api-read-list', title: '5.2. Read (List)' },
      { id: 'api-write', title: '5.3. Write (C/U/D)' }
    ]
  },
  { 
    id: 'spec-examples', title: '6. Ví dụ Specification', component: 'SpecificationSection', 
    subs: [
      { id: 'spec-search', title: '6.1. Tìm kiếm cơ bản' },
      { id: 'spec-pageable', title: '6.2. Phân trang & Sắp xếp' }
    ]
  },

  { 
    id: 'validation', title: '7. Validation Annotations', component: 'ValidationSection', 
    subs: [
      { id: 'val-basic', title: '7.1. Validation Cơ bản' },
      { id: 'val-spec', title: '7.2. Advanced Specification Validation' },
      { id: 'val-dto', title: '7.3. DTO Level Validation' }
    ]
  },
  { 
    id: 'response-wrappers', title: '8. Cấu trúc phản hồi', component: 'ResponseSection', 
    subs: [
      { id: 'res-http', title: '8.1. HttpApiResponse' },
      { id: 'res-paged', title: '8.2. PagedResponse' }
    ]
  },
  { 
    id: 'notes', title: '9. Lưu ý quan trọng', component: 'NotesSection', 
    subs: [
      { id: 'notes-common', title: '9.1. Lỗi thường gặp' },
      { id: 'notes-n1', title: '9.2. Ưu điểm & N+1' },
      { id: 'notes-validation-perf', title: '9.3. Hiệu năng Validation' },
      { id: 'notes-tips', title: '9.4. Mẹo tối ưu' },
      { id: 'notes-exception', title: '9.5. Xử lý lỗi' }
    ] 
  }
]);

const currentSectionIndex = ref(0);
const isSidebarOpen = ref(false);

const handleHashChange = () => {
  const hash = window.location.hash.replace('#', '');
  const sectionId = hash || sections.value[0].id;

  let targetIndex = sections.value.findIndex(s => s.id === sectionId);
  let anchorId = null;

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

const currentSection = computed(() => sections.value[currentSectionIndex.value]);
const isFirstSection = computed(() => currentSectionIndex.value === 0);
const isLastSection = computed(() => currentSectionIndex.value === sections.value.length - 1);

const previousSectionTitle = computed(() => 
  !isFirstSection.value ? sections.value[currentSectionIndex.value - 1].title : null
);

const nextSectionTitle = computed(() => 
  !isLastSection.value ? sections.value[currentSectionIndex.value + 1].title : null
);

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

const toggleSidebar = () => isSidebarOpen.value = !isSidebarOpen.value;
const closeSidebar = () => isSidebarOpen.value = false;
</script>