import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Case from './nav_case'
import Counter from '../useState/counter'
import Switcher from '../useEffect/switcher'
import Sorter from '../useMemo/sorter'

export type RootStackParamList = {
  Case: undefined;
  Counter: undefined;
  Switcher: undefined;
  Sorter: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Case">
        <Stack.Screen name="Case" component={Case} />
        <Stack.Screen name="Counter" component={Counter} />
        <Stack.Screen name="Switcher" component={Switcher} />
        <Stack.Screen name="Sorter" component={Sorter} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}