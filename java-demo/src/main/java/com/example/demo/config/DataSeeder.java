package com.example.demo.config;

import com.example.demo.domain.*;
import com.example.demo.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.lang.NonNull;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.HashSet;

/**
 * Component khởi tạo dữ liệu mẫu khi ứng dụng khởi chạy.
 * <p>
 * Implement {@link CommandLineRunner} để chạy logic seed data.
 * Kiểm tra dữ liệu đã tồn tại chưa trước khi insert.
 */
@Component
public class DataSeeder implements CommandLineRunner {

    private final BrandRepository brandRepository;
    private final CategoryRepository categoryRepository;
    private final ModelRepository modelRepository;
    private final ProductRepository productRepository;
    private final StoreRepository storeRepository;

    public DataSeeder(
            @NonNull BrandRepository brandRepository,
            @NonNull CategoryRepository categoryRepository,
            @NonNull ModelRepository modelRepository,
            @NonNull ProductRepository productRepository,
            @NonNull StoreRepository storeRepository) {
        this.brandRepository = brandRepository;
        this.categoryRepository = categoryRepository;
        this.modelRepository = modelRepository;
        this.productRepository = productRepository;
        this.storeRepository = storeRepository;
    }

    /**
     * Thực hiện seed data.
     *
     * @param args arguments từ command line.
     * @throws Exception nếu có lỗi xảy ra.
     */
    @Override
    @Transactional
    public void run(String... args) throws Exception {
        if (categoryRepository.count() > 0) {
            System.out.println("Data already seeded. Skipping.");
            return;
        }

        System.out.println("Seeding initial data...");

        Category electronics = Category.builder().name("Electronics").description("Gadgets and devices").build();
        Category fashion = Category.builder().name("Fashion").description("Clothing and accessories").build();

        categoryRepository.saveAll(Arrays.asList(electronics, fashion));

        Model smartphoneModel = Model.builder()
                .name("Smartphones")
                .build();
        smartphoneModel.setCategories(new HashSet<>(Arrays.asList(electronics)));
        modelRepository.save(smartphoneModel);

        Model laptopModel = Model.builder()
                .name("Laptops")
                .build();
        laptopModel.setCategories(new HashSet<>(Arrays.asList(electronics)));
        modelRepository.save(laptopModel);

        Brand apple = Brand.builder()
                .name("Apple")
                .description("Premium technology")
                .model(smartphoneModel)
                .build();
        apple.setCategories(new HashSet<>(Arrays.asList(electronics)));
        brandRepository.save(apple);

        Brand samsung = Brand.builder()
                .name("Samsung")
                .description("Innovative technology")
                .model(smartphoneModel)
                .build();
        samsung.setCategories(new HashSet<>(Arrays.asList(electronics)));
        brandRepository.save(samsung);

        Product iphone15 = Product.builder()
                .name("iPhone 15")
                .price(BigDecimal.valueOf(999.00))
                .brand(apple)
                .build();
        iphone15.setCategories(new HashSet<>(Arrays.asList(electronics)));
        productRepository.save(iphone15);

        Product s24 = Product.builder()
                .name("Galaxy S24")
                .price(BigDecimal.valueOf(899.00))
                .brand(samsung)
                .build();
        s24.setCategories(new HashSet<>(Arrays.asList(electronics)));
        productRepository.save(s24);

        Store mainStore = Store.builder()
                .name("Main Tech Store")
                .address("123 Tech Street")
                .build();
        mainStore.setCategories(new HashSet<>(Arrays.asList(electronics)));
        storeRepository.save(mainStore);

        System.out.println("Data seeding completed.");
    }
}
