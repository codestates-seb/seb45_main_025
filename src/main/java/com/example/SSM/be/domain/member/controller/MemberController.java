package com.example.SSM.be.domain.member.controller;

import com.example.SSM.be.domain.member.dto.MemberDto;
import com.example.SSM.be.domain.member.entity.Member;
import com.example.SSM.be.domain.member.mapper.MemberMapper;
import com.example.SSM.be.domain.member.service.MemberService;
import com.example.SSM.be.domain.security.tokenblacklist.service.BlacklistTokenService;
import com.example.SSM.be.domain.security.auth.jwt.JwtTokenizer;
import com.example.SSM.be.global.utils.UriCreator;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
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
    private final BlacklistTokenService blacklistTokenService;

    public MemberController(MemberMapper mapper, MemberService service, JwtTokenizer jwtTokenizer, BlacklistTokenService blacklistTokenService) {
        this.membermapper = mapper;
        this.memberService = service;
        this.blacklistTokenService = blacklistTokenService;
    }
    @PostMapping("/signup")
    public ResponseEntity postMember(@Valid @RequestBody MemberDto.PostDto postDto){
        if (!postDto.getPassword().equals(postDto.getConformPassword())){
            return new ResponseEntity("비밀번호와 비밀번호 확인이 서로 맞지 않습니다",HttpStatus.FORBIDDEN);
        }
        Member member = membermapper.memberPostDtoToMember(postDto);
        Member saveMember = memberService.createMember(member);

        URI location = UriCreator.createUri(MEMBER_DEFAULT_URL, saveMember.getUserId());
        return new ResponseEntity(location, HttpStatus.CREATED);
    }

    @PostMapping("/logout")
    public ResponseEntity logout(HttpServletRequest request) {
        String authorizationHeader = request.getHeader("Authorization");
        String jws = authorizationHeader.substring(7);    // "Bearer " 이후의 토큰 문자열 추출//블랙리스트에 jws 추가, 접근 막음
        blacklistTokenService.addToBlacklist(jws);
        return ResponseEntity.ok().body("로그아웃 성공");
    }

//
}
