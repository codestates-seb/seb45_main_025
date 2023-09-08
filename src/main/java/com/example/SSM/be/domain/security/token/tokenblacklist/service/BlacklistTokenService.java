package com.example.SSM.be.domain.security.token.tokenblacklist.service;

import com.example.SSM.be.domain.security.token.jwt.JwtTokenizer;
import com.example.SSM.be.domain.security.token.tokenblacklist.repository.TokenBlacklistRepository;
import com.example.SSM.be.domain.security.token.tokenblacklist.entity.TokenBlacklist;
import com.example.SSM.be.global.exception.BusinessLogicException;
import com.example.SSM.be.global.exception.ExceptionCode;
import io.jsonwebtoken.Claims;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
@Slf4j
public class BlacklistTokenService {



    private final TokenBlacklistRepository tokenBlacklistRepository;
    private final JwtTokenizer jwtTokenizer;

    public BlacklistTokenService(TokenBlacklistRepository tokenBlacklistRepository, JwtTokenizer jwtTokenizer) {
        this.tokenBlacklistRepository = tokenBlacklistRepository;
        this.jwtTokenizer = jwtTokenizer;
    }

    /*유효기간이 만료된 토큰을 BlackList에서 제거*/
    @Scheduled(fixedRate = 60000) // 매 분마다 실행
    public void cleanupExpiredTokens() {
        Date currentDate = new Date();
        List<TokenBlacklist> expiredTokens = tokenBlacklistRepository.findByExpiryDateBefore(currentDate);
        for(TokenBlacklist tokenBlacklist : expiredTokens){
            log.info(tokenBlacklist.getToken());
            log.info(currentDate.toString());
            log.info(tokenBlacklist.getExpiryDate().toString());
        }
        tokenBlacklistRepository.deleteAll(expiredTokens);
    }

    /* 토큰이 블랙리스트에 들어가 있는지 확인하는 함수 */
    public boolean findBlackListedToken(String token){
        return tokenBlacklistRepository.existsByToken(token);
    }
    /*로그아웃시, 토큰을 블랙리스트에 올려놓음.*/
    public void addToBlacklist(String token) {
        // 이미 블랙리스트에 있는 토큰인지 확인
        if (tokenBlacklistRepository.existsByToken(token)) {
            log.info("Token is already in blacklist: {}", token);
            throw new BusinessLogicException(ExceptionCode.ALREADY_ON_BLACKLIST);
        }

        TokenBlacklist blacklistEntry = new TokenBlacklist();
        blacklistEntry.setToken(token);
        Claims claims =  jwtTokenizer.verifySignature(token).getBody();
        blacklistEntry.setExpiryDate(claims.getExpiration());

        tokenBlacklistRepository.save(blacklistEntry);
        log.info("Token added to blacklist: {}", token);
    }
}