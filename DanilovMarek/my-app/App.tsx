import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/navigation/AppNavigator";
import AuthNavigator from "./src/navigation/AuthNavigator";
import { useUserStore } from "./src/store/useUserStore";
import { useEffect } from "react";

export default function App() {
    const { isAuthenticated, checkAuth } = useUserStore();

    useEffect(() => {
        checkAuth();
    }, []);

    return (
        <NavigationContainer>
            {isAuthenticated ? <AppNavigator /> : <AuthNavigator />}
        </NavigationContainer>
    );
}