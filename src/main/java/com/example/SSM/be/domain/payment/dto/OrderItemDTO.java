package com.example.SSM.be.domain.payment.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
public class OrderItemDTO {
    private Long productId; // 상품 ID
    private String productName; // 상품 이름
    private int quantity; // 주문 수량
    private BigDecimal price; // 상품 가격
    private BigDecimal subtotal; // 소계
    private Long orderId;
    private String orderDate;
    private String recipientName;
    private String address;
    private String phone;
    private String request;
    private List<OrderItemDTO> orderItems;
    private Long paymentId;
    private List<ProductDTO> products;
}