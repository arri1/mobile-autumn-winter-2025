import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";

export const tokenStorage = {
  async get(key) {
    if (Platform.OS === "web") return localStorage.getItem(key) || "";
    return (await SecureStore.getItemAsync(key)) || "";
  },
  async set(key, value) {
    const v = value || "";
    if (Platform.OS === "web") return void localStorage.setItem(key, v);
    await SecureStore.setItemAsync(key, v);
  },
  async remove(key) {
    if (Platform.OS === "web") return void localStorage.removeItem(key);
    await SecureStore.deleteItemAsync(key);
  },
};
