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
class BrandControllerTest {

        @Autowired
        private MockMvc mockMvc;

        @Autowired
        private ObjectMapper objectMapper;

        @Test
        void testCreateBrand_Success() throws Exception {
                String requestBody = """
                                {
                                    "name": "TestBrand",
                                    "description": "Test Description"
                                }
                                """;

                mockMvc.perform(post("/api/v1/brands")
                                .contentType(MediaType.APPLICATION_JSON_VALUE)
                                .content(requestBody))
                                .andDo(org.springframework.test.web.servlet.result.MockMvcResultHandlers.print())
                                .andExpect(status().isCreated())
                                .andExpect(jsonPath("$.data.name").value("TestBrand"));
        }

        @Test
        void testCreateBrand_ValidationFail_NameBlank() throws Exception {
                String requestBody = """
                                {
                                    "name": "",
                                    "description": "Test Description"
                                }
                                """;

                mockMvc.perform(post("/api/v1/brands")
                                .contentType(MediaType.APPLICATION_JSON_VALUE)
                                .content(requestBody))
                                .andExpect(status().isBadRequest());
        }

        @Test
        void testGetBrandById_NotFound() throws Exception {
                mockMvc.perform(get("/api/v1/brands/99999"))
                                .andExpect(status().isNotFound());
        }

        @Test
        void testGetAllBrands_Success() throws Exception {
                mockMvc.perform(get("/api/v1/brands")
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
                                    "description": "Updated Description",
                                    "modelId": 1,
                                    "categoryIds": [1]
                                }
                                """;

                mockMvc.perform(put("/api/v1/brands/99999")
                                .contentType(MediaType.APPLICATION_JSON_VALUE)
                                .content(requestBody))
                                .andExpect(status().isNotFound());
        }

        @Test
        void testDeleteBrand_NotFound() throws Exception {
                mockMvc.perform(delete("/api/v1/brands/99999"))
                                .andExpect(status().isNotFound());
        }

        @Test
        void testBrandCRUDFlow() throws Exception {
                String createBody = """
                                {
                                    "name": "CRUDTestBrand",
                                    "description": "CRUD Description"
                                }
                                """;

                MvcResult result = mockMvc.perform(post("/api/v1/brands")
                                .contentType(MediaType.APPLICATION_JSON_VALUE)
                                .content(createBody))
                                .andExpect(status().isCreated())
                                .andExpect(jsonPath("$.data.name").value("CRUDTestBrand"))
                                .andReturn();

                String responseString = result.getResponse().getContentAsString();
                JsonNode root = objectMapper.readTree(responseString);
                Long id = root.path("data").path("id").asLong();

                mockMvc.perform(get("/api/v1/brands/" + id))
                                .andExpect(status().isOk())
                                .andExpect(jsonPath("$.data.name").value("CRUDTestBrand"));

                String updateBody = """
                                {
                                    "name": "UpdatedCRUDBrand",
                                    "description": "Updated CRUD Description",
                                    "modelId": 1,
                                    "categoryIds": [1]
                                }
                                """;

                mockMvc.perform(put("/api/v1/brands/" + id)
                                .contentType(MediaType.APPLICATION_JSON_VALUE)
                                .content(updateBody))
                                .andExpect(status().isOk())
                                .andExpect(jsonPath("$.data.name").value("UpdatedCRUDBrand"));

                mockMvc.perform(delete("/api/v1/brands/" + id))
                                .andExpect(status().isOk()); // AbController returns 200

                mockMvc.perform(get("/api/v1/brands/" + id))
                                .andExpect(status().isNotFound());
        }

        @Test
        void testCreateBrand_ValidationFail_DuplicateName() throws Exception {
                // "Apple" is seeded by DataSeeder
                String requestBody = """
                                {
                                    "name": "Apple",
                                    "description": "Duplicate description",
                                    "modelId": 1
                                }
                                """;

                mockMvc.perform(post("/api/v1/brands")
                                .contentType(MediaType.APPLICATION_JSON_VALUE)
                                .content(requestBody))
                                .andExpect(status().isBadRequest());
        }

        @Test
        void testCreateBrand_ValidationFail_InvalidModelId() throws Exception {
                String requestBody = """
                                {
                                    "name": "NewBrand",
                                    "description": "Desc",
                                    "modelId": 99999
                                }
                                """;

                mockMvc.perform(post("/api/v1/brands")
                                .contentType(MediaType.APPLICATION_JSON_VALUE)
                                .content(requestBody))
                                .andExpect(status().isBadRequest());
        }
}
