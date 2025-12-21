package com.example.demo.dto.req;

import com.example.demo.dto.req.spec.ProductRelationshipConsistencySpec;
import com.example.demo.entity.Product;
import com.natswarchuan.genericservice.dto.IDto;
import com.natswarchuan.genericservice.validation.DtoSpecValidation;
import com.natswarchuan.genericservice.validation.Exists;
import com.natswarchuan.genericservice.validation.NoSpecialChars;
import com.natswarchuan.genericservice.validation.Unique;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@DtoSpecValidation(loader = ProductRelationshipConsistencySpec.class, mustExist = true, message = "Model và danh mục phải thuộc thương hiệu được chọn")
public class ProductCreateReq implements IDto<Product> {
    @NotBlank(message = "Tên sản phẩm không được để trống")
    @Unique(entity = Product.class, message = "Tên sản phẩm đã tồn tại", field = "name")
    @NoSpecialChars(message = "Tên sản phẩm không được chứa ký tự đặc biệt")
    private String name;

    @Min(value = 0, message = "Giá sản phẩm phải lớn hơn 0")
    private Double price;

    private String description;

    @Exists(entity = com.example.demo.entity.Category.class, message = "Danh mục không tồn tại", field = "id")
    private Long categoryId;

    @Exists(entity = com.example.demo.entity.Brand.class, message = "Thương hiệu không tồn tại", field = "id")
    private Long brandId;

    @Exists(entity = com.example.demo.entity.Model.class, message = "Model không tồn tại", field = "id")
    private Long modelId;

    @Override
    public Product toEntity() {
        Product product = new Product();
        org.springframework.beans.BeanUtils.copyProperties(this, product);

        if (categoryId != null) {
            com.example.demo.entity.Category category = new com.example.demo.entity.Category();
            category.setId(categoryId);
            product.setCategory(category);
        }

        if (brandId != null) {
            com.example.demo.entity.Brand brand = new com.example.demo.entity.Brand();
            brand.setId(brandId);
            product.setBrand(brand);
        }

        if (modelId != null) {
            com.example.demo.entity.Model model = new com.example.demo.entity.Model();
            model.setId(modelId);
            product.setModel(model);
        }

        return product;
    }
}
