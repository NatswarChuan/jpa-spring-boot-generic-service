export default {
    intro: {
        title: '1. Giới thiệu',
        p1: 'Trong hệ sinh thái <strong>Spring Boot</strong> hiện đại, việc xây dựng các ứng dụng quản lý (Admin/CMS/ERP) thường đi kèm với khối lượng lớn các tác vụ lặp lại. <strong>Generic Service Framework</strong> ra đời như một giải pháp nền tảng giúp lập trình viên <strong>Java Backend</strong> đóng gói toàn bộ quy trình nghiệp vụ cốt lõi ngay từ giai đoạn khởi tạo dự án.',
        p2: 'Thay vì phải viết thủ công hàng trăm dòng code boilerplate, giờ đây chỉ với vài bước cấu hình đơn giản và kế thừa từ các lớp Abstract Base như <code>AbService</code> hay <code>AbController</code>, bạn sẽ sở hữu ngay <strong>5 API tiêu chuẩn</strong> (List, Detail, Create, Update, Delete) sẵn sàng sử dụng.',
        quote: '"Framework sẽ tự động cung cấp bộ máy xử lý mạnh mẽ bao gồm CRUD, Validation nâng cao và JPA Specification ngay tại tầng <strong>Service</strong>, giải phóng bạn khỏi các công việc nhàm chán để tập trung hoàn toàn vào logic nghiệp vụ đặc thù."',
        features_title: '1.2 Các chức năng chính',
        features: {
            crud: {
                title: 'Generic CRUD Operations',
                desc: 'Cung cấp đầy đủ các thao tác Thêm, Đọc, Sửa, Xóa cơ bản cho cả Entity và DTO.'
            },
            filter: {
                title: 'Dynamic Filtering (JPA Spec)',
                desc: 'Tích hợp sẵn Generic Specification cho phép lọc dữ liệu động cực kỳ linh hoạt.'
            },
            mapping: {
                title: 'Automatic DTO Mapping',
                desc: 'Chuyển đổi DTO - Entity hai chiều tự động, tách biệt hoàn toàn lớp Response và Database.'
            },
            i18n: {
                title: 'Multi-language (I18n)',
                desc: 'Hỗ trợ trả về dữ liệu theo ngôn ngữ yêu cầu (Localization) ngay tại tầng Service.'
            },
            hooks: {
                title: 'Service Hooks',
                desc: 'Cung cấp các điểm can thiệp (before/after hooks) để tùy biến logic nghiệp vụ dễ dàng.'
            },
            error: {
                title: 'Standardized Error Handling',
                desc: 'Xử lý ngoại lệ tập trung, đảm bảo mọi API luôn trả về format lỗi đồng nhất.'
            }
        },
        pros_title: '1.3 Ưu điểm',
        pros: {
            boilerplate: '<strong>Giảm 80% boilerplate code:</strong> Không còn phải viết hàng ngàn dòng code CRUD lặp lại.',
            consistency: '<strong>Tính nhất quán cao:</strong> Toàn bộ team sử dụng chung một cấu trúc chuẩn mực.',
            maintainability: '<strong>Dễ bảo trì:</strong> Logic CRUD tập trung tại framework, fix một nơi - áp dụng everywhere.',
            extensibility: '<strong>Mở rộng linh hoạt:</strong> Override bất kỳ phương thức nào khi cần nghiệp vụ phức tạp.'
        },
        cons_title: 'Nhược điểm',
        cons: {
            learning_curve: '<strong>Đường cong học tập:</strong> Cần hiểu về Java Generics và cấu trúc hooks của framework.',
            abstraction: '<strong>Trừu tượng hóa cao:</strong> Đôi khi gây khó khăn cho việc debug nếu không quen với base code.',
            complexity: '<strong>Hạn chế khi quá phức tạp:</strong> Các nghiệp vụ cực kỳ đặc thù vẫn cần viết service riêng biệt.'
        },
        security_title: 'Cam kết Minh bạch & An toàn',
        security_p1: 'Chúng tôi hiểu rằng việc sử dụng một thư viện ngoài (Third-party library) trong dự án Production luôn đi kèm với lo ngại về <strong>bảo mật</strong> và <strong>mã độc (malicious code)</strong>.',
        security_p2: 'Để giải tỏa lo lắng này, mã nguồn của <code>Generic Service</code> được thiết kế hoàn toàn minh bạch:',
        security_items: {
            opensource: {
                title: 'Open Source 100%',
                desc: 'Toàn bộ mã nguồn được công khai. Không có file binary bị ẩn hay mã obfuscated.'
            },
            dependencies: {
                title: 'Standard Dependencies',
                desc: 'Chỉ sử dụng các thư viện chuẩn (Spring Boot, Hibernate, Lombok). Không có dependencies lạ.'
            },
            verify: {
                title: 'Kiểm tra Trực tiếp',
                desc: 'Bạn được khuyến khích xem trực tiếp code trong module <code>java-core</code> trước khi sử dụng.'
            }
        },
        view_source: 'Kiểm tra mã nguồn Core tại GitHub',
        demo_link: 'Xem Source Code Demo',
        star_link: 'Star on GitHub',
        switch_lang: 'Chuyển sang Tiếng Anh'
    },
    arch: {
        title: '2. Kiến trúc & Vòng đời',
        subtitle: 'Đặc tả kỹ thuật của framework và luồng xử lý request.',
        diagram_title: '2.1 Sơ đồ Kiến trúc',
        diagram_desc: 'Mô hình tổng quan về sự tương tác giữa các tầng Controller, Service và Repository.',
        class_hierarchy_title: '2.2 Phân cấp Class',
        class_hierarchy_desc: 'Thiết kế theo mô hình phân tầng, phân chia rạch ròi trách nhiệm giữa các loại thao tác (Read, Create, Update, Delete).',
        services: {
            base: 'Chứa Utils (Mapping, Logging)',
            read_summary: 'Xử lý FindAll / Paging',
            read_detail: 'Xử lý FindOne / ById',
            create: 'Xử lý Create',
            update: 'Xử lý Update / Save',
            delete: 'Xử lý Delete',
            full: 'FULL CRUD + Specification'
        },
        generic_type_title: '2.3 Hệ thống Generic Type',
        generic_type_desc: 'Type safety giúp kiểm soát chặt chẽ dữ liệu từ Controller xuống Service.',
        table: { type: 'Loại (Type)', desc: 'Mô tả' },
        types: {
            e: '<strong>Entity Class:</strong> Thực thể JPA (VD: Product).',
            id: '<strong>PK Type:</strong> Kiểu khóa chính (VD: Long, UUID).',
            rq: '<strong>Request DTO:</strong> DTO đầu vào (VD: ProductCreateReq).'
        },
        lifecycle_title: '2.4 Vòng đời Request',
        lifecycle_desc: 'Luồng đi của dữ liệu khi gọi API <code>POST /api/v1/products</code>:',
        steps: {
            validation: { title: 'DTO Validation', desc: 'Hibernate Validator kiểm tra các annotation (@NotBlank, @Exists...) trên ProductCreateReq.' },
            mapping: { title: 'Payload Mapping', desc: 'Controller gọi service.create(dto.toEntity()) để chuyển đổi DTO sang Entity.' },
            before_hook: { title: 'Before-Hook', desc: 'Hook beforeCreate(entity) được thực thi để xử lý nghiệp vụ tiền lưu trữ.' },
            persistence: { title: 'Persistence', desc: 'Repository lưu entity vào cơ sở dữ liệu qua Hibernate.' },
            after_hook: { title: 'After-Hook', desc: 'Hook afterCreate(entity) được kích hoạt (ví dụ: gửi mail, log logging).' },
            final_mapping: { title: 'Final Mapping', desc: 'Kết quả được map sang Response DTO và trả về cho Client.' }
        }
    },
    install: {
        title: '3. Cài đặt',
        intro: 'Thư viện này đã được publish lên <strong>Maven Central</strong>. Bạn có thể dễ dàng tích hợp vào dự án Spring Boot của mình bằng Maven hoặc Gradle mà không cần cấu hình repository phức tạp.',
        requirements: {
            title: 'Yêu cầu Hệ thống',
            java: 'Java 17 trở lên',
            springboot: 'Spring Boot 3.0+',
            hibernate: 'Hibernate Validator'
        },
        tested_versions: {
            title: 'Phiên bản đã Test',
            priority_label: 'Mức độ Ưu tiên: ',
            priority_value: 'Cao'
        },
        maven: {
            title: '3.1 Cấu hình Maven/Gradle',
            comment_xml: '&lt;!-- Thêm dependency vào pom.xml --&gt;',
            comment_version: '&lt;!-- Xem phiên bản mới nhất tại GitHub Releases --&gt;'
        },
        gradle: {
            title: 'Triển khai bằng Gradle',
            comment_file: '// Thêm dependency vào build.gradle',
            comment_version: '// Thay LATEST_VERSION bằng phiên bản mới nhất từ GitHub Releases'
        },
        local: {
            title: '3.2 Môi trường Local',
            desc: 'Nếu bạn đang phát triển hoặc tùy chỉnh trực tiếp mã nguồn của framework, hãy cài đặt nó vào Local Maven Repository của bạn:',
            comment_cmd: '# Chạy lệnh này tại thư mục java-core',
            note: 'Sau khi chạy lệnh trên, bạn có thể sử dụng phiên bản vừa build (ví dụ <code>LATEST_VERSION</code>) trong các dự án local khác.'
        },
        config: {
            title: '3.3 Cấu hình Ứng dụng',
            desc: 'Để Spring Boot có thể nhận diện các Beans và Validators từ thư viện, bạn cần cấu hình Package Scanning tại lớp Application chính.',
            comment_package: '// Package dự án của bạn',
            comment_lib: '// Package của thư viện'
        },
        important: '<strong>Quan trọng:</strong> Hãy kiểm tra và sử dụng phiên bản (Release Tag) mới nhất tại'
    },
    quick_start: {
        title: '4. Bắt đầu nhanh (Quick Start)',
        intro: 'Tạo ngay một bộ CRUD API hoàn chỉnh chỉ trong vài phút. Dưới đây là mã nguồn tối thiểu cần thiết cho một module quản lý sản phẩm (Product).',
        steps: {
            entity: { title: 'Định nghĩa Entity', desc: 'Entity JPA tiêu chuẩn. Framework hỗ trợ mọi loại ID (Long, String, UUID...).' },
            repo: { title: 'Tạo Repository', desc: 'Kế thừa JpaRepository và JpaSpecificationExecutor để hỗ trợ CRUD và tìm kiếm động.', comment: '// Không cần viết thêm code nào' },
            dto: {
                title: 'Định nghĩa các DTO',
                desc: 'Implement IDto<E> để mapping tự động. Tách biệt Create, Update và Response.',
                comment_create: '// 1. Request tạo mới',
                comment_update: '// 2. Request cập nhật',
                comment_res: '// 3. Response trả về'
            },
            service: { title: 'Extend Base Service', desc: 'Kế thừa AbService<E, ID> để có đầy đủ tính năng CRUD. Không cần khai báo DTO type tại đây.' },
            controller: {
                title: 'Extend Base Controller',
                desc: 'Kế thừa AbController và implement các interface Traits (ICreate, IUpdate...) để kích hoạt API.',
                comment_summ: '// Chỉ định DTO dùng cho phản hồi danh sách',
                comment_detail: '// Chỉ định DTO dùng cho phản hồi chi tiết'
            }
        },
        more_info: 'Bạn muốn hiểu rõ hơn về từng thành phần?',
        view_details: 'Xem hướng dẫn chi tiết từng bước'
    },
    entity_repo: {
        title: '5. Tầng Entity & Repository',
        subtitle: 'Ánh xạ với bảng trong database và Repository JPA cho module Product.',
        entity: {
            title: '5.1 Định nghĩa Entity',
            desc: 'Định nghĩa cấu trúc bảng và các mối quan hệ (ManyToOne, OneToMany).',
            required: 'BẮT BUỘC',
            optional: 'TÙY CHỌN',
            annotations: {
                entity: 'Đánh dấu class là một JPA Entity mapped với Database.',
                table: 'Tùy chỉnh tên bảng và Index (Performance tuning).',
                nationalized: 'Hỗ trợ lưu chuỗi Unicode (NVARCHAR) cho SQL Server.',
                builder: 'Tạo Builder pattern giúp khởi tạo object dễ dãng.'
            },
            code: {
                comment: 'Entity đại diện cho Sản phẩm (Product).'
            }
        },
        repo: {
            title: '5.2 Triển khai Repository',
            diagram: {
                standard: 'Standard CRUD',
                advanced: 'Advanced Filters & Search',
                ready: 'Ready for Generic Service',
                required: 'Required by AbService'
            },
            desc: 'Triển khai Repository cực kỳ đơn giản, chỉ cần define Interface:',
            note: '<strong>Lưu ý:</strong> Repository bắt buộc phải extends <code>JpaSpecificationExecutor</code> để hỗ trợ bộ lọc nâng cao (Specification).'
        }
    },
    dtos: {
        title: '6. Data Transfer Objects (DTO)',
        subtitle: 'Sử dụng DTO để tách biệt Model của Database và Model của API.',
        req: {
            title: '6.1 Request DTO',
            desc: 'Tách biệt DTO tạo mới và cập nhật để kiểm soát dữ liệu đầu vào.'
        },
        res: {
            title: '6.2 Response DTO',
            desc: 'Dữ liệu trả về cho client. Hỗ trợ tự động map từ Entity sang DTO.',
            tips: '<strong>Tips:</strong> <code>IDto</code> mặc định sử dụng <code>BeanUtils.copyProperties</code>. Nếu tên field của DTO trùng với Entity, bạn <strong>KHÔNG CẦN</strong> viết code mapping thủ công nữa.'
        },
        i18n: {
            title: '6.3 Hỗ trợ Đa ngôn ngữ',
            desc: 'Framework hỗ trợ đa ngôn ngữ ngay khi chuyển đổi DTO. Bạn có thể override hàm <code>fromEntity</code> có tham số <code>language</code>.'
        },
        code: {
            comment_convert: '/**\n     * Chuyển đổi sang Entity.\n     * <p>\n     * - Sử dụng BeanUtils.copyProperties cho các field đơn giản.\n     * - Xử lý thủ công cho categoryIds (Set<Long> -> Set<Category>).\n     */',
            comment_update: '// Tận dụng default method để copy fields cơ bản\n        // Cập nhật quan hệ Many-to-Many an toàn\n            // Trigger clear() + addAll()',
            comment_auto: '// IDto tự động hỗ trợ mapping từ Entity -> DTO thông qua BeanUtils\n    // nếu tên field trùng khớp (ví dụ: name, price).',
            comment_i18n: '// Ví dụ override nếu muốn support đa ngôn ngữ\n    // Logic custom cho từng ngôn ngữ'
        }
    },
    service_layer: {
        title: '7. Tầng Service',
        subtitle: 'Xử lý logic nghiệp vụ và tích hợp các life-cycle hooks.',
        base: {
            title: '7.1 Lựa chọn Base Class',
            desc: 'Framework cung cấp các lớp cơ sở (Base Classes) theo mô hình phân tầng. Thay vì luôn dùng <code>AbService</code> (All-in-One), bạn hãy chọn lớp phù hợp nhất với nhu cầu để tối ưu code.',
            menu: {
                read_summary: { question: 'Chỉ cần xem danh sách và phân trang?', features: 'exists, count' },
                read_detail: { question: 'Cần xem chi tiết từng bản ghi?', features: 'findById, findOne' },
                create: { question: 'Chỉ cho phép đọc và tạo mới?' },
                update: { question: 'Cho phép chỉnh sửa dữ liệu?' },
                full: { title: 'AbService (Full Option)', desc: 'Giải pháp toàn diện cho hầu hết các trường hợp.', rec: 'Recommended' }
            },
            code_comment: '// Ví dụ: Service chuẩn kế thừa AbService'
        },
        hooks: {
            title: '7.2 Các Hooks Vòng đời',
            desc: 'Cơ chế "Hook" cho phép bạn can thiệp vào luồng xử lý (trước hoặc sau khi lưu DB) mà không cần viết lại toàn bộ logic CRUD.',
            timeline: {
                write_flow: 'Luồng Ghi (Create/Update/Delete)',
                read_flow: 'Luồng Đọc (Read)',
                input: 'Entity từ Controller',
                repo_action: 'Save / Delete xuống DB',
                repo_read: 'Lấy dữ liệu thô từ Database',
                map_dto: 'Chuyển đổi Entity -> DTO'
            },
            hooks_list: 'Các Hook khả dụng:',
            code_comment_before: '// Tự động tính toán giá khuyến mãi',
            code_comment_after: '// Gửi thông báo sau khi tạo thành công'
        }
    },
    controller_layer: {
        title: '8. Tầng Controller',
        subtitle: 'Expose API đơn giản bằng cách implement các Interface.',
        hierarchy: {
            title: '8.1 Phân cấp Class',
            desc: 'Controller Layer được thiết kế theo pattern lắp ghép Interfaces (Traits). Bạn chỉ cần "khai báo" những gì bạn muốn sử dụng.',
            base_desc: 'Framework Base Interface',
            abstract_desc: 'Abstract Class cung cấp implementation',
            implements: 'implements'
        },
        core: {
            title: '8.2 Định nghĩa Controller',
            desc: 'Để tạo một Controller chuẩn, bạn kế thừa <code>AbController</code> và implement các interface hành vi bạn cần (Read, Create, Update, Delete).',
            note: '<strong>Quan trọng:</strong> <code>AbController</code> yêu cầu 2 generic: <code>Entity</code> và <code>ID Type</code>. Nó kết nối tới Service và thực thi các Generic Operations.'
        },
        traits: {
            title: '8.3 Controller Traits',
            desc: 'Mỗi interface (Trait) khi được implement sẽ tự động kích hoạt các REST API tương ứng. Bạn có thể mix & match chúng linh hoạt.',
            mix_match_title: 'Chiến thuật Mix & Match:',
            read_only: {
                title: 'Read-Only Controller',
                desc: 'Chỉ xem dữ liệu, không cho phép chỉnh sửa (VD: Log, History).'
            },
            append_only: {
                title: 'Append-Only Controller',
                desc: 'Chỉ cho phép thêm mới (VD: Interaction Log).'
            },
            table: {
                header: { trait: 'Interface (Trait)', endpoint: 'Endpoints Kích hoạt', usecase: 'Trường hợp sử dụng' },
                read: { usecase: 'Xem danh sách (Phân trang) & Xem chi tiết' },
                create: { usecase: 'Tạo mới bản ghi' },
                update: { usecase: 'Cập nhật toàn phần (PUT) hoặc một phần (PATCH)' },
                delete: { usecase: 'Xóa (Hard delete) bản ghi theo ID' }
            }
        },
        custom: {
            title: '8.4 Custom API',
            desc: 'Ngoài các Generic API có sẵn, bạn vẫn thoải mái viết thêm các API tùy chỉnh bằng annotation của Spring Boot bình thường.'
        },
        code: {
            comment_class: '// Chỉ cần implement Interfaces để có full CRUD API',
            comment_summ: 'Chỉ định DTO cho List API (get all)',
            comment_detail: 'Chỉ định DTO cho Detail API (get one)',
            comment_readonly: '// Chỉ implement IReadController -> Không có Write API',
            comment_public: '// Public API -> Chỉ Cho phép Xem & Tạo, Không Sửa/Xóa',
            comment_custom_filter: '// Tận dụng lại findAll của BaseService'
        }
    },
    validation: {
        title: '9. Hệ thống Validation',
        subtitle: 'Hệ thống kiểm tra dữ liệu đầu vào mạnh mẽ, tích hợp sẵn với Spring Validation. Đảm bảo dữ liệu sạch trước khi vào Business Logic.',
        strategy: {
            level1: { title: 'Basic Constraints', desc: 'Kiểm tra định dạng, độ dài, null...' },
            level2: { title: 'Business Logic', desc: 'Validation phức tạp phụ thuộc nhiều trường.' },
            level3: { title: 'Database Check', desc: 'Ràng buộc chặt chẽ mức Database.' }
        },
        basic: {
            title: '9.1 Ràng buộc Cơ bản',
            desc: 'Các annotation kiểm tra định dạng hoặc ràng buộc đơn giản.',
            exists_unique: { title: '@Exists & @Unique', desc: 'Kiểm tra sự tồn tại của dữ liệu trong Database.' },
            enum_value: { title: '@EnumValue', desc: 'Kiểm tra giá trị String/Int có nằm trong tập hằng số của Enum hay không.' },
            phone_format: { title: '@PhoneNumber & @NoSpecialChars', desc: 'Validation số điện thoại và ký tự đặc biệt.' },
            ids_exist: { title: '@IdsExist', desc: 'Kiểm tra danh sách (Set, List) các ID có tồn tại trong Database hay không.' }
        },
        custom: {
            title: '9.2 Validator Tùy chỉnh',
            desc: 'Sử dụng <strong>Specification</strong> để thực hiện các validation phức tạp.',
            spec: { title: '@SpecValidation (Field Level)', desc: 'Validate trên một trường cụ thể.' },
            dto_spec: { title: '@DtoSpecValidation (Class Level)', desc: 'Khi logic validation phụ thuộc vào <strong>nhiều trường</strong>. Ví dụ: Validate Model và Category phải thuộc về Brand đã chọn.' },
            loader_label: 'Implement Loader:'
        },
        advanced: {
            title: '9.3 Ràng buộc SQL Tự nhiên',
            desc: 'Sử dụng <strong>Native SQL</strong> để viết các ràng buộc kiểm tra dữ liệu trực tiếp dưới DB.',
            sql: { title: '@SqlConstraint', desc: 'Validate logic phức tạp bằng SQL. Hỗ trợ bind biến từ Request Path, Params, hoặc Fields trong DTO.' },
        },
        code: {
            comment_exists: '// ID danh mục cha phải TỒN TẠI trong bảng categories',
            comment_unique: '// Tên danh mục phải là DUY NHẤT',
            comment_enum: '// Giá trị phải là "ACTIVE", "INACTIVE" hoặc "BANNED"',
            comment_phone: '// SĐT không đúng định dạng quốc tế',
            comment_chars: '// Tên đăng nhập không được chứa ký tự đặc biệt',
            comment_ids: '// Danh mục không tồn tại',
            comment_spec_ids: '// Validate danh sách ID có tồn tại trong DB không (dùng IN clause)',
            comment_dto_msg: '// Sản phẩm với tên này đã tồn tại trong cửa hàng được chọn',
            comment_loader: '// Check duplicate: Same Name AND Same Store',
            comment_sql: '// Brand does not support all categories of the selected Model'
        }
    },
    specification: {
        title: '10. Specification & Tìm kiếm Động',
        subtitle: 'Hướng dẫn về cách tạo Specification động cho các truy vấn phức tạp.',
        default: {
            title: '10.1 API Tìm kiếm Tích hợp',
            desc: 'Ngay khi kế thừa <code>AbController</code>, bạn đã có sẵn API <code>GET /api/products</code> hỗ trợ phân trang, sắp xếp và tìm kiếm cơ bản mà <strong>không cần viết thêm code</strong>.',
            params_title: 'Tham số Truy vấn Hỗ trợ (Supported Query Parameters)',
            params: {
                page: 'Số trang (bắt đầu từ 0). Mặc định: 0',
                size: 'Số lượng bản ghi/trang. Mặc định: 10',
                sort: 'Trường sắp xếp (VD: price). Mặc định: id',
                dir: 'Hướng sắp xếp (asc/desc). Mặc định: asc',
                search: 'Từ khóa tìm kiếm',
                searchField: 'Trường cần tìm kiếm (VD: name)'
            },
            example_title: 'Ví dụ Sử dụng (Example Usage):',
            example_explain: '-> Lấy trang 0, 20 phần tử, sắp xếp giá giảm dần, tìm các sản phẩm có tên chứa "iphone".'
        },
        custom: {
            title: '10.2 Bộ lọc Tùy chỉnh (Advance)',
            desc: 'Khi bạn cần các bộ lọc phức tạp hơn (ví dụ: khoảng giá, lọc theo danh mục), hãy mở rộng <code>BaseRequestParam</code> và Override method trong Controller.',
            step1: { title: 'Bước 1: Tạo Request Param Custom', desc: 'Kế thừa <code>BaseRequestParam</code> để thêm các field filter mới.' },
            step2: { title: 'Bước 2: Triển khai Custom Specification', desc: 'Tạo class <code>ProductSpecification</code> kế thừa <code>GenericSpecification</code> để xử lý logic filter chuyên sâu.' },
            step3: { title: 'Bước 3: Override Controller', note: '<strong>Lưu ý quan trọng:</strong> Bạn bắt buộc phải override hàm <code>findAll</code> để Spring có thể map đúng class <code>ProductRequestParam</code> của bạn thay vì lớp cha.' }
        },
        code: {
            comment_field_brand: '// Lọc theo tên Brand (Join)',
            comment_reuse: '// 1. Reuse logic default',
            comment_price: '// 2. Custom logic: Price Range',
            comment_join: '// 3. Custom logic: Join Brand',
            comment_override_findall: '// 1. Override findAll để bind đúng class Param',
            comment_use_custom: '// <-- Dùng class custom param',
            comment_override_spec: '// 2. Override getSpecification để trả về Specification tùy chỉnh',
            comment_return_spec: '// Trả về ProductSpecification để xử lý logic lọc nâng cao (minPrice, brandName, etc)'
        }
    },
    response_handling: {
        title: '11. Xử lý Phản hồi (Response)',
        subtitle: 'Cấu trúc kết quả trả về đồng nhất và cơ chế xử lý lỗi tập trung.',
        structure: {
            title: '11.1 Cấu trúc Phản hồi',
            desc: 'Thư viện cung cấp 2 lớp wrap chuẩn: <code>HttpApiResponse</code> cho đối tượng đơn/list và <code>PagedResponse</code> cho phân trang.',
            json_title: 'Cấu trúc JSON (HttpApiResponse)',
            paged_title: 'PagedResponse (Phân trang)',
            paged_desc: 'Thay thế <code>Page&lt;T&gt;</code> mặc định để custom fields.'
        },
        exception: {
            title: '11.2 Xử lý Ngoại lệ',
            desc: 'Sử dụng <code>HttpException</code> để ném lỗi từ Service/Controller. <code>GlobalExceptionHandler</code> sẽ tự động bắt và trả về format chuẩn.',
            throw_title: 'Throw Exception (Ném Lỗi)',
            standard_title: 'Standard Response (Phản hồi Chuẩn)'
        },
        code: {
            comment_status: '// Mã HTTP Status',
            comment_msg: '// Thông điệp Human readable',
            comment_payload: '// Payload chi tiết',
            comment_success: '// 1. Trả về thành công',
            comment_manual_error: '// 2. Trả về lỗi thủ công (ít dùng, thường throw Exception)',
            comment_call_service: '// 1. Gọi Service lấy Page<DTO>',
            comment_wrap: '// 2. Wrap vào PagedResponse & HttpApiResponse',
            comment_throw: '// Ném lỗi với Status Code và Message tùy chỉnh',
            msg_success: '"Success"',
            msg_not_found: '"Không tìm thấy sản phẩm"',
            msg_user_not_found: '"Không tìm thấy người dùng với ID: " + id',
            msg_user_404: '"Không tìm thấy người dùng với ID: 123"'
        }
    },
    api_list: {
        title: '12. Các phương thức Base Service',
        subtitle: 'Danh sách các phương thức CRUD mạnh mẽ có sẵn trong <code>AbService</code>.',
        table: {
            signature: 'Chữ ký Phương thức (Method Signature)',
            desc: 'Mô tả & Return'
        },
        read: {
            title: '12.1 Các Service Đọc (Read Services)',
            detail_title: '12.1.1 IReadDetailService',
            detail_subtitle: '(Single Entity Lookup)',
            summary_title: '12.1.2 IReadSummaryService',
            summary_subtitle: '(List & Search)',
            summary_note: '<strong>Khuyên dùng:</strong> Luôn ưu tiên sử dụng các hàm nhận tham số <code>Pageable</code>.',
            items: {
                findById_entity: 'Lấy Entity gốc.',
                findById_dto: 'Lấy và chuyển đổi sang DTO.',
                findById_dto_lang: 'Lấy DTO đa ngôn ngữ.',
                findById_spec: 'Lấy DTO theo ID và điều kiện Spec.',
                findById_spec_lang: 'Lấy DTO đa ngôn ngữ theo ID và Spec.',
                findOne_entity: 'Tìm một Entity theo Spec.',
                findOne_dto: 'Tìm một DTO theo Spec.',
                findOne_dto_lang: 'Tìm một DTO đa ngôn ngữ theo Spec.',
                findAll_page_spec_dto: 'Phân trang + Sort + Filter + DTO.',
                findAll_page_spec_lang: 'Phân trang + Sort + Filter + DTO đa ngôn ngữ.',
                findAll_page_spec_entity: 'Phân trang trả về Entity.',
                findAll_list: 'Toàn bộ danh sách Entity.',
                findAll_list_dto: 'Toàn bộ danh sách DTO.',
                findAll_list_dto_lang: 'Toàn bộ danh sách DTO đa ngôn ngữ.',
                findAll_list_spec: 'Danh sách Entity theo Spec.',
                findAll_list_spec_dto: 'Danh sách DTO theo Spec.',
                findAllById: 'Tìm theo danh sách ID.',
                findAllById_dto: 'Tìm theo danh sách ID trả về DTO.',
                findAllById_dto_lang: 'Tìm theo danh sách ID trả về DTO đa ngôn ngữ.',
                findAll_page_simple: 'Phân trang đơn giản.',
                findAll_page_dto: 'Phân trang trả về DTO.',
                findAll_page_dto_lang: 'Phân trang trả về DTO đa ngôn ngữ.',
                findAll_page_spec_dto_simple: 'Phân trang + Spec trả về DTO.',
                findAll_page_spec_dto_lang_simple: 'Phân trang + Spec trả về DTO đa ngôn ngữ.',
                count: 'Đếm.',
                exists: 'Checked tồn tại.'
            }
        },
        write: {
            title: '12.2 Các Service Ghi (Write Services)',
            create_title: '12.2.1 ICreateService',
            update_title: '12.2.2 IUpdateService',
            delete_title: '12.2.3 IDeleteService',
            items: {
                create_entity: 'Lưu thẳng Entity.',
                create_dto: 'Tạo từ DTO.',
                create_res: 'Tạo Entity trả về DTO.',
                create_dto_res: 'Tạo từ DTO trả về DTO khác.',
                create_dto_dto: 'Tạo từ DTO trả về DTO.',
                update_entity_id: 'Update Entity theo ID.',
                update_entity: 'Update Entity (giả định tồn tại).',
                save_entity: 'Lưu hoặc Cập nhật.',
                update_dto_id: 'Update từ DTO theo ID.',
                update_entity_res: 'Update Entity trả về DTO.',
                save_entity_res: 'Save trả về DTO.',
                update_dto_res: 'Update từ DTO trả về DTO.',
                save_dto_res: 'Save từ DTO trả về DTO.',
                update_req_res: 'Update Req/Res DTO pattern.',
                update_bulk: 'Bulk Update theo Spec.',
                delete_id: 'Xóa theo ID.',
                delete_entity: 'Xóa (có check ID).',
                delete_dto: 'Xóa (dùng DTO check ID).',
                delete_res: 'Xóa trả về DTO.',
                delete_dto_res: 'Xóa từ DTO trả về DTO.',
                delete_id_res: 'Xóa ID trả về DTO.',
                delete_spec: 'Bulk Delete theo Spec.'
            }
        },
        hooks: {
            title: '12.3 Service Hooks',
            desc: 'Các hooks cho phép bạn can thiệp vào quy trình CRUD mà không cần override toàn bộ phương thức. Hãy override chúng trong <code>ServiceImpl</code> của bạn.',
            read: {
                title: 'Read Hooks (Đọc dữ liệu)',
                entity_phase: '1. Entity Phase',
                entity_desc: 'Chạy ngay sau khi DB trả về. Dùng để tính toán transient fields.',
                dto_phase: '2. DTO Phase',
                dto_desc: 'Chạy sau khi map sang DTO. Dùng để enrich data hướng view.'
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
        title: '13. Lưu ý Quan trọng',
        subtitle: 'Các lưu ý quan trọng để sử dụng framework hiệu quả và tránh các lỗi thường gặp.',
        modularity: {
            title: '13.1 Chiến lược Module hóa',
            desc: 'Thay vì tạo ra các "God Class" khổng lồ, hãy áp dụng chiến lược <strong>"Right-sizing"</strong> (dùng đủ chức năng) cho cả Controller và Service.',
            controller_title: 'Controller Layer',
            controller_desc: 'Dùng cơ chế <strong>Traits (Interface)</strong> để lắp ghép API.',
            controller_link: 'Xem Menu Traits tại Section 8.3',
            service_title: 'Service Layer',
            service_desc: 'Chọn đúng <strong>Base Class</strong> để giới hạn quyền truy cập DB.',
            service_link: 'Xem Base Class Selector tại Section 7.1'
        },
        advanced: {
            title: '13.2 Mẫu Sử dụng Nâng cao',
            desc: 'Tận dụng tối đa sức mạnh của kế thừa và generic để xây dựng hệ thống linh hoạt.',
            composite: {
                title: 'Composite Service (Aggregator)',
                desc: 'Đừng cố nhồi nhét mọi thứ vào một Generic Service. Hãy tạo một Service "Điều phối" (Aggregator) để gọi nhiều Service generic khác nhau.'
            },
            soft_delete: {
                title: 'Global Soft Delete Logic',
                desc: 'Triển khai xóa mềm (không xóa vật lý khỏi DB) theo hai cách phổ biến:',
                method1_title: 'Cách 1: Override tại Service Layer',
                method1_desc: 'Phù hợp khi bạn muốn kiểm soát logic xóa tập trung tại Service.',
                method2_title: 'Cách 2: Sử dụng Hibernate Annotation tại Entity',
                method2_desc: 'Trong suốt (transparent), tự động áp dụng cho tất cả các câu query (Find, List, v.v.).'
            },
            filter: {
                title: 'Complex Dynamic Filtering (Full Spec)',
                desc: 'Khi cần lọc nâng cao (khoảng giá, join bảng phức tạp), hãy kết hợp <code>Custom Param</code> và <code>Custom Specification</code>.'
            }
        },
        best_practices: {
            title: '13.3 Thực hành Tốt nhất',
            constructor_title: 'DTO Constructor',
            constructor_desc: 'Tất cả DTO bắt buộc phải có <strong>Public No-Args Constructor</strong> để Reflection hoạt động.',
            override_title: 'Override Method',
            override_create: 'override <code>toEntity()</code>',
            override_update: 'override <code>updateEntity()</code>',
            override_res: 'override <code>fromEntity()</code>',
            optimization_title: 'Mẹo Tối ưu (Optimization Tips)',
            opt_index: 'Đánh index cho các cột <code>@JoinColumn</code>.',
            opt_lazy: 'Luôn dùng <code>FetchType.LAZY</code> cho quan hệ To-Many.'
        },
        troubleshooting: {
            title: '13.4 Xử lý Sự cố',
            n1_title: 'Vấn đề N+1 Query',
            n1_method1: 'Cách 1: Sử dụng EntityGraph',
            n1_method2: 'Cách 2: Sử dụng Specification fetch',
            over_fetching_title: 'Vấn đề Over-fetching (Lấy dư dữ liệu)',
            over_fetching_method: 'Tách bảng vật lý (OneToOne Lazy)'
        },
        code: {
            trait_read: '// 1. Trait Read',
            trait_base: '// 2. Base',
            inject_service: '// Inject Service (có thể là ReadOnlyService)',
            only_methods: '// Chỉ có các method: findById, findAll, findOne...',
            no_methods: '// Không có: create, update, delete',
            has_methods: '// Có: create, update, save, find...',
            no_delete: '// KHÔNG CÓ: delete',
            only_fetch: '// Chỉ fetch khi return type không phải là count (Long)',
            split_column: '// Tách cột nặng sang bảng "product_details"',
            important_fetch: '// Quan trọng: fetch = LAZY và optional = false',
            heavy_column: '// Cột nặng',
            use_findbyid: '// Tận dụng findById có sẵn của Generic Service',
            business_logic: '// Thực hiện logic nghiệp vụ tổng hợp...',
            soft_delete_logic: '// Logic xóa mềm',
            param_filter: '// 1. Request Param hỗ trợ filter đa dạng',
            spec_join: '// 2. Specification xử lý Join và Range',
            leverage_search: '// Tận dụng logic search cơ bản của framework'
        }
    },
    app: {
        title: 'Generic Service',
        search_placeholder: 'Tìm kiếm...',
        author: 'Tác giả',
        menu: {
            intro: '1. Giới thiệu',
            intro_solution: '1.1. Giải pháp',
            intro_features: '1.2. Các chức năng chính',
            intro_pros_cons: '1.3. Ưu nhược điểm',
            intro_security: '1.4. Sự an toàn & Minh bạch',

            architecture: '2. Kiến trúc & Vòng đời',
            architecture_diagram: '2.1. Sơ đồ Kiến trúc',
            framework_spec: '2.2. Phân cấp Class',
            generic_system: '2.3. Hệ thống Generic Type',
            request_lifecycle: '2.4. Vòng đời Request',

            installation: '3. Cài đặt & Cấu hình',
            installation_maven: '3.1. Cấu hình Maven/Gradle',
            installation_local: '3.2. Môi trường Local',
            installation_config: '3.3. Cấu hình Ứng dụng',

            quick_start: '4. Bắt đầu nhanh',

            core_entity_repo: '5. Entity & Repository',
            core_entity: '5.1. Định nghĩa Entity',
            core_repo: '5.2. Triển khai Repository',

            dtos: '6. Data Transfer Objects (DTO)',
            dto_request: '6.1. Request DTO',
            dto_response: '6.2. Response DTO',
            dto_i18n: '6.3. Hỗ trợ Đa ngôn ngữ',

            service_layer: '7. Tầng Service',
            core_service: '7.1. Lựa chọn Base Class',
            service_hooks: '7.2. Các Hooks Vòng đời',

            controller_layer: '8. Tầng Controller',
            controller_hierarchy: '8.1. Phân cấp Class',
            core_controller: '8.2. Controller Tiêu chuẩn',
            controller_traits: '8.3. Controller Traits (Module hóa)',
            custom_api: '8.4. API Custom (Tùy chỉnh)',

            validation: '9. Hệ thống Validation',
            val_basic: '9.1. Ràng buộc Cơ bản',
            val_custom: '9.2. Validator Tùy chỉnh',
            val_advanced: '9.3. Ràng buộc SQL Tự nhiên',

            specifications: '10. Specification & Tim kiếm',
            spec_default: '10.1. API Tìm kiếm Tích hợp',
            spec_custom: '10.2. Bộ lọc Tùy chỉnh (Advance)',

            response_handling: '11. Xử lý Phản hồi (Response)',
            res_structure: '11.1. Cấu trúc Phản hồi',
            res_exception: '11.2. Xử lý Ngoại lệ',

            api_list: '12. Các phương thức Base Service',
            api_read: '12.1. Thao tác Đọc (Read)',
            api_write: '12.2. Thao tác Ghi (Write)',
            api_hooks: '12.3. Service Hooks',

            notes: '13. Lưu ý Quan trọng',
            notes_modularity: '13.1. Chiến lược Module hóa',
            notes_advanced: '13.2. Mẫu Sử dụng Nâng cao',
            notes_best_practices: '13.3. Thực hành Tốt nhất',
            notes_troubleshooting: '13.4. Xử lý Sự cố'
        },
        keywords: {
            intro: 'Generic Service Framework, giải pháp CRUD, boilerplate code, Spring Boot Backend',
            architecture: 'Technical spec, request flow, generic structure',
            installation: 'Maven Central, tích hợp dự án, repository',
            quick_start: 'Quick start guide, copy paste code example, 5 step tutorial',
            core_entity_repo: 'Database mapping, JPA, module Product',
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
