package com.example.SSM.be.global.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.oauth2.client.CommonOAuth2Provider;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.oauth2.client.registration.InMemoryClientRegistrationRepository;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.LoginUrlAuthenticationEntryPoint;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;

import static org.springframework.security.config.Customizer.withDefaults;

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

//    @Bean
//    public LogoutSuccessHandler logoutSuccessHandler() {
//        // ... 로그아웃 성공 핸들러 설정 ...
//        return new
//    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf().disable()  // CSRF 보호 비활성화
                .authorizeRequests()
                    .antMatchers("/h2-console/**").permitAll()
                    .antMatchers("/mypage/**").hasAnyRole("USER", "ADMIN")
                    .anyRequest().permitAll()
                .and()
                    .csrf().disable() // Disable CSRF for H2 Console
                    .headers().frameOptions().disable() // Disable X-Frame-Options for H2 Console
                .and()
                .formLogin().disable()
                .httpBasic().disable();
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
//    @Override
//    protected void configure(HttpSecurity http) throws Exception {
//        http
//                .csrf().disable()  // CSRF 보호 비활성화
//                    .authorizeRequests()
//                    .antMatchers("/**").permitAll()  // 특정 경로는 인증 없이 접근 허용
//                    .anyRequest().authenticated()
//                .and()
//                    .httpBasic()
//                .and()
//                .oauth2Login(withDefaults())
//                .logout()
//                    .logoutSuccessUrl("/")
//                    .permitAll();
//    }
}