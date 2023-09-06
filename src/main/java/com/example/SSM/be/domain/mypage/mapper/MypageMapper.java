package com.example.SSM.be.domain.mypage.mapper;
import com.example.SSM.be.domain.mypage.dto.MypageResponseDto;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface MypageMapper {


    default MypageResponseDto memberToMypageResponseDto(Member member){
        MypageResponseDto responseDto = new MypageResponseDto();
        responseDto.setName(member.getName());
        responseDto.setNickname(member.get);
        responseDto.setGender(member.getGender());
        responseDto.setBirth(member.getBirth());
        responseDto.setAddress(member.getAddress());
        responseDto.setPhone(member.getPhone());
        responseDto.setEmail(member.getEmail());
        return responseDto;

    }
}
