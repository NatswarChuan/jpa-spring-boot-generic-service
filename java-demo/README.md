# Reference Implementation: Java Demo

This project serves as a comprehensive **Reference Implementation** of the **jpa-spring-boot-generic-service** framework. It demonstrates how to build a production-ready inventory management system with minimal boilerplate while maintaining full control over complex logic.

---

## 🌟 Demo Features

Explore how the framework handles real-world scenarios:

*   **Trait-based API Selective Implementation**:
    *   `CategoryController`: Demonstrates a selective implementation (Read-only + Create).
    *   `ProductController`: Full CRUD implementation including complex search.
*   **Advanced Dynamic Filtering**:
    *   `ProductSpecification`: Custom filtering for price ranges, stock status, and joined table criteria (Brand/Category).
*   **Production-Grade Validation**:
    *   **Unique Constraints**: `ProductCreateReq` uses `@DtoSpecValidation` to ensure name uniqueness within a specific store.
    *   **Referential Integrity**: `@IdsExist` protects against orphaned records during batch operations.
    *   **Enum Safety**: `@EnumValue` ensures input matches predefined domain values.
*   **Framework Integration**:
    *   **Data Seeding**: Shows how to use `DataSeeder` for initial environment setup.
    *   **I18n Strategy**: Localized error messages and response mapping demonstrated in the DTOs.
    *   **Audit Tracking**: Automatic lifecycle hooks manage `createdAt`, `updatedAt`, and user attribution.

---

## 🛠️ System Requirements

*   **Java 17** or higher
*   **Maven 3.6+**
*   **java-core**: The framework core must be installed in your local Maven repository (`~/.m2`).

---

## ⚙️ Setup & Execution

### 1. Build and Install Core Framework
Since this demo tracks the latest local developments, you must first build the core module:

```bash
cd ../java-core
mvn clean install -DskipTests
```

### 2. Run the Demo Application
Navigate back to the demo folder and launch the Spring Boot server:

```bash
cd ../java-demo
mvn spring-boot:run
```

---

## 🔍 Exploration Guide

### API Documentation (Swagger)
Once running, explore and test the endpoints visually:
👉 [http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html)

### Database Exploration (H2 Console)
The demo uses an in-memory H2 database. Inspect the schema and data live:
*   **Console**: [http://localhost:8080/h2-console](http://localhost:8080/h2-console)
*   **JDBC URL**: `jdbc:h2:mem:testdb`
*   **Credentials**: `sa` / `password`

---

## 📁 Key File Map

| Component | Path | Description |
| :--- | :--- | :--- |
| **Entities** | `src/.../domain/*.java` | Domain models with JPA mappings. |
| **DTOs** | `src/.../dto/*.java` | Request/Response models using `IDto`. |
| **Controllers** | `src/.../controller/*.java` | REST endpoints using Traits. |
| **Search Logic** | `src/.../specification/*.java` | Custom dynamic query filters. |
| **Complex Validations** | `src/.../validation/specs/*.java` | Cross-field and DB-level validation rules. |
| **Sample Data** | `src/.../config/DataSeeder.java` | Bootstrapping logic for initial data. |

---

Developed by **NatswarChuan**.
