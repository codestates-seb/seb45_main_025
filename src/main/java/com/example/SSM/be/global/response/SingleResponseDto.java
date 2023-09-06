package com.example.SSM.be.global.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
@Getter
@AllArgsConstructor
public class SingleResponseDto<T> {
    private T data;
}
