import React from 'react';
import { light } from './theme';
import ThemeContext from './ThemeContext';

export const ThemeProvider = ({ children }) => {
	return (
		<ThemeContext.Provider value={light}>{children}</ThemeContext.Provider>
	);
};

export default ThemeProvider;