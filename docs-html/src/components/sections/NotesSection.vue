<template>
  <section id="notes" class="scroll-mt-20 mb-16">
    <h2 class="text-3xl font-bold text-red-600 border-b border-red-200 pb-4 mb-8">9. Important Notes</h2>
    
    <!-- 9.1 Best Practices -->
    <article id="notes-best-practices" class="mb-10 scroll-mt-24">
      <h3 class="text-xl font-bold text-slate-800 mb-4 flex items-center">
        <span class="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm mr-3">9.1</span>
        Best Practices
      </h3>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div class="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500 shadow-sm">
          <h4 class="text-lg font-bold text-blue-800 mb-2">
            <i class="fas fa-exclamation-triangle mr-2"></i>DTO Constructor
          </h4>
          <p class="text-sm text-blue-700">
            Tất cả DTO bắt buộc phải có <strong>Public No-Args Constructor</strong> để Reflection hoạt động.
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

       <div class="bg-white border border-slate-200 rounded-lg p-6 shadow-sm mb-6">
          <h4 class="text-lg font-bold text-slate-800 mb-3"><i class="fas fa-lightbulb text-yellow-500 mr-2"></i>Optimization Tips</h4>
          <ul class="list-disc list-inside text-slate-600 space-y-2">
            <li>Đánh index cho các cột <code>@JoinColumn</code>.</li>
            <li>Luôn dùng <code>FetchType.LAZY</code> cho quan hệ To-Many.</li>
          </ul>
       </div>
    </article>

    <!-- 9.2 Troubleshooting -->
    <article id="notes-troubleshooting" class="mb-10 scroll-mt-24">
      <h3 class="text-xl font-bold text-slate-800 mb-4 flex items-center">
        <span class="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm mr-3">9.2</span>
        Troubleshooting (N+1 & Performance)
      </h3>

      <!-- N+1 Solution -->
      <div class="bg-white border border-slate-200 rounded-lg p-6 shadow-sm mb-6">
        <h4 class="text-lg font-bold text-slate-800 mb-3 text-red-600"><i class="fas fa-bug mr-2"></i>Vấn đề N+1 Query</h4>
        <div class="space-y-4">
          <div class="p-4 bg-slate-50 rounded border border-slate-200">
            <h5 class="font-bold text-slate-700 mb-2 text-sm">Cách 1: Sử dụng EntityGraph</h5>
            <CodeBlock filename="UserRepository.java" :code="n1FixCode1" />
          </div>
          <div class="p-4 bg-slate-50 rounded border border-slate-200">
            <h5 class="font-bold text-slate-700 mb-2 text-sm">Cách 2: Sử dụng Specification fetch</h5>
            <CodeBlock filename="UserController.java" :code="n1FixCode2" />
          </div>
        </div>
      </div>

      <!-- Over-fetching Solution -->
      <div class="bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
        <h4 class="text-lg font-bold text-slate-800 mb-3 text-orange-600">
          <i class="fas fa-weight-hanging mr-2"></i>Vấn đề Over-fetching (Lấy dư dữ liệu)
        </h4>
        <div class="space-y-6">
          <div class="p-4 bg-orange-50 rounded border border-orange-200">
            <h5 class="font-bold text-orange-800 mb-2 text-sm">
              Tách bảng vật lý (OneToOne Lazy)
            </h5>
            <CodeBlock filename="User.java" :code="overFetchingOneToOne" />
          </div>
        </div>
      </div>
    </article>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import CodeBlock from '../CodeBlock.vue';

const n1FixCode1 = ref(`package com.example.demo.repository;

import com.example.demo.entity.User;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {
    @Override
    @EntityGraph(attributePaths = {"roles", "profile"}) 
    List<User> findAll();
}
`);

const n1FixCode2 = ref(`// Trong ProductController / Service
import com.example.demo.entity.User;
import com.example.demo.dto.UserResponse;
import jakarta.persistence.criteria.JoinType;
import org.springframework.data.jpa.domain.Specification;

// ...
Specification<User> spec = (root, query, cb) -> {
    // Chỉ fetch khi return type không phải là count (Long)
    if (query.getResultType() != Long.class && query.getResultType() != long.class) {
        root.fetch("roles", JoinType.LEFT);
    }
    return null; 
};
service.findAll(page, size, spec, UserResponse.class);
`);

const overFetchingOneToOne = ref(`package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "users")
@Data
public class User {
    @Id private Long id;
    private String name;

    // Tách cột nặng sang bảng 'user_details'
    // Quan trọng: fetch = LAZY và optional = false
    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL, optional = false)
    @JoinColumn(name = "detail_id")
    private UserDetail userDetail;
}

@Entity
@Table(name = "user_details")
@Data
public class UserDetail {
    @Id private Long id;
    @Lob private byte[] avatar; // Cột nặng
    @Column(columnDefinition="TEXT") private String bio;
}
`);
</script>