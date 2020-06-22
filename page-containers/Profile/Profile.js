import User from './User';
import Tabs from './Tabs';
import { memo } from 'react';
import Recipes from './Recipes';
import { NextSeo } from 'next-seo';
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

	if (!profile.loading && profile.data && (!recipes.loading || !creations.loading)) {
		return (
			<>
				<NextSeo
					title={`${profile.data?.name?.full} (${router.query?.username})`}
					description={
						profile.data?.bio ||
						'Join Spoonfed today to find the perfect Recipe and to share all your delicious Creations!'
					}
					openGraph={{
						type: 'Profile',
						url: `https://www.spoonfed.dev/u/${router.query?.username}/t/${router.query?.tab}`,
						title: `${router.query?.tab && router.query.tab[0].toUpperCase() + router.query.tab.slice(1)} | ${
							profile.data?.name?.full
						} (${router.query?.username})`,
						description:
							profile.data?.bio ||
							'Join Spoonfed today to find the perfect Recipe and to share all your delicious Creations!',
						profile: {
							username: router.query?.username,
							lastName: profile.data?.name?.last,
							firstName: profile.data?.name?.first,
						},
						images: [
							{
								alt: profile.data?.name?.full || 'Profile',
								url: profile.data?.avatar || '/images/favicon-64.png',
							},
						],
					}}
				/>
				<Layout>
					<Grid container direction="row" justify="center" className={classes.container}>
						<User />
						<Tabs />
						{router.query?.tab === 'recipes' && <Recipes />}
						{router.query?.tab === 'creations' && <Creations />}
					</Grid>
					<RecipeDetail />
					<CreationDetail />
				</Layout>
			</>
		);
	}

	return (
		<Layout>
			<Grid container direction="row" justify="center" className={classes.container}>
				<ProfileLoading />
			</Grid>
		</Layout>
	);
});
