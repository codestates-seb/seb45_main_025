package com.example.SSM.be.domain.security.token.jwt;

import com.example.SSM.be.domain.member.entity.Member;
import com.example.SSM.be.domain.security.token.entity.RefreshToken;
import com.example.SSM.be.domain.security.token.repository.RefreshTokenRepository;
import com.example.SSM.be.global.exception.BusinessLogicException;
import com.example.SSM.be.global.exception.ExceptionCode;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.io.Encoders;
import io.jsonwebtoken.security.Keys;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.*;

@Component
@Slf4j
@RequiredArgsConstructor
public class JwtTokenizer {

    @Getter
    @Value("${jwt.secret-key}")
    private String secretKey;

    @Getter
    @Value("${jwt.access-token-expiration-minutes}")
    private int accessTokenExpirationMinutes;

    @Getter
    @Value("${jwt.refresh-token-expiration-minutes}")
    private int refreshTokenExpirationMinutes;

    private final RefreshTokenRepository refreshTokenRepository;


    @PostConstruct
    protected void init(){
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes(StandardCharsets.UTF_16));
    }

    public String encodeBase64SecretKey() {
        return Encoders.BASE64.encode(this.secretKey.getBytes(StandardCharsets.UTF_8));
    }

    // Access Token 생성 메서드
    public String generateAccessToken(Map<String, Object> claims,
                                      String subject,
                                      Date expiration,
                                      String base64EncodedSecretKey) {
        Key key = getKeyFromBase64EncodedKey(base64EncodedSecretKey);


        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(Calendar.getInstance().getTime())
                .setExpiration(expiration)
                .signWith(SignatureAlgorithm.HS256, key)
                .compact();
    }

    // Refresh Token 생성 메서드 : Access Token이 만료되었을 경우, Access Token을 새로 생성하는 토큰

    public String generateRefreshToken(Member member,String subject, Date expiration, String base64EncodedSecretKey) {

        Optional<RefreshToken> existingTokenOptional = refreshTokenRepository.findByMember(member);

        if (existingTokenOptional.isPresent()) {
            RefreshToken existingToken = existingTokenOptional.get();

            // 리프레시 토큰이 만료되지 않았다면 기존 토큰을 반환
            if (existingToken.getExpiryDate().after(new Date())) {
                return existingToken.getToken();
            }
            // 기존 토큰을 삭제하고 아래에서 새 토큰을 발급
            refreshTokenRepository.delete(existingToken);
        }

        Key key = getKeyFromBase64EncodedKey(base64EncodedSecretKey);

        String refreshToken = Jwts.builder()
                .setSubject(subject)
                .setIssuedAt(Calendar.getInstance().getTime())
                .setExpiration(expiration)
                .signWith(SignatureAlgorithm.HS256, key)
                .compact();
        // 이미 리프레시 토큰이 db에 있는 경우
        RefreshToken refreshTokenDB = new RefreshToken(member, refreshToken, expiration);
        refreshTokenRepository.save(refreshTokenDB);

        return refreshToken;
    }


    // 검증 후 반환
    public Jws<Claims> verifySignature(String jws) {

            try {
                return Jwts.parserBuilder()
                        .setSigningKey(getKey())
                        .build()
                        .parseClaimsJws(jws);
            } catch (ExpiredJwtException exception) {
                throw new BusinessLogicException(ExceptionCode.JWT_TOKEN_EXPIRED);
            }
    }


    public Date getTokenExpiration(int expirationMinutes) {
        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.MINUTE, expirationMinutes);
        Date expiration = calendar.getTime();

        return expiration;
    }

    private Key getKeyFromBase64EncodedKey(String base64EncodedSecretKey) {
        byte[] keyBytes = Decoders.BASE64.decode(base64EncodedSecretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    private Key getKey() {
        String base64EncodedSecretKey = encodeBase64SecretKey();

        return getKeyFromBase64EncodedKey(base64EncodedSecretKey);
    }

}