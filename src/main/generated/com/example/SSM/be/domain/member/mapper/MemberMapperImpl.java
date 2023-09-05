package com.example.SSM.be.domain.member.mapper;

import com.example.SSM.be.domain.member.dto.AuthAdditionalDto;
import com.example.SSM.be.domain.member.dto.AuthLoginDto;
import com.example.SSM.be.domain.member.dto.MemberDto.PostDto;
import com.example.SSM.be.domain.member.entity.Member;
import java.time.format.DateTimeFormatter;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-09-05T10:34:52+0900",
    comments = "version: 1.4.2.Final, compiler: javac, environment: Java 11.0.20 (Azul Systems, Inc.)"
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
    public Member AuthLoginDtoToMember(AuthLoginDto authLoginDto) {
        if ( authLoginDto == null ) {
            return null;
        }

        Member member = new Member();

        member.setImg( authLoginDto.getProfileImg() );
        member.setEmail( authLoginDto.getEmail() );
        member.setName( authLoginDto.getName() );

        return member;
    }

    @Override
    public Member AuthAdditionalDtoToMember(AuthAdditionalDto authAdditionalDto) {
        if ( authAdditionalDto == null ) {
            return null;
        }

        Member member = new Member();

        member.setGender( authAdditionalDto.getGender() );
        member.setPhone( authAdditionalDto.getPhone() );
        if ( authAdditionalDto.getBirth() != null ) {
            member.setBirth( DateTimeFormatter.ISO_LOCAL_DATE.format( authAdditionalDto.getBirth() ) );
        }
        member.setAddress( authAdditionalDto.getAddress() );

        return member;
    }
}
