import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import "./MyPage.css"; // ★ CSS 파일 연결

const MyPage = () => {
  const [myArticles, setMyArticles] = useState([]);
  const [user, setUser] = useState(null);
  const nav = useNavigate();

  // 1. 초기 로드 및 내 기사 가져오기
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (!loggedInUser) {
      alert("로그인이 필요합니다.");
      nav("/login");
      return;
    }
    const userData = JSON.parse(loggedInUser);
    setUser(userData);

    // 내 기사 조회 API 호출: /api/articles/my?writer={아이디}
    axios.get(`http://localhost:8080/api/articles/my?writer=${userData.username}`)
      .then((res) => setMyArticles(res.data))
      .catch((err) => console.error("내 기사 로드 실패:", err));
  }, [nav]);

  // 2. 기사 삭제 처리
  const handleDelete = (id) => {
    if(window.confirm("정말 이 기사를 삭제하시겠습니까?")) {
        // 삭제 API 호출 (DELETE)
        axios.delete(`http://localhost:8080/api/articles/${id}`)
            .then(() => {
                alert("기사가 삭제되었습니다.");
                // 화면에서도 삭제된 기사 제거하여 리스트 갱신
                setMyArticles(myArticles.filter(art => art.id !== id)); 
            })
            .catch(() => alert("삭제에 실패했습니다."));
    }
  }
  
  // 3. 수정 페이지로 이동 (수정 기능은 edit/:id 주소를 만들어야 작동합니다.)
  const goToEdit = (id) => {
      nav(`/edit/${id}`);
  }

  return (
    <>
      <Header />
      <div className="mypage-container">
        <h2 className="mypage-title">👤 마이페이지</h2>
        <p className="user-info-text">환영합니다, <strong>{user?.name}</strong>님! ({user?.username})</p>
        
        <h3 className="list-header"> 내가 쓴 기사 관리</h3>
        
        <div className="article-list">
            {myArticles.length === 0 ? (
                <p className="no-articles-message">작성하신 기사가 없습니다.</p>
            ) : (
                myArticles.map((item) => (
                    <div key={item.id} className="article-item">
                        {/* 기사 제목 및 정보 (클릭 시 상세 페이지로 이동) */}
                        <div onClick={() => nav(`/news/${item.id}`)} className="article-link-section">
                            <h4>{item.title}</h4>
                            <span className="date-info">{item.category} | {new Date(item.regDate).toLocaleDateString()}</span>
                        </div>
                        
                        {/* 수정 / 삭제 버튼 */}
                        <div className="action-btns">
                            <button onClick={() => goToEdit(item.id)} className="btn-edit">수정</button>
                            <button onClick={() => handleDelete(item.id)} className="btn-delete">삭제</button>
                        </div>
                    </div>
                ))
            )}
        </div>
      </div>
    </>
  );
};

export default MyPage;