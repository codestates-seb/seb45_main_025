package com.example.SSM.be.domain.comment.service;

import com.example.SSM.be.domain.board.entity.Board;
import com.example.SSM.be.domain.board.repository.BoardRepository;
import com.example.SSM.be.domain.board.service.BoardService;
import com.example.SSM.be.domain.comment.dto.CommentDto;
import com.example.SSM.be.domain.comment.dto.CommentResponseDto;
import com.example.SSM.be.domain.comment.entity.Comment;
import com.example.SSM.be.domain.comment.mapper.CommentMapper;
import com.example.SSM.be.domain.comment.repository.CommentRepository;
import com.example.SSM.be.domain.member.entity.Member;
import com.example.SSM.be.global.exception.BusinessLogicException;
import com.example.SSM.be.global.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class CommentService {

    private final CommentRepository commentRepository;
    private final BoardRepository boardRepository;
    private final CommentMapper commentMapper;

    //댓글 생성
    public Comment createComment(Member member, Board board, CommentDto postDto){
        Comment comment = new Comment();
        comment.setMember(member);
        comment.setBoard(board);
        comment.setContent(postDto.getContent());
        return commentRepository.save(comment);
//        Board findBoard = boardRepository.findById(board.getBoardId()).get();
//        findBoard.setCommentCount(findBoard.getComments().size());
//        boardRepository.save(findBoard);

    }

    //댓글 수정
    @Transactional
    public void updateComment(Member member, long commentId, CommentDto patchDto){
        Optional<Comment> optionalComment = commentRepository.findById(commentId);
        if(optionalComment.isPresent()){
            if(optionalComment.get().getMember().getEmail().equals(member.getEmail())){
                Comment comment = optionalComment.get();
                comment.setContent(patchDto.getContent());
                commentRepository.save(comment);
            }else{
                throw new BusinessLogicException(ExceptionCode.NOT_MATCH_USER);
            }
        }else{
            throw new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND);
        }
    }
    //댓글 가져오기
    public List<CommentResponseDto> getCommentList(long boardId){
        Optional<Board> optionalBoard = boardRepository.findById(boardId);
        if(optionalBoard.isPresent()){
            List<Comment> commentList = commentRepository.findCommentByBoardIdOrderByCreatedAtAsc(boardId);
            List<CommentResponseDto> responseDto = new ArrayList<>();
            for(Comment comment : commentList){
                responseDto.add(commentMapper.commentToCommentResponseDto(comment));
            }

            return responseDto;
        }
        throw new BusinessLogicException(ExceptionCode.POST_NOT_FOUND);
    }

    //댓글 삭제하기
    public void delete(Member member, long boardId, long commentId){
        Optional<Comment> optionalComment = commentRepository.findById(commentId);
        if(optionalComment.isPresent()){
            Comment comment = optionalComment.get();
            if(comment.getMember().getEmail().equals(member.getEmail())){
                commentRepository.deleteById(commentId);
                Optional<Board> optionalBoard = boardRepository.findById(boardId);
                if(optionalBoard.isPresent()){
                    Board findBoard = optionalBoard.get();
                    findBoard.setCommentCount(findBoard.getComments().size());
                    boardRepository.save(findBoard);
                }else{
                    throw new BusinessLogicException(ExceptionCode.POST_NOT_FOUND);
                }
            }else{
                throw new BusinessLogicException(ExceptionCode.NOT_MATCH_USER);
            }
        }else if(!optionalComment.isPresent()){
            throw new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND);
        }
    }
}