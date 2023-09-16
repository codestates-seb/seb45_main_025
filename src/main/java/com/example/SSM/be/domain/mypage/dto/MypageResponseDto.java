package com.example.SSM.be.domain.mypage.dto;

import com.example.SSM.be.domain.mypage.entity.ProfileImage;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MypageResponseDto {
    private String name;
    private String nickName;
    private String gender;
    private String birth;
    private String address;
    private String phone;
    private String email;
    private ProfileImage image;
    private String originalFileName;
    private String saveFileName;
    private boolean isOauth;
}
