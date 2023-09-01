package com.example.SSM.be.domain.member.mapper;

import com.example.SSM.be.domain.member.dto.AuthLoginDto;
import com.example.SSM.be.domain.member.dto.MemberDto.PostDto;
import com.example.SSM.be.domain.member.entity.Member;
import java.time.format.DateTimeFormatter;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-09-01T12:27:10+0900",
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
    public Member AuthLoginDtoMember(AuthLoginDto authLoginDto) {
        if ( authLoginDto == null ) {
            return null;
        }

        Member member = new Member();

        member.setImg( authLoginDto.getProfileImg() );
        member.setEmail( authLoginDto.getEmail() );
        member.setName( authLoginDto.getName() );

        return member;
    }
}
