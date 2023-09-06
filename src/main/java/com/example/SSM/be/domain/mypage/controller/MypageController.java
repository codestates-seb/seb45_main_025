package com.example.SSM.be.domain.mypage.controller;

import com.example.SSM.be.domain.member.service.MemberService;
import com.example.SSM.be.domain.mypage.dto.MypageResponseDto;

import com.example.SSM.be.domain.mypage.dto.MypageUpdateDto;
import com.example.SSM.be.domain.mypage.mapper.MypageMapper;
import com.example.SSM.be.domain.mypage.service.MypageService;
import com.example.SSM.be.domain.security.token.service.TokenService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/mypage")
@RestController
@RequiredArgsConstructor
public class MypageController {

    private final TokenService tokenService;
    private final MemberService memberService;
    private final MypageService mypageService;
    private final MypageMapper mypageMapper;
    //<마이페이지>
    @GetMapping
    private ResponseEntity getMyInfo(@RequestHeader("Authorization") String authorizationHeader){
        Jws<Claims> claims = tokenService.checkAccessToken(authorizationHeader);
        String email = claims.getBody().getSubject();
        Member findMember = memberService.findMemberByEmail(email);
        MypageResponseDto responseDto = mypageMapper.memberToMypageResponseDto(findMember);
        return new ResponseEntity<>(responseDto,HttpStatus.OK);
    }

    @PatchMapping
    private ResponseEntity updateMyInfo(@RequestBody MypageUpdateDto updateDto,
                                        @RequestHeader("Authorization") String authorizationHeader){
        Jws<Claims> claims = tokenService.checkAccessToken(authorizationHeader);
        String email = claims.getBody().getSubject();
        Member findMember = memberService.findMemberByEmail(email);


    }
}
