# jpa-spring-boot-generic-service

[![Maven Central](https://img.shields.io/maven-central/v/io.github.natswarchuan/jpa-spring-boot-generic-service.svg?label=Maven%20Central)](https://central.sonatype.com/artifact/io.github.natswarchuan/jpa-spring-boot-generic-service)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Clean Architecture Generic Service Framework cho Spring Boot**

Thư viện này cung cấp một tầng Service & Controller tiêu chuẩn hóa giúp **tự động hóa 80%** các thao tác CRUD lặp lại, tích hợp sẵn Validation mạnh mẽ và hệ thống Dynamic Search.

## ✨ Tính năng nổi bật

*   **Zero-Boilerplate CRUD**:
    *   `AbController`: Có sẵn toàn bộ API `Create`, `Update`, `Delete`, `FindById`, `FindAll`.
    *   `AbService`: Xử lý logic nghiệp vụ transaction-safe.
*   **Dynamic Search & Paging**:
    *   Mặc định hỗ trợ params: `page`, `size`, `sort`, `dir`, `search`, `searchField`.
    *   Dễ dàng mở rộng với **Specification** pattern.
*   **Validation System**:
    *   Annotations mạnh mẽ: `@Exists`, `@Unique`, `@EnumValue`, `@PhoneNumber`, `@NoSpecialChars`.
    *   Hỗ trợ **Cross-field Validation** (Class-level) thông qua `SpecificationLoader`.
*   **Auto DTO Mapping**: Interface `IDto` tích hợp sẵn logic mapping 2 chiều Entity-DTO.
*   **I18n Service**: Tự động xử lý đa ngôn ngữ dựa trên header `Accept-Language`.

## 📦 Cài đặt

Thư viện đã có mặt trên **Maven Central**.

### Maven
```xml
<dependency>
    <groupId>io.github.natswarchuan</groupId>
    <artifactId>jpa-spring-boot-generic-service</artifactId>
    <version>1.3.0</version>
</dependency>
```

### Gradle
```groovy
implementation 'io.github.natswarchuan:jpa-spring-boot-generic-service:1.3.0'
```

## 🚀 Hướng dẫn nhanh

### 1. Entity & Repository
Repository bắt buộc phải extends `JpaSpecificationExecutor`.

```java
@Entity
@Data
@Table(name = "products")
public class Product {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private Double price;
}

@Repository
public interface ProductRepository extends JpaRepository<Product, Long>, 
                                           JpaSpecificationExecutor<Product> {
}
```

### 2. DTO
Kế thừa `IDto<E>` để mapping tự động.

```java
@Data
public class ProductCreateReq implements IDto<Product> { // Auto map to Entity
    @NotBlank
    @Unique(entity = Product.class, field = "name")
    private String name;
    
    @Min(0)
    private Double price;
    
    // Override toEntity() nếu cần map thêm quan hệ phức tạp
}

@Data
public class ProductResponse implements IDto<Product> { // Auto map from Entity
    private Long id;
    private String name;
    // ...
}
```

### 3. Service Layer
```java
public interface IProductService extends IService<Product, Long> {}

@Service
@Transactional
public class ProductServiceImpl extends AbService<Product, Long> implements IProductService {
    public ProductServiceImpl(ProductRepository repository) {
        super(repository);
    }
}
```

### 4. Controller Layer
Chỉ cần khai báo, **KHÔNG CẦN** viết code CRUD.

```java
@RestController
@RequestMapping("/api/products")
public class ProductController extends AbController<
    Product,            // Entity Class
    Long,               // ID Type
    ProductCreateReq,   // Create DTO
    ProductUpdateReq    // Update DTO
> {
    public ProductController(IProductService service) {
        super(service);
    }

    @Override
    protected Class<ProductResponse> getResponseSummaryDtoClass() { // DTO cho list
        return ProductResponse.class;
    }

    @Override
    protected Class<ProductResponse> getResponseDetailDtoClass() {  // DTO cho detail/create
        return ProductResponse.class;
    }
}
```

-> **Done!** Bây giờ bạn đã có sẵn API:
*   `GET /api/products?page=0&size=10&sort=price&dir=desc&search=iphone&searchField=name`
*   `GET /api/products/{id}`
*   `POST /api/products` (với validation)
*   `PUT /api/products/{id}`
*   `DELETE /api/products/{id}`

## 📖 Demo & Tài liệu

*   **Demo Project**: Xem [java-demo folder](./java-demo) để thấy code thực tế.
*   **Documentation Site**: Mở file `docs/index.html` (sau khi clone) hoặc tham khảo thư mục `docs-html`.

## 👨‍💻 Tác giả

*   **NatswarChuan**

## 📄 License

MIT License.