package com.example.SSM.be.domain.products.entity;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@EntityListeners(AuditingEntityListener.class)
public class Products {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_id")
    private Long productId;

    @Column(name = "product_name")
    private String productName;

    @Column(name = "img")
    private String img;

    @Column(name = "content")
    private String content;

    @Column(name = "product_price")
    private Double productPrice;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "modified_at")
    private LocalDateTime modifiedAt;

    public Long getproductId() {
        return productId;
    }

    public String getProductName() {
        return productName;
    }

    public String getImg() {
        return img;
    }

    public String getContent() {
        return content;
    }

    public Double getProductPrice() {
        return productPrice;
    }

    public void setproductId(Long productId) {
        this.productId = productId;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public void setImg(String img) {
        this.img = img;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public void setProductPrice(Double productPrice) {
        this.productPrice = productPrice;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getModifiedAt() {
        return modifiedAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public void setModifiedAt(LocalDateTime modifiedAt) {
        this.modifiedAt = modifiedAt;
    }
}
