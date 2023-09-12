package com.example.SSM.be.domain.payment.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class PaymentItemDTO {
    private Long paymentid;
    private Long orderId; // 어떤 주문에 속한 상품인지를 식별하기 위한 주문 ID
    private Long productId; // 주문한 상품 ID
    private int quantity;
    private BigDecimal price;
    private BigDecimal subtotal;
}