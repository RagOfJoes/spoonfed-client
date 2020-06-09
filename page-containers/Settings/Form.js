import { memo } from 'react';
import Profile from './Profile';
import Account from './Account';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
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
	{ name: 'SettingsForm' }
);

export default memo(() => {
	const classes = useStyles();
	return (
		<Grid container spacing={3} direction="column" className={classes.container}>
			<Grid item>
				<Typography variant="h5">Settings</Typography>
			</Grid>

			<Account />

			<Profile />
		</Grid>
	);
});
