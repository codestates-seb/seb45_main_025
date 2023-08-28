package com.example.SSM.be.domain.products.controller;

import com.example.SSM.be.domain.products.dto.ProductsRequestDto;
import com.example.SSM.be.domain.products.dto.ProductsResponseDto;
import com.example.SSM.be.domain.products.entity.Products;
import com.example.SSM.be.domain.products.service.ProductsService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Validated
@RestController
@RequestMapping("/products")
public class ProductsController {

    private final ProductsService productsService;

    @Autowired
    public ProductsController(ProductsService productsService) {
        this.productsService = productsService;
    }

    @PostMapping("/create")
    public ResponseEntity<Products> createProduct(@RequestBody ProductsRequestDto productDto) {
        Products newProduct = productsService.createProduct(productDto);
        return ResponseEntity.ok(newProduct);
    }
    @GetMapping(value = "/get/{productId}", produces = "application/json")
    public ResponseEntity<ProductsResponseDto> getProduct(@PathVariable Long productId) {
        Products product = productsService.getProductById(productId);
        return ResponseEntity.ok(new ProductsResponseDto(product));
    }

    @PatchMapping(value = "/update/{productId}", produces = "application/json")
    public ResponseEntity<ProductsResponseDto> updateProduct(
            @PathVariable Long productId,
            @RequestBody ProductsRequestDto productDto) {
        Products updatedProduct = productsService.updateProduct(productId, productDto);
        return ResponseEntity.ok(new ProductsResponseDto(updatedProduct));
    }

    @DeleteMapping(value = "/delete/{productId}", produces = "application/json")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long productId) {
        productsService.deleteProduct(productId);
        return ResponseEntity.noContent().build();
    }
    @GetMapping("/{category}")
    public ResponseEntity<List<ProductsResponseDto>> getProductsByCategory(@PathVariable String category) {
        List<Products> products = productsService.getProductsByCategoryAndOrderByCreatedAtDesc(category);
        List<ProductsResponseDto> responseDtos = products.stream()
                .map(ProductsResponseDto::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok(responseDtos);
    }
}
