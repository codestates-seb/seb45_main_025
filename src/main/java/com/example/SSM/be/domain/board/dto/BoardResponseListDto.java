package com.example.SSM.be.domain.board.dto;


import com.example.SSM.be.domain.board.entity.Board;
import lombok.Data;
import lombok.Getter;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.EntityListeners;
import java.time.LocalDateTime;

@Getter
@EntityListeners(AuditingEntityListener.class)
@Data
public class BoardResponseListDto  {
    private String title;
    private String content;
    private String writer;
    private Long view;
    private LocalDateTime createAt;
    private long countComment;

    public BoardResponseListDto(Board board){
        this.title = board.getTitle();
        this.content = board.getContent();
        this.writer = board.getMember().getEmail();
        this.view = board.getView();
        this.createAt = board.getCreatedAt();
        this.countComment = board.getComments().size();
    }

}