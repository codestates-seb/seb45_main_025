package com.example.SSM.be.domain.member.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class AuthAdditionalDto {
    private String name;
    private String gender;
    private String phone;
    private LocalDate birth;
    private String address;
}
