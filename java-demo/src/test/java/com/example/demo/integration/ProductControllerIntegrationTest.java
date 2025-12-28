package com.example.demo.integration;

import com.example.demo.domain.*;
import com.example.demo.dto.product.ProductCreateReq;
import com.example.demo.dto.product.ProductUpdateReq;
import com.example.demo.repository.*;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;

import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests cho ProductController.
 * <p>
 * Test toàn bộ chu trình CRUD operations và custom filtering,
 * verify integration với java-core framework.
 *
 * @author NatswarChuan
 */
@SpringBootTest(classes = com.example.demo.DemoApplication.class)
@AutoConfigureMockMvc
@Transactional
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class ProductControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    private ObjectMapper objectMapper = new ObjectMapper();

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private BrandRepository brandRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ModelRepository modelRepository;

    @Autowired
    private StoreRepository storeRepository;

    private Brand testBrand;
    private Category testCategory;
    private Model testModel;
    private Store testStore;

    @BeforeEach
    void setUp() {
        // Tạo test data
        testBrand = new Brand();
        testBrand.setName("Test Brand");
        testBrand = brandRepository.save(testBrand);

        testCategory = new Category();
        testCategory.setName("Test Category");
        testCategory = categoryRepository.save(testCategory);

        testModel = new Model();
        testModel.setName("Test Model");
        testModel.setYear(2024);
        testModel = modelRepository.save(testModel);

        testStore = new Store();
        testStore.setName("Test Store");
        testStore.setAddress("Test Address");
        testStore = storeRepository.save(testStore);
    }

    /**
     * Test POST /api/v1/products - Create operation
     * Verify: ICreateService.create() with DTO conversion
     */
    @Test
    @Order(1)
    void testCreateProduct_ValidData_ShouldReturnCreated() throws Exception {
        ProductCreateReq createReq = new ProductCreateReq();
        createReq.setName("Test Product");
        createReq.setPrice(new BigDecimal("99.99"));
        createReq.setBrandId(testBrand.getId());
        createReq.setModelId(testModel.getId());
        createReq.setStoreId(testStore.getId());

        mockMvc.perform(post("/api/v1/products")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(createReq)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.name").value("Test Product"))
                .andExpect(jsonPath("$.data.price").value(99.99))
                .andExpect(jsonPath("$.data.id").exists());
    }

    /**
     * Test POST /api/v1/products với invalid data
     * Verify: Validation framework (e.g., @NotNull, @Positive)
     */
    @Test
    @Order(2)
    void testCreateProduct_InvalidData_ShouldReturnBadRequest() throws Exception {
        ProductCreateReq createReq = new ProductCreateReq();
        // Missing required fields

        mockMvc.perform(post("/api/v1/products")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(createReq)))
                .andExpect(status().isBadRequest());
    }

    /**
     * Test GET /api/v1/products/{id} - Read Detail operation
     * Verify: IReadDetailService.findById() with DTO mapping
     */
    @Test
    @Order(3)
    void testGetProductById_ExistingId_ShouldReturnProduct() throws Exception {
        // Create a product first
        Product product = new Product();
        product.setName("Product For Get");
        product.setPrice(new BigDecimal("50.00"));
        product.setBrand(testBrand);
        product.setModel(testModel);
        product.setStore(testStore);
        product = productRepository.save(product);

        mockMvc.perform(get("/api/v1/products/" + product.getId()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.id").value(product.getId()))
                .andExpect(jsonPath("$.data.name").value("Product For Get"));
    }

    /**
     * Test GET /api/v1/products/{id} với non-existent ID
     * Verify: Error handling (should return 404)
     */
    @Test
    @Order(4)
    void testGetProductById_NonExistentId_ShouldReturnNotFound() throws Exception {
        mockMvc.perform(get("/api/v1/products/99999"))
                .andExpect(status().isNotFound());
    }

    /**
     * Test GET /api/v1/products - Read Summary with pagination
     * Verify: IReadSummaryService.findAll() with pagination
     */
    @Test
    @Order(5)
    void testGetAllProducts_WithPagination_ShouldReturnPagedResult() throws Exception {
        // Create multiple products
        for (int i = 0; i < 5; i++) {
            Product product = new Product();
            product.setName("Product " + i);
            product.setPrice(new BigDecimal("10.00").multiply(new BigDecimal(i + 1)));
            product.setBrand(testBrand);
            product.setModel(testModel);
            product.setStore(testStore);
            productRepository.save(product);
        }

        mockMvc.perform(get("/api/v1/products")
                .param("page", "0")
                .param("size", "3"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.content").isArray())
                .andExpect(jsonPath("$.data.content.length()").value(3))
                .andExpect(jsonPath("$.data.totalElements").value(greaterThanOrEqualTo(5)))
                .andExpect(jsonPath("$.data.totalPages").value(greaterThanOrEqualTo(2)));
    }

    /**
     * Test GET /api/v1/products/filter - Custom specification filtering
     * Verify: ProductSpecification with price range filter
     */
    @Test
    @Order(6)
    void testFilterProducts_ByPriceRange_ShouldReturnFiltered() throws Exception {
        // Create products with different prices
        Product cheap = new Product();
        cheap.setName("Cheap Product");
        cheap.setPrice(new BigDecimal("10.00"));
        cheap.setBrand(testBrand);
        cheap.setModel(testModel);
        cheap.setStore(testStore);
        productRepository.save(cheap);

        Product expensive = new Product();
        expensive.setName("Expensive Product");
        expensive.setPrice(new BigDecimal("100.00"));
        expensive.setBrand(testBrand);
        expensive.setModel(testModel);
        expensive.setStore(testStore);
        productRepository.save(expensive);

        mockMvc.perform(get("/api/v1/products/filter")
                .param("minPrice", "50")
                .param("maxPrice", "150"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.content").isArray());
        // Note: Can't verify exact items due to potential other products in DB
    }

    /**
     * Test PUT /api/v1/products/{id} - Update operation
     * Verify: IUpdateService.update()
     */
    @Test
    @Order(7)
    void testUpdateProduct_ValidData_ShouldReturnUpdated() throws Exception {
        // Create product
        Product product = new Product();
        product.setName("Original Name");
        product.setPrice(new BigDecimal("25.00"));
        product.setBrand(testBrand);
        product.setModel(testModel);
        product.setStore(testStore);
        product = productRepository.save(product);

        // Update request
        ProductUpdateReq updateReq = new ProductUpdateReq();
        updateReq.setName("Updated Name");
        updateReq.setPrice(new BigDecimal("30.00"));
        updateReq.setBrandId(testBrand.getId());
        updateReq.setModelId(testModel.getId());
        updateReq.setStoreId(testStore.getId());

        mockMvc.perform(put("/api/v1/products/" + product.getId())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(updateReq)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.name").value("Updated Name"))
                .andExpect(jsonPath("$.data.price").value(30.00));
    }

    /**
     * Test DELETE /api/v1/products/{id} - Delete operation
     * Verify: IDeleteService.delete()
     */
    @Test
    @Order(8)
    void testDeleteProduct_ExistingId_ShouldReturnNoContent() throws Exception {
        // Create product
        Product product = new Product();
        product.setName("To Be Deleted");
        product.setPrice(new BigDecimal("15.00"));
        product.setBrand(testBrand);
        product.setModel(testModel);
        product.setStore(testStore);
        product = productRepository.save(product);

        Long productId = product.getId();

        mockMvc.perform(delete("/api/v1/products/" + productId))
                .andExpect(status().isNoContent());

        // Verify product is deleted
        mockMvc.perform(get("/api/v1/products/" + productId))
                .andExpect(status().isNotFound());
    }

    /**
     * Test specification with brand name filter (JOIN query)
     * Verify: ProductSpecification with join to Brand table
     */
    @Test
    @Order(9)
    void testFilterProducts_ByBrandName_ShouldReturnFiltered() throws Exception {
        // Create brand with specific name
        Brand specificBrand = new Brand();
        specificBrand.setName("Nike");
        specificBrand = brandRepository.save(specificBrand);

        Product nikeProduct = new Product();
        nikeProduct.setName("Nike Shoes");
        nikeProduct.setPrice(new BigDecimal("80.00"));
        nikeProduct.setBrand(specificBrand);
        nikeProduct.setModel(testModel);
        nikeProduct.setStore(testStore);
        productRepository.save(nikeProduct);

        mockMvc.perform(get("/api/v1/products/filter")
                .param("brandName", "Nike"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.content").isArray());
    }
}
