package com.example.Newsproject.api;

import com.example.Newsproject.dto.ArticleForm;
import com.example.Newsproject.entity.Article;
import com.example.Newsproject.service.ArticleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.List;

@RestController // 화면 대신 JSON 데이터를 돌려줌
@RequestMapping("/api/articles")
@CrossOrigin(origins = "http://localhost:5173") // 리액트(5173 포트)의 접속을 허용
public class ArticleApiController {
    @Autowired
    private ArticleService articleService;

    // 목록 조회: GET /api/articles (또는 ?category=사회)
    @GetMapping
    public List<Article> index(@RequestParam(required = false) String category) {
        return articleService.index(category);
    }

    // 검색 조회 (GET /api/articles/search?q=검색어)
    @GetMapping("/search")
    public List<Article> search(@RequestParam String q) {
        return articleService.search(q);
    }

    // 내 글 조회 (GET /api/articles/my?writer=작성자)
    @GetMapping("/my")
    public List<Article> myArticles(@RequestParam String writer) {
        return articleService.myArticles(writer);
    }

    // 상세: GET /api/articles/1
    @GetMapping("/{id}")
    public Article show(@PathVariable Long id) {
        return articleService.show(id);
    }

    // 등록: POST /api/articles
    @PostMapping
    public Article create(@RequestBody ArticleForm dto) {
        // 1. DTO를 Entity로 변환
        Article article = dto.toEntity();
        // 2. 서비스에 Entity 전달
        return articleService.create(article);
    }

    // 글 삭제 (DELETE /api/articles/{id})
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) { articleService.delete(id); }

    // 글 수정 (PATCH 또는 PUT)
    @PatchMapping("/{id}")
    public ResponseEntity<Article> update(@PathVariable Long id, @RequestBody ArticleForm dto) {
        Article updated = articleService.update(id, dto);
        return (updated != null) ? ResponseEntity.ok(updated) : ResponseEntity.badRequest().build();
    }
}
