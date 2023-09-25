package com.example.SSM.be.domain.security.token.repository;

import com.example.SSM.be.domain.member.entity.Member;
import com.example.SSM.be.domain.security.token.entity.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken,Long> {
    List<RefreshToken> findByExpiryDateBefore(Date currentDate);

    Optional<RefreshToken> findByMember(Member member);
    Optional<RefreshToken> findByToken(String Token);
    boolean existsByToken(String Token);
}
