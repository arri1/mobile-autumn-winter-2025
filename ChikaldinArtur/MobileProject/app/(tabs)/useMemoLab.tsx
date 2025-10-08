import React, { useState, useMemo } from "react";
import { View, Text, Button } from "react-native";

export default function StatsExample() {
  const [numbers, setNumbers] = useState<number[]>([10, 20, 30]);

  const average = useMemo(() => {
    const sum = numbers.reduce((acc, n) => acc + n, 0);
    return (sum / numbers.length).toFixed(2);
  }, [numbers]);

  return (
    <View style={{ alignItems: "center", marginTop: 50 }}>
      <Text style={{ fontSize: 18 }}>Числа: {numbers.join(", ")}</Text>
      <Text style={{ fontSize: 18, marginVertical: 10 }}>Среднее: {average}</Text>
      <Button title="Добавить случайное число" onPress={() => setNumbers([...numbers, Math.floor(Math.random() * 100)])} />
    </View>
  );
}