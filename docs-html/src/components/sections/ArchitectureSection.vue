<template>
  <section id="architecture-system" class="scroll-mt-20 mb-16">
    <h2 class="text-3xl font-bold text-slate-900 border-b pb-4 mb-8">6. Architecture & Life-cycle</h2>
    <p class="text-slate-600 italic mb-6">Đặc tả kỹ thuật của framework và luồng xử lý request.</p>

    <article id="framework-spec" class="mb-10 scroll-mt-24">
      <h3 class="text-xl font-bold text-slate-800 mb-3">6.1. Class Hierarchy (Service)</h3>
      <p class="text-slate-600 mb-6">
        Thiết kế theo mô hình phân tầng, phân chia rạch ròi trách nhiệm giữa các loại thao tác (Read, Create, Update, Delete).
      </p>
      
      <div class="mb-6 bg-white border border-slate-200 rounded-lg p-6 shadow-sm overflow-x-auto">
        <div class="space-y-2 font-mono text-sm leading-relaxed">
          <div class="flex items-center">
            <span class="bg-slate-500 text-white px-3 py-0.5 rounded shadow-sm">AbBaseService</span>
            <span class="mx-3 text-slate-400">→ Chứa Utils (Mapping, Logging)</span>
          </div>
          <div class="ml-8 border-l-2 border-slate-200 pl-4 space-y-2">
            <div class="flex items-center">
              <span class="bg-amber-500 text-white px-3 py-0.5 rounded shadow-sm">AbReadSummaryService</span>
              <span class="mx-3 text-slate-400">→ Xử lý FindAll / Paging</span>
            </div>
            <div class="ml-8 border-l-2 border-slate-200 pl-4 space-y-2">
              <div class="flex items-center">
                <span class="bg-orange-500 text-white px-3 py-0.5 rounded shadow-sm">AbReadDetailService</span>
                <span class="mx-3 text-slate-400">→ Xử lý FindOne / ById</span>
              </div>
              <div class="ml-8 border-l-2 border-slate-200 pl-4 space-y-2">
                <div class="flex items-center">
                  <span class="bg-pink-500 text-white px-3 py-0.5 rounded shadow-sm">AbCreateService</span>
                  <span class="mx-3 text-slate-400">→ Xử lý Create</span>
                </div>
                <div class="ml-8 border-l-2 border-slate-200 pl-4 space-y-2">
                  <div class="flex items-center">
                    <span class="bg-purple-500 text-white px-3 py-0.5 rounded shadow-sm">AbUpdateService</span>
                    <span class="mx-3 text-slate-400">→ Xử lý Update / Save</span>
                  </div>
                  <div class="ml-8 border-l-2 border-slate-200 pl-4 space-y-2">
                    <div class="flex items-center">
                      <span class="bg-indigo-500 text-white px-3 py-0.5 rounded shadow-sm">AbDeleteService</span>
                      <span class="mx-3 text-slate-400">→ Xử lý Delete</span>
                    </div>
                    <div class="ml-8 border-l-2 border-slate-200 pl-4">
                      <div class="flex items-center">
                        <span class="bg-blue-600 text-white px-3 py-0.5 rounded shadow-sm">AbService</span>
                        <span class="mx-3 text-slate-400 font-bold">→ FULL CRUD + Specification</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>

    <article id="generic-system" class="mb-10 scroll-mt-24">
      <h3 class="text-xl font-bold text-slate-800 mb-3">6.2. Generic Type System</h3>
      <p class="text-slate-600 mb-4">Type safety giúp kiểm soát chặt chẽ dữ liệu từ Controller xuống Service.</p>
      
      <div class="overflow-x-auto rounded-lg border border-slate-200">
        <table class="w-full text-left text-sm border-collapse">
          <thead>
            <tr class="bg-slate-50 text-slate-600 italic">
              <th class="p-3 border-b">Type</th>
              <th class="p-3 border-b">Description</th>
            </tr>
          </thead>
          <tbody class="text-slate-700">
            <tr>
              <td class="p-3 border-b font-mono font-bold text-blue-600">E</td>
              <td class="p-3 border-b"><strong>Entity Class:</strong> Thực thể JPA (VD: Product).</td>
            </tr>
            <tr>
              <td class="p-3 border-b font-mono font-bold text-blue-600">ID</td>
              <td class="p-3 border-b"><strong>PK Type:</strong> Kiểu khóa chính (VD: Long, UUID).</td>
            </tr>
            <tr>
              <td class="p-3 border-b font-mono font-bold text-blue-600">RQ</td>
              <td class="p-3 border-b"><strong>Request DTO:</strong> DTO đầu vào (VD: ProductCreateReq).</td>
            </tr>
          </tbody>
        </table>
      </div>
    </article>

    <article id="request-lifecycle" class="mb-10 scroll-mt-24">
      <h3 class="text-xl font-bold text-slate-800 mb-3">6.3. Request Life-cycle</h3>
      <p class="text-slate-600 mb-6">Luồng đi của dữ liệu khi gọi API <code>POST /api/v1/products</code>:</p>
      
      <div class="relative pl-8 border-l-2 border-blue-500 space-y-8 ml-4">
        <div v-for="(step, index) in lifecycleSteps" :key="index" class="relative">
          <div class="absolute -left-[41px] top-1.5 w-4 h-4 rounded-full bg-blue-500 border-4 border-white shadow-sm"></div>
          <h4 class="font-bold text-slate-800 text-sm uppercase tracking-wider mb-1">{{ index + 1 }}. {{ step.title }}</h4>
          <p class="text-sm text-slate-500">{{ step.desc }}</p>
        </div>
      </div>
    </article>
  </section>
</template>

<script setup>
const lifecycleSteps = [
  { title: 'DTO Validation', desc: 'Hibernate Validator kiểm tra các annotation (@NotBlank, @Exists...) trên ProductCreateReq.' },
  { title: 'Payload Mapping', desc: 'Controller gọi service.create(dto.toEntity()) để chuyển đổi DTO sang Entity.' },
  { title: 'Before-Hook', desc: 'Hook beforeCreate(entity) được thực thi để xử lý nghiệp vụ tiền lưu trữ.' },
  { title: 'Persistence', desc: 'Repository lưu entity vào cơ sở dữ liệu qua Hibernate.' },
  { title: 'After-Hook', desc: 'Hook afterCreate(entity) được kích hoạt (ví dụ: gửi mail, log logging).' },
  { title: 'Final Mapping', desc: 'Kết quả được map sang Response DTO và trả về cho Client.' }
];
</script>
