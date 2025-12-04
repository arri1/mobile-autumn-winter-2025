import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import HomeScreen from './screens/HomeScreen';      
import UseStateScreen from './screens/UseState';
import UseEffectScreen from './screens/UseEffect';


const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Home"                    
        screenOptions={{
          headerStyle: {
            backgroundColor: '#007AFF',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center',
        }}
      >
        {/* Главное меню */}
        <Stack.Screen 
          name="Home"                             
          component={HomeScreen}
          options={{ 
            title: 'React Hooks',
            headerShown: true,                    
          }}
        />
        
        {/* Экран с useState */}
        <Stack.Screen 
          name="UseState" 
          component={UseStateScreen}
          options={{ 
            title: 'useState Примеры',
            headerShown: true,
          }}
        />
        
        {/* Экран с useEffect */}
        <Stack.Screen 
          name="UseEffect" 
          component={UseEffectScreen}
          options={{ 
            title: 'useEffect Примеры',
            headerShown: true,
          }}
        />
       
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;