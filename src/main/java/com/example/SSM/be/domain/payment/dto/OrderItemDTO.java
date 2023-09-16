package com.example.SSM.be.domain.payment.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class OrderItemDTO {
    private Long productId;
    private String productName;
    private int quantity;
    private BigDecimal price;
    private BigDecimal subtotal;
}
