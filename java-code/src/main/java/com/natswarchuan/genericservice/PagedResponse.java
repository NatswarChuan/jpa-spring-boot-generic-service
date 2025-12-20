package com.natswarchuan.genericservice;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Page;

import java.util.List;

/**
 * Lớp bao bọc (wrapper) cho thông tin phân trang.
 *
 * <p>
 * Lớp này được sử dụng để trả về một tập hợp dữ liệu được phân trang cùng với
 * các metadata hỗ trợ
 * việc hiển thị ở phía giao diện (như tổng số phần tử, số trang, trạng thái
 * trang hiện tại).
 *
 * @param <T> Kiểu dữ liệu của các phần tử trong danh sách nội dung.
 * @author NatswarChuan
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PagedResponse<T> {
    /** Danh sách các phần tử của trang hiện tại. */
    private List<T> content;

    /** Số thứ tự của trang hiện tại (bắt đầu từ 0). */
    private int page;

    /** Kích thước của mỗi trang (số phần tử tối đa trên một trang). */
    private int size;

    /** Tổng số phần tử trong toàn bộ các trang. */
    private long totalElements;

    /** Tổng số trang dựa trên kích thước trang và tổng số phần tử. */
    private int totalPages;

    /** Trạng thái xác định đây có phải là trang đầu tiên hay không. */
    private boolean first;

    /** Trạng thái xác định đây có phải là trang cuối cùng hay không. */
    private boolean last;

    /** Trạng thái xác định danh sách nội dung có rỗng hay không. */
    private boolean empty;

    /** Số lượng phần tử thực tế trong trang hiện tại. */
    private int numberOfElements;

    /**
     * Tạo một đối tượng {@link PagedResponse} từ một danh sách nội dung và thông
     * tin từ đối tượng {@link Page} của Spring Data.
     *
     * <p>
     * Phương thức này hữu ích khi cần chuyển đổi danh sách các Entity trong
     * {@link Page} sang danh sách các DTO
     * nhưng vẫn muốn giữ lại thông tin phân trang gốc.
     *
     * @param <T>     Kiểu dữ liệu đích của nội dung.
     * @param content Danh sách nội dung đã được chuyển đổi (thường là danh sách
     *                DTO).
     * @param page    Đối tượng {@link Page} gốc từ Spring Data chứa metadata.
     * @return Đối tượng {@link PagedResponse} chứa nội dung và metadata phân trang.
     */
    public static <T> PagedResponse<T> of(List<T> content, Page<?> page) {
        if (page == null) {
            return PagedResponse.<T>builder()
                    .content(content)
                    .page(0)
                    .size(content.size())
                    .totalElements(content.size())
                    .totalPages(content.isEmpty() ? 0 : 1)
                    .first(true)
                    .last(true)
                    .empty(content.isEmpty())
                    .numberOfElements(content.size())
                    .build();
        }
        return PagedResponse.<T>builder()
                .content(content)
                .page(page.getNumber())
                .size(page.getSize())
                .totalElements(page.getTotalElements())
                .totalPages(page.getTotalPages())
                .first(page.isFirst())
                .last(page.isLast())
                .empty(page.isEmpty())
                .numberOfElements(page.getNumberOfElements())
                .build();
    }

    /**
     * Tạo một đối tượng {@link PagedResponse} trực tiếp từ một đối tượng
     * {@link Page} của Spring Data.
     *
     * @param <T>  Kiểu dữ liệu của các phần tử.
     * @param page Đối tượng {@link Page} từ Spring Data.
     * @return Đối tượng {@link PagedResponse} tương ứng.
     */
    public static <T> PagedResponse<T> of(Page<T> page) {
        if (page == null) {
            return PagedResponse.<T>builder()
                    .content(java.util.Collections.emptyList())
                    .page(0)
                    .size(0)
                    .totalElements(0)
                    .totalPages(0)
                    .first(true)
                    .last(true)
                    .empty(true)
                    .numberOfElements(0)
                    .build();
        }
        return PagedResponse.<T>builder()
                .content(page.getContent())
                .page(page.getNumber())
                .size(page.getSize())
                .totalElements(page.getTotalElements())
                .totalPages(page.getTotalPages())
                .first(page.isFirst())
                .last(page.isLast())
                .empty(page.isEmpty())
                .numberOfElements(page.getNumberOfElements())
                .build();
    }
}
