package com.example.demo.controller;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@AutoConfigureMockMvc
@Transactional
class CategoryControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void testCreateCategory_Success() throws Exception {
        // First create a brand
        String brandBody = """
                {
                    "name": "TestBrandForCategory",
                    "origin": "Test Country"
                }
                """;
        mockMvc.perform(post("/api/brands")
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .content(brandBody))
                .andExpect(status().isCreated());

        String requestBody = """
                {
                    "name": "TestCategory",
                    "description": "Test Description"
                }
                """;

        mockMvc.perform(post("/api/categories")
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .content(requestBody))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.data.name").value("TestCategory"));
    }

    @Test
    void testCreateCategory_ValidationFail_NameBlank() throws Exception {
        String requestBody = """
                {
                    "name": "",
                    "description": "Test Description"
                }
                """;

        mockMvc.perform(post("/api/categories")
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .content(requestBody))
                .andExpect(status().isBadRequest());
    }

    @Test
    void testGetCategoryById_NotFound() throws Exception {
        mockMvc.perform(get("/api/categories/99999"))
                .andExpect(status().isNotFound());
    }

    @Test
    void testGetAllCategories_Success() throws Exception {
        mockMvc.perform(get("/api/categories")
                .param("page", "0")
                .param("size", "10"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.content").isArray());
    }

    @Test
    void testUpdateCategory_NotFound() throws Exception {
        String requestBody = """
                {
                    "name": "Updated Category",
                    "description": "Updated Description"
                }
                """;

        mockMvc.perform(put("/api/categories/99999")
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .content(requestBody))
                .andExpect(status().isNotFound());
    }

    @Test
    void testDeleteCategory_NotFound() throws Exception {
        mockMvc.perform(delete("/api/categories/99999"))
                .andExpect(status().isNotFound());
    }
}
