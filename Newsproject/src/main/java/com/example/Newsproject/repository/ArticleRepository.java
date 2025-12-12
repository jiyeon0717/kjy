package com.example.Newsproject.repository;

import com.example.Newsproject.entity.Article;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ArticleRepository extends JpaRepository<Article, Long> {
    // 특정 카테고리의 뉴스만 가져오는 기능 추가
    List<Article> findByCategory(String category);
    List<Article> findByTitleContaining(String keyword); //제목 검색
    List<Article> findByWriter(String writer);           //내 기사 조회
}
