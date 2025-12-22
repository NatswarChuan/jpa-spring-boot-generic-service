package com.example.demo.validation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import java.lang.annotation.Documented;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import static java.lang.annotation.ElementType.TYPE;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

/**
 * Annotation dùng để validate tính hợp lệ của mối quan hệ giữa Brand, Model và
 * Category.
 * <p>
 * **Mục đích:**
 * - Đảm bảo tính toàn vẹn dữ liệu: Một Brand chỉ có thể bán các sản phẩm thuộc
 * các Category
 * mà Model tương ứng hỗ trợ.
 * - Ngăn chặn tình trạng dữ liệu rác hoặc không nhất quán ngay từ đầu vào.
 * <p>
 * **Ví dụ:**
 * - Model "iPhone 13" hỗ trợ Category ["Phone", "Electronics"].
 * - Brand "Apple Store" muốn bán "iPhone 13".
 * - Request hợp lệ: Brand đăng ký bán Category ["Phone"] hoặc ["Phone",
 * "Electronics"].
 * - Request không hợp lệ: Brand đăng ký bán Category ["Phone", "Clothing"] (vì
 * "Clothing" không thuộc Model).
 * <p>
 * **Cơ chế:**
 * - Sử dụng {@link BrandModelCategoryValidator} để thực hiện logic kiểm tra
 * thực tế.
 * - Áp dụng ở mức Class (TYPE) vì cần truy cập nhiều trường (modelId,
 * categoryIds) cùng lúc.
 */
@Target({ TYPE })
@Retention(RUNTIME)
@Constraint(validatedBy = BrandModelCategoryValidator.class)
@Documented
public @interface BrandModelCategoryValid {

    String message() default "Model categories must be a subset of Brand categories";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
