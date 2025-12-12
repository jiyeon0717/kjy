import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./New.css"; // 스타일은 작성 페이지(New.css)와 공유

const Edit = () => {
  const { id } = useParams();
  const nav = useNavigate();
  const [input, setInput] = useState({ 
    title: "", 
    content: "", 
    category: "뉴스속보", 
    writer: "" 
  });

  const categories = ["뉴스속보", "뉴스투데이", "사회", "경제", "스포츠"];

  // 1. 기존 데이터 불러오기
  useEffect(() => {
    axios.get(`http://localhost:8080/api/articles/${id}`)
      .then(res => {
        setInput({
            title: res.data.title,
            content: res.data.content,
            category: res.data.category,
            writer: res.data.writer
        });
      })
      .catch(err => console.error(err));
  }, [id]);

  const onChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const onSubmit = () => {
    // 2. 수정 요청 보내기 (PATCH)
    axios.patch(`http://localhost:8080/api/articles/${id}`, input)
      .then(() => {
        alert("수정되었습니다.");
        nav(`/mypage`); // 수정 후 마이페이지로 이동
      })
      .catch((err) => {
        console.error("수정 오류:", err);
        alert("수정 실패.");
      });
  };

  return (
    <div className="new-container">
        <h2>✏️ 기사 수정</h2>
        <div className="new-form">
            <div className="input-group">
                <label className="form-label">제목</label>
                <input name="title" className="input-field" value={input.title} onChange={onChange} />
            </div>
            <div className="input-group">
                <label className="form-label">내용</label>
                <textarea name="content" className="input-field textarea-field" value={input.content} onChange={onChange} />
            </div>
            <div className="input-group">
                <label className="form-label">카테고리</label>
                <div className="radio-list">
                    {categories.map((cat) => (
                        <label key={cat} className="radio-label">
                            <input 
                                type="radio" name="category" value={cat} 
                                onChange={onChange} checked={input.category === cat} 
                            />
                            {cat}
                        </label>
                    ))}
                </div>
            </div>
            <div className="action-buttons">
                <button className="btn-submit" onClick={onSubmit}>수정 완료</button>
                <button className="btn-cancel" onClick={() => nav(-1)}>취소</button>
            </div>
        </div>
    </div>
  );
};

export default Edit;