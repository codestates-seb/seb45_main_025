package com.example.SSM.MemberTest;


import com.example.SSM.be.domain.member.dto.MemberDto;
import com.example.SSM.be.domain.member.mapper.MemberMapper;
import com.example.SSM.be.domain.member.repository.MemberRepository;
import com.example.SSM.be.domain.member.service.MemberService;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.*;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.mockito.Mockito.when;

public class MemberServiceTest {

    @InjectMocks
    private MemberService memberService;

    @Mock
    private MemberRepository memberRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private MemberMapper memberMapper;
    @Test
    public void testCreateMember() {
        MockitoAnnotations.initMocks(this); // Mockito 초기화

        // Arrange (준비)
        MemberDto.PostDto postDto = new MemberDto.PostDto();
        postDto.setEmail("test@example.com");
        postDto.setUsername("TestUser");
        postDto.setPassword("test1234");
        postDto.setGender("male");
        postDto.setPhone("010-1111-1111");
        postDto.setNick("test");
        // ... (나머지 필드 초기화)


        Member member = memberMapper.memberPostDtoToMember(postDto);
        System.out.println(member==null);
        // ... (나머지 필드 초기화)

        when(passwordEncoder.encode("test1234")).thenReturn("encodedPassword");
        when(memberRepository.save(any(Member.class))).thenReturn(member);

        // Act (실행)
        Member createdMember = memberService.createMember(member);

        // Assert (단언)
        assertNotNull(createdMember);
        assertEquals("test@example.com", createdMember.getEmail());
        assertEquals("TestUser", createdMember.getUsername());
        // ... (나머지 필드 확인)
        assertEquals("encodedPassword", createdMember.getPassword()); // 암호화된 비밀번호 확인

        verify(memberRepository, times(1)).save(any(Member.class));
    }
}
