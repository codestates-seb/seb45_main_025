package com.example.SSM.be.domain.cart.entity;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Entity
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String username;
    @OneToMany(mappedBy = "cart", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private List<CartItem> cartItems = new ArrayList<>();

    public Cart() {
    }
    public Cart(String username) {
        this.username = username;
    }
    // 장바구니에 해당 상품의 아이템이 있는지 검사하고 반환
    public CartItem getCartItemByProductId(Long productId) {
        for (CartItem cartItem : cartItems) {
            if (cartItem.getProducts().getProductId().equals(productId)) {
                return cartItem;
            }
        }
        return null;
    }
    // 장바구니에 아이템을 추가
    public void addItem(CartItem cartItem) {
        cartItem.setCart(this);
        cartItems.add(cartItem);
    }
    public List<CartItem> getCartItems() {
        return cartItems;
    }
    public List<CartItem> getRemainingCartItems() {
        return cartItems.stream()
                .filter(cartItem -> cartItem.getQuantity() > 0)
                .collect(Collectors.toList());
    }
}