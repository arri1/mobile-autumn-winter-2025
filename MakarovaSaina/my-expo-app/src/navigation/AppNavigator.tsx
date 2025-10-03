import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import UseStateScreen from '../screens/UseStateScreen';
import UseEffectScreen from '../screens/UseEffectScreen';

const Drawer = createDrawerNavigator();

export default function AppNavigator() {
  return (
    <Drawer.Navigator 
      initialRouteName="UseState"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#f97a9cff',
        },
        headerTintColor: '#000000ff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        drawerStyle: {
          backgroundColor: '#1F2833',
        },
        drawerActiveTintColor: '#f97a9cff',
        drawerInactiveTintColor: '#C5C6C7',
        drawerActiveBackgroundColor: '#0B0C10',
      }}
    >
      <Drawer.Screen 
        name="UseState" 
        component={UseStateScreen}
        options={{
          title: 'Лабораторная useState()',
          drawerLabel: 'useState Хук',
        }}
      />
      <Drawer.Screen 
        name="UseEffect" 
        component={UseEffectScreen}
        options={{
          title: 'Лабораторная useEffect()',
          drawerLabel: 'useEffect Хук',
        }}
      />
    </Drawer.Navigator>
  );
}