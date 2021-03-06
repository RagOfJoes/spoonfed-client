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
