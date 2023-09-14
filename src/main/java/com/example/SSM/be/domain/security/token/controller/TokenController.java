package com.example.SSM.be.domain.security.token.controller;

import com.example.SSM.be.domain.member.entity.Member;
import com.example.SSM.be.domain.member.service.MemberService;
import com.example.SSM.be.domain.security.token.service.TokenService;
import com.example.SSM.be.global.exception.BusinessLogicException;
import com.example.SSM.be.global.exception.ExceptionCode;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.Objects;

@RestController
@RequiredArgsConstructor
@Slf4j
public class TokenController {
    private final TokenService  tokenService;
    private final MemberService memberService;

    @PostMapping("token/refresh")
    public ResponseEntity refreshAccessToken(HttpServletRequest request){
        String refreshTokenHeader = request.getHeader("Refresh");
        log.info(refreshTokenHeader);
        Jws<Claims> claims = tokenService.checkRefreshToken(refreshTokenHeader);
        Member member = memberService.findVerifiedMemberWithClaims(claims);
        String accessToken = memberService.delegateAccessToken(member);
        return ResponseEntity.ok()
                    .header("Authorization", "Bearer " + accessToken)
                    .body("Successfully refresh");
    }

    @PostMapping("/token/check")
    public ResponseEntity checkAccessToken(HttpServletRequest request){
        validateExistHeader(request);
        String TokenHeader = request.getHeader("Authorization");
        Jws<Claims> claims = tokenService.checkToken(TokenHeader);
        String remainingTime = tokenService.getRemainingTime(claims);

        return ResponseEntity.ok().body("현재 토큰의 잔여 시간은 " + remainingTime + " 입니다");
    }
    private void validateExistHeader(HttpServletRequest request) {
        String authorizationHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        String refreshTokenHeader = request.getHeader("Refresh");
        if (Objects.isNull(authorizationHeader) && Objects.isNull(refreshTokenHeader)) {
            throw new BusinessLogicException(ExceptionCode.TOKEN_NOT_FOUND);
        }
    }
}
