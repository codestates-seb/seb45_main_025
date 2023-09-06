package com.example.SSM.be.domain.board.controller;


import com.example.SSM.be.domain.board.dto.BoardPatchDto;
import com.example.SSM.be.domain.board.dto.BoardPostDto;
import com.example.SSM.be.domain.board.dto.BoardResponseDto;
import com.example.SSM.be.domain.board.dto.BoardResponseListDto;
import com.example.SSM.be.domain.board.entity.Board;
import com.example.SSM.be.domain.board.mapper.BoardMapper;
import com.example.SSM.be.domain.board.repository.BoardRepository;
import com.example.SSM.be.domain.board.service.BoardService;
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
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.AuthorityUtils;
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
    private final BoardMapper boardMapper;
    private final BoardService boardService;
    private final BoardRepository boardRepository;
    private final TokenService tokenService;
    private final MemberService memberService;

//    게시글 생성하기 작동확인
    @PostMapping

    public ResponseEntity postBoard(@ModelAttribute BoardPostDto postDto,@RequestHeader("Authorization")String authorizationHeader) throws IOException {
        Jws<Claims> claims = tokenService.checkAccessToken(authorizationHeader);
        String email = claims.getBody().getSubject();
        Member member = memberService.findMemberByEmail(email);
        if (member == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("유효하지 않은 사용자입니다.");
        }
        Authentication authentication = new UsernamePasswordAuthenticationToken(
                member.getEmail(),
                null,
                AuthorityUtils.createAuthorityList("ROLE_USER")
        );
        Member saveMember = boardService.createBoard(member, postDto);
        return new ResponseEntity(saveMember.getEmail(),HttpStatus.OK);
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
            calendar.add(Calendar.MINUTE, 1);
            Date expirationDate = calendar.getTime();
            int maxAgeInSeconds = (int) (expirationDate.getTime() - System.currentTimeMillis()) / 1000;
            // 쿠키 생성 및 설정 (게시글 ID를 쿠키에 저장)
            Cookie cookie = new Cookie("viewed_" + boardId, "true");
            cookie.setMaxAge(maxAgeInSeconds);
            cookie.setPath("/");
            response.addCookie(cookie);
        }else if(isAlreadyViewed){
            responseBoardDto = boardService.findById(boardId, isAlreadyViewed);

        }
        return new ResponseEntity(responseBoardDto,HttpStatus.OK);
    }
    //게시글 가져오기 + 게시글 검색기능
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping("/posts")
    public Page<BoardResponseListDto> searchBoard(@RequestParam(required = false,value = "search") String search,
                                                  @RequestParam(defaultValue = "1") int page, @PageableDefault(size = 2, sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable){

        int adjustedPage = page - 1;
        Pageable adjustedPageable = PageRequest.of(adjustedPage, pageable.getPageSize(),pageable.getSort());
        Page<Board> boardList;

        if (search != null && !search.isEmpty()) {
            boardList = boardRepository.findByTitleContains(search, adjustedPageable);
        } else {
            boardList = boardRepository.findAll(adjustedPageable);
        }
        Page<BoardResponseListDto> response = boardList.map(
                board -> new BoardResponseListDto(board));

        return response;
    }
    @PatchMapping("{board-id}/update")
    public ResponseEntity<String> updateBoard(@PathVariable("board-id")long boardId, @ModelAttribute BoardPatchDto patchDto,
                                              @RequestHeader("Authorization")String authorizationHeader)throws IOException{

        Jws<Claims> claims = tokenService.checkAccessToken(authorizationHeader);
        String email = claims.getBody().getSubject();
        Member member = memberService.findMemberByEmail(email);
        if (member == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("유효하지 않은 사용자입니다.");
        }
        Authentication authentication = new UsernamePasswordAuthenticationToken(
                member.getEmail(),
                null,
                AuthorityUtils.createAuthorityList("ROLE_USER")
        );
        Board saveBoard = boardService.updateBoard(member,boardId,patchDto);
        return new ResponseEntity(saveBoard,HttpStatus.OK);
    }
    @DeleteMapping("{board-id}/delete")
    public ResponseEntity deleteBoard(@PathVariable("board-id")long boardId, @RequestHeader("Authorization")String authorizationHeader){
        Jws<Claims> claims = tokenService.checkAccessToken(authorizationHeader);
        String email = claims.getBody().getSubject();
        Member member = memberService.findMemberByEmail(email);
        if (member == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("유효하지 않은 사용자입니다.");
        }
        Authentication authentication = new UsernamePasswordAuthenticationToken(
                member.getEmail(),
                null,
                AuthorityUtils.createAuthorityList("ROLE_USER")
        );

        boardService.deleteBoard(member, boardId);
        return new ResponseEntity(HttpStatus.OK);
    }




}
