package com.example.SSM.be;

import com.example.SSM.be.domain.security.auth.dto.TokenPrincipalDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class TestController {
    @Autowired
    private OAuth2AuthorizedClientService authorizedClientService;
    @GetMapping("/")
    public String index(){
        return "index";
    }
    @ResponseBody
    @GetMapping("/admin")
    public String admin(){
        return "admin";
    }
    @ResponseBody
    @GetMapping("/manager")
    public String manager(){
        return "manager";
    }

    @GetMapping("/login")
    public String login(){
        return "loginForm";
    }
    @ResponseBody
    @GetMapping("/join")
    public String join(){
        return "join";
    }

    @GetMapping("/joinProc")
    public @ResponseBody String joinProc(){
        return "회원가입 완료";
    }

    @GetMapping("/OauthSIgnupForm")
    public String OauthSIgnupForm(){
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        TokenPrincipalDto member = (TokenPrincipalDto) principal;
        System.out.println(member.getEmail());
        return "OauthSIgnupForm";
    }
    @GetMapping("/user")
    public String user(@AuthenticationPrincipal OAuth2User principal, Model model) {
        model.addAttribute("name", principal.getAttribute("name"));
        model.addAttribute("email", principal.getAttribute("email"));// Add access token to the model
        return "user";
    }
}
