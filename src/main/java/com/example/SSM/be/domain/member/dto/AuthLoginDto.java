package com.example.SSM.be.domain.member.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuthLoginDto {

    @NotNull
    @Email
    private String email;
    @NotNull
    @Size(min = 2, max = 20)
    private String name;

    private String profileImg;

}
