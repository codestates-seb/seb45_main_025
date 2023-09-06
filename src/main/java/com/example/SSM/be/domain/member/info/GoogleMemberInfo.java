package com.example.SSM.be.domain.member.info;

import java.util.Map;

public class GoogleMemberInfo implements OAuth2MemberInfo{
    private Map<String, Object> attributes;



    @Override
    public String getProviderId() {
        return (String) attributes.get("id");
    }

    @Override
    public String getProvider() {
        return "google";
    }

    @Override
    public String getName() {
        return (String) attributes.get("name");
    }

    @Override
    public String getEmail() {
        return (String) attributes.get("email");
    }
}
