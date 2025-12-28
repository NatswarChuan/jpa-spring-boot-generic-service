package com.example.demo.integration;

import com.example.demo.domain.Store;
import com.example.demo.dto.store.StoreCreateReq;
import com.example.demo.dto.store.StoreUpdateReq;
import com.example.demo.repository.StoreRepository;
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

@SpringBootTest(classes = com.example.demo.DemoApplication.class)
@AutoConfigureMockMvc
@Transactional
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class StoreControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private StoreRepository storeRepository;

    @Test
    @Order(1)
    void testCreateStore_ValidData_ShouldReturnCreated() throws Exception {
        StoreCreateReq req = new StoreCreateReq();
        req.setName("Tech Store");
        req.setAddress("123 Tech Street");

        mockMvc.perform(post("/api/v1/stores")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.name").value("Tech Store"))
                .andExpect(jsonPath("$.data.address").value("123 Tech Street"));
    }

    @Test
    @Order(2)
    void testGetStoreById_ExistingId_ShouldReturnStore() throws Exception {
        Store store = new Store();
        store.setName("Store A");
        store.setAddress("Addr A");
        store = storeRepository.save(store);

        mockMvc.perform(get("/api/v1/stores/" + store.getId()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.id").value(store.getId()));
    }

    @Test
    @Order(3)
    void testUpdateStore_ValidData_ShouldReturnUpdated() throws Exception {
        Store store = new Store();
        store.setName("Old Store");
        store.setAddress("Old Addr");
        storeRepository.save(store);

        StoreUpdateReq updateReq = new StoreUpdateReq();
        updateReq.setName("New Store");
        updateReq.setAddress("New Addr");

        mockMvc.perform(put("/api/v1/stores/" + store.getId())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(updateReq)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.name").value("New Store"))
                .andExpect(jsonPath("$.data.address").value("New Addr"));
    }

    @Test
    @Order(4)
    void testDeleteStore_ExistingId_ShouldReturnNoContent() throws Exception {
        Store store = new Store();
        store.setName("Delete Me");
        store.setAddress("Where ever");
        storeRepository.save(store);

        mockMvc.perform(delete("/api/v1/stores/" + store.getId()))
                .andExpect(status().isNoContent());

        mockMvc.perform(get("/api/v1/stores/" + store.getId()))
                .andExpect(status().isNotFound());
    }
}
