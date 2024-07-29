import React from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase/fbinstance";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const navigate = useNavigate();

  const onSocialClick = async function (e) {
    const provider = new GoogleAuthProvider();
    provider.addScope("profile");
    provider.addScope("email");

    try {
      const user = await signInWithPopup(auth, provider);

      const idToken = await user.user.getIdToken();

      const response = await fetch("http://localhost:8000/verifyToken", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: idToken }),
        mode: "cors"
      });

      if (response.ok) {
        const result = await response.json();
        console.log("토큰 인증됨", result.uid);
        navigate("/workspace")
      } else {
        console.log("토큰 인증 실패");
      }
    } catch (err) {
      console.error("토큰 인증 에러", err);
    }
  }
  return (
    <div>
      <button onClick={onSocialClick} name="google">구글 계정으로 로그인</button>
    </div>
  );
}
