import { useState } from "react";
import { View, TextInput, Button, Text } from "react-native";
import axios from "axios";
import { router } from "expo-router";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onRegister = async () => {
    try {
      await axios.post("https://cloud.kit-imi.info/api/auth/register", {
        email,
        password,
      });

      router.replace("/login");
    } catch {
      setError("Ошибка регистрации");
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput placeholder="Пароль" secureTextEntry value={password} onChangeText={setPassword} />

      {error ? <Text style={{ color: "red" }}>{error}</Text> : null}

      <Button title="Создать аккаунт" onPress={onRegister} />
    </View>
  );
}
