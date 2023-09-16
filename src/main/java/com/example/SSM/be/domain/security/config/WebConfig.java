package com.example.SSM.be.domain.security.config;

import com.example.SSM.be.domain.security.tokenblacklist.interceptor.BlacklistInterceptor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    private final BlacklistInterceptor blacklistInterceptor;

    public WebConfig(BlacklistInterceptor blacklistInterceptor) {
        this.blacklistInterceptor = blacklistInterceptor;
    }
    /*인터셉터 등록*/
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(blacklistInterceptor);
    }
}