import Link from 'next/link';
import Create from './Create';
import { useState } from 'react';
import { useUser } from 'lib/user';
import { useRouter } from 'next/router';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Toolbar from '@material-ui/core/Toolbar';
import { fade } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ExpandableSearch from 'views/ExpandableSearch';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(
	(theme) => ({
		tabs: {
			alignItems: 'flex-end',
		},
		tab: {
			opacity: 0.5,
			cursor: 'pointer',
			textAlign: 'center',
			position: 'relative',
			padding: theme.spacing(1),
			borderRadius: theme.shape.borderRadius,

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
				bottom: 0,
				height: 3,
				width: 15,
				left: '50%',
				content: '""',
				display: 'block',
				position: 'absolute',
				transform: 'translateX(-50%)',
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
	{ name: 'AppBarRoutes' }
);

export default () => {
	const router = useRouter();
	const { user } = useUser();
	const classes = useStyles();
	const [value, setValue] = useState('');

	const getClassName = (value) => {
		if (value === router.route) return classes.tabSelected;

		return classes.tab;
	};

	return (
		<Grid container wrap="nowrap" justify="space-between" className={classes.tabs} component={Toolbar}>
			<Grid item container>
				<Link shallow href={{ pathname: '/recipes', query: {} }}>
					<Grid item className={getClassName('/recipes')}>
						<Typography variant="subtitle1" className={classes.tabText}>
							Recipes
						</Typography>
					</Grid>
				</Link>

				<Link shallow href={{ pathname: '/creations', query: {} }}>
					<Grid item className={getClassName('/creations')}>
						<Typography variant="subtitle1" className={classes.tabText}>
							Creations
						</Typography>
					</Grid>
				</Link>
			</Grid>

			<Hidden xsDown>
				<Grid item style={{ margin: 'auto' }}>
					<form
						onSubmit={async (e) => {
							e.preventDefault();
							if (!value || value.length <= 0) return;

							router.push({ pathname: '/u/search', query: { username: value } }, `/u/search?username=${value}`, {
								scroll: true,
								shallow: true,
							});
							setValue('');
						}}
					>
						<ExpandableSearch value={value} onChange={(e) => setValue(e.target.value)} />
					</form>
				</Grid>
			</Hidden>

			{user && <Create />}
		</Grid>
	);
};
