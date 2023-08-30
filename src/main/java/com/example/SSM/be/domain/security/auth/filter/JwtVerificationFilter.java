package com.example.SSM.be.domain.security.auth.filter;

import com.example.SSM.be.domain.security.auth.jwt.JwtTokenizer;
import com.example.SSM.be.domain.security.auth.utils.CustomAuthorityUtils;
import io.jsonwebtoken.ExpiredJwtException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.Map;

public class JwtVerificationFilter extends OncePerRequestFilter {
    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils authorityUtils;

    public JwtVerificationFilter(JwtTokenizer jwtTokenizer, CustomAuthorityUtils authorityUtils) {
        this.jwtTokenizer = jwtTokenizer;
        this.authorityUtils = authorityUtils;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
        throws ServletException, IOException{
        try{
            Map<String, Object> claims = verifyJws(request);
            setAuthenticationToContext(claims);
        }catch (ExpiredJwtException ee) {
            request.setAttribute("exception", ee);
        } catch (Exception e) {
            request.setAttribute("exception", e);
        }
        filterChain.doFilter(request,response);
    }

    // 만약 request에 전달받은 authorization이 없으면 해당 필터는 실행안함
    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        String authorization = request.getHeader("Authorization");

        return authorization == null || !authorization.startsWith("Bearer");
    }

    private Map<String,Object> verifyJws(HttpServletRequest request){
        String jws = request.getHeader("Authorization").replace("Bearer ","");
        try {
            Map<String, Object> claims = jwtTokenizer.getClaims(jws).getBody();
            return claims;
        } catch (Exception e) {
            request.setAttribute("exception", e);
            // 예외 처리 로직
            throw e;
        }
    }
    private void setAuthenticationToContext(Map<String,Object> claims){
        String email = (String) claims.get("email");
        List<GrantedAuthority> authorities = authorityUtils.createAuthorities((List)claims.get("roles"));
        Authentication authentication = new UsernamePasswordAuthenticationToken(email,null,authorities);
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }
}
