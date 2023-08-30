package com.example.SSM.be.global.exception;

import lombok.Getter;

public enum ExceptionCode {
    COMMENT_NOT_FOUND(404, "Comment not found"),
    POST_NOT_FOUND(404, "Post not found"),
    MEMBER_NOT_FOUND(404, "Member not found"),
    MEMBER_UNAUTHORIZED(404, "Member Status is EXIT or SLEEP"),
    STATUS_NOT_LOGIN(404,"STATUS_NOT_LOGIN");

    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }
}