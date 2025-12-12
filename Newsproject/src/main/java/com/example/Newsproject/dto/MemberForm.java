package com.example.Newsproject.dto;

import com.example.Newsproject.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class MemberForm {
    private String username;
    private String password;
    private String name;
    private String email;

    public Member toEntity() {
        return new Member(null, username, password, email, name);
    }
}
