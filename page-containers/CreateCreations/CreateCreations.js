import Form from './Form';
import Head from 'next/head';
import { memo } from 'react';
import { useUser } from 'lib/user';
import Layout from 'Components/Layout';
import Grid from '@material-ui/core/Grid';
import Unauthenticated from 'Components/Unauthenticated';
import makeStyles from '@material-ui/core/styles/makeStyles';
import CreationsFormLoading from 'Components/CreationsForm/CreationsForm.loading';

const useStyles = makeStyles(
	({ spacing }) => ({
		loading: {
			overflow: 'hidden',
			padding: spacing(3),
		},
	}),
	{ name: 'NewCreationsPage' }
);

export default memo(() => {
	const classes = useStyles();
	const { user, loading } = useUser();

	if (!loading && !user) return <Unauthenticated />;

	if (!loading && user) return <Form />;

	return (
		<Layout>
			<Head>
				<title>New Creation | Spoonfed</title>
				<meta key="title" property="og:title" content="New Creation | Spoonfed" />
			</Head>
			<Grid spacing={2} container direction="column" className={classes.loading}>
				<CreationsFormLoading />
			</Grid>
		</Layout>
	);
});
