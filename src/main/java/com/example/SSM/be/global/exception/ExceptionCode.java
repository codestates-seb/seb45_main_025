package com.example.SSM.be.global.exception;

import lombok.Getter;

public enum ExceptionCode {

    MEMBER_NOT_FOUND(404, "Member not found"),
    MEMBER_EXISTS(409, "회원이 존재합니다"),
    MEMBER_IS_DELETED(404, "탈퇴한 회원입니다"),
    MEMBER_IS_SLEEPING(404,"휴면 계정입니다"),
    STATUS_NOT_LOGIN(404,"STATUS_NOT_LOGIN"),
    POST_NOT_FOUND(404, "Post not found"),
    COMMENT_NOT_FOUND(404, "Comment not found"),

    JWT_TOKEN_EXPIRED(404, "토큰이 만료되었습니다"),

    ALREADY_ON_BLACKLIST(409,"이미 블랙리스트에 추가된 토큰입니다");

    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }
}