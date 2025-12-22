package com.example.demo.validation;

import com.example.demo.domain.Model;
import com.example.demo.dto.brand.BrandRequestWithRelations;
import com.example.demo.repository.ModelRepository;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * Validator implementation cho {@link BrandModelCategoryValid}.
 * <p>
 * **Mục đích:**
 * - Đảm bảo tính nhất quán dữ liệu giữa Brand, Model và Category.
 * - Quy tắc nghiệp vụ: Một Brand chỉ được bán các Product thuộc Model mà Model
 * đó hỗ trợ các Category
 * nằm trong danh mục kinh doanh của Brand.
 * - Ví dụ: Brand "Apple" bán "Iphone 15" (Model Phone). Thì Category "Phone"
 * phải nằm trong danh mục của "Apple".
 * <p>
 * **Cơ chế hoạt động:**
 * 1. Lấy `modelId` và `categoryIds` từ request.
 * 2. Fetch thông tin Model từ DB -> Lấy danh sách Categories của Model.
 * 3. Kiểm tra logic tập hợp: `brandCategoryIds` (từ request) phải chứa tất cả
 * `modelCategoryIds`.
 */
@Component
public class BrandModelCategoryValidator implements ConstraintValidator<BrandModelCategoryValid, Object> {

    /**
     * Repository dùng để truy vấn thông tin Model.
     * <p>
     * Cần thiết để lấy danh sách Category gốc của Model từ database, đảm bảo so
     * sánh
     * với dữ liệu chính xác nhất (source of truth).
     */
    @Autowired
    private ModelRepository modelRepository;

    /**
     * Thực hiện logic validation chi tiết.
     * <p>
     * **Các bước xử lý:**
     * 1. **Kiểm tra kiểu dữ liệu:** Đảm bảo object cần validate là
     * {@link BrandRequestWithRelations}.
     * 2. **Kiểm tra tiền điều kiện:** Nếu `modelId` là null, bỏ qua validation này
     * (để các annotation @NotNull xử lý nếu có).
     * 3. **Truy xuất dữ liệu:** Tìm `Model` từ DB theo `modelId`. Nếu không tồn
     * tại, coi là hợp lệ (để @ExistIn xử lý).
     * 4. **Chuẩn bị dữ liệu so sánh:**
     * - Lấy tập `brandCategoryIds` từ request (categories mà brand muốn bán).
     * - Lấy tập `modelCategoryIds` từ Model trong DB (categories mà model hỗ trợ).
     * 5. **Kiểm tra tập hợp con:**
     * - Kiểm tra xem TẤT CẢ `brandCategoryIds` có nằm trong `modelCategoryIds`
     * không.
     * - Logic: Brand không được phép bán Category mà Model không hỗ trợ.
     *
     * @param value   đối tượng cần validate (thường là BrandCreateReq hoặc
     *                BrandUpdateReq).
     * @param context ngữ cảnh validation của Hibernate Validator.
     * @return `true` nếu hợp lệ hoặc bỏ qua, `false` nếu vi phạm rule.
     */
    @Override
    @SuppressWarnings("null")
    public boolean isValid(Object value, ConstraintValidatorContext context) {
        if (!(value instanceof BrandRequestWithRelations)) {
            return true;
        }
        BrandRequestWithRelations req = (BrandRequestWithRelations) value;

        if (req.getModelId() == null) {
            return true;
        }

        Model model = modelRepository.findById(req.getModelId()).orElse(null);
        if (model == null) {
            return true;
        }

        Set<Long> brandCategoryIds = req.getCategoryIds() == null ? Collections.emptySet() : req.getCategoryIds();
        Set<Long> modelCategoryIds = model.getModelCategories().stream()
                .map(mc -> mc.getCategory().getId())
                .collect(Collectors.toSet());

        if (!brandCategoryIds.containsAll(modelCategoryIds)) {
            return false;
        }
        return true;
    }
}
