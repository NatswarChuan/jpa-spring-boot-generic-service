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
      <Sidebar :sections="sections" :current-section-id="currentSection.id" :active-id="activeId" />
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
import { ref, computed, defineAsyncComponent, onMounted, onUnmounted, nextTick, watch } from 'vue';
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
  { 
    id: 'intro', title: '1. Giới thiệu', component: 'IntroductionSection', 
    content: 'Generic Service Framework, giải pháp CRUD, boilerplate code, Spring Boot Backend',
    subs: [
      { id: 'intro-solution', title: '1.1. Giải pháp', content: 'Base Service, Business Logic, CRUD toàn diện, Validation, Tra cứu linh hoạt, Đa ngôn ngữ' },
      { id: 'intro-features', title: '1.2. Các chức năng chính', content: 'Generic CRUD, Dynamic Filtering JPA Spec, Automatic DTO Mapping, Service Hooks, Standardized Error Handling' },
      { id: 'intro-pros-cons', title: '1.3. Ưu nhược điểm', content: 'Giảm boilerplate, tính nhất quán, dễ bảo trì, mở rộng linh hoạt, đường cong học tập' }
    ] 
  },
  { 
    id: 'installation', title: '2. Cài đặt', component: 'InstallationSection', 
    content: 'Maven Central, tích hợp dự án, repository',
    subs: [
      { id: 'installation', title: '2.1. Maven/Gradle', content: 'dependency, pom.xml, build.gradle, io.github.natswarchuan' },
      { id: 'installation-local', title: '2.2. Local Development', content: 'mvn clean install, Local Maven Repository, customize framework' },
      { id: 'installation-config', title: '2.3. Configuration', content: 'Package Scanning, scanBasePackages, SpringBootApplication, Beans recognition' }
    ] 
  },
  { 
    id: 'core-entity-repo', title: '3. Entity & Repository', component: 'EntityRepositorySection', 
    content: 'Database mapping, JPA, module Product',
    subs: [
      { id: 'core-entity', title: '3.1. Entity Definition', content: 'ManyToOne, OneToMany, Table indexes, Hibernate, Product Entity' },
      { id: 'core-repo', title: '3.2. Repository Implementation', content: 'JpaRepository, JpaSpecificationExecutor, Spring Data JPA' }
    ]
  },
  { 
    id: 'service-layer', title: '4. Service Layer', component: 'ServiceLayerSection', 
    content: 'Business logic, ServiceImpl, AbService',
    subs: [
      { id: 'core-service', title: '4.1. Basic Service', content: 'Service implementation, CRUD methods base' },
      { id: 'service-hooks', title: '4.2. Life-cycle Hooks', content: 'beforeCreate, afterUpdate, can thiệp luồng xử lý' }
    ]
  },
  { 
    id: 'controller-layer', title: '5. Controller Layer', component: 'ControllerLayerSection', 
    content: 'API endpoints, RestController, RequestMapping',
    subs: [
      { id: 'core-controller', title: '5.1. Standard Controller', content: 'AbController, getResponseSummaryDtoClass, getResponseDetailDtoClass' },
      { id: 'controller-traits', title: '5.2. Controller Traits', content: 'Modular API, ICreateController, IReadController, IUpdateController, IDeleteController, Read-only' },
      { id: 'custom-api', title: '5.3. Custom API Endpoints', content: 'Custom processing, add-on methods' }
    ]
  },
  { 
    id: 'architecture-system', title: '6. Architecture & Life-cycle', component: 'ArchitectureSection', 
    content: 'Technical spec, request flow, generic structure',
    subs: [
      { id: 'framework-spec', title: '6.1. Class Hierarchy', content: 'AbBaseService, AbReadSummaryService, AbReadDetailService, AbCreateService, AbUpdateService, AbDeleteService' },
      { id: 'generic-system', title: '6.2. Generic Type System', content: 'Entity Class E, PK Type ID, Request DTO RQ' },
      { id: 'request-lifecycle', title: '6.3. Request Life-cycle', content: 'DTO Validation, Payload Mapping, Hooks, Persistence' }
    ]
  },
  { 
    id: 'dtos', title: '7. Data Transfer Objects', content: 'DTO Model, API separation, database isolation', component: 'UsageSection', 
    subs: [
      { id: 'dto-request', title: '7.1. Request DTO', content: 'CreateReq, UpdateReq, input control' },
      { id: 'dto-response', title: '7.2. Response DTO', content: 'IDto mapping, BeanUtils, copyProperties' },
      { id: 'dto-i18n', title: '7.3. Multi-language', content: 'Multi-language support, fromEntity language parameter' }
    ]
  },
  { 
    id: 'api-list', title: '8. Base Service Methods', component: 'ApiListSection', 
    content: 'AbService methods, CRUD API reference',
    subs: [
      { id: 'api-read', title: '8.1. Read Operations', content: 'findById, findOne, findAll, Pageable, count, exists' },
      { id: 'api-write', title: '8.2. Write Operations', content: 'create, update, save, delete, bulk delete' },
      { id: 'api-hooks', title: '8.3. Service Hooks', content: 'beforeCreate, afterCreate, beforeUpdate, afterUpdate, beforeDelete, afterDelete' }
    ]
  },
  { 
    id: 'specifications', title: '9. Specification & Dynamic Search', component: 'SpecificationSection', 
    content: 'Dynamic query, complex filters, JPA Specification',
    subs: [
      { id: 'spec-default', title: '9.1. Built-in Search API', content: 'page, size, sort, dir, search, searchField' },
      { id: 'spec-custom', title: '9.2. Custom Filter (Advanced)', content: 'BaseRequestParam, ProductFilterParam, override getSpecification' }
    ]
  },
  { 
    id: 'validation', title: '10. Validation System', component: 'ValidationSection', 
    content: 'Input check, constraints, Spring Validation',
    subs: [
      { id: 'val-basic', title: '10.1. Basic Constraints', content: '@Exists, @Unique, @EnumValue, @PhoneNumber, @NoSpecialChars, @IdsExist' },
      { id: 'val-custom', title: '10.2. Custom Validators', content: '@SpecValidation, @DtoSpecValidation, SpecificationLoader' },
      { id: 'val-advanced', title: '10.3. Native SQL Constraint', content: '@SqlConstraint, Native SQL, DB level constraints' }
    ]
  },
  { 
    id: 'response-handling', title: '11. Response Handling', component: 'ResponseSection', 
    content: 'Final results, standard format, consistent API',
    subs: [
      { id: 'res-structure', title: '11.1. Response Structure', content: 'HttpApiResponse, PagedResponse, status, message, data' },
      { id: 'res-exception', title: '11.2. Exception Handling', content: 'HttpException, GlobalExceptionHandler, centralized error' }
    ]
  },
  { 
    id: 'notes', title: '12. Important Notes', component: 'NotesSection', 
    content: 'Tips, best practices, pitfalls',
    subs: [
      { id: 'notes-best-practices', title: '12.1. Best Practices', content: 'DTO Constructor, Override methods, Optimization' },
      { id: 'notes-troubleshooting', title: '12.2. Troubleshooting', content: 'N+1 Query, EntityGraph, FetchType' },
      { id: 'notes-advanced', title: '12.3. Advanced Patterns', content: 'Composite Service, Aggregator pattern' }
    ] 
  }
]);

const currentSectionIndex = ref(0);
const isSidebarOpen = ref(false);
const activeId = ref('');
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

const setupObserver = () => {
  if (observer) observer.disconnect();

  observer = new IntersectionObserver((entries) => {
    // Collect all intersecting entries
    const intersecting = entries.filter(e => e.isIntersecting);
    if (intersecting.length > 0) {
      // Pick the first one (top-most in viewport)
      activeId.value = intersecting[0].target.id;
    }
  }, {
    rootMargin: '-10% 0px -70% 0px', // Focus on top 10%-30% of viewport
    threshold: 0
  });

  // Observe current section and its subsections
  nextTick(() => {
    const idsToWatch = [currentSection.value.id, ...currentSection.value.subs.map(s => s.id)];
    idsToWatch.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
  });
};

onMounted(() => {
  window.addEventListener('hashchange', handleHashChange);
  handleHashChange();
  setupObserver();
});

onUnmounted(() => {
  window.removeEventListener('hashchange', handleHashChange);
  if (observer) observer.disconnect();
});

watch(() => currentSectionIndex.value, () => {
  activeId.value = currentSection.value.id;
  setupObserver();
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