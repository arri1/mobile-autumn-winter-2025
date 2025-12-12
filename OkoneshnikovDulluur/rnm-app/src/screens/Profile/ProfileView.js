import React from "react";
import { View } from "react-native";
import { Appbar, Card, Text, Button } from "react-native-paper";
import { styles } from "./ProfileStyles";

export default function ProfileView({ user, error, onReload, onLogout }) {
  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="Профиль" />
      </Appbar.Header>

      <View style={styles.container}>
        <Card style={styles.card}>
          <Card.Title title="Текущий пользователь" />
          <Card.Content>
            {error ? <Text style={styles.error}>{error}</Text> : null}

            <Text>Имя: {user?.name || "-"}</Text>
            <Text>Email: {user?.email || "-"}</Text>
            <Text>Роль: {user?.role || "-"}</Text>

            <Button mode="outlined" onPress={onReload} style={styles.mt}>
              Обновить профиль
            </Button>

            <Button mode="contained" onPress={onLogout} style={styles.mt}>
              Выйти
            </Button>
          </Card.Content>
        </Card>
      </View>
    </>
  );
}
