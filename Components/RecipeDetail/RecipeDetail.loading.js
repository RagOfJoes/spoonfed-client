import { memo } from 'react';
import Grid from '@material-ui/core/Grid';
import Skeleton from '@material-ui/lab/Skeleton';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(
	(theme) => ({
		content: {
			overflow: 'hidden',
			padding: theme.spacing(2),
		},
	}),
	{ name: 'RecipeDetailLoading' }
);

export default memo(() => {
	const classes = useStyles();

	return (
		<Grid container direction="column">
			<Grid item xs={12}>
				<Skeleton variant="rect" width="100%" height="40vw" style={{ maxHeight: 800 }} />
			</Grid>

			<Grid item container spacing={2} direction="column" className={classes.content}>
				<Grid item spacing={1} container>
					<Grid item xs={12}>
						<Skeleton variant="rect" width="100%" height={49} />
					</Grid>
					<Grid xs={12} md={4} item container spacing={2} direction="column">
						<Grid item>
							<Skeleton variant="rect" width="100%" height={60} />
						</Grid>

						<Grid item>
							<Skeleton variant="rect" width="100%" height={450} />
						</Grid>
					</Grid>

					<Grid xs={12} md={8} item container>
						<Skeleton variant="rect" width="100%" height={675} />
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
});
