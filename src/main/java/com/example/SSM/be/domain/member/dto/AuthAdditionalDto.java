package com.example.SSM.be.domain.member.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;

@Getter
@Setter
public class AuthAdditionalDto {
    @NotNull
    private String name;
    @NotBlank
    private String gender;
    @NotBlank
    private String phone;
    @NotNull
    private LocalDate birth;
    @NotBlank
    private String address;
}
