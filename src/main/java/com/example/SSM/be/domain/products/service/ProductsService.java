package com.example.SSM.be.domain.products.service;

import com.example.SSM.be.domain.products.dto.ProductsRequestDto;
import com.example.SSM.be.domain.products.entity.Products;
import com.example.SSM.be.domain.products.repository.ProductsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.webjars.NotFoundException;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ProductsService {
    @Autowired
    private ProductsRepository productsRepository;

    public Products createProduct(ProductsRequestDto productsRequestDto) {
        Products product = new Products();
        product.setProductName(productsRequestDto.getProductName());
        product.setImg(productsRequestDto.getImg());
        product.setContent(productsRequestDto.getContent());
        product.setProductPrice(productsRequestDto.getProductPrice());
        product.setCategory(productsRequestDto.getCategory()); // category 설정

        LocalDateTime now = LocalDateTime.now();
        product.setCreatedAt(now);
        product.setModifiedAt(now);

        return productsRepository.save(product);
    }
    public Products getProductById(Long productId) {
        return productsRepository.findById(productId)
                .orElseThrow(() -> new NotFoundException("ID에 해당하는 제품을 찾을 수 없습니다: " + productId));
    }
    public Products updateProduct(Long productId, ProductsRequestDto productsRequestDto) {
        Products existingProduct = productsRepository.findById(productId)
                .orElseThrow(() -> new NotFoundException("ID에 해당하는 제품을 찾을 수 없습니다: " + productId));

        existingProduct.setProductName(productsRequestDto.getProductName());
        existingProduct.setImg(productsRequestDto.getImg());
        existingProduct.setContent(productsRequestDto.getContent());
        existingProduct.setProductPrice(productsRequestDto.getProductPrice());
        existingProduct.setModifiedAt(LocalDateTime.now());

        return productsRepository.save(existingProduct);
    }
    public void deleteProduct(Long productId) {
        Products product = productsRepository.findById(productId)
                .orElseThrow(() -> new NotFoundException("ID에 해당하는 제품을 찾을 수 없습니다: " + productId));

        productsRepository.delete(product);
    }
    public Page<Products> getProductsByCategory(String category, Pageable pageable) {
        return productsRepository.findByCategoryOrderByCreatedAtDesc(category, pageable);
    }
}
