import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import responsiveFontSizes from '@material-ui/core/styles/responsiveFontSizes';

export default (theme) => {
	const darkTheme = {
		type: 'dark',
		primary: {
			main: '#03a9f4',
			dark: '#0276aa',
			light: '#35baf6',
		},
		secondary: {
			main: '#f5f5f5',
			dark: '#c2c2c2',
			light: '#ffffff',
			contrastText: '#000',
		},
	};
	const lightTheme = {
		type: 'light',
		primary: {
			main: '#01579b',
			dark: '#003c6c',
			light: '#3378af',
			contrastText: '#fff',
		},
		secondary: {
			main: '#f5f5f5',
			dark: '#c2c2c2',
			light: '#ffffff',
			contrastText: '#000',
		},
		background: {
			paper: '#fbfbfb',
			default: '#f5f5f5',
		},
	};
	return responsiveFontSizes(
		createMuiTheme({
			palette: theme === 'light' ? lightTheme : darkTheme,
		})
	);
};
