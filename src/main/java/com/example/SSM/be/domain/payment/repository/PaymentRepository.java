package com.example.SSM.be.domain.payment.repository;

import com.example.SSM.be.domain.payment.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
    List<Payment> findByMember_Email(String email);
}