package com.example.demo.controller;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@AutoConfigureMockMvc
@Transactional
class ProductControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void testCreateProduct_Success() throws Exception {
        // Assuming Brand ID 1, Model 1, Store 1 exist from DataSeeder
        String requestBody = """
                {
                    "name": "TestProduct_Unique",
                    "price": 99.99,
                    "brandId": 1,
                    "modelId": 1,
                    "storeId": 1
                }
                """;

        mockMvc.perform(post("/api/v1/products")
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .content(requestBody))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.data.name").value("TestProduct_Unique"))
                .andExpect(jsonPath("$.data.price").value(99.99));
    }

    @Test
    void testCreateProduct_ValidationFail_NameBlank() throws Exception {
        String requestBody = """
                {
                    "name": "",
                    "price": 99.99,
                    "brandId": 1,
                    "modelId": 1,
                    "storeId": 1
                }
                """;

        mockMvc.perform(post("/api/v1/products")
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
                    "brandId": 1,
                    "modelId": 1,
                    "storeId": 1
                }
                """;

        mockMvc.perform(post("/api/v1/products")
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .content(requestBody))
                .andExpect(status().isBadRequest());
    }

    @Test
    void testGetProductById_NotFound() throws Exception {
        mockMvc.perform(get("/api/v1/products/99999"))
                .andExpect(status().isNotFound());
    }

    @Test
    void testGetAllProducts_Success() throws Exception {
        mockMvc.perform(get("/api/v1/products")
                .param("page", "0")
                .param("size", "10"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.content").isArray());
    }

    @Test
    void testProductCRUDFlow() throws Exception {
        // 1. Create
        String createBody = """
                {
                    "name": "CRUDProduct",
                    "price": 199.99,
                    "brandId": 1,
                    "modelId": 1,
                    "storeId": 1
                }
                """;

        MvcResult result = mockMvc.perform(post("/api/v1/products")
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .content(createBody))
                .andExpect(status().isCreated())
                .andReturn();

        String responseString = result.getResponse().getContentAsString();
        JsonNode root = objectMapper.readTree(responseString);
        Long id = root.path("data").path("id").asLong();

        // 2. Get
        mockMvc.perform(get("/api/v1/products/" + id))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.name").value("CRUDProduct"));

        // 3. Update
        String updateBody = """
                {
                    "name": "UpdatedCRUDProduct",
                    "price": 299.99
                }
                """;

        mockMvc.perform(put("/api/v1/products/" + id)
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .content(updateBody))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.name").value("UpdatedCRUDProduct"))
                .andExpect(jsonPath("$.data.price").value(299.99));

        // 4. Delete
        mockMvc.perform(delete("/api/v1/products/" + id))
                .andExpect(status().isOk());

        // 5. Verify Delete
        mockMvc.perform(get("/api/v1/products/" + id))
                .andExpect(status().isNotFound());
    }

    @Test
    void testFilterProducts_Success() throws Exception {
        mockMvc.perform(get("/api/v1/products/filter")
                .param("minPrice", "10")
                .param("maxPrice", "2000")
                .param("brandName", "Apple"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.content").isArray());
    }

    @Test
    void testCreateProduct_ValidationFail_InvalidBrandId() throws Exception {
        String requestBody = """
                {
                    "name": "InvalidBrandProduct",
                    "price": 99.99,
                    "brandId": 99999,
                    "modelId": 1,
                    "storeId": 1
                }
                """;

        mockMvc.perform(post("/api/v1/products")
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .content(requestBody))
                .andExpect(status().isBadRequest());
    }

    @Test
    void testGetAllProducts_Pagination() throws Exception {
        // Create 2 products first to match default seed + extra
        // Actually Seed data has 2 products.
        // Page 0, Size 1 -> Should return 1 element
        mockMvc.perform(get("/api/v1/products")
                .param("page", "0")
                .param("size", "1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.content.length()").value(1))
                .andExpect(jsonPath("$.data.totalElements").value(org.hamcrest.Matchers.greaterThanOrEqualTo(2)));
    }

    @Test
    void testCreateProduct_ValidationFail_InvalidModelId() throws Exception {
        String requestBody = """
                {
                    "name": "InvalidModelProduct",
                    "price": 99.99,
                    "brandId": 1,
                    "modelId": 99999,
                    "storeId": 1
                }
                """;

        mockMvc.perform(post("/api/v1/products")
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .content(requestBody))
                .andExpect(status().isBadRequest());
    }

    @Test
    void testCreateProduct_ValidationFail_InvalidStoreId() throws Exception {
        String requestBody = """
                {
                    "name": "InvalidStoreProduct",
                    "price": 99.99,
                    "brandId": 1,
                    "modelId": 1,
                    "storeId": 99999
                }
                """;

        mockMvc.perform(post("/api/v1/products")
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .content(requestBody))
                .andExpect(status().isBadRequest());
    }

    @Test
    void testCreateProduct_WithCategories_Success() throws Exception {
        // Assume Category ID 1 exists (Electronics)
        String requestBody = """
                {
                    "name": "CategoryProduct",
                    "price": 149.99,
                    "brandId": 1,
                    "modelId": 1,
                    "storeId": 1,
                    "categoryIds": [1]
                }
                """;

        MvcResult result = mockMvc.perform(post("/api/v1/products")
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .content(requestBody))
                .andExpect(status().isCreated())
                .andReturn();

        String responseString = result.getResponse().getContentAsString();
        JsonNode root = objectMapper.readTree(responseString);
        Long id = root.path("data").path("id").asLong();

        // Verify Get includes categoryIds
        mockMvc.perform(get("/api/v1/products/" + id))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.categoryIds[0]").value(1));
    }
}
