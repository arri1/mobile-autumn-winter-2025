import React from "react";

import { Text, View, StyleSheet, Pressable } from "react-native";
import { useState, useEffect, useMemo, render } from "./myReact";

import { Provider, useDispatch, useSelector } from "react-redux";
import { store, inc, reset, RootState, AppDispatch } from "./store";

// Локальный счётчик на мини-хуках + useEffect/useMemo
function CounterMini() {
  const [count, setCount] = useState(0);

  // "Дорогая" вычислялка мемоизируется
  const squared = useMemo(() => {
    // здесь могла быть тяжёлая функция
    return count * count;
  }, [count]);

  // Сайд-эффект при изменении count (с cleanup)
  useEffect(() => {
    console.log("count changed ->", count);
    return () => console.log("cleanup for count", count);
  }, [count]);

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Мини-hooks</Text>
      <Text style={styles.text}>Счётчик: {count}</Text>
      <Text style={styles.note}>Квадрат (useMemo): {squared}</Text>

      <Pressable style={styles.button} onPress={() => setCount((c) => c + 1)}>
        <Text style={styles.buttonText}>Увеличить</Text>
      </Pressable>
    </View>
  );
}

export default function App() {
  const [element, setElement] = React.useState<JSX.Element>(<></>);

  React.useEffect(() => {
    render(() => (
      <View style={styles.container}>
        <CounterMini />
      </View>
    ), setElement);
  }, []);

  return element;
}

// Компонент на Redux:
function CounterRedux() {
  const value = useSelector((s: RootState) => s.counter.value);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <View style={{ ...styles.card, marginTop: 16 }}>
      <Text style={styles.title}>Redux Toolkit</Text>
      <Text style={styles.text}>Значение: {value}</Text>

      <Pressable style={styles.button} onPress={() => dispatch(inc())}>
        <Text style={styles.buttonText}>+1 (Redux)</Text>
      </Pressable>

      <Pressable
        style={[styles.button, { marginTop: 8 }]}
        onPress={() => dispatch(reset())}
      >
        <Text style={styles.buttonText}>Сброс</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
  },
  card: {
    width: "90%",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#eee",
    gap: 10,
    alignItems: "center",
  },
  title: { fontSize: 20, fontWeight: "600", color: "#111" },
  text: { fontSize: 24, color: "#111" },
  note: { fontSize: 14, color: "#444" },
  button: {
    backgroundColor: "#000",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 20,
  },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});


