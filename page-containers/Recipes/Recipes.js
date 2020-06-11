import Head from 'next/head';
import { memo } from 'react';
import Layout from 'Components/Layout';
import RecipeCards from './RecipeCards';
import InnerHeader from './InnerHeader';
import CallToAction from './CallToAction';
import Grid from '@material-ui/core/Grid';
import RecipeDetail from './RecipeDetail';
import RecipesLoading from './Recipes.loading';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { useAllRecipes } from 'lib/Providers/AllRecipesProvider';

const useStyles = makeStyles(
	({ spacing }) => ({
		container: {
			width: '100%',
			margin: 'auto',
			paddingTop: spacing(4),
		},
	}),
	{ name: 'RecipePage' }
);

export default memo(() => {
	const classes = useStyles();
	const { data } = useAllRecipes();

	if (data) {
		return (
			<Layout>
				<Head>
					<title>Recipes | Spoonfed</title>
					<meta key="title" property="og:title" content="Recipes" />
					<meta name="description" content="Find the perfect recipe today!" />
					<meta key="description" name="og:description" content="Find the perfect recipe today!" />
				</Head>
				<Grid container spacing={1} direction="row" className={classes.container}>
					<CallToAction />

					<InnerHeader />

					<RecipeCards />
				</Grid>
				<RecipeDetail />
			</Layout>
		);
	}

	return (
		<Layout>
			<RecipesLoading />
		</Layout>
	);
});
