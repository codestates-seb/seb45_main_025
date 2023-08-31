package com.example.SSM.be.domain.member.mapper;

import com.example.SSM.be.domain.member.dto.MemberDto.PostDto;
import com.example.SSM.be.domain.member.entity.Member;
import com.example.SSM.be.domain.security.auth.dto.LoginDto;
import java.time.format.DateTimeFormatter;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-08-31T14:01:57+0900",
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
        member.setUsername( postDto.getUsername() );
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
    public Member memberloginDtoToMember(LoginDto loginDto) {
        if ( loginDto == null ) {
            return null;
        }

        Member member = new Member();

        member.setEmail( loginDto.getEmail() );
        member.setPassword( loginDto.getPassword() );

        return member;
    }
}
