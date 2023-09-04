package com.example.SSM.be.domain.member.entity;

import com.example.SSM.be.domain.audit.Auditable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Member extends Auditable{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter
    private long userId;

    @Column(length = 100, nullable = false,unique = true)
    private String email;

    @Column(length = 100, nullable = false)
    private String name;

    @Column(length = 300)
    private String password;

    @Column
    private String gender;

    @Column
    private String phone;

    @Column
    private String birth;

    @Column
    private String address;
    @Column
    private String img;
    @Column
    private Long point = 1000000000L;

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();

    @Enumerated(EnumType.STRING)
    @Column
    private MemberStatus memberStatus = MemberStatus.MEMBER_ACTIVE;

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
