package com.natswarchuan.genericservice.specification;

import com.natswarchuan.genericservice.payload.request.BaseRequestParam;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import org.springframework.data.jpa.domain.Specification;

/**
 * Lớp cài đặt mặc định cho {@link Specification} để hỗ trợ tìm kiếm động.
 * <p>
 * Lớp này chuyển đổi các tham số từ {@link BaseRequestParam} thành các điều
 * kiện
 * truy vấn (Predicate) của JPA Criteria API.
 * <p>
 * Hỗ trợ các tính năng:
 * <ul>
 * <li>Tìm kiếm theo từ khóa (like) trên một trường cụ thể.</li>
 * <li>Mặc định trả về điều kiện luôn đúng (conjunction) nếu không có tham số
 * tìm kiếm.</li>
 * </ul>
 *
 * @param <E> Kiểu thực thể (Entity).
 * @author NatswarChuan
 */
public class GenericSpecification<E> implements Specification<E> {

    /** Tham số yêu cầu chứa thông tin tìm kiếm. */
    private final BaseRequestParam requestParam;

    /**
     * Khởi tạo Specification với các tham số yêu cầu.
     *
     * @param requestParam Đối tượng chứa thông tin tìm kiếm (search, searchField).
     */
    public GenericSpecification(BaseRequestParam requestParam) {
        this.requestParam = requestParam;
    }

    /**
     * Tạo Predicate (điều kiện lọc) dựa trên {@link BaseRequestParam}.
     *
     * @param root            Root của truy vấn (đại diện cho bảng/Entity).
     * @param query           CriteriaQuery hiện tại (thường không dùng trong filter
     *                        đơn giản).
     * @param criteriaBuilder Builder để tạo các biểu thức Criteria.
     * @return {@link Predicate} đại diện cho điều kiện lọc.
     */
    @Override
    public Predicate toPredicate(Root<E> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
        if (requestParam.getSearch() != null && !requestParam.getSearch().isEmpty() &&
                requestParam.getSearchField() != null && !requestParam.getSearchField().isEmpty()) {

            return criteriaBuilder.like(
                    criteriaBuilder.lower(root.get(requestParam.getSearchField()).as(String.class)),
                    "%" + requestParam.getSearch().toLowerCase() + "%");
        }
        return criteriaBuilder.conjunction();
    }
}
