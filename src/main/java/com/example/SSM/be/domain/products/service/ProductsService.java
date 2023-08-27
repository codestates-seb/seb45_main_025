package com.example.SSM.be.domain.products.service;

import com.example.SSM.be.domain.products.dto.ProductsRequestDto;
import com.example.SSM.be.domain.products.entity.Products;
import com.example.SSM.be.domain.products.repository.ProductsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class ProductsService {
    @Autowired
    private ProductsRepository productsRepository;

    public Products createProduct(ProductsRequestDto productsRequestDto) {
        // Products 엔티티 객체 생성
        Products product = new Products();
        product.setProductName(productsRequestDto.getProductName());
        product.setImg(productsRequestDto.getImg());
        product.setContent(productsRequestDto.getContent());
        product.setProductPrice(productsRequestDto.getProductPrice());
        // 현재 타임스탬프 값 설정
        LocalDateTime now = LocalDateTime.now();
        product.setCreatedAt(now);
        product.setModifiedAt(now);

        return productsRepository.save(product);  // 저장 후 엔티티 반환
    }
}
