import Link from 'next/link';
import { useUser } from 'lib/user';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Layout from 'Components/Layout/Layout';
import Typography from '@material-ui/core/Typography';
import { useThemeType } from 'lib/Providers/ThemeProvider';
import makeStyles from '@material-ui/core/styles/makeStyles';
import ArrowForwardRoundedIcon from '@material-ui/icons/ArrowForwardRounded';

const useStyles = makeStyles(
	({ spacing, breakpoints, typography }) => ({
		container: {
			height: '100%',
		},
		wrapper: {
			flexDirection: 'row',
			justifyContent: 'space-between',

			[breakpoints.down('sm')]: {
				alignItems: 'center',
				justifyContent: 'center',
				flexDirection: 'column-reverse',
			},
		},
		introContainer: {
			zIndex: 1,
			maxWidth: 500,
			padding: spacing(1, 4),

			[breakpoints.down('sm')]: {
				maxWidth: 475,
			},

			[breakpoints.down('xs')]: {
				maxWidth: 425,
			},
		},
		title: {
			fontWeight: typography.fontWeightMedium,
		},
		subtitle: {
			fontWeight: typography.fontWeightMedium,
		},
		imageContainer: {
			maxWidth: 500,
			width: '100%',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',

			[breakpoints.down('md')]: {
				maxWidth: 425,
			},
		},
		image: {
			width: '100%',
		},
	}),
	{ name: 'WelcomePage' }
);

export default () => {
	const classes = useStyles();
	const { theme } = useThemeType();
	const { user } = useUser();
	return (
		<Layout>
			<Grid container direction="column" justify="center" alignItems="center" className={classes.container}>
				<Grid item container spacing={2} justify="space-between" className={classes.wrapper}>
					<Grid
						item
						md={8}
						container
						spacing={2}
						justify="center"
						direction="column"
						className={classes.introContainer}
					>
						<Grid item>
							<Typography variant="h4" className={classes.title}>
								Cooking made easy
							</Typography>
						</Grid>

						<Grid item>
							<Typography variant="subtitle1" color="textSecondary" className={classes.subtitle}>
								Store all your favorite recipes and perfect your cooking by tracking your progress. Take notes on
								area of improvements and share with others.
							</Typography>
						</Grid>

						<Grid item>
							<Link href={user ? '/recipes' : '/api/signup'}>
								<Button color="primary" variant="contained" endIcon={<ArrowForwardRoundedIcon />}>
									Get Started
								</Button>
							</Link>
						</Grid>
					</Grid>

					<Grid item className={classes.imageContainer}>
						{theme === 'light' ? (
							<img className={classes.image} src="images/Light-HomeImage.svg" />
						) : (
							<img className={classes.image} src="images/Dark-HomeImage.svg" />
						)}
					</Grid>
				</Grid>
			</Grid>
		</Layout>
	);
};
