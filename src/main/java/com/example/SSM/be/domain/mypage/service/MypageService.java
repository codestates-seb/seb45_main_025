package com.example.SSM.be.domain.mypage.service;
import com.example.SSM.be.domain.member.repository.MemberRepository;
import com.example.SSM.be.domain.member.service.MemberService;
import com.example.SSM.be.domain.mypage.dto.MypageResponseDto;
import com.example.SSM.be.domain.mypage.dto.MypageUpdateDto;
import com.example.SSM.be.domain.mypage.mapper.MypageMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
@RequiredArgsConstructor
public class MypageService {

    private final MypageMapper mypageMapper;
    private final MemberRepository memberRepository;
    private final MemberService memberService;

    public MypageResponseDto updateMyInfo(Member member,MypageUpdateDto updateDto){
        Member findMember = memberService.findMemberByEmail(member.getEmail());
        Optional.ofNullable(updateDto.getName())
                .ifPresent(findMember::setName);
        Optional.ofNullable(updateDto.getNi())
                .ifPresent(findMember::setName);
        Optional.ofNullable(updateDto.getName())
                .ifPresent(findMember::setName);
        Optional.ofNullable(updateDto.getName())
                .ifPresent(findMember::setName);
        v




    }
}
