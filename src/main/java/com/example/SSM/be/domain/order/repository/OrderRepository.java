package com.example.SSM.be.domain.order.repository;

import com.example.SSM.be.domain.order.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {
}