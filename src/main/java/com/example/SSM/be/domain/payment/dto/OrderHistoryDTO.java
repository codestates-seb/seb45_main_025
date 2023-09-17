package com.example.SSM.be.domain.payment.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
public class OrderHistoryDTO {
    private Long orderId;
    private String orderDate;
    private String recipientName;
    private String address;
    private String phone;
    private String request;
    private List<OrderItemDTO> orderItems;
}