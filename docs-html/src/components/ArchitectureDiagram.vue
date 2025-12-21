<template>
  <div class="py-8 overflow-x-auto">
    <div class="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4 min-w-[600px]">
      
      <!-- Controller Layer -->
      <div class="flex flex-col items-center group">
        <div class="w-48 p-4 bg-white border-2 border-blue-500 rounded-lg shadow-lg relative z-10 transition-transform group-hover:-translate-y-1">
          <div class="text-xs text-blue-500 font-bold uppercase mb-1">Layer 1</div>
          <h4 class="font-bold text-slate-800">Controller</h4>
          <p class="text-xs text-slate-500 mt-1">extends AbController</p>
          <div class="mt-2 text-[10px] bg-blue-50 p-1 rounded text-blue-700">
            <div>GET /api/products</div>
            <div>POST /api/products</div>
          </div>
        </div>
      </div>

      <!-- Arrow -->
      <div class="hidden md:block text-slate-300">
        <i class="fas fa-arrow-right text-xl"></i>
      </div>
      <div class="md:hidden text-slate-300">
        <i class="fas fa-arrow-down text-xl"></i>
      </div>

      <!-- Service Layer -->
      <div class="flex flex-col items-center group">
        <div class="w-48 p-4 bg-white border-2 border-purple-500 rounded-lg shadow-lg relative z-10 transition-transform group-hover:-translate-y-1">
          <div class="text-xs text-purple-500 font-bold uppercase mb-1">Layer 2</div>
          <h4 class="font-bold text-slate-800">Service</h4>
          <p class="text-xs text-slate-500 mt-1">extends AbService</p>
          <div class="mt-2 text-[10px] bg-purple-50 p-1 rounded text-purple-700">
            <div>Business Logic</div>
            <div>Transaction</div>
          </div>
        </div>
      </div>

      <!-- Arrow -->
      <div class="hidden md:block text-slate-300">
        <i class="fas fa-arrow-right text-xl"></i>
      </div>
      <div class="md:hidden text-slate-300">
        <i class="fas fa-arrow-down text-xl"></i>
      </div>

      <!-- Repository Layer -->
      <div class="flex flex-col items-center group">
        <div class="w-48 p-4 bg-white border-2 border-green-500 rounded-lg shadow-lg relative z-10 transition-transform group-hover:-translate-y-1">
          <div class="text-xs text-green-500 font-bold uppercase mb-1">Layer 3</div>
          <h4 class="font-bold text-slate-800">Repository</h4>
          <p class="text-xs text-slate-500 mt-1">extends JpaRepository</p>
          <div class="mt-2 text-[10px] bg-green-50 p-1 rounded text-green-700">
            <div>Database Query</div>
            <div>Specification</div>
          </div>
        </div>
      </div>

    </div>
    
    <!-- Legend / Note -->
    <div class="mt-8 text-center text-sm text-slate-500">
      <p>Data flows from <span class="text-blue-600 font-medium">Controller</span> to <span class="text-purple-600 font-medium">Service</span> to <span class="text-green-600 font-medium">Repository</span> clearly.</p>
    </div>
  </div>
</template>
