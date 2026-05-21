import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getAccessToken() {
  const accessToken = await AsyncStorage.getItem("accessToken");
  return accessToken || null;
}

export async function getRefreshToken() {
  const refreshToken = await AsyncStorage.getItem("refreshToken");
  return refreshToken || null;
}

export async function getUserFromStorage() {
  return JSON.parse((await AsyncStorage.getItem("user")) || "{}");
}

export async function saveTokenStorage(data) {
  AsyncStorage.setItem("accessToken", data.accessToken);
  AsyncStorage.setItem("refreshToken", data.refreshToken);
}

export async function removeFromStorage() {
  AsyncStorage.removeItem("accessToken");
  AsyncStorage.removeItem("refreshToken");
  AsyncStorage.removeItem("user");
}

export async function saveToStorage(data) {
  saveTokenStorage(data);
  await AsyncStorage.setItem("user", JSON.stringify(data.user));
}
