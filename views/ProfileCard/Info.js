import Link from 'next/link';
import Tooltip from './Tooltip';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import CallMade from '@material-ui/icons/CallMade';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(
	({ spacing, palette, breakpoints, typography }) => ({
		container: {
			padding: spacing(2),
			position: 'relative',

			[breakpoints.down('xs')]: {
				padding: spacing(1),
			},
		},
		avatar: {
			width: 50,
			height: 50,
			backgroundColor: palette.primary.main,

			[breakpoints.down('sm')]: {
				width: 45,
				height: 45,
			},
		},
		text: {
			display: 'flex',
			overflow: 'hidden',
			flexDirection: 'column',
			justifyContent: 'center',
		},
		overline: {
			fontSize: typography.pxToRem(16),
			fontWeight: typography.fontWeightMedium,
		},
		name: {
			fontSize: typography.pxToRem(14),
			fontWeight: typography.fontWeightRegular,
		},
	}),
	{ name: 'ProfileCardInfo' }
);

const Info = ({ avatar, name, username }) => {
	const classes = useStyles();
	return (
		<Grid container spacing={2} alignItems="center" className={classes.container}>
			<Grid item>
				<Avatar src={avatar} className={classes.avatar}>
					{name[0]}
				</Avatar>
			</Grid>

			<Grid item xs={12} sm="auto" className={classes.text}>
				<Typography noWrap className={classes.overline}>
					{name}
				</Typography>
				<Typography noWrap className={classes.name}>
					{username}
				</Typography>
			</Grid>

			<Link
				shallow
				as={`/u/${username}/t/recipes`}
				href={{ pathname: '/u/[username]/t/[tab]', query: { username, tab: 'recipes' } }}
			>
				<div style={{ top: 0, right: 0, position: 'absolute' }}>
					<Tooltip title={'See profile'}>
						<IconButton>
							<CallMade fontSize="small" />
						</IconButton>
					</Tooltip>
				</div>
			</Link>
		</Grid>
	);
};

export default Info;
