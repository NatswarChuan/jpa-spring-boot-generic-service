package com.natswarchuan.genericservice.payload.request;

import com.natswarchuan.genericservice.exception.HttpException;
import io.swagger.v3.oas.annotations.Parameter;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Pattern;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;

/**
 * Lớp cơ sở (Base Class) cho các yêu cầu tìm kiếm và phân trang.
 * <p>
 * Cung cấp các tham số chung như:
 * <ul>
 * <li><b>page</b>: Số trang hiện tại (bắt đầu từ 0).</li>
 * <li><b>size</b>: Số lượng bản ghi trên mỗi trang.</li>
 * <li><b>search</b>: Từ khóa tìm kiếm chung.</li>
 * <li><b>sort</b>: Cấu hình sắp xếp (trường và chiều).</li>
 * </ul>
 *
 * @author NatswarChuan
 */
@SuppressWarnings("null")
public class BaseRequestParam {
    /**
     * Số trang cần lấy (0-based index).
     * <p>
     * Mặc định là 0. Giá trị -1 dùng để lấy tất cả (unpaged).
     */
    @Parameter(description = "Số trang (bắt đầu từ 0). -1 để lấy tất cả.", example = "0")
    @Min(value = -1, message = "Số trang phải >= -1")
    private int page = 0;

    /**
     * Số lượng phần tử trên mỗi trang.
     * <p>
     * Mặc định là 10. Giới hạn 1-200.
     */
    @Parameter(description = "Kích thước trang", example = "10")
    @Min(value = 1, message = "Kích thước trang tối thiểu là 1")
    @Max(value = 200, message = "Kích thước trang tối đa là 200")
    private int size = 10;

    /** Từ khóa tìm kiếm tự do (nếu có). */
    @Parameter(description = "Từ khóa tìm kiếm")
    private String search;

    /** Tên trường cụ thể cần tìm kiếm (nếu hỗ trợ). */
    @Parameter(description = "Trường cần tìm kiếm (VD: name, email)")
    private String searchField;

    /** Tên trường dùng để sắp xếp kết quả. Mặc định là "id". */
    @Parameter(description = "Trường sắp xếp", example = "id")
    private String sortBy = "id";

    /** Hướng sắp xếp: "asc" (tăng dần) hoặc "desc" (giảm dần). */
    @Parameter(description = "Hướng sắp xếp (asc/desc)", example = "asc")
    @Pattern(regexp = "(?i)asc|desc", message = "Hướng sắp xếp phải là 'asc' hoặc 'desc'")
    private String sortDir = "asc";

    /**
     * Khởi tạo mặc định với các giá trị mặc định cho phân trang và sắp xếp.
     */
    public BaseRequestParam() {
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
     * Lấy từ khóa tìm kiếm.
     *
     * @return Từ khóa.
     */
    public String getSearch() {
        return search;
    }

    /**
     * Thiết lập từ khóa tìm kiếm.
     *
     * @param search Từ khóa.
     */
    public void setSearch(String search) {
        this.search = search;
    }

    /**
     * Lấy trường cần tìm kiếm.
     *
     * @return Tên trường.
     */
    public String getSearchField() {
        return searchField;
    }

    /**
     * Thiết lập trường cần tìm kiếm.
     *
     * @param searchField Tên trường.
     */
    public void setSearchField(String searchField) {
        this.searchField = searchField;
    }

    /**
     * Lấy trường sắp xếp.
     *
     * @return Tên trường.
     */
    public String getSortBy() {
        return sortBy;
    }

    /**
     * Thiết lập trường sắp xếp.
     *
     * @param sortBy Tên trường.
     */
    public void setSortBy(String sortBy) {
        this.sortBy = sortBy;
    }

    /**
     * Lấy hướng sắp xếp.
     *
     * @return Hướng (asc/desc).
     */
    public String getSortDir() {
        return sortDir;
    }

    /**
     * Thiết lập hướng sắp xếp.
     *
     * @param sortDir Hướng (asc/desc).
     */
    public void setSortDir(String sortDir) {
        this.sortDir = sortDir;
    }

    /**
     * Chuyển đổi các tham số hiện tại thành đối tượng {@link Pageable} của Spring
     * Data.
     *
     * @return Đối tượng {@link Pageable} với thông tin page, size và sort.
     * @throws HttpException nếu trường sắp xếp không hợp lệ.
     */
    public Pageable toPageable() {
        try {
            Sort sort = Sort.by(Sort.Direction.fromString(sortDir), sortBy);
            return PageRequest.of(page, size, sort);
        } catch (IllegalArgumentException ex) {
            // Catch exception when sortBy field is invalid or sortDir is invalid
            String message = String.format(
                    "Tham số sắp xếp không hợp lệ. sortBy='%s', sortDir='%s'. " +
                            "Vui lòng kiểm tra lại tên trường và hướng sắp xếp (asc/desc).",
                    sortBy, sortDir);
            throw new HttpException(HttpStatus.BAD_REQUEST, message, ex);
        }
    }

    /**
     * Kiểm tra xem yêu cầu có phải là lấy tất cả (không phân trang) hay không.
     *
     * @return {@code true} nếu page == -1, ngược lại {@code false}.
     */
    public boolean isUnpaged() {
        return page == -1;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (!(o instanceof BaseRequestParam))
            return false;
        BaseRequestParam that = (BaseRequestParam) o;
        return page == that.page && size == that.size && java.util.Objects.equals(search, that.search)
                && java.util.Objects.equals(searchField, that.searchField)
                && java.util.Objects.equals(sortBy, that.sortBy) && java.util.Objects.equals(sortDir, that.sortDir);
    }

    @Override
    public int hashCode() {
        return java.util.Objects.hash(page, size, search, searchField, sortBy, sortDir);
    }

    @Override
    public String toString() {
        return "BaseRequestParam{" +
                "page=" + page +
                ", size=" + size +
                ", search='" + search + '\'' +
                ", searchField='" + searchField + '\'' +
                ", sortBy='" + sortBy + '\'' +
                ", sortDir='" + sortDir + '\'' +
                '}';
    }
}
