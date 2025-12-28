<template>
  <section id="api-list" class="scroll-mt-20 mb-16">
    <h2 class="text-3xl font-bold text-slate-900 border-b pb-4 mb-8">{{ $t('api_list.title') }}</h2>
    <p class="text-slate-600 italic mb-6" v-html="$t('api_list.subtitle')"></p>

    <!-- Read Services -->
    <article id="api-read" class="mb-10 scroll-mt-24">
      <h3 class="text-xl font-bold text-slate-800 mb-6">
        {{ $t('api_list.read.title') }}
      </h3>

      <div class="ml-4 mb-8">
        <h4 class="text-lg font-bold text-slate-700 mb-3 flex items-center">
          {{ $t('api_list.read.detail_title') }} <span class="text-sm font-normal text-slate-500 ml-2">{{
            $t('api_list.read.detail_subtitle') }}</span>
        </h4>
        <div class="overflow-x-auto rounded-lg border border-slate-200 shadow-sm mb-6">
          <table class="w-full text-sm text-left text-slate-600 api-table">
            <thead class="text-xs text-slate-700 uppercase bg-slate-50 border-b border-slate-200">
              <tr>
                <th class="px-6 py-3 w-1/2">{{ $t('api_list.table.signature') }}</th>
                <th class="px-6 py-3 w-1/2">{{ $t('api_list.table.desc') }}</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              <tr class="bg-white hover:bg-slate-50 transition-colors">
                <td class="px-6 py-4 font-mono font-medium text-slate-900">findById(ID id)</td>
                <td class="px-6 py-4">
                  <span
                    class="bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded border border-gray-200">Entity</span>
                  <span v-html="$t('api_list.read.items.findById_entity')"></span>
                </td>
              </tr>
              <tr class="bg-white hover:bg-slate-50 transition-colors">
                <td class="px-6 py-4 font-mono font-medium text-slate-900">findById(ID id, Class&lt;S&gt; dtoClass)</td>
                <td class="px-6 py-4">
                  <span
                    class="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded border border-blue-200">DTO</span>
                  <span v-html="$t('api_list.read.items.findById_dto')"></span>
                </td>
              </tr>
              <tr class="bg-white hover:bg-slate-50 transition-colors">
                <td class="px-6 py-4 font-mono font-medium text-slate-900">findById(ID id, Class&lt;S&gt; dtoClass,
                  String language)</td>
                <td class="px-6 py-4">
                  <span
                    class="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded border border-blue-200">DTO</span>
                  <span v-html="$t('api_list.read.items.findById_dto_lang')"></span>
                </td>
              </tr>
              <tr class="bg-white hover:bg-slate-50 transition-colors">
                <td class="px-6 py-4 font-mono font-medium text-slate-900">findById(Specification&lt;E&gt; spec,
                  Class&lt;S&gt;
                  dtoClass)</td>
                <td class="px-6 py-4">
                  <span
                    class="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded border border-blue-200">DTO</span>
                  <span v-html="$t('api_list.read.items.findById_spec')"></span>
                </td>
              </tr>
              <tr class="bg-white hover:bg-slate-50 transition-colors">
                <td class="px-6 py-4 font-mono font-medium text-slate-900 line-clamp-1">findById(ID id, Class&lt;S&gt;
                  dtoClass, Specification&lt;E&gt; spec, String language)</td>
                <td class="px-6 py-4">
                  <span
                    class="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded border border-blue-200">DTO</span>
                  <span v-html="$t('api_list.read.items.findById_spec_lang')"></span>
                </td>
              </tr>
              <tr class="bg-white hover:bg-slate-50 transition-colors">
                <td class="px-6 py-4 font-mono font-medium text-slate-900">findOne(Specification&lt;E&gt; spec)</td>
                <td class="px-6 py-4">
                  <span
                    class="bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded border border-gray-200">Entity</span>
                  <span v-html="$t('api_list.read.items.findOne_entity')"></span>
                </td>
              </tr>
              <tr class="bg-white hover:bg-slate-50 transition-colors">
                <td class="px-6 py-4 font-mono font-medium text-slate-900">findOne(Class&lt;S&gt; dtoClass,
                  Specification&lt;E&gt;
                  spec)</td>
                <td class="px-6 py-4">
                  <span
                    class="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded border border-blue-200">DTO</span>
                  <span v-html="$t('api_list.read.items.findOne_dto')"></span>
                </td>
              </tr>
              <tr class="bg-white hover:bg-slate-50 transition-colors">
                <td class="px-6 py-4 font-mono font-medium text-slate-900">findOne(Class&lt;S&gt; dtoClass,
                  Specification&lt;E&gt;
                  spec, String language)</td>
                <td class="px-6 py-4">
                  <span
                    class="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded border border-blue-200">DTO</span>
                  <span v-html="$t('api_list.read.items.findOne_dto_lang')"></span>
                </td>
              </tr>
              <tr class="bg-white hover:bg-slate-50 transition-colors border-t border-slate-100">
                <td class="px-6 py-4 font-mono font-medium text-slate-900">exists(Specification&lt;E&gt; spec)</td>
                <td class="px-6 py-4">
                  <span
                    class="bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded border border-yellow-200">boolean</span>
                  <span v-html="$t('api_list.read.items.exists')"></span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="ml-4">
        <h4 class="text-lg font-bold text-slate-700 mb-3 flex items-center">
          {{ $t('api_list.read.summary_title') }} <span class="text-sm font-normal text-slate-500 ml-2">{{
            $t('api_list.read.summary_subtitle') }}</span>
        </h4>
        <div class="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 text-sm text-blue-800">
          <i class="fas fa-info-circle mr-2"></i>
          <span v-html="$t('api_list.read.summary_note')"></span>
        </div>

        <div class="overflow-x-auto rounded-lg border border-slate-200 shadow-sm">
          <table class="w-full text-sm text-left text-slate-600 api-table">
            <thead class="text-xs text-slate-700 uppercase bg-slate-50 border-b border-slate-200">
              <tr>
                <th class="px-6 py-3 w-1/2">{{ $t('api_list.table.signature') }}</th>
                <th class="px-6 py-3 w-1/2">{{ $t('api_list.table.desc') }}</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              <tr class="bg-blue-50/50 hover:bg-blue-50 transition-colors border-l-4 border-blue-500">
                <td class="px-6 py-4 font-mono font-medium text-slate-900">findAll(Pageable pageable,
                  Specification&lt;E&gt; spec,
                  Class&lt;S&gt; dtoClass)</td>
                <td class="px-6 py-4">
                  <span
                    class="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded border border-green-200">Page&lt;DTO&gt;</span>
                  <strong class="text-blue-600 block mb-1">{{ $t('api_list.read.recommend') }}</strong>
                  <span v-html="$t('api_list.read.items.findAll_page_spec_dto')"></span>
                </td>
              </tr>
              <tr class="bg-blue-50/50 hover:bg-blue-50 transition-colors border-l-4 border-blue-500">
                <td class="px-6 py-4 font-mono font-medium text-slate-900">findAll(Pageable paging,
                  Specification&lt;E&gt; spec,
                  Class&lt;S&gt; dtoClass, String languageCode)</td>
                <td class="px-6 py-4">
                  <span
                    class="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded border border-green-200">Page&lt;DTO&gt;</span>
                  <strong class="text-blue-600 block mb-1">{{ $t('api_list.read.recommend') }}</strong>
                  <span v-html="$t('api_list.read.items.findAll_page_spec_lang')"></span>
                </td>
              </tr>
              <tr class="bg-white hover:bg-slate-50 transition-colors">
                <td class="px-6 py-4 font-mono font-medium text-slate-900">findAll(Pageable pageable,
                  Specification&lt;E&gt;
                  spec)</td>
                <td class="px-6 py-4">
                  <span
                    class="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded border border-green-200">Page&lt;Entity&gt;</span>
                  <span v-html="$t('api_list.read.items.findAll_page_spec_entity')"></span>
                </td>
              </tr>
              <tr class="bg-white hover:bg-slate-50 transition-colors">
                <td class="px-6 py-4 font-mono font-medium text-slate-900">findAll()</td>
                <td class="px-6 py-4">
                  <span
                    class="bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded border border-gray-200">List&lt;Entity&gt;</span>
                  <span v-html="$t('api_list.read.items.findAll_list')"></span>
                </td>
              </tr>
              <tr class="bg-white hover:bg-slate-50 transition-colors">
                <td class="px-6 py-4 font-mono font-medium text-slate-900">findAll(Class&lt;S&gt; dtoClass)</td>
                <td class="px-6 py-4">
                  <span
                    class="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded border border-blue-200">List&lt;DTO&gt;</span>
                  <span v-html="$t('api_list.read.items.findAll_list_dto')"></span>
                </td>
              </tr>
              <tr class="bg-white hover:bg-slate-50 transition-colors">
                <td class="px-6 py-4 font-mono font-medium text-slate-900">findAll(Class&lt;S&gt; dtoClass, String
                  language)</td>
                <td class="px-6 py-4">
                  <span
                    class="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded border border-blue-200">List&lt;DTO&gt;</span>
                  <span v-html="$t('api_list.read.items.findAll_list_dto_lang')"></span>
                </td>
              </tr>
              <tr class="bg-white hover:bg-slate-50 transition-colors">
                <td class="px-6 py-4 font-mono font-medium text-slate-900">findAll(Specification&lt;E&gt; spec)</td>
                <td class="px-6 py-4">
                  <span
                    class="bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded border border-gray-200">List&lt;Entity&gt;</span>
                  <span v-html="$t('api_list.read.items.findAll_list_spec')"></span>
                </td>
              </tr>
              <tr class="bg-white hover:bg-slate-50 transition-colors">
                <td class="px-6 py-4 font-mono font-medium text-slate-900">findAll(Class&lt;S&gt; dtoClass,
                  Specification&lt;E&gt;
                  spec)</td>
                <td class="px-6 py-4">
                  <span
                    class="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded border border-blue-200">List&lt;DTO&gt;</span>
                  <span v-html="$t('api_list.read.items.findAll_list_spec_dto')"></span>
                </td>
              </tr>
              <tr class="bg-white hover:bg-slate-50 transition-colors">
                <td class="px-6 py-4 font-mono font-medium text-slate-900">findAllById(Collection&lt;ID&gt; ids)</td>
                <td class="px-6 py-4">
                  <span
                    class="bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded border border-gray-200">List&lt;Entity&gt;</span>
                  <span v-html="$t('api_list.read.items.findAllById')"></span>
                </td>
              </tr>
              <tr class="bg-white hover:bg-slate-50 transition-colors">
                <td class="px-6 py-4 font-mono font-medium text-slate-900">findAllById(Collection&lt;ID&gt; ids,
                  Class&lt;S&gt; dtoClass)</td>
                <td class="px-6 py-4">
                  <span
                    class="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded border border-blue-200">List&lt;DTO&gt;</span>
                  <span v-html="$t('api_list.read.items.findAllById_dto')"></span>
                </td>
              </tr>
              <tr class="bg-white hover:bg-slate-50 transition-colors">
                <td class="px-6 py-4 font-mono font-medium text-slate-900">findAllById(Collection&lt;ID&gt; ids,
                  Class&lt;S&gt; dtoClass, String language)</td>
                <td class="px-6 py-4">
                  <span
                    class="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded border border-blue-200">List&lt;DTO&gt;</span>
                  <span v-html="$t('api_list.read.items.findAllById_dto_lang')"></span>
                </td>
              </tr>
              <tr class="bg-white hover:bg-slate-50 transition-colors">
                <td class="px-6 py-4 font-mono font-medium text-slate-900">findAll(int page, int size)</td>
                <td class="px-6 py-4">
                  <span
                    class="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded border border-green-200">Page&lt;Entity&gt;</span>
                  <span v-html="$t('api_list.read.items.findAll_page_simple')"></span>
                </td>
              </tr>
              <tr class="bg-white hover:bg-slate-50 transition-colors">
                <td class="px-6 py-4 font-mono font-medium text-slate-900">findAll(int page, int size, Class&lt;S&gt;
                  dtoClass)</td>
                <td class="px-6 py-4">
                  <span
                    class="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded border border-green-200">Page&lt;DTO&gt;</span>
                  <span v-html="$t('api_list.read.items.findAll_page_dto')"></span>
                </td>
              </tr>
              <tr class="bg-white hover:bg-slate-50 transition-colors">
                <td class="px-6 py-4 font-mono font-medium text-slate-900">findAll(int page, int size, Class&lt;S&gt;
                  dtoClass, String language)</td>
                <td class="px-6 py-4">
                  <span
                    class="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded border border-green-200">Page&lt;DTO&gt;</span>
                  <span v-html="$t('api_list.read.items.findAll_page_dto_lang')"></span>
                </td>
              </tr>
              <tr class="bg-white hover:bg-slate-50 transition-colors">
                <td class="px-6 py-4 font-mono font-medium text-slate-900">findAll(int page, int size,
                  Specification&lt;E&gt;
                  spec, Class&lt;S&gt; dtoClass)</td>
                <td class="px-6 py-4">
                  <span
                    class="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded border border-green-200">Page&lt;DTO&gt;</span>
                  <span v-html="$t('api_list.read.items.findAll_page_spec_dto_simple')"></span>
                </td>
              </tr>
              <tr class="bg-white hover:bg-slate-50 transition-colors">
                <td class="px-6 py-4 font-mono font-medium text-slate-900">findAll(int page, int size,
                  Specification&lt;E&gt;
                  spec, Class&lt;S&gt; dtoClass, String language)</td>
                <td class="px-6 py-4">
                  <span
                    class="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded border border-green-200">Page&lt;DTO&gt;</span>
                  <span v-html="$t('api_list.read.items.findAll_page_spec_dto_lang_simple')"></span>
                </td>
              </tr>
              <tr class="bg-white hover:bg-slate-50 transition-colors">
                <td class="px-6 py-4 font-mono font-medium text-slate-900">count(Specification&lt;E&gt; spec)</td>
                <td class="px-6 py-4">
                  <span
                    class="bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded border border-yellow-200">long</span>
                  <span v-html="$t('api_list.read.items.count')"></span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </article>

    <!-- Write Services -->
    <article id="api-write" class="mb-10 scroll-mt-24">
      <h3 class="text-xl font-bold text-slate-800 mb-6">
        {{ $t('api_list.write.title') }}
      </h3>

      <div class="ml-4 mb-8">
        <h4 class="text-lg font-bold text-slate-700 mb-3 flex items-center">
          {{ $t('api_list.write.create_title') }}
        </h4>
        <div class="overflow-x-auto rounded-lg border border-slate-200 shadow-sm">
          <table class="w-full text-sm text-left text-slate-600 api-table">
            <thead class="text-xs text-slate-700 uppercase bg-slate-50 border-b border-slate-200">
              <tr>
                <th class="px-6 py-3 w-1/2">{{ $t('api_list.table.signature') }}</th>
                <th class="px-6 py-3 w-1/2">{{ $t('api_list.table.desc') }}</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              <tr class="bg-white hover:bg-slate-50 transition-colors">
                <td class="px-6 py-4 font-mono text-slate-900">create(E entity)</td>
                <td class="px-6 py-4">
                  <span
                    class="bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded border border-gray-200">Entity</span>
                  <span v-html="$t('api_list.write.items.create_entity')"></span>
                </td>
              </tr>
              <tr class="bg-white hover:bg-slate-50 transition-colors">
                <td class="px-6 py-4 font-mono text-slate-900">create(S dto)</td>
                <td class="px-6 py-4">
                  <span
                    class="bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded border border-gray-200">Entity</span>
                  <span v-html="$t('api_list.write.items.create_dto')"></span>
                </td>
              </tr>
              <tr class="bg-white hover:bg-slate-50 transition-colors font-bold">
                <td class="px-6 py-4 font-mono text-slate-900">create(Class&lt;S&gt; dtoClass, E entity)</td>
                <td class="px-6 py-4">
                  <span
                    class="bg-purple-100 text-purple-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded border border-purple-200">DTO</span>
                  <span v-html="$t('api_list.write.items.create_res')"></span>
                </td>
              </tr>
              <tr class="bg-white hover:bg-slate-50 transition-colors">
                <td class="px-6 py-4 font-mono text-slate-900">create(T dto, Class&lt;S&gt; dtoClass)</td>
                <td class="px-6 py-4">
                  <span
                    class="bg-purple-100 text-purple-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded border border-purple-200">DTO</span>
                  <span v-html="$t('api_list.write.items.create_dto_res')"></span>
                </td>
              </tr>
              <tr class="bg-white hover:bg-slate-50 transition-colors font-bold">
                <td class="px-6 py-4 font-mono text-slate-900">create(Class&lt;S&gt; dtoClass, T dto)</td>
                <td class="px-6 py-4">
                  <span
                    class="bg-purple-100 text-purple-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded border border-purple-200">DTO</span>
                  <span v-html="$t('api_list.write.items.create_dto_dto')"></span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="ml-4 mb-8">
        <h4 class="text-lg font-bold text-slate-700 mb-3 flex items-center">
          {{ $t('api_list.write.update_title') }}
        </h4>
        <div class="overflow-x-auto rounded-lg border border-slate-200 shadow-sm">
          <table class="w-full text-sm text-left text-slate-600 api-table">
            <thead class="text-xs text-slate-700 uppercase bg-slate-50 border-b border-slate-200">
              <tr>
                <th class="px-6 py-3 w-1/2">{{ $t('api_list.table.signature') }}</th>
                <th class="px-6 py-3 w-1/2">{{ $t('api_list.table.desc') }}</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              <tr class="bg-white hover:bg-slate-50 transition-colors">
                <td class="px-6 py-4 font-mono text-slate-900">update(E entity, ID id)</td>
                <td class="px-6 py-4">
                  <span
                    class="bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded border border-gray-200">Entity</span>
                  <span v-html="$t('api_list.write.items.update_entity_id')"></span>
                </td>
              </tr>
              <tr class="bg-white hover:bg-slate-50 transition-colors">
                <td class="px-6 py-4 font-mono text-slate-900">update(E entity)</td>
                <td class="px-6 py-4">
                  <span
                    class="bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded border border-gray-200">Entity</span>
                  <span v-html="$t('api_list.write.items.update_entity')"></span>
                </td>
              </tr>
              <tr class="bg-white hover:bg-slate-50 transition-colors">
                <td class="px-6 py-4 font-mono text-slate-900">save(E entity)</td>
                <td class="px-6 py-4">
                  <span
                    class="bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded border border-gray-200">Entity</span>
                  <span v-html="$t('api_list.write.items.save_entity')"></span>
                </td>
              </tr>
              <tr class="bg-white hover:bg-slate-50 transition-colors">
                <td class="px-6 py-4 font-mono text-slate-900">update(S dto, ID id)</td>
                <td class="px-6 py-4">
                  <span
                    class="bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded border border-gray-200">Entity</span>
                  <span v-html="$t('api_list.write.items.update_dto_id')"></span>
                </td>
              </tr>
              <tr class="bg-white hover:bg-slate-50 transition-colors font-bold">
                <td class="px-6 py-4 font-mono text-slate-900">update(Class&lt;S&gt; dtoClass, E entity)</td>
                <td class="px-6 py-4">
                  <span
                    class="bg-purple-100 text-purple-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded border border-purple-200">DTO</span>
                  <span v-html="$t('api_list.write.items.update_entity_res')"></span>
                </td>
              </tr>
              <tr class="bg-white hover:bg-slate-50 transition-colors">
                <td class="px-6 py-4 font-mono text-slate-900">save(Class&lt;S&gt; dtoClass, E entity)</td>
                <td class="px-6 py-4">
                  <span
                    class="bg-purple-100 text-purple-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded border border-purple-200">DTO</span>
                  <span v-html="$t('api_list.write.items.save_entity_res')"></span>
                </td>
              </tr>
              <tr class="bg-white hover:bg-slate-50 transition-colors font-bold">
                <td class="px-6 py-4 font-mono text-slate-900">update(Class&lt;S&gt; dtoClass, T dto)</td>
                <td class="px-6 py-4">
                  <span
                    class="bg-purple-100 text-purple-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded border border-purple-200">DTO</span>
                  <span v-html="$t('api_list.write.items.update_dto_res')"></span>
                </td>
              </tr>
              <tr class="bg-white hover:bg-slate-50 transition-colors">
                <td class="px-6 py-4 font-mono text-slate-900">save(Class&lt;S&gt; dtoClass, T dto)</td>
                <td class="px-6 py-4">
                  <span
                    class="bg-purple-100 text-purple-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded border border-purple-200">DTO</span>
                  <span v-html="$t('api_list.write.items.save_dto_res')"></span>
                </td>
              </tr>
              <tr class="bg-white hover:bg-slate-50 transition-colors">
                <td class="px-6 py-4 font-mono text-slate-900">update(RQ reqDto, ID id, Class&lt;S&gt; dtoClass)</td>
                <td class="px-6 py-4">
                  <span
                    class="bg-purple-100 text-purple-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded border border-purple-200">DTO</span>
                  <span v-html="$t('api_list.write.items.update_req_res')"></span>
                </td>
              </tr>
              <tr class="bg-white hover:bg-slate-50 transition-colors font-bold">
                <td class="px-6 py-4 font-mono text-slate-900">update(E entity, ID id, Class&lt;S&gt; dtoClass)</td>
                <td class="px-6 py-4">
                  <span
                    class="bg-purple-100 text-purple-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded border border-purple-200">DTO</span>
                  <span v-html="$t('api_list.write.items.update_id_res')"></span>
                </td>
              </tr>
              <tr class="bg-white hover:bg-slate-50 transition-colors">
                <td class="px-6 py-4 font-mono text-slate-900">update(E entity, Specification&lt;E&gt; spec)</td>
                <td class="px-6 py-4">
                  <span
                    class="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded border border-blue-200">List&lt;Entity&gt;</span>
                  <span v-html="$t('api_list.write.items.update_bulk')"></span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="ml-4">
        <h4 class="text-lg font-bold text-slate-700 mb-3 flex items-center">
          {{ $t('api_list.write.delete_title') }}
        </h4>
        <div class="overflow-x-auto rounded-lg border border-slate-200 shadow-sm">
          <table class="w-full text-sm text-left text-slate-600 api-table">
            <thead class="text-xs text-slate-700 uppercase bg-slate-50 border-b border-slate-200">
              <tr>
                <th class="px-6 py-3 w-1/2">{{ $t('api_list.table.signature') }}</th>
                <th class="px-6 py-3 w-1/2">{{ $t('api_list.table.desc') }}</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              <tr class="bg-white hover:bg-slate-50 transition-colors">
                <td class="px-6 py-4 font-mono text-slate-900">deleteById(ID id)</td>
                <td class="px-6 py-4">
                  <span
                    class="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded border border-red-200">Void</span>
                  <span v-html="$t('api_list.write.items.delete_id')"></span>
                </td>
              </tr>
              <tr class="bg-white hover:bg-slate-50 transition-colors">
                <td class="px-6 py-4 font-mono text-slate-900">delete(E entity)</td>
                <td class="px-6 py-4">
                  <span
                    class="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded border border-red-200">Void</span>
                  <span v-html="$t('api_list.write.items.delete_entity')"></span>
                </td>
              </tr>
              <tr class="bg-white hover:bg-slate-50 transition-colors">
                <td class="px-6 py-4 font-mono text-slate-900">delete(Class&lt;S&gt; dtoClass, E entity)</td>
                <td class="px-6 py-4">
                  <span
                    class="bg-purple-100 text-purple-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded border border-purple-200">DTO</span>
                  <span v-html="$t('api_list.write.items.delete_res')"></span>
                </td>
              </tr>
              <tr class="bg-white hover:bg-slate-50 transition-colors">
                <td class="px-6 py-4 font-mono text-slate-900">delete(Class&lt;S&gt; dtoClass, T dto)</td>
                <td class="px-6 py-4">
                  <span
                    class="bg-purple-100 text-purple-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded border border-purple-200">DTO</span>
                  <span v-html="$t('api_list.write.items.delete_dto_res')"></span>
                </td>
              </tr>
              <tr class="bg-white hover:bg-slate-50 transition-colors">
                <td class="px-6 py-4 font-mono text-slate-900">delete(ID id, Class&lt;S&gt; dtoClass)</td>
                <td class="px-6 py-4">
                  <span
                    class="bg-purple-100 text-purple-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded border border-purple-200">DTO</span>
                  <span v-html="$t('api_list.write.items.delete_id_res')"></span>
                </td>
              </tr>
              <tr class="bg-white hover:bg-slate-50 transition-colors">
                <td class="px-6 py-4 font-mono text-slate-900">delete(Specification&lt;E&gt; spec)</td>
                <td class="px-6 py-4">
                  <span
                    class="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded border border-red-200">Void</span>
                  <span v-html="$t('api_list.write.items.delete_spec')"></span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </article>

    <article id="api-hooks" class="mb-10 scroll-mt-24">
      <h3 class="text-xl font-bold text-slate-800 mb-4 flex items-center">
        {{ $t('api_list.hooks.title') }}
      </h3>
      <p class="text-slate-600 mb-4" v-html="$t('api_list.hooks.desc')"></p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="p-4 bg-sky-50 border border-sky-100 rounded-lg col-span-1 md:col-span-2">
          <h4 class="font-bold text-sky-900 mb-2 border-b border-sky-200 pb-1">{{ $t('api_list.hooks.read.title') }}
          </h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h5 class="text-xs font-bold text-sky-700 uppercase mb-1">{{ $t('api_list.hooks.read.entity_phase') }}
              </h5>
              <ul class="text-xs font-mono space-y-1 text-sky-800">
                <li>default E <strong>afterReadEntity</strong>(E entity)</li>
                <li>default List&lt;E&gt; <strong>afterReadEntity</strong>(List&lt;E&gt; entities)</li>
                <li>default Page&lt;E&gt; <strong>afterReadEntity</strong>(Page&lt;E&gt; page)</li>
              </ul>
              <p class="text-[10px] text-sky-600 mt-1 italic" v-html="$t('api_list.hooks.read.entity_desc')"></p>
            </div>
            <div>
              <h5 class="text-xs font-bold text-indigo-700 uppercase mb-1">{{ $t('api_list.hooks.read.dto_phase') }}
              </h5>
              <ul class="text-xs font-mono space-y-1 text-indigo-800">
                <li>default &lt;S extends IDto&lt;E&gt;&gt; S <strong>afterReadDto</strong>(S dto)</li>
                <li>default &lt;S extends IDto&lt;E&gt;&gt; List&lt;S&gt; <strong>afterReadDto</strong>(List&lt;S&gt;
                  dtos)</li>
                <li>default &lt;S extends IDto&lt;E&gt;&gt; Page&lt;S&gt; <strong>afterReadDto</strong>(Page&lt;S&gt;
                  page)</li>
              </ul>
              <p class="text-[10px] text-indigo-600 mt-1 italic" v-html="$t('api_list.hooks.read.dto_desc')"></p>
            </div>
          </div>
        </div>

        <div class="p-4 bg-emerald-50 border border-emerald-100 rounded-lg">
          <h4 class="font-bold text-emerald-900 mb-2 border-b border-emerald-200 pb-1">{{
            $t('api_list.hooks.create.title') }}</h4>
          <ul class="text-xs font-mono space-y-2 text-emerald-800">
            <li>default E <strong>beforeCreate</strong>(E entity) <br /><span
                class="text-[10px] text-emerald-600 italic font-sans"
                v-html="$t('api_list.hooks.create.before')"></span>
            </li>
            <li>default E <strong>afterCreate</strong>(E entity) <br /><span
                class="text-[10px] text-emerald-600 italic font-sans" v-html="$t('api_list.hooks.create.after')"></span>
            </li>
          </ul>
        </div>
        <div class="p-4 bg-amber-50 border border-amber-100 rounded-lg">
          <h4 class="font-bold text-amber-900 mb-2 border-b border-amber-200 pb-1">{{ $t('api_list.hooks.update.title')
          }}</h4>
          <ul class="text-xs font-mono space-y-2 text-amber-800">
            <li>default E <strong>beforeUpdate</strong>(E entity) <br /><span
                class="text-[10px] text-amber-600 italic font-sans" v-html="$t('api_list.hooks.update.before')"></span>
            </li>
            <li>default E <strong>afterUpdate</strong>(E entity) <br /><span
                class="text-[10px] text-amber-600 italic font-sans" v-html="$t('api_list.hooks.update.after')"></span>
            </li>
          </ul>
        </div>
        <div class="p-4 bg-rose-50 border border-rose-100 rounded-lg">
          <h4 class="font-bold text-rose-900 mb-2 border-b border-rose-200 pb-1">{{ $t('api_list.hooks.delete.title') }}
          </h4>
          <ul class="text-xs font-mono space-y-2 text-rose-800">
            <li>default E <strong>beforeDelete</strong>(E entity) <br /><span
                class="text-[10px] text-rose-600 italic font-sans" v-html="$t('api_list.hooks.delete.before')"></span>
            </li>
            <li>default E <strong>afterDelete</strong>(E entity) <br /><span
                class="text-[10px] text-rose-600 italic font-sans" v-html="$t('api_list.hooks.delete.after')"></span>
            </li>
          </ul>
        </div>
      </div>

      <div class="mt-4 p-4 bg-slate-50 rounded-lg border border-slate-200 text-sm text-slate-600">
        <pre class="font-mono text-xs">
@Override
public Product beforeCreate(Product entity) {
    {{ $t('api_list.hooks.code_comment_logic') }}
    if (entity.getPrice() < 0) throw new HttpException("{{ $t('api_list.hooks.code_error_price') }}", HttpStatus.BAD_REQUEST);
    return entity;
}</pre>
      </div>
    </article>
  </section>
</template>

<script setup>
</script>