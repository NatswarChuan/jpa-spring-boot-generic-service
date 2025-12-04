<template>
  <section id="notes" class="scroll-mt-20 mb-16">
    <h2 class="text-3xl font-bold text-red-600 border-b border-red-200 pb-4 mb-8">6. Lưu ý quan trọng</h2>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="bg-red-50 p-6 rounded-lg border-l-4 border-red-500 shadow-sm">
        <h4 class="text-lg font-bold text-red-800 mb-2">
          <i class="fas fa-exclamation-triangle mr-2"></i>DTO Constructor
        </h4>
        <p class="text-sm text-red-700">
          Tất cả DTO (đặc biệt là Response DTO) bắt buộc phải có <strong>Public No-Args Constructor</strong> để Reflection hoạt động.
        </p>
      </div>

      <div class="bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-500 shadow-sm">
        <h4 class="text-lg font-bold text-yellow-800 mb-2">
          <i class="fas fa-code-branch mr-2"></i>Override Method
        </h4>
        <ul class="text-sm text-yellow-800 list-disc list-inside">
          <li><strong>CreateReq:</strong> override <code>toEntity()</code></li>
          <li><strong>UpdateReq:</strong> override <code>updateEntity()</code></li>
          <li><strong>Response:</strong> override <code>fromEntity()</code></li>
        </ul>
      </div>
    </div>
  </section>
</template>