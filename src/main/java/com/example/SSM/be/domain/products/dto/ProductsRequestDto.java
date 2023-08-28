package com.example.SSM.be.domain.products.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProductsRequestDto {
    private String productName;
    private String category;
    private String img;
    private String content;
    private Double productPrice;

    public String getProductName() {
        return productName;
    }

    public String getImg() {
        return img;
    }

    public String getContent() {
        return content;
    }

    public Double getProductPrice() {
        return productPrice;
    }

    public String getCategory() {
        return category;
    }
}
