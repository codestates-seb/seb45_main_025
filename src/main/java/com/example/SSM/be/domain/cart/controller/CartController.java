package com.example.SSM.be.domain.cart.controller;


import com.example.SSM.be.domain.cart.dto.CartItemResponseDTO;
import com.example.SSM.be.domain.cart.entity.Cart;
import com.example.SSM.be.domain.cart.entity.CartItem;
import com.example.SSM.be.domain.cart.service.CartService;
import com.example.SSM.be.domain.member.entity.Member;
import com.example.SSM.be.domain.member.service.MemberService;
import com.example.SSM.be.domain.security.auth.service.TokenService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

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
    public ResponseEntity<String> addToCart(@PathVariable("productId") Long productId,
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

        return ResponseEntity.ok("상품을 장바구니에 추가했습니다.");
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
    @DeleteMapping("/remove/{productId}")
    public ResponseEntity<String> removeFromCart(@PathVariable("productId") Long productId,
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

        // 장바구니에서 상품을 삭제
        cartService.removeFromCart(username, productId);

        return ResponseEntity.ok("장바구니 상품을 삭제했습니다.");
    }
}