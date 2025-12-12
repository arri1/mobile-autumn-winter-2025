import React from "react";
import { View } from "react-native";
import { Appbar, Card, Text, TextInput, Button } from "react-native-paper";
import { styles } from "./RegisterStyles";

export default function RegisterView({
  name,
  email,
  password,
  onChangeName,
  onChangeEmail,
  onChangePassword,
  onSubmit,
  isLoading,
  error,
  onGoLogin,
}) {
  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={onGoLogin} />
        <Appbar.Content title="Регистрация" />
      </Appbar.Header>

      <View style={styles.container}>
        <Card style={styles.card}>
          <Card.Content>
            <TextInput label="Имя" mode="outlined" value={name} onChangeText={onChangeName} />
            <TextInput
              label="Email"
              mode="outlined"
              value={email}
              onChangeText={onChangeEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              style={styles.mt}
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
              Создать аккаунт
            </Button>

            <Button onPress={onGoLogin} style={styles.mtSmall}>
              Назад к входу
            </Button>
          </Card.Content>
        </Card>
      </View>
    </>
  );
}
