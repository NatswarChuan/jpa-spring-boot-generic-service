package com.natswarchuan.genericservice.payload.response;

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
     * Khởi tạo mặc định.
     */
    public PagedResponse() {
    }

    /**
     * Khởi tạo với đầy đủ thông tin.
     *
     * @param content          Danh sách dữ liệu.
     * @param page             Số trang hiện tại.
     * @param size             Kích thước trang.
     * @param totalElements    Tổng số phần tử.
     * @param totalPages       Tổng số trang.
     * @param first            True nếu là trang đầu.
     * @param last             True nếu là trang cuối.
     * @param empty            True nếu trang trống.
     * @param numberOfElements Số lượng phần tử trên trang hiện tại.
     */
    public PagedResponse(List<T> content, int page, int size, long totalElements, int totalPages, boolean first,
            boolean last, boolean empty, int numberOfElements) {
        this.content = content;
        this.page = page;
        this.size = size;
        this.totalElements = totalElements;
        this.totalPages = totalPages;
        this.first = first;
        this.last = last;
        this.empty = empty;
        this.numberOfElements = numberOfElements;
    }

    /**
     * Lấy danh sách dữ liệu.
     *
     * @return Danh sách.
     */
    public List<T> getContent() {
        return content;
    }

    /**
     * Thiết lập danh sách dữ liệu.
     *
     * @param content Danh sách.
     */
    public void setContent(List<T> content) {
        this.content = content;
    }

    /**
     * Lấy số trang hiện tại.
     *
     * @return Số trang.
     */
    public int getPage() {
        return page;
    }

    /**
     * Thiết lập số trang hiện tại.
     *
     * @param page Số trang.
     */
    public void setPage(int page) {
        this.page = page;
    }

    /**
     * Lấy kích thước trang.
     *
     * @return Kích thước.
     */
    public int getSize() {
        return size;
    }

    /**
     * Thiết lập kích thước trang.
     *
     * @param size Kích thước.
     */
    public void setSize(int size) {
        this.size = size;
    }

    /**
     * Lấy tổng số phần tử.
     *
     * @return Tổng số phần tử.
     */
    public long getTotalElements() {
        return totalElements;
    }

    /**
     * Thiết lập tổng số phần tử.
     *
     * @param totalElements Tổng số phần tử.
     */
    public void setTotalElements(long totalElements) {
        this.totalElements = totalElements;
    }

    /**
     * Lấy tổng số trang.
     *
     * @return Tổng số trang.
     */
    public int getTotalPages() {
        return totalPages;
    }

    /**
     * Thiết lập tổng số trang.
     *
     * @param totalPages Tổng số trang.
     */
    public void setTotalPages(int totalPages) {
        this.totalPages = totalPages;
    }

    /**
     * Kiểm tra xem có phải trang đầu không.
     *
     * @return True nếu là trang đầu.
     */
    public boolean isFirst() {
        return first;
    }

    /**
     * Thiết lập trạng thái trang đầu.
     *
     * @param first Trạng thái.
     */
    public void setFirst(boolean first) {
        this.first = first;
    }

    /**
     * Kiểm tra xem có phải trang cuối không.
     *
     * @return True nếu là trang cuối.
     */
    public boolean isLast() {
        return last;
    }

    /**
     * Thiết lập trạng thái trang cuối.
     *
     * @param last Trạng thái.
     */
    public void setLast(boolean last) {
        this.last = last;
    }

    /**
     * Kiểm tra xem trang có trống không.
     *
     * @return True nếu trống.
     */
    public boolean isEmpty() {
        return empty;
    }

    /**
     * Thiết lập trạng thái trống.
     *
     * @param empty Trạng thái.
     */
    public void setEmpty(boolean empty) {
        this.empty = empty;
    }

    /**
     * Lấy số lượng phần tử trên trang hiện tại.
     *
     * @return Số lượng phần tử.
     */
    public int getNumberOfElements() {
        return numberOfElements;
    }

    /**
     * Thiết lập số lượng phần tử trên trang hiện tại.
     *
     * @param numberOfElements Số lượng phần tử.
     */
    public void setNumberOfElements(int numberOfElements) {
        this.numberOfElements = numberOfElements;
    }

    /**
     * Tạo Builder cho PagedResponse.
     *
     * @param <T> Kiểu dữ liệu.
     * @return Builder.
     */
    public static <T> PagedResponseBuilder<T> builder() {
        return new PagedResponseBuilder<>();
    }

    /**
     * Lớp Builder giúp xây dựng đối tượng PagedResponse dễ dàng hơn.
     *
     * @param <T> Kiểu dữ liệu.
     */
    public static class PagedResponseBuilder<T> {
        private List<T> content;
        private int page;
        private int size;
        private long totalElements;
        private int totalPages;
        private boolean first;
        private boolean last;
        private boolean empty;
        private int numberOfElements;

        /**
         * Thiết lập danh sách dữ liệu.
         *
         * @param content Danh sách dữ liệu.
         * @return Builder.
         */
        public PagedResponseBuilder<T> content(List<T> content) {
            this.content = content;
            return this;
        }

        /**
         * Thiết lập số trang hiện tại.
         *
         * @param page Số trang.
         * @return Builder.
         */
        public PagedResponseBuilder<T> page(int page) {
            this.page = page;
            return this;
        }

        /**
         * Thiết lập kích thước trang.
         *
         * @param size Kích thước trang.
         * @return Builder.
         */
        public PagedResponseBuilder<T> size(int size) {
            this.size = size;
            return this;
        }

        /**
         * Thiết lập tổng số phần tử.
         *
         * @param totalElements Tổng số phần tử.
         * @return Builder.
         */
        public PagedResponseBuilder<T> totalElements(long totalElements) {
            this.totalElements = totalElements;
            return this;
        }

        /**
         * Thiết lập tổng số trang.
         *
         * @param totalPages Tổng số trang.
         * @return Builder.
         */
        public PagedResponseBuilder<T> totalPages(int totalPages) {
            this.totalPages = totalPages;
            return this;
        }

        /**
         * Thiết lập trạng thái trang đầu tiên.
         *
         * @param first True nếu là trang đầu.
         * @return Builder.
         */
        public PagedResponseBuilder<T> first(boolean first) {
            this.first = first;
            return this;
        }

        /**
         * Thiết lập trạng thái trang cuối cùng.
         *
         * @param last True nếu là trang cuối.
         * @return Builder.
         */
        public PagedResponseBuilder<T> last(boolean last) {
            this.last = last;
            return this;
        }

        /**
         * Thiết lập trạng thái trang trống.
         *
         * @param empty True nếu trang trống.
         * @return Builder.
         */
        public PagedResponseBuilder<T> empty(boolean empty) {
            this.empty = empty;
            return this;
        }

        /**
         * Thiết lập số lượng phần tử trên trang hiện tại.
         *
         * @param numberOfElements Số lượng phần tử.
         * @return Builder.
         */
        public PagedResponseBuilder<T> numberOfElements(int numberOfElements) {
            this.numberOfElements = numberOfElements;
            return this;
        }

        /**
         * Xây dựng đối tượng PagedResponse.
         *
         * @return Đối tượng PagedResponse.
         */
        public PagedResponse<T> build() {
            return new PagedResponse<>(content, page, size, totalElements, totalPages, first, last, empty,
                    numberOfElements);
        }
    }

    /**
     * Tạo PagedResponse từ danh sách dữ liệu và đối tượng Page của Spring Data.
     *
     * @param <T>     Kiểu dữ liệu.
     * @param content Danh sách dữ liệu đã chuyển đổi (nếu cần).
     * @param page    Đối tượng Page gốc để lấy thông tin phân trang.
     * @return PagedResponse.
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
     * Tạo PagedResponse trực tiếp từ đối tượng Page của Spring Data.
     *
     * @param <T>  Kiểu dữ liệu.
     * @param page Đối tượng Page.
     * @return PagedResponse.
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
