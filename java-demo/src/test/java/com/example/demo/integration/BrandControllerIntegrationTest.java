package com.example.demo.integration;

import com.example.demo.domain.Brand;
import com.example.demo.repository.BrandRepository;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest(classes = com.example.demo.DemoApplication.class)
@AutoConfigureMockMvc
@Transactional
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class BrandControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private BrandRepository brandRepository;

    @Test
    @Order(1)
    void testGetBrandById_ExistingId_ShouldReturnBrand() throws Exception {
        Brand brand = new Brand();
        brand.setName("Apple");
        brand.setDescription("Tech Giant");
        brand = brandRepository.save(brand);

        mockMvc.perform(get("/api/v1/brands/" + brand.getId()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.id").value(brand.getId()))
                .andExpect(jsonPath("$.data.name").value("Apple"));
    }

    @Test
    @Order(2)
    void testGetAllBrands_ShouldReturnList() throws Exception {
        Brand b1 = new Brand();
        b1.setName("Samsung");
        brandRepository.save(b1);

        Brand b2 = new Brand();
        b2.setName("Sony");
        brandRepository.save(b2);

        mockMvc.perform(get("/api/v1/brands")
                .param("page", "0")
                .param("size", "10"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.content.length()").value(greaterThanOrEqualTo(2)));
    }
}
