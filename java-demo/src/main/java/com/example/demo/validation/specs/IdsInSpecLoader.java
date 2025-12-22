package com.example.demo.validation.specs;

import com.natswarchuan.genericservice.validation.SpecificationLoader;
import jakarta.persistence.criteria.CriteriaBuilder.In;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

import java.util.Collection;

/**
 * Loader tạo Specification kiểm tra ID nằm trong danh sách (IN clause).
 * <p>
 * **Mục đích:**
 * - Cung cấp khả năng lọc dữ liệu theo một danh sách các giá trị (SQL IN).
 * - Được thiết kế để hoạt động generic với
 * {@link com.natswarchuan.genericservice.validation.SpecValidation}.
 * <p>
 * **Cơ chế:**
 * 1. Nhận vào danh sách values (Collection).
 * 2. Sử dụng `CriteriaBuilder.in` để tạo mệnh đề IN.
 * 3. Loop qua danh sách values và add vào mệnh đề.
 */
@Component
public class IdsInSpecLoader implements SpecificationLoader<Object, Object> {

    /**
     * Tạo Specification cho mệnh đề IN.
     * <p>
     * **Logic chi tiết:**
     * 1. **Kiểm tra tham số đầu vào:**
     * - Phương thức nhận varargs `params`, nhưng Generic Service quy định tham số
     * đầu tiên
     * params[0] sẽ chứa giá trị thực tế cần lọc.
     * - Nếu `params` rỗng hoặc null, trả về null (không lọc).
     * 2. **Xác định kiểu dữ liệu:**
     * - Kiểm tra xem `params[0]` có phải là một `Collection` không.
     * - Nếu là Collection nhưng rỗng, trả về null để tránh tạo mệnh đề `IN ()` sai
     * cú pháp SQL.
     * 3. **Xây dựng Predicate:**
     * - Sử dụng `CriteriaBuilder.in(root.get("id"))` để khởi tạo mệnh đề IN trên
     * trường "id".
     * - Duyệt qua từng phần tử trong Collection và thêm vào mệnh đề IN bằng
     * `inClause.value(id)`.
     *
     * @param params danh sách tham số, params[0] được mong đợi là một Collection
     *               các ID (VD: List<Integer>, Set<Long>).
     * @return Specification chứa mệnh đề IN cho trường ID, hoặc null nếu không thể
     *         tạo.
     */
    @Override
    public Specification<Object> getSpecification(Object... params) {
        if (params == null || params.length == 0) {
            return null;
        }
        Object value = params[0];
        if (value instanceof Collection<?>) {
            Collection<?> ids = (Collection<?>) value;
            if (ids.isEmpty())
                return null;

            return (root, query, cb) -> {
                In<Object> inClause = cb.in(root.get("id"));
                for (Object id : ids) {
                    inClause.value(id);
                }
                return inClause;
            };
        }
        return null;
    }
}
