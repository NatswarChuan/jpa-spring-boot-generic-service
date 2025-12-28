package com.example.demo.integration;

import com.example.demo.domain.Model;
import com.example.demo.dto.model.ModelCreateReq;
import com.example.demo.dto.model.ModelUpdateReq;
import com.example.demo.repository.ModelRepository;
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
class ModelControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private ModelRepository modelRepository;

    @Test
    @Order(1)
    void testCreateModel_ValidData_ShouldReturnCreated() throws Exception {
        ModelCreateReq req = new ModelCreateReq();
        req.setName("Model 2025");
        req.setYear(2025);

        mockMvc.perform(post("/api/v1/models")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.name").value("Model 2025"))
                .andExpect(jsonPath("$.data.year").value(2025));
    }

    @Test
    @Order(2)
    void testGetModelById_ExistingId_ShouldReturnModel() throws Exception {
        Model model = new Model();
        model.setName("Model V1");
        model.setYear(2024);
        model = modelRepository.save(model);

        mockMvc.perform(get("/api/v1/models/" + model.getId()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.id").value(model.getId()));
    }

    @Test
    @Order(3)
    void testUpdateModel_ValidData_ShouldReturnUpdated() throws Exception {
        Model model = new Model();
        model.setName("Model Request Update");
        model.setYear(2023);
        modelRepository.save(model);

        ModelUpdateReq updateReq = new ModelUpdateReq();
        updateReq.setName("Model Updated");
        updateReq.setYear(2026);

        mockMvc.perform(put("/api/v1/models/" + model.getId())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(updateReq)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.name").value("Model Updated"))
                .andExpect(jsonPath("$.data.year").value(2026));
    }

    @Test
    @Order(4)
    void testDeleteModel_ExistingId_ShouldReturnNoContent() throws Exception {
        Model model = new Model();
        model.setName("Model To Delete");
        model.setYear(2020);
        modelRepository.save(model);

        mockMvc.perform(delete("/api/v1/models/" + model.getId()))
                .andExpect(status().isNoContent());

        mockMvc.perform(get("/api/v1/models/" + model.getId()))
                .andExpect(status().isNotFound());
    }
}
