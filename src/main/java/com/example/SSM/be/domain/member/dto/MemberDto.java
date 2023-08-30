package com.example.SSM.be.domain.member.dto;

import com.example.SSM.be.domain.member.entity.Member;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
public class MemberDto {
    @NoArgsConstructor
    @Setter
    @Getter
    public static class PostDto{
        private String email;
        private String username;
        private String password;
        private String conformPassword;
        private String gender;
        private String phone;
        private LocalDate birth;
        private String address;
    }

    @Getter
    @Setter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ResponseDto {

        private long memberId;
        private String name;
        private String email;
        private String image;
        private Member.MemberStatus status;
        private String createdAt;
        private String modifiedAt;
    }
}
