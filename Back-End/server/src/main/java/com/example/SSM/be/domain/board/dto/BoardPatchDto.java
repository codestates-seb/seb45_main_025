package com.example.SSM.be.domain.board.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BoardPatchDto {

    private String title;
    private String content;
    private List<MultipartFile> images;
    private String originalFileName;
    private String saveFileName;
    private int fileAttached;

}