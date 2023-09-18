package com.example.SSM.be.domain.comment.repository;

import com.example.SSM.be.domain.comment.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment,Long> {

    @Query(value = "SELECT * FROM comment WHERE board_id = :boardId ORDER BY CREATED_AT DESC", nativeQuery = true)
    List<Comment> findCommentByBoardIdOrderByCreatedAtAsc(@Param("boardId") long boardId);

}