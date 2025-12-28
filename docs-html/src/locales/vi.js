export default {
    intro: {
        title: 'Giới thiệu',
        p1: 'Trong bối cảnh phát triển các ứng dụng Spring Boot quy mô lớn, các lập trình viên thường xuyên bị vướng vào vòng xoáy của các tác vụ lặp đi lặp lại — phải viết đi viết lại mã nguồn boilerplate cho Controller, Service, và Repository cho từng thực thể từ User, Product đến Order. Sự dư thừa này không chỉ kìm hãm tốc độ phát triển ban đầu mà còn tiềm ẩn rủi ro lớn về "cơn ác mộng" bảo trì cũng như sự thiếu nhất quán trong toàn bộ hệ thống.',
        p2: '<strong>JPA Spring Boot Generic Service</strong> chính là lời giải toàn diện cho bài toán này. Đây là một khung kiến trúc (framework) mạnh mẽ được thiết kế để đóng gói toàn bộ các thao tác CRUD chuẩn, bộ lọc động (dynamic filtering), và ánh xạ dữ liệu (DTO mapping) vào một tầng xử lý tái sử dụng cao. Chỉ cần kế thừa interface <code>IController</code>, ứng dụng của bạn ngay lập tức thừa hưởng trọn vẹn bộ API chuẩn hóa. Bạn định nghĩa cấu trúc một lần, và framework sẽ lo liệu mọi tác vụ nền tảng nặng nhọc, cho phép bạn tập trung 100% vào logic nghiệp vụ cốt lõi.',
        quote: '"Framework sẽ tự động cung cấp bộ máy xử lý mạnh mẽ bao gồm CRUD, Validation nâng cao và JPA Specification ngay tại tầng <strong>Service</strong>, giải phóng bạn khỏi các công việc nhàm chán để tập trung hoàn toàn vào logic nghiệp vụ đặc thù."',
        features_title: 'Các chức năng chính',
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
        pros_title: 'Ưu điểm',
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
        title: 'Kiến trúc & Vòng đời',
        subtitle: 'Hiểu rõ cách hệ thống vận hành bên trong.',
        diagram_title: 'Sơ đồ Kiến trúc',
        diagram_desc: 'Mô hình tổng quan về sự tương tác giữa các tầng Controller, Service và Repository.',
        class_hierarchy_title: 'Phân cấp Interface',
        class_hierarchy_desc: 'Khác với kiến trúc phân lớp truyền thống, framework sử dụng mô hình "Interface Composition" linh hoạt. Bạn lắp ghép các chức năng (Read, Create, Update, Delete) như những mảnh ghép LEGO thông qua các phương thức default trong Interface.',
        services: {
            base: 'Chứa Utils (Mapping, Logging)',
            read_summary: 'Xử lý FindAll / Paging',
            read_detail: 'Xử lý FindOne / ById',
            create: 'Xử lý Create',
            update: 'Xử lý Update / Save',
            delete: 'Xử lý Delete',
            full: 'FULL CRUD + Specification'
        },
        generic_type_title: 'Hệ thống Generic Type',
        generic_type_desc: 'Type safety đảm bảo dữ liệu được kiểm soát chặt chẽ từ Controller xuống Service.',
        table: { type: 'Loại (Type)', desc: 'Mô tả' },
        types: {
            e: '<strong>Entity Class:</strong> Thực thể JPA (VD: Product).',
            id: '<strong>PK Type:</strong> Kiểu khóa chính (VD: Long, UUID).',
            c_rq: '<strong>Create Request DTO:</strong> DTO tạo mới (implement IDto).',
            u_rq: '<strong>Update Request DTO:</strong> DTO cập nhật (implement IDto).'
        },
        lifecycle_title: 'Vòng đời Request',
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
        title: 'Cài đặt',
        intro: 'Framework được thiết kế để dễ dàng tích hợp vào bất kỳ dự án Spring Boot nào thông qua <strong>Maven</strong> hoặc <strong>Gradle</strong>, giảm thiểu tối đa công sức cấu hình thủ công.',
        requirements: {
            title: 'Yêu cầu Hệ thống',
            java: 'Java 17 trở lên (Bắt buộc cho Records & Sealed Classes)',
            springboot: 'Spring Boot 3.0+ (Jakarta EE 9/10)',
            hibernate: 'Hibernate Validator (Chuẩn)'
        },
        tested_versions: {
            title: 'Phiên bản đã Test',
            priority_label: 'Tương thích: ',
            priority_value: 'Đã xác thực'
        },
        maven: {
            title: 'Tích hợp qua Maven/Gradle',
            comment_xml: '&lt;!-- Thêm vào pom.xml --&gt;',
            comment_version: '&lt;!-- Kiểm tra LATEST_VERSION tại GitHub hoặc File pom.xml của Core --&gt;'
        },
        gradle: {
            title: 'Sử dụng Gradle',
            comment_file: '// Thêm vào build.gradle',
            comment_version: '// Thay thế LATEST_VERSION'
        },
        local: {
            title: 'Phát triển Local',
            desc: 'Nếu muốn tùy chỉnh core hoặc sử dụng phiên bản chưa publish lên Central, bạn hãy cài đặt vào <strong>Local Maven Repository</strong>:',
            comment_cmd: '# 1. Di chuyển vào thư mục java-core',
            note: 'Sau bước này, các dự án trong máy bạn có thể resolve dependency trực tiếp từ thư mục .m2 local.'
        },
        config: {
            title: 'Tự động Cấu hình (Auto-Config)',
            desc: 'Nhờ cơ chế <strong>Auto Configuration</strong> của Spring Boot, các component (Service, Controller, Repository) trong thư viện sẽ được tự động scan và đăng ký. Bạn <strong>không</strong> cần phải thêm <code>@ComponentScan</code> thủ công.',
            comment_package: '// Class ứng dụng',
            comment_lib: ''
        },
        important: '<strong>Mẹo:</strong> Luôn kiểm tra phiên bản mới nhất tại'
    },
    quick_start: {
        title: 'Bắt đầu nhanh',
        explain_label: 'Giải thích',
        intro: 'Xây dựng một bộ CRUD API hoàn chỉnh cho tài nguyên <code>Product</code> chỉ trong dưới 5 phút. Hướng dẫn này sử dụng <strong>Lombok</strong> để code tóm gọn nhất có thể.',
        steps: {
            entity: { title: 'Định nghĩa Entity', desc: 'Một JPA Entity tiêu chuẩn đại diện cho tài nguyên <strong>Product</strong>.' },
            repo: { title: 'Tạo Repository', desc: 'Kế thừa <code>IRepository</code> để thừa hưởng các thao tác database chuẩn.', comment: '// Không cần code thêm cho CRUD cơ bản' },
            dto: {
                title: 'Định nghĩa các DTO',
                desc: 'Implement <code>IDto&lt;Product&gt;</code> để mapping tự động. Tách biệt DTO Create, Update và Response để đảm bảo bảo mật và kiểm soát dữ liệu.',
                comment_create: '// 1. Request tạo mới',
                comment_update: '// 2. Request cập nhật',
                comment_res: '// 3. Response DTO'
            },
            service: { title: 'Triển khai Service', desc: 'Implement <code>IService</code> để cung cấp nghiệp vụ. Override <code>getRepository()</code> để liên kết repository.', comment: '// Việc implement Interface tự động cung cấp các phương thức CRUD mặc định' },
            controller: {
                title: 'Triển khai Controller',
                desc: 'Implement <code>IController</code> để expose REST APIs. Kết nối service và chỉ định các class DTO cho việc mapping phản hồi.',
                comment_summ: '// Chỉ định DTO cho phản hồi danh sách (List)',
                comment_detail: '// Chỉ định DTO cho phản hồi chi tiết (Detail)'
            }
        },
        more_info: 'Bạn muốn tìm hiểu sâu hơn về Validation tùy chỉnh hay tìm kiếm nâng cao?',
        view_details: 'Xem hướng dẫn chi tiết'
    },
    entity_repo: {
        title: 'Tầng Entity & Repository',
        subtitle: 'Thiết lập nền tảng dữ liệu cho ứng dụng của bạn.',
        entity: {
            title: 'Định nghĩa Entity',
            desc: 'Bắt đầu bằng việc định nghĩa <strong>JPA Entity</strong> tiêu chuẩn phản ánh cấu trúc cơ sở dữ liệu. Framework hỗ trợ mọi loại ID bao gồm <code>Long</code>, <code>String</code>, và <code>UUID</code>.',
            required: 'BẮT BUỘC',
            optional: 'TÙY CHỌN',
            annotations: {
                entity: 'Đánh dấu class là một thực thể JPA.',
                table: 'Tùy chỉnh tên bảng và Index để tối ưu hiệu năng.',
                nationalized: 'Hỗ trợ lưu chuỗi Unicode (NVARCHAR) cho SQL Server.',
                builder: 'Kích hoạt <strong>Builder pattern</strong> giúp khởi tạo đối tượng dễ dàng hơn.'
            },
            code: {
                comment: 'Entity đại diện cho tài nguyên Product.',
                comment_helper: '// Phương thức Helper quản lý quan hệ Many-to-Many thông qua @Transient'
            }
        },
        repo: {
            title: 'Triển khai Repository',
            diagram: {
                standard: 'CRUD Chuẩn',
                advanced: 'Tìm kiếm & Thống kê',
                ready: 'Giao diện Hợp nhất',
                required: 'Yêu cầu bởi Service'
            },
            desc: 'Thay vì kế thừa các Interface lẻ tẻ của Spring, hãy kế thừa <code>IRepository</code>. Interface hợp nhất này kết hợp sức mạnh của <strong>CrudRepository</strong>, <strong>JpaRepository</strong> và <strong>JpaSpecificationExecutor</strong>, trang bị ngay cho tầng dữ liệu cả các thao tác cơ bản lẫn khả năng lọc động nâng cao.',
            note: '<strong>Lưu ý:</strong> Repository của bạn <strong>BẮT BUỘC</strong> phải kế thừa <code>IRepository</code> để tương thích với tầng Service của framework.'
        }
    },
    dtos: {
        title: 'Đối tượng DTO (Data Transfer Objects)',
        subtitle: 'Tách biệt hoàn toàn Contract của API với cấu trúc Database.',
        req: {
            title: 'Request DTO',
            desc: 'Phân tách DTO cho <strong>Tạo mới</strong> và <strong>Cập nhật</strong> giúp kiểm soát dữ liệu đầu vào chặt chẽ (VD: cho phép sửa `price` nhưng cấm sửa `username`). Implement <code>IDto&lt;E&gt;</code> để kích hoạt chuyển đổi tự động.'
        },
        res: {
            title: 'Response DTO',
            desc: 'Định hình dữ liệu trả về cho client. Bằng cách implement <code>IDto</code>, framework sẽ tự động map các field từ Entity sang DTO thông qua <code>BeanUtils</code>.',
            tips: '<strong>Mẹo:</strong> Nếu tên field của DTO trùng khớp với Entity, bạn <strong>KHÔNG CẦN</strong> viết bất kỳ code mapping thủ công nào.'
        },
        i18n: {
            title: 'Hỗ trợ Đa ngôn ngữ',
            desc: 'Framework hỗ trợ Localization ngay tại tầng DTO. Override hàm <code>fromEntity(entity, language)</code> để trả về dữ liệu khác nhau dựa trên header <code>Accept-Language</code> của client.'
        },
        code: {
            comment_convert: '// Convert DTO -> Entity\n        // 1. Tự động copy field đơn giản\n        // 2. Xử lý field phức tạp (categoryIds -> Set<Category>)',
            comment_update: '// 1. QUAN TRỌNG: Gọi super để copy các field cơ bản trước\n        // 2. Cập nhật an toàn quan hệ Many-to-Many',
            comment_auto: '// Không cần code mapping! Các field như "name", "price" tự động được copy.',
            comment_i18n: '// Logic tùy chỉnh để trả về dữ liệu theo ngôn ngữ (lang)'
        }
    },
    service_layer: {
        title: 'Tầng Service Handler',
        subtitle: 'Xử lý logic nghiệp vụ và tích hợp các life-cycle hooks.',
        base: {
            title: 'Lựa chọn Interface',
            desc: 'Framework áp dụng hướng tiếp cận <strong>"Interface Composition" (Lắp ghép)</strong>. Thay vì kế thừa một lớp cơ sở khổng lồ, bạn chỉ cần implement những interfaces chứa chức năng bạn thực sự cần. Điều này giữ cho service của bạn nhẹ nhàng và đúng trọng tâm.',
            menu: {
                read_summary: { question: 'Cần danh sách chuẩn & phân trang?', features: 'exists, count' },
                read_detail: { question: 'Cần xem chi tiết theo ID?', features: 'findById, findOne' },
                create: { question: 'Cần chức năng tạo mới?' },
                update: { question: 'Cần chức năng cập nhật?' },
                delete: { question: 'Cần chức năng xóa?' },
                full: { title: 'IService (Full CRUD)', desc: 'Interface tổng hợp bao gồm TẤT CẢ tính năng.', rec: 'Khuyên dùng' }
            },
            code_comment: '// Ví dụ: Service implement IService để có full tính năng CRUD'
        },
        hooks: {
            title: 'Lifecycle Hooks',
            desc: 'Các <strong>Default Methods</strong> trong interface đã được trang bị sẵn các điểm "Hook". Bạn có thể override lại các phương thức này trong Service để chèn thêm logic tùy chỉnh mà không cần viết lại luồng CRUD cốt lõi.',
            timeline: {
                write_flow: 'Luồng Ghi (Create/Update/Delete)',
                read_flow: 'Luồng Đọc (Read)',
                input: 'Entity từ Controller',
                repo_action: 'Save / Delete xuống DB',
                repo_read: 'Lấy dữ liệu thô từ Database',
                map_dto: 'Chuyển đổi Entity -> DTO'
            },
            hooks_list: 'Các Hook khả dụng:',
            code_comment_before: '// Tự động tính toán giá trước khi lưu',
            code_comment_after: '// Gửi thông báo sau khi tạo thành công',
            code_javadoc_desc: 'Service xử lý nghiệp vụ cho Product.',
            code_javadoc_extends: 'Implement IService để tận dụng logic CRUD có sẵn.'
        }
    },
    controller_layer: {
        title: 'Tầng Controller',
        subtitle: 'Cung cấp API đơn giản thông qua việc lắp ghép Interfaces.',
        hierarchy: {
            title: 'Phân cấp Interface',
            desc: 'Tầng Controller sử dụng mô hình <strong>"Lắp ghép Interface" (Interface Composition)</strong>. Bạn không bị bắt buộc phải thừa kế một class cụ thể nào. Thay vào đó, bạn khai báo những "năng lực" (Traits) mà bạn muốn Controller của mình sở hữu.',
            base_desc: 'Interface Gốc',
            abstract_desc: 'Interface Tổng hợp',
            implements: 'implements',
            diagram: {
                available_traits: 'Các Trait có sẵn',
                standard: 'Tiêu chuẩn',
                custom: 'Tùy chỉnh',
                inherits: 'Tự động kế thừa <strong>TẤT CẢ</strong> traits.',
                selected: 'Chỉ các trait được chọn mới được kích hoạt.'
            }
        },
        core: {
            title: 'Controller Tiêu chuẩn',
            desc: 'Để tạo một REST Controller tiêu chuẩn, hãy implement interface <code>IController</code>. Interface tổng hợp này kế thừa toàn bộ các traits CRUD, cung cấp ngay lập tức bộ API đầy đủ.',
            note: '<strong>Yêu cầu:</strong> Bạn cần override `getBaseService()` (để cung cấp logic nghiệp vụ) và các getter DTO class (để định nghĩa định dạng trả về).'
        },
        traits: {
            title: 'Controller Traits (Đặc tính)',
            desc: 'Mỗi interface (Trait) tương ứng trực tiếp với các REST endpoints cụ thể. Bạn có thể mix & match (lắp ghép) chúng để định nghĩa chính xác phạm vi API của mình.',
            mix_match_title: 'Chiến thuật Lắp ghép:',
            read_only: {
                title: 'Controller Chỉ Đọc',
                desc: 'Chỉ cung cấp dữ liệu để xem (VD: Danh mục công khai, Nhật ký hệ thống).'
            },
            append_only: {
                title: 'Controller Chỉ Thêm',
                desc: 'Cho phép thêm dữ liệu mới nhưng cấm sửa đổi (VD: Log tương tác, Dữ liệu IoT).'
            },
            table: {
                header: { trait: 'Interface (Trait)', endpoint: 'Endpoints Kích hoạt', usecase: 'Mục đích sử dụng' },
                read_summary: { title: 'IReadSummaryController', usecase: 'Xem danh sách, Phân trang & Lọc' },
                read_detail: { title: 'IReadDetailController', usecase: 'Xem chi tiết bản ghi theo ID' },
                create: { title: 'ICreateController', usecase: 'Tạo mới dữ liệu' },
                update: { title: 'IUpdateController', usecase: 'Cập nhật toàn bộ (PUT) hoặc một phần (PATCH)' },
                delete: { title: 'IDeleteController', usecase: 'Xóa (Mềm hoặc Cứng) theo ID' }
            },
            tip: '<strong>Mẹo:</strong> Bạn cũng có thể áp dụng chiến thuật "Lắp ghép Interface" này cho cả <strong>Service Layer</strong>! Nếu Controller chỉ Read-Only, Service của bạn chỉ cần implement <code>IReadService</code> để gọn nhẹ nhất.'
        },
        custom: {
            title: 'API Tùy chỉnh',
            desc: 'Bạn hoàn toàn tự do viết thêm các endpoints tùy chỉnh bằng các annotation chuẩn của Spring MVC bên cạnh các generic endpoints.'
        },
        code: {
            comment_class: '// Implement IController để có đầy đủ CRUD operations',
            comment_summ: 'Định nghĩa class DTO cho API Danh sách',
            comment_detail: 'Định nghĩa class DTO cho API Chi tiết',
            comment_readonly: '// Implement Read Interfaces -> Chỉ có các API ĐỌC',
            comment_public: '// API Public -> Chỉ được Xem & Tạo, cấm Sửa/Xóa',
            comment_custom_filter: '// Tái sử dụng logic của base service'
        }
    },
    validation: {
        title: 'Hệ thống Validation',
        subtitle: 'Hệ thống kiểm tra dữ liệu đầu vào mạnh mẽ, tích hợp sẵn với Spring Validation. Đảm bảo dữ liệu sạch trước khi vào Business Logic.',
        strategy: {
            level1: { title: 'Basic Constraints', desc: 'Kiểm tra định dạng, độ dài, null...' },
            level2: { title: 'Business Logic', desc: 'Validation phức tạp phụ thuộc nhiều trường.' },
            level3: { title: 'Database Check', desc: 'Ràng buộc chặt chẽ mức Database.' }
        },
        basic: {
            title: 'Ràng buộc Cơ bản',
            desc: 'Các annotation kiểm tra định dạng hoặc ràng buộc đơn giản.',
            exists_unique: { title: '@Exists & @Unique', desc: 'Kiểm tra sự tồn tại của dữ liệu trong Database.' },
            enum_value: { title: '@EnumValue', desc: 'Kiểm tra giá trị String/Int có nằm trong tập hằng số của Enum hay không.' },
            phone_format: { title: '@PhoneNumber & @NoSpecialChars', desc: 'Validation số điện thoại và ký tự đặc biệt.' },
            ids_exist: { title: '@IdsExist', desc: 'Kiểm tra danh sách (Set, List) các ID có tồn tại trong Database hay không.' }
        },
        custom: {
            title: 'Validator Tùy chỉnh',
            desc: 'Sử dụng <strong>Specification</strong> để thực hiện các validation phức tạp.',
            spec: { title: '@SpecValidation (Field Level)', desc: 'Validate trên một trường cụ thể.' },
            dto_spec: { title: '@DtoSpecValidation (Class Level)', desc: 'Khi logic validation phụ thuộc vào <strong>nhiều trường</strong>. Ví dụ: Validate Model và Category phải thuộc về Brand đã chọn.' },
            loader_label: 'Implement Loader:'
        },
        advanced: {
            title: 'Ràng buộc SQL Tự nhiên',
            desc: 'Sử dụng <strong>Native SQL</strong> cho các validation siêu phức tạp trực tiếp dưới database. Hỗ trợ <strong>Cơ chế Bind biến động</strong> từ nhiều nguồn khác nhau.',
            sql: {
                title: '@SqlConstraint',
                desc: 'Tự động bind <code>:value</code> vào field hiện tại' +
                    '<br/>• <strong>path/id</strong>: Lấy từ URL Path (VD: /users/{id})' +
                    '<br/>• <strong>param/type</strong>: Lấy từ Query Parameter (?type=X)' +
                    '<br/>• <strong>field/brandId</strong>: Lấy từ field khác trong DTO' +
                    '<br/>• <strong>header/X-Tenant</strong>: Lấy từ Request Header'
            },
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
        title: 'Specification & Tìm kiếm Động',
        subtitle: 'Xây dựng bộ lọc tìm kiếm linh hoạt, hiệu suất cao mà không cần viết boilerplate.',
        default: {
            title: 'API Tìm kiếm Tích hợp',
            desc: 'Bằng cách triển khai <code>IController</code>, bạn ngay lập tức sở hữu API <code>GET /api/products</code> hỗ trợ phân trang, sắp xếp và tìm kiếm cơ bản <strong>mà không cần viết thêm bất kỳ dòng mã nào</strong>.',
            params_title: 'Các tham số truy vấn hỗ trợ',
            params: {
                page: 'Số thứ tự trang (bắt đầu từ 0). Dùng <code>-1</code> để lấy toàn bộ bản ghi. Mặc định: 0',
                size: 'Số lượng bản ghi mỗi trang (Tối đa: 200). Mặc định: 10',
                sort: 'Trường sắp xếp (VD: price).',
                dir: 'Hướng sắp xếp (asc/desc).',
                search: 'Từ khóa tìm kiếm (khớp theo <code>LIKE %keyword%</code>)',
                searchField: 'Trường cần tìm kiếm (VD: name, code). <strong>Bắt buộc</strong> nếu dùng search.'
            },
            example_title: 'Ví dụ sử dụng:',
            example_explain: '-> Lấy trang 0, 20 bản ghi, sắp xếp theo giá giảm dần, tìm sản phẩm có tên chứa "iphone".'
        },
        custom: {
            title: 'Bộ lọc Tùy chỉnh (Nâng cao)',
            desc: 'Khi bạn cần các bộ lọc phức tạp (VD: lọc theo khoảng giá, lọc theo danh mục), hãy tận dụng <code>GenericSpecification</code> để xây dựng các câu truy vấn JPA động dựa trên Request Params tùy chỉnh của bạn.',
            step1: { title: 'Bước 1: Tạo Request Param Tùy chỉnh', desc: 'Kế thừa <code>BaseRequestParam</code> để thêm các trường lọc đặc thù của bạn (VD: minPrice, maxPrice).' },
            step2: { title: 'Bước 2: Triển khai Custom Specification', desc: 'Tạo một lớp kế thừa <code>GenericSpecification&lt;E&gt;</code> và override <code>toPredicate</code> để xử lý logic lọc của riêng bạn.' },
            step3: { title: 'Bước 3: Liên kết trong Controller', note: '<strong>Mẹo:</strong> Chỉ cần override lại hàm <code>getSpecification</code> để chuyển đổi sang bộ máy tìm kiếm tùy chỉnh của bạn.' }
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
        title: 'Xử lý Phản hồi (Response)',
        subtitle: 'Cấu trúc kết quả trả về đồng nhất và cơ chế xử lý lỗi tập trung.',
        structure: {
            title: 'Cấu trúc Phản hồi',
            desc: 'Thư viện cung cấp 2 lớp wrap chuẩn: <code>HttpApiResponse</code> cho đối tượng đơn/list và <code>PagedResponse</code> cho phân trang.',
            json_title: 'Cấu trúc JSON (HttpApiResponse)',
            paged_title: 'PagedResponse (Phân trang)',
            paged_desc: 'Thay thế <code>Page&lt;T&gt;</code> mặc định để custom fields.'
        },
        exception: {
            title: 'Xử lý Ngoại lệ',
            desc: 'Sử dụng <code>HttpException</code> để ném lỗi từ Service/Controller. <code>GlobalExceptionHandler</code> sẽ tự động bắt và trả về format chuẩn.',
            throw_title: 'Throw Exception (Ném Lỗi)',
            standard_title: 'Standard Response (Phản hồi Chuẩn)'
        },
        code: {
            comment_status: '// Mã HTTP Status',
            comment_msg: '// Thông điệp Human readable',
            comment_success_flag: '// Cờ trạng thái thành công',
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
        title: 'Các phương thức Base Service',
        subtitle: 'Danh sách chi tiết các thao tác <strong>CRUD</strong> và các phương thức tiện ích mà framework cung cấp sẵn để tăng tốc độ phát triển và loại bỏ code lặp lại.',
        table: {
            signature: 'Chữ ký Phương thức (Method Signature)',
            desc: 'Mô tả & Return'
        },
        read: {
            recommend: '★ KHUYÊN DÙNG',
            title: 'Các Service Đọc (Read Services)',
            detail_title: 'IReadDetailService',
            detail_subtitle: '(Single Entity Lookup)',
            summary_title: 'IReadSummaryService',
            summary_subtitle: '(List & Search)',
            summary_note: '<strong>Khuyên dùng:</strong> Luôn ưu tiên sử dụng các hàm nhận tham số <code>Pageable</code>.',
            items: {
                findById_entity: 'Lấy một <strong>Thực thể (Entity)</strong> duy nhất theo khóa chính. Ném <code>HttpException</code> (404) nếu không tìm thấy.',
                findById_dto: 'Tìm thực thể theo ID và chuyển đổi ngay sang <code>DTO</code> để phản hồi.',
                findById_dto_lang: 'Tìm theo ID và ánh xạ sang DTO có hỗ trợ <strong>Đa ngôn ngữ</strong>.',
                findById_spec: 'Tìm kiếm một <code>DTO</code> duy nhất dựa hoàn toàn trên các tiêu chí <code>Specification</code> động.',
                findById_spec_lang: 'Lấy <code>DTO</code> <strong>Đa ngôn ngữ</strong> bằng cách kết hợp <code>ID</code> và các điều kiện lọc <code>Specification</code> bổ sung.',
                findOne_entity: 'Lấy <strong>Thực thể</strong> đầu tiên thỏa mãn điều kiện <code>Specification</code> cung cấp.',
                findOne_dto: 'Lấy một <code>DTO</code> duy nhất dựa trên tiêu chí tìm kiếm động.',
                findOne_dto_lang: 'Lấy một <code>DTO</code> đa ngôn ngữ duy nhất dựa trên tiêu chí động.',
                findAll_page_spec_dto: '<strong>Tìm kiếm Toàn năng:</strong> Lấy danh sách phân trang, sắp xếp và lọc, sau đó chuyển sang <code>DTO</code>.',
                findAll_page_spec_lang: 'Tìm kiếm động toàn diện, trả về danh sách DTO phân trang hỗ trợ <strong>Đa ngôn ngữ</strong>.',
                findAll_page_spec_entity: 'Lấy danh sách <strong>Thực thể</strong> gốc có phân trang dựa trên tiêu chí tìm kiếm.',
                findAll_list: 'Lấy <strong>tất cả</strong> bản ghi trong database dưới dạng thực thể (thận trọng với bảng dữ liệu lớn).',
                findAll_list_dto: 'Lấy <strong>tất cả</strong> bản ghi và chuyển đổi thành danh sách DTO.',
                findAll_list_dto_lang: 'Lấy <strong>tất cả</strong> bản ghi dưới dạng DTO hỗ trợ đa ngôn ngữ.',
                findAll_list_spec: 'Lấy toàn bộ thực thể khớp với tiêu chí mà không dùng phân trang.',
                findAll_list_spec_dto: 'Lấy toàn bộ bản ghi khớp tiêu chí dưới dạng danh sách DTO.',
                findAllById: 'Lấy tập hợp các thực thể dựa trên danh sách các <code>ID</code> cung cấp.',
                findAllById_dto: 'Tìm nhiều bản ghi theo ID và trả về danh sách DTO.',
                findAllById_dto_lang: 'Tìm nhiều bản ghi theo ID dưới dạng DTO đa ngôn ngữ.',
                findAll_page_simple: 'Phân trang cơ bản (page/size) trả về thực thể gốc.',
                findAll_page_dto: 'Phân trang cơ bản trả về danh sách DTO.',
                findAll_page_dto_lang: 'Phân trang cơ bản có hỗ trợ đa ngôn ngữ.',
                findAll_page_spec_dto_simple: 'Phương thức hỗ trợ phân trang kết hợp Specification (Legacy).',
                findAll_page_spec_dto_lang_simple: 'Hỗ trợ phân trang, Specification và Đa ngôn ngữ (Legacy).',
                count: 'Đếm tổng số bản ghi thỏa mãn các tiêu chí lọc cung cấp.',
                exists: 'Kiểm tra xem có ít nhất một bản ghi tồn tại khớp với tiêu chí hay không.'
            }
        },
        write: {
            title: 'Các Service Ghi (Write Services)',
            create_title: 'ICreateService',
            update_title: 'IUpdateService',
            delete_title: 'IDeleteService',
            items: {
                create_entity: 'Lưu trực tiếp một <strong>Thực thể (Entity)</strong> mới vào cơ sở dữ liệu.',
                create_dto: 'Ánh xạ dữ liệu từ <code>DTO</code> đầu vào sang Entity và thực hiện lưu.',
                create_res: 'Tạo bản ghi mới và trả về kết quả dưới dạng một class <code>DTO</code> cụ thể.',
                create_dto_res: 'Nhận một DTO, tạo bản ghi và trả về kết quả qua một DTO view khác.',
                create_dto_dto: 'Viết tắt cho việc tạo từ DTO và trả về DTO phản hồi.',
                update_entity_id: 'Cập nhật một <code>Thực thể</code> hiện có dựa trên ID duy nhất.',
                update_entity: 'Lưu các thay đổi của đối tượng thực thể (giả định đã có ID).',
                save_entity: 'Cơ chế <strong>Upsert</strong>: Lưu bản ghi mới hoặc cập nhật nếu đã tồn tại.',
                update_dto_id: 'Cập nhật bản ghi dùng dữ liệu từ <code>DTO</code> thông qua tìm kiếm ID.',
                update_entity_res: 'Cập nhật thực thể và trả về kết quả dưới dạng DTO.',
                save_entity_res: 'Upsert bản ghi và trả về kết quả dưới dạng DTO.',
                update_dto_res: 'Cập nhật từ DTO đầu vào và trả về DTO kết quả.',
                save_dto_res: 'Upsert từ DTO đầu vào và trả về DTO kết quả.',
                update_id_res: 'Cập nhật bản ghi theo ID và trả về trạng thái mới dưới dạng DTO.',
                update_req_res: '<strong>Mô hình chuẩn:</strong> Cập nhật từ Request DTO và trả về Response DTO.',
                update_bulk: 'Cập nhật hàng loạt các bản ghi thỏa mãn điều kiện <code>Specification</code>.',
                delete_id: 'Xóa vĩnh viễn một bản ghi dựa trên <strong>Khóa chính (Primary Key)</strong>.',
                delete_entity: 'Xóa một đối tượng thực thể cụ thể khỏi cơ sở dữ liệu.',
                delete_res: 'Xóa bản ghi và trả về trạng thái cuối cùng của nó dưới dạng DTO.',
                delete_dto_res: 'Xóa dựa trên thông tin DTO và trả về phản hồi dạng DTO.',
                delete_id_res: 'Xóa theo ID và trả về thông tin dữ liệu đã xóa dưới dạng DTO.',
                delete_spec: 'Xóa hàng loạt toàn bộ các bản ghi thỏa mãn tiêu chí động.'
            }
        },
        hooks: {
            title: 'Vòng đời Service Hooks',
            desc: 'Hooks là các điểm mở rộng chính để chèn logic nghiệp vụ. Chúng cho phép bạn can thiệp vào các giai đoạn cụ thể của vòng đời <strong>CRUD</strong> mà không cần ghi đè toàn bộ phương thức.',
            read: {
                title: 'Hooks Tìm kiếm & Đọc dữ liệu',
                entity_phase: '1. Giai đoạn Thực thể (Entity)',
                entity_desc: 'Được thực thi ngay sau khi dữ liệu được lấy từ DB. Phù hợp nhất để tính toán các trường transient hoặc khởi tạo các tập hợp <code>Lazy</code>.',
                dto_phase: '2. Giai đoạn DTO',
                dto_desc: 'Được thực thi sau khi Thực thể đã được ánh xạ sang DTO. Phù hợp để thêm dữ liệu <strong>đặc thù cho UI</strong> hoặc định dạng lại dữ liệu.'
            },
            create: {
                title: 'Hooks Tạo mới',
                before: '<strong>Trước:</strong> Kiểm tra tính hợp lệ phía server, thiết lập giá trị mặc định, hoặc tiền xử lý dữ liệu.',
                after: '<strong>Sau:</strong> Kích hoạt các tác vụ phụ như gửi Email thông báo hoặc ghi log Audit.'
            },
            update: {
                title: 'Hooks Cập nhật',
                before: '<strong>Trước:</strong> Kiểm tra tính toàn vẹn, quản lý phiên bản thủ công, hoặc cập nhật các trường "ngày chỉnh sửa".',
                after: '<strong>Sau:</strong> Xóa cache hoặc đồng bộ hóa với các hệ thống bên ngoài.'
            },
            delete: {
                title: 'Hooks Xóa',
                before: '<strong>Trước:</strong> Kiểm tra ràng buộc tham chiếu hoặc chuẩn bị logic xóa mềm (soft-delete).',
                after: '<strong>Sau:</strong> Các tác vụ dọn dép sau khi xóa hoặc loại bỏ các tài nguyên liên quan.'
            },
            code_comment_logic: '// Logic tùy chỉnh: kiểm tra ràng buộc nghiệp vụ, thiết lập giá trị mặc định...',
            code_error_price: 'Giá phải là số dương'
        }
    },
    notes: {
        title: 'Lưu ý Quan trọng',
        subtitle: 'Các lưu ý quan trọng để sử dụng framework hiệu quả và tránh các lỗi thường gặp.',
        modularity: {
            title: 'Chiến lược Modularity',
            desc: 'Thay vì tạo ra các "God Class" khổng lồ, hãy áp dụng chiến lược <strong>"Right-sizing"</strong> (dùng đủ chức năng) cho cả Controller và Service.',
            controller_title: 'Controller Layer',
            controller_desc: 'Dùng cơ chế <strong>Traits (Interface)</strong> để lắp ghép API.',
            controller_link: 'Xem Menu Traits tại Section 8.3',
            service_title: 'Service Layer',
            service_desc: 'Chọn đúng <strong>Base Class</strong> để giới hạn quyền truy cập DB.',
            service_link: 'Xem Base Class Selector tại Section 7.1'
        },
        advanced: {
            title: 'Mẫu Sử dụng Nâng cao',
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
                method2_desc: 'Trong suốt (transparent), tự động áp dụng cho tất cả các câu query (Find, List, v.v.).',
                hibernate_old: '// Hibernate <= 6.2 dùng @Where(clause = "deleted = false")',
                hibernate_new: '// Hibernate 6.3+'
            },
            filter: {
                title: 'Complex Dynamic Filtering (Full Spec)',
                desc: 'Khi cần lọc nâng cao (khoảng giá, join bảng phức tạp), hãy kết hợp <code>Custom Param</code> và <code>Custom Specification</code>.'
            }
        },
        best_practices: {
            title: 'Thực hành Tốt nhất',
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
            title: 'Xử lý Sự cố',
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
            intro: 'Giới thiệu',
            intro_solution: 'Giải pháp',
            intro_features: 'Các chức năng chính',
            intro_pros_cons: 'Ưu & Nhược điểm',
            intro_security: 'Bảo mật & Minh bạch',

            architecture: 'Kiến trúc & Vòng đời',
            architecture_diagram: 'Sơ đồ Kiến trúc',
            framework_spec: 'Phân cấp Interface',
            generic_system: 'Hệ thống Generic Type',
            request_lifecycle: 'Vòng đời Request',

            installation: 'Cài đặt & Cấu hình',
            installation_maven: 'Cấu hình Maven/Gradle',
            installation_local: 'Môi trường Local',
            installation_config: 'Cấu hình Ứng dụng',

            quick_start: 'Bắt đầu nhanh',

            core_entity_repo: 'Thực thể & Repository',
            core_entity: 'Định nghĩa Entity',
            core_repo: 'Triển khai Repository',

            dtos: 'Đối tượng DTO',
            dto_request: 'Request DTO',
            dto_response: 'Response DTO',
            dto_i18n: 'Hỗ trợ Đa ngôn ngữ',

            service_layer: 'Tầng Service',
            core_service: 'Lựa chọn Base Class',
            service_hooks: 'Lifecycle Hooks',

            controller_layer: 'Tầng Controller',
            controller_hierarchy: 'Phân cấp Class',
            core_controller: 'Standard Controller',
            controller_traits: 'Controller Traits (Modular)',
            custom_api: 'Custom API',

            validation: 'Hệ thống Validation',
            val_basic: 'Ràng buộc cơ bản',
            val_custom: 'Custom Validator',
            val_advanced: 'Native SQL Constraints',

            specifications: 'Specification & Tìm kiếm',
            spec_default: 'API Tìm kiếm mặc định',
            spec_custom: 'Bộ lọc tùy chỉnh (Nâng cao)',

            response_handling: 'Xử lý phản hồi',
            res_structure: 'Cấu trúc phản hồi',
            res_exception: 'Xử lý ngoại lệ',

            api_list: 'Các phương thức Base Service',
            api_read: 'Thao tác Đọc',
            api_write: 'Thao tác Ghi',
            api_hooks: 'Service Hooks',

            notes: 'Ghi chú quan trọng',
            notes_modularity: 'Chiến lược Modularity',
            notes_advanced: 'Các mẫu nâng cao',
            notes_best_practices: 'Best Practices',
            notes_troubleshooting: 'Xử lý sự cố'
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
    },
    validation_messages: {
        product_name_required: 'Tên sản phẩm là bắt buộc',
        product_price_non_negative: 'Giá phải là số không âm',
        product_categories_not_found: 'Các danh mục được chọn không tồn tại',
        product_categories_some_not_found: 'Một hoặc nhiều danh mục không tồn tại',
        product_name_store_exists: 'Sản phẩm với tên này đã tồn tại trong cửa hàng được chọn',
        category_parent_not_found: 'Danh mục cha không tồn tại',
        category_name_exists: 'Tên danh mục đã được sử dụng',
        user_status_invalid: 'Trạng thái không hợp lệ',
        profile_phone_invalid: 'SĐT không đúng định dạng quốc tế',
        profile_username_special_chars: 'Tên đăng nhập không được chứa ký tự đặc biệt',
        brand_model_category_invalid: 'Thương hiệu không hỗ trợ tất cả danh mục của Model đã chọn'
    }
}
