package com.example.SSM.be.domain.mypage.service;

import com.example.SSM.be.domain.member.entity.Member;
import com.example.SSM.be.domain.member.repository.MemberRepository;
import com.example.SSM.be.domain.mypage.dto.ImagePostDto;
import com.example.SSM.be.domain.mypage.entity.ProfileImage;
import com.example.SSM.be.domain.mypage.mapper.MypageMapper;
import com.example.SSM.be.domain.mypage.repository.ProfileImageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.IOException;

@Service
@RequiredArgsConstructor
public class MypageService {
    private final ProfileImageRepository profileImageRepository;
    private final MypageMapper mypageMapper;
    private final MemberRepository memberRepository;
    private final ProfileImageRepository profileRepository;
    public Member createImage(Member member, ImagePostDto imagePostDto) throws IOException {
        if(imagePostDto.getImage()==null || imagePostDto.getImage().isEmpty()) {
            long memberId = member.getUserId();
            Member findMember = memberRepository.findById(memberId).get();
            if(findMember.getProfileImage()==null){
                ProfileImage profileImage = new ProfileImage();
                profileImage.setFileAttached(0);
                findMember.setProfileImage(profileImage);
            }else{
                findMember.getProfileImage().setFileAttached(0);
            }
            memberRepository.save(findMember);

        }else{
            if(member.getProfileImage()==null || member.getProfileImage()!=null){
                ProfileImage profileImage = new ProfileImage();
                profileImage.setFileAttached(1);
                member.setProfileImage(profileImage);
                memberRepository.save(member);
                MultipartFile multipartFile = imagePostDto.getImage();
                String originFileName = multipartFile.getOriginalFilename();
                String saveFileName = System.currentTimeMillis() + "_" + originFileName;
                String savePath = "C:/Users/yoongunyong/Desktop/images/profile/" + saveFileName;
                multipartFile.transferTo(new File(savePath));

                ProfileImage profile= mypageMapper.ImagePostDtoToProfileImage(member,originFileName, saveFileName);
                profileRepository.save(profile);
            }
        }
        return member;
    }
}
