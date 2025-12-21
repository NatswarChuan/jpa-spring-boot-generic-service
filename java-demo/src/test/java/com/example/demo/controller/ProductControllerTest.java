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
class ProductControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void testCreateProduct_Success() throws Exception {
        String requestBody = """
                {
                    "name": "TestProduct",
                    "price": 99.99,
                    "description": "Test Description"
                }
                """;

        mockMvc.perform(post("/api/products")
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .content(requestBody))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.data.name").value("TestProduct"))
                .andExpect(jsonPath("$.data.price").value(99.99));
    }

    @Test
    void testCreateProduct_ValidationFail_NameBlank() throws Exception {
        String requestBody = """
                {
                    "name": "",
                    "price": 99.99,
                    "description": "Test Description"
                }
                """;

        mockMvc.perform(post("/api/products")
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .content(requestBody))
                .andExpect(status().isBadRequest());
    }

    @Test
    void testCreateProduct_ValidationFail_PriceNegative() throws Exception {
        String requestBody = """
                {
                    "name": "TestProduct",
                    "price": -10.0,
                    "description": "Test Description"
                }
                """;

        mockMvc.perform(post("/api/products")
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .content(requestBody))
                .andExpect(status().isBadRequest());
    }

    @Test
    void testGetProductById_NotFound() throws Exception {
        mockMvc.perform(get("/api/products/99999"))
                .andExpect(status().isNotFound());
    }

    @Test
    void testGetAllProducts_Success() throws Exception {
        mockMvc.perform(get("/api/products")
                .param("page", "0")
                .param("size", "10"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.content").isArray());
    }

    @Test
    void testUpdateProduct_NotFound() throws Exception {
        String requestBody = """
                {
                    "name": "Updated Product",
                    "price": 199.99,
                    "description": "Updated Description"
                }
                """;

        mockMvc.perform(put("/api/products/99999")
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .content(requestBody))
                .andExpect(status().isNotFound());
    }

    @Test
    void testDeleteProduct_NotFound() throws Exception {
        mockMvc.perform(delete("/api/products/99999"))
                .andExpect(status().isNotFound());
    }
}
