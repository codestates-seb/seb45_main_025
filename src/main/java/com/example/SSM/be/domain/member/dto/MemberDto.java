package com.example.SSM.be.domain.member.dto;

import com.example.SSM.be.domain.member.entity.Member;
import lombok.*;

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
        private String gender;
        private String phone;
        private String nick;
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
