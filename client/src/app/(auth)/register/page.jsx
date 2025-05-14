"use client";

import AuthForm from "@/components/AuthForm";

export default function RegisterPage() {
  const handleRegister = (data) => {
    console.log("Register: ", data);
  };

  return (
    <AuthForm
      title="Регистрация"
      submitText="ЗАРЕГИСТРИРОВАТЬСЯ"
      onSubmit={handleRegister}
      fields={[
        {
          type: "group",
          fields: [
            { name: "name", type: "text", placeholder: "Имя" },
            { name: "surname", type: "text", placeholder: "Фамилия" },
          ],
        },
        { name: "phone", type: "tel", placeholder: "Телефон" },
        { name: "email", type: "email", placeholder: "Почта" },
        { name: "password", type: "password", placeholder: "Пароль" },
      ]}
      footers={[{ href: "/login", text: "Уже имеется аккаунт? Войти" }]}
    />
  );
}
