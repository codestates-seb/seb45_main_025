package com.example.SSM.be.domain.board.dto;


import com.example.SSM.be.domain.board.entity.Board;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.EntityListeners;
import java.time.LocalDateTime;

@Getter
@EntityListeners(AuditingEntityListener.class)
@Data
public class BoardResponseListDto  {
    private String title;
    private String content;
    private String author;
    private Long view;
    private LocalDateTime createAt;
    private long countComment;

    public BoardResponseListDto(Board board){
        this.title = board.getTitle();
        this.content = board.getContent();
        this.author = board.getMember().getNickName();
        this.view = board.getView();
        this.createAt = board.getCreatedAt();
        this.countComment = board.getComments().size();
    }

}
