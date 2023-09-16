package com.example.SSM.be.domain.cart.service;

import com.example.SSM.be.domain.cart.dto.CartItemResponseDTO;
import com.example.SSM.be.domain.cart.entity.Cart;
import com.example.SSM.be.domain.cart.entity.CartItem;
import com.example.SSM.be.domain.cart.repository.CartRepository;
import com.example.SSM.be.domain.products.entity.Products;
import com.example.SSM.be.domain.products.service.ProductsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class CartService {
    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private ProductsService productsService;

    public void addToCart(String username, Long productId, Integer quantity) {
        // 사용자의 장바구니에서 해당 상품을 찾아옴
        Cart cart = cartRepository.findByUsername(username)
                .orElseGet(() -> createNewCart(username));

        // 해당 상품이 이미 장바구니에 있는지 확인
        CartItem cartItem = cart.getCartItemByProductId(productId);
        if (cartItem == null) {
            Products product = productsService.getProductById(productId);
            if (product != null) {
                cartItem = new CartItem(product, quantity);
                cart.addItem(cartItem);
                cartRepository.save(cart);
            }
        } else {
            cartItem.setQuantity(cartItem.getQuantity() + quantity);
            cartRepository.save(cart);
        }
    }
    private Cart createNewCart(String username) {
        Cart cart = new Cart(username);
        return cartRepository.save(cart);
    }
    public List<CartItem> getCartItems(String username) {
        Optional<Cart> cartOptional = cartRepository.findByUsername(username);

        if (cartOptional.isPresent()) {
            Cart cart = cartOptional.get();
            return cart.getCartItems();
        } else {
            // If the cart is not found, return an empty list
            return Collections.emptyList();
        }
    }

    public CartItemResponseDTO updateCartItemQuantity(String username, Long productId, Integer quantity) {
        // 사용자의 장바구니에서 해당 상품을 찾아옴
        Cart cart = cartRepository.findByUsername(username)
                .orElseThrow(() -> new EntityNotFoundException("장바구니를 찾을 수 없습니다."));

        // 해당 상품이 장바구니에 있는지 확인
        CartItem cartItem = cart.getCartItemByProductId(productId);
        if (cartItem != null) {
            cartItem.setQuantity(quantity);
            cartRepository.save(cart);

            // 수정된 상품 정보를 응답으로 생성
            CartItemResponseDTO response = new CartItemResponseDTO(cartItem);
            return response;
        }

        return null; // 해당 상품이 장바구니에 없으면 null 반환
    }
    public void clearCart(String username) {
        // 사용자의 장바구니를 초기화 (모든 상품 삭제)
        Cart cart = cartRepository.findByUsername(username)
                .orElseThrow(() -> new EntityNotFoundException("장바구니를 찾을 수 없습니다."));
        cart.getCartItems().clear();
        cartRepository.save(cart);
    }
    public void removeCartItems(String username, List<Long> productIds) {
        // 사용자의 장바구니를 가져옴
        Cart cart = cartRepository.findByUsername(username)
                .orElseThrow(() -> new EntityNotFoundException("장바구니를 찾을 수 없습니다."));

        // 선택한 상품 ID 목록을 이용하여 장바구니에서 상품을 삭제
        for (Long productId : productIds) {
            CartItem cartItem = cart.getCartItemByProductId(productId);
            if (cartItem != null) {
                cart.getCartItems().remove(cartItem);
            }
        }

        // 장바구니 업데이트
        cartRepository.save(cart);
    }
    public List<CartItem> getCartItemsByUsername(String username) {
        // 리포지토리에서 사용자의 장바구니 항목을 검색하거나 필요한 비즈니스 로직 수행
        return cartRepository.findByUsername(username)
                .orElseThrow(() -> new EntityNotFoundException("장바구니를 찾을 수 없습니다."))
                .getCartItems();
    }
}