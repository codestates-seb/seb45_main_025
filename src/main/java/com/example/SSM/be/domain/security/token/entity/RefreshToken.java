package com.example.SSM.be.domain.security.token.entity;

import com.example.SSM.be.domain.member.entity.Member;
import lombok.Getter;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter
public class RefreshToken {

    @Id
    @Column(name = "token")
    private String token;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private Member member;

    @Temporal(TemporalType.TIMESTAMP)
    private Date expiryDate;
    public RefreshToken(Member member,String token, Date expiryDate){
        this.member=member;
        this.token=token;
        this.expiryDate=expiryDate;
    }

    public RefreshToken() {

    }
}
