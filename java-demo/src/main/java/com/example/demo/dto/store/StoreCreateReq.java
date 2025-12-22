package com.example.demo.dto.store;

import com.example.demo.domain.Store;
import com.natswarchuan.genericservice.dto.IDto;
import com.natswarchuan.genericservice.validation.Unique;
import lombok.Data;

import com.example.demo.domain.Category;
import com.example.demo.validation.specs.IdsInSpecLoader;
import com.natswarchuan.genericservice.validation.SpecValidation;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.BeanUtils;

/**
 * DTO tạo mới Store.
 */
@Data
public class StoreCreateReq implements IDto<Store> {

    /**
     * Tên Store, duy nhất.
     */
    @Unique(entity = Store.class, field = "name", message = "Store name already exists")
    @jakarta.validation.constraints.NotBlank(message = "Name is required")
    private String name;

    /**
     * Địa chỉ Store.
     */
    private String address;

    /**
     * Danh sách Category liên kết.
     */
    @SpecValidation(entity = Category.class, loader = IdsInSpecLoader.class, message = "Given categories do not exist")
    private Set<Long> categoryIds;

    /**
     * Chuyển đổi sang Entity.
     * <p>
     * Mapping thủ công categoryIds sang danh sách Category entities.
     *
     * @return Store entity.
     */
    @Override
    public Store toEntity() {
        Store store = new Store();
        BeanUtils.copyProperties(this, store, "categoryIds");
        if (this.categoryIds != null) {
            // Manual Mapping: Chuyển đổi ID list sang Entity Set.
            // Điều này cần thiết để JPA hiểu được mối quan hệ khi persist Store.
            Set<Category> categories = this.categoryIds.stream()
                    .map(id -> Category.builder().id(id).build())
                    .collect(Collectors.toSet());
            store.setCategories(categories);
        }
        return store;
    }
}
