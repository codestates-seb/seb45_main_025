package com.example.SSM.be.domain.payment.controller;

import com.example.SSM.be.domain.cart.entity.CartItem;
import com.example.SSM.be.domain.cart.service.CartService;
import com.example.SSM.be.domain.member.entity.Member;
import com.example.SSM.be.domain.member.service.MemberService;
import com.example.SSM.be.domain.payment.entity.Payment;
import com.example.SSM.be.domain.payment.service.PaymentService;
import com.example.SSM.be.domain.security.token.service.TokenService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.List;

@RestController
@RequestMapping("/orders")
public class PaymentController {
    @Autowired
    private PaymentService paymentService;

    @Autowired
    private CartService cartService;

    private final MemberService memberService;
    private final TokenService tokenService;

    public PaymentController(PaymentService paymentService, CartService cartService, MemberService memberService, TokenService tokenService){
        this.cartService = cartService;
        this.paymentService = paymentService;
        this.memberService = memberService;
        this.tokenService = tokenService;
    }

    @Transactional
    @PostMapping("/create")
    public ResponseEntity<Payment> createOrder(@RequestHeader("Authorization") String authorizationHeader) {
        Jws<Claims> claims = tokenService.checkAccessToken(authorizationHeader);
        String email = claims.getBody().getSubject(); // 사용자의 이메일을 가져옴
        Member member = memberService.findMemberByEmail(email);
        // 장바구니에서 상품 가져오기
        List<CartItem> cartItems = cartService.getCartItemsByUsername(email); // email을 사용하여 장바구니를 가져옴

        if (cartItems.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
        // 주문 생성
        Payment payment = paymentService.createOrder(member, cartItems);
        // 주문 생성 성공 시, 장바구니 비우기
        cartService.clearCart(email); // email을 사용하여 장바구니를 비움
        return ResponseEntity.status(HttpStatus.CREATED).body(payment);
    }

    @Transactional
    @GetMapping("/{orderId}")
    public ResponseEntity<Payment> getOrderDetails(@PathVariable Long orderId) {
        // 주문 상세 정보 조회 로직을 구현합니다.
        // 필요한 경우 OrderService에서 주문 상세 정보를 조회하는 메서드를 만들고 호출합니다.

        Payment payment = paymentService.getOrderById(orderId);
        if (payment == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        // 주문 상세 정보 반환
        return ResponseEntity.ok(payment);
    }
}