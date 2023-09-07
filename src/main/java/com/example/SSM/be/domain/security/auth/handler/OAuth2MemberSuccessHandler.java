package com.example.SSM.be.domain.security.auth.handler;

import com.example.SSM.be.domain.member.entity.Member;
import com.example.SSM.be.domain.member.service.MemberService;
import com.example.SSM.be.domain.security.auth.utils.CustomAuthorityUtils;
import com.example.SSM.be.domain.security.token.jwt.JwtTokenizer;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URI;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
public class OAuth2MemberSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils authorityUtils;
    private final MemberService memberService;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication)
            throws IOException, ServletException {
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        String nickName = (String) oAuth2User.getAttributes().get("name");
        String email = String.valueOf(oAuth2User.getAttributes().get("email"));
        String img = (String) oAuth2User.getAttributes().get("picture");
        String gender = (String) oAuth2User.getAttributes().get("gender");
        String birthday = (String) oAuth2User.getAttribute("birthday");
        String homeAddress = (String) oAuth2User.getAttribute("homeAddress");
        String phoneNumber = (String) oAuth2User.getAttribute("phoneNumber");
        List<String> authorities = authorityUtils.createRoles(email);

        Member member = buildOAuth2Member(nickName,email,img,gender,birthday,homeAddress,phoneNumber);
        if(!memberService.existsByEmail(member.getEmail())) {
            boolean isNewAccount = true;
            // db에 저장
            Member savedMember = saveMember(member);
            redirect(request, response, savedMember,isNewAccount); // 리다이렉트를 하기위한 정보들을 보내줌
        } else {
            boolean isNewAccount = false;
            Member findMember = memberService.findVerifiedMember(member.getEmail());
            redirect(request, response, findMember,isNewAccount);
        }
    }
    private Member buildOAuth2Member(String nickName, String email,
                                     String image,String gender,
                                     String birthday,String homeAddress,String phoneNumber) {
        Member member = new Member();
        member.setNickName(nickName);
        // 일반 유저와 구분을 위해
        member.setEmail(email+"1");
        member.setImg(image);
        member.setGender(gender);
        member.setBirth(birthday);
        member.setAddress(homeAddress);
        member.setPhone(phoneNumber);
        return member;
    }

    private Member saveMember(Member member) {
        return memberService.createMemberOAuth2(member);
    }
    private void redirect(HttpServletRequest request,
                          HttpServletResponse response,
                          Member member, boolean isNewAccount )
        throws IOException{
        String accessToken = memberService.delegateAccessToken(member);
        String refreshToken = memberService.delegateRefreshToken(member);

        String uri = createURI( accessToken,refreshToken,isNewAccount).toString();

        String headerValue = "Bearer " + accessToken;
        response.setHeader("Authorization",headerValue);
        response.setHeader("Refresh",refreshToken);

        // 토큰을 쿠키에 저장
        Cookie accessTokenCookie = new Cookie("access_token", accessToken);
        accessTokenCookie.setHttpOnly(true); // JavaScript로 접근을 막음
        accessTokenCookie.setSecure(true); // HTTPS 연결에서만 쿠키 사용
        accessTokenCookie.setMaxAge(3600); // 쿠키 만료 시간 설정 (초 단위)
        response.addCookie(accessTokenCookie);
        Cookie refreshTokenCookie = new Cookie("refresh_token", refreshToken);
        refreshTokenCookie.setHttpOnly(true);
        refreshTokenCookie.setSecure(true);
        refreshTokenCookie.setMaxAge(3600);
        response.addCookie(refreshTokenCookie);

        getRedirectStrategy().sendRedirect(request,response,uri);
    }

    private URI createURI(String accessToken,
                          String refreshToken,
                          boolean isNewAccount){
        MultiValueMap<String, String> queryParams = new LinkedMultiValueMap<>();
        queryParams.add("access_token", "Bearer " + accessToken);
        queryParams.add("refresh_token", refreshToken);

        String path = isNewAccount ? "/OauthSIgnupForm" : "/user";
        return UriComponentsBuilder
                .newInstance()
                .scheme("http")
                .host("localhost")
                .port(8888)
                .path(path)
                .queryParams(queryParams)
                .build()
                .toUri();
    }
}
