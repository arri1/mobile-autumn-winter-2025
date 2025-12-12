import { NavigationContainer } from "@react-navigation/native";
import RootTabs from './src/navigation/root';
import AuthNavigator from "./src/navigation/AuthNavigator";
import { useAuthStore } from "./src/store/useAuthStore";

export default function App() {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    return (
        <NavigationContainer>
            {isAuthenticated ? <RootTabs /> : <AuthNavigator />}
        </NavigationContainer>
    );
}