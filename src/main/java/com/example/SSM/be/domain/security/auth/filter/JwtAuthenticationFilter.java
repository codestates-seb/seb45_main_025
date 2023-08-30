package com.example.SSM.be.domain.security.auth.filter;

import com.example.SSM.be.domain.member.entity.Member;
import com.example.SSM.be.domain.member.repository.MemberRepository;
import com.example.SSM.be.domain.security.auth.dto.LoginDto;
import com.example.SSM.be.domain.security.auth.jwt.JwtTokenizer;
import com.example.SSM.be.global.exception.BusinessLogicException;
import com.example.SSM.be.global.exception.ExceptionCode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.SneakyThrows;
import org.springframework.http.HttpStatus;
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

public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
    private final AuthenticationManager authenticationManager;
    private final JwtTokenizer jwtTokenizer;
    private final MemberRepository memberRepository;

    public JwtAuthenticationFilter(AuthenticationManager authenticationManager, JwtTokenizer jwtTokenizer, MemberRepository memberRepository) {
        this.authenticationManager = authenticationManager;
        this.jwtTokenizer = jwtTokenizer;
        this.memberRepository = memberRepository;
    }

    @SneakyThrows
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request,
                                                HttpServletResponse response){
        ObjectMapper objectMapper = new ObjectMapper();
        LoginDto loginDto;
        try {
            loginDto = objectMapper.readValue(request.getInputStream(), LoginDto.class);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        Optional<Member> optionalMember = memberRepository.findByEmail(loginDto.getEmail());
        Member findMember =optionalMember.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        if(findMember.getMemberStatus() == Member.MemberStatus.MEMBER_EXIT){
            throw new BusinessLogicException(ExceptionCode.MEMBER_IS_DELETED);
        }
        if(findMember.getMemberStatus() == Member.MemberStatus.MEMBER_SLEEP){
            throw new BusinessLogicException(ExceptionCode.MEMBER_IS_SLEEPING);
        }


        UsernamePasswordAuthenticationToken authenticationToken=
                new UsernamePasswordAuthenticationToken(loginDto.getEmail(),loginDto.getPassword());
        return authenticationManager.authenticate(authenticationToken);
    }

    @Override
    public void successfulAuthentication(HttpServletRequest request,
                                         HttpServletResponse response,
                                         FilterChain chain,
                                         Authentication authResult)
        throws ServletException, IOException{
        Member member = (Member) authResult.getPrincipal();

        String accessToken = delegateAccessToken(member);
        String refreshToken = delegateRefreshToken(member);

        response.setHeader("Authorization", "Bearer " + accessToken );
        response.setHeader("Refresh",refreshToken);
        response.setHeader("MemberId",String.valueOf(member.getUserId()));
        response.setStatus(HttpStatus.CREATED.value());
        this.getSuccessHandler().onAuthenticationSuccess(request,response,authResult);
    }

    private String delegateAccessToken(Member member) {
        Map<String, Object> claims = new HashMap<>();
//        claims.put("memberId", member.getMemberId());  // 식별자도 포함할 수 있다.
        claims.put("email", member.getEmail());
        claims.put("roles", member.getRoles());

        String subject = member.getEmail();
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey();
        String accessToken = jwtTokenizer.generateAccessToken(claims, subject, expiration,base64EncodedSecretKey);

        return accessToken;
    }

    private String delegateRefreshToken(Member member) {
        String subject = member.getEmail();
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getRefreshTokenExpirationMinutes());
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey();

        String refreshToken = jwtTokenizer.generateRefreshToken(subject, expiration,base64EncodedSecretKey);

        return refreshToken;
    }
}
