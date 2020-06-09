import React from 'react';
import { ServerStyleSheets } from '@material-ui/core/styles';
import Document, { Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
	render() {
		return (
			<html lang="en">
				<Head>
					{/* Use minimum-scale=1 to enable GPU rasterization */}
					<meta name="theme-color" content="#424242" />
					<meta property="og:type" content="website" />
					<meta property="og:site_name" content="Spoonfed" />
					<meta property="og:url" content="https://spoonfed.dev" />
					<meta property="og:image" content="/images/favicon-64.png" />

					<meta
						name="og:description"
						content="Store all your favorite recipes and perfect your cooking by tracking your progress. Take notes on area of improvements and share with others."
					/>
					<meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />
					<meta name="author" content="Victor Ragojos - https://github.com/RagOfJoes" />
					<meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no" />
					<meta
						name="description"
						content="Store all your favorite recipes and perfect your cooking by tracking your progress. Take notes on area of improvements and share with others."
					/>
					<link rel="shortcut icon" href="/images/favicon.ico" />
					<link rel="apple-touch-icon" sizes="180x180" href="/images/favicon-180.png" />
					<link rel="icon" type="image/png" sizes="16x16" href="/images/favicon-16.png" />
					<link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-32.png" />
					<link rel="icon" type="image/png" sizes="64x64" href="/images/favicon-64.png" />

					<link rel="stylesheet" type="text/css" href="/stylesheets/nprogress.css" />
					<link rel="manifest" href="/manifest.json" crossOrigin="use-credentials" />
					<link
						rel="stylesheet"
						href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400&family=Roboto:wght@300;400;500&display=swap"
					/>
				</Head>
				<body style={{ overflowX: 'hidden' }}>
					<Main />
					<NextScript />
				</body>
			</html>
		);
	}
}

// Resolution order
//
// On the server:
// 1. app.getInitialProps
// 2. page.getInitialProps
// 3. document.getInitialProps
// 4. app.render
// 5. page.render
// 6. document.render
//
// On the server with error:
// 1. document.getInitialProps
// 2. app.render
// 3. page.render
// 4. document.render
//
// On the client
// 1. app.getInitialProps
// 2. page.getInitialProps
// 3. app.render
// 4. page.render
MyDocument.getInitialProps = async (ctx) => {
	const sheets = new ServerStyleSheets();
	const originalRenderPage = ctx.renderPage;
	ctx.renderPage = () =>
		originalRenderPage({
			enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
		});

	const initProps = await Document.getInitialProps(ctx);

	return {
		...initProps,
		// Styles fragment is rendered after the app and page rendering finish.
		styles: [...React.Children.toArray(initProps.styles), sheets.getStyleElement()],
	};
};
