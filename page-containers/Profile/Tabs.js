import Link from 'next/link';
import { useRouter } from 'next/router';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import { fade } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { useProfile } from 'lib/Providers/ProfileProvider';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(
	(theme) => ({
		tabs: {
			alignItems: 'flex-end',
			justifyContent: 'center',
			borderBottom: '1px solid ' + theme.palette.divider,

			[theme.breakpoints.down('xs')]: {
				justifyContent: 'flex-start',
			},
		},
		tab: {
			opacity: 0.5,
			cursor: 'pointer',
			textAlign: 'center',
			position: 'relative',
			padding: theme.spacing(1),
			borderTopLeftRadius: theme.shape.borderRadius,
			borderTopRightRadius: theme.shape.borderRadius,

			[theme.breakpoints.up('sm')]: {
				minWidth: 160,
			},
		},
		tabText: {
			fontWeight: theme.typography.fontWeightMedium,
		},

		tabSelected: {
			opacity: 1,
			cursor: 'pointer',
			textAlign: 'center',
			position: 'relative',
			padding: theme.spacing(1),
			color: theme.palette.getContrastText(theme.palette.background.paper),

			[theme.breakpoints.up('sm')]: {
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
				borderRadius: theme.shape.borderRadius,
				backgroundColor: theme.palette.primary.main,
			},
		},
		iconButton: {
			right: 24,
			bottom: 18,
			margin: 'auto',
			position: 'fixed',
			boxShadow: theme.shadows[2],
			zIndex: theme.zIndex.speedDial,
			backgroundColor: theme.palette.primary.main,
			color: theme.palette.getContrastText(theme.palette.primary.main),

			'&:hover': {
				backgroundColor: fade(theme.palette.primary.main, 0.8),
			},
		},
	}),
	{ name: 'ProfileTabs' }
);

const Tabs = () => {
	const router = useRouter();
	const classes = useStyles();
	const { profile } = useProfile();

	const getClassName = (value) => {
		if (value === router.query?.tab) return classes.tabSelected;

		return classes.tab;
	};

	const { username } = profile.data;
	return (
		<Grid container wrap="nowrap" disableGutters justify="center" className={classes.tabs} component={Toolbar}>
			<Link shallow as={`/u/${username}/t/recipes`} href={{ query: { username, tab: 'recipes' }, pathname: '/u/[username]/t/[tab]' }}>
				<Grid item className={getClassName(`recipes`)}>
					<Typography variant="subtitle1" className={classes.tabText}>
						Recipes
					</Typography>
				</Grid>
			</Link>

			<Link
				shallow
				as={`/u/${username}/t/creations`}
				href={{ query: { username, tab: 'creations' }, pathname: '/u/[username]/t/[tab]' }}
			>
				<Grid item className={getClassName(`creations`)}>
					<Typography variant="subtitle1" className={classes.tabText}>
						Creations
					</Typography>
				</Grid>
			</Link>
		</Grid>
	);
};

export default Tabs;
