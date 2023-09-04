package com.example.SSM.be.domain.products.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProductsRequestDto {
    private String productName;
    private String category;
    private String img;
    private String content;
    private String productDescription;
    private Double productPrice;
    private MultipartFile productImage;
}
