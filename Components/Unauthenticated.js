import Link from 'next/link';
import Layout from 'Components/Layout';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { UNAUTHENTICATED_MSG } from 'constants/index';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(
	() => ({
		container: {
			height: '100%',
			overflow: 'hidden',
		},
		image: {
			width: '100%',
			maxWidth: 800,
		},
	}),
	{ name: 'Unauthenticated' }
);

export default () => {
	const classes = useStyles();
	return (
		<Layout>
			<Grid container spacing={3} direction="column" justify="center" alignItems="center" className={classes.container}>
				<Grid item>
					<Typography variant="h6">{UNAUTHENTICATED_MSG}</Typography>
				</Grid>

				<Grid item container spacing={2} justify="center" alignItems="center">
					<Grid item>
						<Link href="/api/login">
							<Button color="primary" variant="contained">
								Sign-in
							</Button>
						</Link>
					</Grid>

					<Grid item>
						<Link href="/api/signup">
							<Button variant="outlined">Create an account</Button>
						</Link>
					</Grid>
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
		</Layout>
	);
};
