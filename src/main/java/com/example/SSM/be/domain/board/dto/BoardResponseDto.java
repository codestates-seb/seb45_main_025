package com.example.SSM.be.domain.board.dto;


import com.example.SSM.be.domain.board.audit.Auditable;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.util.List;


@Getter
@Setter
@EntityListeners(AuditingEntityListener.class)
public class BoardResponseDto extends Auditable {
    private long boardId;
    private String title;
    private String content;
    private String author;
    private long view;
    private int fileAttached;
    private List<String> originalFileName;
    private List<String> saveFileName;
    int result;
}