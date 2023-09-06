package com.example.SSM.be.domain.board.mapper;


import com.example.SSM.be.domain.board.dto.BoardPatchDto;
import com.example.SSM.be.domain.board.dto.BoardPostDto;
import com.example.SSM.be.domain.board.dto.BoardResponseDto;
import com.example.SSM.be.domain.board.entity.Board;
import com.example.SSM.be.domain.board.entity.Image;
import org.mapstruct.Mapper;

import java.util.ArrayList;
import java.util.List;

@Mapper(componentModel = "spring")
public interface BoardMapper{

    //이미지가 있는경우

    public static Board patchDtoWithImageToBoardEntity(Member member,Board existingBoard, BoardPatchDto patchDto){

        existingBoard.setTitle(patchDto.getTitle());
        existingBoard.setContent(patchDto.getContent());
        existingBoard.setMember(member);
        existingBoard.setView(existingBoard.getView());
        existingBoard.setFileAttached(1);
        existingBoard.setImageList(existingBoard.getImageList());

        return existingBoard;
    }

    public static BoardResponseDto boardPatchToBoardResponseDto(Board board){
        BoardResponseDto response = new BoardResponseDto();
        response.setBoardId(board.getBoardId());
        response.setTitle(board.getTitle());
        response.setContent(board.getContent());
        response.setView(board.getView());
        response.setCreatedAt(board.getCreatedAt());
        response.setModifiedAt(board.getModifiedAt());

        if(board.getFileAttached() == 0){
            response.setFileAttached(board.getFileAttached());
        }else{
            List<String> originalFileNameList = new ArrayList<>();
            List<String> saveFileNameList = new ArrayList<>();
            response.setFileAttached(board.getFileAttached());
            for(Image image : board.getImageList()) {
                originalFileNameList.add(image.getOriginalFileName());
                saveFileNameList.add(image.getSaveFileName());
            }
            response.setOriginalFileName(originalFileNameList);
            response.setSaveFileName(saveFileNameList);
        }
        return response;

    }


    public static Board postDtoToBoardEntity(Member member, BoardPostDto postDto){
        Board board = new Board();
        board.setTitle(postDto.getTitle());
        board.setContent(postDto.getContent());
        board.setMember(member);
        board.setView(0);
        board.setFileAttached(0);
        return board;
    }

    public static Board postDtoWithImageToBoardEntity(Member member, BoardPostDto postDto){
        Board board = new Board();
        board.setTitle(postDto.getTitle());
        board.setContent(postDto.getContent());
        board.setMember(member);
        board.setView(0);
        board.setFileAttached(1);

        return board;
    }

    public static BoardResponseDto boardToBoardResponseDto(Board board){
        BoardResponseDto response = new BoardResponseDto();
        response.setBoardId(board.getBoardId());
        response.setTitle(board.getTitle());
        response.setContent(board.getContent());
        response.setView(board.getView());
        response.setCreatedAt(board.getCreatedAt());
        response.setModifiedAt(board.getModifiedAt());

        if(board.getFileAttached() == 0){
            response.setFileAttached(board.getFileAttached());
        }else{
            List<String> originalFileNameList = new ArrayList<>();
            List<String> saveFileNameList = new ArrayList<>();
            response.setFileAttached(board.getFileAttached());
            for(Image image : board.getImageList()) {
                originalFileNameList.add(image.getOriginalFileName());
                saveFileNameList.add(image.getSaveFileName());
            }
            response.setOriginalFileName(originalFileNameList);
            response.setSaveFileName(saveFileNameList);
        }
        return response;

    }

    public static Image boardToImage(Board board, String originalFileName, String saveFileName){
        Image image = new Image();
        image.setBoard(board);
        image.setOriginalFileName(originalFileName);
        image.setSaveFileName(saveFileName);

        return image;
    }

    public static Board boardPatchDtoToBoard(Member member,Board existingBoard, BoardPatchDto patchDto){

        existingBoard.setTitle(patchDto.getTitle());
        existingBoard.setContent(patchDto.getContent());
        existingBoard.setMember(member);
        existingBoard.setView(existingBoard.getView());
        existingBoard.setLast_Modifier(member.getName());
        existingBoard.setFileAttached(0);
        return existingBoard;
    }



}