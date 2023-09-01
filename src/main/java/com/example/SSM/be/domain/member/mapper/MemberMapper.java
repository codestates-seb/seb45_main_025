package com.example.SSM.be.domain.member.mapper;

import com.example.SSM.be.domain.member.dto.AuthLoginDto;
import com.example.SSM.be.domain.member.dto.MemberDto;
import com.example.SSM.be.domain.member.entity.Member;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface MemberMapper {

    Member memberPostDtoToMember(MemberDto.PostDto postDto);

    @Mapping(source = "profileImg", target = "img")
    Member AuthLoginDtoMember(AuthLoginDto authLoginDto);
}
