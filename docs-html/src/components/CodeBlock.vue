<template>
  <div class="code-block group">
    <div class="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
      <button @click="copyCode" class="bg-gray-700 text-white text-xs px-2 py-1 rounded hover:bg-gray-600">
        <i class="fas" :class="copied ? 'fa-check text-green-400' : 'fa-copy'"></i>
        {{ copied ? ' Copied!' : ' Copy' }}
      </button>
    </div>
    <!-- Filename header if provided -->
    <div v-if="filename" class="text-xs text-gray-400 mb-2 border-b border-gray-700 pb-1 font-mono">
      {{ filename }}
    </div>
    <pre><code ref="codeElement" :class="`language-${language}`">{{ code }}</code></pre>
  </div>
</template>

<script setup>
import { ref, onMounted, onUpdated } from 'vue';

const props = defineProps({
  code: String,
  language: { type: String, default: 'java' },
  filename: String
});

const codeElement = ref(null);
const copied = ref(false);

const copyCode = () => {
  navigator.clipboard.writeText(props.code.trim()).then(() => {
    copied.value = true;
    setTimeout(() => copied.value = false, 2000);
  });
};

const highlight = () => {
  if (codeElement.value && window.hljs) {
    delete codeElement.value.dataset.highlighted;
    window.hljs.highlightElement(codeElement.value);
  }
};

onMounted(highlight);
onUpdated(highlight);
</script>