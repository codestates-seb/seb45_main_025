package com.example.SSM.be.domain.member.service;

import com.example.SSM.be.domain.member.entity.Member;
import com.example.SSM.be.domain.member.repository.MemberRepository;
import com.example.SSM.be.global.exception.BusinessLogicException;
import com.example.SSM.be.global.exception.ExceptionCode;
import com.example.SSM.be.domain.auth.jwt.JwtTokenizer;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class MemberService {
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenizer jwtTokenizer;
    public MemberService(MemberRepository memberRepository, PasswordEncoder passwordEncoder, JwtTokenizer jwtTokenizer) {
        this.memberRepository = memberRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtTokenizer = jwtTokenizer;
    }

    public Member createMember(Member member){
        verifyNotExist(member.getEmail());
        String password = passwordEncoder.encode(member.getPassword());
        member.setPassword(password);
        member.setMemberStatus(Member.MemberStatus.MEMBER_ACTIVE);
        member.setRoles(member.getEmail());
        return memberRepository.save(member);
    }

    public String loginMember(Member member) {
        Member existMember = findMemberByEmail(member.getEmail());
        if (existMember.getMemberStatus() == Member.MemberStatus.MEMBER_EXIT ||
                existMember.getMemberStatus() == Member.MemberStatus.MEMBER_SLEEP) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_UNAUTHORIZED);
        }
        if (passwordEncoder.matches(member.getPassword(), existMember.getPassword())) {
            return null;
            //return jwtTokenizer.generateAccessToken(member.getEmail(), member.getRoles());
        } else {
            throw new IllegalArgumentException("잘못된 비밀번호입니다.");
        }
    }

    private Member findMemberByEmail(String email) {
        return memberRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("가입되지 않은 아이디 입니다."));
    }
    private void verifyNotExist(String email) {
        if (memberRepository.findByEmail(email).isPresent()) {
            throw new IllegalArgumentException("이미 가입된 아이디 입니다.");
        }
    }
}
