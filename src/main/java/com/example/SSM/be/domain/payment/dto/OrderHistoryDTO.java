package com.example.SSM.be.domain.payment.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class OrderHistoryDTO {

    private List<PaymentItemDTO> paymentItems;
}