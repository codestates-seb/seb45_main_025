package com.example.SSM.be.domain.products.dto;

public class ProductsRequestDto {
    private String productName;
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
}
