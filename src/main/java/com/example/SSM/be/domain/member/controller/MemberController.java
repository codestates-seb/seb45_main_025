package com.example.SSM.be.domain.member.controller;

import com.example.SSM.be.domain.cart.service.CartService;
import com.example.SSM.be.domain.member.dto.AuthAdditionalDto;
import com.example.SSM.be.domain.member.dto.MemberDto;
import com.example.SSM.be.domain.member.entity.Member;
import com.example.SSM.be.domain.member.mapper.MemberMapper;
import com.example.SSM.be.domain.member.service.MemberService;
import com.example.SSM.be.domain.security.token.service.TokenService;
import com.example.SSM.be.domain.security.tokenblacklist.service.BlacklistTokenService;
import com.example.SSM.be.global.response.SingleResponseDto;
import com.example.SSM.be.global.utils.UriCreator;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

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
    private final CartService cartService;

    @PostMapping("/signup")
    public ResponseEntity postMember(@Valid @RequestBody MemberDto.PostDto postDto) {
        if (memberService.validatePassword(postDto.getPassword(),postDto.getConformPassword())) {
            return new ResponseEntity<>(
                    new SingleResponseDto<>("비밀번호와 비밀번호 확인이 서로 맞지 않습니다"), HttpStatus.FORBIDDEN);
        }
        Member member = membermapper.memberPostDtoToMember(postDto);
        Member saveMember = memberService.createMember(member);

        URI location = UriCreator.createUri(MEMBER_DEFAULT_URL, saveMember.getUserId());
        return new ResponseEntity<>(
                new SingleResponseDto<>(location), HttpStatus.CREATED);
    }
    @PostMapping("/oauth/google/signup")
    public ResponseEntity postGoogle(//HttpServletRequest request,
                                     @CookieValue(name = "access_token", required = true) String authorizationCookie,
                                     @Valid @RequestBody AuthAdditionalDto additionalDto){
        //String authorizationHeader = request.getHeader("Authorization");
        Jws<Claims> claims = tokenService.checkAccessToken(authorizationCookie);
        Member addmember = membermapper.AuthAdditionalDtoToMember(additionalDto);
        Member saveMember = memberService.createMemberOAuth2withAdditionalInfo(claims,addmember);

        URI location = UriCreator.createUri(MEMBER_DEFAULT_URL, saveMember.getUserId());
        return new ResponseEntity<>(
                new SingleResponseDto<>(location), HttpStatus.CREATED);
    }
    @GetMapping("/info")
    public ResponseEntity getMemberInfo(//HttpServletRequest request,
                                        @CookieValue(name = "access_token", required = true) String authorizationCookie){
        Member findMember = memberService.getMemberWithAccessToken(authorizationCookie);
        MemberDto.ResponseDto response = membermapper.memberToResponse(findMember);

        return new ResponseEntity<>(
                new SingleResponseDto<>(response), HttpStatus.OK);
    }
    @PatchMapping("/nickname")
    public ResponseEntity updateMemberNickname(//HttpServletRequest request,
                                               @CookieValue(name = "access_token", required = true) String authorizationCookie,
                                               @Valid @RequestBody MemberDto.PatchDto patchDto){
        Member findMember = memberService.getMemberWithAccessToken(authorizationCookie);
        log.info(findMember.getUserId().toString());
        Member forUpdateMember = membermapper.memberPathchDtoToMember(patchDto);
        Member updatedMember = memberService.updateMember(findMember,forUpdateMember);
        MemberDto.ResponseDto response = membermapper.memberToResponse(updatedMember);

        return new ResponseEntity<>(
                new SingleResponseDto<>(response), HttpStatus.OK);

    }
    @PostMapping("/logout")
    public ResponseEntity logout(//HttpServletRequest request,
                                 @CookieValue(name = "access_token", required = true) String authorizationCookie){
        //String authorizationHeader = request.getHeader("Authorization");
        System.out.println("쿠키 이름:" + authorizationCookie);

        //String jws = authorizationHeader.substring(7);    // "Bearer " 이후의 토큰 문자열 추출//블랙리스트에 jws 추가, 접근 막음
        blacklistTokenService.addToBlacklist(authorizationCookie);
        return new ResponseEntity<>(
                new SingleResponseDto<>("로그아웃 성공"), HttpStatus.OK);
    }
    @DeleteMapping("/delete/{member-id}")    //Member 삭제
    public ResponseEntity deleteMember(//HttpServletRequest request,
                                       @CookieValue(name = "access_token", required = true) String authorizationCookie,
                                       @PathVariable("member-id") @Positive long memberId){
        Member member = memberService.getMemberWithAccessToken(authorizationCookie);
        memberService.deleteMember(member.getUserId(),memberId);
        return new ResponseEntity<>(
                new SingleResponseDto<>(member.getUserId()+"번 회원 삭제 성공"), HttpStatus.NO_CONTENT);
    }
//
}
