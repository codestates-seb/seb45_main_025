package com.example.SSM.be.domain.member.entity;

import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Member implements UserDetails, OAuth2User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter
    private long userId;

    @Column(length = 100, nullable = false,unique = true)
    @NotNull
    private String email;

    @Column(length = 100, nullable = false)
    @NotNull
    private String username;

    @Column(length = 300, nullable = false)
    @NotNull
    private String password;

    @Column(nullable = false)
    @NotNull
    private String gender;

    @Column(nullable = false)
    @NotNull
    private String phone;

    @Column(nullable = false)
    @NotNull
    private String nick;

    @Column(nullable = false)
    @CreationTimestamp
    private LocalDateTime createdAt;

    @Setter(AccessLevel.NONE)
    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();

    @Enumerated(EnumType.STRING)
    @Column
    private MemberStatus memberStatus = MemberStatus.MEMBER_ACTIVE;


    public void setRoles(String email){
        if(email.equals("admin@naver.com")){   //관리자 계정 이메일 넣으면 됨.
            roles.add("USER");
            roles.add("ADMIN");
        }
        roles.add("USER");
    }

    @Override
    public <A> A getAttribute(String name) {
        return OAuth2User.super.getAttribute(name);
    }

    @Override
    public Map<String, Object> getAttributes() {
        return null;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public boolean isAccountNonExpired() {
        return false;
    }

    @Override
    public boolean isAccountNonLocked() {
        return false;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return false;
    }

    @Override
    public boolean isEnabled() {
        return false;
    }

    @Override
    public String getName() {
        return null;
    }

    public enum MemberStatus{
        MEMBER_ACTIVE("활동중"),
        MEMBER_SLEEP("휴면계정"),
        MEMBER_EXIT("회원탈퇴");

        @Getter
        private final String status;

        MemberStatus(String status){
            this.status = status;
        }
    }
}
