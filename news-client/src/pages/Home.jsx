import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import "./Home.css";

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [category, setCategory] = useState("전체"); 
  const nav = useNavigate();
  
  // 기획서에 명시된 5개 대분류 카테고리
  const categories = ["전체", "뉴스속보", "뉴스투데이", "사회", "경제", "스포츠"];

  useEffect(() => {
    // 카테고리 필터링 기능 (기획서 기능 1번)
    const url = category === "전체" 
      ? "http://localhost:8080/api/articles" 
      : `http://localhost:8080/api/articles?category=${category}`;

    axios.get(url)
      .then((res) => setArticles(res.data))
      .catch((err) => console.error("뉴스 로딩 실패:", err));
  }, [category]); 

  return (
    <>
      <Header /> {/* 헤더 (로그인/검색 버튼 분기) */}
      <div className="home-container">

        {/* 1. 카테고리 탭 (GNB) - 기획서 기능 */}
        <nav className="category-nav">
          {categories.map((cat) => (
            <button 
              key={cat} 
              className={category === cat ? "cat-btn active" : "cat-btn"}
              onClick={() => setCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </nav>
        
        {/* 2. 뉴스 리스트 영역 (헤드라인, 추천 뉴스) */}
        <div className="news-list-wrapper">
          
          {articles.length === 0 ? (
            <p className="empty-list">등록된 기사가 없습니다.</p>
          ) : (
            articles.map((item, index) => (
              /* 첫 번째 기사를 대형 썸네일(메인 헤드라인)로 표시 (기획서 기능 1번) */
              <div 
                key={item.id} 
                className={`news-card ${index === 0 ? 'hero-card' : ''}`} 
                onClick={() => nav(`/news/${item.id}`)}
              >
                {/*  */}
                <div className="news-content">
                    <div className="news-meta">
                      <span className="news-category">{item.category || "일반"}</span>
                      <span className="news-date">{new Date(item.regDate).toLocaleDateString()}</span>
                    </div>
                    <h3 className="news-title">{item.title}</h3>
                    <p className="news-preview">
                      {item.content ? (item.content.length > 150 ? item.content.substring(0, 150) + "..." : item.content) : "내용 없음"}
                    </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Home;