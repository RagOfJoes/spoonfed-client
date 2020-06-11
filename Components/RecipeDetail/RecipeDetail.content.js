import Times from './Times';
import Link from 'next/link';
import Head from 'next/head';
import { memo } from 'react';
import Header from './Header';
import { useUser } from 'lib/user';
import { useRouter } from 'next/router';
import Ingredients from './Ingredients';
import Instructions from './Instructions';
import Grid from '@material-ui/core/Grid';
import Carousel from 'Components/Carousel';
import Button from '@material-ui/core/Button';
import { fade } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import makeStyles from '@material-ui/core/styles/makeStyles';
import NextImageIcon from '@material-ui/icons/NavigateNextRounded';
import PreviousImageIcon from '@material-ui/icons/NavigateBeforeRounded';

const useStyles = makeStyles(
	(theme) => ({
		container: { overflow: 'hidden', borderRadius: theme.shape.borderRadius },
		content: {
			overflow: 'hidden',
			padding: theme.spacing(2),
		},
		editButton: {
			position: 'absolute',
			right: theme.spacing(2),
			bottom: theme.spacing(2),
			color: theme.palette.text.primary,
			transition: theme.transitions.create('background-color'),
			backgroundColor: fade(theme.palette.background.paper, 0.8),

			'&:hover': {
				backgroundColor: fade(theme.palette.background.paper, 1),
			},
		},
		leftArrow: {
			left: 15,
			zIndex: 1,
			position: 'absolute',
			color: theme.palette.background.paper,
			transition: theme.transitions.create('background-color'),
			backgroundColor: fade(theme.palette.getContrastText(theme.palette.background.paper), 0.6),

			'&:hover': {
				transition: theme.transitions.create('background-color'),
				backgroundColor: fade(theme.palette.getContrastText(theme.palette.background.paper), 0.8),
			},
		},
		rightArrow: {
			right: 15,
			zIndex: 1,
			position: 'absolute',
			color: theme.palette.background.paper,
			transition: theme.transitions.create('background-color'),
			backgroundColor: fade(theme.palette.getContrastText(theme.palette.background.paper), 0.6),

			'&:hover': {
				transition: theme.transitions.create('background-color'),
				backgroundColor: fade(theme.palette.getContrastText(theme.palette.background.paper), 0.8),
			},
		},
	}),
	{ name: 'RecipeDetailContent' }
);

export default memo((props) => {
	const { user } = useUser();
	const router = useRouter();
	const classes = useStyles();

	const { id, name, time, images, onLike, isLiked, servings, importUrl, createdBy, ingredients, instructions } = props;
	return (
		<>
			<Head>
				<title>{name || 'Recipe Detail'} | Spoonfed</title>
				<meta key="title" property="og:title" content={name || 'Recipe Detail'} />
				<meta key="image" property="og:image" content={images[0].url || '/images/favicon-64.png'} />
			</Head>
			<Grid container direction="column" alignItems="center" className={classes.container}>
				<Grid item xs={12} style={{ width: '100%', position: 'relative' }}>
					<Carousel
						disableDots
						title={name}
						images={images}
						carouselProps={{
							slidesPerScroll: 1,
							addArrowClickHandler: true,
							arrowLeftDisabled: <span />,
							arrowRightDisabled: <span />,
							arrowLeft: (
								<IconButton size="small" centerRipple className={classes.leftArrow}>
									<PreviousImageIcon />
								</IconButton>
							),
							arrowRight: (
								<IconButton size="small" centerRipple className={classes.rightArrow}>
									<NextImageIcon />
								</IconButton>
							),
						}}
					/>
					{user && createdBy?.sub && user?.sub === createdBy?.sub && (
						<Link
							as={`/r/edit/${router?.query?.recipeSlug}`}
							href={{ pathname: '/r/edit/[recipeSlug]', query: { recipeSlug: router?.query?.recipeSlug } }}
						>
							<Button color="default" variant="contained" className={classes.editButton}>
								Edit
							</Button>
						</Link>
					)}
				</Grid>

				<Grid item container spacing={2} direction="column" alignItems="center" className={classes.content}>
					<Header
						id={id}
						name={name}
						onLike={onLike}
						isLiked={isLiked}
						servings={servings}
						importUrl={importUrl}
						createdBy={createdBy}
					/>

					<Grid item spacing={1} container>
						<Grid xs={12} md={4} item container spacing={2} direction="column">
							<Times id={id} time={time} />

							<Ingredients id={id} ingredients={ingredients} />
						</Grid>

						<Grid xs={12} md={8} item container>
							<Instructions id={id} instructions={instructions} />
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</>
	);
});
