package com.example.SSM.be.domain.board.controller;


import com.example.SSM.be.domain.board.dto.BoardPatchDto;
import com.example.SSM.be.domain.board.dto.BoardPostDto;
import com.example.SSM.be.domain.board.dto.BoardResponseDto;
import com.example.SSM.be.domain.board.dto.BoardResponseListDto;
import com.example.SSM.be.domain.board.entity.Board;
import com.example.SSM.be.domain.board.repository.BoardRepository;
import com.example.SSM.be.domain.board.service.BoardService;
import com.example.SSM.be.domain.member.entity.Member;
import com.example.SSM.be.domain.member.service.MemberService;
import com.example.SSM.be.domain.security.token.service.TokenService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Calendar;
import java.util.Date;

@RestController
@RequestMapping("/board")
@RequiredArgsConstructor
public class BoardController {
    private final BoardService boardService;
    private final BoardRepository boardRepository;
    private final TokenService tokenService;
    private final MemberService memberService;
    private final int time = 10 ;

    //    게시글 생성하기


    @PostMapping
    public ResponseEntity postBoard(@ModelAttribute BoardPostDto postDto,@RequestHeader("Authorization")String authorizationHeader) throws IOException {
        Jws<Claims> claims = tokenService.checkAccessToken(authorizationHeader);
        String email = claims.getBody().getSubject();
        Member findMember = memberService.findMemberByEmail(email);
        Member saveMember = boardService.createBoard(findMember, postDto);
        return new ResponseEntity(saveMember.getNickName(),HttpStatus.OK);
    }
    //특정 게시글 상세보기 작동확인
    @GetMapping("/{board_id}")
    public ResponseEntity getBoard(@PathVariable("board_id")long boardId, HttpServletRequest request, HttpServletResponse response){
        BoardResponseDto responseBoardDto = new BoardResponseDto();
        Cookie[] cookies = request.getCookies();
        boolean isAlreadyViewed = false;
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("viewed_" + boardId)) {
                    isAlreadyViewed = true;
                    break;
                }
            } //0    -> 1
        }
        if (!isAlreadyViewed) {
            responseBoardDto = boardService.findById(boardId, isAlreadyViewed); // 조회수 증가
            Calendar calendar = Calendar.getInstance();
            calendar.setTime(new Date());
            calendar.add(Calendar.MINUTE, time);
            Date expirationDate = calendar.getTime();
            int maxAgeInSeconds = (int) (expirationDate.getTime() - System.currentTimeMillis()) / 1000;
            // 쿠키 생성 및 설정 (게시글 ID를 쿠키에 저장)
//            Cookie cookie = new Cookie("viewed_" + boardId, "true");
//            cookie.setMaxAge(maxAgeInSeconds);
//            cookie.setPath("/");
//            response.addCookie(cookie);
            ResponseCookie ViewedCookie= ResponseCookie.from("viewed_" + boardId, "true")
                    .sameSite("None")
                    .secure(true)
                    .httpOnly(true)
                    .maxAge(60 * 10) // 10분
                    .path("/")
                    .build();
            response.addHeader("Set-Cookie", ViewedCookie.toString());
        }else if(isAlreadyViewed){
            responseBoardDto = boardService.findById(boardId, isAlreadyViewed);

        }
        return new ResponseEntity(responseBoardDto,HttpStatus.OK);
    }
    //게시글 가져오기 + 게시글 검색기능
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping("/posts")
    @Transactional
    public Page<BoardResponseListDto> searchAndSortBoard(
            @RequestParam(required = false, value = "search") String search,
            @RequestParam(defaultValue = "1") int page,
            @PageableDefault(size = 10, sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable,
            @RequestParam(name = "sortType", defaultValue = "latest") String sortType) {


        int adjustedPage = page - 1;
        Page<Board> boardList;

        if (search != null && !search.isEmpty()) {
            boardList = boardRepository.findByTitleContains(search, pageable);
        } else {
            boardList = boardRepository.findAll(pageable);
        }
        //최신순g
        if ("latest".equals(sortType)) {
            if(search != null && !search.isEmpty()){
                boardList = boardRepository.findByTitleContains(search, PageRequest.of(adjustedPage, pageable.getPageSize(), Sort.by("createdAt").descending()));
            }else{
                Pageable pageAble = PageRequest.of(adjustedPage, pageable.getPageSize(), Sort.by("createdAt").descending());
                boardList = boardRepository.findAll(pageAble);
            }
        //과거순
        } else if ("oldest".equals(sortType)) {
            if(search != null && !search.isEmpty()) {
                boardList = boardRepository.findByTitleContains(search, PageRequest.of(adjustedPage, pageable.getPageSize(), Sort.by("createdAt").ascending()));
            }else{
                Pageable pageAble = PageRequest.of(adjustedPage, pageable.getPageSize(), Sort.by("createdAt").ascending());
                boardList = boardRepository.findAll(pageAble);
            }
        //조회수 순
        } else if ("popular".equals(sortType)) {
            if(search != null && !search.isEmpty()) {
                boardList = boardRepository.findByTitleContains(search, PageRequest.of(adjustedPage, pageable.getPageSize(), Sort.by("view").descending()));
            }else{
                Pageable pageAble = PageRequest.of(adjustedPage, pageable.getPageSize(), Sort.by("view").descending());
                boardList = boardRepository.findAll(pageAble);
            }
        //댓글 순
        } else if ("mostCommented".equals(sortType)) {
            if(search != null && !search.isEmpty()) {
                boardList = boardRepository.findByTitleContains(search, PageRequest.of(adjustedPage, pageable.getPageSize(), Sort.by("comment_count").descending()));
            }else{
                Pageable pageAble = PageRequest.of(adjustedPage, pageable.getPageSize(), Sort.by("comment_count").descending());
                boardList = boardRepository.findAll(pageAble);
            }
        }
        Page<BoardResponseListDto> response = boardList.map(BoardResponseListDto::new);
        return response;
    }
    //게시글 업데이트
    @PatchMapping("{board-id}/update")
    public ResponseEntity<String> updateBoard(@PathVariable("board-id")long boardId, @ModelAttribute BoardPatchDto patchDto,
                                              @RequestHeader("Authorization")String authorizationHeader)throws IOException{

        Jws<Claims> claims = tokenService.checkAccessToken(authorizationHeader);
        String email = claims.getBody().getSubject();
        Member findMember = memberService.findMemberByEmail(email);
        Board saveBoard = boardService.updateBoard(findMember,boardId,patchDto);
        return new ResponseEntity("게시물이 업데이트 되었습니다.",HttpStatus.OK);
    }


    //게시글 삭제
    @DeleteMapping("{board-id}/delete")
    public ResponseEntity deleteBoard(@PathVariable("board-id")long boardId, @RequestHeader("Authorization")String authorizationHeader){
        Jws<Claims> claims = tokenService.checkAccessToken(authorizationHeader);
        String email = claims.getBody().getSubject();
        Member findMember = memberService.findMemberByEmail(email);

        boardService.deleteBoard(findMember, boardId);
        return new ResponseEntity("게시물이 삭제되었습니다.",HttpStatus.OK);
    }

}
