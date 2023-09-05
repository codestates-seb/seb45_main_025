package com.example.SSM.be.domain.member.repository;

import com.example.SSM.be.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface MemberRepository extends JpaRepository<Member,Long> {
    Optional<Member> findByEmail(String email);

    Boolean existsByEmail(String email);

    Optional<Member> findByName(String name);
}

