package com.example.SSM.be.domain.security.tokenblacklist.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class TokenBlacklist {

    @Id
    private String token;

    @Temporal(TemporalType.TIMESTAMP)
    private Date expiryDate;

    // Constructors, getters, setters
}
