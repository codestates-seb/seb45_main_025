package com.example.SSM.be.domain.payment.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
public class PaymentDTO {
    private Long paymentid;
    private Long memberId;
    private LocalDateTime orderDate;
    private BigDecimal totalAmount;
    private boolean paidWithPoints;
    private String recipientName;
    private String address;
    private String phone;
    private String request;
}