package com.example.SSM.be.domain.order.service;

import com.example.SSM.be.domain.cart.entity.CartItem;
import com.example.SSM.be.domain.member.entity.Member;
import com.example.SSM.be.domain.order.entity.Order;
import com.example.SSM.be.domain.order.entity.OrderItem;
import com.example.SSM.be.domain.order.repository.OrderRepository;
import com.example.SSM.be.domain.products.entity.Products;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;

    public Order createOrder(Member member, List<CartItem> cartItems) {
        // 주문 생성 및 상품 추가
        Order order = new Order();
        order.setMember(member);
        order.setOrderDate(LocalDateTime.now());

        BigDecimal totalAmount = BigDecimal.ZERO;
        List<OrderItem> orderItems = new ArrayList<>();

        for (CartItem cartItem : cartItems) {
            Products product = cartItem.getProducts();
            int quantity = cartItem.getQuantity();
            BigDecimal price = BigDecimal.valueOf(product.getProductPrice());
            BigDecimal subtotal = price.multiply(BigDecimal.valueOf(quantity));

            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(order);
            orderItem.setProduct(product);
            orderItem.setQuantity(quantity);
            orderItem.setPrice(price);
            orderItem.setSubtotal(subtotal);

            orderItems.add(orderItem);
            totalAmount = totalAmount.add(subtotal);
        }

        order.setOrderItems(orderItems);
        order.setTotalAmount(totalAmount);

        // 포인트 결제
        if (member.getPoint() >= totalAmount.longValue()) {
            member.setPoint(member.getPoint() - totalAmount.longValue());
            order.setPaidWithPoints(true);
        }

        orderRepository.save(order);
        return order;
    }
    public Order getOrderById(Long orderId) {
        return orderRepository.findById(orderId).orElse(null);
    }
}