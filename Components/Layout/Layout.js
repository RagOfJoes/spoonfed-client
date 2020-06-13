import Container from '@material-ui/core/Container';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Head from 'next/head';

const useStyles = makeStyles(
	({ breakpoints }) => {
		return {
			container: {
				height: '100vh',
				paddingTop: 129,

				[breakpoints.down('sm')]: {
					paddingTop: 113,
				},
			},
		};
	},
	{ name: 'PageLayout' }
);

export default ({ children }) => {
	const classes = useStyles();
	return (
		<>
			<Head>
				<title>Spoonfed</title>
				<meta key="title" property="og:title" content="Spoonfed" />
				<meta key="image" property="og:image" content="/images/favicon-64.png" />
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
			<Container maxWidth="lg" className={classes.container}>
				{children}
			</Container>
		</>
	);
};
