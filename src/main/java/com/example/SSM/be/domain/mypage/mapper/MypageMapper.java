package com.example.SSM.be.domain.mypage.mapper;


import com.example.SSM.be.domain.member.entity.Member;
import com.example.SSM.be.domain.mypage.dto.ImagePostDto;
import com.example.SSM.be.domain.mypage.entity.ProfileImage;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface MypageMapper {

    default ProfileImage ImagePostDtoToProfileImage(Member member, String originalFileName, String saveFileName){
        ProfileImage profileImage = new ProfileImage();
        profileImage.setMember(member);
        profileImage.setOriginalFileName(originalFileName);
        profileImage.setSaveFileName(saveFileName);

        return profileImage;
    }
}
