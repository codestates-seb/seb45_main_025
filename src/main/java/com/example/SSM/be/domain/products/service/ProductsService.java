package com.example.SSM.be.domain.products.service;

import com.example.SSM.be.domain.products.dto.ProductsRequestDto;
import com.example.SSM.be.domain.products.entity.Products;
import com.example.SSM.be.domain.products.repository.ProductsRepository;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.webjars.NotFoundException;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class ProductsService {
    @Autowired
    private ProductsRepository productsRepository;

    public Products createProduct(ProductsRequestDto productsRequestDto) {
        Products product = new Products();
        product.setProductName(productsRequestDto.getProductName());
        product.setImg(productsRequestDto.getImg());
        product.setProductDescription(productsRequestDto.getProductDescription());
        product.setContent(productsRequestDto.getContent());
        product.setProductPrice(productsRequestDto.getProductPrice());
        product.setCategory(productsRequestDto.getCategory());

        LocalDateTime now = LocalDateTime.now();
        product.setCreatedAt(now);
        product.setModifiedAt(now);

        return productsRepository.save(product);
    }

    public String uploadProductImage(MultipartFile productImage) throws IOException {
        String fileName = UUID.randomUUID().toString() + "_" + productImage.getOriginalFilename();
        String uploadDir = "uploads/products/";

        Path directoryPath = Path.of(uploadDir);
        Files.createDirectories(directoryPath);

        Path filePath = directoryPath.resolve(fileName);

        if (Files.exists(filePath)) {
            Files.delete(filePath); // 이미 파일이 존재하면 삭제
        }

        try (InputStream inputStream = productImage.getInputStream()) {
            Files.copy(inputStream, filePath, StandardCopyOption.REPLACE_EXISTING);
        }

        return filePath.toString();
    }
    public Products updateProduct(Long productId, ProductsRequestDto productsRequestDto) {
        Products existingProduct = productsRepository.findById(productId)
                .orElseThrow(() -> new NotFoundException("ID에 해당하는 제품을 찾을 수 없습니다: " + productId));

        existingProduct.setProductName(productsRequestDto.getProductName());
        existingProduct.setImg(productsRequestDto.getImg());
        existingProduct.setProductDescription(productsRequestDto.getProductDescription());
        existingProduct.setContent(productsRequestDto.getContent());
        existingProduct.setProductPrice(productsRequestDto.getProductPrice());
        existingProduct.setModifiedAt(LocalDateTime.now());

        return productsRepository.save(existingProduct);
    }
    public Products getProductById(Long productId) {
        return productsRepository.findById(productId)
                .orElseThrow(() -> new NotFoundException("ID에 해당하는 제품을 찾을 수 없습니다: " + productId));
    }
    public void deleteProduct(Long productId) {
        Products product = productsRepository.findById(productId)
                .orElseThrow(() -> new NotFoundException("ID에 해당하는 제품을 찾을 수 없습니다: " + productId));

        productsRepository.delete(product);
    }
    public Page<Products> getProductsPageByCategory(String category, Pageable pageable) {
        return productsRepository.findByCategory(category, pageable);
    }


}
