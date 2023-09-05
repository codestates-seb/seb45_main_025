package com.example.SSM.be.domain.security.token.entity;

import com.example.SSM.be.domain.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RefreshToken {

    @Id
    @Column(name = "token")
    private String token;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "user_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Member member;

    @Temporal(TemporalType.TIMESTAMP)
    private Date expiryDate;
    public RefreshToken(Member member,String token, Date expiryDate){
        this.member=member;
        this.token=token;
        this.expiryDate=expiryDate;
    }

}
