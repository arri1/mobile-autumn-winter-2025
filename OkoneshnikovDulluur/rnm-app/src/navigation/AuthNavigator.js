import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginContainer from "@/screens/Auth/Login/LoginContainer";
import RegisterContainer from "@/screens/Auth/Register/RegisterContainer";

const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginContainer} />
      <Stack.Screen name="Register" component={RegisterContainer} />
    </Stack.Navigator>
  );
}
