package com.example.SSM.be.domain.security.auth.service;

import com.example.SSM.be.domain.member.service.MemberService;
import com.example.SSM.be.domain.security.auth.jwt.JwtTokenizer;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class TokenService {
    private final JwtTokenizer jwtTokenizer;
    private final MemberService memberService;

    public Jws<Claims> checkAccessToken(String authorization) {

        String jws = authorization.replace("Bearer ", "");

        return jwtTokenizer.verifySignature(jws);
    }

    public Jws<Claims> checkRefreshToken(String refresh){
        return jwtTokenizer.verifySignature(refresh);
    }

}
