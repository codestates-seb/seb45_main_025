package com.example.SSM.be.domain.payment.service;

import com.example.SSM.be.domain.cart.entity.CartItem;
import com.example.SSM.be.domain.cart.service.CartService;
import com.example.SSM.be.domain.member.entity.Member;
import com.example.SSM.be.domain.member.repository.MemberRepository;
import com.example.SSM.be.domain.payment.dto.OrderHistoryDTO;
import com.example.SSM.be.domain.payment.dto.OrderItemDTO;
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
            List<Long> selectedCartItems,
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
            if (selectedCartItems.contains(cartItem.getId())) {
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
        }

        payment.setPaymentItems(paymentItems);
        payment.setTotalAmount(totalAmount);

        // 선택된 장바구니 아이템을 장바구니에서 제거
        if (!selectedCartItems.isEmpty()) {
            cartService.removeCartItems(member.getEmail(), selectedCartItems);
        }

        paymentRepository.save(payment);
        return payment;
    }

    @Transactional
    public List<OrderHistoryDTO> getOrderHistory(String email) {
        List<Payment> payments = paymentRepository.findByMember_Email(email);
        List<OrderHistoryDTO> orderHistoryList = new ArrayList<>();

        for (Payment payment : payments) {
            OrderHistoryDTO orderHistoryDTO = new OrderHistoryDTO();
            orderHistoryDTO.setOrderId(Long.valueOf(payment.getPaymentid().toString()));
            orderHistoryDTO.setOrderDate(payment.getOrderDate().toString());
            orderHistoryDTO.setRecipientName(payment.getRecipientName());
            orderHistoryDTO.setAddress(payment.getAddress());
            orderHistoryDTO.setPhone(payment.getPhone());
            orderHistoryDTO.setRequest(payment.getRequest());

            List<OrderItemDTO> orderItems = new ArrayList<>();
            for (PaymentItem paymentItem : payment.getPaymentItems()) {
                OrderItemDTO orderItemDTO = new OrderItemDTO();
                orderItemDTO.setProductId(Long.valueOf(paymentItem.getProducts().getProductId().toString()));
                orderItemDTO.setProductName(paymentItem.getProducts().getProductName());
                orderItemDTO.setQuantity(paymentItem.getQuantity());
                orderItemDTO.setPrice(paymentItem.getPrice());
                orderItemDTO.setSubtotal(paymentItem.getSubtotal());
                orderItems.add(orderItemDTO);
            }
            orderHistoryDTO.setOrderItems(orderItems); // 주문한 상품 목록 추가

            orderHistoryList.add(orderHistoryDTO);
        }

        return orderHistoryList;
    }

}