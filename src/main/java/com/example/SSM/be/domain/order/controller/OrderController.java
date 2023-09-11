package com.example.SSM.be.domain.order.controller;

import com.example.SSM.be.domain.cart.entity.CartItem;
import com.example.SSM.be.domain.cart.service.CartService;
import com.example.SSM.be.domain.member.entity.Member;
import com.example.SSM.be.domain.member.service.MemberService;
import com.example.SSM.be.domain.order.entity.Order;
import com.example.SSM.be.domain.order.service.OrderService;
import com.example.SSM.be.domain.security.token.service.TokenService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orders")
public class OrderController {
    @Autowired
    private OrderService orderService;

    @Autowired
    private CartService cartService;

    private final MemberService memberService;
    private final TokenService tokenService;

    public OrderController(OrderService orderService, CartService cartService, MemberService memberService,TokenService tokenService){
        this.cartService = cartService;
        this.orderService = orderService;
        this.memberService = memberService;
        this.tokenService = tokenService;
    }

    @PostMapping("/create")
    public ResponseEntity<Order> createOrder(@RequestHeader("Authorization") String authorizationHeader) {
        Jws<Claims> claims = tokenService.checkAccessToken(authorizationHeader);
        String email = claims.getBody().getSubject(); // 사용자의 이메일을 가져옴
        Member member = memberService.findMemberByEmail(email);
        // 장바구니에서 상품 가져오기
        List<CartItem> cartItems = cartService.getCartItemsByUsername(email); // email을 사용하여 장바구니를 가져옴

        if (cartItems.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
        // 주문 생성
        Order order = orderService.createOrder(member, cartItems);
        // 주문 생성 성공 시, 장바구니 비우기
        cartService.clearCart(email); // email을 사용하여 장바구니를 비움
        return ResponseEntity.status(HttpStatus.CREATED).body(order);
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<Order> getOrderDetails(@PathVariable Long orderId) {
        // 주문 상세 정보 조회 로직을 구현합니다.
        // 필요한 경우 OrderService에서 주문 상세 정보를 조회하는 메서드를 만들고 호출합니다.

        Order order = orderService.getOrderById(orderId);
        if (order == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        // 주문 상세 정보 반환
        return ResponseEntity.ok(order);
    }
}