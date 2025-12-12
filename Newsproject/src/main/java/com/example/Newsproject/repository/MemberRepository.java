package com.example.Newsproject.repository;

import com.example.Newsproject.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
    // 로그인할 때 아이디로 회원을 찾기 위해 필요
    Optional<Member> findByUsername(String username);
}
