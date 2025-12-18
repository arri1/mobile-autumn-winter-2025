import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuthStore } from './store/authStore';
import UseStateLab from './screens/UseState';
import UseEffectLab from './screens/UseEffect';
import UseMemoLab from './screens/UseMemo';
import LoginScreen from './screens/Login';
import RegisterScreen from './screens/Register';
import ZustandEditScreen from './screens/ZustandEdit';
import ZustandViewScreen from './screens/ZustandView';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeScreen() {
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Главная страница</Text>
      {user && (
        <Text style={styles.userInfo}>Привет, {user.name || user.email}!</Text>
      )}
      <Text style={styles.subtitle}>Используйте нижнее меню для навигации</Text>
      <Button title="Выйти" onPress={logout} />
      <StatusBar style="auto" />
    </View>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#0000ff',
        tabBarInactiveTintColor: '#666',
        tabBarIcon: () => null,
        headerStyle: {
          backgroundColor: '#f5f5f5',
        },
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{ 
          title: 'Главная',
          tabBarLabel: 'Главная',
        }}
      />
      <Tab.Screen 
        name="UseState" 
        component={UseStateLab}
        options={{ 
          title: 'UseState Lab',
          tabBarLabel: 'UseState',
        }}
      />
      <Tab.Screen 
        name="UseEffect" 
        component={UseEffectLab}
        options={{ 
          title: 'UseEffect Lab',
          tabBarLabel: 'UseEffect',
        }}
      />
      <Tab.Screen 
        name="UseMemo" 
        component={UseMemoLab}
        options={{ 
          title: 'UseMemo Lab',
          tabBarLabel: 'UseMemo',
        }}
      />
      <Tab.Screen 
        name="ZustandEdit" 
        component={ZustandEditScreen}
        options={{ 
          title: 'Zustand Edit',
          tabBarLabel: 'Zustand Edit',
        }}
      />
      <Tab.Screen 
        name="ZustandView" 
        component={ZustandViewScreen}
        options={{ 
          title: 'Zustand View',
          tabBarLabel: 'Zustand View',
        }}
      />
    </Tab.Navigator>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#f5f5f5',
        },
      }}
    >
      <Stack.Screen 
        name="Login" 
        component={LoginScreen}
        options={{ title: 'Вход' }}
      />
      <Stack.Screen 
        name="Register" 
        component={RegisterScreen}
        options={{ title: 'Регистрация' }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <NavigationContainer>
      {isAuthenticated ? <MainTabs /> : <AuthStack />}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  userInfo: {
    fontSize: 18,
    marginBottom: 10,
    color: '#0000ff',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
});
