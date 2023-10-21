package com.example.SSM.be.domain.security.token.service;

import com.example.SSM.be.domain.security.token.entity.RefreshToken;
import com.example.SSM.be.domain.security.token.jwt.JwtTokenizer;
import com.example.SSM.be.domain.security.token.repository.RefreshTokenRepository;
import com.example.SSM.be.global.exception.BusinessLogicException;
import com.example.SSM.be.global.exception.ExceptionCode;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

@Slf4j
@Service
@RequiredArgsConstructor
public class TokenService {
    private final JwtTokenizer jwtTokenizer;
    private final RefreshTokenRepository refreshTokenRepository;
    public Jws<Claims> checkAccessToken(String authorization) {

        String jws = authorization.replace("Bearer ", "");

        return jwtTokenizer.verifySignature(jws);
    }

    public Jws<Claims> checkRefreshToken(String Token){
        //String token = authorization.replace("Bearer ", "");
        RefreshToken refreshToken = findVerifiedRefreshToken(Token);
        return jwtTokenizer.verifySignature(refreshToken.getToken());
    }
    public Jws<Claims> checkToken(String authorization){
        String jws = authorization.replace("Bearer ", "");
        return jwtTokenizer.verifySignature(jws);
    }
    public RefreshToken findVerifiedRefreshToken(String token){
        Optional<RefreshToken> optionalRefreshToken =  refreshTokenRepository.findByToken(token);
        return optionalRefreshToken.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.TOKEN_NOT_FOUND));
    }
    public boolean isRefreshToken(String token){
        return refreshTokenRepository.existsByToken(token);
    }
    public String  getRemainingTime(Jws<Claims> claims ){
        long currentTime = System.currentTimeMillis();
        long jwsTime = claims.getBody().getExpiration().getTime();
        long remainingTimeMilliSecond = jwsTime - currentTime;

        long hours = TimeUnit.MILLISECONDS.toHours(remainingTimeMilliSecond);
        long minutes = TimeUnit.MILLISECONDS.toMinutes(remainingTimeMilliSecond) % 60;
        long seconds = TimeUnit.MILLISECONDS.toSeconds(remainingTimeMilliSecond) % 60;

        return hours + "시간 " + minutes + "분 " + seconds + "초";
    }
    @Scheduled(fixedRate = 60000) // 매 분마다 실행
    public void cleanupExpiredTokens() {
        Date currentDate = new Date();
        List<RefreshToken> expiredTokens = refreshTokenRepository.findByExpiryDateBefore(currentDate);
        for(RefreshToken refreshToken : expiredTokens){
            log.info(refreshToken.getToken());
            log.info(currentDate.toString());
            log.info(refreshToken.getExpiryDate().toString());
        }
        refreshTokenRepository.deleteAll(expiredTokens);
    }
}
