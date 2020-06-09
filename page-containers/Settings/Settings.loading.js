import { memo } from 'react';
import Layout from 'Components/Layout';
import Grid from '@material-ui/core/Grid';
import Skeleton from '@material-ui/lab/Skeleton';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(
	({ spacing }) => ({
		container: {
			maxWidth: 900,
			margin: 'auto',
			overflow: 'hidden',
			padding: spacing(3),
		},
	}),
	{ name: 'SettingsLoading' }
);

export default memo(() => {
	const classes = useStyles();

	return (
		<Layout>
			<Grid container spacing={3} direction="column" className={classes.container}>
				<Grid item>
					<Skeleton width={180} height={58} variant="rect" />
				</Grid>

				<Grid item>
					<Skeleton width={150} height={38} variant="rect" />
				</Grid>

				<Grid item container spacing={1} justify="center">
					<Grid item xs={12} md={6}>
						<Skeleton width="100%" height={48} variant="rect" />
					</Grid>

					<Grid item xs={12} md={6}>
						<Skeleton width="100%" height={48} variant="rect" />
					</Grid>
				</Grid>

				<Grid item xs={12}>
					<Skeleton width="100%" height={48} variant="rect" />
				</Grid>

				<Grid item>
					<Skeleton width={150} height={38} variant="rect" />
				</Grid>

				<Grid item container spacing={2} wrap="nowrap" alignItems="center">
					<Grid item>
						<Skeleton width={60} height={60} variant="circle" />
					</Grid>

					<Grid item container spacing={1} direction="column">
						<Grid item>
							<Skeleton width={140} height={38} variant="rect" style={{ borderRadius: 4 }} />
						</Grid>

						<Grid item>
							<Skeleton width={90} height={18} variant="rect" />
						</Grid>
					</Grid>
				</Grid>

				<Grid item xs={12}>
					<Skeleton width="100%" height={48} variant="rect" />
				</Grid>

				<Grid item>
					<Skeleton width={120} height={48} variant="rect" style={{ borderRadius: 4 }} />
				</Grid>
			</Grid>
		</Layout>
	);
});
