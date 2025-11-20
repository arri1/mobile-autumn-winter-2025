import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { TouchableOpacity, Text, View } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import UseStateScreen from '../screens/UseStateScreen';
import UseEffectScreen from '../screens/UseEffectScreen';
import UseMemoScreen from '../screens/UseMemoScreen';
import HomeScreen from '../screens/HomeScreen';
import ZustandScreen from '../screens/ZustandScreen';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props: any) {
  const { user, logout } = useAuth();

  const menuItems = [
    { label: 'Главная', screen: 'Home' },
    { label: 'useState', screen: 'UseState' },
    { label: 'useEffect', screen: 'UseEffect' },
    { label: 'useMemo', screen: 'UseMemo' },
    { label: 'Zustand', screen: 'Zustand' },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: '#1F2833' }}>
      <View style={{ padding: 20, backgroundColor: '#0B0C10', borderBottomWidth: 1, borderBottomColor: '#45A29E' }}>
        <Text style={{ color: '#FFFFFF', fontSize: 18, fontWeight: 'bold', marginBottom: 4 }}>
          {user?.name}
        </Text>
        <Text style={{ color: '#C5C6C7', fontSize: 14 }}>
          @{user?.username}
        </Text>
      </View>
      
      <View style={{ flex: 1, paddingVertical: 10 }}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 12,
              paddingHorizontal: 20,
              backgroundColor: props.state.routeNames[props.state.index] === item.screen ? '#0B0C10' : 'transparent',
              borderLeftWidth: 4,
              borderLeftColor: props.state.routeNames[props.state.index] === item.screen ? '#ff859bff' : 'transparent',
            }}
            onPress={() => props.navigation.navigate(item.screen)}
          >
            <Text style={{
              color: props.state.routeNames[props.state.index] === item.screen ? '#ff859bff' : '#C5C6C7',
              fontSize: 16,
              fontWeight: props.state.routeNames[props.state.index] === item.screen ? '600' : '400',
            }}>
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      
      <TouchableOpacity
        style={{
          margin: 20,
          padding: 16,
          backgroundColor: '#f97a9cff',
          borderRadius: 8,
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'center',
          gap: 8,
        }}
        onPress={logout}
      >
        <Text style={{ color: '#0B0C10', fontWeight: '600', fontSize: 16 }}>
          🚪 Выйти
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default function AppNavigator() {
  return (
    <Drawer.Navigator 
      initialRouteName="Home"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
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
        swipeEnabled: true,
      }}
    >
      <Drawer.Screen 
        name="Home" 
        component={HomeScreen}
        options={{
          title: 'Главная',
          drawerLabel: 'Главная',
        }}
      />
      <Drawer.Screen 
        name="UseState" 
        component={UseStateScreen}
        options={{
          title: 'useState Хук',
          drawerLabel: 'useState',
        }}
      />
      <Drawer.Screen 
        name="UseEffect" 
        component={UseEffectScreen}
        options={{
          title: 'useEffect Хук',
          drawerLabel: 'useEffect',
        }}
      />
      <Drawer.Screen 
        name="UseMemo" 
        component={UseMemoScreen}
        options={{
          title: 'useMemo Хук',
          drawerLabel: 'useMemo',
        }}
      />
      <Drawer.Screen
        name="Zustand"
        component={ZustandScreen}
        options={{
          title: 'Zustand Store',
          drawerLabel: 'Zustand'
        }}
      />
    </Drawer.Navigator>
  );
}