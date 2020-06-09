import Grid from '@material-ui/core/Grid';
import { INVALID_CREATION } from 'constants/index';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(
	({ spacing }) => ({
		container: {
			height: '100%',
			overflow: 'hidden',
			paddingTop: spacing(1),
		},
		image: {
			width: '100%',
			maxWidth: 500,
		},
	}),
	{ name: 'CreationEditError' }
);

export default () => {
	const classes = useStyles();

	return (
		<Grid
			container
			spacing={3}
			wrap="nowrap"
			justify="center"
			direction="column"
			alignItems="center"
			className={classes.container}
		>
			<Grid item>
				<Typography variant="h6">{INVALID_CREATION}</Typography>
			</Grid>

			<Grid item container justify="center">
				<img alt="Invalid Recipe" title="Invalid Recipe" src="/images/NoData.svg" className={classes.image} />
			</Grid>
		</Grid>
	);
};
