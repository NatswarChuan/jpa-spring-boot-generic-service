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
class ModelControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void testCreateModel_Success() throws Exception {
        String brandBody = """
                {
                    "name": "TestBrandForModel",
                    "origin": "Test Country"
                }
                """;
        mockMvc.perform(post("/api/brands")
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .content(brandBody))
                .andExpect(status().isCreated());

        String requestBody = """
                {
                    "name": "TestModel",
                    "year": 2024
                }
                """;

        mockMvc.perform(post("/api/models")
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .content(requestBody))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.data.name").value("TestModel"))
                .andExpect(jsonPath("$.data.year").value(2024));
    }

    @Test
    void testCreateModel_ValidationFail_NameBlank() throws Exception {
        String requestBody = """
                {
                    "name": "",
                    "year": 2024
                }
                """;

        mockMvc.perform(post("/api/models")
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .content(requestBody))
                .andExpect(status().isBadRequest());
    }

    @Test
    void testCreateModel_ValidationFail_YearTooSmall() throws Exception {
        String requestBody = """
                {
                    "name": "OldModel",
                    "year": 1800
                }
                """;

        mockMvc.perform(post("/api/models")
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .content(requestBody))
                .andExpect(status().isBadRequest());
    }

    @Test
    void testGetModelById_NotFound() throws Exception {
        mockMvc.perform(get("/api/models/99999"))
                .andExpect(status().isNotFound());
    }

    @Test
    void testGetAllModels_Success() throws Exception {
        mockMvc.perform(get("/api/models")
                .param("page", "0")
                .param("size", "10"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.content").isArray());
    }

    @Test
    void testUpdateModel_NotFound() throws Exception {
        String requestBody = """
                {
                    "name": "Updated Model",
                    "year": 2025
                }
                """;

        mockMvc.perform(put("/api/models/99999")
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .content(requestBody))
                .andExpect(status().isNotFound());
    }

    @Test
    void testDeleteModel_NotFound() throws Exception {
        mockMvc.perform(delete("/api/models/99999"))
                .andExpect(status().isNotFound());
    }
}
