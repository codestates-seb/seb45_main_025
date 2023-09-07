package com.example.SSM.be.domain.board.entity;


import com.example.SSM.be.domain.board.audit.Auditable;
import com.example.SSM.be.domain.comment.entity.Comment;
import com.example.SSM.be.domain.member.entity.Member;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.util.List;

@NoArgsConstructor(access = AccessLevel.PUBLIC)
@Entity
@Getter
@Setter
@EntityListeners(AuditingEntityListener.class)
public class Board extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "board_id")
    private long boardId;

    @Column(nullable = false)
    private String title;

    @Column(length = 500, nullable = false)
    @Lob
    private String content;

    @ManyToOne(fetch = FetchType.EAGER, targetEntity = Member.class)
    @JoinColumn(name = "memberId", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Member member;

    @Column(length = 30)
    private String last_Modifier;

    @OneToMany(mappedBy = "board",cascade = CascadeType.REMOVE,orphanRemoval = true,fetch = FetchType.LAZY)
    private List<Comment> comments;

    @Column
    private long view;

    @Column
    private int fileAttached;

    @OneToMany(mappedBy = "board", cascade = CascadeType.PERSIST, orphanRemoval = true)
    private List<Image> imageList;



}

