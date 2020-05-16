import cookie from 'js-cookie';
import { parse } from 'cookie';
import React, { useEffect } from 'react';
import ThemeProvider from 'lib/Providers/ThemeProvider';

const App = ({ Component, theme, pageProps }) => {
	useEffect(() => {
		const jssStyles = document.querySelector('#jss-server-side');
		if (jssStyles) {
			jssStyles.parentNode.removeChild(jssStyles);
		}
	}, []);

	return (
		<ThemeProvider initialTheme={theme}>
			<Component {...pageProps} />
		</ThemeProvider>
	);
};

App.getInitialProps = async ({ Component, ctx }) => {
	let pageProps = {};
	const theme = ctx && ctx.req ? parse(ctx.req.headers.cookie || '')['theme'] : cookie.get('theme');

	if (Component.getInitialProps) {
		pageProps = await Component.getInitialProps(ctx);
	}

	return { theme, pageProps };
};

export default App;
