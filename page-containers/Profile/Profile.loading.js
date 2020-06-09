import Grid from '@material-ui/core/Grid';
import RecipeCard from 'Components/RecipeCard';

export default () => {
	return (
		<Grid container spacing={2}>
			<Grid item md={4} sm={6} xs={12}>
				<RecipeCard skeleton />
			</Grid>
			<Grid item md={4} sm={6} xs={12}>
				<RecipeCard skeleton />
			</Grid>
			<Grid item md={4} sm={6} xs={12}>
				<RecipeCard skeleton />
			</Grid>
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
};
