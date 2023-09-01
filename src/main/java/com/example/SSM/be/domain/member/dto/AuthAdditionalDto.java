package com.example.SSM.be.domain.member.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;

public class AuthAdditionalDto {
    @NotBlank
    private String gender;
    @NotBlank
    private String phone;
    @NotNull
    private LocalDate birth;
    @NotBlank
    private String address;
}
