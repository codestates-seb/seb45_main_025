package com.example.SSM.be.domain.mypage.controller;

import com.example.SSM.be.domain.board.dto.BoardResponseListDto;
import com.example.SSM.be.domain.member.entity.Member;
import com.example.SSM.be.domain.member.service.MemberService;
import com.example.SSM.be.domain.mypage.dto.ImagePostDto;
import com.example.SSM.be.domain.mypage.dto.MypageResponseDto;

import com.example.SSM.be.domain.mypage.dto.MypageUpdateDto;
import com.example.SSM.be.domain.mypage.mapper.MypageMapper;
import com.example.SSM.be.domain.mypage.service.MypageService;
import com.example.SSM.be.domain.security.token.service.TokenService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.http2.HpackDecoder;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.IIOException;
import java.io.IOException;
import java.util.List;

@RequestMapping("/mypage")
@RestController
@RequiredArgsConstructor
@Slf4j
public class MypageController {

    private final TokenService tokenService;
    private final MemberService memberService;
    private final MypageService mypageService;
    private final MypageMapper mypageMapper;
    //마이페이지 읽어오기

    @GetMapping
    private ResponseEntity getMyInfo(@RequestHeader("Authorization") String authorizationHeader){
        Jws<Claims> claims = tokenService.checkAccessToken(authorizationHeader);
        String email = claims.getBody().getSubject();
        Member findMember = memberService.findMemberByEmail(email);
        MypageResponseDto responseDto = mypageMapper.memberToMypageResponseDto(findMember);
        return new ResponseEntity<>(responseDto,HttpStatus.OK);
    }
    //마이페이지 업데이트
    @PatchMapping
    private ResponseEntity updateMyInfo(@RequestBody MypageUpdateDto updateDto,
                                        @RequestHeader("Authorization") String authorizationHeader){
        Jws<Claims> claims = tokenService.checkAccessToken(authorizationHeader);
        String email = claims.getBody().getSubject();
        Member findMember = memberService.findMemberByEmail(email);
        MypageResponseDto responseDto = mypageService.updateMyInfo(findMember,updateDto);

        return new ResponseEntity(responseDto,HttpStatus.OK);
    }
    //프로필 사진 업데이트

    @PatchMapping("/pofileImage")
    public ResponseEntity patchImage(@ModelAttribute ImagePostDto imagePostDto,
                                      @RequestHeader("Authorization") String authorizationHeader)  throws IOException {
        Jws<Claims> claims = tokenService.checkAccessToken(authorizationHeader);
        String email = claims.getBody().getSubject();
        Member findMember = memberService.findMemberByEmail(email);
        MypageResponseDto responseDto = mypageService.uploadImage(findMember,imagePostDto);
        return new ResponseEntity(responseDto,HttpStatus.OK);
    }
    //내가 작성한 게시글 목록불러오기
    @Transactional
    @GetMapping("/board")
    public ResponseEntity getMyBoard(@RequestHeader("Authorization") String authorizationHeader){
        Jws<Claims> claims = tokenService.checkAccessToken(authorizationHeader);
        String email = claims.getBody().getSubject();
        Member findMember = memberService.findMemberByEmail(email);
        List<BoardResponseListDto> responseList = mypageService.getMyBoardList(findMember);

        return new ResponseEntity(responseList, HttpStatus.OK);
    }
}
