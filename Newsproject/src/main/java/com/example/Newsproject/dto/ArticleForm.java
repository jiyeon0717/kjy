package com.example.Newsproject.dto;

import com.example.Newsproject.entity.Article;
import lombok.*;
import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class ArticleForm {
    private String title;
    private String content;
    private String category;
    private String writer;

    // DTO -> Entity 변환 메서드
    public Article toEntity() {
        // [수정] 마지막에 null 대신 LocalDateTime.now()를 넣어야 현재 시간이 저장됩니다.
        // 순서: id(null), title, content, category, writer, regDate(현재시간)
        return new Article(null, title, content, category, writer, LocalDateTime.now());
    }
}
