import User from './User';
import Tabs from './Tabs';
import Head from 'next/head';
import { memo } from 'react';
import Recipes from './Recipes';
import Creations from './Creations';
import Layout from 'Components/Layout';
import { useRouter } from 'next/router';
import Grid from '@material-ui/core/Grid';
import RecipeDetail from './RecipeDetail';
import CreationDetail from './CreationDetail';
import ProfileLoading from './Profile.loading';
import { useProfile } from 'lib/Providers/ProfileProvider';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(
	({ spacing }) => ({
		container: {
			width: '100%',
			margin: 'auto',
			paddingTop: spacing(4),
		},
	}),
	{ name: 'ProfilePage' }
);

export default memo(() => {
	const router = useRouter();
	const classes = useStyles();
	const { profile, recipes, creations } = useProfile();

	if (!profile.loading && (!recipes.loading || !creations.loading)) {
		return (
			<>
				<Head>
					<title>
						{profile.data?.name?.full} ({profile.data?.username}) | Spoonfed
					</title>
				</Head>
				<Layout>
					<Grid container direction="row" justify="center" className={classes.container}>
						<User />
						<Tabs />
						{router.route === '/u/[username]' && <Recipes />}
						{router.route === '/u/[username]/creations' && <Creations />}
					</Grid>
					<RecipeDetail />
					<CreationDetail />
				</Layout>
			</>
		);
	}

	return (
		<Layout>
			<ProfileLoading />
		</Layout>
	);
});
