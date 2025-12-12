import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Header.css"; // 스타일 파일 연결

const Header = () => {
  const nav = useNavigate();
  const [user, setUser] = useState(null);       // 로그인 사용자 정보 (null 또는 객체)
  const [keyword, setKeyword] = useState("");   // 검색어 상태 관리

  // 1. 컴포넌트 마운트 시 (화면 뜰 때) 로그인 정보 확인
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser)); // 로컬 저장소 정보로 user 상태 업데이트
    }
  }, []);

  // 2. 로그아웃 처리
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    alert("로그아웃 되었습니다.");
    nav("/"); // 로그아웃 후 홈으로 이동
  };

  // 3. 검색 처리 (Enter 키 또는 버튼 클릭 시)
  const handleSearch = () => {
    if(keyword.trim()) {
        // 검색어를 쿼리 파라미터로 Search 페이지에 전달
        nav(`/search?q=${keyword}`); 
    } else {
        alert("검색어를 입력해주세요.");
    }
  };

  return (
    <header className="header-container">
      {/* 1. 로고 영역 */}
      <div className="header-left">
        {/* 로고 클릭 시 홈으로 이동 (새로고침) */}
        <h1 className="logo" onClick={() => nav("/")}>
          News <span>뉴스</span>
        </h1>
      </div>
      
      {/* 2. 검색 영역 */}
      <div className="header-center">
        <input 
          className="search-bar" 
          placeholder="검색어를 입력해주세요" 
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          // Enter 키 입력 시 검색 함수 호출
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button className="search-btn" onClick={handleSearch}>🔍</button>
      </div>

      {/* 3. 우측 메뉴 (회원/비회원 분기) */}
      <div className="header-right">
        {user ? (
          /* [회원 모드] - 마이페이지, 글쓰기, 로그아웃 */
          <div className="member-menu">
            <span className="user-name">{user.name}님</span>
            <button className="btn btn-mypage" onClick={() => nav("/mypage")}>마이페이지</button>
            <button className="btn btn-write" onClick={() => nav("/new")}>글쓰기</button>
            <button className="btn btn-logout" onClick={handleLogout}>로그아웃</button>
          </div>
        ) : (
          /* [비회원 모드] - 로그인 버튼 */
          <button className="btn btn-login" onClick={() => nav("/login")}>로그인</button>
        )}
      </div>
    </header>
  );
};

export default Header;