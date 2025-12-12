package com.example.Newsproject.api;

import com.example.Newsproject.dto.MemberForm;
import com.example.Newsproject.entity.Member;
import com.example.Newsproject.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173" ) // 리액트 허용
public class MemberApiController {

    @Autowired
    private MemberService memberService;

    // 회원가입 요청
    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody MemberForm dto) {
        Member member = dto.toEntity();
        memberService.signup(member);
        return ResponseEntity.ok("회원가입 성공");
    }

    // 로그인 요청
    @PostMapping("/login")
    public ResponseEntity<Member> login(@RequestBody MemberForm dto) {
        Member member = memberService.login(dto.getUsername(), dto.getPassword());
        if (member != null) {
            return ResponseEntity.ok(member); // 성공하면 회원 정보 돌려줌
        } else{
            return ResponseEntity.status(401).build(); // 실패하면 401 에러
        }
    }
}
