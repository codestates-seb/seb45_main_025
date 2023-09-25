package com.example.SSM.be.domain.board.entity;

import com.example.SSM.be.domain.board.audit.Auditable;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table(name = "board_file")
@EntityListeners(AuditingEntityListener.class)
public class Image extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long imageId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "board_id")
    @JsonIgnore // 이미지 엔티티가 게시글 엔티티의 변경 상태를 무시하지 않도록 설정
    private Board board;

    @Column
    private String originalFileName;

    @Column
    private String saveFileName;


}