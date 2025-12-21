# jpa-spring-boot-generic-service

**Thư viện Generic Service cho Spring Boot Application**

Thư viện này cung cấp một tầng Service & Controller tiêu chuẩn hóa giúp tự động hóa các thao tác CRUD, tích hợp sẵn Validation mạnh mẽ và hệ thống Specification Search động. Được thiết kế để giảm thiểu boilerplate code và tăng tốc độ phát triển dự án.

## ✨ Tính năng nổi bật

*   **Clean Architecture**: Cấu trúc phân lớp rõ ràng (Controller -> Service -> Repository).
*   **Zero-Boilerplate CRUD**:
    *   `AbController`: Có sẵn API `create`, `update`, `delete`, `findById`, `findAll` (paging & search).
    *   `AbService`: Xử lý logic nghiệp vụ, transaction và mapping DTO.
*   **Tìm kiếm & Phân trang nâng cao**:
    *   Tự động parse `page`, `size`, `sort`, `search` từ request.
    *   Hỗ trợ Custom Specification dễ dàng.
*   **Validation Mạnh mẽ**:
    *   Tích hợp sẵn các Annotation: `@Exists`, `@Unique`, `@EnumValue`, `@PhoneNumber`.
    *   Tự động validate DTO Input (`@Valid`).
    *   Tự động validate DTO Input (`@Valid`).
*   **Auto DTO Mapping (New)**: Interface `IDto` tích hợp sẵn `BeanUtils.copyProperties`.
*   **Multi-language Support**: Tự động nhận diện header `Accept-Language` (vi, en,...) và truyền vào `IDto.fromEntity` để xử lý đa ngôn ngữ.

## 📦 Cài đặt

Thư viện được phân phối qua **JitPack**.

### Yêu cầu
*   Java 17+
*   Spring Boot 3.x

### Maven
1. Thêm repository JitPack vào `pom.xml`:
```xml
<repositories>
    <repository>
        <id>jitpack.io</id>
        <url>https://jitpack.io</url>
    </repository>
</repositories>
```

2. Thêm dependency:
```xml
<dependency>
    <groupId>com.github.NatswarChuan</groupId>
    <artifactId>jpa-spring-boot-generic-service</artifactId>
    <version>LATEST_VERSION</version> <!-- Thay thế bằng version mới nhất trên GitHub Releases -->
</dependency>
```

## 🚀 Hướng dẫn nhanh

### 1. Entity & Repository
Định nghĩa thực thể và lớp truy cập dữ liệu. Repository buộc phải hỗ trợ `JpaSpecificationExecutor`.

```java
@Entity
@Data
public class Product {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private Double price;
}

@Repository
public interface ProductRepository extends JpaRepository<Product, Long>, JpaSpecificationExecutor<Product> {
}
```

### 2. Service Layer
Chứa logic nghiệp vụ. Kế thừa `AbService` để tái sử dụng toàn bộ các hàm CRUD và Transaction standard.

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

### 3. Controller Layer
Nơi định nghĩa API Endpoint. Kế thừa `AbController` để có ngay 5 API chuẩn (List, Detail, Create, Update, Delete) mà không cần viết code.

```java
@RestController
@RequestMapping("/api/products")
public class ProductController extends AbController<
    Product,            // Entity
    Long,               // ID Type
    ProductCreateReq,   // Create Request (C)
    ProductUpdateReq    // Update Request (U)
> {
    public ProductController(IProductService service) {
        super(service);
    }

    @Override
    protected Class<ProductResponse> getResponseSummaryDtoClass() {
        return ProductResponse.class;
    }

    @Override
    protected Class<ProductResponse> getResponseDetailDtoClass() {
        return ProductResponse.class;
    }
}
```

### 4. Custom Search (Optional)
Nếu cần filter thêm field riêng (ví dụ `minPrice`), hãy override `findAll`:

```java
@Override
@GetMapping
public ResponseEntity<HttpApiResponse<PagedResponse<ProductResponse>>> findAll(ProductRequestParam requestParam) {
    // Override để Spring bind đúng field trong ProductRequestParam
    return super.findAll(requestParam);
}

@Override
protected Specification<Product> getSpecification(BaseRequestParam baseParam) {
    Specification<Product> spec = super.getSpecification(baseParam);
    if (baseParam instanceof ProductRequestParam param && param.getMinPrice() != null) {
        // Add custom logic
    }
    return spec;
}
```

## 📖 Tài liệu chi tiết

Vui lòng tham khảo thư mục `docs-html` trong repository này. Đây là trang tài liệu đầy đủ được viết bằng Vue.js, bao gồm:
*   **Core Architecture**: Sơ đồ luồng dữ liệu.
*   **API List**: Danh sách API mặc định.
*   **Specification**: Hướng dẫn dùng bộ lọc nâng cao.
*   **Validation**: Cách sử dụng custom annotations.

## 👨‍💻 Tác giả

*   **NatswarChuan**

## 📄 License

Dự án này được cấp phép theo giấy phép MIT.