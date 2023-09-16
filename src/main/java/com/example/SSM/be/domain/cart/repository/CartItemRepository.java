package com.example.SSM.be.domain.cart.repository;

import com.example.SSM.be.domain.cart.entity.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    // 다음과 같이 findById 메서드를 추가합니다.
    Optional<CartItem> findById(Long id);
}
