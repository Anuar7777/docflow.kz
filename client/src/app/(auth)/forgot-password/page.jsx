"use client";

import AuthForm from "@/components/AuthForm";

export default function ForgotPasswordPage() {
  const handleForgotPassword = (data) => {
    console.log("Forgot Password: ", data);
  };

  return (
    <AuthForm
      title="Восстановление"
      submitText="ОТПРАВИТЬ КОД"
      onSubmit={handleForgotPassword}
      fields={[{ name: "email", type: "email", placeholder: "Email" }]}
      footers={[{ href: "/login", text: "Вернуться к входу" }]}
    />
  );
}
