package com.example.Newsproject.service;

import com.example.Newsproject.dto.ArticleForm;
import com.example.Newsproject.entity.Article;
import com.example.Newsproject.repository.ArticleRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ArticleService {
    @Autowired
    private ArticleRepository articleRepository;

    // 뉴스 조회 카테고리
    public List<Article> index(String category) {
        if (category != null && !category.isEmpty()) {
            return articleRepository.findByCategory(category);
        }
        return articleRepository.findAll();
    }

    // 검색 기능
    public List<Article> search(String keyword) {
        return articleRepository.findByTitleContaining(keyword);
    }

    // 마이페이지 (내 글 조회)
    public List<Article> myArticles(String writer) {
        return articleRepository.findByWriter(writer);
    }

    // 뉴스 등록
    public Article create(Article article) {
        return articleRepository.save(article);
    }

    // 뉴스 상세 조회
    public Article show(Long id) {
        return articleRepository.findById(id).orElse(null);
    }

    // 삭제 기능
    public void delete(Long id) {
        articleRepository.deleteById(id);
    }

    // 수정 기능
    @Transactional
    public Article update(Long id, ArticleForm dto) {
        Article target = articleRepository.findById(id).orElse(null);
        if (target != null) {
            target.setTitle(dto.getTitle());
            target.setContent(dto.getContent());
            target.setCategory(dto.getCategory());
            // 작성자(writer)는 수정하지 않음
            return articleRepository.save(target);
        }
        return null;
    }
}
