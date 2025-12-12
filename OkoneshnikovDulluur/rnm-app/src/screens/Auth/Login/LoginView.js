import React from "react";
import { View } from "react-native";
import { Appbar, Card, Text, TextInput, Button } from "react-native-paper";
import { styles } from "./LoginStyles";

export default function LoginView({
  email,
  password,
  onChangeEmail,
  onChangePassword,
  onSubmit,
  isLoading,
  error,
  onGoRegister,
}) {
  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="Вход" />
      </Appbar.Header>

      <View style={styles.container}>
        <Card style={styles.card}>
          <Card.Content>
            <TextInput
              label="Email"
              mode="outlined"
              value={email}
              onChangeText={onChangeEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
            <TextInput
              label="Пароль"
              mode="outlined"
              value={password}
              onChangeText={onChangePassword}
              secureTextEntry
              style={styles.mt}
            />

            {error ? <Text style={styles.error}>{error}</Text> : null}

            <Button
              mode="contained"
              onPress={onSubmit}
              loading={isLoading}
              disabled={isLoading}
              style={styles.mt}
            >
              Войти
            </Button>

            <Button onPress={onGoRegister} style={styles.mtSmall}>
              Регистрация
            </Button>
          </Card.Content>
        </Card>
      </View>
    </>
  );
}
