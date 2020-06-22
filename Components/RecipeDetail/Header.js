import Link from 'next/link';
import { memo } from 'react';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import LinkIcon from '@material-ui/icons/Link';
import { fade } from '@material-ui/core/styles';
import LikedIcon from '@material-ui/icons/Favorite';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import makeStyles from '@material-ui/core/styles/makeStyles';
import UnLikedIcon from '@material-ui/icons/FavoriteBorderRounded';
import RestaurantRoundedIcon from '@material-ui/icons/RestaurantRounded';

const useStyles = makeStyles(
	(theme) => ({
		header: {
			[theme.breakpoints.down('xs')]: {
				flexWrap: 'nowrap',
			},
		},
		collapseContainer: {
			width: '100%',
			overflow: 'hidden',
			padding: theme.spacing(1),
		},
		importContainer: {
			width: '100%',
			overflow: 'hidden',
			whiteSpace: 'nowrap',
			textOverflow: 'ellipsis',
			backgroundColor: theme.palette.info.main,

			'&:hover': {
				backgroundColor: fade(theme.palette.info.main, 0.8),
			},
		},
		importIcon: {
			color: theme.palette.getContrastText(theme.palette.info.main),
		},
		importUrl: {
			overflow: 'hidden',
			whiteSpace: 'nowrap',
			textOverflow: 'ellipsis',
			color: theme.palette.getContrastText(theme.palette.info.main),
		},
		servings: {
			color: theme.palette.type === 'dark' ? theme.palette.text.secondary : theme.palette.grey[600],
		},
		servingsText: {
			textTransform: 'lowercase',
			fontWeight: theme.typography.fontWeightMedium,
		},
	}),
	{ name: 'RecipeDetailHeader' }
);

const pretifyUrl = (url) => {
	const u = new URL(url);

	return `${u.protocol}//${u.hostname}`;
};

export default memo(
	({
		id,
		name,
		onLike,
		isLiked,
		servings,
		importUrl,
		createdBy: {
			avatar,
			username,
			name: { full },
		},
	}) => {
		const classes = useStyles();

		return (
			<>
				<Grid item xs={12} container wrap="nowrap" alignItems="center" justify="space-between" className={classes.header}>
					<Grid item container spacing={1} direction="column" style={{ overflow: 'hidden' }}>
						<Grid item xs={12} style={{ overflow: 'hidden' }}>
							<Typography noWrap variant="h6">
								{name}
							</Typography>
						</Grid>
					</Grid>

					<Grid item container justify="flex-end" alignItems="center" style={{ width: '100%', overflow: 'hidden' }}>
						<Grid item>
							<IconButton onClick={async () => typeof onLike === 'function' && (await onLike(id, isLiked))}>
								{isLiked ? <LikedIcon fontSize="small" color="error" /> : <UnLikedIcon fontSize="small" />}
							</IconButton>
						</Grid>
					</Grid>
				</Grid>
				<Grid item container spacing={2} alignItems="center">
					<Grid item>
						<Link
							shallow
							as={`/u/${username}/t/recipes`}
							href={{ query: { username, tab: 'recipes' }, pathname: '/u/[username]/t/[tab]' }}
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

					<Grid item className={classes.servings}>
						<Chip size="small" color="default" label={servings} icon={<RestaurantRoundedIcon fontSize="small" />} />
					</Grid>

					{importUrl && (
						<Grid item>
							<Chip
								clickable
								size="small"
								component="a"
								color="default"
								target="_blank"
								href={importUrl}
								rel="noopener noreferrer"
								className={classes.importContainer}
								icon={<LinkIcon fontSize="small" className={classes.importIcon} />}
								label={
									<Typography noWrap variant="caption" className={classes.importUrl}>
										{pretifyUrl(importUrl)}
									</Typography>
								}
							/>
						</Grid>
					)}
				</Grid>
			</>
		);
	}
);
