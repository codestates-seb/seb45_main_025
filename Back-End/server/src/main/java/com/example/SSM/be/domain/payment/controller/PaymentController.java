package com.example.SSM.be.domain.payment.controller;

import com.example.SSM.be.domain.cart.entity.CartItem;
import com.example.SSM.be.domain.cart.service.CartService;
import com.example.SSM.be.domain.member.entity.Member;
import com.example.SSM.be.domain.member.service.MemberService;
import com.example.SSM.be.domain.payment.dto.OrderHistoryDTO;
import com.example.SSM.be.domain.payment.dto.PaymentDTO;
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
    public ResponseEntity<Payment> createOrder(
            @RequestHeader("Authorization") String authorizationHeader,
            @RequestBody PaymentDTO paymentDTO) {
        Jws<Claims> claims = tokenService.checkAccessToken(authorizationHeader);
        String email = claims.getBody().getSubject();

        Member member = memberService.findMemberByEmail(email);
        List<CartItem> cartItems = cartService.getCartItemsByUsername(email);

        if (cartItems.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }

        // 장바구니 선택 가능하도록 요청에서 장바구니 아이템 정보를 받아온다.
        List<Long> selectedCartItems = paymentDTO.getSelectedCartItems(); // 예시로 장바구니 아이템 ID 리스트로 가정

        // 주문 생성 로직 수정
        Payment payment = paymentService.createOrder(
                member,
                cartItems,
                selectedCartItems,
                paymentDTO.getRecipientName(),
                paymentDTO.getAddress(),
                paymentDTO.getPhone(),
                paymentDTO.getRequest()
        );

        // 장바구니에 남아 있는 상품들을 다시 추가
        cartService.restoreCart(email, selectedCartItems);

        return ResponseEntity.status(HttpStatus.CREATED).body(payment);
    }
    @GetMapping("/{orderId}")
    public ResponseEntity<OrderHistoryDTO> getOrderDetails(
            @PathVariable Long orderId,
            @RequestHeader("Authorization") String authorizationHeader) {
        Jws<Claims> claims = tokenService.checkAccessToken(authorizationHeader);
        String email = claims.getBody().getSubject();

        // 주문 정보를 가져옵니다.
        OrderHistoryDTO orderDetails = paymentService.getOrderDetails(email, orderId);

        if (orderDetails == null) {
            // 주문을 찾을 수 없을 경우 NOT_FOUND 상태를 반환합니다.
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        // OK 상태와 함께 제품 정보가 포함된 주문 정보를 반환합니다.
        return ResponseEntity.status(HttpStatus.OK).body(orderDetails);
    }
}