package com.example.SSM.be.domain.board.repository;

import com.example.SSM.be.domain.board.entity.Image;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImageRepository extends JpaRepository<Image,Long> {

}