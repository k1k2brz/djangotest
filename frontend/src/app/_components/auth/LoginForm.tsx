"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Input from "../common/Input";
import { getCookie } from "@/app/_utils/cookie";
import Button from "../common/Button";
import { useAuthStore } from "@/app/_store/useAuthStore";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const login = useAuthStore((state) => state.login);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn, router]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8000/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": getCookie("csrftoken"),
        },
        credentials: "include",
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        throw new Error("로그인 실패");
      }

      alert("로그인 성공");
      login()
      router.push("/");
    } catch (error) {
      console.error(error);
      alert(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-lg shadow-md p-8 max-w-lg mx-auto"
    >
      <h2 className="text-2xl font-bold text-center mb-6">로그인</h2>

      <div className="mb-4">
        <Input
          id="로그인"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="사용자명"
        />
      </div>

      <div className="mb-6">
        <Input
          id="비밀번호"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호"
        />
      </div>

      <Button type="submit">로그인</Button>
    </form>
  );
}
