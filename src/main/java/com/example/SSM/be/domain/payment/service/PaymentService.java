package com.example.SSM.be.domain.payment.service;

import com.example.SSM.be.domain.cart.entity.CartItem;
import com.example.SSM.be.domain.cart.service.CartService;
import com.example.SSM.be.domain.member.entity.Member;
import com.example.SSM.be.domain.member.repository.MemberRepository;
import com.example.SSM.be.domain.payment.entity.Payment;
import com.example.SSM.be.domain.payment.entity.PaymentItem;
import com.example.SSM.be.domain.payment.repository.PaymentRepository;
import com.example.SSM.be.domain.products.entity.Products;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class PaymentService {
    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private CartService cartService;

    @Transactional
    public Payment createOrder(
            Member member,
            List<CartItem> cartItems,
            String recipientName,
            String address,
            String phone,
            String request) {
        Payment payment = new Payment();
        payment.setMember(member);
        payment.setOrderDate(LocalDateTime.now());
        payment.setRecipientName(recipientName);
        payment.setAddress(address);
        payment.setPhone(phone);
        payment.setRequest(request);

        BigDecimal totalAmount = BigDecimal.ZERO;
        List<PaymentItem> paymentItems = new ArrayList<>();

        for (CartItem cartItem : cartItems) {
            Products product = cartItem.getProducts();
            int quantity = cartItem.getQuantity();
            BigDecimal price = BigDecimal.valueOf(product.getProductPrice());
            BigDecimal subtotal = price.multiply(BigDecimal.valueOf(quantity));

            PaymentItem paymentItem = new PaymentItem();
            paymentItem.setPayment(payment);
            paymentItem.setProducts(product);
            paymentItem.setQuantity(quantity);
            paymentItem.setPrice(price);
            paymentItem.setSubtotal(subtotal);

            paymentItems.add(paymentItem);
            totalAmount = totalAmount.add(subtotal);
        }

        payment.setPaymentItems(paymentItems);
        payment.setTotalAmount(totalAmount);

        // 포인트 결제
        if (member.getPoint() >= totalAmount.longValue()) {
            member.setPoint(member.getPoint() - totalAmount.longValue());
            payment.setPaidWithPoints(true);
        }

        paymentRepository.save(payment);
        return payment;
    }

    public Payment getOrderById(Long orderId) {
        return paymentRepository.findById(orderId).orElse(null);
    }
}