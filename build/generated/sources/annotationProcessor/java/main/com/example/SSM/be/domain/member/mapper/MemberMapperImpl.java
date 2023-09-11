package com.example.SSM.be.domain.member.mapper;

import com.example.SSM.be.domain.member.dto.AuthAdditionalDto;
import com.example.SSM.be.domain.member.dto.MemberDto.PatchDto;
import com.example.SSM.be.domain.member.dto.MemberDto.PostDto;
import com.example.SSM.be.domain.member.dto.MemberDto.ResponseDto;
import com.example.SSM.be.domain.member.dto.MemberDto.ResponseDto.ResponseDtoBuilder;
import com.example.SSM.be.domain.member.entity.Member;
import java.time.format.DateTimeFormatter;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-09-11T16:12:47+0900",
    comments = "version: 1.4.2.Final, compiler: IncrementalProcessingEnvironment from gradle-language-java-8.0.jar, environment: Java 11.0.20 (Azul Systems, Inc.)"
)
@Component
public class MemberMapperImpl implements MemberMapper {

    @Override
    public Member memberPostDtoToMember(PostDto postDto) {
        if ( postDto == null ) {
            return null;
        }

        Member member = new Member();

        member.setEmail( postDto.getEmail() );
        member.setName( postDto.getName() );
        member.setNickName( postDto.getNickName() );
        member.setPassword( postDto.getPassword() );
        member.setGender( postDto.getGender() );
        member.setPhone( postDto.getPhone() );
        if ( postDto.getBirth() != null ) {
            member.setBirth( DateTimeFormatter.ISO_LOCAL_DATE.format( postDto.getBirth() ) );
        }
        member.setAddress( postDto.getAddress() );

        return member;
    }

    @Override
    public Member memberPathchDtoToMember(PatchDto patchDto) {
        if ( patchDto == null ) {
            return null;
        }

        Member member = new Member();

        member.setNickName( patchDto.getNickName() );

        return member;
    }

    @Override
    public Member AuthAdditionalDtoToMember(AuthAdditionalDto authAdditionalDto) {
        if ( authAdditionalDto == null ) {
            return null;
        }

        Member member = new Member();

        member.setNickName( authAdditionalDto.getNickName() );
        member.setGender( authAdditionalDto.getGender() );
        member.setPhone( authAdditionalDto.getPhone() );
        if ( authAdditionalDto.getBirth() != null ) {
            member.setBirth( DateTimeFormatter.ISO_LOCAL_DATE.format( authAdditionalDto.getBirth() ) );
        }
        member.setAddress( authAdditionalDto.getAddress() );

        return member;
    }

    @Override
    public ResponseDto memberToResponse(Member member) {
        if ( member == null ) {
            return null;
        }

        ResponseDtoBuilder responseDto = ResponseDto.builder();

        if ( member.getUserId() != null ) {
            responseDto.userId( member.getUserId() );
        }
        responseDto.name( member.getName() );
        responseDto.nickName( member.getNickName() );
        responseDto.email( member.getEmail() );
        responseDto.img( member.getImg() );
        responseDto.memberStatus( member.getMemberStatus() );
        if ( member.getCreatedAt() != null ) {
            responseDto.createdAt( DateTimeFormatter.ISO_LOCAL_DATE_TIME.format( member.getCreatedAt() ) );
        }
        if ( member.getModifiedAt() != null ) {
            responseDto.modifiedAt( DateTimeFormatter.ISO_LOCAL_DATE_TIME.format( member.getModifiedAt() ) );
        }

        return responseDto.build();
    }
}
