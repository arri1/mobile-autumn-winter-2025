import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [userToken, setUserToken] = useState(null);
	const [initializing, setInitializing] = useState(true);

	useEffect(() => {
		setTimeout(() => {
			setUserToken(null);
			setInitializing(false);
		}, 1000);
	}, []);

	const login = (username, password) => {
		setUserToken('dummy-token');
	};

	const logout = () => {
		setUserToken(null);
	};

	return (
		<AuthContext.Provider value={{ userToken, initializing, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
