import { memo } from 'react';
import Grid from '@material-ui/core/Grid';
import RecipeCard from 'Components/RecipeCard';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(
	({ spacing }) => ({
		container: {
			width: '100%',
			margin: 'auto',
			paddingTop: spacing(4),
		},
	}),
	{ name: 'RecipePageLoading' }
);

export default memo(() => {
	const styles = useStyles();
	return (
		<Grid container spacing={2} className={styles.container}>
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
});
