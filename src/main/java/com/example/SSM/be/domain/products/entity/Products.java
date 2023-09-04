package com.example.SSM.be.domain.products.entity;

import com.example.SSM.be.domain.member.entity.Member;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Entity
@Getter
@Setter
@EntityListeners(AuditingEntityListener.class)
public class Products {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_id")
    private Long productId;

    @Column(name = "product_name")
    private String productName;
    @Column(name = "category")
    public String category;

    @Column(name = "img")
    private String img;

    @Column(name = "content")
    private String content;

    @Column(name = "productDescription")
    private String productDescription;

    @Column(name = "product_price")
    private Double productPrice;

    @Column(name = "likes")
    private int likes;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "modified_at")
    private LocalDateTime modifiedAt;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "member_liked_products",
            joinColumns = @JoinColumn(name = "member_id"),
            inverseJoinColumns = @JoinColumn(name = "product_id")
    )
    @JsonIgnoreProperties("likedByMembers")
    private Set<Products> likedProducts = new HashSet<>();
}
