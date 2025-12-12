import React, { useState } from "react";
import LoginView from "./LoginView";
import { useAuthStore } from "@/store/authStore";

export default function LoginContainer({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = useAuthStore((s) => s.login);
  const isLoading = useAuthStore((s) => s.isLoading);
  const error = useAuthStore((s) => s.error);

  const onSubmit = () => login({ email: email.trim(), password });

  return (
    <LoginView
      email={email}
      password={password}
      onChangeEmail={setEmail}
      onChangePassword={setPassword}
      onSubmit={onSubmit}
      isLoading={isLoading}
      error={error}
      onGoRegister={() => navigation.navigate("Register")}
    />
  );
}
