<template>
  <div class="py-12 overflow-x-auto bg-slate-50 border border-slate-200 rounded-xl my-6">
    <div class="flex flex-col xl:flex-row items-center justify-center space-y-8 xl:space-y-0 xl:space-x-4 min-w-[900px] px-4">
      
      <!-- CLIENT -->
      <div class="flex flex-col items-center">
        <div class="w-32 h-32 rounded-full bg-slate-200 border-4 border-slate-300 flex items-center justify-center shadow-lg relative z-10">
          <div class="text-center">
             <i class="fas fa-user-circle text-4xl text-slate-500 mb-2"></i>
             <div class="font-bold text-slate-700">Client</div>
          </div>
        </div>
      </div>

      <!-- Arrow -->
      <div class="flex-1 flex flex-col items-center justify-center px-2">
         <div class="text-[10px] font-mono text-slate-500 mb-1">HTTP Request</div>
         <i class="fas fa-arrow-right text-slate-400 text-xl hidden xl:block"></i>
         <i class="fas fa-arrow-down text-slate-400 text-xl xl:hidden"></i>
         <div class="text-[10px] font-mono text-blue-600 font-bold mt-1">JSON Body</div>
      </div>

      <!-- Controller Layer -->
      <a href="#controller-layer" class="flex flex-col items-center group cursor-pointer hover:no-underline transform transition hover:scale-105">
        <div class="w-64 p-5 bg-white border-l-4 border-blue-500 rounded-lg shadow-lg relative z-10">
          <div class="absolute -top-3 -right-3 bg-blue-500 text-white text-[10px] font-bold px-2 py-1 rounded shadow">
            @RestController
          </div>
          <div class="text-xs text-blue-500 font-bold uppercase mb-2 flex justify-between items-center">
             Generic Controller
          </div>
          <h4 class="font-bold text-lg text-slate-800 mb-1">AbController</h4>
          <div class="font-mono text-[10px] text-slate-500 bg-slate-100 p-1 rounded mb-2">
            &lt;Product, Long, CreateReq...&gt;
          </div>
          <ul class="text-xs text-slate-600 space-y-1">
             <li><i class="fas fa-check text-green-500 mr-1"></i> Handle HTTP</li>
             <li><i class="fas fa-check text-green-500 mr-1"></i> Data Validation</li>
          </ul>
        </div>
      </a>

      <!-- Arrow -->
      <div class="flex-1 flex flex-col items-center justify-center px-2">
         <div class="text-[10px] font-mono text-slate-500 mb-1">Call Service</div>
         <i class="fas fa-arrow-right text-slate-400 text-xl hidden xl:block"></i>
         <i class="fas fa-arrow-down text-slate-400 text-xl xl:hidden"></i>
         <div class="text-[10px] font-mono text-purple-600 font-bold mt-1">Req DTO</div>
      </div>

      <!-- Service Layer -->
      <a href="#service-layer" class="flex flex-col items-center group cursor-pointer hover:no-underline transform transition hover:scale-105">
        <div class="w-64 p-5 bg-white border-l-4 border-purple-500 rounded-lg shadow-lg relative z-10">
          <div class="absolute -top-3 -right-3 bg-purple-500 text-white text-[10px] font-bold px-2 py-1 rounded shadow">
            @Service
          </div>
          <div class="text-xs text-purple-500 font-bold uppercase mb-2 flex justify-between items-center">
            Generic Service
          </div>
          <h4 class="font-bold text-lg text-slate-800 mb-1">AbService</h4>
          <div class="font-mono text-[10px] text-slate-500 bg-slate-100 p-1 rounded mb-2">
            &lt;Product, Long, ...&gt;
          </div>
           <ul class="text-xs text-slate-600 space-y-1">
             <li><i class="fas fa-check text-green-500 mr-1"></i> Business Logic</li>
             <li><i class="fas fa-check text-green-500 mr-1"></i> DTO &harr; Entity</li>
             <li><i class="fas fa-check text-green-500 mr-1"></i> Hooks System</li>
          </ul>
        </div>
      </a>

      <!-- Arrow -->
      <div class="flex-1 flex flex-col items-center justify-center px-2">
         <div class="text-[10px] font-mono text-slate-500 mb-1">JPA Methods</div>
         <i class="fas fa-arrow-right text-slate-400 text-xl hidden xl:block"></i>
         <i class="fas fa-arrow-down text-slate-400 text-xl xl:hidden"></i>
         <div class="text-[10px] font-mono text-green-600 font-bold mt-1">Entity (E)</div>
      </div>

      <!-- Repository Layer -->
      <a href="#core-entity-repo" class="flex flex-col items-center group cursor-pointer hover:no-underline transform transition hover:scale-105">
        <div class="w-64 p-5 bg-white border-l-4 border-green-500 rounded-lg shadow-lg relative z-10">
           <div class="absolute -top-3 -right-3 bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded shadow">
            @Repository
          </div>
          <div class="text-xs text-green-500 font-bold uppercase mb-2 flex justify-between items-center">
            JPA Repository
          </div>
          <h4 class="font-bold text-lg text-slate-800 mb-1">JpaRepository</h4>
          <div class="font-mono text-[10px] text-slate-500 bg-slate-100 p-1 rounded mb-2">
            &lt;Product, Long&gt;
          </div>
          <ul class="text-xs text-slate-600 space-y-1">
             <li><i class="fas fa-check text-green-500 mr-1"></i> Database Query</li>
             <li><i class="fas fa-check text-green-500 mr-1"></i> Dynamic Specification</li>
          </ul>
        </div>
      </a>

       <!-- Arrow -->
      <div class="flex-1 flex flex-col items-center justify-center px-2">
         <div class="text-[10px] font-mono text-slate-500 mb-1">JDBC</div>
         <i class="fas fa-arrow-right text-slate-400 text-xl hidden xl:block"></i>
         <i class="fas fa-arrow-down text-slate-400 text-xl xl:hidden"></i>
         <div class="text-[10px] font-mono text-slate-600 font-bold mt-1">SQL</div>
      </div>

       <!-- DB -->
      <div class="flex flex-col items-center">
        <div class="w-24 h-32 bg-slate-300 border-4 border-slate-400 rounded-lg flex flex-col items-center justify-center shadow-inner relative">
           <!-- Cylinder effect -->
           <div class="absolute top-0 w-full h-6 bg-slate-400 rounded-full -mt-3"></div>
           
           <i class="fas fa-database text-4xl text-slate-600 mb-2 mt-4"></i>
           <div class="font-bold text-slate-700 text-xs">Database</div>
        </div>
      </div>

    </div>
    
  </div>
</template>
