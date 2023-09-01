package com.example.SSM.be.domain.cart.dto;

import com.example.SSM.be.domain.cart.entity.CartItem;
import com.example.SSM.be.domain.products.dto.ProductsResponseDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CartItemResponseDTO {
    private Long cartId;
    private ProductsResponseDto product;
    private int quantity;
    private BigDecimal totalPrice; // 총 가격 정보 추가

    public CartItemResponseDTO(CartItem cartItem) {
        this.cartId = cartItem.getId();
        this.product = new ProductsResponseDto(cartItem.getProduct());
        this.quantity = cartItem.getQuantity();
        // 수량별 가격 계산 로직 추가
        BigDecimal unitPrice = BigDecimal.valueOf(cartItem.getProduct().getPrice());
        this.totalPrice = unitPrice.multiply(BigDecimal.valueOf(this.quantity));
    }
}