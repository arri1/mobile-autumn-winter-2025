import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [initializing, setInitializing] = useState(true);
	const [accessToken, setAccessToken] = useState(null);
	const [refreshToken, setRefreshToken] = useState(null);

	useEffect(() => {
		setInitializing(false);
	}, []);

	const register = async ({ email, password }) => {
		try {
			setInitializing(true);

			const response = await fetch(
			'https://cloud.kit-imi.info/api/auth/register',
			{
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email, password }),
			}
			);

			const json = await response.json();

			if (!response.ok) {
				throw new Error(json.message || 'Register error');
			}

			setUser(json.data.user);
			setAccessToken(json.data.accessToken);
			setRefreshToken(json.data.refreshToken);
		} catch (e) {
			console.error('REGISTER ERROR:', e.message);
			throw e;
		} finally {
			setInitializing(false);
		}
	};

const logout = async () => {
    try {
        if (refreshToken) {
            await fetch('https://cloud.kit-imi.info/api/auth/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ refreshToken }),
            });
        }
    } catch (e) {
        console.warn('Logout error:', e.message);
    } finally {
        setUser(null);
        setAccessToken(null);
        setRefreshToken(null);
    }
};

	const login = async (email, password) => {
		try {
		setInitializing(true);

		const response = await fetch(
			'https://cloud.kit-imi.info/api/auth/login',
			{
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email, password }),
			}
		);

		const json = await response.json();

		if (!response.ok) {
			throw new Error(json.message || 'Login failed');
		}

		setUser(json.data.user);
		setAccessToken(json.data.accessToken);
		setRefreshToken(json.data.refreshToken);
		} catch (e) {
			console.error('LOGIN ERROR:', e.message);
			throw e;
		} finally {
			setInitializing(false);
		}
	};

	return (
		<AuthContext.Provider
			value={{
				user,
				accessToken,
				refreshToken,
				initializing,
				register,
				login,
				logout,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
