package com.example.SSM.be.domain.security.auth.handler;

import com.example.SSM.be.domain.member.entity.Member;
import com.example.SSM.be.domain.member.service.MemberService;
import com.example.SSM.be.domain.security.auth.utils.CustomAuthorityUtils;
import com.example.SSM.be.domain.security.token.jwt.JwtTokenizer;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseCookie;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.ServletException;
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
        String memberId = String.valueOf(member.getUserId());

        String uri = createURI( accessToken,refreshToken,isNewAccount).toString();
        ResponseCookie responseAccessCookie= ResponseCookie.from("access_token", accessToken)
                .sameSite("None")
                .secure(true)
                .maxAge(60 * 5) // 5분
                .path("/")
                .build();
        ResponseCookie responseRefreshCookie= ResponseCookie.from("refresh_token", refreshToken)
                .sameSite("None")
                .secure(true)
                .httpOnly(true)
                .maxAge(60 * 60*24) // 하루
                .path("/")
                .build();
        String headerValue = "Bearer " + accessToken;
        response.setHeader("Authorization",headerValue);
        response.setHeader("Refresh",refreshToken);
        response.setHeader("MemberId", memberId);
        response.addHeader("Set-Cookie", responseAccessCookie.toString());
        response.addHeader("Set-Cookie", responseRefreshCookie.toString());

        getRedirectStrategy().sendRedirect(request,response,uri);
    }

    private URI createURI(String accessToken,
                          String refreshToken,
                          boolean isNewAccount){
        MultiValueMap<String, String> queryParams = new LinkedMultiValueMap<>();
        queryParams.add("access_token", "Bearer " + accessToken);
        queryParams.add("refresh_token", refreshToken);
        queryParams.add("new", String.valueOf(isNewAccount));

        return UriComponentsBuilder
                .newInstance()
                .scheme("https")
                .host("www.ksnacksncak.shop")
                .port(443)
                .path("/loading")
                .queryParams(queryParams)
                .build()
                .toUri();
    }
}
