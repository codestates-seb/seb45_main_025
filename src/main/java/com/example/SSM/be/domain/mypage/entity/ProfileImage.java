//package com.example.SSM.be.domain.mypage.entity;
//
//import com.example.SSM.be.domain.member.entity.Member;
//import lombok.AllArgsConstructor;
//import lombok.Getter;
//import lombok.NoArgsConstructor;
//import lombok.Setter;
//
//import javax.persistence.*;
//
//
//@Setter
//@Getter
//@NoArgsConstructor
//@AllArgsConstructor
//@Entity
//public class ProfileImage {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private long profileImageId;
//
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "member_id")
//    private Member member;
//
//    @Column
//    private String originalFileName;
//
//    @Column
//    private String saveFileName;
//
//    @Column
//    private int fileAttached;
//
//}
