package com.example.SSM.be.domain.member.dto;

import com.example.SSM.be.domain.member.entity.Member;
import lombok.*;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;

@Getter
@Setter
public class MemberDto {
    @NoArgsConstructor
    @Setter
    @Getter
    public static class PostDto{
        @Email
        @NotBlank
        private String email;
        @NotBlank
        private String name;
        @NotBlank
        private String nickName;
        @NotBlank
        private String password;
        @NotBlank
        private String conformPassword;
        @NotBlank
        private String gender;
        @NotBlank
        private String phone;
        @NotNull
        private LocalDate birth;
        @NotBlank
        private String address;
    }
    @Getter
    @Setter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class PatchDto{
        private String nickName;
    }

    @Getter
    @Setter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ResponseDto {

        private long userId;
        private String name;
        private String nickName;
        private String email;
        private String img;
        private Member.MemberStatus memberStatus;
        private String createdAt;
        private String modifiedAt;
    }
}
