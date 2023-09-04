package com.example.SSM.be.domain.security.auth.entity;

import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
public class RefreshToken {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "refresh_token_id")
    private Long id;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "token")
    private String token;

    protected RefreshToken() {
    }

    public RefreshToken(Long userId, String token) {
        this.userId = userId;
        this.token = token;
    }
}
