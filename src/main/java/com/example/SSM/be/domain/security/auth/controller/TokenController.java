package com.example.SSM.be.domain.security.auth.controller;

import com.example.SSM.be.domain.member.entity.Member;
import com.example.SSM.be.domain.member.repository.MemberRepository;
import com.example.SSM.be.domain.member.service.MemberService;
import com.example.SSM.be.domain.security.auth.service.TokenService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

@RestController
@RequiredArgsConstructor
@Slf4j
public class TokenController {
    private final TokenService  tokenService;
    private final MemberRepository memberRepository;
    private final MemberService memberService;

    @PostMapping("token/refresh")
    public ResponseEntity refreshAccessToken(HttpServletRequest request){
        String refreshTokenHeader = request.getHeader("Refresh");
        Jws<Claims> claims = tokenService.checkRefreshToken(refreshTokenHeader);
        String email = claims.getBody().getSubject();
        Optional<Member> optionalMember = memberRepository.findByEmail(email);

        if(optionalMember.isPresent()){
            Member member = optionalMember.get();
            String accessToken = memberService.delegateAccessToken(member);

            return ResponseEntity.ok()
                    .header("Authorization", "Bearer " + accessToken)
                    .body("Successfully refresh");
        }
        else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Member not found");
        }
    }

    @PostMapping("/token/check")
    public ResponseEntity checkAccessToken(HttpServletRequest request){
        String refreshTokenHeader = request.getHeader("Authorization");

        Jws<Claims> claims = tokenService.checkAccessToken(refreshTokenHeader);

        long currentTime = System.currentTimeMillis();
        long jwsTime = claims.getBody().getExpiration().getTime();
        long remainingTimeMilliSecond = jwsTime - currentTime;

        long hours = TimeUnit.MILLISECONDS.toHours(remainingTimeMilliSecond);
        long minutes = TimeUnit.MILLISECONDS.toMinutes(remainingTimeMilliSecond) % 60;
        long seconds = TimeUnit.MILLISECONDS.toSeconds(remainingTimeMilliSecond) % 60;

        String remainingTime = hours + "시간 " + minutes + "분 " + seconds + "초";

        return ResponseEntity.ok().body("현재 토큰의 잔여 시간은 " + remainingTime + " 입니다");
    }
}
