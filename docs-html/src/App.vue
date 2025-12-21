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
    id: 'core-arch', title: '3. Core Architecture', component: 'ImplementationSection', 
    subs: [
      { id: 'core-entity', title: '3.1. Entity & Repository' },
      { id: 'core-service', title: '3.2. Service Layer' },
      { id: 'core-controller', title: '3.3. Controller Layer' }
    ]
  },
  { 
    id: 'dtos', title: '4. Data Transfer Objects', component: 'UsageSection', 
    subs: [
      { id: 'dto-request', title: '4.1. Request DTO' },
      { id: 'dto-response', title: '4.2. Response DTO' }
    ]
  },
  { 
    id: 'api-list', title: '5. Base Service APIs', component: 'ApiListSection', 
    subs: [
      { id: 'api-read', title: '5.1. Read Operations' },
      { id: 'api-write', title: '5.2. Write Operations' }
    ]
  },
  { 
    id: 'specifications', title: '6. Specification & Search', component: 'SpecificationSection', 
    subs: [
      { id: 'spec-basic', title: '6.1. Basic Search' },
      { id: 'spec-adv', title: '6.2. Advanced Features' }
    ]
  },
  { 
    id: 'validation', title: '7. Validation System', component: 'ValidationSection', 
    subs: [
      { id: 'val-basic', title: '7.1. Basic Constraints' },
      { id: 'val-custom', title: '7.2. Custom Validators' }
    ]
  },
  { 
    id: 'response-handling', title: '8. Response Handling', component: 'ResponseSection', 
    subs: [
      { id: 'res-structure', title: '8.1. Response Structure' },
      { id: 'res-exception', title: '8.2. Exception Handling' }
    ]
  },
  { 
    id: 'notes', title: '9. Important Notes', component: 'NotesSection', 
    subs: [
      { id: 'notes-best-practices', title: '9.1. Best Practices' },
      { id: 'notes-troubleshooting', title: '9.2. Troubleshooting' }
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