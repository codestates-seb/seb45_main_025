package com.example.SSM.be.domain.payment.repository;

import com.example.SSM.be.domain.payment.entity.PaymentItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentItemRepository extends JpaRepository<PaymentItem, Long> {

}
