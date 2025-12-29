# Generic Service Framework (Spring Boot)

[![Maven Central](https://img.shields.io/maven-central/v/io.github.natswarchuan/jpa-spring-boot-generic-service.svg?label=Maven%20Central)](https://central.sonatype.com/artifact/io.github.natswarchuan/jpa-spring-boot-generic-service)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Clean Architecture Generic Service Framework for Spring Boot**

A powerful, lightweight library providing a standardized Service & Controller layer that **automates 80%** of repetitive CRUD operations, integrates robust validation, and offers a flexible dynamic search system.

---

## 🚀 Key Features

*   **Zero-Boilerplate CRUD**:
    *   **Trait-based Controllers**: Use `ICreateController`, `IReadController`, `IUpdateController`, and `IDeleteController` to selectively enable APIs.
    *   **Standardized Service Layer**: `AbService` handles complex business logic and transactions with a precise, standardized interface.
*   **Dynamic Search & Pagination**:
    *   Built-in support for query parameters: `page`, `size`, `sort`, `dir`, `search`, and `searchField`.
    *   Advanced filtering (Joins, Ranges, etc.) via **Generic Specifications**.
*   **Standardized Lifecycle Hooks**:
    *   Customize behavior at any stage: `beforeCreate`, `afterCreate`, `beforeUpdate`, `afterUpdate`, `beforeDelete`, `afterDelete`, `afterReadEntity`, `afterReadDto`.
*   **Validation System**:
    *   Strong Annotations: `@Exists`, `@Unique`, `@IdsExist`, `@EnumValue`, `@PhoneNumber`.
    *   Complex Logic: Support for **Native SQL Constraints** (`@SqlConstraint`) and **Cross-field Validation** (`@DtoSpecValidation`).
*   **Intelligent DTO Mapping**: `IDto` interface integrates two-way Entity-DTO mapping with support for multi-language responses.
*   **I18n Out-of-the-box**: Automatic multi-language handling based on the `Accept-Language` header.

---

## 📦 Installation

Available on **Maven Central**.

### Maven
```xml
<dependency>
    <groupId>io.github.natswarchuan</groupId>
    <artifactId>jpa-spring-boot-generic-service</artifactId>
    <version>1.3.8</version>
</dependency>
```

### Gradle
```groovy
implementation 'io.github.natswarchuan:jpa-spring-boot-generic-service:1.3.8'
```

---

## 📖 Quick Start

### 1. Enable Package Scanning
Add the base package of the library to your `@SpringBootApplication`:

```java
@SpringBootApplication(scanBasePackages = { 
    "com.your.project", 
    "com.natswarchuan.genericservice" 
})
public class DemoApplication { ... }
```

### 2. Define Entity & Repository
Your repository must extend `JpaSpecificationExecutor<E>`.

```java
@Entity
public class Product {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private BigDecimal price;
}

@Repository
public interface ProductRepository extends JpaRepository<Product, Long>, JpaSpecificationExecutor<Product> { }
```

### 3. Implement Service
Extend `AbService` to inherit all standard CRUD logic.

```java
@Service
public class ProductService extends AbService<Product, Long> {
    public ProductService(ProductRepository repository) {
        super(repository);
    }
}
```

### 4. Implement Controller
Select your CRUD capabilities using Interfaces.

```java
@RestController
@RequestMapping("/api/v1/products")
public class ProductController extends AbController<Product, Long>
        implements ICreateController<Product, Long, ProductReq>,
                   IUpdateController<Product, Long, ProductReq>,
                   IReadController<Product, Long>,
                   IDeleteController<Product, Long> {

    public ProductController(ProductService service) {
        super(service);
    }

    @Override
    public <R extends IDto<Product>> Class<R> getResponseSummaryDtoClass() { return (Class<R>) ProductRes.class; }

    @Override
    public <R extends IDto<Product>> Class<R> getResponseDetailDtoClass() { return (Class<R>) ProductRes.class; }
}
```

---

## 📚 Documentation & Demo

*   **Documentation Site**: Explore the full API documentation and advanced usage in [docs-html/](docs-html/) (run with `npm run dev`) or view the static site in the repository.
*   **Reference Implementation**: See the [java-demo/](java-demo/) folder for a complete project example including custom validations, filters, and data seeding.

---

## 👨‍💻 Author

Developed and maintained by **NatswarChuan**.

## 📄 License

MIT License.
