<template>
  <aside class="w-full md:w-72 bg-white border-r border-slate-200 h-screen sticky top-0 z-40 hidden md:flex md:flex-col"
    id="sidebar">
    <div class="p-6 border-b border-slate-100 bg-white flex-shrink-0 flex justify-between items-center">
      <h1 class="text-xl font-bold text-slate-800 flex items-center">
        <i class="fas fa-cube text-blue-500 mr-2"></i>
        {{ $t('app.title') }}
      </h1>
      <button @click="toggleLanguage"
        class="text-xs font-semibold text-blue-600 hover:text-blue-800 border border-blue-200 px-2 py-1 rounded bg-slate-50 hover:bg-white shadow-sm transition-colors"
        title="Switch Language">
        {{ locale === 'en' ? 'VN' : 'EN' }}
      </button>
    </div>

    <div class="px-4 py-3 border-b border-slate-100">
      <div class="relative">
        <span class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <i class="fas fa-search text-slate-400 text-xs"></i>
        </span>
        <input v-model="searchQuery" type="text" :placeholder="$t('app.search_placeholder')"
          class="block w-full pl-9 pr-3 py-2 border border-slate-200 rounded-md leading-5 bg-slate-50 text-sm placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all font-sans" />
      </div>
    </div>

    <nav class="p-4 space-y-1 flex-1 overflow-y-auto">
      <div v-for="section in filteredSections" :key="section.id">
        <div class="flex items-center justify-between group rounded-md hover:bg-slate-50 transition-colors"
          :class="{ 'bg-blue-50': isSectionActive(section) }">
          <a :href="`#${section.id}`" class="block flex-1 px-3 py-2 text-sm font-medium truncate transition-colors"
            :class="isSectionActive(section) ? 'text-blue-700' : 'text-slate-600 group-hover:text-blue-600'"
            @click="handleSectionClick($event, section)">
            {{ section.title }}
          </a>

          <!-- Toggle Button -->
          <button v-if="section.subs && section.subs.length > 0" @click.stop="toggleSection(section.id)"
            class="p-2 text-slate-400 hover:text-blue-600 transition-colors focus:outline-none">
            <i class="fas text-xs transition-transform duration-200"
              :class="isOpen(section.id) ? 'fa-chevron-down' : 'fa-chevron-right'"></i>
          </button>
        </div>

        <!-- Submenu (Expandable) -->
        <div v-if="section.subs && section.subs.length > 0" v-show="isOpen(section.id)"
          class="ml-4 mt-1 pl-3 border-l border-slate-200 space-y-1 transition-all duration-300">
          <a v-for="sub in section.subs" :key="sub.id" :href="`#${sub.id}`"
            class="nav-sublink block text-xs py-1 transition-colors truncate"
            :class="activeId === sub.id ? 'text-blue-600 font-medium' : 'text-slate-500 hover:text-blue-600'">
            {{ sub.title }}
          </a>
        </div>
      </div>
    </nav>

    <!-- Author Footer -->
    <div class="p-4 border-t border-slate-100 bg-slate-50 text-xs text-slate-500 text-center flex-shrink-0">
      <p>{{ $t('app.author') }}: <strong class="text-slate-700">NatswarChuan</strong></p>
      <p class="mt-1 opacity-75">&copy; 2025 Generic Service</p>
    </div>
  </aside>
</template>

<script setup>
import { ref, watch, onMounted, computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { t, locale } = useI18n();

const toggleLanguage = () => {
  locale.value = locale.value === 'en' ? 'vi' : 'en';
};

const props = defineProps({
  sections: Array,
  currentSectionId: String,
  activeId: String
});

const searchQuery = ref('');
const openSections = ref(new Set());

const filteredSections = computed(() => {
  if (!searchQuery.value) return props.sections;

  const query = searchQuery.value.toLowerCase();

  return props.sections.map(section => {

    const titleMatch = section.title.toLowerCase().includes(query);
    const contentMatch = section.content?.toLowerCase().includes(query);
    const isSectionMatch = titleMatch || contentMatch;


    const filteredSubs = section.subs?.filter(sub => {
      const subTitleMatch = sub.title.toLowerCase().includes(query);
      const subContentMatch = sub.content?.toLowerCase().includes(query);
      return subTitleMatch || subContentMatch;
    }) || [];

    if (isSectionMatch || filteredSubs.length > 0) {

      openSections.value.add(section.id);





      return { ...section, subs: filteredSubs };
    }
    return null;
  }).filter(Boolean);
});

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

  if (section.subs && section.subs.length > 0) {
    if (openSections.value.has(section.id)) {

      event.preventDefault();
      openSections.value.delete(section.id);
    } else {

      openSections.value.clear();
      openSections.value.add(section.id);
    }
  } else {





  }
};


const isSectionActive = (section) => {
  if (props.currentSectionId === section.id) return true;
  return section.subs && section.subs.some(sub => sub.id === props.currentSectionId);
};


watch(() => props.activeId, (newId) => {
  if (!newId) return;


  const parent = props.sections.find(s =>
    s.id === newId || (s.subs && s.subs.some(sub => sub.id === newId))
  );

  if (parent) {

    if (openSections.value.size !== 1 || !openSections.value.has(parent.id)) {
      openSections.value.clear();
      openSections.value.add(parent.id);
    }
  }
}, { immediate: true });

onMounted(() => {

  if (props.currentSectionId) {
    const parent = props.sections.find(s =>
      s.id === props.currentSectionId || (s.subs && s.subs.some(sub => sub.id === props.currentSectionId))
    );
    if (parent) openSections.value.add(parent.id);
  }
});
</script>