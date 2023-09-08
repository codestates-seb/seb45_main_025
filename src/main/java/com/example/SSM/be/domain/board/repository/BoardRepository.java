package com.example.SSM.be.domain.board.repository;

import com.example.SSM.be.domain.board.entity.Board;
import com.example.SSM.be.domain.member.entity.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface BoardRepository extends JpaRepository<Board,Long> {

    Page<Board> findAll(Pageable pageable);
    Page<Board> findByTitleContains(String name, Pageable pageable);
    List<Board> findByMemberEmailOrderByCreatedAtDesc(String email);

}
