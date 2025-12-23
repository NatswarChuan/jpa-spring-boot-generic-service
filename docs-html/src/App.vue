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
  EntityRepositorySection: defineAsyncComponent(() => import('./components/sections/EntityRepositorySection.vue')),
  ServiceLayerSection: defineAsyncComponent(() => import('./components/sections/ServiceLayerSection.vue')),
  ControllerLayerSection: defineAsyncComponent(() => import('./components/sections/ControllerLayerSection.vue')),
  ArchitectureSection: defineAsyncComponent(() => import('./components/sections/ArchitectureSection.vue')),
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
    id: 'core-entity-repo', title: '3. Entity & Repository', component: 'EntityRepositorySection', 
    subs: [
      { id: 'core-entity', title: '3.1. Entity Definition' },
      { id: 'core-repo', title: '3.2. Repository Implementation' }
    ]
  },
  { 
    id: 'service-layer', title: '4. Service Layer', component: 'ServiceLayerSection', 
    subs: [
      { id: 'core-service', title: '4.1. Basic Service' },
      { id: 'service-hooks', title: '4.2. Life-cycle Hooks' }
    ]
  },
  { 
    id: 'controller-layer', title: '5. Controller Layer', component: 'ControllerLayerSection', 
    subs: [
      { id: 'core-controller', title: '5.1. Standard Controller' },
      { id: 'controller-traits', title: '5.2. Controller Traits' },
      { id: 'custom-api', title: '5.3. Custom API Endpoints' }
    ]
  },
  { 
    id: 'architecture-system', title: '6. Architecture & Life-cycle', component: 'ArchitectureSection', 
    subs: [
      { id: 'framework-spec', title: '6.1. Class Hierarchy' },
      { id: 'generic-system', title: '6.2. Generic Type System' },
      { id: 'request-lifecycle', title: '6.3. Request Life-cycle' }
    ]
  },
  { 
    id: 'dtos', title: '7. Data Transfer Objects', component: 'UsageSection', 
    subs: [
      { id: 'dto-request', title: '7.1. Request DTO' },
      { id: 'dto-response', title: '7.2. Response DTO' },
      { id: 'dto-i18n', title: '7.3. Multi-language' }
    ]
  },
  { 
    id: 'api-list', title: '8. Base Service Methods', component: 'ApiListSection', 
    subs: [
      { id: 'api-read', title: '8.1. Read Operations' },
      { id: 'api-write', title: '8.2. Write Operations' }
    ]
  },
  { 
    id: 'specifications', title: '9. Specification & Dynamic Search', component: 'SpecificationSection', 
    subs: [
      { id: 'spec-default', title: '9.1. Built-in Search API' },
      { id: 'spec-custom', title: '9.2. Custom Filter (Advanced)' }
    ]
  },
  { 
    id: 'validation', title: '10. Validation System', component: 'ValidationSection', 
    subs: [
      { id: 'val-basic', title: '10.1. Basic Constraints' },
      { id: 'val-custom', title: '10.2. Custom Validators' },
      { id: 'val-advanced', title: '10.3. Native SQL Constraint' }
    ]
  },
  { 
    id: 'response-handling', title: '11. Response Handling', component: 'ResponseSection', 
    subs: [
      { id: 'res-structure', title: '11.1. Response Structure' },
      { id: 'res-exception', title: '11.2. Exception Handling' }
    ]
  },
  { 
    id: 'notes', title: '12. Important Notes', component: 'NotesSection', 
    subs: [
      { id: 'notes-best-practices', title: '12.1. Best Practices' },
      { id: 'notes-troubleshooting', title: '12.2. Troubleshooting' },
      { id: 'notes-advanced', title: '12.3. Advanced Patterns' }
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