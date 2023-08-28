package com.example.SSM.be.domain.products.controller;

import com.example.SSM.be.domain.products.dto.ProductsRequestDto;
import com.example.SSM.be.domain.products.dto.ProductsResponseDto;
import com.example.SSM.be.domain.products.entity.Products;
import com.example.SSM.be.domain.products.service.ProductsService;
import io.swagger.v3.oas.annotations.Operation;
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

    @Autowired  // ProductsService 의존성을 생성자 주입으로 받음
    public ProductsController(ProductsService productsService) {
        this.productsService = productsService;
    }

    // 상품을 생성하는 엔드포인트
    @Operation(summary = "새 상품 생성")
    @PostMapping("/create")
    public ResponseEntity<Products> createProduct(@RequestBody ProductsRequestDto productDto) {
        Products newProduct = productsService.createProduct(productDto);  // 제품 생성 로직을 서비스에 위임
        return ResponseEntity.ok(newProduct);  // 새로 생성된 제품을 OK 응답 상태로 반환
    }

    // ID로 상품을 조회하는 엔드포인트
    @Operation(summary = "ID로 상품을 조회")
    @GetMapping(value = "/get/{productId}", produces = "application/json")
    public ResponseEntity<ProductsResponseDto> getProduct(@PathVariable Long productId) {
        Products product = productsService.getProductById(productId);  // 제품 조회 로직을 서비스에 위임
        return ResponseEntity.ok(new ProductsResponseDto(product));  // 조회한 제품을 응답 DTO로 감싸 반환
    }

    // 상품을 수정하는 엔드포인트
    @Operation(summary = "상품 수정")
    @PatchMapping(value = "/update/{productId}", produces = "application/json")
    public ResponseEntity<ProductsResponseDto> updateProduct(
            @PathVariable Long productId,
            @RequestBody ProductsRequestDto productDto) {
        Products updatedProduct = productsService.updateProduct(productId, productDto);  // 제품 업데이트 로직을 서비스에 위임
        return ResponseEntity.ok(new ProductsResponseDto(updatedProduct));  // 업데이트된 제품을 응답 DTO로 감싸 반환
    }

    // 상품을 삭제하는 엔드포인트
    @Operation(summary = "상품 삭제")
    @DeleteMapping(value = "/delete/{productId}", produces = "application/json")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long productId) {
        productsService.deleteProduct(productId);  // 제품 삭제 로직을 서비스에 위임
        return ResponseEntity.noContent().build();  // 내용 없음 응답 상태 반환
    }

    // 카테고리별로 상품을 조회하는 엔드포인트
    @Operation(summary = "카테고리별 상품 조회")
    @GetMapping("/{category}")
    public ResponseEntity<List<ProductsResponseDto>> getProductsByCategory(@PathVariable String category) {
        List<Products> products = productsService.getProductsByCategoryAndOrderByCreatedAtDesc(category);  // 제품 조회 로직을 서비스에 위임
        List<ProductsResponseDto> responseDtos = products.stream()
                .map(ProductsResponseDto::new)  // 각 제품을 응답 DTO로 변환
                .collect(Collectors.toList());  // DTO들을 리스트로 수집
        return ResponseEntity.ok(responseDtos);  // 응답 DTO 리스트 반환
    }
}