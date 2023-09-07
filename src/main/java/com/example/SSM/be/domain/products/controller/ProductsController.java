package com.example.SSM.be.domain.products.controller;

import com.example.SSM.be.domain.member.entity.Member;
import com.example.SSM.be.domain.member.service.MemberService;
import com.example.SSM.be.domain.products.dto.ProductsRequestDto;
import com.example.SSM.be.domain.products.dto.ProductsResponseDto;
import com.example.SSM.be.domain.products.entity.Products;
import com.example.SSM.be.domain.products.service.ProductsService;
import com.example.SSM.be.domain.security.token.service.TokenService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.swagger.v3.oas.annotations.Operation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Slf4j
@Validated
@RestController
@RequestMapping("/products")
public class ProductsController {

    private final ProductsService productsService;
    private final MemberService memberService;
    private final TokenService tokenService;

    @Autowired  // ProductsService 의존성을 생성자 주입으로 받음
    public ProductsController(ProductsService productsService, MemberService memberService, TokenService tokenService) {
        this.productsService = productsService;
        this.memberService = memberService;
        this.tokenService = tokenService;
    }
    // 상품을 생성하는 엔드포인트
    @Operation(summary = "새 상품 생성")
    @PostMapping("/create")
    public ResponseEntity<Products> createProduct(@RequestPart("productImage") MultipartFile productImage,
                                                  @ModelAttribute ProductsRequestDto productDto) {
        try {
            String uploadedImagePath = productsService.uploadProductImage(productImage);
            productDto.setImg(uploadedImagePath);

            Products newProduct = productsService.createProduct(productDto);
            return ResponseEntity.ok(newProduct);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
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
    public ResponseEntity<ProductsResponseDto> updateProduct(@PathVariable Long productId,
                                                             @RequestPart(value = "productImage", required = false) MultipartFile productImage,
                                                             @ModelAttribute ProductsRequestDto productDto) {
        // 기존 제품을 조회
        Products existingProduct = productsService.getProductById(productId);
        // 이미지 업로드 및 업데이트
        if (productImage != null) {
            try {
                // 중복을 피하기 위해 파일 이름을 고유하게 만들기
                String originalFileName = productImage.getOriginalFilename();
                String fileName = UUID.randomUUID().toString() + "_" + originalFileName;

                // 이미지 파일 업로드 경로 설정
                Path uploadDir = Paths.get("uploads/products/");
                if (!Files.exists(uploadDir)) {
                    Files.createDirectories(uploadDir);
                }
                Path filePath = uploadDir.resolve(fileName);
                // 중복 파일 검사
                if (Files.exists(filePath)) {
                    // 중복된 파일이 이미 존재하면 다른 이름으로 저장
                    fileName = UUID.randomUUID().toString() + "_" + originalFileName;
                    filePath = uploadDir.resolve(fileName);
                }
                try (InputStream inputStream = productImage.getInputStream()) {
                    Files.copy(inputStream, filePath, StandardCopyOption.REPLACE_EXISTING);
                    productDto.setImg(filePath.toString()); // 이미지 파일 경로 저장
                }
            } catch (IOException e) {
                // 파일 업로드 실패 처리
                e.printStackTrace();
                // 실패 처리 로직 추가
            }
            // 기존 이미지 파일 삭제
            if (existingProduct.getImg() != null) {
                Path existingImagePath = Paths.get(existingProduct.getImg());
                try {
                    Files.deleteIfExists(existingImagePath);
                } catch (IOException e) {
                    e.printStackTrace();
                    // 이미지 파일 삭제 실패 처리 로직 추가
                }
            }
        }
        // 제품 업데이트 로직을 서비스에 위임
        Products updatedProduct = productsService.updateProduct(productId, productDto);
        return ResponseEntity.ok(new ProductsResponseDto(updatedProduct)); // 업데이트된 제품을 응답 DTO로 감싸 반환
    }

    // 상품을 삭제하는 엔드포인트
    @Operation(summary = "상품 삭제")
    @DeleteMapping(value = "/delete/{productId}", produces = "application/json")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long productId) {
        productsService.deleteProduct(productId);  // 제품 삭제 로직을 서비스에 위임
        return ResponseEntity.noContent().build();  // 내용 없음 응답 상태 반환
    }
    // 카테고리별로 상품을 조회하는 엔드포인트
    @Operation(summary = "카테고리별 상품 조회 (페이지별)")
    @GetMapping("/{category}")
    public ResponseEntity<List<ProductsResponseDto>> getProductsByCategory(@PathVariable String category,
                                                                           @RequestParam(defaultValue = "1") int page,  // 기본값은 1페이지
                                                                           @RequestParam(defaultValue = "20") int pageSize  // 기본 페이지 크기는 20개
    ) {
        Pageable pageable = PageRequest.of(page - 1, pageSize, Sort.by("createdAt").descending());  // 페이지와 페이지 크기를 기반으로 페이지 요청 객체 생성
        Page<Products> productsPage = productsService.getProductsPageByCategory(category, pageable);  // 제품 페이지 조회 로직을 서비스에 위임

        List<ProductsResponseDto> responseDtos = productsPage.getContent().stream()
                .map(ProductsResponseDto::new)  // 각 제품을 응답 DTO로 변환
                .collect(Collectors.toList());  // DTO들을 리스트로 수집

        return ResponseEntity.ok(responseDtos);  // 응답 DTO 리스트 반환
    }

    @Transactional
    @PostMapping("/product/{productId}/like")
    public ResponseEntity<String> likeOrUnlikeProduct(@PathVariable Long productId,
                                                      @RequestHeader("Authorization") String authorizationHeader) {
        // 토큰 처리 및 사용자 인증 로직
        Jws<Claims> claims = tokenService.checkAccessToken(authorizationHeader);
        String email = claims.getBody().getSubject();
        Member currentUser = memberService.findMemberByEmail(email);
        if (currentUser == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("유효하지 않은 사용자입니다.");
        }

        // 상품 가져오기
        Products product = productsService.findProductById(productId);

        if (product == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Product not found");
        }

        // 이미 좋아요를 눌렀는지 확인하고, 눌렀으면 취소하고 아니면 좋아요 추가
        if (currentUser.getLikedProducts().contains(product)) {
            // 좋아요 취소 로직
            product.setLikes(product.getLikes() - 1);
            currentUser.getLikedProducts().remove(product);
        } else {
            // 좋아요 추가 로직
            product.setLikes(product.getLikes() + 1);
            currentUser.getLikedProducts().add(product);
        }

        productsService.saveProduct(product);
        memberService.saveMember(currentUser);

        return ResponseEntity.ok("Success");
    }
    @GetMapping("/search")
    public ResponseEntity<List<ProductsResponseDto>> searchProducts(@RequestParam(required = false) String productName,
                                                                    @RequestParam(defaultValue = "1") int page,
                                                                    @RequestParam(defaultValue = "20") int pageSize) {
        Pageable pageable = PageRequest.of(page - 1, pageSize, Sort.by("createdAt").descending());
        Page<Products> productsPage = productsService.searchProductsByProductName(productName, pageable);

        List<ProductsResponseDto> responseDtos = productsPage.getContent().stream()
                .map(ProductsResponseDto::new)
                .collect(Collectors.toList());

        return ResponseEntity.ok(responseDtos);
    }
    @GetMapping("/category/{category}/likes")
    public ResponseEntity<List<ProductsResponseDto>> getProductsByCategoryAndSort(@PathVariable String category,
                                                                                  @RequestParam(defaultValue = "1") int page,
                                                                                  @RequestParam(defaultValue = "20") int pageSize
    ) {
        Pageable pageable = PageRequest.of(page - 1, pageSize);
        Page<Products> productsPage = productsService.getProductsByCategoryAndSort(category, pageable);

        List<ProductsResponseDto> responseDtos = productsPage.getContent().stream()
                .map(ProductsResponseDto::new)
                .collect(Collectors.toList());

        return ResponseEntity.ok(responseDtos);
    }
    @Transactional
    @PostMapping("/bookmark/{productId}")
    public ResponseEntity<String> bookmarkProduct(@PathVariable Long productId,
                                                  @RequestHeader("Authorization") String authorizationHeader) {
        // 토큰 처리 및 사용자 인증 로직
        Jws<Claims> claims = tokenService.checkAccessToken(authorizationHeader);
        String email = claims.getBody().getSubject();
        Member currentUser = memberService.findMemberByEmail(email);
        if (currentUser == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("유효하지 않은 사용자입니다.");
        }

        // 북마크 상태 설정
        Products updatedProduct = productsService.bookmarkProduct(productId, currentUser);

        return ResponseEntity.ok("북마크가 추가되었습니다.");
    }

    @Transactional
    @PostMapping("/unbookmark/{productId}")
    public ResponseEntity<String> unbookmarkProduct(@PathVariable Long productId,
                                                    @RequestHeader("Authorization") String authorizationHeader) {
        // 토큰 처리 및 사용자 인증 로직
        Jws<Claims> claims = tokenService.checkAccessToken(authorizationHeader);
        String email = claims.getBody().getSubject();
        Member currentUser = memberService.findMemberByEmail(email);
        if (currentUser == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("유효하지 않은 사용자입니다.");
        }

        // 북마크 상태 취소
        Products updatedProduct = productsService.unbookmarkProduct(productId, currentUser);

        return ResponseEntity.ok("북마크가 취소되었습니다.");
    }
    @GetMapping("/bookmarked")
    public ResponseEntity<?> getBookmarkedProducts(@RequestHeader("Authorization") String authorizationHeader) {
        try {
            Jws<Claims> claims = tokenService.checkAccessToken(authorizationHeader);
            String email = claims.getBody().getSubject();
            Member currentUser = memberService.findMemberByEmail(email);
            if (currentUser == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("유효하지 않은 사용자입니다.");
            }
            List<Products> bookmarkedProducts = productsService.getBookmarkedProducts();  // 북마크된 상품 조회 로직을 서비스에 위임
            List<ProductsResponseDto> responseDtos = bookmarkedProducts.stream()
                    .map(ProductsResponseDto::new)  // 각 제품을 응답 DTO로 변환
                    .collect(Collectors.toList());  // DTO들을 리스트로 수집
            return ResponseEntity.ok(responseDtos);  // 북마크된 상품 리스트 반환
        } catch (Exception e) {
            // 예외 발생 시 에러 응답을 반환
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("서버 오류가 발생했습니다.");
        }
    }
}