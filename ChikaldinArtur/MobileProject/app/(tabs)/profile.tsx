import { View, Text, Button } from "react-native";
import { useAuthStore } from "../store";

export default function Profile() {
  const logout = useAuthStore((s) => s.logout);

  return (
    <View>
      <Text>Профиль</Text>
      <Button title="Выйти" onPress={logout} />
    </View>
  );
}
