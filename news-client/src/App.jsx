import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import New from "./pages/New";
import NewsDetail from "./pages/NewsDetail";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MyPage from "./pages/MyPage";
import Edit from "./pages/Edit";
import Search from "./pages/Search";
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/new" element={<New />} />
      <Route path="/news/:id" element={<NewsDetail />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/edit/:id" element={<Edit />} />
      <Route path="/search" element={<Search />} />
    </Routes>
  );
}

export default App;