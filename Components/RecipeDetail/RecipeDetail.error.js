import Grid from '@material-ui/core/Grid';
import { INVALID_RECIPE } from 'constants/index';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(
	({ spacing }) => ({
		image: {
			width: '100%',
			maxWidth: 500,
		},
		error: {
			height: '100%',
			overflow: 'hidden',
			paddingTop: spacing(1),
		},
	}),
	{ name: 'RecipeDetailError' }
);

const RecipeDetailError = () => {
	const classes = useStyles();
	return (
		<Grid
			container
			spacing={3}
			wrap="nowrap"
			justify="center"
			direction="column"
			alignItems="center"
			className={classes.error}
		>
			<Grid item>
				<Typography variant="h6">{INVALID_RECIPE}</Typography>
			</Grid>

			<Grid item container justify="center">
				<img alt="Invalid Recipe" title="Invalid Recipe" src="/images/NoData.svg" className={classes.image} />
			</Grid>
		</Grid>
	);
};

export default RecipeDetailError;
