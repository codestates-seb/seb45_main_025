package com.example.SSM.be.domain.security.config;

import com.example.SSM.be.domain.security.tokenblacklist.interceptor.BlacklistInterceptor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.List;

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
    @Override
    public void addArgumentResolvers(List<HandlerMethodArgumentResolver> resolvers) {
        resolvers.add(new LoginMemberIdResolver());
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry
                .addMapping("/**")
                .allowedOrigins("*")
                .allowedMethods("*");
    }
}