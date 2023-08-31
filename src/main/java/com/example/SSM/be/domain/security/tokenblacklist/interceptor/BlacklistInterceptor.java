package com.example.SSM.be.domain.security.tokenblacklist.interceptor;

import com.example.SSM.be.domain.security.auth.jwt.JwtTokenizer;
import com.example.SSM.be.domain.security.tokenblacklist.service.BlacklistTokenService;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


@Component
public class BlacklistInterceptor implements HandlerInterceptor {

    private final JwtTokenizer jwtTokenizer;
    private final BlacklistTokenService blacklistTokenService;
    public BlacklistInterceptor(JwtTokenizer jwtTokenizer, BlacklistTokenService blacklistTokenService) {
        this.jwtTokenizer = jwtTokenizer;
        this.blacklistTokenService = blacklistTokenService;
    }
    /*Authorizaiton 헤더에 토큰을 넣는 요청이 올 시,
    * 요청을 가로채어 해당 토큰이 블랙리스트에 있는 요청인지 확인*/
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {


        String authorizationHeader = request.getHeader("Authorization");

        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            String jws = authorizationHeader.substring(7);

            if (blacklistTokenService.findBlackListedToken(jws)) {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.getWriter().write("Token is blacklisted.");
                return false;
            }
        }
        return true;
    }
}
