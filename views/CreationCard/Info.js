import Link from 'next/link';
import { memo } from 'react';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import LikedIcon from '@material-ui/icons/Favorite';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';
import UnLikedIcon from '@material-ui/icons/FavoriteBorderRounded';

const useStyles = makeStyles(
	({ spacing, palette, typography }) => ({
		info: {
			zIndex: 1,
			position: 'relative',
			padding: spacing(2, 3),
			paddingBottom: spacing(3),
			borderBottomLeftRadius: 4,
			borderBottomRightRadius: 4,
			backgroundColor: palette.background.default,
		},
		avatar: {
			width: 48,
			height: 48,
			cursor: 'pointer',
		},
		infoText: {
			width: 'auto',
			cursor: 'pointer',
			overflow: 'hidden',
			paddingLeft: spacing(2),
		},
		infoTitle: {
			lineHeight: 1.2,
			fontSize: '1rem',
			fontWeight: typography.fontWeightMedium,
		},
		infoSubtitle: {
			lineHeight: 1.75,
			fontSize: '0.875rem',
			color: palette.grey['500'],
		},
	}),
	{ name: 'CreationCardInfo' }
);

export default memo(({ name, avatar, username, onLike, isLiked }) => {
	const styles = useStyles();
	return (
		<Grid container wrap="nowrap" alignItems="center" className={styles.info}>
			<Link
				as={`/u/${username}/t/creations`}
				href={{ query: { username, tab: 'creations' }, pathname: '/u/[username]/t/[tab]' }}
			>
				<Grid item>
					<Avatar src={avatar} alt={`${name}'s Avatar`} className={styles.avatar} />
				</Grid>
			</Link>

			<Link
				as={`/u/${username}/t/creations`}
				href={{ query: { username, tab: 'creations' }, pathname: '/u/[username]/t/[tab]' }}
			>
				<Grid item container direction="column" className={styles.infoText}>
					<Grid item>
						<Typography noWrap className={styles.infoTitle} variant="h6">
							{username}
						</Typography>
					</Grid>

					<Grid item>
						<Typography noWrap className={styles.infoSubtitle}>
							{name}
						</Typography>
					</Grid>
				</Grid>
			</Link>

			<Grid item style={{ marginLeft: 'auto' }}>
				<IconButton centerRipple onClick={async () => typeof onLike === 'function' && (await onLike())}>
					{isLiked ? <LikedIcon fontSize="small" color="error" /> : <UnLikedIcon fontSize="small" />}
				</IconButton>
			</Grid>
		</Grid>
	);
});
