# jpa-spring-boot-generic-service

[![Maven Central](https://img.shields.io/maven-central/v/io.github.natswarchuan/jpa-spring-boot-generic-service.svg?label=Maven%20Central)](https://central.sonatype.com/artifact/io.github.natswarchuan/jpa-spring-boot-generic-service)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Clean Architecture Generic Service Framework cho Spring Boot**

Thư viện này cung cấp một tầng Service & Controller tiêu chuẩn hóa giúp **tự động hóa 80%** các thao tác CRUD lặp lại, tích hợp sẵn Validation mạnh mẽ và hệ thống Dynamic Search linh hoạt.

## ✨ Tính năng nổi bật

*   **Zero-Boilerplate CRUD**: 
    *   Sử dụng các **Trait Interfaces** (`ICreateController`, `IReadController`, `IUpdateController`, `IDeleteController`) để kích hoạt API chọn lọc.
    *   `AbService`: Xử lý logic nghiệp vụ transaction-safe với các Points of intervention (Hooks).
*   **Dynamic Search & Paging**:
    *   Mặc định hỗ trợ các query params: `page`, `size`, `sort`, `dir`, `search`, `searchField`.
    *   Hỗ trợ lọc nâng cao (Join, Range...) thông qua **Custom Specification**.
*   **Validation System**:
    *   Annotations mạnh mẽ: `@Exists`, `@Unique`, `@IdsExist`, `@EnumValue`, `@PhoneNumber`, `@NoSpecialChars`.
    *   Hỗ trợ **Native SQL Constraint** (`@SqlConstraint`) và **Cross-field Validation** (`@DtoSpecValidation`).
*   **Auto DTO Mapping**: Interface `IDto` tích hợp sẵn logic mapping 2 chiều Entity-DTO tự động qua BeanUtils.
*   **I18n Service**: Tự động xử lý đa ngôn ngữ (Localization) dựa trên header `Accept-Language`.

## 📦 Cài đặt

Thư viện có sẵn trên **Maven Central**.

### Maven
```xml
<dependency>
    <groupId>io.github.natswarchuan</groupId>
    <artifactId>jpa-spring-boot-generic-service</artifactId>
    <version>1.3.5</version>
</dependency>
```

### Gradle
```groovy
implementation 'io.github.natswarchuan:jpa-spring-boot-generic-service:1.3.5'
```

## 🚀 Hướng dẫn nhanh

### 1. Cấu hình Package Scanning (Bắt buộc)
Để Spring có thể quét được các Component và Validator của thư viện, hãy thêm vào lớp Application:

```java
@SpringBootApplication(scanBasePackages = { 
    "com.your.project", 
    "com.natswarchuan.genericservice" 
})
public class DemoApplication { ... }
```

### 2. Entity & Repository
Repository cần extends `JpaSpecificationExecutor`.

```java
@Entity
@Getter @Setter
public class Product {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private BigDecimal price;
}

@Repository
public interface ProductRepository extends JpaRepository<Product, Long>, 
                                           JpaSpecificationExecutor<Product> {
}
```

### 3. Service Layer
```java
@Service
public class ProductService extends AbService<Product, Long> {
    public ProductService(ProductRepository repository) {
        super(repository);
    }
}
```

### 4. Controller Layer (Sử dụng Traits)
```java
@RestController
@RequestMapping("/api/v1/products")
public class ProductController extends AbController<Product, Long>
        implements
        ICreateController<Product, Long, ProductCreateReq>,
        IUpdateController<Product, Long, ProductUpdateReq>,
        IDeleteController<Product, Long>,
        IReadController<Product, Long> {

    public ProductController(ProductService service) {
        super(service);
    }

    @Override
    public <R extends IDto<Product>> Class<R> getResponseSummaryDtoClass() {
        return (Class<R>) ProductRes.class;
    }

    @Override
    public <R extends IDto<Product>> Class<R> getResponseDetailDtoClass() {
        return (Class<R>) ProductDetailRes.class;
    }
}
```

## 📖 Demo & Tài liệu

*   **Demo Project**: Xem thư mục [java-demo](./java-demo) để tham khảo code thực tế đầy đủ.
*   **Documentation Site**: Mở file `docs/index.html` hoặc chạy dự án trong thư mục `docs-html`.

## 👨‍💻 Tác giả

*   **NatswarChuan**

## 📄 License

MIT License.