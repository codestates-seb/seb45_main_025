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
    private String rawmaterial;
    private String precautions;
    private String manufacturer;
    private Double productPrice;
    private LocalDateTime created_at;
    private LocalDateTime modified_at;
    private int likes;


    public ProductsResponseDto(Products product) {
        this.id = product.getProductId();
        this.productName = product.getProductName();
        this.category = product.getCategory();
        if (product.getImg() != null) {
            this.img = product.getImg();
        } else {
            this.img = ""; // 빈 문자열 또는 기본 이미지 URL로 설정
        }
        this.productDescription = product.getProductDescription();
        this.content = product.getContent();
        this.rawmaterial = product.getRawmaterial();
        this.precautions = product.getPrecautions();
        this.manufacturer = product.getManufacturer();
        this.productPrice = product.getProductPrice();
        this.created_at = product.getCreatedAt();
        this.modified_at = product.getModifiedAt();
        this.likes = product.getLikes();
    }
}
