package com.example.SSM.be.domain.products.dto;

import com.example.SSM.be.domain.products.entity.Products;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProductsResponseDto {
    private Long id;
    private String productName;
    private String category;
    private String img;
    private String content;
    private String productDescription;
    private Double productPrice;
    private LocalDateTime created_at;
    private LocalDateTime modified_at;


    public ProductsResponseDto(Products product) {
        this.id = product.getProductId();
        this.productName = product.getProductName();
        this.category = product.getCategory();
        this.img = product.getImg();
        this.content = product.getContent();
        this.productPrice = product.getProductPrice();
        this.created_at = product.getCreatedAt();
        this.modified_at = product.getModifiedAt();
    }
}
