import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./NewsDetail.css";

const NewsDetail = () => {
    const { id } = useParams();
    const nav = useNavigate();
    const [article, setArticle] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/articles/${id}`)
            .then(res => setArticle(res.data))
            .catch(err => console.log(err));
    }, [id]);

    if (!article) return <div>로딩중...</div>;

    return (
        <div className="detail-container">
            <button className="btn-back" onClick={() => nav(-1)}> &lt; 뒤로가기</button>
            
            <div className="detail-header">
              <h1 className="detail-title">{article.title}</h1>
              <p className="detail-info">
                {article.category} | {new Date(article.regDate).toLocaleDateString()}
              </p>
            </div>
            
            <hr className="divider" />
            
            <div className="detail-content">
                {article.content}
            </div>
        </div>
    );
};

export default NewsDetail;