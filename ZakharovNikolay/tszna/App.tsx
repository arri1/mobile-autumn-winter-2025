import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import UseStateLab from './screens/UseState';
import UseEffectLab from './screens/UseEffect';

const Tab = createBottomTabNavigator();

function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Главная страница</Text>
      <Text style={styles.subtitle}>Используйте нижнее меню для навигации</Text>
      <StatusBar style="auto" />
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#0000ff',
          tabBarInactiveTintColor: '#666',
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
      </Tab.Navigator>
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
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});
