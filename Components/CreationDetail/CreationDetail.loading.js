import { memo } from 'react';
import Grid from '@material-ui/core/Grid';
import Skeleton from '@material-ui/lab/Skeleton';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(
	(theme) => ({
		content: {
			overflow: 'hidden',
			padding: theme.spacing(3),
		},
	}),
	{ name: 'CreationDetailLoading' }
);

export default memo(() => {
	const classes = useStyles();

	return (
		<Grid container spacing={2} direction="column">
			<Grid item xs={12}>
				<Skeleton variant="rect" width="100%" height="40vw" />
			</Grid>

			<Grid container spacing={2} direction="column" className={classes.content}>
				<Grid item xs={12}>
					<Skeleton variant="rect" width={144} height={48} />
				</Grid>

				<Grid item xs={12}>
					<Skeleton variant="rect" width={225} height={32} />
				</Grid>

				<Grid item xs={12}>
					<Skeleton variant="rect" width="100%" height={120} />
				</Grid>
			</Grid>
		</Grid>
	);
});
