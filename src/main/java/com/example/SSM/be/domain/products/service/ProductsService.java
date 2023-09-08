package com.example.SSM.be.domain.products.service;

import com.example.SSM.be.domain.member.entity.Member;
import com.example.SSM.be.domain.products.dto.ProductsRequestDto;
import com.example.SSM.be.domain.products.entity.Products;
import com.example.SSM.be.domain.products.repository.ProductsRepository;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.webjars.NotFoundException;

import javax.persistence.criteria.Predicate;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.util.ArrayList;
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
        product.setRawmaterial(productsRequestDto.getRawmaterial());
        product.setPrecautions(productsRequestDto.getPrecautions());
        product.setManufacturer(productsRequestDto.getManufacturer());
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
        existingProduct.setRawmaterial(productsRequestDto.getRawmaterial());
        existingProduct.setPrecautions(productsRequestDto.getPrecautions());
        existingProduct.setManufacturer(productsRequestDto.getManufacturer());
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
    public Products findProductById(Long productId) {
        return productsRepository.findById(productId).orElse(null);
    }

    public void saveProduct(Products product) {
        productsRepository.save(product);
    }
    public Page<Products> searchProductsByProductName(String productName, Pageable pageable) {
        Specification<Products> specification = (root, query, builder) -> {
            List<Predicate> predicates = new ArrayList<>();
            // productName이 비어 있지 않으면 productName으로 검색 조건 추가
            if (!StringUtils.isEmpty(productName)) {
                predicates.add(builder.like(root.get("productName"), "%" + productName + "%"));
            }
            // 검색 조건이 없을 때는 모든 상품을 반환
            if (predicates.isEmpty()) {
                return null;
            }
            return builder.and(predicates.toArray(new Predicate[0]));
        };
        // 검색 조건을 적용하여 페이지로 상품 목록을 조회
        return productsRepository.findAll(specification, pageable);
    }
    public Page<Products> getProductsByCategoryAndSort(String category, Pageable pageable) {
        return productsRepository.findByCategoryOrderByLikesDescCreatedAtDesc(category, pageable);
    }
    public Products bookmarkProduct(Long productId, Member user) {
        Products product = productsRepository.findById(productId)
                .orElseThrow(() -> new NotFoundException("ID에 해당하는 제품을 찾을 수 없습니다: " + productId));

        // 북마크 상태 설정
        product.setBookmarked(true);

        // 사용자와 연관된 북마크 업데이트
        user.getLikedProducts().add(product);

        return productsRepository.save(product);
    }

    public Products unbookmarkProduct(Long productId, Member user) {
        Products product = productsRepository.findById(productId)
                .orElseThrow(() -> new NotFoundException("ID에 해당하는 제품을 찾을 수 없습니다: " + productId));

        // 북마크 상태 취소
        product.setBookmarked(false);

        // 사용자와 연관된 북마크 업데이트
        user.getLikedProducts().remove(product);

        return productsRepository.save(product);
    }
    public List<Products> getBookmarkedProducts() {
        return productsRepository.findByBookmarked(true);
    }
    public Page<Products> getAllProducts(Pageable pageable) {
        return productsRepository.findAll(pageable);
    }
}
