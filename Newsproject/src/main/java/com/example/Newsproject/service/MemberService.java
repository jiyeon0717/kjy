package com.example.Newsproject.service;

import com.example.Newsproject.entity.Member;
import com.example.Newsproject.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MemberService {
    @Autowired
    private MemberRepository memberRepository;

    //회원가입
    public Member signup(Member member) {
        return memberRepository.save(member);
    }

    // 로그인 (아이디와 비번이 맞는지 확인)
    public Member login(String username, String  password) {
        Member member = memberRepository.findByUsername(username).orElse(null);
        if (member != null && member.getPassword().equals(password)) {
            return member; //로그인 성공
        }
        return null;
    }
}
