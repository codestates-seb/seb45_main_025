package com.example.SSM.be.domain.comment.controller;


import com.example.SSM.be.domain.board.entity.Board;
import com.example.SSM.be.domain.board.repository.BoardRepository;
import com.example.SSM.be.domain.comment.dto.CommentDto;
import com.example.SSM.be.domain.comment.dto.CommentResponseDto;
import com.example.SSM.be.domain.comment.entity.Comment;
import com.example.SSM.be.domain.comment.mapper.CommentMapper;
import com.example.SSM.be.domain.comment.repository.CommentRepository;
import com.example.SSM.be.domain.comment.service.CommentService;
import com.example.SSM.be.domain.member.entity.Member;
import com.example.SSM.be.domain.member.service.MemberService;

import com.example.SSM.be.domain.security.token.service.TokenService;
import com.example.SSM.be.global.exception.BusinessLogicException;
import com.example.SSM.be.global.exception.ExceptionCode;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/board")
@RequiredArgsConstructor
@Slf4j
public class CommentController {

    private final TokenService tokenService;
    private final MemberService memberService;
    private final CommentMapper commentMapper;
    private final BoardRepository boardRepository;
    private final CommentService commentService;
    private final CommentRepository commentRepository;

    //댓글 생성하기
    @PostMapping("/{board-id}/comment")
    public ResponseEntity postComment(@PathVariable("board-id") long boardId,
                                      @RequestBody CommentDto postDto,
                                      @RequestHeader("Authorization")String authorizationHeader){

        Jws<Claims> claims = tokenService.checkAccessToken(authorizationHeader);
        String email = claims.getBody().getSubject();
        Member member = memberService.findMemberByEmail(email);
        if (member == null || member.getEmail().isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("유효하지 않은 사용자입니다.");
        }
        Authentication authentication = new UsernamePasswordAuthenticationToken(
                member.getEmail(),
                null,
                AuthorityUtils.createAuthorityList("ROLE_USER")
        );
        Board board = new Board();
        Optional<Board> optionalBoard = boardRepository.findById(boardId);
        Comment comment = new Comment();
        if(optionalBoard.isPresent()){
            board = optionalBoard.get();
            comment = commentService.createComment(member,board,postDto);
        }else{
            new BusinessLogicException(ExceptionCode.POST_NOT_FOUND);
        }
        return new ResponseEntity(comment.getBoard().getMember().getName(),HttpStatus.OK);

    }
    //댓글 수정하기
    @PatchMapping("{board-id}/comment/{comment-id}")
    public ResponseEntity updateComment(@PathVariable("board-id") long boardId,
                                        @PathVariable("comment-id") long commentId,
                                        @RequestBody CommentDto patchDto,
                                        @RequestHeader("Authorization") String authorizationHeader){
        Jws<Claims> claims = tokenService.checkAccessToken(authorizationHeader);
        String email = claims.getBody().getSubject();
        Member member = memberService.findMemberByEmail(email);
        if (member == null || member.getEmail().isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("유효하지 않은 사용자입니다.");
        }
        Authentication authentication = new UsernamePasswordAuthenticationToken(
                member.getEmail(),
                null,
                AuthorityUtils.createAuthorityList("ROLE_USER")
        );
        commentService.updateComment(member,commentId,patchDto);
        return new ResponseEntity(HttpStatus.OK);

    }
    //댓글 가져오기
    @GetMapping("/{board-id}/comment")
    public ResponseEntity getCommentList(@PathVariable("board-id") long boardId,
                                         @RequestHeader ("Authorization") String authorizationHeader){
        Jws<Claims> claims = tokenService.checkAccessToken(authorizationHeader);
        String email = claims.getBody().getSubject();
        Member member = memberService.findMemberByEmail(email);
        if (member == null || member.getEmail().isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("유효하지 않은 사용자입니다.");
        }
        Authentication authentication = new UsernamePasswordAuthenticationToken(
                member.getEmail(),
                null,
                AuthorityUtils.createAuthorityList("ROLE_USER")
        );

        List<CommentResponseDto> response = commentService.getCommentList(boardId);
        return new ResponseEntity<>(response,HttpStatus.OK);
    }

    //댓글 삭제하기
    @DeleteMapping("/{board-id}/comment/{comment-id}")
    public void deleteComment(@PathVariable("comment-id")long commentId,@RequestHeader("Authorization") String authorizationHeader){
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

        commentService.delete(member, commentId);
    }

}
