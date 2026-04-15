import { useState } from "react";
import { View, TextInput, Button, Text } from "react-native";
import axios from "axios";
import { useAuthStore } from "./store";

export default function Login() {
  const login = useAuthStore((s) => s.login);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onLogin = async () => {
    try {
      const res = await axios.post("https://cloud.kit-imi.info/api/auth/login", {
        email,
        password,
      });

      console.log("SERVER RESPONSE:", res.data);
      const token = res.data?.data?.accessToken;

      await login(token);
    } catch (e) {
      console.log(e);
      setError("Ошибка входа");
    }
  };

  return (
    <View style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}>
      <TextInput 
      placeholder="Email" 
      value={email} 
      onChangeText={setEmail} 
      style={{
        width: "100%",
        borderWidth: 1,
        borderColor: "#999",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 14,
        fontSize: 16,
        marginBottom: 12,
  }}/>
      <TextInput 
      placeholder="Пароль" 
      secureTextEntry 
      value={password} 
      onChangeText={setPassword} 
      style={{
        width: "100%",
        borderWidth: 1,
        borderColor: "#999",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 14,
        fontSize: 16,
        marginBottom: 12,
  }}/>

      {error ? <Text style={{ color: "red" }}>{error}</Text> : null}
      <View style={{gap: 10}}>
      <Button title="Войти" onPress={onLogin} />
      <Button title="Регистрация" onPress={() => {
        const { router } = require("expo-router");
        router.push("/register");
      }} />
      </View>
    </View>
  );
}
