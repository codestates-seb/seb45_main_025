package com.example.SSM.be.domain.member.controller;

import com.example.SSM.be.domain.security.auth.dto.LoginDto;
import com.example.SSM.be.domain.member.dto.MemberDto;
import com.example.SSM.be.domain.member.entity.Member;
import com.example.SSM.be.domain.member.mapper.MemberMapper;
import com.example.SSM.be.domain.member.service.MemberService;
import com.example.SSM.be.domain.security.auth.jwt.JwtTokenizer;
import com.example.SSM.be.global.utils.UriCreator;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.net.URI;

@RestController
@RequestMapping("/users")
@Validated
@Slf4j
public class MemberController {
    private final static String MEMBER_DEFAULT_URL = "/users";
    private final MemberMapper membermapper;
    private final MemberService memberService;

    public MemberController(MemberMapper mapper, MemberService service, JwtTokenizer jwtTokenizer) {
        this.membermapper = mapper;
        this.memberService = service;
    }
    @PostMapping("/signup")
    public ResponseEntity postMember(@Valid @RequestBody MemberDto.PostDto postDto){


        Member member = membermapper.memberPostDtoToMember(postDto);
        Member saveMember = memberService.createMember(member);

        URI location = UriCreator.createUri(MEMBER_DEFAULT_URL, saveMember.getUserId());
        return new ResponseEntity(location, HttpStatus.CREATED);
    }

//    @PostMapping("/auth/login")
//    public ResponseEntity loginMember(@RequestBody LoginDto loginDto) {
//        String jwtToken = memberService.loginMember(membermapper.memberloginDtoToMember(loginDto));
//        HttpHeaders headers = new HttpHeaders();
//        headers.add("Authorization", "Bearer " + jwtToken);
//
//        return ResponseEntity.ok()
//                .body("Bearer " + jwtToken);
//    }
}
