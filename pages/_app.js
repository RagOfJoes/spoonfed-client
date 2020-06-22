import Head from 'next/head';
import cookie from 'js-cookie';
import { parse } from 'cookie';
import Router from 'next/router';
import NProgress from 'nprogress';
import 'public/stylesheets/reset.css';
import { SnackbarProvider } from 'notistack';
import 'react-image-crop/dist/ReactCrop.css';
import { useApollo } from 'lib/apolloClient';
import React, { useEffect, memo } from 'react';
import '@brainhubeu/react-carousel/lib/style.css';
import AppProvider from 'lib/Providers/AppProvider';
import { ApolloProvider } from '@apollo/react-hooks';
import ThemeProvider from 'lib/Providers/ThemeProvider';

const App = memo(({ Component, theme, pageProps }) => {
	const apolloClient = useApollo(pageProps.initialApolloState);
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
		<>
			<Head>
				<title>Spoonfed</title>
				<meta key="title" name="og:title" content="Spoonfed" />
				<meta key="image" name="og:image" content="/images/favicon-64.png" />
				<meta
					name="description"
					content="Store all your favorite recipes and perfect your cooking by tracking your progress. Take notes on area of improvements and share with others."
				/>
				<meta
					key="description"
					name="og:description"
					content="Store all your favorite recipes and perfect your cooking by tracking your progress. Take notes on area of improvements and share with others."
				/>
			</Head>
			<ApolloProvider client={apolloClient}>
				<ThemeProvider initialTheme={theme}>
					<SnackbarProvider preventDuplicate>
						<AppProvider>
							<Component {...pageProps} />
						</AppProvider>
					</SnackbarProvider>
				</ThemeProvider>
			</ApolloProvider>
		</>
	);
});

App.getInitialProps = async ({ Component, ctx }) => {
	let pageProps = {};
	const theme = ctx && ctx.req ? parse(ctx.req.headers.cookie || '')['theme'] : cookie.get('theme');

	// Run Page's getInitialProps
	if (Component.getInitialProps) pageProps = await Component.getInitialProps(ctx);

	return { theme, pageProps };
};

export default App;
