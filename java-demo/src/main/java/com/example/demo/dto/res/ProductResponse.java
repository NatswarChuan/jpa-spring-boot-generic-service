package com.example.demo.dto.res;
// Trigger recompile

import com.natswarchuan.genericservice.dto.IDto;
import com.example.demo.entity.Product;
import lombok.Data;

@Data
public class ProductResponse implements IDto<Product> {
    private Long id;
    private String name;
    private Double price;
    private String description;

    // Demonstrate language support (optional custom logic)
    @Override
    public void fromEntity(Product entity, String language) {
        this.id = entity.getId();
        this.name = entity.getName();
        this.price = entity.getPrice();
        this.description = entity.getDescription();

        if ("vi".equals(language)) {
            this.description = this.description + " (Phiên bản tiếng Việt)";
        }
    }
}
