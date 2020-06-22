import { memo } from 'react';
import Link from 'next/link';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import LikedIcon from '@material-ui/icons/Favorite';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import makeStyles from '@material-ui/core/styles/makeStyles';
import UnLikedIcon from '@material-ui/icons/FavoriteBorderRounded';

const useStyles = makeStyles(
	({ spacing, palette, typography }) => ({
		header: {
			padding: spacing(2, 3),
		},
		titleContainer: {
			overflow: 'hidden',
		},
		title: {
			color: palette.text.primary,
			fontWeight: typography.fontWeightMedium,

			'user-select': 'none',
			'-ms-user-select': 'none' /* Internet Explorer/Edge */,
			'-moz-user-select': 'none' /* Old versions of Firefox */,
			'-khtml-user-select': 'none' /* Konqueror HTML */,
			'-webkit-user-select': 'none' /* Safari */,
			'-webkit-touch-callout': 'none' /* iOS Safari */,
		},
		info: {
			zIndex: 1,
			position: 'relative',
			padding: spacing(2, 3),
		},
		avatar: {
			width: 48,
			height: 48,
			cursor: 'pointer',
		},
		infoText: {
			width: 'auto',
			cursor: 'pointer',
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
		chip: {
			zIndex: 1,
			position: 'relative',
			padding: spacing(0, 3),
			paddingBottom: spacing(3),
		},
	}),
	{ name: 'CreationDetailMeta' }
);

export default memo(({ title, avatar, isLiked, onLike, description, username, name: { full }, recipe: { name, slug } }) => {
	const styles = useStyles();
	return (
		<>
			<Grid xs={12} item container wrap="nowrap" alignItems="center" className={styles.header}>
				<Grid item className={styles.titleContainer}>
					<Typography noWrap variant="h5" className={styles.title}>
						{title}
					</Typography>
				</Grid>

				<Grid item style={{ marginLeft: 'auto' }}>
					<IconButton centerRipple onClick={async () => typeof onLike === 'function' && (await onLike())}>
						{isLiked ? <LikedIcon fontSize="small" color="error" /> : <UnLikedIcon fontSize="small" />}
					</IconButton>
				</Grid>
			</Grid>

			<Grid container spacing={1} alignItems="center" className={styles.chip}>
				<Grid item>
					<Link
						shallow
						as={`/u/${username}/t/creations`}
						href={{ query: { username, tab: 'creations' }, pathname: '/u/[username]/t/[tab]' }}
					>
						<Chip
							clickable
							size="small"
							color="default"
							label={username}
							avatar={
								<Avatar alt={username} title={username} src={avatar} alt="Avatar">
									{full[0]}
								</Avatar>
							}
						/>
					</Link>
				</Grid>

				<Link as={`/r/${slug}`} href={{ query: { recipeSlug: slug }, pathname: '/r/[recipeSlug]' }}>
					<Chip size="small" centerRipple label={name} icon={<RestaurantIcon />}></Chip>
				</Link>
			</Grid>

			<Grid item container className={styles.chip}>
				<Typography variant="body1">{description}</Typography>
			</Grid>
		</>
	);
});
