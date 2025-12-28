package com.example.demo.integration;

import com.example.demo.domain.Category;
import com.example.demo.dto.category.CategoryCreateReq;
import com.example.demo.dto.category.CategoryUpdateReq;
import com.example.demo.repository.CategoryRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests cho CategoryController.
 * Verify CRUD operations.
 */
@SpringBootTest(classes = com.example.demo.DemoApplication.class)
@AutoConfigureMockMvc
@Transactional
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class CategoryControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private CategoryRepository categoryRepository;

    @BeforeEach
    void setUp() {
        // Clear data if needed or rely on @Transactional rollback
    }

    @Test
    @Order(1)
    void testCreateCategory_ValidData_ShouldReturnCreated() throws Exception {
        CategoryCreateReq req = new CategoryCreateReq();
        req.setName("New Category");

        mockMvc.perform(post("/api/v1/categories")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.name").value("New Category"))
                .andExpect(jsonPath("$.data.id").exists());
    }

    @Test
    @Order(2)
    void testGetCategoryById_ExistingId_ShouldReturnCategory() throws Exception {
        Category category = new Category();
        category.setName("Category Detail");
        category = categoryRepository.save(category);

        mockMvc.perform(get("/api/v1/categories/" + category.getId()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.id").value(category.getId()))
                .andExpect(jsonPath("$.data.name").value("Category Detail"));
    }

    @Test
    @Order(3)
    void testUpdateCategory_ValidData_ShouldReturnUpdated() throws Exception {
        Category category = new Category();
        category.setName("Old Name");
        category = categoryRepository.save(category);

        CategoryUpdateReq updateReq = new CategoryUpdateReq();
        updateReq.setName("Updated Category Name");

        mockMvc.perform(put("/api/v1/categories/" + category.getId())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(updateReq)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.name").value("Updated Category Name"));
    }

    @Test
    @Order(4)
    void testDeleteCategory_ExistingId_ShouldReturnNoContent() throws Exception {
        Category category = new Category();
        category.setName("To Delete");
        category = categoryRepository.save(category);

        mockMvc.perform(delete("/api/v1/categories/" + category.getId()))
                .andExpect(status().isNoContent());

        mockMvc.perform(get("/api/v1/categories/" + category.getId()))
                .andExpect(status().isNotFound());
    }

    @Test
    @Order(5)
    void testGetAllCategories_ShouldReturnList() throws Exception {
        Category c1 = new Category();
        c1.setName("C1");
        categoryRepository.save(c1);

        Category c2 = new Category();
        c2.setName("C2");
        categoryRepository.save(c2);

        mockMvc.perform(get("/api/v1/categories")
                .param("page", "0")
                .param("size", "10"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.content.length()").value(greaterThanOrEqualTo(2)));
    }
}
