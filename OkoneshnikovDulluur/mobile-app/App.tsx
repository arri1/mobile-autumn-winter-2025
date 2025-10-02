import React from "react";
import { Text, View, Button, StyleSheet } from "react-native";
import { useState, render } from "./myReact";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Счётчик: {count}</Text>
      <Button title="Увеличить" onPress={() => setCount(count + 1)} />
    </View>
  );
}

export default function App() {
  const [Component, setComponent] = React.useState(<></>);

  React.useEffect(() => {
    render(() => setComponent(<Counter />));
  }, []);

  return Component;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
  },
});
