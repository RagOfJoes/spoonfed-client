import { memo } from 'react';
import { useRouter } from 'next/router';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Toolbar from '@material-ui/core/Toolbar';
import { fade } from '@material-ui/core/styles';
import Skeleton from '@material-ui/lab/Skeleton';
import { useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import RecipesLoading from './Recipes/Recipes.loading';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import makeStyles from '@material-ui/core/styles/makeStyles';
import CreationsLoading from './Creations/Creations.loading';

const useStyles = makeStyles(
	({ shape, zIndex, shadows, palette, spacing, typography, breakpoints }) => ({
		container: {
			width: '100%',
		},
		text: {
			marginLeft: spacing(4),

			[breakpoints.down('xs')]: {
				marginLeft: 0,
				marginTop: spacing(2),
			},
		},
		avatar: {
			width: 100,
			height: 100,

			[breakpoints.down('xs')]: {
				width: 80,
				height: 80,
			},
		},

		tabs: {
			alignItems: 'flex-end',
			justifyContent: 'center',
			borderBottom: '1px solid ' + palette.divider,

			[breakpoints.down('xs')]: {
				justifyContent: 'flex-start',
			},
		},
		tab: {
			opacity: 0.5,
			cursor: 'pointer',
			textAlign: 'center',
			position: 'relative',
			padding: spacing(1),
			borderTopLeftRadius: shape.borderRadius,
			borderTopRightRadius: shape.borderRadius,

			[breakpoints.up('sm')]: {
				minWidth: 160,
			},
		},
		tabText: {
			fontWeight: typography.fontWeightMedium,
		},

		tabSelected: {
			opacity: 1,
			cursor: 'pointer',
			textAlign: 'center',
			position: 'relative',
			padding: spacing(1),
			color: palette.getContrastText(palette.background.paper),

			[breakpoints.up('sm')]: {
				minWidth: 160,
			},

			'&:after': {
				left: 0,
				bottom: 0,
				height: 3,
				width: '100%',
				content: '""',
				display: 'block',
				position: 'absolute',
				borderRadius: shape.borderRadius,
				backgroundColor: palette.primary.main,
			},
		},
		iconButton: {
			right: 24,
			bottom: 18,
			margin: 'auto',
			position: 'fixed',
			boxShadow: shadows[2],
			zIndex: zIndex.speedDial,
			backgroundColor: palette.primary.main,
			color: palette.getContrastText(palette.primary.main),

			'&:hover': {
				backgroundColor: fade(palette.primary.main, 0.8),
			},
		},
	}),
	{ name: 'ProfileLoading' }
);

export default memo(() => {
	const theme = useTheme();
	const router = useRouter();
	const classes = useStyles();
	const matches = useMediaQuery(theme.breakpoints.down('xs'));

	const getClassName = (value) => {
		if (value === router.route) return classes.tabSelected;

		return classes.tab;
	};

	return (
		<>
			<Grid container wrap={matches ? 'wrap' : 'nowrap'} direction="row" alignItems="center" className={classes.container}>
				<Grid item>
					<Skeleton variant="circle" className={classes.avatar} />
				</Grid>

				<Hidden smUp implementation="css">
					<Grid item>
						<Skeleton width={200} height={78} />
					</Grid>
				</Hidden>

				<Grid item container direction="column" className={classes.text}>
					<Hidden xsDown implementation="css">
						<Grid item>
							<Skeleton width={200} height={78} />
						</Grid>
					</Hidden>

					<Grid item>
						<Skeleton width={165} height={28} />
					</Grid>

					<Grid item>
						<Skeleton width={180} height={28} />
					</Grid>
				</Grid>
			</Grid>

			<Grid container wrap="nowrap" disableGutters justify="center" className={classes.tabs} component={Toolbar}>
				<Grid item className={getClassName(`/u/[username]`)}>
					<Typography variant="subtitle1" className={classes.tabText}>
						Recipes
					</Typography>
				</Grid>

				<Grid item className={getClassName(`/u/[username]/creations`)}>
					<Typography variant="subtitle1" className={classes.tabText}>
						Creations
					</Typography>
				</Grid>
			</Grid>

			{router.route === '/u/[username]' && <RecipesLoading />}
			{router.route === '/u/[username]/creations' && <CreationsLoading />}
		</>
	);
});
