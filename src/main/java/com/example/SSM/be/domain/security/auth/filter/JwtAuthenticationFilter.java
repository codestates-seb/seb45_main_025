package com.example.SSM.be.domain.security.auth.filter;

import com.example.SSM.be.domain.member.entity.Member;
import com.example.SSM.be.domain.member.repository.MemberRepository;
import com.example.SSM.be.domain.security.auth.dto.LoginDto;
import com.example.SSM.be.domain.security.token.jwt.JwtTokenizer;
import com.example.SSM.be.domain.security.token.repository.RefreshTokenRepository;
import com.example.SSM.be.global.exception.BusinessLogicException;
import com.example.SSM.be.global.exception.ExceptionCode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseCookie;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;


@Slf4j
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {  // (1)
    private final AuthenticationManager authenticationManager;
    private final JwtTokenizer jwtTokenizer;

    private final MemberRepository memberRepository;
    private final RefreshTokenRepository refreshTokenRepository;



    // (3)
    @SneakyThrows
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) {

        ObjectMapper objectMapper = new ObjectMapper();
        LoginDto loginDto;
        try {
            loginDto = objectMapper.readValue(request.getInputStream(), LoginDto.class);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }


        Optional<Member> optionalMember = memberRepository.findByEmail(loginDto.getEmail());

        Member findMember = optionalMember.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        if (findMember.getMemberStatus() == Member.MemberStatus.MEMBER_EXIT) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_IS_DELETED);
        }

        // (3-3)
        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(loginDto.getEmail(), loginDto.getPassword());

        return authenticationManager.authenticate(authenticationToken);

    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request,
                                            HttpServletResponse response,
                                            FilterChain chain,
                                            Authentication authResult) throws ServletException, IOException {
        Member member = (Member) authResult.getPrincipal();

        String accessToken = delegateAccessToken(member); // accessToken 만들기
        String refreshToken = delegateRefreshToken(member); // refreshToken 만들기
        String memberId = String.valueOf(member.getUserId());
        String headerAccessToken  = "Bearer " + accessToken;

        ResponseCookie responseAccessCookie= ResponseCookie.from("access_token", accessToken)
                .sameSite("None")
                .secure(true)
                .maxAge(60 * 5) // 5분
                .path("/")
                .build();
        ResponseCookie responseRefreshCookie= ResponseCookie.from("refresh_token", refreshToken)
                .sameSite("None")
                .secure(true)
                .httpOnly(true)
                .maxAge(60 * 60*24) // 하루
                .path("/")
                .build();
        response.setHeader("Authorization", headerAccessToken);
        response.setHeader("Refresh", refreshToken);
        response.setHeader("MemberId", memberId);
        response.addHeader("Set-Cookie", responseAccessCookie.toString());
        response.addHeader("Set-Cookie", responseRefreshCookie.toString());
        this.getSuccessHandler().onAuthenticationSuccess(request, response, authResult);
    }

    private String delegateAccessToken(Member member) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("memberId", member.getUserId());
        claims.put("roles", member.getRoles());

        String subject = member.getEmail();
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());

        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey();

        String accessToken = jwtTokenizer.generateAccessToken(claims, subject, expiration, base64EncodedSecretKey);

        return accessToken;
    }

    // (6)
    private String delegateRefreshToken(Member member) {
        String subject = member.getEmail();
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getRefreshTokenExpirationMinutes());
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey();
        // 이미 있는 토큰인지 판별하기 위해
        String refreshToken = jwtTokenizer.generateRefreshToken(member,subject, expiration, base64EncodedSecretKey);
        return refreshToken;
    }
}