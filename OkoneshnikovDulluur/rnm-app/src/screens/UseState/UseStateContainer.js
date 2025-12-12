import React, { useState } from "react";
import UseStateView from "@/screens/UseState/UseStateView";

export default function UseStateContainer({ navigation }) {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");

  const increment = () => setCount((c) => c + 1);
  const reset = () => setCount(0);

  return (
    <UseStateView
      navigation={navigation}
      count={count}
      name={name}
      onChangeName={setName}
      onIncrement={increment}
      onReset={reset}
    />
  );
}
