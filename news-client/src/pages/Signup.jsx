import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

const Signup = () => {
  const nav = useNavigate();
  const [input, setInput] = useState({ username: "", password: "", name: "", email: "" });

  const onChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const onSubmit = () => {
    // 간단한 유효성 검사
    if (!input.username || !input.password || !input.name) {
        alert("모든 정보를 입력해주세요.");
        return;
    }

    axios.post("http://localhost:8080/api/auth/signup", input)
      .then(() => {
        alert("회원가입이 완료되었습니다. 로그인해주세요.");
        nav("/login");
      })
      .catch((err) => {
        console.error(err);
        alert("회원가입 중 오류가 발생했습니다.");
      });
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">회원가입</h2>
        <hr className="auth-divider" />

        <div className="input-group">
          <label className="input-label">아이디</label>
          <input name="username" className="auth-input" onChange={onChange} />
        </div>

        <div className="input-group">
          <label className="input-label">비밀번호</label>
          <input /*type="password"*/ name="password" className="auth-input" onChange={onChange} />
        </div>

        <div className="input-group">
          <label className="input-label">이름</label>
          <input name="name" className="auth-input" onChange={onChange} />
        </div>

        <div className="input-group">
          <label className="input-label">이메일</label>
          <input name="email" className="auth-input" onChange={onChange} />
        </div>

        <div className="button-group">
          <button className="btn-auth btn-primary" onClick={onSubmit}>가입하기</button>
          <button className="btn-auth btn-secondary" onClick={() => nav(-1)}>취소</button>
        </div>
      </div>
    </div>
  );
};

export default Signup;