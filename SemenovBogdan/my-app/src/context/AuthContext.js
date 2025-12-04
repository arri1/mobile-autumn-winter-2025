import React, { createContext, useContext, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import { fakeAuthApi } from '../api/auth';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
	const [userToken, setUserToken] = useState(null);
	const [initializing, setInitializing] = useState(true);

	useEffect(() => {
		// при старте читаем токен
		const restore = async () => {
			try {
				const token = await SecureStore.getItemAsync('userToken');
				if (token) setUserToken(token);
			} catch (e) {
				console.warn('restore token failed', e);
			} finally {
				setInitializing(false);
			}
		};
		restore();
	}, []);

	const signIn = async (email, password) => {
		// Здесь вызываем API и сохраняем токен
		const res = await fakeAuthApi.login(email, password);
		if (res?.token) {
			await SecureStore.setItemAsync('userToken', res.token);
			setUserToken(res.token);
			return { ok: true };
		}
		return { ok: false, error: res?.error || 'Login failed' };
	};

	const signOut = async () => {
	await SecureStore.deleteItemAsync('userToken');
	setUserToken(null);
	};

	const signUp = async (payload) => {
		const res = await fakeAuthApi.register(payload);
		if (res?.token) {
			await SecureStore.setItemAsync('userToken', res.token);
			setUserToken(res.token);
			return { ok: true };
		}
		return { ok: false, error: res?.error || 'Register failed' };
	};

	return (
		<AuthContext.Provider
			value={{ userToken, initializing, signIn, signOut, signUp }}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;