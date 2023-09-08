package com.example.SSM.be.domain.mypage.dto;

import lombok.Getter;
import lombok.Setter;
import org.springframework.lang.Nullable;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Getter
@Setter
public class ImagePostDto {

    private MultipartFile image;
    private String originalFileName;
    private String saveFileName;
    private int fileAttached;
}
