import Link from 'next/link';
import { memo } from 'react';
import LazyLoad from 'react-lazyload';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import Skeleton from '@material-ui/lab/Skeleton';
import CardMedia from '@material-ui/core/CardMedia';
import LikedIcon from '@material-ui/icons/Favorite';
import RecipeCardLoading from './RecipeCard.loading';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { useRecipeCardStyle } from './RecipeCard.style';
import { useBouncyShadow } from 'lib/hooks/useBouncyShadow';
import CardActionArea from '@material-ui/core/CardActionArea';
import UnLikedIcon from '@material-ui/icons/FavoriteBorderRounded';
import RestaurantRoundedIcon from '@material-ui/icons/RestaurantRounded';
import AccessTimeRoundedIcon from '@material-ui/icons/AccessTimeRounded';
import ChevronRightRoundedIcon from '@material-ui/icons/ChevronRightRounded';

export default memo(
	({
		as,
		name,
		href,
		slug,
		images,
		onLike,
		skeleton,
		isLiked,
		servings,
		totalTime,
		createdBy: { avatar, username, name: { full } } = { avatar: '', username: '', name: { full: '' } },
	}) => {
		const shadow = useBouncyShadow();
		const classes = useRecipeCardStyle();

		if (skeleton) return <RecipeCardLoading />;

		return (
			<Card elevation={0} className={`${classes.container} ${shadow.root}`}>
				<Link shallow scroll={false} href={href || `/?recipeSlug=${slug}`} as={as || `/r/${slug}`}>
					<CardActionArea className={classes.imageBtn}>
						<LazyLoad
							once
							debounce
							height={250}
							placeholder={<Skeleton variant="rect" width="100%" height={250} />}
						>
							<CardMedia image={images[0].url} className={classes.image} />
						</LazyLoad>
					</CardActionArea>
				</Link>
				<CardContent className={classes.content}>
					<Grid container wrap="nowrap" alignItems="center" justify="space-between">
						<Grid item style={{ overflow: 'hidden' }}>
							<Typography variant="subtitle1" className={classes.name}>
								{name}
							</Typography>
						</Grid>

						<Grid item>
							<IconButton centerRipple onClick={async () => typeof onLike === 'function' && (await onLike())}>
								{isLiked ? <LikedIcon fontSize="small" color="error" /> : <UnLikedIcon fontSize="small" />}
							</IconButton>
						</Grid>
					</Grid>
				</CardContent>
				<CardActions className={classes.actions}>
					<Grid container spacing={1} alignItems="center">
						<Grid item>
							<Link shallow href={{ pathname: '/u/[username]', query: { username } }} as={`/u/${username}`}>
								<Chip
									clickable
									size="small"
									color="default"
									label={username}
									avatar={
										<Avatar src={avatar} alt="Avatar">
											{full[0]}
										</Avatar>
									}
								/>
							</Link>
						</Grid>

						<Grid item xs={12} className={classes.divider}>
							<Divider variant="middle" />
						</Grid>

						<Grid item xs={12} container spacing={1} alignItems="center" className={classes.meta}>
							<Grid item style={{ display: 'inline-flex' }}>
								<AccessTimeRoundedIcon fontSize="small" />
							</Grid>

							<Grid item>
								<Typography variant="caption" className={classes.metaText}>
									{totalTime}
								</Typography>
							</Grid>

							<Grid item style={{ display: 'inline-flex' }}>
								<RestaurantRoundedIcon fontSize="small" />
							</Grid>

							<Grid item>
								<Typography variant="caption" className={classes.metaText}>
									{servings}
								</Typography>
							</Grid>

							<Grid item style={{ marginLeft: 'auto' }}>
								<Link scroll={false} href={href || `/?recipeSlug=${slug}`} as={`/r/${slug}`}>
									<IconButton size="small">
										<ChevronRightRoundedIcon />
									</IconButton>
								</Link>
							</Grid>
						</Grid>
					</Grid>
				</CardActions>
			</Card>
		);
	}
);
