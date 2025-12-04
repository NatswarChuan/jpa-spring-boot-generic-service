<template>
  <main class="flex-1 min-w-0 bg-white">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-24">
      <slot></slot>
    </div>

    <!-- Bottom Navigation -->
    <div class="fixed bottom-0 right-0 bg-white/90 backdrop-blur border-t border-slate-200 p-4 transition-all duration-300 z-30" 
         :style="{ left: isMobile ? '0' : '18rem' }">
      <div class="flex justify-between items-center max-w-5xl mx-auto">
        <button 
          v-if="!isFirstSection" 
          @click="$emit('prev')"
          class="flex items-center px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 hover:text-blue-600"
        >
          <i class="fas fa-arrow-left mr-2"></i>
          {{ previousSectionTitle }}
        </button>
        <div v-else></div> <!-- Spacer -->

        <button 
          v-if="!isLastSection" 
          @click="$emit('next')"
          class="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          {{ nextSectionTitle }}
          <i class="fas fa-arrow-right ml-2"></i>
        </button>
      </div>
    </div>
  </main>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue';

const props = defineProps({
  isFirstSection: Boolean,
  isLastSection: Boolean,
  previousSectionTitle: String,
  nextSectionTitle: String
});

defineEmits(['next', 'prev']);

const isMobile = ref(false);
const checkMobile = () => isMobile.value = window.innerWidth < 768;

onMounted(() => {
  checkMobile();
  window.addEventListener('resize', checkMobile);
});

onUnmounted(() => window.removeEventListener('resize', checkMobile));
</script>