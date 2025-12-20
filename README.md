# jpa-spring-boot-generic-service

**Thư viện Generic Service cho Spring Boot Application**

Thư viện này cung cấp một tầng Service tiêu chuẩn hóa giúp tự động hóa các thao tác CRUD, tích hợp sẵn Validation mạnh mẽ và đơn giản hóa việc chuyển đổi DTO (Data Transfer Object). Được thiết kế để giảm thiểu boilerplate code và tăng tốc độ phát triển dự án.

## ✨ Tính năng nổi bật

*   **CRUD Toàn diện**: Cung cấp sẵn các phương thức `create`, `update`, `delete`, `findById`, `findAll` (có phân trang và không phân trang) ngay khi khởi tạo.
*   **Validation Mạnh mẽ**:
    *   Tích hợp sẵn các Annotation: `@Exists`, `@Unique`, `@EnumValue`, `@PhoneNumber`, `@NoSpecialChars`.
    *   Hỗ trợ Validation phức tạp với JPA Specification (`@DtoSpecValidation`).
*   **Tìm kiếm Linh hoạt**: Tích hợp sâu với **JPA Specification** cho phép lọc và tìm kiếm dữ liệu động.
*   **Auto DTO Mapping**: Cơ chế tự động chuyển đổi giữa Entity và DTO thông qua interface `IDto`.
*   **Chuẩn hóa Phản hồi**: Cấu trúc `HttpApiResponse` và `PagedResponse` thống nhất cho toàn bộ hệ thống.
*   **Đa ngôn ngữ**: Hỗ trợ Localization ngay từ tầng Service.

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

### Gradle
1. Thêm vào `build.gradle` (root):
```groovy
allprojects {
    repositories {
        ...
        maven { url 'https://jitpack.io' }
    }
}
```

2. Thêm dependency:
```groovy
dependencies {
    implementation 'com.github.NatswarChuan:jpa-spring-boot-generic-service:LATEST_VERSION' // Thay thế bằng version mới nhất
}
```

> **Lưu ý:** Vui lòng kiểm tra **GitHub Releases** để lấy version tag mới nhất.

## 🚀 Hướng dẫn nhanh

### Bước 1: Định nghĩa Entity và DTO
Entity của bạn cần implement interface `IDto<Entity>` để kích hoạt tính năng tự động mapping.

```java
@Entity
public class User {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String username;
    // getters, setters...
}

public class UserRequest implements IDto<User> {
    private String username;

    @Override
    public User toEntity() {
        User user = new User();
        user.setUsername(this.username);
        return user;
    }
}
```

### Bước 2: Tạo Repository
Kế thừa `IGenericRepository`.

```java
@Repository
public interface UserRepository extends IGenericRepository<User, Long> {
}
```

### Bước 3: Tạo Service
Kế thừa `AbService`.

```java
@Service
public class UserService extends AbService<User, Long, UserRepository> {

    public UserService(UserRepository repository) {
        super(repository);
    }
}
```

### Bước 4: Sử dụng trong Controller
Bây giờ bạn đã có đầy đủ các hàm CRUD!

```java
@RestController
@RequestMapping("/api/users")
public class UserController {
    
    private final UserService service;

    public UserController(UserService service) {
        this.service = service;
    }

    @PostMapping
    public HttpApiResponse<User> create(@RequestBody UserRequest request) {
        return HttpApiResponse.success(service.save(request));
    }
    
    @GetMapping
    public HttpApiResponse<PagedResponse<User>> list(Pageable pageable) {
        return HttpApiResponse.success(PagedResponse.of(service.findAll(pageable)));
    }
}
```

## 📖 Tài liệu chi tiết

Vui lòng tham khảo thư mục `docs` trong repository này hoặc trang tài liệu đi kèm để xem hướng dẫn chi tiết về:
*   Các Annotation Validation (`@Exists`, `@Unique`,...).
*   Cách sử dụng `SpecificationLoader`.
*   Xử lý lỗi với `GlobalExceptionHandler`.

## 👨‍💻 Tác giả

*   **NatswarChuan**

## 📄 License

Dự án này được cấp phép theo giấy phép MIT.