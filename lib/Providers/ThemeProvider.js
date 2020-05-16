import moment from 'moment';
import cookie from 'js-cookie';
import createCustomMuiTheme from '../theme';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import React, { useMemo, useState, useContext, useCallback } from 'react';

export const ThemeContext = React.createContext({
	theme: 'light',
	setTheme: () => {},
});

export default ({ children, initialTheme = 'light' }) => {
	const [theme, setTheme] = useState(initialTheme);

	const toggleTheme = useCallback(() => {
		const newTheme = theme === 'light' ? 'dark' : 'light';

		setTheme(newTheme);
		const cookieOpts = () => {
			const expires = moment().add(1, 'year').toDate();
			if (process.env.NODE_ENV === 'production') {
				return {
					expires,
					secure: true,
					sameSite: true,
				};
			}

			return {
				expires,
			};
		};
		cookie.set('theme', newTheme, cookieOpts());
	}, [theme]);

	const muiTheme = createCustomMuiTheme(theme);

	const value = useMemo(
		() => ({
			theme,
			setTheme: toggleTheme,
		}),
		[theme]
	);

	return (
		<ThemeProvider theme={muiTheme}>
			<ThemeContext.Provider value={value}>
				<CssBaseline />

				{children}
			</ThemeContext.Provider>
		</ThemeProvider>
	);
};

export const useThemeType = () => useContext(ThemeContext);
