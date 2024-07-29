import React, { useEffect, useState } from "react";
import { auth } from "../firebase/fbinstance";

export default function Workspace() {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const idToken = await auth.currentUser.getIdToken();
        const response = await fetch("http://localhost:8000/workspace", {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        });

        if (response.ok) {
          const docs = await response.json();
          setDocuments(docs);
        } else {
          console.error("문서 목록 로드 실패");
        }
      } catch (error) {
        console.error("문서 목록 로드 중 오류 발생:", error);
      }
    };

    fetchDocuments();
  }, []);

  return (
    <div>
      <a href="/new">새 문서 생성하기</a>
      <h1>문서 목록</h1>
      <ul>
        {documents.map((doc) => (
          <li key={doc._id}>
            <a href={`/document/${doc._id}`}>
              {doc.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
