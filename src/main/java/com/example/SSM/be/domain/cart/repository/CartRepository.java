package com.example.SSM.be.domain.cart.repository;

import com.example.SSM.be.domain.cart.entity.Cart;
import com.example.SSM.be.domain.cart.entity.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CartRepository extends JpaRepository<Cart, Long> {
    // 사용자명으로 카트를 조회하는 메서드
    Optional<Cart> findByUsername(String username);

}
