import React, { useState } from "react";
import RegisterView from "./RegisterView";
import { useAuthStore } from "@/store/authStore";

export default function RegisterContainer({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = useAuthStore((s) => s.register);
  const isLoading = useAuthStore((s) => s.isLoading);
  const error = useAuthStore((s) => s.error);

  const onSubmit = () => register({ name: name.trim(), email: email.trim(), password });

  return (
    <RegisterView
      name={name}
      email={email}
      password={password}
      onChangeName={setName}
      onChangeEmail={setEmail}
      onChangePassword={setPassword}
      onSubmit={onSubmit}
      isLoading={isLoading}
      error={error}
      onGoLogin={() => navigation.navigate("Login")}
    />
  );
}
