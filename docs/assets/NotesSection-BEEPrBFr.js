import{_ as s}from"./CodeBlock-DBZk2lcI.js";import{r as o,c as d,o as c,a as p,b as e,d as r,e as l}from"./index-B66TvSSb.js";const m={id:"notes",class:"scroll-mt-20 mb-16"},b={id:"notes-troubleshooting",class:"mb-10 scroll-mt-24"},g={class:"bg-white border border-slate-200 rounded-lg p-6 shadow-sm mb-6"},u={class:"space-y-4"},f={class:"p-4 bg-slate-50 rounded border border-slate-200"},h={class:"p-4 bg-slate-50 rounded border border-slate-200"},x={class:"bg-white border border-slate-200 rounded-lg p-6 shadow-sm"},y={class:"space-y-6"},v={class:"p-4 bg-orange-50 rounded border border-orange-200"},C={__name:"NotesSection",setup(T){const a=o(`package com.example.demo.repository;

import com.example.demo.entity.User;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {
    @Override
    @EntityGraph(attributePaths = {"roles", "profile"}) 
    List<User> findAll();
}
`),i=o(`// Trong ProductController / Service
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
`),n=o(`package com.example.demo.entity;

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
`);return(_,t)=>(c(),d("section",m,[t[6]||(t[6]=p('<h2 class="text-3xl font-bold text-red-600 border-b border-red-200 pb-4 mb-8">9. Important Notes</h2><article id="notes-best-practices" class="mb-10 scroll-mt-24"><h3 class="text-xl font-bold text-slate-800 mb-4 flex items-center"><span class="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm mr-3">9.1</span> Best Practices </h3><div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"><div class="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500 shadow-sm"><h4 class="text-lg font-bold text-blue-800 mb-2"><i class="fas fa-exclamation-triangle mr-2"></i>DTO Constructor </h4><p class="text-sm text-blue-700"> Tất cả DTO bắt buộc phải có <strong>Public No-Args Constructor</strong> để Reflection hoạt động. </p></div><div class="bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-500 shadow-sm"><h4 class="text-lg font-bold text-yellow-800 mb-2"><i class="fas fa-code-branch mr-2"></i>Override Method </h4><ul class="text-sm text-yellow-800 list-disc list-inside"><li><strong>CreateReq:</strong> override <code>toEntity()</code></li><li><strong>UpdateReq:</strong> override <code>updateEntity()</code></li><li><strong>Response:</strong> override <code>fromEntity()</code></li></ul></div></div><div class="bg-white border border-slate-200 rounded-lg p-6 shadow-sm mb-6"><h4 class="text-lg font-bold text-slate-800 mb-3"><i class="fas fa-lightbulb text-yellow-500 mr-2"></i>Optimization Tips</h4><ul class="list-disc list-inside text-slate-600 space-y-2"><li>Đánh index cho các cột <code>@JoinColumn</code>.</li><li>Luôn dùng <code>FetchType.LAZY</code> cho quan hệ To-Many.</li></ul></div></article>',2)),e("article",b,[t[5]||(t[5]=e("h3",{class:"text-xl font-bold text-slate-800 mb-4 flex items-center"},[e("span",{class:"bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm mr-3"},"9.2"),r(" Troubleshooting (N+1 & Performance) ")],-1)),e("div",g,[t[2]||(t[2]=e("h4",{class:"text-lg font-bold text-slate-800 mb-3 text-red-600"},[e("i",{class:"fas fa-bug mr-2"}),r("Vấn đề N+1 Query")],-1)),e("div",u,[e("div",f,[t[0]||(t[0]=e("h5",{class:"font-bold text-slate-700 mb-2 text-sm"},"Cách 1: Sử dụng EntityGraph",-1)),l(s,{filename:"UserRepository.java",code:a.value},null,8,["code"])]),e("div",h,[t[1]||(t[1]=e("h5",{class:"font-bold text-slate-700 mb-2 text-sm"},"Cách 2: Sử dụng Specification fetch",-1)),l(s,{filename:"UserController.java",code:i.value},null,8,["code"])])])]),e("div",x,[t[4]||(t[4]=e("h4",{class:"text-lg font-bold text-slate-800 mb-3 text-orange-600"},[e("i",{class:"fas fa-weight-hanging mr-2"}),r("Vấn đề Over-fetching (Lấy dư dữ liệu) ")],-1)),e("div",y,[e("div",v,[t[3]||(t[3]=e("h5",{class:"font-bold text-orange-800 mb-2 text-sm"}," Tách bảng vật lý (OneToOne Lazy) ",-1)),l(s,{filename:"User.java",code:n.value},null,8,["code"])])])])])]))}};export{C as default};
