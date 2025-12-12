import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/navigation/AppNavigator";
import AuthNavigator from "./src/navigation/AuthNavigator";
import { useAuthStore } from "./src/store/useAuthStore";
import { useState, useEffect } from "react";

export default function App() {
    const { isAuthenticated, checkAuth, isLoading } = useAuthStore();

    useEffect(() => {
        checkAuth();
    }, []);

    return (
        <NavigationContainer>
            {isAuthenticated ? <AppNavigator /> : <AuthNavigator />}
        </NavigationContainer>
    );
}