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
class ModelControllerTest {

        @Autowired
        private MockMvc mockMvc;

        @Autowired
        private ObjectMapper objectMapper;

        @Test
        void testCreateModel_Success() throws Exception {
                String requestBody = """
                                {
                                    "name": "TestModel",
                                    "year": 2024
                                }
                                """;

                mockMvc.perform(post("/api/v1/models")
                                .contentType(MediaType.APPLICATION_JSON_VALUE)
                                .content(requestBody))
                                .andExpect(status().isCreated())
                                .andExpect(jsonPath("$.data.name").value("TestModel"));
        }

        @Test
        void testCreateModel_ValidationFail_NameBlank() throws Exception {
                String requestBody = """
                                {
                                    "name": "",
                                    "year": 2024
                                }
                                """;

                mockMvc.perform(post("/api/v1/models")
                                .contentType(MediaType.APPLICATION_JSON_VALUE)
                                .content(requestBody))
                                .andExpect(status().isBadRequest());
        }

        @Test
        void testGetModelById_NotFound() throws Exception {
                mockMvc.perform(get("/api/v1/models/99999"))
                                .andExpect(status().isNotFound());
        }

        @Test
        void testGetAllModels_Success() throws Exception {
                mockMvc.perform(get("/api/v1/models")
                                .param("page", "0")
                                .param("size", "10"))
                                .andExpect(status().isOk())
                                .andExpect(jsonPath("$.data.content").isArray());
        }

        @Test
        void testModelCRUDFlow() throws Exception {
                // 1. Create
                String createBody = """
                                {
                                    "name": "CRUDModel",
                                    "year": 2024
                                }
                                """;

                MvcResult result = mockMvc.perform(post("/api/v1/models")
                                .contentType(MediaType.APPLICATION_JSON_VALUE)
                                .content(createBody))
                                .andExpect(status().isCreated())
                                .andReturn();

                String responseString = result.getResponse().getContentAsString();
                JsonNode root = objectMapper.readTree(responseString);
                Long id = root.path("data").path("id").asLong();

                // 2. Get
                mockMvc.perform(get("/api/v1/models/" + id))
                                .andExpect(status().isOk())
                                .andExpect(jsonPath("$.data.name").value("CRUDModel"));

                // 3. Update
                String updateBody = """
                                {
                                    "name": "UpdatedCRUDModel",
                                    "year": 2025
                                }
                                """;

                mockMvc.perform(put("/api/v1/models/" + id)
                                .contentType(MediaType.APPLICATION_JSON_VALUE)
                                .content(updateBody))
                                .andExpect(status().isOk())
                                .andExpect(jsonPath("$.data.name").value("UpdatedCRUDModel"))
                                .andExpect(jsonPath("$.data.year").value(2025));

                // 4. Delete
                mockMvc.perform(delete("/api/v1/models/" + id))
                                .andExpect(status().isOk());

                // 5. Verify Delete
                mockMvc.perform(get("/api/v1/models/" + id))
                                .andExpect(status().isNotFound());
        }

        @Test
        void testCreateModel_ValidationFail_DuplicateName() throws Exception {
                // "Smartphones" is seeded by DataSeeder
                String requestBody = """
                                {
                                    "name": "Smartphones",
                                    "year": 2024
                                }
                                """;

                mockMvc.perform(post("/api/v1/models")
                                .contentType(MediaType.APPLICATION_JSON_VALUE)
                                .content(requestBody))
                                .andExpect(status().isBadRequest());
        }
}
