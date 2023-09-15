package com.example.SSM.be.domain.payment.entity;

import com.example.SSM.be.domain.member.entity.Member;
import com.example.SSM.be.domain.products.entity.Products;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long paymentid;

    @ManyToOne
    private Member member; // 주문한 회원 정보

    @JsonManagedReference
    @OneToMany(mappedBy = "payment", fetch = FetchType.LAZY)
    private List<PaymentItem> paymentItems;

    private LocalDateTime orderDate;

    private BigDecimal totalAmount; // 총 주문 금액

    private boolean paidWithPoints; // 포인트로 결제했는지 여부

    private String recipientName; // 추가
    private String address; // 추가
    private String phone; // 추가
    private String request; // 추가


}