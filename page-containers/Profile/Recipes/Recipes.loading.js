import { memo } from 'react';
import Grid from '@material-ui/core/Grid';
import RecipeCard from 'Components/RecipeCard';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(
	(theme) => ({
		container: {
			marginTop: theme.spacing(2),
		},
	}),
	{ name: 'ProfileRecipesLoading' }
);

export default memo(() => {
	const classes = useStyles();

	return (
		<Grid item container spacing={2} className={classes.container}>
			<Grid item md={4} sm={6} xs={12}>
				<RecipeCard skeleton />
			</Grid>
			<Grid item md={4} sm={6} xs={12}>
				<RecipeCard skeleton />
			</Grid>
			<Grid item md={4} sm={6} xs={12}>
				<RecipeCard skeleton />
			</Grid>
		</Grid>
	);
});
