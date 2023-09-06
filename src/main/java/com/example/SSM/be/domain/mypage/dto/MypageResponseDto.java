package com.example.SSM.be.domain.mypage.dto;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MypageResponseDto {
    private String name;
    private String nickname;
    private String gender;
    private String birth;
    private String address;
    private String phone;
    private String email;
    private String img;
//    private int fileAttached;
//    private String originalFileName;
//    private String saveFileName;
}
