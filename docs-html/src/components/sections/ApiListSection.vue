<template>
  <section id="abservice-methods" class="scroll-mt-20 mb-16">
    <h2 class="text-3xl font-bold text-slate-900 border-b pb-4 mb-8">5. Danh sách hàm API (AbService)</h2>
    <p class="text-slate-600 mb-6">
      Dưới đây là danh sách đầy đủ các phương thức có sẵn trong <code>AbService</code> mà bạn có thể sử dụng ngay lập tức mà không cần viết thêm code.
    </p>

    <!-- 4.1 Read Single -->
    <article id="api-read-single" class="mb-10 scroll-mt-24">
      <h3 class="text-xl font-bold text-slate-800 mb-4 flex items-center">
        <span class="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm mr-3">5.1</span>
        Truy vấn đơn (Read Single)
      </h3>
      <div class="overflow-x-auto rounded-lg border border-slate-200 shadow-sm">
        <table class="w-full text-sm text-left text-slate-600 api-table">
          <thead class="text-xs text-slate-700 uppercase bg-slate-50 border-b border-slate-200">
            <tr>
              <th class="px-6 py-3 w-1/2">Method Signature</th>
              <th class="px-6 py-3 w-1/2">Mô tả & Return</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr class="bg-white hover:bg-slate-50 transition-colors">
              <td class="px-6 py-4 font-mono font-medium text-slate-900">findById(ID id)</td>
              <td class="px-6 py-4">
                <span class="bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded border border-gray-200">Entity</span>
                Lấy Entity gốc. Ném lỗi <code>HttpException</code> (400) nếu không tìm thấy.
              </td>
            </tr>
            <tr class="bg-white hover:bg-slate-50 transition-colors">
              <td class="px-6 py-4 font-mono font-medium text-slate-900">findById(ID id, Class&lt;S&gt; dtoClass)</td>
              <td class="px-6 py-4">
                <span class="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded border border-blue-200">DTO</span>
                Tìm kiếm và tự động chuyển đổi sang DTO bằng Reflection.
              </td>
            </tr>
            <tr class="bg-white hover:bg-slate-50 transition-colors">
              <td class="px-6 py-4 font-mono font-medium text-slate-900">findById(ID id, Class&lt;S&gt; dtoClass, String lang)</td>
              <td class="px-6 py-4">
                <span class="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded border border-blue-200">DTO</span>
                Lấy DTO có hỗ trợ đa ngôn ngữ (gọi hàm <code>fromEntity(e, lang)</code>).
              </td>
            </tr>
            <tr class="bg-white hover:bg-slate-50 transition-colors">
              <td class="px-6 py-4 font-mono font-medium text-slate-900">findById(ID id, Class&lt;S&gt; dtoClass, Specification&lt;E&gt; spec)</td>
              <td class="px-6 py-4">
                <span class="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded border border-blue-200">DTO</span>
                Tìm theo ID NHƯNG phải thỏa mãn điều kiện Spec bổ sung (VD: check quyền sở hữu).
              </td>
            </tr>
            <tr class="bg-white hover:bg-slate-50 transition-colors">
              <td class="px-6 py-4 font-mono font-medium text-slate-900">findById(ID id, Class&lt;S&gt; dtoClass, Specification&lt;E&gt; spec, String lang)</td>
              <td class="px-6 py-4">
                <span class="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded border border-blue-200">DTO</span>
                Phiên bản đầy đủ nhất: ID + Spec + Ngôn ngữ.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </article>

    <!-- 4.2 Read List -->
    <article id="api-read-list" class="mb-10 scroll-mt-24">
      <h3 class="text-xl font-bold text-slate-800 mb-4 flex items-center">
        <span class="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm mr-3">5.2</span>
        Truy vấn danh sách (Read List & Pagination)
      </h3>

      <!-- Best Practice Alert -->
      <div class="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 text-sm text-blue-800">
        <i class="fas fa-info-circle mr-2"></i>
        <strong>Khuyên dùng:</strong> Luôn ưu tiên sử dụng các hàm nhận tham số <code>Pageable</code> thay vì truyền rời rạc <code>page</code> và <code>size</code>. 
        <code>Pageable</code> của Spring Data mang lại sự linh hoạt cao, hỗ trợ sẵn việc <strong>Sắp xếp (Sorting)</strong> và dễ dàng mở rộng sau này.
      </div>

      <div class="overflow-x-auto rounded-lg border border-slate-200 shadow-sm">
        <table class="w-full text-sm text-left text-slate-600 api-table">
          <thead class="text-xs text-slate-700 uppercase bg-slate-50 border-b border-slate-200">
            <tr>
              <th class="px-6 py-3 w-1/2">Method Signature</th>
              <th class="px-6 py-3 w-1/2">Mô tả & Return</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <!-- Pageable Object (RECOMMENDED) -->
            <tr class="bg-blue-50/50 hover:bg-blue-50 transition-colors border-l-4 border-blue-500">
              <td class="px-6 py-4 font-mono font-medium text-slate-900">findAll(Pageable p, Spec spec, Class dto)</td>
              <td class="px-6 py-4">
                <span class="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded border border-green-200">Page&lt;DTO&gt;</span>
                <strong class="text-blue-600 block mb-1">★ KHUYÊN DÙNG</strong>
                Hỗ trợ đầy đủ: Phân trang + Sắp xếp (Sort) + Lọc (Spec) + DTO. Ngay cả khi chỉ cần phân trang cơ bản, hãy dùng hàm này với <code>Spec.where(null)</code>.
              </td>
            </tr>
            <tr class="bg-white hover:bg-slate-50 transition-colors">
              <td class="px-6 py-4 font-mono font-medium text-slate-900">findAll(Pageable p, Spec spec)</td>
              <td class="px-6 py-4">
                <span class="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded border border-green-200">Page&lt;Entity&gt;</span>
                Dùng đối tượng Pageable của Spring (hỗ trợ sort).
              </td>
            </tr>

            <!-- Pagination + Spec (Legacy) -->
            <tr class="bg-white hover:bg-slate-50 transition-colors opacity-75">
              <td class="px-6 py-4 font-mono font-medium text-slate-900">findAll(int p, int s, Spec spec, Class dto)</td>
              <td class="px-6 py-4">
                <span class="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded border border-green-200">Page&lt;DTO&gt;</span>
                Lọc + Phân trang (Không hỗ trợ Sort).
              </td>
            </tr>
            <tr class="bg-white hover:bg-slate-50 transition-colors opacity-75">
              <td class="px-6 py-4 font-mono font-medium text-slate-900">findAll(int p, int s, Spec spec, Class dto, String lang)</td>
              <td class="px-6 py-4">
                <span class="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded border border-green-200">Page&lt;DTO&gt;</span>
                Lọc + Phân trang + Đa ngôn ngữ (Không hỗ trợ Sort).
              </td>
            </tr>

            <!-- Pagination Simple (Legacy) -->
            <tr class="bg-white hover:bg-slate-50 transition-colors opacity-75">
              <td class="px-6 py-4 font-mono font-medium text-slate-900">findAll(int page, int size)</td>
              <td class="px-6 py-4">
                <span class="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded border border-green-200">Page&lt;Entity&gt;</span>
                Phân trang cơ bản (Không hỗ trợ Sort).
              </td>
            </tr>
            <tr class="bg-white hover:bg-slate-50 transition-colors opacity-75">
              <td class="px-6 py-4 font-mono font-medium text-slate-900">findAll(int page, int size, Class&lt;S&gt; dtoClass)</td>
              <td class="px-6 py-4">
                <span class="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded border border-green-200">Page&lt;DTO&gt;</span>
                Phân trang cơ bản và trả về DTO (Không hỗ trợ Sort).
              </td>
            </tr>

            <!-- Basic List -->
            <tr class="bg-white hover:bg-slate-50 transition-colors">
              <td class="px-6 py-4 font-mono font-medium text-slate-900">findAll()</td>
              <td class="px-6 py-4">
                <span class="bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded border border-gray-200">List&lt;Entity&gt;</span>
                Lấy toàn bộ danh sách Entity (Cẩn thận với bảng lớn).
              </td>
            </tr>
            <tr class="bg-white hover:bg-slate-50 transition-colors">
              <td class="px-6 py-4 font-mono font-medium text-slate-900">findAll(Class&lt;S&gt; dtoClass)</td>
              <td class="px-6 py-4">
                <span class="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded border border-blue-200">List&lt;DTO&gt;</span>
                Lấy toàn bộ và convert sang DTO.
              </td>
            </tr>
            <tr class="bg-white hover:bg-slate-50 transition-colors">
              <td class="px-6 py-4 font-mono font-medium text-slate-900">findAllById(Collection&lt;ID&gt; ids)</td>
              <td class="px-6 py-4">
                <span class="bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded border border-gray-200">List&lt;Entity&gt;</span>
                Tìm theo danh sách ID (WHERE id IN ...).
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </article>

    <!-- 4.3 Write -->
    <article id="api-write" class="mb-10 scroll-mt-24">
      <h3 class="text-xl font-bold text-slate-800 mb-4 flex items-center">
        <span class="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm mr-3">5.3</span>
        Ghi dữ liệu (Create / Update / Delete)
      </h3>
      <div class="overflow-x-auto rounded-lg border border-slate-200 shadow-sm">
        <table class="w-full text-sm text-left text-slate-600 api-table">
          <thead class="text-xs text-slate-700 uppercase bg-slate-50 border-b border-slate-200">
            <tr>
              <th class="px-6 py-3 w-1/2">Method Signature</th>
              <th class="px-6 py-3 w-1/2">Mô tả & Return</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <!-- CREATE -->
            <tr class="bg-white hover:bg-slate-50 transition-colors">
              <td class="px-6 py-4 font-mono font-medium text-slate-900">create(Class&lt;S&gt; dtoClass, E entity)</td>
              <td class="px-6 py-4">
                <span class="bg-purple-100 text-purple-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded border border-purple-200">DTO</span>
                Lưu Entity và trả về DTO kết quả.
              </td>
            </tr>
            <tr class="bg-white hover:bg-slate-50 transition-colors">
              <td class="px-6 py-4 font-mono font-medium text-slate-900">create(Class&lt;S&gt; dtoClass, T dto)</td>
              <td class="px-6 py-4">
                <span class="bg-purple-100 text-purple-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded border border-purple-200">DTO</span>
                Nhận DTO đầu vào, lưu và trả về DTO kết quả.
              </td>
            </tr>
            <tr class="bg-white hover:bg-slate-50 transition-colors">
              <td class="px-6 py-4 font-mono font-medium text-slate-900">create(S newEntity)</td>
              <td class="px-6 py-4">
                <span class="bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded border border-gray-200">Entity</span>
                Tạo mới từ DTO và trả về Entity đã lưu.
              </td>
            </tr>
            <tr class="bg-white hover:bg-slate-50 transition-colors">
              <td class="px-6 py-4 font-mono font-medium text-slate-900">create(E newEntity)</td>
              <td class="px-6 py-4">
                <span class="bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded border border-gray-200">Entity</span>
                Lưu Entity mới và trả về chính nó.
              </td>
            </tr>

            <!-- SAVE -->
             <tr class="bg-white hover:bg-slate-50 transition-colors">
              <td class="px-6 py-4 font-mono font-medium text-slate-900">save(E entity)</td>
              <td class="px-6 py-4">
                <span class="bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded border border-gray-200">Entity</span>
                Lưu (Insert/Update) và trả về Entity.
              </td>
            </tr>
            <tr class="bg-white hover:bg-slate-50 transition-colors">
              <td class="px-6 py-4 font-mono font-medium text-slate-900">save(Class&lt;S&gt; dtoClass, E entity)</td>
              <td class="px-6 py-4">
                <span class="bg-purple-100 text-purple-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded border border-purple-200">DTO</span>
                Lưu Entity và trả về DTO.
              </td>
            </tr>
            <tr class="bg-white hover:bg-slate-50 transition-colors">
              <td class="px-6 py-4 font-mono font-medium text-slate-900">save(Class&lt;S&gt; dtoClass, T dto)</td>
              <td class="px-6 py-4">
                <span class="bg-purple-100 text-purple-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded border border-purple-200">DTO</span>
                Lưu DTO và trả về DTO kết quả.
              </td>
            </tr>

            <!-- UPDATE -->
            <tr class="bg-slate-50/50">
              <td class="px-6 py-4 font-mono font-medium text-slate-900 text-xs italic" colspan="2">Cập nhật theo ID (Check existence)</td>
            </tr>
            <tr class="bg-white hover:bg-slate-50 transition-colors">
              <td class="px-6 py-4 font-mono font-medium text-slate-900">update(S updateEntity, ID id)</td>
              <td class="px-6 py-4">
                <span class="bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded border border-gray-200">Entity</span>
                Update từ DTO vào Entity hiện có (tìm theo ID) và trả về Entity.
              </td>
            </tr>
             <tr class="bg-white hover:bg-slate-50 transition-colors">
              <td class="px-6 py-4 font-mono font-medium text-slate-900">update(E updateEntity, ID id)</td>
              <td class="px-6 py-4">
                <span class="bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded border border-gray-200">Entity</span>
                Kiểm tra tồn tại và update Entity.
              </td>
            </tr>
            <tr class="bg-slate-50/50">
              <td class="px-6 py-4 font-mono font-medium text-slate-900 text-xs italic" colspan="2">Cập nhật trực tiếp</td>
            </tr>
            <tr class="bg-white hover:bg-slate-50 transition-colors">
              <td class="px-6 py-4 font-mono font-medium text-slate-900">update(E entity)</td>
              <td class="px-6 py-4">
                <span class="bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded border border-gray-200">Entity</span>
                Lưu thay đổi của Entity.
              </td>
            </tr>
            <tr class="bg-white hover:bg-slate-50 transition-colors">
              <td class="px-6 py-4 font-mono font-medium text-slate-900">update(Class&lt;S&gt; dtoClass, E entity)</td>
              <td class="px-6 py-4">
                <span class="bg-purple-100 text-purple-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded border border-purple-200">DTO</span>
                Update Entity và trả về DTO.
              </td>
            </tr>
            <tr class="bg-white hover:bg-slate-50 transition-colors">
              <td class="px-6 py-4 font-mono font-medium text-slate-900">update(Class&lt;S&gt; dtoClass, T dto)</td>
              <td class="px-6 py-4">
                <span class="bg-purple-100 text-purple-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded border border-purple-200">DTO</span>
                Update DTO và trả về DTO kết quả.
              </td>
            </tr>

            <!-- DELETE -->
            <tr class="bg-white hover:bg-slate-50 transition-colors">
              <td class="px-6 py-4 font-mono font-medium text-slate-900">delete(ID id)</td>
              <td class="px-6 py-4">
                <span class="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded border border-red-200">Void</span>
                Xóa theo ID (có kiểm tra tồn tại).
              </td>
            </tr>
            <tr class="bg-white hover:bg-slate-50 transition-colors">
              <td class="px-6 py-4 font-mono font-medium text-slate-900">delete(Class&lt;S&gt; dtoClass, E entity)</td>
              <td class="px-6 py-4">
                <span class="bg-purple-100 text-purple-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded border border-purple-200">DTO</span>
                Xóa Entity và trả về DTO của nó.
              </td>
            </tr>
            <tr class="bg-white hover:bg-slate-50 transition-colors">
              <td class="px-6 py-4 font-mono font-medium text-slate-900">delete(Class&lt;S&gt; dtoClass, T dto)</td>
              <td class="px-6 py-4">
                <span class="bg-purple-100 text-purple-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded border border-purple-200">DTO</span>
                Xóa theo DTO và trả về DTO kết quả.
              </td>
            </tr>
            <tr class="bg-white hover:bg-slate-50 transition-colors">
              <td class="px-6 py-4 font-mono font-medium text-slate-900">delete(S dto, ID id)</td>
              <td class="px-6 py-4">
                <span class="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded border border-red-200">Void</span>
                Xóa theo ID (truyền DTO để logic).
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </article>
  </section>
</template>