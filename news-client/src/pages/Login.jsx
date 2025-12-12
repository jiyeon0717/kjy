import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const nav = useNavigate();
  const [input, setInput] = useState({ username: "", password: "" });

  const onChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const onSubmit = () => {
    if (!input.username || !input.password) {
      alert("아이디와 비밀번호를 입력해주세요.");
      return;
    }

    axios.post("http://localhost:8080/api/auth/login", input)
      .then((res) => {
        alert("환영합니다! " + res.data.name + "님");
        localStorage.setItem("user", JSON.stringify(res.data));
        nav("/");
      })
      .catch(() => {
        alert("아이디 또는 비밀번호가 일치하지 않습니다.");
      });
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title"><span>News</span> 로그인</h2>
        <hr className="auth-divider" />

        <div className="input-group">
          <label className="input-label">아이디</label>
          <input 
            name="username" 
            className="auth-input" 
            onChange={onChange} 
          />
        </div>

        <div className="input-group">
          <label className="input-label">비밀번호</label>
          <input 
            /*type="password" */
            name="password" 
            className="auth-input" 
            onChange={onChange} 
          />
        </div>

        <div className="button-group">
          <button className="btn-auth btn-primary" onClick={onSubmit}>로그인</button>
          <button className="btn-auth btn-secondary" onClick={() => nav("/signup")}>회원가입</button>
        </div>
      </div>
    </div>
  );
};

export default Login;