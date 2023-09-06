package com.example.SSM.be.domain.security.token.tokenblacklist.repository;

import com.example.SSM.be.domain.security.token.tokenblacklist.entity.TokenBlacklist;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;

public interface TokenBlacklistRepository extends JpaRepository<TokenBlacklist, Long> {

    List<TokenBlacklist> findByExpiryDateBefore(Date currentDate);

    boolean existsByToken(String token);
}
