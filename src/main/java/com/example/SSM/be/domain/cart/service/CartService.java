package com.example.SSM.be.domain.cart.service;

import com.example.SSM.be.domain.cart.entity.Cart;
import com.example.SSM.be.domain.cart.entity.CartItem;
import com.example.SSM.be.domain.cart.repository.CartRepository;
import com.example.SSM.be.domain.products.entity.Products;
import com.example.SSM.be.domain.products.service.ProductsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;
import java.util.List;

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
        Cart cart = cartRepository.findByUsername(username)
                .orElseThrow(() -> new EntityNotFoundException("장바구니를 찾을 수 없습니다."));

        return cart.getCartItems();
    }
    public void updateCartItemQuantity(String username, Long productId, Integer quantity) {
        // 사용자의 장바구니에서 해당 상품을 찾아옴
        Cart cart = cartRepository.findByUsername(username)
                .orElseThrow(() -> new EntityNotFoundException("장바구니를 찾을 수 없습니다."));

        // 해당 상품이 장바구니에 있는지 확인
        CartItem cartItem = cart.getCartItemByProductId(productId);
        if (cartItem != null) {
            cartItem.setQuantity(quantity);
            cartRepository.save(cart);
        }
    }
    public void removeFromCart(String username, Long productId) {
        // 사용자의 장바구니에서 해당 상품을 찾아옴
        Cart cart = cartRepository.findByUsername(username)
                .orElseThrow(() -> new EntityNotFoundException("장바구니를 찾을 수 없습니다."));

        // 해당 상품이 장바구니에 있는지 확인
        CartItem cartItem = cart.getCartItemByProductId(productId);
        if (cartItem != null) {
            cart.getCartItems().remove(cartItem);
            cartRepository.save(cart);
        }
    }
}