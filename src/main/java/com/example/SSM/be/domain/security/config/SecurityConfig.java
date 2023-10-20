package com.example.SSM.be.domain.security.config;

import com.example.SSM.be.domain.member.repository.MemberRepository;
import com.example.SSM.be.domain.member.service.MemberService;
import com.example.SSM.be.domain.security.auth.filter.JwtAuthenticationFilter;
import com.example.SSM.be.domain.security.auth.filter.JwtVerificationFilter;
import com.example.SSM.be.domain.security.auth.handler.*;
import com.example.SSM.be.domain.security.auth.service.CustomOAuth2Serivce;
import com.example.SSM.be.domain.security.auth.utils.CustomAuthorityUtils;
import com.example.SSM.be.domain.security.token.jwt.JwtTokenizer;
import com.example.SSM.be.domain.security.token.repository.RefreshTokenRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.config.oauth2.client.CommonOAuth2Provider;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.oauth2.client.registration.InMemoryClientRegistrationRepository;
import org.springframework.security.oauth2.client.web.OAuth2LoginAuthenticationFilter;
import org.springframework.security.oauth2.core.AuthorizationGrantType;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;

@Configuration
@Slf4j
@RequiredArgsConstructor
public class SecurityConfig  {

    @Value("${spring.security.oauth2.client.registration.google.clientId}")  // (1)
    private String clientId;

    @Value("${spring.security.oauth2.client.registration.google.clientSecret}") // (2)
    private String clientSecret;
    private final JwtTokenizer jwtTokenizer;
    private final MemberRepository memberRepository;
    private final MemberService memberService;
    private final CustomAuthorityUtils authorityUtils;
    private final RefreshTokenRepository refreshTokenRepository;
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {
        httpSecurity
                .cors().configurationSource(corsConfigurationSource())  //기본설정의 cors가 아닌 아래 @Bean으로 등록한 cors설정 적용
                .and()
                .headers().frameOptions().sameOrigin()
                .and()
                .csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .formLogin().disable()
                .httpBasic().disable()
                .exceptionHandling()
                .authenticationEntryPoint(new MemberAuthenticationEntryPoint())
                .accessDeniedHandler(new MemberAccessDeniedHandler())
                .and()
                .apply(new CustomFilterConfigurer())
                .and()
                .authorizeHttpRequests(authorize -> authorize
                        .antMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                                // # member관련
                                .antMatchers(HttpMethod.POST, "/users/signup").permitAll()
                                .antMatchers(HttpMethod.POST, "/users/login").permitAll()
                                .antMatchers(HttpMethod.POST, "/users/logout").permitAll()

                                // # Mypage
                                .antMatchers(HttpMethod.GET, "/mypage").hasAnyRole("USER", "ADMIN")
                                .antMatchers(HttpMethod.PATCH, "/mypage").hasAnyRole("USER", "ADMIN")
                                .antMatchers(HttpMethod.GET, "/mypage/isOauth").hasAnyRole("USER", "ADMIN")
                                .antMatchers(HttpMethod.PATCH, "/mypage/pofileImage").hasAnyRole("USER", "ADMIN")
                                .antMatchers(HttpMethod.GET, "/mypage/board").hasAnyRole("USER", "ADMIN")
                                // # Board
                                .antMatchers(HttpMethod.POST, "/board").hasAnyRole("USER", "ADMIN")
                                .antMatchers(HttpMethod.GET, "/board/{board_id}").permitAll()
                                .antMatchers(HttpMethod.GET, "/board/posts").permitAll()
                                .antMatchers(HttpMethod.PATCH, "/board/{board-id}/update{").hasAnyRole("USER", "ADMIN")
                                .antMatchers(HttpMethod.DELETE, "/board/{board-id}/delete").hasAnyRole("USER", "ADMIN")


                                // # comment
                                .antMatchers(HttpMethod.POST, "/board/{board-id}/comment").hasAnyRole("USER", "ADMIN")
                                .antMatchers(HttpMethod.PATCH, "/board/{board-id}/comment/{comment-id}").hasAnyRole("USER", "ADMIN")
                                .antMatchers(HttpMethod.GET, "/board/{board-id}/comment").permitAll()
                                .antMatchers(HttpMethod.DELETE, "/board/{board-id}/comment/{comment-id}").hasAnyRole("USER", "ADMIN")
                                // # products
                                .antMatchers(HttpMethod.POST, "/products/create").permitAll()
                                .antMatchers(HttpMethod.GET, "/products/get/{productId}").permitAll()
                                .antMatchers(HttpMethod.PATCH, "/products/update/{productId}").permitAll()
                                        // 수정 필요
                                .antMatchers(HttpMethod.DELETE, "/products/delete/{productId}").permitAll()
                                .antMatchers(HttpMethod.GET, "/products/category/{category}/").permitAll()
                                .antMatchers(HttpMethod.POST, "/products/product/{productId}/like").hasAnyRole("USER", "ADMIN")
                                .antMatchers(HttpMethod.GET, "/products/search").permitAll()
                                .antMatchers(HttpMethod.GET, "/products/category/{category}/likes").permitAll()
                                .antMatchers(HttpMethod.POST, "/products/bookmark/{productId}").hasAnyRole("USER", "ADMIN")
                                .antMatchers(HttpMethod.POST, "/products/unbookmark/{productId}").hasAnyRole("USER", "ADMIN")
                                .antMatchers(HttpMethod.GET, "/products/bookmarked").hasAnyRole("USER", "ADMIN")
                                .antMatchers(HttpMethod.GET, "/products/all/list/").permitAll()
                                 // # cart
                                .antMatchers(HttpMethod.POST, "/cart/add/{productId}").hasAnyRole("USER", "ADMIN")
                                .antMatchers(HttpMethod.GET, "/cart/list").hasAnyRole("USER", "ADMIN")
                                .antMatchers(HttpMethod.PATCH, "/cart/update/{productId}").hasAnyRole("USER", "ADMIN")
                                .antMatchers(HttpMethod.DELETE, "/cart/remove-multiple").hasAnyRole("USER", "ADMIN")
                                .antMatchers(HttpMethod.DELETE, "/cart/clear").hasAnyRole("USER", "ADMIN")
                                .antMatchers(HttpMethod.GET, "/cart/remaining-items").hasAnyRole("USER", "ADMIN")

                                // payments
                                .antMatchers(HttpMethod.POST, "/orders/create").hasAnyRole("USER", "ADMIN")
                                .antMatchers(HttpMethod.POST, "/orders/{orderId}").hasAnyRole("USER", "ADMIN")
                                // token
                                .antMatchers(HttpMethod.POST, "/token/refresh").permitAll()
                                .antMatchers(HttpMethod.POST, "/token/check").permitAll()
                                .antMatchers("/").permitAll()
//                              .antMatchers("/h2-console/**").permitAll()
                                .anyRequest().permitAll()
                )
                .oauth2Login(oauth -> oauth
                        .successHandler(new OAuth2MemberSuccessHandler(jwtTokenizer,authorityUtils,memberService))
                        .userInfoEndpoint().userService(new CustomOAuth2Serivce()))
                .logout().permitAll();
        return httpSecurity.build();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowCredentials(true);
        configuration.setAllowedOrigins(List.of("http://localhost:3000","https://localhost:3000","https://www.ksnacksncak.shop"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PATCH", "DELETE","OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setExposedHeaders(Arrays.asList("Authorization","Refresh","Set-Cookie","MemberId"));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
    // (3)

    public class CustomFilterConfigurer extends AbstractHttpConfigurer<CustomFilterConfigurer, HttpSecurity> {


        @Override
        public void configure(HttpSecurity builder)  {
            AuthenticationManager authenticationManager = builder.getSharedObject(AuthenticationManager.class);

            JwtAuthenticationFilter jwtAuthenticationFilter =
                    new JwtAuthenticationFilter(authenticationManager, jwtTokenizer, memberRepository,refreshTokenRepository);




            jwtAuthenticationFilter.setFilterProcessesUrl("/users/login");
            // Exception 추가
            jwtAuthenticationFilter.setAuthenticationSuccessHandler(new MemberAuthenticationSuccessHandler());
            jwtAuthenticationFilter.setAuthenticationFailureHandler(new MemberAuthenticationFailureHandler());


            JwtVerificationFilter jwtVerificationFilter = new JwtVerificationFilter(jwtTokenizer, authorityUtils);

            builder
                    .addFilter(jwtAuthenticationFilter)
                    .addFilterAfter(jwtVerificationFilter, OAuth2LoginAuthenticationFilter.class);
        }
        @Bean
        public ClientRegistrationRepository clientRegistrationRepository() {
            var clientRegistration = clientRegistration();    // (3-1)
            return new InMemoryClientRegistrationRepository(clientRegistration);   // (3-2)
        }

        // (4)
        private ClientRegistration clientRegistration() {
            // (4-1)
            return CommonOAuth2Provider
                    .GOOGLE
                    .getBuilder("google")
                    .clientId(clientId)
                    .clientSecret(clientSecret)
                    .authorizationGrantType(AuthorizationGrantType.AUTHORIZATION_CODE)
                    .scope("openid", "profile", "email")
                    .build();
        }
    }
}