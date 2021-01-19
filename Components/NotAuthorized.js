import Grid from '@material-ui/core/Grid';
import { NOT_AUTHORIZED } from 'constants/index';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(
	() => ({
		container: {
			height: '100%',
			overflow: 'hidden',
		},
		image: {
			width: '100%',
			maxWidth: 500,
		},
	}),
	{ name: 'NotAuthorized' }
);

const NotAuthorized = () => {
	const classes = useStyles();
	return (
		<Grid container spacing={3} direction="column" justify="center" alignItems="center" className={classes.container}>
			<Grid item>
				<Typography variant="h6">{NOT_AUTHORIZED}</Typography>
			</Grid>

			<Grid item container justify="center">
				<img
					alt="Unauthenticated"
					title="Unauthenticated"
					className={classes.image}
					src="/images/Unauthenticated.svg"
				/>
			</Grid>
		</Grid>
	);
};

export default NotAuthorized;
