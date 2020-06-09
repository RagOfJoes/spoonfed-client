import { memo } from 'react';
import Waypoint from './Waypoint';
import Grid from '@material-ui/core/Grid';
import CreationCard from 'views/CreationCard';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(
	({ spacing }) => ({
		container: {
			width: '100%',
			marginTop: spacing(2),
		},
	}),
	{ name: 'ProfileCreationsLoading' }
);

export default memo(() => {
	const classes = useStyles();

	return (
		<Grid container spacing={2} direction="row" className={classes.container}>
			<Grid item xs={12} sm={6} md={4} container justify="center">
				<CreationCard skeleton />
			</Grid>

			<Grid item xs={12} sm={6} md={4} container justify="center">
				<CreationCard skeleton />
			</Grid>

			<Grid item xs={12} sm={6} md={4} container justify="center">
				<CreationCard skeleton />
			</Grid>

			<Waypoint />
		</Grid>
	);
});
