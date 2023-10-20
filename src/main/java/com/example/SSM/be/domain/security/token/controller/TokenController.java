package com.example.SSM.be.domain.security.token.controller;

import com.example.SSM.be.domain.member.entity.Member;
import com.example.SSM.be.domain.member.service.MemberService;
import com.example.SSM.be.domain.security.token.service.TokenService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.constraints.Positive;

@RestController
@RequiredArgsConstructor
@Slf4j
public class TokenController {
    private final TokenService  tokenService;
    private final MemberService memberService;

    @PostMapping("token/refresh")
    public ResponseEntity refreshAccessToken(//HttpServletRequest request,
                                             @CookieValue(name = "refresh_token", required = true) String authorizationCookie){
        log.info(authorizationCookie);
        Jws<Claims> claims = tokenService.checkRefreshToken(authorizationCookie);
        Member member = memberService.findVerifiedMemberWithClaims(claims);
        String accessToken = memberService.delegateAccessToken(member);
        return ResponseEntity.ok()
                    .header("Authorization", "Bearer " + accessToken)
                    .body("Successfully refresh");
    }

    @PostMapping("/token/check/{AccessOrRefresh}")
    public ResponseEntity checkAccessToken(//HttpServletRequest request,
                                           @PathVariable("AccessOrRefresh") @Positive int Case,
                                           @CookieValue(name = "access_token", required = false) String accessToken,
                                           @CookieValue(name = "refresh_token", required = false) String refreshToken){
//        String TokenHeader = request.getHeader("Authorization");
        String Token = null;
        switch (Case){
            case 1: Token = accessToken; break;
            case 2: Token = refreshToken; break;
        }
        Jws<Claims> claims = tokenService.checkToken(Token);
        String remainingTime = tokenService.getRemainingTime(claims);

        return ResponseEntity.ok().body("현재 토큰의 잔여 시간은 " + remainingTime + " 입니다");
    }
//    private void validateExistHeader(HttpServletRequest request) {
//        String authorizationHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
//        String refreshTokenHeader = request.getHeader("Refresh");
//        if (Objects.isNull(authorizationHeader) && Objects.isNull(refreshTokenHeader)) {
//            throw new BusinessLogicException(ExceptionCode.TOKEN_NOT_FOUND);
//        }
//    }
}
