package com.example.SSM.be.domain.mypage.controller;

import com.example.SSM.be.domain.member.entity.Member;
import com.example.SSM.be.domain.member.service.MemberService;
import com.example.SSM.be.domain.mypage.dto.ImagePostDto;
import com.example.SSM.be.domain.mypage.dto.MypageResponseDto;
import com.example.SSM.be.domain.mypage.service.MypageService;
import com.example.SSM.be.domain.security.auth.service.TokenService;
import com.example.SSM.be.global.exception.BusinessLogicException;
import com.example.SSM.be.global.exception.ExceptionCode;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RequestMapping("/mypage")
@RestController
@RequiredArgsConstructor
public class MypageController {

    private final TokenService tokenService;
    private final MemberService memberService;
    private final MypageService mypageService;

    @GetMapping
    public ResponseEntity getMypage(@RequestHeader("Authorization") String authorizationHeader){
        Jws<Claims> claims = tokenService.checkAccessToken(authorizationHeader);
        String email = claims.getBody().getSubject();
        Member member = memberService.findMemberByEmail(email);
        if (member == null || member.getEmail().isEmpty()) {
            throw new BusinessLogicException(ExceptionCode.NOT_MATCH_USER);
        }
        Authentication authentication = new UsernamePasswordAuthenticationToken(
                member.getEmail(),
                null,
                AuthorityUtils.createAuthorityList("ROLE_USER")
        );
        MypageResponseDto mypage = new MypageResponseDto();
        mypage.setEmail(member.getEmail());
        mypage.setSaveFileName(member.getProfileImage().getSaveFileName());
        mypage.setGender(member.getGender());
        mypage.setBirth(member.getBirth());
        mypage.setAddress(member.getAddress());
        return new ResponseEntity(mypage, HttpStatus.OK);
    }

    @PostMapping("/image")
    public String addMyImage(@ModelAttribute ImagePostDto image, @RequestHeader("Authorization")String authorizationHeader) throws IOException{
        Jws<Claims> claims = tokenService.checkAccessToken(authorizationHeader);
        String email = claims.getBody().getSubject();
        Member member = memberService.findMemberByEmail(email);
        if (member == null || member.getEmail().isEmpty()) {
            throw new BusinessLogicException(ExceptionCode.NOT_MATCH_USER);
        }
        Authentication authentication = new UsernamePasswordAuthenticationToken(
                member.getEmail(),
                null,
                AuthorityUtils.createAuthorityList("ROLE_USER")
        );
        Member saveMember = mypageService.createImage(member,image);
        return "변경완료";


    }


}
