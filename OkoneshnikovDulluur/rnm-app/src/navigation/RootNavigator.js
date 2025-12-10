import { createNativeStackNavigator } from "@react-navigation/native-stack";

import UseStateContainer from "@/screens/UseState/UseStateContainer";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="UseState" component={UseStateContainer} />
    </Stack.Navigator>
  );
}
