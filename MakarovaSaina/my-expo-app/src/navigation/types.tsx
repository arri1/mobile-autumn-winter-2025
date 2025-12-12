export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  HomeDrawer: undefined;
  UseState: undefined;
  UseEffect: undefined;
  UseMemo: undefined;
  Zustand: undefined;
};

export type RootDrawerParamList = {
  Home: undefined;
  Profile: undefined;
  Settings: undefined;
};

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { DrawerScreenProps } from '@react-navigation/drawer';

export type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'Login'>;
export type RegisterScreenProps = NativeStackScreenProps<RootStackParamList, 'Register'>;
export type HomeScreenProps = DrawerScreenProps<RootDrawerParamList, 'Home'>;

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DrawerNavigationProp } from '@react-navigation/drawer';

export type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;
export type RegisterScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Register'>;
export type HomeScreenNavigationProp = DrawerNavigationProp<RootDrawerParamList, 'Home'>;

export type UseStateScreenProps = NativeStackScreenProps<RootStackParamList, 'UseState'>;
export type UseEffectScreenProps = NativeStackScreenProps<RootStackParamList, 'UseEffect'>;
export type UseMemoScreenProps = NativeStackScreenProps<RootStackParamList, 'UseMemo'>;
export type ZustandScreenProps = NativeStackScreenProps<RootStackParamList, 'Zustand'>;