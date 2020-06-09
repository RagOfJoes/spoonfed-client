import { useRouter } from 'next/router';
import Grid from '@material-ui/core/Grid';
import ProfileCard from 'views/ProfileCard';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(
	({ spacing }) => ({
		container: {
			maxWidth: 780,
			margin: 'auto',
			paddingTop: spacing(4),
		},
	}),
	{ name: 'UserSearchPage' }
);

export default () => {
	const router = useRouter();
	const classes = useStyles();
	return (
		<Grid container className={classes.container}>
			<Grid container spacing={2} direction="column">
				<Grid item>
					<Typography variant="h5">Search result for "{router.query?.username}"</Typography>
				</Grid>

				<Grid item style={{ width: '100%' }}>
					<ProfileCard skeleton />
				</Grid>

				<Grid item style={{ width: '100%' }}>
					<ProfileCard skeleton />
				</Grid>

				<Grid item style={{ width: '100%' }}>
					<ProfileCard skeleton />
				</Grid>

				<Grid item style={{ width: '100%' }}>
					<ProfileCard skeleton />
				</Grid>

				<Grid item style={{ width: '100%' }}>
					<ProfileCard skeleton />
				</Grid>

				<Grid item style={{ width: '100%' }}>
					<ProfileCard skeleton />
				</Grid>

				<Grid item style={{ width: '100%' }}>
					<ProfileCard skeleton />
				</Grid>
			</Grid>
		</Grid>
	);
};
