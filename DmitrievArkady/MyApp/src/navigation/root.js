import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, StyleSheet } from 'react-native';
import UseStateScreen from '../screens/Main/UseStateScreen';
import UseEffectScreen from '../screens/Main/UseEffectScreen';
import UseMemoScreen from '../screens/Main/UseMemoScreen';
import PostsScreen from '../screens/Main/PostsScreen';
import ProfileScreen from '../screens/Main/ProfileScreen';

const Tab = createBottomTabNavigator();
 
export default function RootTabs() {
  const getIconStyle = (focused) => ({
    width: 24,
    height: 24,
    tintColor: focused ? '#4287f5' : 'gray'
  });

  return (
    <Tab.Navigator>
      <Tab.Screen name="useState" component={UseStateScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image 
              source={require('../icons/hook.png')}
              style={getIconStyle(focused)}
            />
          )
        }}/>
      <Tab.Screen name="useEffect" component={UseEffectScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image 
              source={require('../icons/hook.png')}
              style={getIconStyle(focused)}
            />
          )
        }}/>
      <Tab.Screen name="useMemo" component={UseMemoScreen} 
        options={{
          tabBarIcon: ({ focused }) => (
            <Image 
              source={require('../icons/hook.png')}
              style={getIconStyle(focused)}
            />
          )
        }}/>
        <Tab.Screen name="Посты" component={PostsScreen} 
        options={{
          tabBarIcon: ({ focused }) => (
            <Image 
              source={require('../icons/post.png')}
              style={getIconStyle(focused)}
            />
          )
        }}/>
      <Tab.Screen name="Профиль" component={ProfileScreen} 
        options={{
          tabBarIcon: ({ focused }) => (
            <Image 
              source={require('../icons/profile.png')}
              style={getIconStyle(focused)}
            />
          )
        }}/>
    </Tab.Navigator>
  );
}
