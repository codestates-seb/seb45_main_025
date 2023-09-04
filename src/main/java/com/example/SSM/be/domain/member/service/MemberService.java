package com.example.SSM.be.domain.member.service;

import com.example.SSM.be.domain.member.entity.Member;
import com.example.SSM.be.domain.member.repository.MemberRepository;
import com.example.SSM.be.domain.security.auth.jwt.JwtTokenizer;
import com.example.SSM.be.domain.security.auth.utils.CustomAuthorityUtils;
import com.example.SSM.be.global.exception.BusinessLogicException;
import com.example.SSM.be.global.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@Slf4j
@Transactional
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils authorityUtils;

    public Member createMember(Member member){
        verifyNotExist(member.getEmail());
        String password = passwordEncoder.encode(member.getPassword());
        member.setPassword(password);
        member.setMemberStatus(Member.MemberStatus.MEMBER_ACTIVE);
        List<String> roles = authorityUtils.createRoles(member.getEmail());
        member.setRoles(roles);
        return memberRepository.save(member);
    }

    public Member createMemberOAuth2(Member member) {
        List<String> roles = authorityUtils.createRoles(member.getEmail());
        member.setRoles(roles);
        String newName = verifyExistName(member.getName());
        member.setName(newName);
        return memberRepository.save(member);
    }
    // Todo
    public Member createMemberOAuth2withAdditionalInfo(Member member){
        return null;
    }
    public Member findMemberByEmail(String email) {
        return memberRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("가입되지 않은 아이디 입니다."));
    }
    public void verifyNotExist(String email) {
        if (memberRepository.findByEmail(email).isPresent()) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_EXISTS);
        }
    }
    private String verifyExistName(String name){     // oauth2로 로그인 했을 때 같은 이름이 있을 때 1~1000까지의 랜덤숫자를 붙임
        String newName = name;
        Optional<Member> optionalMember = memberRepository.findByName(name);
        if(optionalMember.isPresent()){
            Random random = new Random();
            int randomNumber = random.nextInt(10000) + 1;
            newName = name + randomNumber;
        }

        return newName;
    }
    public Boolean existsByEmail(String email) {
        return memberRepository.existsByEmail(email);
    }
    public Member findVerifiedMember(String email) {
        Optional<Member> optionalMember =  memberRepository.findByEmail(email);
        Member findMember = optionalMember.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));


        return findMember;
    }
    public Member findVerifiedMember(long memberId) {
        Optional<Member> optionalMember =  memberRepository.findByUserId(memberId);
        Member findMember = optionalMember.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));


        return findMember;
    }



    public String delegateAccessToken(Member member) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("memberId", member.getUserId());
        claims.put("roles", member.getRoles());


        String subject = member.getEmail();
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey();
        String accessToken = jwtTokenizer.generateAccessToken(claims, subject, expiration, base64EncodedSecretKey);

        return accessToken;
    }

    public String delegateRefreshToken(Member member) {


        String subject = member.getEmail();
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getRefreshTokenExpirationMinutes());
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey();

        String refreshToken = jwtTokenizer.generateRefreshToken(subject, expiration, base64EncodedSecretKey);

        return refreshToken;
    }
    public void deleteMember(Long UserId, Long MemberId) {
        // 사용자가 있는지 확인
        Member member =findVerifiedMember(UserId);
        if(member.getUserId() != MemberId)
            throw new BusinessLogicException(ExceptionCode.DIFFERENT_MEMBER);
        memberRepository.delete(member);
        // 해당 상품이 장바구니에 있는지 확인
    }
}


