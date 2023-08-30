package com.example.SSM.be.domain.security.config;

import com.example.SSM.be.domain.member.repository.MemberRepository;
import com.example.SSM.be.domain.security.auth.filter.JwtAuthenticationFilter;
import com.example.SSM.be.domain.security.auth.handler.MemberAuthenticationFailureHandler;
import com.example.SSM.be.domain.security.auth.handler.MemberAuthenticationSuccessHandler;
import com.example.SSM.be.domain.security.auth.jwt.JwtTokenizer;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.oauth2.client.CommonOAuth2Provider;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.oauth2.client.registration.InMemoryClientRegistrationRepository;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.LoginUrlAuthenticationEntryPoint;

@Configuration
@EnableWebSecurity
public class SecurityConfig  {
    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }
    @Value("${spring.security.oauth2.client.registration.google.clientId}")  // (1)
    private String clientId;

    @Value("${spring.security.oauth2.client.registration.google.clientSecret}") // (2)
    private String clientSecret;
    private final JwtTokenizer jwtTokenizer;
    private final MemberRepository memberRepository;

    public SecurityConfig(JwtTokenizer jwtTokenizer, MemberRepository memberRepository) {
        this.jwtTokenizer = jwtTokenizer;
        this.memberRepository = memberRepository;
    }



    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                .authorizeRequests(authorizeRequests ->
                        authorizeRequests
                                .antMatchers("/mypage/**").hasAnyRole("USER", "ADMIN")
                                .antMatchers("/h2-console/**").permitAll()
                                .anyRequest().permitAll()
                )
                .headers().frameOptions().disable()
                .and()
                .formLogin().disable()
                .httpBasic().disable()
                .apply(new CustomFilterConfigurer());
        return http.build();
    }

    // (3)
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
                .redirectUriTemplate("http://localhost:8080/login/oauth2/code/google")
                .scope("openid", "profile", "email")
                .authorizationUri("https://accounts.google.com/o/oauth2/auth")
                .tokenUri("https://accounts.google.com/o/oauth2/token")
                .userInfoUri("https://www.googleapis.com/oauth2/v3/userinfo")
                .userNameAttributeName("sub")
                .clientName("Google")
                .build();
    }
    @Bean
    public AuthenticationEntryPoint myAuthenticationEntryPoint() {
        return new LoginUrlAuthenticationEntryPoint("/");
    }
    public class CustomFilterConfigurer extends AbstractHttpConfigurer<CustomFilterConfigurer, HttpSecurity> {  // (2-1)
        @Override
        public void configure(HttpSecurity builder) throws Exception {  // (2-2)
            AuthenticationManager authenticationManager = builder.getSharedObject(AuthenticationManager.class);  // (2-3)

            JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(authenticationManager, jwtTokenizer, memberRepository);  // (2-4)
            jwtAuthenticationFilter.setFilterProcessesUrl("/users/auth/login");          // (2-5)
            jwtAuthenticationFilter.setAuthenticationSuccessHandler(new MemberAuthenticationSuccessHandler());  // (3) 추가
            jwtAuthenticationFilter.setAuthenticationFailureHandler(new MemberAuthenticationFailureHandler());  // (4) 추가
            builder.addFilter(jwtAuthenticationFilter);  // (2-6)
        }
    }

}