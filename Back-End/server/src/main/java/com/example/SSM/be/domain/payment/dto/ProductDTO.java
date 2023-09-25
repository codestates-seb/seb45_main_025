package com.example.SSM.be.domain.payment.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductDTO {
    private Long productId;
    private String productName;
    private String category;
    private String img;
    private String content;
    private String productDescription;
    private String rawmaterial;
    private String precautions;
    private String manufacturer;
    private Double productPrice;

    // 생성자, 게터 및 세터 메서드 추가
}