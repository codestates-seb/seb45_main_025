package com.example.SSM.be.domain.cart.entity;

import com.example.SSM.be.domain.products.entity.Products;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
public class CartItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cart_id")
    private Cart cart;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id")
    private Products product;

    @OneToMany(mappedBy = "cart", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CartItem> cartItems = new ArrayList<>();

    private int quantity;

    public CartItem() {
    }
    public CartItem(Products product, int quantity) {
        this.product = product;
        this.quantity = quantity;
    }
    public void setCart(Cart cart) {
        this.cart = cart;
    }
    public Products getProducts() {
        return product;
    }
    public Long getId() {
        return id;
    }
}
