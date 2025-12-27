<template>
  <div class="flex min-h-screen relative">
    <!-- Mobile Menu Button -->
    <button @click="toggleSidebar"
      class="md:hidden fixed top-4 right-4 z-50 bg-blue-600 text-white p-2 rounded shadow-lg">
      <i class="fas" :class="isSidebarOpen ? 'fa-times' : 'fa-bars'"></i>
    </button>

    <!-- Sidebar Overlay for Mobile -->
    <div v-if="isSidebarOpen" @click="closeSidebar" class="fixed inset-0 bg-black/50 z-30 md:hidden"></div>

    <!-- Sidebar -->
    <div
      :class="['fixed md:sticky top-0 h-screen bg-white z-40 transition-transform duration-300 ease-in-out md:translate-x-0', isSidebarOpen ? 'translate-x-0' : '-translate-x-full']">
      <Sidebar :sections="sections" :current-section-id="currentSection.id" :active-id="activeId" />
    </div>

    <!-- Main Content -->
    <MainContent :is-first-section="isFirstSection" :is-last-section="isLastSection"
      :previous-section-title="previousSectionTitle" :next-section-title="nextSectionTitle" @next="goToNextSection"
      @prev="goToPreviousSection">
      <component :is="sectionComponents[currentSection.component]" />
    </MainContent>
  </div>
</template>

<script setup>
import { ref, computed, defineAsyncComponent, onMounted, onUnmounted, nextTick, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import Sidebar from './components/Sidebar.vue';
import MainContent from './components/MainContent.vue';

const { t } = useI18n();

const sectionComponents = {
  IntroductionSection: defineAsyncComponent(() => import('./components/sections/IntroductionSection.vue')),
  ArchitectureSection: defineAsyncComponent(() => import('./components/sections/ArchitectureSection.vue')),
  InstallationSection: defineAsyncComponent(() => import('./components/sections/InstallationSection.vue')),
  QuickStartSection: defineAsyncComponent(() => import('./components/sections/QuickStartSection.vue')),
  EntityRepositorySection: defineAsyncComponent(() => import('./components/sections/EntityRepositorySection.vue')),

  UsageSection: defineAsyncComponent(() => import('./components/sections/UsageSection.vue')),
  ServiceLayerSection: defineAsyncComponent(() => import('./components/sections/ServiceLayerSection.vue')),
  ControllerLayerSection: defineAsyncComponent(() => import('./components/sections/ControllerLayerSection.vue')),
  ValidationSection: defineAsyncComponent(() => import('./components/sections/ValidationSection.vue')),
  SpecificationSection: defineAsyncComponent(() => import('./components/sections/SpecificationSection.vue')),
  ResponseSection: defineAsyncComponent(() => import('./components/sections/ResponseSection.vue')),
  ApiListSection: defineAsyncComponent(() => import('./components/sections/ApiListSection.vue')),
  NotesSection: defineAsyncComponent(() => import('./components/sections/NotesSection.vue')),
};

const sections = computed(() => [
  {
    id: 'intro', title: t('app.menu.intro'), component: 'IntroductionSection',
    content: t('app.keywords.intro'),
    subs: [
      { id: 'intro-solution', title: t('app.menu.intro_solution'), content: 'Base Service' },
      { id: 'intro-features', title: t('app.menu.intro_features'), content: 'Generic CRUD' },
      { id: 'intro-pros-cons', title: t('app.menu.intro_pros_cons'), content: 'Less boilerplate' },
      { id: 'intro-security', title: t('app.menu.intro_security'), content: 'Open source' }
    ]
  },
  {
    id: 'architecture-system', title: t('app.menu.architecture'), component: 'ArchitectureSection',
    content: t('app.keywords.architecture'),
    subs: [
      { id: 'architecture-diagram', title: t('app.menu.architecture_diagram'), content: 'Diagram' },
      { id: 'framework-spec', title: t('app.menu.framework_spec'), content: 'Class Hierarchy' },
      { id: 'generic-system', title: t('app.menu.generic_system'), content: 'Generic Types' },
      { id: 'request-lifecycle', title: t('app.menu.request_lifecycle'), content: 'Lifecycle' }
    ]
  },
  {
    id: 'installation', title: t('app.menu.installation'), component: 'InstallationSection',
    content: t('app.keywords.installation'),
    subs: [
      { id: 'installation-maven', title: t('app.menu.installation_maven'), content: 'Maven' },
      { id: 'installation-local', title: t('app.menu.installation_local'), content: 'Local' },
      { id: 'installation-config', title: t('app.menu.installation_config'), content: 'Config' }
    ]
  },
  {
    id: 'quick-start', title: t('app.menu.quick_start'), component: 'QuickStartSection',
    content: t('app.keywords.quick_start'),
    subs: []
  },
  {
    id: 'core-entity-repo', title: t('app.menu.core_entity_repo'), component: 'EntityRepositorySection',
    content: t('app.keywords.core_entity_repo'),
    subs: [
      { id: 'core-entity', title: t('app.menu.core_entity'), content: 'Entity' },
      { id: 'core-repo', title: t('app.menu.core_repo'), content: 'Repository' }
    ]
  },
  {
    id: 'dtos', title: t('app.menu.dtos'), content: t('app.keywords.dtos'), component: 'UsageSection',
    subs: [
      { id: 'dto-request', title: t('app.menu.dto_request'), content: 'Request DTO' },
      { id: 'dto-response', title: t('app.menu.dto_response'), content: 'Response DTO' },
      { id: 'dto-i18n', title: t('app.menu.dto_i18n'), content: 'I18n' }
    ]
  },
  {
    id: 'service-layer', title: t('app.menu.service_layer'), component: 'ServiceLayerSection',
    content: t('app.keywords.service_layer'),
    subs: [
      { id: 'core-service', title: t('app.menu.core_service'), content: 'Base Service' },
      { id: 'service-hooks', title: t('app.menu.service_hooks'), content: 'Hooks' }
    ]
  },
  {
    id: 'controller-layer', title: t('app.menu.controller_layer'), component: 'ControllerLayerSection',
    content: t('app.keywords.controller_layer'),
    subs: [
      { id: 'controller-hierarchy', title: t('app.menu.controller_hierarchy'), content: 'Controller Hierarchy' },
      { id: 'core-controller', title: t('app.menu.core_controller'), content: 'Standard Controller' },
      { id: 'controller-traits', title: t('app.menu.controller_traits'), content: 'Traits' },
      { id: 'custom-api', title: t('app.menu.custom_api'), content: 'Custom API' }
    ]
  },
  {
    id: 'validation', title: t('app.menu.validation'), component: 'ValidationSection',
    content: t('app.keywords.validation'),
    subs: [
      { id: 'val-basic', title: t('app.menu.val_basic'), content: 'Basic' },
      { id: 'val-custom', title: t('app.menu.val_custom'), content: 'Custom' },
      { id: 'val-advanced', title: t('app.menu.val_advanced'), content: 'SQL' }
    ]
  },
  {
    id: 'specifications', title: t('app.menu.specifications'), component: 'SpecificationSection',
    content: t('app.keywords.specifications'),
    subs: [
      { id: 'spec-default', title: t('app.menu.spec_default'), content: 'Default Spec' },
      { id: 'spec-custom', title: t('app.menu.spec_custom'), content: 'Custom Spec' }
    ]
  },
  {
    id: 'response-handling', title: t('app.menu.response_handling'), component: 'ResponseSection',
    content: t('app.keywords.response_handling'),
    subs: [
      { id: 'res-structure', title: t('app.menu.res_structure'), content: 'Response' },
      { id: 'res-exception', title: t('app.menu.res_exception'), content: 'Exception' }
    ]
  },
  {
    id: 'api-list', title: t('app.menu.api_list'), component: 'ApiListSection',
    content: t('app.keywords.api_list'),
    subs: [
      { id: 'api-read', title: t('app.menu.api_read'), content: 'Read' },
      { id: 'api-write', title: t('app.menu.api_write'), content: 'Write' },
      { id: 'api-hooks', title: t('app.menu.api_hooks'), content: 'Hooks' }
    ]
  },
  {
    id: 'notes', title: t('app.menu.notes'), component: 'NotesSection',
    content: t('app.keywords.notes'),
    subs: [
      { id: 'notes-modularity', title: t('app.menu.notes_modularity'), content: 'Modularity' },
      { id: 'notes-advanced', title: t('app.menu.notes_advanced'), content: 'Advanced' },
      { id: 'notes-best-practices', title: t('app.menu.notes_best_practices'), content: 'Best Practices' },
      { id: 'notes-troubleshooting', title: t('app.menu.notes_troubleshooting'), content: 'Troubleshooting' }
    ]
  }
]);

const currentSectionIndex = ref(0);
const isSidebarOpen = ref(false);
const activeId = ref('');
const visibleSections = ref(new Set());
let observer = null;

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



watch(() => currentSectionIndex.value, () => {
  activeId.value = currentSection.value.id;

  window.scrollTo({ top: 0, behavior: 'instant' });

  setupObserver();
});

const currentSection = computed(() => sections.value[currentSectionIndex.value]);
let mutationObserver = null;

const setupObserver = () => {




  if (observer) observer.disconnect();





  observer = new IntersectionObserver((entries) => {
    // If navigation lock is active, ignore observer updates to prevent jumping back
    if (isNavigating.value) return;

    entries.forEach(entry => {
      if (entry.isIntersecting) {
        visibleSections.value.add(entry.target.id);
      } else {
        visibleSections.value.delete(entry.target.id);
      }
    });



    const currentSubs = currentSection.value.subs || [];
    const allVisible = [currentSection.value.id, ...currentSubs.map(s => s.id)]
      .filter(id => visibleSections.value.has(id));

    if (allVisible.length > 0) {


      const visibleSubs = currentSubs.filter(sub => visibleSections.value.has(sub.id));

      if (visibleSubs.length > 0) {

        activeId.value = visibleSubs[visibleSubs.length - 1].id;
      } else if (visibleSections.value.has(currentSection.value.id)) {
        activeId.value = currentSection.value.id;
      }
    }
  }, {

    rootMargin: '-8% 0px -40% 0px',
    threshold: [0, 0.1, 0.2, 0.5, 0.8, 1.0]
  });

  nextTick(() => {
    const idsToWatch = [currentSection.value.id, ...currentSection.value.subs.map(s => s.id)];
    idsToWatch.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
  });
};


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

const isNavigating = ref(false);

// Keyboard Navigation
const flatNavigationList = computed(() => {
  const list = [];
  sections.value.forEach(section => {
    // Top-level section
    list.push({ id: section.id, sectionId: section.id, isSub: false });
    // Subsections
    if (section.subs && section.subs.length > 0) {
      section.subs.forEach(sub => {
        list.push({ id: sub.id, sectionId: section.id, isSub: true });
      });
    }
  });
  return list;
});

const handleKeydown = (e) => {
  if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
    navigate(e.key === 'ArrowRight' ? 1 : -1);
  }
};

const navigate = (direction) => {
  const currentId = activeId.value || sections.value[currentSectionIndex.value].id;
  const currentIndex = flatNavigationList.value.findIndex(item => item.id === currentId);

  if (currentIndex === -1) return;

  const targetIndex = currentIndex + direction;

  // Boundary checks
  if (targetIndex < 0 || targetIndex >= flatNavigationList.value.length) return;

  const targetItem = flatNavigationList.value[targetIndex];
  const currentItem = flatNavigationList.value[currentIndex];

  // Set navigation lock
  isNavigating.value = true;
  activeId.value = targetItem.id; // Force update UI immediately

  // Unlock after animation
  setTimeout(() => {
    isNavigating.value = false;
  }, 800);

  if (targetItem.sectionId === currentItem.sectionId) {
    // Same section: scroll smoothly
    const el = document.getElementById(targetItem.id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  } else {
    // Different section: use hash to navigate
    window.location.hash = targetItem.id;
  }
};

onMounted(() => {
  window.addEventListener('keydown', handleKeydown);
  window.addEventListener('hashchange', handleHashChange);
  handleHashChange();
  setupObserver();


  const mainEl = document.querySelector('main');
  if (mainEl) {
    mutationObserver = new MutationObserver(() => {

      setupObserver();
    });
    mutationObserver.observe(mainEl, { childList: true, subtree: true });
  }
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown);
  window.removeEventListener('hashchange', handleHashChange);
  if (observer) observer.disconnect();
  if (mutationObserver) mutationObserver.disconnect();
});
</script>