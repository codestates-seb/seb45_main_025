package com.example.SSM.be.domain.products.controller;

import com.example.SSM.be.domain.products.dto.ProductsRequestDto;
import com.example.SSM.be.domain.products.entity.Products;
import com.example.SSM.be.domain.products.service.ProductsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


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

    // 줄 추가
}
