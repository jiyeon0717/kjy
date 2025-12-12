import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./New.css"; 

const New = () => {
  const nav = useNavigate();
  const [input, setInput] = useState({ 
    title: "", 
    content: "", 
    category: "뉴스속보", // 초기값 설정
    writer: "" // 작성자 정보 추가
  });

  // 로그인 체크 및 작성자 정보 로드
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (!loggedInUser) {
        alert("기사 작성을 위해 로그인해주세요.");
        nav("/login", { replace: true });
        return;
    }
    const userData = JSON.parse(loggedInUser);
    setInput(prev => ({ ...prev, writer: userData.username })); // 작성자 ID 설정
  }, []);

  const categories = ["뉴스속보", "뉴스투데이", "사회", "경제", "스포츠"];

  const onChange = (e) => {
    // 라디오 버튼도 onChange로 처리 가능
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = () => {
    if(!input.title || !input.content) {
        alert("제목과 내용을 모두 입력해주세요.");
        return;
    }
    
    // API로 데이터 전송 (Writer 정보가 input에 포함됨)
    axios.post("http://localhost:8080/api/articles", input)
      .then(() => {
        alert("기사가 등록되었습니다.");
        nav("/", { replace: true });
      })
      .catch((err) => {
        console.error("등록 오류:", err);
        alert("기사 등록 실패.");
      });
  };

  return (
    <>
        <div className="new-container">
            <div className="new-header">
                <h2>🖊️ 기사 작성</h2>
                <button className="btn-back" onClick={() => nav(-1)}>뒤로가기</button>
            </div>
            
            <div className="new-form">
                
                

                {/* 제목 입력 */}
                <div className="input-group">
                    <label className="form-label">제목</label>
                    <input name="title" className="input-field" onChange={onChange} placeholder="기사 제목을 입력하세요" />
                </div>

                {/* 내용 입력 */}
                <div className="input-group">
                    <label className="form-label">내용</label>
                    <textarea name="content" className="input-field textarea-field" onChange={onChange} placeholder="내용을 입력하세요" />
                </div>

                {/* 카테고리 라디오 버튼 */}
                <div className="input-group">
                    <label className="form-label">카테고리 선택</label>
                    <div className="radio-list">
                        {categories.map((cat) => (
                            <label key={cat} className="radio-label">
                                <input 
                                    type="radio" 
                                    name="category" 
                                    value={cat} 
                                    onChange={onChange}
                                    checked={input.category === cat} // 현재 선택된 값 표시
                                />
                                {cat}
                            </label>
                        ))}
                    </div>
                </div>


                <div className="action-buttons">
                    <button className="btn-submit" onClick={onSubmit}>등록하기</button>
                    <button className="btn-cancel" onClick={() => nav('/')}>취소</button>
                </div>
            </div>
        </div>
    </>
  );
};

export default New;