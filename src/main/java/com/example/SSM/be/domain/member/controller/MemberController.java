package com.example.SSM.be.domain.member.controller;

import com.example.SSM.be.domain.member.dto.AuthAdditionalDto;
import com.example.SSM.be.domain.member.dto.MemberDto;
import com.example.SSM.be.domain.member.entity.Member;
import com.example.SSM.be.domain.member.mapper.MemberMapper;
import com.example.SSM.be.domain.member.service.MemberService;
import com.example.SSM.be.domain.security.auth.service.TokenService;
import com.example.SSM.be.domain.security.tokenblacklist.service.BlacklistTokenService;
import com.example.SSM.be.global.utils.UriCreator;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;

@RestController
@RequestMapping("/users")
@Validated
@RequiredArgsConstructor
@Slf4j
public class MemberController {
    private final static String MEMBER_DEFAULT_URL = "/users";
    private final MemberMapper membermapper;
    private final MemberService memberService;
    private final BlacklistTokenService blacklistTokenService;
    private final TokenService tokenService;

    @PostMapping("/signup")
    public ResponseEntity postMember(@Valid @RequestBody MemberDto.PostDto postDto) {
        if (!postDto.getPassword().equals(postDto.getConformPassword())) {
            return new ResponseEntity("비밀번호와 비밀번호 확인이 서로 맞지 않습니다", HttpStatus.FORBIDDEN);
        }
        Member member = membermapper.memberPostDtoToMember(postDto);
        Member saveMember = memberService.createMember(member);

        URI location = UriCreator.createUri(MEMBER_DEFAULT_URL, saveMember.getUserId());
        return new ResponseEntity(location, HttpStatus.CREATED);
    }
    @PostMapping("/oauth/signup")
    public ResponseEntity postGoogle(@Valid @RequestBody AuthAdditionalDto additionalDto){
        Member member = membermapper.AuthAdditionalDtoToMember(additionalDto);
        Member saveMember = memberService.createMemberOAuth2withAdditionalInfo(member);

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
    @DeleteMapping("/delete/{member-id}")    //Member 삭제
    public ResponseEntity deleteMember(HttpServletRequest request
                                       ,@PathVariable("member-id") @Positive long memberId){
        String authorizationHeader = request.getHeader("Authorization");
        Jws<Claims> claims = tokenService.checkAccessToken(authorizationHeader);
        String email = claims.getBody().getSubject();
        Member member = memberService.findVerifiedMember(email);
        if (member == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("유효하지 않은 사용자입니다.");
        }
        Authentication authentication = new UsernamePasswordAuthenticationToken(
                member.getEmail(),
                null,
                AuthorityUtils.createAuthorityList("ROLE_USER")
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        memberService.deleteMember(member.getUserId(),memberId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
//
}
