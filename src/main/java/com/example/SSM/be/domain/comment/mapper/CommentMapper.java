package com.example.SSM.be.domain.comment.mapper;

import com.example.SSM.be.domain.board.entity.Board;
import com.example.SSM.be.domain.comment.dto.CommentDto;
import com.example.SSM.be.domain.comment.dto.CommentResponseDto;
import com.example.SSM.be.domain.comment.entity.Comment;
import com.example.SSM.be.domain.member.entity.Member;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CommentMapper {

     default Comment commentDtoToComment(Board board, CommentDto postDto, Member member){
        Comment comment = new Comment();
        comment.setContent(postDto.getContent());
        comment.setAuthor(member.getName());
        comment.setBoard(board);
        return comment;
    }

    default CommentResponseDto commentToCommentResponseDto(Comment comment){
         CommentResponseDto commentResponseDto = new CommentResponseDto();
         commentResponseDto.setCommentId(comment.getCommentId());
         commentResponseDto.setName(comment.getAuthor());
         commentResponseDto.setContent(comment.getContent());
         commentResponseDto.setCreateAt(comment.getCreatedAt());
         return commentResponseDto;
    }
}
