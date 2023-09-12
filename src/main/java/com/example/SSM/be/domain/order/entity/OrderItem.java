//package com.example.SSM.be.domain.order.entity;
//
//import com.example.SSM.be.domain.products.entity.Products;
//import lombok.Getter;
//import lombok.Setter;
//
//import javax.persistence.*;
//import java.math.BigDecimal;
//
//@Entity
//@Getter
//@Setter
//public class OrderItem {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//
//    @ManyToOne
//    private Order order; // 어떤 주문에 속한 상품인지
//
//    @ManyToOne
//    private Products product; // 주문한 상품 정보
//
//    private int quantity;
//
//    private BigDecimal price; // 상품 가격
//
//    private BigDecimal subtotal; // 소계
//}