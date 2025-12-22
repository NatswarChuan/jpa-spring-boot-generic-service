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
class StoreControllerTest {

        @Autowired
        private MockMvc mockMvc;

        @Autowired
        private ObjectMapper objectMapper;

        @Test
        void testCreateStore_Success() throws Exception {
                String requestBody = """
                                {
                                    "name": "TestStore",
                                    "address": "123 Test Address"
                                }
                                """;

                mockMvc.perform(post("/api/v1/stores")
                                .contentType(MediaType.APPLICATION_JSON_VALUE)
                                .content(requestBody))
                                .andExpect(status().isCreated())
                                .andExpect(jsonPath("$.data.name").value("TestStore"))
                                .andExpect(jsonPath("$.data.address").value("123 Test Address"));
        }

        @Test
        void testCreateStore_ValidationFail_NameBlank() throws Exception {
                String requestBody = """
                                {
                                    "name": "",
                                    "address": "123 Test Address"
                                }
                                """;

                mockMvc.perform(post("/api/v1/stores")
                                .contentType(MediaType.APPLICATION_JSON_VALUE)
                                .content(requestBody))
                                .andExpect(status().isBadRequest());
        }

        @Test
        void testGetStoreById_NotFound() throws Exception {
                mockMvc.perform(get("/api/v1/stores/99999"))
                                .andExpect(status().isNotFound());
        }

        @Test
        void testGetAllStores_Success() throws Exception {
                mockMvc.perform(get("/api/v1/stores")
                                .param("page", "0")
                                .param("size", "10"))
                                .andExpect(status().isOk())
                                .andExpect(jsonPath("$.data.content").isArray());
        }

        @Test
        void testStoreCRUDFlow() throws Exception {
                // 1. Create
                String createBody = """
                                {
                                    "name": "CRUDStore",
                                    "address": "CRUD Address"
                                }
                                """;

                MvcResult result = mockMvc.perform(post("/api/v1/stores")
                                .contentType(MediaType.APPLICATION_JSON_VALUE)
                                .content(createBody))
                                .andExpect(status().isCreated())
                                .andReturn();

                String responseString = result.getResponse().getContentAsString();
                JsonNode root = objectMapper.readTree(responseString);
                Long id = root.path("data").path("id").asLong();

                // 2. Get
                mockMvc.perform(get("/api/v1/stores/" + id))
                                .andExpect(status().isOk())
                                .andExpect(jsonPath("$.data.name").value("CRUDStore"));

                // 3. Update
                String updateBody = """
                                {
                                    "name": "UpdatedCRUDStore",
                                    "address": "Updated CRUD Address"
                                }
                                """;

                mockMvc.perform(put("/api/v1/stores/" + id)
                                .contentType(MediaType.APPLICATION_JSON_VALUE)
                                .content(updateBody))
                                .andExpect(status().isOk())
                                .andExpect(jsonPath("$.data.name").value("UpdatedCRUDStore"));

                // 4. Delete
                mockMvc.perform(delete("/api/v1/stores/" + id))
                                .andExpect(status().isOk()); // AbController returns 200/204 depending on impl, usually
                                                             // 200 wrapped

                // 5. Verify Delete
                mockMvc.perform(get("/api/v1/stores/" + id))
                                .andExpect(status().isNotFound());
        }

        @Test
        void testCreateStore_ValidationFail_DuplicateName() throws Exception {
                // "Main Tech Store" is seeded by DataSeeder
                String requestBody = """
                                {
                                    "name": "Main Tech Store",
                                    "address": "New Address"
                                }
                                """;

                mockMvc.perform(post("/api/v1/stores")
                                .contentType(MediaType.APPLICATION_JSON_VALUE)
                                .content(requestBody))
                                .andExpect(status().isBadRequest()); // Should fail unique validation
        }
}
