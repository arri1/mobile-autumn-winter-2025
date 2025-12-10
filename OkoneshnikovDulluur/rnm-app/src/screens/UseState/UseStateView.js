import React from "react";
import { View } from "react-native";
import {
  Appbar,
  Button,
  Text,
  TextInput,
  Card,
} from "react-native-paper";
import { styles } from "@/screens/UseState/UseStateStyles";

export default function UseStateView({
  navigation,
  count,
  name,
  onChangeName,
  onIncrement,
  onReset,
}) {
  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="useState демо" />
      </Appbar.Header>

      <View style={styles.container}>
        <Card style={styles.card}>
          <Card.Title title="Счётчик" />
          <Card.Content>
            <Text>Текущее значение: {count}</Text>
            <View style={styles.row}>
              <Button mode="contained" style={styles.button} onPress={onIncrement}>
                +1
              </Button>
              <Button mode="outlined" onPress={onReset}>
                Сбросить
              </Button>
            </View>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Title title="Имя" />
          <Card.Content>
            <TextInput
              label="Ваше имя"
              mode="outlined"
              value={name}
              onChangeText={onChangeName}
            />
            <Text style={styles.text}>Привет, {name || "Гость"}!</Text>
          </Card.Content>
        </Card>
      </View>
    </>
  );
}
