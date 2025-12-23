# Java Demo - Generic Service Reference Implementation

Dự án này là một ví dụ mẫu (Reference Implementation) hoàn chỉnh sử dụng thư viện **jpa-spring-boot-generic-service**. Nó mô phỏng một hệ thống quản lý kho hàng/sản phẩm cơ bản.

## 🚀 Tính năng nổi bật trong Demo

Dự án demo này minh họa các khả năng chính của framework:

*   **Trait-based Controllers**: Xem `ProductController`, `CategoryController` để thấy cách implement chọn lọc các API (chỉ Read, Full CRUD, hoặc Custom).
*   **Advanced Dynamic Filtering**: Xem `ProductSpecification` và `ProductFilterParam` để thấy cách xây dựng bộ lọc phức tạp (Price Range, Join tables).
*   **Complex Validations**:
    *   `@DtoSpecValidation`: Kiểm tra tính duy nhất (Name + StoreId) trong `ProductCreateReq`.
    *   `@SqlConstraint`: Kiểm tra ràng buộc logic giữa Model và Brand trong `BrandUpdateReq`.
    *   `@IdsExist`: Kiểm tra danh sách ID tồn tại trong database.
*   **Data Seeding**: Tự động tạo dữ liệu mẫu khi khởi chạy ứng dụng (`DataSeeder`).
*   **Audit Logging**: Metadata tự động (`createdAt`, `updatedAt`, `createdBy`).

## 🛠️ Yêu cầu hệ thống

*   Java 17 trở lên
*   Maven 3.6+
*   Lớp thư viện lõi (**java-core**) đã được cài đặt vào local Maven repository.

## ⚙️ Hướng dẫn cài đặt

### 1. Cài đặt thư viện java-core (Bắt buộc)
Do dự án demo phụ thuộc vào bản build local của framework, bạn cần cài đặt thư viện core trước:

```bash
cd ../java-core
mvn clean install
```

### 2. Chạy dự án Demo
Di chuyển vào thư mục `java-demo` và chạy lệnh:

```bash
mvn spring-boot:run
```

## 🔍 Khám phá

### API Documentation (Swagger UI)
Sau khi ứng dụng khởi chạy, bạn có thể truy cập vào:
👉 [http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html)

### Database Console (H2)
Demo sử dụng cơ sở dữ liệu H2 lưu trên bộ nhớ (In-memory). Để kiểm tra dữ liệu trực tiếp:
*   URL: [http://localhost:8080/h2-console](http://localhost:8080/h2-console)
*   JDBC URL: `jdbc:h2:mem:testdb`
*   User: `sa`, Password: `password`

## 📁 Cấu trúc quan trọng

*   `src/main/java/com/example/demo/domain`: Chứa các JPA Entities.
*   `src/main/java/com/example/demo/dto`: Chứa các Request/Response DTOs tích hợp `IDto`.
*   `src/main/java/com/example/demo/controller`: Chứa các Controller kế thừa từ `AbController`.
*   `src/main/java/com/example/demo/specification`: Logic lọc dữ liệu tùy chỉnh.
*   `src/main/java/com/example/demo/validation/specs`: Logic validation phức tạp.
