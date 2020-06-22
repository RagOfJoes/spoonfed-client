import Waypoint from './Waypoint';
import Layout from 'Components/Layout';
import { useRouter } from 'next/router';
import Grid from '@material-ui/core/Grid';
import ProfileCard from 'views/ProfileCard';
import SearchLoading from './Search.loading';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { useUserSearch } from 'lib/Providers/UserSearchProvider';

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

	const { data, loading } = useUserSearch();

	if (!loading && data && data.edges.length > 0) {
		const { edges } = data;
		return (
			<Layout>
				<Grid container className={classes.container}>
					<Grid container spacing={2} direction="column">
						<Grid item>
							<Typography variant="h5">Search result for "{router.query?.username}"</Typography>
						</Grid>

						{edges.map((u) => {
							const { name, avatar, username } = u;

							return (
								<Grid item key={username} style={{ width: '100%' }}>
									<ProfileCard name={name.full} avatar={avatar} username={username} />
								</Grid>
							);
						})}

						<Waypoint />
					</Grid>
				</Grid>
			</Layout>
		);
	}

	if (!loading && data && data.edges.length === 0) {
		return (
			<Layout>
				<Grid container className={classes.container}>
					<Grid container spacing={2} direction="column">
						<Grid item>
							<Typography variant="h5">Search result for "{router.query?.username}"</Typography>
						</Grid>

						<Grid item>
							<Typography variant="subtitle1">No Users found!</Typography>
						</Grid>
						<Waypoint />
					</Grid>
				</Grid>
			</Layout>
		);
	}

	return (
		<Layout>
			<SearchLoading />
		</Layout>
	);
};
