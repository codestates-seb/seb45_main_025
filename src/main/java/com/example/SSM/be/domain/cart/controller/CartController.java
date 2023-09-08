package com.example.SSM.be.domain.cart.controller;


import com.example.SSM.be.domain.cart.dto.CartItemResponseDTO;
import com.example.SSM.be.domain.cart.entity.CartItem;
import com.example.SSM.be.domain.cart.service.CartService;
import com.example.SSM.be.domain.member.entity.Member;
import com.example.SSM.be.domain.member.service.MemberService;
import com.example.SSM.be.domain.security.token.service.TokenService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/cart")
public class CartController {

    private final TokenService tokenService;
    private final CartService cartService;
    private final MemberService memberService;

    public CartController(TokenService tokenService, CartService cartService, MemberService memberService) {
        this.tokenService = tokenService;
        this.cartService = cartService;
        this.memberService = memberService;
    }

    @PostMapping("/add/{productId}")
    public ResponseEntity<Object> addToCart(@PathVariable("productId") Long productId,
                                            @RequestParam Integer quantity,
                                            @RequestHeader("Authorization") String authorizationHeader) {
        // 토큰 처리 및 사용자 인증 로직
        Jws<Claims> claims = tokenService.checkAccessToken(authorizationHeader);
        String email = claims.getBody().getSubject();
        Member member = memberService.findMemberByEmail(email);
        if (member == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("유효하지 않은 사용자입니다.");
        }
        Authentication authentication = new UsernamePasswordAuthenticationToken(
                member.getEmail(),
                null,
                AuthorityUtils.createAuthorityList("ROLE_USER")
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);

        boolean isAdmin = authentication.getAuthorities().stream()
                .anyMatch(auth -> auth.getAuthority().equals("ROLE_ADMIN"));
        if (isAdmin) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("관리자는 장바구니에 상품을 추가할 수 없습니다.");
        }

        // 일반 사용자는 장바구니에 상품을 추가
        String username = authentication.getName();
        cartService.addToCart(username, productId, quantity);

        List<CartItem> updatedCartItems = cartService.getCartItemsByUsername(username);
        if (updatedCartItems.isEmpty()) {
            // 장바구니가 비어 있는 경우
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body("장바구니가 비어 있습니다.");
        } else {
            // 장바구니에 남아 있는 경우
            List<CartItemResponseDTO> cartItemDTOs = updatedCartItems.stream()
                    .map(CartItemResponseDTO::new)
                    .collect(Collectors.toList());
            return ResponseEntity.ok(cartItemDTOs);
        }
    }
    @GetMapping("/list")
    public ResponseEntity<List<CartItemResponseDTO>> getCartList(@RequestHeader("Authorization") String authorizationHeader) {
        Jws<Claims> claims = tokenService.checkAccessToken(authorizationHeader);
        String email = claims.getBody().getSubject();

        List<CartItem> cartItems = cartService.getCartItems(email);
        List<CartItemResponseDTO> cartItemDTOs = new ArrayList<>();
        for (CartItem cartItem : cartItems) {
            cartItemDTOs.add(new CartItemResponseDTO(cartItem));
        }
        return ResponseEntity.ok(cartItemDTOs);
    }
    @PatchMapping("/update/{productId}")
    public ResponseEntity<String> updateCartItem(@PathVariable("productId") Long productId,
                                                 @RequestParam Integer quantity,
                                                 @RequestHeader("Authorization") String authorizationHeader) {
        // 토큰 처리 및 사용자 인증 로직
        Jws<Claims> claims = tokenService.checkAccessToken(authorizationHeader);
        String email = claims.getBody().getSubject();
        Member member = memberService.findMemberByEmail(email);
        if (member == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("유효하지 않은 사용자입니다.");
        }
        Authentication authentication = new UsernamePasswordAuthenticationToken(
                member.getEmail(),
                null,
                AuthorityUtils.createAuthorityList("ROLE_USER")
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String username = authentication.getName();

        // 장바구니에 있는 상품의 수량을 수정
        cartService.updateCartItemQuantity(username, productId, quantity);

        return ResponseEntity.ok("장바구니 상품 수량을 수정했습니다.");
    }
    @DeleteMapping("/remove-multiple")
    public ResponseEntity<Object> removeCartItems(@RequestParam List<Long> productIds,
                                                  @RequestHeader("Authorization") String authorizationHeader
    ) {
        // 토큰 처리 및 사용자 인증 로직
        Jws<Claims> claims = tokenService.checkAccessToken(authorizationHeader);
        String email = claims.getBody().getSubject();
        Member member = memberService.findMemberByEmail(email);
        if (member == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("유효하지 않은 사용자입니다.");
        }
        Authentication authentication = new UsernamePasswordAuthenticationToken(
                member.getEmail(),
                null,
                AuthorityUtils.createAuthorityList("ROLE_USER")
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String username = authentication.getName();

        // 장바구니에서 선택한 상품들을 한 번에 제거
        cartService.removeCartItems(username, productIds);

        List<CartItem> updatedCartItems = cartService.getCartItemsByUsername(username);
        if (updatedCartItems.isEmpty()) {
            // 장바구니가 비어 있는 경우
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body("장바구니가 비어 있습니다.");
        } else {
            // 장바구니에 남아 있는 경우
            List<CartItemResponseDTO> cartItemDTOs = updatedCartItems.stream()
                    .map(CartItemResponseDTO::new)
                    .collect(Collectors.toList());
            return ResponseEntity.ok(cartItemDTOs);
        }
    }
    @DeleteMapping("/clear")
    public ResponseEntity<Void> clearCart(@RequestHeader("Authorization") String authorizationHeader) {
        // 토큰 처리 및 사용자 인증 로직
        Jws<Claims> claims = tokenService.checkAccessToken(authorizationHeader);
        String email = claims.getBody().getSubject();
        Member member = memberService.findMemberByEmail(email);
        if (member == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null); // 상태 코드만 반환
        }
        Authentication authentication = new UsernamePasswordAuthenticationToken(
                member.getEmail(),
                null,
                AuthorityUtils.createAuthorityList("ROLE_USER")
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String username = authentication.getName();

        // 장바구니 비우기
        cartService.clearCart(username);

        return ResponseEntity.noContent().build(); // 응답 본문 없이 204 No Content 반환
    }
}