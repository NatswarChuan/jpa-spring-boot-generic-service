package com.natswarchuan.genericservice.payload.request;

import io.swagger.v3.oas.annotations.Parameter;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Pattern;
import lombok.Data;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

@Data
public class BaseRequestParam {
    @Parameter(description = "Số trang (bắt đầu từ 0). -1 để lấy tất cả.", example = "0")
    @Min(value = -1, message = "Số trang phải >= -1")
    private int page = 0;

    @Parameter(description = "Kích thước trang", example = "10")
    @Min(value = 1, message = "Kích thước trang tối thiểu là 1")
    @Max(value = 200, message = "Kích thước trang tối đa là 200") 
    private int size = 10;

    @Parameter(description = "Từ khóa tìm kiếm")
    private String search;

    @Parameter(description = "Trường cần tìm kiếm (VD: name, email)")
    private String searchField;

    @Parameter(description = "Trường sắp xếp", example = "id")
    private String sortBy = "id";

    @Parameter(description = "Hướng sắp xếp (asc/desc)", example = "asc")
    @Pattern(regexp = "(?i)asc|desc", message = "Hướng sắp xếp phải là 'asc' hoặc 'desc'")
    private String sortDir = "asc";

    public Pageable toPageable() {
        Sort sort = Sort.by(Sort.Direction.fromString(sortDir), sortBy);
        return PageRequest.of(page, size, sort);
    }

    public boolean isUnpaged() {
        return page == -1;
    }
}
