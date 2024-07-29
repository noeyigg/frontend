import React, { useState } from "react";
import { auth } from "../firebase/fbinstance";
import { useNavigate } from "react-router-dom";

export default function New() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const idToken = await auth.currentUser.getIdToken();

      const response = await fetch("http://localhost:8000/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
          idToken,
        }),
      });

      if (response.ok) {
        navigate("/workspace");
      } else {
        console.error("문서 저장 실패");
      }
    } catch (error) {
      console.error("문서 저장 중 오류 발생:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <p>제목</p>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <p>내용</p>
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit">저장</button>
      </form>
    </div>
  );
}
