package com.example.SSM.be.domain.cart.dto;

import com.example.SSM.be.domain.cart.entity.CartItem;
import com.example.SSM.be.domain.products.dto.ProductsResponseDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CartItemResponseDTO {
    private ProductsResponseDto product;
    private int quantity;
    private BigDecimal totalPrice; // 총 가격 정보 추가

    public CartItemResponseDTO(CartItem cartItem) {
        this.product = new ProductsResponseDto(cartItem.getProducts());
        this.quantity = cartItem.getQuantity();
        BigDecimal unitPrice = BigDecimal.valueOf(cartItem.getProducts().getProductPrice()); // 수량별 가격 계산 로직 추가
        this.totalPrice = unitPrice.multiply(BigDecimal.valueOf(this.quantity));
    }

    // CartItem 리스트를 받아서 CartItemResponseDTO 리스트로 변환하고, 총 가격 합계 계산
    public static List<CartItemResponseDTO> fromCartItem(List<CartItem> cartItems) {
        BigDecimal total = BigDecimal.ZERO;
        List<CartItemResponseDTO> cartItemDTOs = cartItems.stream()
                .map(cartItem -> new CartItemResponseDTO(cartItem))
                .collect(Collectors.toList());

        for (CartItemResponseDTO cartItemDTO : cartItemDTOs) {
            total = total.add(cartItemDTO.getTotalPrice());
        }

        // 총 가격 합계를 DTO 리스트에 추가
        CartItemResponseDTO totalDTO = new CartItemResponseDTO();
        totalDTO.setTotalPrice(total);
        cartItemDTOs.add(totalDTO);

        return cartItemDTOs;
    }
}