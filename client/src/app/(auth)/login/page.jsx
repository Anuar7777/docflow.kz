"use client";

import Link from "next/link";
import AuthForm from "@/components/AuthForm";

export default function LoginPage() {
  const handleLogin = (data) => {
    console.log("Login: ", data);
  };

  return (
    <AuthForm
      title="Вход"
      submitText="ВОЙТИ"
      onSubmit={handleLogin}
      fields={[
        { name: "email", type: "email", placeholder: "Email" },
        { name: "password", type: "password", placeholder: "Пароль" },
      ]}
      footers={[
        { href: "/forgot-password", text: "Забыли пароль?" },
        { href: "/register", text: "Создать аккаунт" },
      ]}
    />
  );
}
