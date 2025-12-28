export default {
    intro: {
        title: 'Introduction',
        p1: 'In the vast landscape of Spring Boot application development, developers often find themselves trapped in a cycle of repetitive tasks — rewriting the same boilerplate code for Controllers, Services, and Repositories for every single entity from User, Product to Order. This redundancy not only slows down the initial development capability but also introduces potential risks regarding maintenance nightmares and inconsistencies across the entire system.',
        p2: '<strong>JPA Spring Boot Generic Service</strong> is the comprehensive answer to this situation. It is a robust architectural framework designed to encapsulate standard CRUD operations, dynamic filtering, and DTO mapping into a highly reusable layer. By simply extending the <code>IController</code> interface, your application instantly inherits a full suite of standardized APIs. You define the structure once, and the framework handles the heavy lifting, allowing you to focus entirely on unique business logic.',
        quote: '"The framework automatically provides a powerful processing engine including CRUD, advanced Validation, and JPA Specification right at the <strong>Service</strong> layer, freeing you from boring tasks to focus entirely on specific business logic."',
        features_title: 'Key Features',
        features: {
            crud: {
                title: 'Generic CRUD Operations',
                desc: 'Provides full basic Create, Read, Update, Delete operations for both Entity and DTO.'
            },
            filter: {
                title: 'Dynamic Filtering (JPA Spec)',
                desc: 'Integrated Generic Specification allows for extremely flexible dynamic data filtering.'
            },
            mapping: {
                title: 'Automatic DTO Mapping',
                desc: 'Two-way DTO - Entity conversion automatically, completely separating Response and Database layers.'
            },
            i18n: {
                title: 'Multi-language (I18n)',
                desc: 'Supports returning data according to requested language (Localization) right at the Service layer.'
            },
            hooks: {
                title: 'Service Hooks',
                desc: 'Provides intervention points (before/after hooks) to easily customize business logic.'
            },
            error: {
                title: 'Standardized Error Handling',
                desc: 'Centralized exception handling triggers, ensuring all APIs always return a consistent error format.'
            }
        },
        pros_title: 'Advantages',
        pros: {
            boilerplate: '<strong>Reduce 80% boilerplate code:</strong> No more writing thousands of lines of repetitive CRUD code.',
            consistency: '<strong>High consistency:</strong> The entire team uses a common standard structure.',
            maintainability: '<strong>Easy to maintain:</strong> CRUD logic is centralized at the framework, fix in one place - apply everywhere.',
            extensibility: '<strong>Flexible extension:</strong> Override any method when complex business logic is needed.'
        },
        cons_title: 'Disadvantages',
        cons: {
            learning_curve: '<strong>Learning curve:</strong> Need to understand Java Generics and the framework\'s hooks structure.',
            abstraction: '<strong>High abstraction:</strong> Sometimes difficult to debug if not familiar with the base code.',
            complexity: '<strong>Limitations when too complex:</strong> Extremely specific business logic still needs separate service writing.'
        },
        security_title: 'Transparency & Safety Commitment',
        security_p1: 'We understand that using a third-party library in a Production project always comes with concerns about <strong>security</strong> and <strong>malicious code</strong>.',
        security_p2: 'To alleviate this concern, the source code of <code>Generic Service</code> is designed to be completely transparent:',
        security_items: {
            opensource: {
                title: 'Open Source 100%',
                desc: 'Entire source code is public. No hidden binary files or obfuscated code.'
            },
            dependencies: {
                title: 'Standard Dependencies',
                desc: 'Uses only standard libraries (Spring Boot, Hibernate, Lombok). No strange dependencies.'
            },
            verify: {
                title: 'Direct Verification',
                desc: 'You are encouraged to view the code directly in the <code>java-core</code> module before using.'
            }
        },
        view_source: 'View Core Source Code on GitHub',
        demo_link: 'View Demo Source Code',
        star_link: 'Star on GitHub',
        switch_lang: 'Switch to Vietnamese'
    },
    arch: {
        title: 'Architecture & Lifecycle',
        subtitle: 'Understand how the internal gears work.',
        diagram_title: 'Architecture Diagram',
        diagram_desc: 'Overview model of the interaction between Controller, Service, and Repository layers.',
        class_hierarchy_title: 'Interface Hierarchy',
        class_hierarchy_desc: 'The framework leverages the interface composition pattern, allowing you to flexibly assemble functionalities like LEGO blocks. Instead of a rigid class hierarchy, you use default methods in interfaces to inherit behaviors (Read, Create, Update, Delete).',
        services: {
            base: 'Contains Utils (Mapping, Logging)',
            read_summary: 'Handles FindAll / Paging',
            read_detail: 'Handles FindOne / ById',
            create: 'Handles Create',
            update: 'Handles Update / Save',
            delete: 'Handles Delete',
            full: 'FULL CRUD + Specification'
        },
        generic_type_title: 'Generic Type System',
        generic_type_desc: 'Robust type safety ensures that data is strictly controlled from the Controller down to the Service layer.',
        table: { type: 'Type', desc: 'Description' },
        types: {
            e: '<strong>Entity Class:</strong> JPA Entity (e.g., Product).',
            id: '<strong>PK Type:</strong> Primary Key Type (e.g., Long, UUID).',
            c_rq: '<strong>Create Request DTO:</strong> Input DTO for creation (implements IDto).',
            u_rq: '<strong>Update Request DTO:</strong> Input DTO for update (implements IDto).'
        },
        lifecycle_title: 'Request Lifecycle',
        lifecycle_desc: 'Data flow when calling API <code>POST /api/v1/products</code>:',
        steps: {
            validation: { title: 'DTO Validation', desc: 'Hibernate Validator checks annotations (@NotBlank, @Exists...) on ProductCreateReq.' },
            mapping: { title: 'Payload Mapping', desc: 'Controller calls service.create(dto.toEntity()) to convert DTO to Entity.' },
            before_hook: { title: 'Before-Hook', desc: 'Hook beforeCreate(entity) is executed to handle pre-persistence business logic.' },
            persistence: { title: 'Persistence', desc: 'Repository saves entity to database via Hibernate.' },
            after_hook: { title: 'After-Hook', desc: 'Hook afterCreate(entity) is triggered (e.g., send mail, log logging).' },
            final_mapping: { title: 'Final Mapping', desc: 'Result is mapped to Response DTO and returned to Client.' }
        }
    },
    install: {
        title: 'Installation',
        intro: 'The framework is designed to be easily integrated into any Spring Boot project via <strong>Maven</strong> or <strong>Gradle</strong>, minimizing configuration effort.',
        requirements: {
            title: 'System Requirements',
            java: 'Java 17 or higher (Required for Records & Sealed Classes)',
            springboot: 'Spring Boot 3.0+ (Jakarta EE 9/10)',
            hibernate: 'Hibernate Validator (Standard)'
        },
        tested_versions: {
            title: 'Tested Versions',
            priority_label: 'Compatibility: ',
            priority_value: 'Verified'
        },
        maven: {
            title: 'Integration via Maven/Gradle',
            comment_xml: '&lt;!-- Add to pom.xml --&gt;',
            comment_version: '&lt;!-- Check LATEST_VERSION at GitHub Releases --&gt;'
        },
        gradle: {
            title: 'Using Gradle',
            comment_file: '// Add to build.gradle',
            comment_version: '// Replace LATEST_VERSION'
        },
        local: {
            title: 'Local Development',
            desc: 'If you want to customize the core or use a version not yet published to Central, install it to your <strong>Local Maven Repository</strong>:',
            comment_cmd: '# 1. Navigate to java-core directory',
            note: 'After this step, your local projects can resolve the dependency purely from the local .m2 folder.'
        },
        config: {
            title: 'Auto-Configuration',
            desc: 'Thanks to Spring Boot\'s <strong>Auto Configuration</strong> mechanism, components (Services, Controllers, Repositories) in the library are automatically scanned and registered. You <strong>do not</strong> need to manually add <code>@ComponentScan</code>.',
            comment_package: '// Application class',
            comment_lib: ''
        },
        important: '<strong>Tip:</strong> Always check the latest version at'
    },
    quick_start: {
        title: 'Quick Start',
        explain_label: 'Explanation',
        intro: 'Build a fully functional CRUD API for a <code>Product</code> resource in under 5 minutes. This guide uses <strong>Lombok</strong> to keep the code concise.',
        steps: {
            entity: { title: 'Define Entity', desc: 'A standard JPA Entity representing the <strong>Product</strong> resource.' },
            repo: { title: 'Create Repository', desc: 'Extend <code>IRepository</code> to inherit standard database operations.', comment: '// No implementation needed for basic CRUD' },
            dto: {
                title: 'Define DTOs',
                desc: 'Implement <code>IDto&lt;E&gt;</code> for automatic mapping. Create separate DTOs for Create, Update, and Response to ensure security.',
                comment_create: '// 1. Create Request',
                comment_update: '// 2. Update Request',
                comment_res: '// 3. Response DTO'
            },
            service: { title: 'Implement Service', desc: 'Implement <code>IService</code> to provide business logic. Override <code>getRepository()</code> to link the repository.', comment: '// Interface implementation automatically provides default CRUD methods' },
            controller: {
                title: 'Implement Controller',
                desc: 'Implement <code>IController</code> to expose REST APIs. Link the service and specify the DTO classes for response mapping.',
                comment_summ: '// DTO for List responses',
                comment_detail: '// DTO for Detail responses'
            }
        },
        more_info: 'Want to dive deeper into custom validation or advanced filtering?',
        view_details: 'View detailed guide'
    },
    entity_repo: {
        title: 'Entity & Repository Layer',
        subtitle: 'Establish the data foundation for your application.',
        entity: {
            title: 'Define Entity',
            desc: 'Start by defining a standard <strong>JPA Entity</strong> that reflects your database schema. The framework supports all ID types including <code>Long</code>, <code>String</code>, and <code>UUID</code>.',
            required: 'REQUIRED',
            optional: 'OPTIONAL',
            annotations: {
                entity: 'Marks the class as a persistent Java entity.',
                table: 'Specifies the table name and indexes for performance optimization.',
                nationalized: 'Ensures Unicode support (NVARCHAR) for SQL Server.',
                builder: 'Enables the <strong>Builder pattern</strong> for cleaner object creation.'
            },
            code: {
                comment: 'Entity representing a Product resource.',
                comment_helper: '// Helper method to manage Many-to-Many relationships via @Transient'
            }
        },
        repo: {
            title: 'Implement Repository',
            diagram: {
                standard: 'Standard CRUD',
                advanced: 'Advanced Filters & Search',
                ready: 'Unified Interface',
                required: 'Required by Service'
            },
            desc: 'Instead of extending standard Spring Interfaces, extend <code>IRepository</code>. This single interface brings together <strong>CrudRepository</strong>, <strong>JpaRepository</strong>, and <strong>JpaSpecificationExecutor</strong>, equipping your layer with both basic operations and advanced dynamic filtering capabilities immediately.',
            note: '<strong>Note:</strong> Your repository <strong>MUST</strong> extend <code>IRepository</code> to compatibility with the framework\'s Service layer.'
        }
    },
    dtos: {
        title: 'Data Transfer Objects (DTO)',
        subtitle: 'Decouple your API contract from your Database schema.',
        req: {
            title: 'Request DTO',
            desc: 'Separate <strong>Create</strong> and <strong>Update</strong> DTOs to enforce strict control over input data (e.g., allow `status` update but forbid `username` change). Implement <code>IDto&lt;E&gt;</code> to enable automatic conversion.'
        },
        res: {
            title: 'Response DTO',
            desc: 'Shape the data returned to clients. By implementing <code>IDto</code>, the framework can automatically map Entity fields to DTO fields using <code>BeanUtils</code>.',
            tips: '<strong>Tip:</strong> If DTO field names match Entity field names, you <strong>DO NOT</strong> need to write any manual mapping code.'
        },
        i18n: {
            title: 'Multi-language Support',
            desc: 'The framework supports on-the-fly localization. Override <code>fromEntity(entity, language)</code> to return different data based on the client\'s <code>Accept-Language</code> header.'
        },
        code: {
            comment_convert: '// Convert DTO to Entity\n        // 1. Auto-copy simple fields\n        // 2. Handle complex relationships (categoryIds -> Set<Category>)',
            comment_update: '// 1. IMPORTANT: Call super to copy basic fields first\n        // 2. Safely update Many-to-Many relationships',
            comment_auto: '// No code needed! Fields like "name", "price" are copied automatically.',
            comment_i18n: '// Logic to return localized content based on "language" param'
        }
    },
    service_layer: {
        title: 'Service Layer',
        subtitle: 'Handle business logic and integrate life-cycle hooks.',
        base: {
            title: 'Choose Your Interfaces',
            desc: 'The framework adopts a <strong>"Interface Composition"</strong> approach. Instead of extending a monolithic base class, you implement only the interfaces you need. This keeps your service lightweight and focused.',
            menu: {
                read_summary: { question: 'Need standard list & pagination?', features: 'exists, count' },
                read_detail: { question: 'Need to view details by ID?', features: 'findById, findOne' },
                create: { question: 'Handle creation?' },
                update: { question: 'Handle updates?' },
                delete: { question: 'Handle deletions?' },
                full: { title: 'IService (Full CRUD)', desc: 'The aggregator interface including ALL features.', rec: 'Recommended' }
            },
            code_comment: '// Example: Service implements IService for full CRUD features'
        },
        hooks: {
            title: 'Lifecycle Hooks',
            desc: 'The <strong>Default Methods</strong> in interfaces come with built-in "Hook" points. You can override these methods in your Service to inject custom logic without rewriting the core CRUD flow.',
            timeline: {
                write_flow: 'Write Flow (Create/Update/Delete)',
                read_flow: 'Read Flow',
                input: 'Entity from Controller',
                repo_action: 'Save / Delete to DB',
                repo_read: 'Get raw data from Database',
                map_dto: 'Convert Entity -> DTO'
            },
            hooks_list: 'Available Hooks:',
            code_comment_before: '// Automatically calculate price before saving',
            code_comment_after: '// Send notification after successful creation',
            code_javadoc_desc: 'Service handling business logic for Product.',
            code_javadoc_extends: 'Implement IService to leverage built-in CRUD default methods.'
        }
    },
    controller_layer: {
        title: 'Controller Layer',
        subtitle: 'Expose APIs simply by implementing interfaces.',
        hierarchy: {
            title: 'Interface Composition',
            desc: 'The Controller Layer uses an <strong>"Interface Composition"</strong> pattern. You are not forced to extend a specific class. Instead, you declare the capabilities (Traits) you want your controller to have.',
            base_desc: 'Root Interface',
            abstract_desc: 'Aggregator Interface',
            implements: 'implements',
            diagram: {
                available_traits: 'Available Traits',
                standard: 'Standard',
                custom: 'Custom',
                inherits: 'Inherits <strong>ALL</strong> traits automatically.',
                selected: 'Only selected traits are exposed.'
            }
        },
        core: {
            title: 'Standard Controller',
            desc: 'To create a standard REST Controller, implement the <code>IController</code> interface. This aggregator interface inherits all CRUD traits, giving you a full set of APIs immediately.',
            note: '<strong>Requirement:</strong> You must override `getBaseService()` (to provide the business logic) and DTO class getters (to define the response format).'
        },
        traits: {
            title: 'Controller Traits',
            desc: 'Each interface (Trait) maps directly to specific REST endpoints. You can mix and match them to define the exact surface area of your API.',
            mix_match_title: 'Mix & Match Strategies:',
            read_only: {
                title: 'Read-Only Controller',
                desc: 'Expose data for viewing only (e.g., Public Catalog, Audit Logs).'
            },
            append_only: {
                title: 'Append-Only Controller',
                desc: 'Allow adding new data but forbid modification (e.g., Interaction Logs, IoT Data).'
            },
            table: {
                header: { trait: 'Interface (Trait)', endpoint: 'Enabled Endpoints', usecase: 'Use Case' },
                read_summary: { title: 'IReadSummaryController', usecase: 'List (Pagination), Sort & Filter' },
                read_detail: { title: 'IReadDetailController', usecase: 'View detailed record by ID' },
                create: { title: 'ICreateController', usecase: 'Create new resources' },
                update: { title: 'IUpdateController', usecase: 'Full update (PUT) or Partial (PATCH)' },
                delete: { title: 'IDeleteController', usecase: 'Delete (Soft or Hard) by ID' }
            },
            tip: '<strong>Pro Tip:</strong> You can apply this same "Interface Composition" to your <strong>Service Layer</strong> too! If your Controller is Read-Only, your Service only needs to implement <code>IReadService</code>, staying lightweight.'
        },
        custom: {
            title: 'Custom API',
            desc: 'You are free to add custom endpoints using standard Spring MVC annotations alongside the generic ones.'
        },
        code: {
            comment_class: '// Implement IController to get FULL CRUD operations',
            comment_summ: 'Define DTO class for List API',
            comment_detail: 'Define DTO class for Detail API',
            comment_readonly: '// Implement Read Interfaces -> READ APIs only',
            comment_public: '// Public API -> Read & Create allowed, No Update/Delete',
            comment_custom_filter: '// Reuse base service logic'
        }
    },
    validation: {
        title: 'Validation System',
        subtitle: 'Powerful input data validation mechanism, integrated with Spring Validation. Ensures clean data before entering Business Logic.',
        strategy: {
            level1: { title: 'Basic Constraints', desc: 'Format check, length, null...' },
            level2: { title: 'Business Logic', desc: 'Complex validation dependent on multiple fields.' },
            level3: { title: 'Database Check', desc: 'Strict constraints at Database level.' }
        },
        basic: {
            title: 'Basic Constraints',
            desc: 'Annotations checking format or simple constraints.',
            exists_unique: { title: '@Exists & @Unique', desc: 'Check for data existence in Database.' },
            enum_value: { title: '@EnumValue', desc: 'Check if String/Int value is in Enum constants.' },
            phone_format: { title: '@PhoneNumber & @NoSpecialChars', desc: 'Validate phone number and special characters.' },
            ids_exist: { title: '@IdsExist', desc: 'Check if list (Set, List) of IDs exist in Database.' }
        },
        custom: {
            title: 'Custom Validator',
            desc: 'Use <strong>Specification</strong> to perform complex validations.',
            spec: { title: '@SpecValidation (Field Level)', desc: 'Validate on a specific field.' },
            dto_spec: { title: '@DtoSpecValidation (Class Level)', desc: 'When validation logic depends on <strong>multiple fields</strong>. Example: Validate Model and Category must belong to selected Brand.' },
            loader_label: 'Implement Loader:'
        },
        advanced: {
            title: 'Native SQL Constraints',
            desc: 'Use <strong>Native SQL</strong> for ultra-complex validation directly at the database level. Supports <strong>Dynamic Variable Binding</strong> from multiple sources.',
            sql: {
                title: '@SqlConstraint',
                desc: 'Binds <code>:value</code> to the current field' +
                    '<br/>• <strong>path/id</strong>: Path Variable (e.g. /users/{id})' +
                    '<br/>• <strong>param/type</strong>: Query Parameter (?type=X)' +
                    '<br/>• <strong>field/categoryId</strong>: Another field in the DTO' +
                    '<br/>• <strong>header/X-Token</strong>: Request Header'
            },
        },
        code: {
            comment_exists: '// Parent Category ID must EXIST in categories table',
            comment_unique: '// Category name must be UNIQUE',
            comment_enum: '// Value must be "ACTIVE", "INACTIVE" or "BANNED"',
            comment_phone: '// Phone number must align with international format',
            comment_chars: '// Username must not contain special characters',
            comment_ids: '// Category list must exist',
            comment_spec_ids: '// Validate if ID list exists in DB (use IN clause)',
            comment_dto_msg: '// Product with this name already exists in the selected store',
            comment_loader: '// Check duplicate: Same Name AND Same Store',
            comment_sql: '// Brand does not support all categories of the selected Model'
        }
    },
    specification: {
        title: 'Specification & Dynamic Search',
        subtitle: 'Build flexible, high-performance search APIs with zero boilerplate.',
        default: {
            title: 'Integrated Search API',
            desc: 'By implementing <code>IController</code>, you instantly have a <code>GET /api/products</code> API supporting paging, sorting, and basic search <strong>without writing extra code</strong>.',
            params_title: 'Supported Query Parameters',
            params: {
                page: 'Page number (starts at 0). Use <code>-1</code> to fetch all records. Default: 0',
                size: 'Records per page (Max: 200). Default: 10',
                sort: 'Sort field (e.g. price).',
                dir: 'Sort direction (asc/desc).',
                search: 'Search keyword (matches <code>LIKE %keyword%</code>)',
                searchField: 'Field to search (e.g. name, code). <strong>Required</strong> if using search.'
            },
            example_title: 'Example Usage:',
            example_explain: '-> Get page 0, 20 items, sort by price descending, find products with name containing "iphone".'
        },
        custom: {
            title: 'Custom Filter (Advanced)',
            desc: 'When you need complex filters (e.g. price range, filter by category), leverage <code>GenericSpecification</code> to build dynamic JPA queries based on your custom Request Params.',
            step1: { title: 'Step 1: Create Custom Request Param', desc: 'Extend <code>BaseRequestParam</code> to add your specific filter fields (e.g., minPrice, maxPrice).' },
            step2: { title: 'Step 2: Implement Custom Specification', desc: 'Create a class extending <code>GenericSpecification&lt;E&gt;</code> and override <code>toPredicate</code> to handle your custom logic.' },
            step3: { title: 'Step 3: Link in Controller', note: '<strong>Tip:</strong> Simply override <code>getSpecification</code> to switch to your custom search engine.' }
        },
        code: {
            comment_field_brand: '// Filter by Brand name (Join)',
            comment_reuse: '// 1. Reuse logic default',
            comment_price: '// 2. Custom logic: Price Range',
            comment_join: '// 3. Custom logic: Join Brand',
            comment_override_findall: '// 1. Override findAll to bind correct Param class',
            comment_use_custom: '', // Intentionally left blank or can be added if needed
            comment_override_spec: '// 2. Override getSpecification to return custom Specification',
            comment_return_spec: '// Return ProductSpecification to handle advanced filter logic (minPrice, brandName, etc)'
        }
    },
    response_handling: {
        title: 'Response Handling',
        subtitle: 'Consistent response structure and centralized error handling mechanism.',
        structure: {
            title: 'Response Structure',
            desc: 'The library provides 2 standard wrapper classes: <code>HttpApiResponse</code> for single objects/lists and <code>PagedResponse</code> for pagination.',
            json_title: 'JSON Structure (HttpApiResponse)',
            paged_title: 'PagedResponse (Pagination)',
            paged_desc: 'Replaces default <code>Page&lt;T&gt;</code> to customize fields.'
        },
        exception: {
            title: 'Exception Handling',
            desc: 'Use <code>HttpException</code> to throw errors from Service/Controller. <code>GlobalExceptionHandler</code> will automatically catch and return standard format.',
            throw_title: 'Throw Exception',
            standard_title: 'Standard Response'
        },
        code: {
            comment_status: '// HTTP Status Code',
            comment_msg: '// Human readable message',
            comment_success_flag: '// Success status flag',
            comment_payload: '// Detailed Payload',
            comment_success: '// 1. Return success',
            comment_manual_error: '// 2. Return manual error (rarely used, usually throw Exception)',
            comment_call_service: '// 1. Call Service to get Page<DTO>',
            comment_wrap: '// 2. Wrap in PagedResponse & HttpApiResponse',
            comment_throw: '// Throw error with Custom Status Code and Message',
            msg_success: '"Success"',
            msg_not_found: '"Product not found"',
            msg_user_not_found: '"User not found with ID: " + id',
            msg_user_404: '"User not found with ID: 123"'
        }
    },
    api_list: {
        title: 'Base Service Methods',
        subtitle: 'Comprehensive list of <strong>CRUD</strong> operations and utility methods provided by the framework to accelerate development and eliminate boilerplate code.',
        table: {
            signature: 'Method Signature',
            desc: 'Description & Return'
        },
        read: {
            recommend: '★ RECOMMENDED',
            title: 'Read Services',
            detail_title: 'IReadDetailService',
            detail_subtitle: '(Single Entity Lookup)',
            summary_title: 'IReadSummaryService',
            summary_subtitle: '(List & Search)',
            summary_note: '<strong>Recommended:</strong> Always prioritize using methods that accept <code>Pageable</code> parameters.',
            items: {
                findById_entity: 'Retrieve a single <strong>Entity</strong> by its primary key. Throws <code>HttpException</code> (404) if not found.',
                findById_dto: 'Fetch an entity by ID and immediately transform it into a <code>DTO</code> for the response.',
                findById_dto_lang: 'Fetch data by ID and map to a <strong>Multi-language</strong> supported DTO.',
                findById_spec: 'Find a single <code>DTO</code> based purely on dynamic <code>Specification</code> criteria.',
                findById_spec_lang: 'Find a <strong>Multi-language</strong> DTO using a combination of <code>ID</code> and additional <code>Specification</code> filters.',
                findOne_entity: 'Retrieve the first <strong>Entity</strong> that matches the provided <code>Specification</code>.',
                findOne_dto: 'Retrieve a single <code>DTO</code> based on dynamic criteria.',
                findOne_dto_lang: 'Retrieve a single multi-language <code>DTO</code> using dynamic criteria.',
                findAll_page_spec_dto: '<strong>Power Search:</strong> Fetches a paginated, sorted, and filtered list transformed into <code>DTOs</code>.',
                findAll_page_spec_lang: 'Full dynamic search returning a <strong>Multi-language</strong> paginated DTO list.',
                findAll_page_spec_entity: 'Fetch a paginated list of raw <strong>Entities</strong> based on search criteria.',
                findAll_list: 'Retrieve <strong>all</strong> records in the database as raw entities (use with caution for large tables).',
                findAll_list_dto: 'Retrieve <strong>all</strong> records transformed into a list of DTOs.',
                findAll_list_dto_lang: 'Retrieve <strong>all</strong> records as multi-language DTOs.',
                findAll_list_spec: 'Fetch all entities matching criteria without pagination.',
                findAll_list_spec_dto: 'Fetch all matching records as DTOs without pagination.',
                findAllById: 'Retrieve a collection of entities for a given set of <code>IDs</code>.',
                findAllById_dto: 'Fetch multiple records by IDs and return as a DTO list.',
                findAllById_dto_lang: 'Fetch multiple records by IDs as multi-language DTOs.',
                findAll_page_simple: 'Standard pagination (page/size) returning raw entities.',
                findAll_page_dto: 'Standard pagination (page/size) returning DTOs.',
                findAll_page_dto_lang: 'Standard pagination with multi-language support.',
                findAll_page_spec_dto_simple: 'Legacy pagination helper with Specification support.',
                findAll_page_spec_dto_lang_simple: 'Legacy pagination helper with Multi-language & Spec.',
                count: 'Count the total number of records matching the given criteria.',
                exists: 'Check if at least one record exists matching the criteria.'
            }
        },
        write: {
            title: 'Write Services',
            create_title: 'ICreateService',
            update_title: 'IUpdateService',
            delete_title: 'IDeleteService',
            items: {
                create_entity: 'Persist a new <code>Entity</code> directly to the database.',
                create_dto: 'Map input <code>DTO</code> to Entity and save it.',
                create_res: 'Create a new record and return it as a specific <code>DTO</code> view.',
                create_dto_res: 'Receive a DTO, create the record, and return success via a different DTO view.',
                create_dto_dto: 'Shorthand for creating from DTO and returning a DTO response.',
                update_entity_id: 'Update an existing <code>Entity</code> found by its unique ID.',
                update_entity: 'Persist changes to an entity object (assumes ID is already set).',
                save_entity: 'Dynamic <strong>Upsert</strong>: Save new record or update existing one.',
                update_dto_id: 'Update record using data from a <code>DTO</code> find by ID.',
                update_entity_res: 'Update entity and return result as a DTO.',
                save_entity_res: 'Upsert record and return result as a DTO.',
                update_dto_res: 'Update from DTO and return result as a DTO.',
                save_dto_res: 'Upsert from DTO and return result as a DTO.',
                update_id_res: 'Update record by ID and return its new state as a DTO.',
                update_req_res: '<strong>Clean Pattern:</strong> Update using a Request DTO and return a Response DTO.',
                update_bulk: 'Update multiple records matching a <code>Specification</code>.',
                delete_id: 'Permanently remove a record by its <strong>Primary Key</strong>.',
                delete_entity: 'Remove a specific entity instance from the database.',
                delete_res: 'Delete record and return its final state as a DTO.',
                delete_dto_res: 'Delete using DTO info and return DTO response.',
                delete_id_res: 'Delete by ID and return the deleted data as a DTO.',
                delete_spec: 'Bulk delete all records matching dynamic criteria.'
            }
        },
        hooks: {
            title: 'Service Lifecycle Hooks',
            desc: 'Hooks are the primary extension points for injecting business logic. They allow you to intervene at specific stages of the <strong>CRUD</strong> lifecycle without overriding the entire method implementation.',
            read: {
                title: 'Lookup & Search Hooks',
                entity_phase: '1. Entity Phase',
                entity_desc: 'Executed immediately after data is fetched from the DB. Best for computing transient fields or initializing <code>Lazy</code> collections.',
                dto_phase: '2. DTO Phase',
                dto_desc: 'Executed after the Entity is mapped to a DTO. Best for adding <strong>UI-specific</strong> data or formatting.'
            },
            create: {
                title: 'Creation Hooks',
                before: '<strong>Before:</strong> Server-side validation, setting defaults, or pre-processing values.',
                after: '<strong>After:</strong> Triggering side-effects like Email notifications or Audit logging.'
            },
            update: {
                title: 'Update Hooks',
                before: '<strong>Before:</strong> Integrity checks, manual versioning, or updating "last modified" fields.',
                after: '<strong>After:</strong> Cache invalidation or synchronizing with external systems.'
            },
            delete: {
                title: 'Deletion Hooks',
                before: '<strong>Before:</strong> Referential integrity checks or soft-delete logic preparation.',
                after: '<strong>After:</strong> Post-cleanup tasks or related resource removal.'
            },
            code_comment_logic: '// Custom logic: check business constraints, set default values...',
            code_error_price: 'Price must be positive'
        }
    },
    notes: {
        title: 'Important Notes',
        subtitle: 'Key notes to use the framework effectively and avoid common pitfalls.',
        modularity: {
            title: 'Modularity Strategy',
            desc: 'Instead of creating giant "God Classes", apply the <strong>"Right-sizing"</strong> strategy (use only what\'s needed) for both Controllers and Services.',
            controller_title: 'Controller Layer',
            controller_desc: 'Use <strong>Traits (Interface)</strong> mechanism to assemble APIs.',
            controller_link: 'See Traits Menu at Section 8.3',
            service_title: 'Service Layer',
            service_desc: 'Choose the right <strong>Base Class</strong> to limit DB access.',
            service_link: 'See Base Class Selector at Section 7.1'
        },
        advanced: {
            title: 'Advanced Patterns',
            desc: 'Maximize the power of inheritance and generics to build flexible systems.',
            composite: {
                title: 'Composite Service (Aggregator)',
                desc: 'Do not try to stuff everything into one Generic Service. Create an "Aggregator" Service to call multiple generic services.'
            },
            soft_delete: {
                title: 'Global Soft Delete Logic',
                desc: 'Implement soft delete (not physical delete from DB) in two common ways:',
                method1_title: 'Method 1: Override at Service Layer',
                method1_desc: 'Suitable when you want centralized delete logic control at Service.',
                method2_title: 'Method 2: Use Hibernate Annotation at Entity',
                method2_desc: 'Transparent, automatically applied to all queries (Find, List, etc.).',
                hibernate_old: '// Hibernate <= 6.2 uses @Where(clause = "deleted = false")',
                hibernate_new: '// Hibernate 6.3+'
            },
            filter: {
                title: 'Complex Dynamic Filtering (Full Spec)',
                desc: 'When you need advanced filtering (price range, complex table joins), combine <code>Custom Param</code> and <code>Custom Specification</code>.'
            }
        },
        best_practices: {
            title: 'Best Practices',
            constructor_title: 'DTO Constructor',
            constructor_desc: 'All DTOs must have a <strong>Public No-Args Constructor</strong> for Reflection to work.',
            override_title: 'Override Method',
            override_create: 'override <code>toEntity()</code>',
            override_update: 'override <code>updateEntity()</code>',
            override_res: 'override <code>fromEntity()</code>',
            optimization_title: 'Optimization Tips',
            opt_index: 'Index <code>@JoinColumn</code> columns.',
            opt_lazy: 'Always use <code>FetchType.LAZY</code> for To-Many relationships.'
        },
        troubleshooting: {
            title: 'Troubleshooting',
            n1_title: 'N+1 Query Issue',
            n1_method1: 'Method 1: Use EntityGraph',
            n1_method2: 'Method 2: Use Specification fetch',
            over_fetching_title: 'Over-fetching Issue',
            over_fetching_method: 'Split physical table (OneToOne Lazy)'
        },
        code: {
            trait_read: '// 1. Trait Read',
            trait_base: '// 2. Base',
            inject_service: '// Inject Service (can be ReadOnlyService)',
            only_methods: '// Only has methods: findById, findAll, findOne...',
            no_methods: '// No: create, update, delete',
            has_methods: '// Has: create, update, save, find...',
            no_delete: '// NO: delete',
            only_fetch: '// Only fetch when return type is not count (Long)',
            split_column: '// Split heavy column to table "product_details"',
            important_fetch: '// Important: fetch = LAZY and optional = false',
            heavy_column: '// Heavy column',
            use_findbyid: '// Leverage built-in findById of Generic Service',
            business_logic: '// Execute aggregate business logic...',
            soft_delete_logic: '// Soft delete logic',
            param_filter: '// 1. Request Param supports diverse filters',
            spec_join: '// 2. Specification handles Join and Range',
            leverage_search: '// Leverage basic search logic of framework'
        }
    },
    app: {
        title: 'Generic Service',
        search_placeholder: 'Search...',
        author: 'Author',
        menu: {
            intro: 'Introduction',
            intro_solution: 'Solution',
            intro_features: 'Key Features',
            intro_pros_cons: 'Pros & Cons',
            intro_security: 'Security & Transparency',

            architecture: 'Architecture & Lifecycle',
            architecture_diagram: 'Architecture Diagram',
            framework_spec: 'Class Hierarchy',
            generic_system: 'Generic Type System',
            request_lifecycle: 'Request Lifecycle',

            installation: 'Installation & Configuration',
            installation_maven: 'Maven/Gradle Config',
            installation_local: 'Local Environment',
            installation_config: 'App Configuration',

            quick_start: 'Quick Start',

            core_entity_repo: 'Entity & Repository',
            core_entity: 'Define Entity',
            core_repo: 'Implement Repository',

            dtos: 'Data Transfer Objects (DTO)',
            dto_request: 'Request DTO',
            dto_response: 'Response DTO',
            dto_i18n: 'Multi-language Support',

            service_layer: 'Service Layer',
            core_service: 'Base Class Selector',
            service_hooks: 'Lifecycle Hooks',

            controller_layer: 'Controller Layer',
            controller_hierarchy: 'Class Hierarchy',
            core_controller: 'Standard Controller',
            controller_traits: 'Controller Traits (Modular)',
            custom_api: 'Custom API',

            validation: 'Validation System',
            val_basic: 'Basic Constraints',
            val_custom: 'Custom Validator',
            val_advanced: 'Native SQL Constraints',

            specifications: 'Specification & Search',
            spec_default: 'Built-in Search API',
            spec_custom: 'Custom Filter (Advance)',

            response_handling: 'Response Handling',
            res_structure: 'Response Structure',
            res_exception: 'Exception Handling',

            api_list: 'Base Service Methods',
            api_read: 'Read Operations',
            api_write: 'Write Operations',
            api_hooks: 'Service Hooks',

            notes: 'Important Notes',
            notes_modularity: 'Modularity Strategy',
            notes_advanced: 'Advanced Patterns',
            notes_best_practices: 'Best Practices',
            notes_troubleshooting: 'Troubleshooting'
        },
        keywords: {
            intro: 'Generic Service Framework, CRUD solution, boilerplate code, Spring Boot Backend',
            architecture: 'Technical spec, request flow, generic structure',
            installation: 'Maven Central, project integration, repository',
            quick_start: 'Quick start guide, copy paste code example, 5 step tutorial',
            core_entity_repo: 'Database mapping, JPA, Product module',
            dtos: 'DTO Model, API separation',
            service_layer: 'Business logic, ServiceImpl, AbService',
            controller_layer: 'API endpoints, RestController',
            validation: 'Input check, constraints',
            specifications: 'Dynamic query, complex filters',
            response_handling: 'Final results, standard format',
            api_list: 'AbService methods, CRUD API reference',
            notes: 'Tips, best practices'
        }
    },
    validation_messages: {
        product_name_required: 'Name is required',
        product_price_non_negative: 'Price must be non-negative',
        product_categories_not_found: 'Given categories do not exist',
        product_categories_some_not_found: 'One or more categories do not exist',
        product_name_store_exists: 'Product with this name already exists in the selected store',
        category_parent_not_found: 'Parent category does not exist',
        category_name_exists: 'Category name already exists',
        user_status_invalid: 'Invalid status',
        profile_phone_invalid: 'Phone number does not match international format',
        profile_username_special_chars: 'Username must not contain special characters',
        brand_model_category_invalid: 'Brand does not support all categories of the selected Model'
    }
}
