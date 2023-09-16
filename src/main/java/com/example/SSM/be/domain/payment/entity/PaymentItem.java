package com.example.SSM.be.domain.payment.entity;

import com.example.SSM.be.domain.products.entity.Products;
import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
@Getter
@Setter
public class PaymentItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long paymentid;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "payment_id")
    private Payment payment;

    @ManyToOne(fetch = FetchType.EAGER) // 즉시로딩으로 변경
    private Products products; // 주문한 상품 정보

    private int quantity;

    private BigDecimal price; // 상품 가격

    private BigDecimal subtotal; // 소계
}