export default {
    intro: {
        title: '1. Introduction',
        p1: 'In the modern <strong>Spring Boot</strong> ecosystem, building management applications (Admin/CMS/ERP) often involves a large amount of repetitive tasks. <strong>Generic Service Framework</strong> was created as a foundational solution to help <strong>Java Backend</strong> developers encapsulate the entire core business logic process right from the project initiation phase.',
        p2: 'Instead of manually writing hundreds of lines of boilerplate code, now with just a few simple configuration steps and inheriting from Abstract Base classes like <code>AbService</code> or <code>AbController</code>, you will instantly possess <strong>5 standard APIs</strong> (List, Detail, Create, Update, Delete) ready for use.',
        quote: '"The framework automatically provides a powerful processing engine including CRUD, advanced Validation, and JPA Specification right at the <strong>Service</strong> layer, freeing you from boring tasks to focus entirely on specific business logic."',
        features_title: '1.2 Key Features',
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
        pros_title: '1.3 Advantages',
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
        title: '2. Architecture & Lifecycle',
        subtitle: 'Technical specification of the framework and request processing flow.',
        diagram_title: '2.1 Architecture Diagram',
        diagram_desc: 'Overview model of the interaction between Controller, Service, and Repository layers.',
        class_hierarchy_title: '2.2 Class Hierarchy',
        class_hierarchy_desc: 'Designed according to a layered model, clearly separating responsibilities between types of operations (Read, Create, Update, Delete).',
        services: {
            base: 'Contains Utils (Mapping, Logging)',
            read_summary: 'Handles FindAll / Paging',
            read_detail: 'Handles FindOne / ById',
            create: 'Handles Create',
            update: 'Handles Update / Save',
            delete: 'Handles Delete',
            full: 'FULL CRUD + Specification'
        },
        generic_type_title: '2.3 Generic Type System',
        generic_type_desc: 'Type safety helps strictly control data from Controller down to Service.',
        table: { type: 'Type', desc: 'Description' },
        types: {
            e: '<strong>Entity Class:</strong> JPA Entity (e.g., Product).',
            id: '<strong>PK Type:</strong> Primary Key Type (e.g., Long, UUID).',
            rq: '<strong>Request DTO:</strong> Input DTO (e.g., ProductCreateReq).'
        },
        lifecycle_title: '2.4 Request Lifecycle',
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
        title: '3. Installation',
        intro: 'This library has been published to <strong>Maven Central</strong>. You can easily integrate it into your Spring Boot project using Maven or Gradle without complex repository configuration.',
        requirements: {
            title: 'System Requirements',
            java: 'Java 17 or higher',
            springboot: 'Spring Boot 3.0+',
            hibernate: 'Hibernate Validator'
        },
        tested_versions: {
            title: 'Tested Versions',
            priority_label: 'Priority: ',
            priority_value: 'High'
        },
        maven: {
            title: '3.1 Maven/Gradle Configuration',
            comment_xml: '&lt;!-- Add dependency to pom.xml --&gt;',
            comment_version: '&lt;!-- Check latest version at GitHub Releases --&gt;'
        },
        gradle: {
            title: 'Deploy with Gradle',
            comment_file: '// Add dependency to build.gradle',
            comment_version: '// Replace LATEST_VERSION with the latest version from GitHub Releases'
        },
        local: {
            title: '3.2 Local Environment',
            desc: 'If you are developing or specifically customizing the framework source code, install it to your Local Maven Repository:',
            comment_cmd: '# Run this command in java-core directory',
            note: 'After running the command above, you can use the built version (e.g., <code>LATEST_VERSION</code>) in other local projects.'
        },
        config: {
            title: '3.3 Application Configuration',
            desc: 'To enable Spring Boot to detect Beans and Validators from the library, you need to configure Package Scanning at the main Application class.',
            comment_package: '// Your project package',
            comment_lib: '// Library package'
        },
        important: '<strong>Important:</strong> Check and use the latest version (Release Tag) at'
    },
    quick_start: {
        title: '4. Quick Start',
        intro: 'Create a complete CRUD API set in just a few minutes. Below is the minimal source code needed for a product management module (Product).',
        steps: {
            entity: { title: 'Define Entity', desc: 'Standard JPA Entity. Framework supports all ID types (Long, String, UUID...).' },
            repo: { title: 'Create Repository', desc: 'Extend JpaRepository and JpaSpecificationExecutor to support CRUD and dynamic search.', comment: '// No extra code needed' },
            dto: {
                title: 'Define DTOs',
                desc: 'Implement IDto<E> for automatic mapping. Separate Create, Update, and Response.',
                comment_create: '// 1. Create Request',
                comment_update: '// 2. Update Request',
                comment_res: '// 3. Response'
            },
            service: { title: 'Extend Base Service', desc: 'Extend AbService<E, ID> to get full CRUD features. No need to declare DTO type here.' },
            controller: {
                title: 'Extend Base Controller',
                desc: 'Extend AbController and implement Traits interfaces (ICreate, IUpdate...) to enable APIs.',
                comment_summ: '// DTO for list response',
                comment_detail: '// DTO for detail response'
            }
        },
        more_info: 'Want to understand each component better?',
        view_details: 'View detailed step-by-step guide'
    },
    entity_repo: {
        title: '5. Entity & Repository Layer',
        subtitle: 'Mapping with database tables and JPA Repository for the Product module.',
        entity: {
            title: '5.1 Define Entity',
            desc: 'Define table structure and relationships (ManyToOne, OneToMany).',
            required: 'REQUIRED',
            optional: 'OPTIONAL',
            annotations: {
                entity: 'Marks class as a JPA Entity mapped to Database.',
                table: 'Customize table name and Index (Performance tuning).',
                nationalized: 'Supports storing Unicode strings (NVARCHAR) for SQL Server.',
                builder: 'Creates Builder pattern for easy object initialization.'
            },
            code: {
                comment: 'Entity representing a Product.'
            }
        },
        repo: {
            title: '5.2 Implement Repository',
            diagram: {
                standard: 'Standard CRUD',
                advanced: 'Advanced Filters & Search',
                ready: 'Ready for Generic Service',
                required: 'Required by AbService'
            },
            desc: 'Implementing Repository is extremely simple, just define the Interface:',
            note: '<strong>Note:</strong> Repository must extend <code>JpaSpecificationExecutor</code> to support advanced filters (Specification).'
        }
    },
    dtos: {
        title: '6. Data Transfer Objects (DTO)',
        subtitle: 'Use DTOs to separate Database Model and API Model.',
        req: {
            title: '6.1 Request DTO',
            desc: 'Separate Create and Update DTOs to control input data.'
        },
        res: {
            title: '6.2 Response DTO',
            desc: 'Data returned to the client. Supports automatic mapping from Entity to DTO.',
            tips: '<strong>Tips:</strong> <code>IDto</code> uses <code>BeanUtils.copyProperties</code> by default. If the DTO field name matches the Entity, you <strong>DO NOT NEED</strong> to write manual mapping code.'
        },
        i18n: {
            title: '6.3 Multi-language Support',
            desc: 'Framework supports multi-language right during DTO conversion. You can override the <code>fromEntity</code> method with the <code>language</code> parameter.'
        },
        code: {
            comment_convert: '/**\n     * Convert to Entity.\n     * <p>\n     * - Use BeanUtils.copyProperties for simple fields.\n     * - Handle manually for categoryIds (Set<Long> -> Set<Category>).\n     */',
            comment_update: '// Leverage default method to copy basic fields\n        // Update Many-to-Many relationship safely\n            // Trigger clear() + addAll()',
            comment_auto: '// IDto automatically supports mapping from Entity -> DTO via BeanUtils\n    // if field names match (e.g., name, price).',
            comment_i18n: '// Example override if you want to support multi-language\n    // Custom logic for each language'
        }
    },
    service_layer: {
        title: '7. Service Layer',
        subtitle: 'Handle business logic and integrate life-cycle hooks.',
        base: {
            title: '7.1 Choose Base Class',
            desc: 'Framework provides Base Classes by layer. Instead of always using <code>AbService</code> (All-in-One), choose the class that best fits your needs to optimize code.',
            menu: {
                read_summary: { question: 'Just need list and paging?', features: 'exists, count' },
                read_detail: { question: 'Need to view details?', features: 'findById, findOne' },
                create: { question: 'Only allow read and create?' },
                update: { question: 'Allow data editing?' },
                full: { title: 'AbService (Full Option)', desc: 'Comprehensive solution for most cases.', rec: 'Recommended' }
            },
            code_comment: '// Example: Standard Service extends AbService'
        },
        hooks: {
            title: '7.2 Lifecycle Hooks',
            desc: 'The "Hook" mechanism allows you to intervene in the processing flow (before or after saving to DB) without rewriting the entire CRUD logic.',
            timeline: {
                write_flow: 'Write Flow (Create/Update/Delete)',
                read_flow: 'Read Flow',
                input: 'Entity from Controller',
                repo_action: 'Save / Delete to DB',
                repo_read: 'Get raw data from Database',
                map_dto: 'Convert Entity -> DTO'
            },
            hooks_list: 'Available Hooks:',
            code_comment_before: '// Automatically calculate promotional price',
            code_comment_after: '// Send notification after successful creation'
        }
    },
    controller_layer: {
        title: '8. Controller Layer',
        subtitle: 'Expose APIs simply by implementing Interfaces.',
        hierarchy: {
            title: '8.1 Class Hierarchy',
            desc: 'Controller Layer is designed based on the Interfaces (Traits) composition pattern. You only need to "declare" what you want to use.',
            base_desc: 'Framework Base Interface',
            abstract_desc: 'Abstract Class providing implementation',
            implements: 'implements'
        },
        core: {
            title: '8.2 Controller Definition',
            desc: 'To create a standard Controller, you extend <code>AbController</code> and implement the behavior interfaces you need (Read, Create, Update, Delete).',
            note: '<strong>Important:</strong> <code>AbController</code> requires 2 generics: <code>Entity</code> and <code>ID Type</code>. It connects to the Service and performs Generic Operations.'
        },
        traits: {
            title: '8.3 Controller Traits',
            desc: 'Each interface (Trait) when implemented will automatically trigger the corresponding REST APIs. You can mix and match them flexibly.',
            mix_match_title: 'Mix & Match Strategies:',
            read_only: {
                title: 'Read-Only Controller',
                desc: 'Only view data, do not allow modification (e.g., Log, History).'
            },
            append_only: {
                title: 'Append-Only Controller',
                desc: 'Only allow adding new data (e.g., Interaction Log).'
            },
            table: {
                header: { trait: 'Interface (Trait)', endpoint: 'Activated Endpoints', usecase: 'Use Case' },
                read: { usecase: 'View list (Pagination) & View detail' },
                create: { usecase: 'Create new record' },
                update: { usecase: 'Update full (PUT) or partial (PATCH)' },
                delete: { usecase: 'Hard delete record by ID' }
            }
        },
        custom: {
            title: '8.4 Custom API',
            desc: 'Besides the available Generic APIs, you can comfortably write more custom APIs using standard Spring Boot annotations.'
        },
        code: {
            comment_class: '// Just implement Interfaces to have full CRUD APIs',
            comment_summ: 'Define DTO for List API (get all)',
            comment_detail: 'Define DTO for Detail API (get one)',
            comment_readonly: '// Only implements IReadController -> No Write APIs exposed',
            comment_public: '// Public API -> Only Read & Create, No Update/Delete',
            comment_custom_filter: '// Reuse findAll of BaseService'
        }
    },
    validation: {
        title: '9. Validation System',
        subtitle: 'Powerful input data validation mechanism, integrated with Spring Validation. Ensures clean data before entering Business Logic.',
        strategy: {
            level1: { title: 'Basic Constraints', desc: 'Format check, length, null...' },
            level2: { title: 'Business Logic', desc: 'Complex validation dependent on multiple fields.' },
            level3: { title: 'Database Check', desc: 'Strict constraints at Database level.' }
        },
        basic: {
            title: '9.1 Basic Constraints',
            desc: 'Annotations checking format or simple constraints.',
            exists_unique: { title: '@Exists & @Unique', desc: 'Check for data existence in Database.' },
            enum_value: { title: '@EnumValue', desc: 'Check if String/Int value is in Enum constants.' },
            phone_format: { title: '@PhoneNumber & @NoSpecialChars', desc: 'Validate phone number and special characters.' },
            ids_exist: { title: '@IdsExist', desc: 'Check if list (Set, List) of IDs exist in Database.' }
        },
        custom: {
            title: '9.2 Custom Validator',
            desc: 'Use <strong>Specification</strong> to perform complex validations.',
            spec: { title: '@SpecValidation (Field Level)', desc: 'Validate on a specific field.' },
            dto_spec: { title: '@DtoSpecValidation (Class Level)', desc: 'When validation logic depends on <strong>multiple fields</strong>. Example: Validate Model and Category must belong to selected Brand.' },
            loader_label: 'Implement Loader:'
        },
        advanced: {
            title: '9.3 Native SQL Constraints',
            desc: 'Use <strong>Native SQL</strong> to write data check constraints directly under DB.',
            sql: { title: '@SqlConstraint', desc: 'Validate complex logic using SQL. Supports variable binding from Request Path, Params, or Fields in DTO.' },
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
        title: '10. Specification & Dynamic Search',
        subtitle: 'Guide to creating dynamic Specifications for complex queries.',
        default: {
            title: '10.1 Integrated Search API',
            desc: 'By inheriting <code>AbController</code>, you instantly have a <code>GET /api/products</code> API supporting paging, sorting, and basic search <strong>without writing extra code</strong>.',
            params_title: 'Supported Query Parameters',
            params: {
                page: 'Page number (starts at 0). Default: 0',
                size: 'Records per page. Default: 10',
                sort: 'Sort field (e.g. price). Default: id',
                dir: 'Sort direction (asc/desc). Default: asc',
                search: 'Search keyword',
                searchField: 'Field to search (e.g. name)'
            },
            example_title: 'Example Usage:',
            example_explain: '-> Get page 0, 20 items, sort by price descending, find products with name containing "iphone".'
        },
        custom: {
            title: '10.2 Custom Filter (Advanced)',
            desc: 'When you need complex filters (e.g. price range, filter by category), extend <code>BaseRequestParam</code> and override methods in the Controller.',
            step1: { title: 'Step 1: Create Custom Request Param', desc: 'Extend <code>BaseRequestParam</code> to add new filter fields.' },
            step2: { title: 'Step 2: Implement Custom Specification', desc: 'Create <code>ProductSpecification</code> class extending <code>GenericSpecification</code> to handle deep filter logic.' },
            step3: { title: 'Step 3: Override Controller', note: '<strong>Important:</strong> You must override the <code>findAll</code> method so Spring can map your <code>ProductRequestParam</code> class instead of the parent class.' }
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
        title: '11. Response Handling',
        subtitle: 'Consistent response structure and centralized error handling mechanism.',
        structure: {
            title: '11.1 Response Structure',
            desc: 'The library provides 2 standard wrapper classes: <code>HttpApiResponse</code> for single objects/lists and <code>PagedResponse</code> for pagination.',
            json_title: 'JSON Structure (HttpApiResponse)',
            paged_title: 'PagedResponse (Pagination)',
            paged_desc: 'Replaces default <code>Page&lt;T&gt;</code> to customize fields.'
        },
        exception: {
            title: '11.2 Exception Handling',
            desc: 'Use <code>HttpException</code> to throw errors from Service/Controller. <code>GlobalExceptionHandler</code> will automatically catch and return standard format.',
            throw_title: 'Throw Exception',
            standard_title: 'Standard Response'
        },
        code: {
            comment_status: '// HTTP Status Code',
            comment_msg: '// Human readable message',
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
        title: '12. Base Service Methods',
        subtitle: 'List of powerful CRUD methods available in <code>AbService</code>.',
        table: {
            signature: 'Method Signature',
            desc: 'Description & Return'
        },
        read: {
            title: '12.1 Read Services',
            detail_title: '12.1.1 IReadDetailService',
            detail_subtitle: '(Single Entity Lookup)',
            summary_title: '12.1.2 IReadSummaryService',
            summary_subtitle: '(List & Search)',
            summary_note: '<strong>Recommended:</strong> Always prioritize using methods that accept <code>Pageable</code> parameters.',
            items: {
                findById_entity: 'Get original Entity.',
                findById_dto: 'Get and map to DTO.',
                findById_dto_lang: 'Get multi-language DTO.',
                findById_spec: 'Get DTO by ID and Spec condition.',
                findById_spec_lang: 'Get multi-language DTO by ID and Spec.',
                findOne_entity: 'Find one Entity by Spec.',
                findOne_dto: 'Find one DTO by Spec.',
                findOne_dto_lang: 'Find one multi-language DTO by Spec.',
                findAll_page_spec_dto: 'Pagination + Sort + Filter + DTO.',
                findAll_page_spec_lang: 'Pagination + Sort + Filter + Multi-language DTO.',
                findAll_page_spec_entity: 'Pagination returning Entity.',
                findAll_list: 'Full list of Entities.',
                findAll_list_dto: 'Full list of DTOs.',
                findAll_list_dto_lang: 'Full list of Multi-language DTOs.',
                findAll_list_spec: 'List of Entities by Spec.',
                findAll_list_spec_dto: 'List of DTOs by Spec.',
                findAllById: 'Find by list of IDs.',
                findAllById_dto: 'Find by list of IDs returning DTO.',
                findAllById_dto_lang: 'Find by list of IDs returning Multi-language DTO.',
                findAll_page_simple: 'Simple Pagination.',
                findAll_page_dto: 'Pagination returning DTO.',
                findAll_page_dto_lang: 'Pagination returning Multi-language DTO.',
                findAll_page_spec_dto_simple: 'Pagination + Spec returning DTO.',
                findAll_page_spec_dto_lang_simple: 'Pagination + Spec returning Multi-language DTO.',
                count: 'Count.',
                exists: 'Check existence.'
            }
        },
        write: {
            title: '12.2 Write Services',
            create_title: '12.2.1 ICreateService',
            update_title: '12.2.2 IUpdateService',
            delete_title: '12.2.3 IDeleteService',
            items: {
                create_entity: 'Save Entity directly.',
                create_dto: 'Create from DTO.',
                create_res: 'Create Entity return DTO.',
                create_dto_res: 'Create from DTO return other DTO.',
                create_dto_dto: 'Create from DTO return DTO.',
                update_entity_id: 'Update Entity by ID.',
                update_entity: 'Update Entity (assume exists).',
                save_entity: 'Save or Update.',
                update_dto_id: 'Update from DTO by ID.',
                update_entity_res: 'Update Entity return DTO.',
                save_entity_res: 'Save return DTO.',
                update_dto_res: 'Update from DTO return DTO.',
                save_dto_res: 'Save from DTO return DTO.',
                update_req_res: 'Update Req/Res DTO pattern.',
                update_bulk: 'Bulk Update by Spec.',
                delete_id: 'Delete by ID.',
                delete_entity: 'Delete (check ID).',
                delete_dto: 'Delete (use DTO check ID).',
                delete_res: 'Delete return DTO.',
                delete_dto_res: 'Delete from DTO return DTO.',
                delete_id_res: 'Delete ID return DTO.',
                delete_spec: 'Bulk Delete by Spec.'
            }
        },
        hooks: {
            title: '12.3 Service Hooks',
            desc: 'Hooks allow you to intervene in the CRUD process without overriding the entire method. Override them in your <code>ServiceImpl</code>.',
            read: {
                title: 'Read Hooks',
                entity_phase: '1. Entity Phase',
                entity_desc: 'Run immediately after DB returns. Used to calculate transient fields.',
                dto_phase: '2. DTO Phase',
                dto_desc: 'Run after mapping to DTO. Used to enrich data for view.'
            },
            create: {
                title: 'Create Hooks',
                before: '- Validate, set default.',
                after: '- Audit, Notify.'
            },
            update: {
                title: 'Update Hooks',
                before: '- Check rules, pre-process.',
                after: '- Audit, Notify.'
            },
            delete: {
                title: 'Delete Hooks',
                before: '- Check constraints.',
                after: '- Cleanup resources.'
            }
        }
    },
    notes: {
        title: '13. Important Notes',
        subtitle: 'Key notes to use the framework effectively and avoid common pitfalls.',
        modularity: {
            title: '13.1 Modularity Strategy',
            desc: 'Instead of creating giant "God Classes", apply the <strong>"Right-sizing"</strong> strategy (use only what\'s needed) for both Controllers and Services.',
            controller_title: 'Controller Layer',
            controller_desc: 'Use <strong>Traits (Interface)</strong> mechanism to assemble APIs.',
            controller_link: 'See Traits Menu at Section 8.3',
            service_title: 'Service Layer',
            service_desc: 'Choose the right <strong>Base Class</strong> to limit DB access.',
            service_link: 'See Base Class Selector at Section 7.1'
        },
        advanced: {
            title: '13.2 Advanced Patterns',
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
                method2_desc: 'Transparent, automatically applied to all queries (Find, List, etc.).'
            },
            filter: {
                title: 'Complex Dynamic Filtering (Full Spec)',
                desc: 'When you need advanced filtering (price range, complex table joins), combine <code>Custom Param</code> and <code>Custom Specification</code>.'
            }
        },
        best_practices: {
            title: '13.3 Best Practices',
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
            title: '13.4 Troubleshooting',
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
            intro: '1. Introduction',
            intro_solution: '1.1. Solution',
            intro_features: '1.2. Key Features',
            intro_pros_cons: '1.3. Pros & Cons',
            intro_security: '1.4. Security & Transparency',

            architecture: '2. Architecture & Lifecycle',
            architecture_diagram: '2.1. Architecture Diagram',
            framework_spec: '2.2. Class Hierarchy',
            generic_system: '2.3. Generic Type System',
            request_lifecycle: '2.4. Request Lifecycle',

            installation: '3. Installation & Configuration',
            installation_maven: '3.1. Maven/Gradle Config',
            installation_local: '3.2. Local Environment',
            installation_config: '3.3. App Configuration',

            quick_start: '4. Quick Start',

            core_entity_repo: '5. Entity & Repository',
            core_entity: '5.1. Define Entity',
            core_repo: '5.2. Implement Repository',

            dtos: '6. Data Transfer Objects (DTO)',
            dto_request: '6.1. Request DTO',
            dto_response: '6.2. Response DTO',
            dto_i18n: '6.3. Multi-language Support',

            service_layer: '7. Service Layer',
            core_service: '7.1. Base Class Selector',
            service_hooks: '7.2. Lifecycle Hooks',

            controller_layer: '8. Controller Layer',
            controller_hierarchy: '8.1. Class Hierarchy',
            core_controller: '8.2. Standard Controller',
            controller_traits: '8.3. Controller Traits (Modular)',
            custom_api: '8.4. Custom API',

            validation: '9. Validation System',
            val_basic: '9.1. Basic Constraints',
            val_custom: '9.2. Custom Validator',
            val_advanced: '9.3. Native SQL Constraints',

            specifications: '10. Specification & Search',
            spec_default: '10.1. Built-in Search API',
            spec_custom: '10.2. Custom Filter (Advance)',

            response_handling: '11. Response Handling',
            res_structure: '11.1. Response Structure',
            res_exception: '11.2. Exception Handling',

            api_list: '12. Base Service Methods',
            api_read: '12.1. Read Operations',
            api_write: '12.2. Write Operations',
            api_hooks: '12.3. Service Hooks',

            notes: '13. Important Notes',
            notes_modularity: '13.1. Modularity Strategy',
            notes_advanced: '13.2. Advanced Patterns',
            notes_best_practices: '13.3. Best Practices',
            notes_troubleshooting: '13.4. Troubleshooting'
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
    }
}
