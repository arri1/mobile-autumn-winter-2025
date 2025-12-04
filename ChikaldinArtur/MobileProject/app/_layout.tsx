import { Stack, Slot } from "expo-router";
import { useAuthStore } from "./store";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

export default function RootLayout() {
  const { token, loading, loadToken } = useAuthStore();

  useEffect(() => {
    loadToken();
  }, []);

  if (loading) {
    return (
      <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!token) {
    return (
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="login" />
        <Stack.Screen name="register" />
      </Stack>
    );
  }

  return <Slot />;
}
