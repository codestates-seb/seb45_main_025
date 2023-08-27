package com.example.SSM.be.domain.products.dto;

import com.example.SSM.be.domain.products.entity.Products;

import java.time.LocalDateTime;

public class ProductsResponseDto {
    private Long id;
    private String productName;
    private String img;
    private String content;
    private Double productPrice;
    private LocalDateTime created_at;
    private LocalDateTime modified_at;


    public ProductsResponseDto(Products product) {
        this.id = product.getproductId();
        this.productName = product.getProductName();
        this.img = product.getImg();
        this.content = product.getContent();
        this.productPrice = product.getProductPrice();
        this.created_at = product.getCreatedAt();
        this.modified_at = product.getModifiedAt();
    }
}
