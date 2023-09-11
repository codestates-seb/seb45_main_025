package com.example.SSM.be.domain.mypage.service;

import com.example.SSM.be.domain.board.dto.BoardResponseListDto;
import com.example.SSM.be.domain.board.entity.Board;
import com.example.SSM.be.domain.board.repository.BoardRepository;
import com.example.SSM.be.domain.member.entity.Member;
import com.example.SSM.be.domain.member.repository.MemberRepository;
import com.example.SSM.be.domain.member.service.MemberService;
import com.example.SSM.be.domain.mypage.dto.ImagePostDto;
import com.example.SSM.be.domain.mypage.dto.MypageResponseDto;
import com.example.SSM.be.domain.mypage.dto.MypageUpdateDto;
import com.example.SSM.be.domain.mypage.entity.ProfileImage;
import com.example.SSM.be.domain.mypage.mapper.MypageMapper;
import com.example.SSM.be.domain.mypage.repository.ProfileImageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
@RequiredArgsConstructor
public class MypageService {

    private final MypageMapper mypageMapper;
    private final MemberRepository memberRepository;
    private final MemberService memberService;
    private final PasswordEncoder passwordEncoder;
    private final ProfileImageRepository imageRepository;
    private final BoardRepository boardRepository;


        public MypageResponseDto updateMyInfo(Member member, MypageUpdateDto updateDto){
            Member findMember = memberService.findMemberByEmail(member.getEmail());
            Optional.ofNullable(updateDto.getName()).
                    ifPresent(findMember::setName);
            Optional.ofNullable(updateDto.getNickName()).
                    ifPresent(findMember::setNickName);
            Optional.ofNullable(updateDto.getGender()).
                    ifPresent(findMember::setGender);
            Optional.ofNullable(updateDto.getBirth()).
                    ifPresent(findMember::setBirth);
            Optional.ofNullable(updateDto.getAddress()).
                    ifPresent(findMember::setAddress);
            Optional.ofNullable(updateDto.getPhone()).
                    ifPresent(findMember::setPhone);
            Optional.ofNullable(updateDto.getEmail()).
                    ifPresent(findMember::setEmail);
            Optional.ofNullable(updateDto.getPassword())
                    .ifPresent(password -> findMember.setPassword(passwordEncoder.encode(password)));

            Member savedMember = memberRepository.save(findMember);
            return mypageMapper.memberToMypageResponseDto(savedMember);
        }
        @Transactional
        public MypageResponseDto uploadImage(Member member, ImagePostDto imagePostDto) throws IOException {
            MultipartFile multipartFile = imagePostDto.getImage();
            if(member.getImage()!=null){
                ProfileImage profileImage = member.getImage();
                String existingImagePath = "C:/Users/yoongunyong/Desktop/images/profile/" + profileImage.getSaveFileName();
                try{
                    Files.deleteIfExists(Paths.get(existingImagePath));
                }catch (IOException e){
                    e.printStackTrace();
                }
            }
            member.setImage(null);
            if(imagePostDto.getImage()==null || imagePostDto.getImage().isEmpty()){
                memberRepository.save(member);
            }else{
                MultipartFile newImage = imagePostDto.getImage();
                String originalFileName = newImage.getOriginalFilename();
                String saveFileName = System.currentTimeMillis() + "_" + originalFileName;
                String savePath = "C:/Users/yoongunyong/Desktop/images/profile/" + saveFileName;
                newImage.transferTo(new File(savePath));

                ProfileImage image = new ProfileImage();
                image.setOriginalFileName(originalFileName);
                image.setSaveFileName(saveFileName);
                image.setMember(member);



                ProfileImage saveImage = imageRepository.save(image);
                member.setImage(saveImage);
                memberRepository.save(member);

            }
            Member findMember = memberService.findMemberByEmail(member.getEmail());
            MypageResponseDto responseDto = mypageMapper.memberToMypageResponseDto(findMember);
            return responseDto;
        }

        public List<BoardResponseListDto> getMyBoardList(Member member){
            List<Board> boardList = boardRepository.findByMemberEmailOrderByCreatedAtDesc(member.getEmail());
            List<BoardResponseListDto> responseDto = new ArrayList<>();
            for(Board board : boardList){
                responseDto.add(new BoardResponseListDto(board));
            }
            return responseDto;
        }
}
