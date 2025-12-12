import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import "./Home.css"; // 디자인은 Home과 비슷하게 사용

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q"); // 주소창에서 검색어(?q=...) 가져오기
  const [articles, setArticles] = useState([]);
  const nav = useNavigate();

  // 검색어가 바뀔 때마다 실행
  useEffect(() => {
    if (query) {
      axios.get(`http://localhost:8080/api/articles/search?q=${query}`)
        .then((res) => setArticles(res.data))
        .catch((err) => console.error("검색 실패:", err));
    }
  }, [query]);

  return (
    <>
      <Header />
      <div className="home-container">
        <h2 style={{ marginTop: "30px" }}>🔍 "{query}" 검색 결과</h2>
        
        <div className="news-list-wrapper" style={{ marginTop: "20px" }}>
          {articles.length === 0 ? (
            <p className="empty-list">검색 결과가 없습니다.</p>
          ) : (
            articles.map((item) => (
              <div 
                key={item.id} 
                className="news-card" 
                onClick={() => nav(`/news/${item.id}`)}
              >
                <div className="news-content">
                    <div className="news-meta">
                      <span className="news-category">{item.category}</span>
                      <span className="news-date">{new Date(item.regDate).toLocaleDateString()}</span>
                    </div>
                    <h3 className="news-title">{item.title}</h3>
                    <p className="news-preview">
                      {item.content && item.content.length > 100 
                        ? item.content.substring(0, 100) + "..." 
                        : item.content}
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

export default Search;