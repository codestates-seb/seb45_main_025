package com.example.SSM.be.domain.board.dto;


import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.lang.Nullable;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Getter
@Setter
public class BoardPostDto {
    private String title;
    private String content;
    @Nullable
    private List<MultipartFile> image;
    private String originalFileName;
    private String saveFileName;
    private int fileAttached;  //파일 첨부여부 확인 (1:첨부 , 0:미첨부)


}
