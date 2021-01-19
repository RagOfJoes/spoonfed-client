import { useUser } from 'lib/user';
import { useRouter } from 'next/router';
import Grid from '@material-ui/core/Grid';
import CTACard from 'views/CTACard/CTACard';
import Skeleton from '@material-ui/lab/Skeleton';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
	card: {
		overflow: 'hidden',
		position: 'relative',
	},

}));

const CallToAction = ({}) => {
	const router = useRouter();
	const classes = useStyles();
	const { user, loading } = useUser();

	if (!user && !loading) {
		return (
			<Grid item xs={12} className={classes.card}>
				<CTACard
					buttonText="Sign me up!"
					title="Getting started is easy"
					onClickButton={() => router.push('/api/signup')}
					description="Join others and make cooking simpler!"
				/>
			</Grid>
		);
	}

	if (loading) {
		return (
			<Grid item xs={12}>
				<Skeleton variant="rect" height={225} />
			</Grid>
		);
	}

	return null;
};

export default CallToAction;
