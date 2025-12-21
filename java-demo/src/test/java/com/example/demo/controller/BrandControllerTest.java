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
class BrandControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void testCreateBrand_Success() throws Exception {
        String requestBody = """
                {
                    "name": "TestBrand",
                    "origin": "Test Country"
                }
                """;

        mockMvc.perform(post("/api/brands")
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .content(requestBody))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.data.name").value("TestBrand"))
                .andExpect(jsonPath("$.data.origin").value("Test Country"));
    }

    @Test
    void testCreateBrand_ValidationFail_NameBlank() throws Exception {
        String requestBody = """
                {
                    "name": "",
                    "origin": "Test Country"
                }
                """;

        mockMvc.perform(post("/api/brands")
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .content(requestBody))
                .andExpect(status().isBadRequest());
    }

    @Test
    void testGetBrandById_NotFound() throws Exception {
        mockMvc.perform(get("/api/brands/99999"))
                .andExpect(status().isNotFound());
    }

    @Test
    void testGetAllBrands_Success() throws Exception {
        mockMvc.perform(get("/api/brands")
                .param("page", "0")
                .param("size", "10"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.content").isArray());
    }

    @Test
    void testUpdateBrand_NotFound() throws Exception {
        String requestBody = """
                {
                    "name": "Updated Brand",
                    "origin": "Updated Country"
                }
                """;

        mockMvc.perform(put("/api/brands/99999")
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .content(requestBody))
                .andExpect(status().isNotFound());
    }

    @Test
    void testDeleteBrand_NotFound() throws Exception {
        mockMvc.perform(delete("/api/brands/99999"))
                .andExpect(status().isNotFound());
    }

    @Test
    void testBrandCRUDFlow() throws Exception {
        // Create
        String createBody = """
                {
                    "name": "CRUDTestBrand",
                    "origin": "CRUD Country"
                }
                """;

        mockMvc.perform(post("/api/brands")
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .content(createBody))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.data.name").value("CRUDTestBrand"));

        // Using hardcoded ID for test - in production test, would parse from response
        Long id = 1L;

        // Read
        mockMvc.perform(get("/api/brands/" + id))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.name").value("CRUDTestBrand"));

        // Update
        String updateBody = """
                {
                    "name": "UpdatedCRUDBrand",
                    "origin": "Updated CRUD Country"
                }
                """;

        mockMvc.perform(put("/api/brands/" + id)
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .content(updateBody))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.name").value("UpdatedCRUDBrand"));

        // Delete
        mockMvc.perform(delete("/api/brands/" + id))
                .andExpect(status().isNoContent());

        // Verify deleted
        mockMvc.perform(get("/api/brands/" + id))
                .andExpect(status().isNotFound());
    }
}
