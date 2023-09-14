package com.example.SSM.be.domain.payment.entity;

import com.example.SSM.be.domain.member.entity.Member;
import com.example.SSM.be.domain.products.entity.Products;
import com.fasterxml.jackson.annotation.JsonIgnore;
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

    @OneToMany(mappedBy = "payment", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PaymentItem> paymentItems = new ArrayList<>();

    private LocalDateTime orderDate;

    private BigDecimal totalAmount; // 총 주문 금액

    private boolean paidWithPoints; // 포인트로 결제했는지 여부

    @OneToMany(mappedBy = "member", fetch = FetchType.LAZY)
    private List<Products> likedProducts;
}