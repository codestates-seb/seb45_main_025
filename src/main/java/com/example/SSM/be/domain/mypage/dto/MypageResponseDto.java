package com.example.SSM.be.domain.mypage.dto;

import com.example.SSM.be.domain.member.entity.Member;
import com.example.SSM.be.domain.mypage.entity.ProfileImage;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class MypageResponseDto {

    private String email;
    private String name;
    private String gender;
    private String phone;
    private String birth;
    private String address;
    private String img;
    private Long point;
    private int fileAttached;
    private String originalFileName;
    private String saveFileName;
}
