import { useState } from "react";
import { View, TextInput, Button, Text } from "react-native";
import axios from "axios";
import { router } from "expo-router";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("");

  const onRegister = async () => {
    if (password !== confirmPassword) {
      setError("Пароли не совпадают");
      return;
    }
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
      <TextInput 
      placeholder="Подтвердить пароль" 
      secureTextEntry 
      value={confirmPassword} 
      onChangeText={setConfirmPassword} 
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

      <Button title="Создать аккаунт" onPress={onRegister} />
    </View>
  );
}
