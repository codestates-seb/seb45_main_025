package com.example.SSM.be.domain.board.config;


import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class BoardWebConfig implements WebMvcConfigurer {
    private String resourcePath = "/upload/**";
    private String savePath = "C:/Users/yoongunyong/Desktop/images/";

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry){
        registry.addResourceHandler(resourcePath)
                .addResourceLocations(savePath);
    }

}
