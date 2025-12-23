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
import Sidebar from './components/Sidebar.vue';
import MainContent from './components/MainContent.vue';


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

const sections = ref([
  {
    id: 'intro', title: '1. Giới thiệu', component: 'IntroductionSection',
    content: 'Generic Service Framework, giải pháp CRUD, boilerplate code, Spring Boot Backend',
    subs: [
      { id: 'intro-solution', title: '1.1. Giải pháp', content: 'Base Service, Business Logic, CRUD toàn diện, Validation, Tra cứu linh hoạt' },
      { id: 'intro-features', title: '1.2. Các chức năng chính', content: 'Generic CRUD, Dynamic Filtering JPA Spec, Automatic DTO Mapping' },
      { id: 'intro-pros-cons', title: '1.3. Ưu nhược điểm', content: 'Giảm boilerplate, tính nhất quán, dễ bảo trì' },
      { id: 'intro-security', title: '1.4. Sự an toàn & Minh bạch', content: 'Cam kết mã nguồn mở, không mã độc' }
    ]
  },
  {
    id: 'architecture-system', title: '2. Kiến trúc & Vòng đời', component: 'ArchitectureSection',
    content: 'Technical spec, request flow, generic structure',
    subs: [
      { id: 'architecture-diagram', title: '2.1. Sơ đồ Kiến trúc', content: 'Mô hình tổng quan, Data flow, Controller Service Repository' },
      { id: 'framework-spec', title: '2.2. Phân cấp Class', content: 'AbBaseService, AbReadSummaryService, AbReadDetailService' },
      { id: 'generic-system', title: '2.3. Hệ thống Generic Type', content: 'Entity Class E, PK Type ID, Request DTO RQ' },
      { id: 'request-lifecycle', title: '2.4. Vòng đời Request', content: 'DTO Validation, Payload Mapping, Hooks, Persistence' }
    ]
  },
  {
    id: 'installation', title: '3. Cài đặt & Cấu hình', component: 'InstallationSection',
    content: 'Maven Central, tích hợp dự án, repository',
    subs: [
      { id: 'installation', title: '3.1. Cấu hình Maven/Gradle', content: 'dependency, pom.xml, build.gradle' },
      { id: 'installation-local', title: '3.2. Môi trường Local', content: 'mvn clean install' },
      { id: 'installation-config', title: '3.3. Cấu hình Ứng dụng', content: 'Package Scanning, scanBasePackages' }
    ]
  },
  {
    id: 'quick-start', title: '4. Bắt đầu nhanh', component: 'QuickStartSection',
    content: 'Quick start guide, copy paste code example, 5 step tutorial',
    subs: []
  },
  {
    id: 'core-entity-repo', title: '5. Entity & Repository', component: 'EntityRepositorySection',
    content: 'Database mapping, JPA, module Product',
    subs: [
      { id: 'core-entity', title: '5.1. Định nghĩa Entity', content: 'ManyToOne, OneToMany, Table indexes' },
      { id: 'core-repo', title: '5.2. Triển khai Repository', content: 'JpaRepository, JpaSpecificationExecutor' }
    ]
  },
  {
    id: 'dtos', title: '6. Data Transfer Objects (DTO)', content: 'DTO Model, API separation', component: 'UsageSection',
    subs: [
      { id: 'dto-request', title: '6.1. Request DTO', content: 'CreateReq, UpdateReq, input control' },
      { id: 'dto-response', title: '6.2. Response DTO', content: 'IDto mapping, BeanUtils' },
      { id: 'dto-i18n', title: '6.3. Hỗ trợ Đa ngôn ngữ', content: 'Multi-language support' }
    ]
  },
  {
    id: 'service-layer', title: '7. Tầng Service', component: 'ServiceLayerSection',
    content: 'Business logic, ServiceImpl, AbService',
    subs: [
      { id: 'core-service', title: '7.1. Lựa chọn Base Class', content: 'Service implementation, CRUD methods base' },
      { id: 'service-hooks', title: '7.2. Các Hooks Vòng đời', content: 'beforeCreate, afterUpdate' }
    ]
  },
  {
    id: 'controller-layer', title: '8. Tầng Controller', component: 'ControllerLayerSection',
    content: 'API endpoints, RestController',
    subs: [
      { id: 'controller-hierarchy', title: '8.1. Phân cấp Class', content: 'IBaseController, AbController' },
      { id: 'core-controller', title: '8.2. Controller Tiêu chuẩn', content: 'AbController, getResponseSummaryDtoClass' },
      { id: 'controller-traits', title: '8.3. Controller Traits (Module hóa)', content: 'Modular API, ICreateController, Lego System' },
      { id: 'custom-api', title: '8.4. API Custom (Tùy chỉnh)', content: 'Custom processing, add-on methods' }
    ]
  },
  {
    id: 'validation', title: '9. Hệ thống Validation', component: 'ValidationSection',
    content: 'Input check, constraints',
    subs: [
      { id: 'val-basic', title: '9.1. Ràng buộc Cơ bản', content: '@Exists, @Unique, @EnumValue' },
      { id: 'val-custom', title: '9.2. Validator Tùy chỉnh', content: '@SpecValidation, @DtoSpecValidation' },
      { id: 'val-advanced', title: '9.3. Ràng buộc SQL Tự nhiên', content: '@SqlConstraint, Native SQL' }
    ]
  },
  {
    id: 'specifications', title: '10. Specification & Tìm kiếm', component: 'SpecificationSection',
    content: 'Dynamic query, complex filters',
    subs: [
      { id: 'spec-default', title: '10.1. API Tìm kiếm Tích hợp', content: 'page, size, sort, search' },
      { id: 'spec-custom', title: '10.2. Bộ lọc Tùy chỉnh (Advance)', content: 'BaseRequestParam, ProductFilterParam' }
    ]
  },
  {
    id: 'response-handling', title: '11. Xử lý Phản hồi (Response)', component: 'ResponseSection',
    content: 'Final results, standard format',
    subs: [
      { id: 'res-structure', title: '11.1. Cấu trúc Phản hồi', content: 'HttpApiResponse, PagedResponse' },
      { id: 'res-exception', title: '11.2. Xử lý Ngoại lệ', content: 'HttpException, GlobalExceptionHandler' }
    ]
  },
  {
    id: 'api-list', title: '12. Các phương thức Base Service', component: 'ApiListSection',
    content: 'AbService methods, CRUD API reference',
    subs: [
      { id: 'api-read', title: '12.1. Thao tác Đọc (Read)', content: 'findById, findOne, findAll' },
      { id: 'api-write', title: '12.2. Thao tác Ghi (Write)', content: 'create, update, save, delete' },
      { id: 'api-hooks', title: '12.3. Service Hooks', content: 'beforeCreate, afterCreate, beforeUpdate' }
    ]
  },
  {
    id: 'notes', title: '13. Lưu ý Quan trọng', component: 'NotesSection',
    content: 'Tips, best practices',
    subs: [
      { id: 'notes-modularity', title: '13.1. Chiến lược Module hóa', content: 'Right-sizing, Controller Traits' },
      { id: 'notes-advanced', title: '13.2. Mẫu Sử dụng Nâng cao', content: 'Composite Service' },
      { id: 'notes-best-practices', title: '13.3. Thực hành Tốt nhất', content: 'DTO Constructor, Override methods' },
      { id: 'notes-troubleshooting', title: '13.4. Xử lý Sự cố', content: 'N+1 Query' }
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

onMounted(() => {
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
  window.removeEventListener('hashchange', handleHashChange);
  if (observer) observer.disconnect();
  if (mutationObserver) mutationObserver.disconnect();
});

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
</script>