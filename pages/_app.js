import cookie from 'js-cookie';
import { parse } from 'cookie';
import Router from 'next/router';
import NProgress from 'nprogress';
import 'public/stylesheets/reset.css';
import { SnackbarProvider } from 'notistack';
import 'react-image-crop/dist/ReactCrop.css';
import React, { useEffect, memo } from 'react';
import '@brainhubeu/react-carousel/lib/style.css';
import AppProvider from 'lib/Providers/AppProvider';
import ThemeProvider from 'lib/Providers/ThemeProvider';

const App = memo(({ Component, theme, pageProps }) => {
	useEffect(() => {
		NProgress.configure({
			showSpinner: false,
		});

		Router.events.on('routeChangeStart', (url) => {
			NProgress.start();
		});
		Router.events.on('routeChangeComplete', (url) => {
			NProgress.done();
		});
		Router.events.on('routeChangeError', (err, url) => {
			NProgress.done();
		});

		const jssStyles = document.querySelector('#jss-server-side');
		if (jssStyles) {
			jssStyles.parentNode.removeChild(jssStyles);
		}
	}, []);

	return (
		<ThemeProvider initialTheme={theme}>
			<SnackbarProvider preventDuplicate>
				<AppProvider>
					<Component {...pageProps} />
				</AppProvider>
			</SnackbarProvider>
		</ThemeProvider>
	);
});

App.getInitialProps = async ({ Component, ctx }) => {
	let pageProps = {};
	const theme = ctx && ctx.req ? parse(ctx.req.headers.cookie || '')['theme'] : cookie.get('theme');

	if (Component.getInitialProps) {
		pageProps = await Component.getInitialProps(ctx);
	}

	return { theme, pageProps };
};

export default App;
