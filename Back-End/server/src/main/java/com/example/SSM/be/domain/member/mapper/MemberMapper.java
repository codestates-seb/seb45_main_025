package com.example.SSM.be.domain.member.mapper;

import com.example.SSM.be.domain.member.dto.AuthAdditionalDto;
import com.example.SSM.be.domain.member.dto.MemberDto;
import com.example.SSM.be.domain.member.entity.Member;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface MemberMapper {

    Member memberPostDtoToMember(MemberDto.PostDto postDto);

    Member memberPathchDtoToMember(MemberDto.PatchDto patchDto);

    Member AuthAdditionalDtoToMember(AuthAdditionalDto authAdditionalDto);

    MemberDto.ResponseDto memberToResponse(Member member);
}
