package com.example.SSM.be.domain.board.repository;

import com.example.SSM.be.domain.board.entity.Board;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
public interface BoardRepository extends JpaRepository<Board,Long> {

    Page<Board> findAll(Pageable pageable);
    Page<Board> findByTitleContains(String name, Pageable pageable);

//    @Transactional
//    @Modifying
//    @Query("update Board b set b.view = b.view + 1 where b.id = :id")
//    int updateView(Long id);
}
