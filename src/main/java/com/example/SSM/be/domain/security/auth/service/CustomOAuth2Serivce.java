package com.example.SSM.be.domain.security.auth.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class CustomOAuth2Serivce implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {
    @Autowired
    private OAuth2AuthorizedClientService authorizedClientService;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) {
        OAuth2User oauth2User = new DefaultOAuth2UserService().loadUser(userRequest);
        OAuth2AuthorizedClient authorizedClient = new OAuth2AuthorizedClient(
                userRequest.getClientRegistration(),
                oauth2User.getName(),
                userRequest.getAccessToken()
        );
        authorizedClientService.saveAuthorizedClient(authorizedClient, (Authentication) oauth2User);
        return oauth2User;
    }
}
