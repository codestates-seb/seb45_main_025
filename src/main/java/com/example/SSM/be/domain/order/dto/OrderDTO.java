package com.example.SSM.be.domain.order.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
public class OrderDTO {
    private Long id;
    private Long memberId; // 주문 회원 ID
    private LocalDateTime orderDate;
    private BigDecimal totalAmount;
    private boolean paidWithPoints;
}