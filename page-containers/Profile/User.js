import { memo } from 'react';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Avatar from '@material-ui/core/Avatar';
import { useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { useProfile } from 'lib/Providers/ProfileProvider';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(
	({ spacing, palette, breakpoints, typography }) => ({
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
		username: {
			marginLeft: spacing(2),
		},
		name: {
			color: palette.grey[500],
		},
		bio: {
			fontWeight: typography.fontWeightRegular,
		},
	}),
	{ name: 'ProfileInfo' }
);

export default memo(() => {
	const theme = useTheme();
	const classes = useStyles();
	const { profile } = useProfile();
	const matches = useMediaQuery(theme.breakpoints.down('xs'));

	const {
		bio,
		avatar,
		username,
		name: { full },
	} = profile.data;
	return (
		<Grid container wrap={matches ? 'wrap' : 'nowrap'} direction="row" alignItems="center" className={classes.container}>
			<Grid item>
				<Avatar src={avatar} alt="Avatar" className={classes.avatar}>
					{full[0]}
				</Avatar>
			</Grid>

			<Hidden smUp implementation="css">
				<Grid item>
					<Typography variant="h6" className={classes.username}>
						{username}
					</Typography>
				</Grid>
			</Hidden>

			<Grid item container direction="column" className={classes.text}>
				<Hidden xsDown implementation="css">
					<Grid item>
						<Typography variant="h6">{username}</Typography>
					</Grid>
				</Hidden>

				<Grid item>
					<Typography variant="subtitle2" className={classes.name}>
						{full}
					</Typography>
				</Grid>

				{bio && bio.length > 0 && (
					<Grid item>
						<Typography variant="subtitle2" className={classes.bio}>
							{bio}
						</Typography>
					</Grid>
				)}
			</Grid>
		</Grid>
	);
});
