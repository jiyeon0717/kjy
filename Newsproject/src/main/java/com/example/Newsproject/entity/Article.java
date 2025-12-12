package com.example.Newsproject.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Article {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) //번호 자동 증가
    private Long id;

    @Column(nullable = false)
    private String title; //제목

    @Column(columnDefinition = "TEXT")
    private String content; //내용

    private String category; //카테고리
    
    private String writer; //작성자(아이디)저장

    private LocalDateTime regDate = LocalDateTime.now(); //작성 시간
}
