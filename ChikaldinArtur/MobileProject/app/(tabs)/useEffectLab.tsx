import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";

export default function UseEffectLab() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 24 }}>Таймер: {count} сек.</Text>
    </View>
  );
}