package com.example.SSM.be.domain.mypage.mapper;
import com.example.SSM.be.domain.member.entity.Member;
import com.example.SSM.be.domain.mypage.dto.MypageResponseDto;
import com.example.SSM.be.domain.mypage.entity.ProfileImage;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface MypageMapper {
    default MypageResponseDto memberToMypageResponseDto(Member member){
        MypageResponseDto responseDto = new MypageResponseDto();
        responseDto.setName(member.getName());
        responseDto.setNickName(member.getNickName());
        responseDto.setGender(member.getGender());
        responseDto.setBirth(member.getBirth());
        responseDto.setAddress(member.getAddress());
        responseDto.setPhone(member.getPhone());
        responseDto.setEmail(member.getEmail());
        if (member.getImage() != null) {
            if (member.getImage().getOriginalFileName() != null) {
                responseDto.setOriginalFileName(member.getImage().getOriginalFileName());
            }
            if (member.getImage().getSaveFileName() != null) {
                responseDto.setSaveFileName(member.getImage().getSaveFileName());
            }
        }
        return responseDto;
    }
    default ProfileImage memberToProfileImage(Member member, String originalFileName, String saveFileName){
        ProfileImage image = new ProfileImage();
        image.setMember(member);
        image.setOriginalFileName(originalFileName);
        image.setSaveFileName(saveFileName);
        return image;
    }

}
