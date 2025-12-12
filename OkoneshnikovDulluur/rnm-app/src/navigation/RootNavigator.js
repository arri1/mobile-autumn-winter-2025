import React, { useEffect } from "react";
import { View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

import AuthNavigator from "@/navigation/AuthNavigator";
import AppTabs from "@/navigation/AppTabs";
import { useAuthStore } from "@/store/authStore";

export default function RootNavigator() {
  const hydrate = useAuthStore((s) => s.hydrate);
  const isReady = useAuthStore((s) => s.isReady);
  const accessToken = useAuthStore((s) => s.accessToken);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  if (!isReady) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  return accessToken ? <AppTabs /> : <AuthNavigator />;
}
