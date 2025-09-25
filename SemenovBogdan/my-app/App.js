import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Switch,
  TouchableOpacity,
  FlatList,
} from "react-native";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [count, setCount] = useState(0);

  const addTask = () => {
    if (input.trim()) {
      setTasks([...tasks, { id: Date.now().toString(), text: input }]);
      setInput("");
    }
  };

  const removeTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: darkMode ? "#222" : "#fff" },
      ]}
    >
      <Text style={[styles.title, { color: darkMode ? "#fff" : "#000" }]}>
        Мое приложение
      </Text>

      <View style={styles.section}>
        <Text style={{ color: darkMode ? "#fff" : "#000" }}>Счётчик: {count}</Text>
        <Button title="+" onPress={() => setCount(count + 1)} />
      </View>

      <View style={styles.section}>
        <TextInput
          style={[
            styles.input,
            { backgroundColor: darkMode ? "#444" : "#eee", color: darkMode ? "#fff" : "#000" },
          ]}
          placeholder="Новая задача..."
          placeholderTextColor={darkMode ? "#aaa" : "#555"}
          value={input}
          onChangeText={setInput}
        />
        <Button title="Добавить" onPress={addTask} />
      </View>

      <FlatList
        style={{ width: "100%" }}
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.task,
              { backgroundColor: darkMode ? "#333" : "#f0f0f0" },
            ]}
            onPress={() => removeTask(item.id)}
          >
            <Text style={{ color: darkMode ? "#fff" : "#000" }}>{item.text}</Text>
          </TouchableOpacity>
        )}
      />

      <View style={styles.section}>
        <Text style={{ color: darkMode ? "#fff" : "#000" }}>Темная тема</Text>
        <Switch value={darkMode} onValueChange={setDarkMode} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  section: {
    marginBottom: 20,
    alignItems: "center",
  },
  input: {
    width: "100%",
    padding: 10,
    borderRadius: 6,
    marginBottom: 10,
  },
  task: {
    padding: 12,
    marginVertical: 5,
    borderRadius: 6,
  },
});
