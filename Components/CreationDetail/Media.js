import Link from 'next/link';
import { memo } from 'react';
import { useUser } from 'lib/user';
import { useRouter } from 'next/router';
import Box from '@material-ui/core/Box';
import Carousel from 'Components/Carousel';
import Button from '@material-ui/core/Button';
import { fade } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import makeStyles from '@material-ui/core/styles/makeStyles';
import NextImageIcon from '@material-ui/icons/NavigateNextRounded';
import PreviousImageIcon from '@material-ui/icons/NavigateBeforeRounded';

const useStyles = makeStyles(
	({ spacing, palette, transitions }) => ({
		main: {
			zIndex: 1,
			overflow: 'hidden',
		},
		editButton: {
			position: 'absolute',
			right: spacing(2),
			bottom: spacing(2),
			color: palette.text.primary,
			transition: transitions.create('background-color'),
			backgroundColor: fade(palette.background.paper, 0.8),

			'&:hover': {
				backgroundColor: fade(palette.background.paper, 1),
			},
		},
		leftArrow: {
			left: 15,
			zIndex: 1,
			position: 'absolute',
			color: palette.background.paper,
			transition: transitions.create('background-color'),
			backgroundColor: fade(palette.getContrastText(palette.background.paper), 0.6),

			'&:hover': {
				transition: transitions.create('background-color'),
				backgroundColor: fade(palette.getContrastText(palette.background.paper), 0.8),
			},
		},
		rightArrow: {
			right: 15,
			zIndex: 1,
			position: 'absolute',
			color: palette.background.paper,
			transition: transitions.create('background-color'),
			backgroundColor: fade(palette.getContrastText(palette.background.paper), 0.6),

			'&:hover': {
				transition: transitions.create('background-color'),
				backgroundColor: fade(palette.getContrastText(palette.background.paper), 0.8),
			},
		},
	}),
	{ name: 'CreationDetailMedia' }
);

export default memo(({ title, images, createdBy }) => {
	const { user } = useUser();
	const styles = useStyles();
	const router = useRouter();
	return (
		<Box width="100%" className={styles.main} position={'relative'}>
			<Carousel
				disableDots
				title={title}
				images={images}
				carouselProps={{
					slidesPerScroll: 1,
					addArrowClickHandler: true,
					arrowLeftDisabled: <span />,
					arrowRightDisabled: <span />,
					arrowLeft: (
						<IconButton size="small" centerRipple className={styles.leftArrow}>
							<PreviousImageIcon />
						</IconButton>
					),
					arrowRight: (
						<IconButton size="small" centerRipple className={styles.rightArrow}>
							<NextImageIcon />
						</IconButton>
					),
				}}
			/>

			{user && createdBy?.sub && user?.sub === createdBy?.sub && (
				<Link
					as={`/c/edit/${router?.query?.creationSlug}`}
					href={{ pathname: '/c/edit/[creationSlug]', query: { recipeSlug: router?.query?.creationSlug } }}
				>
					<Button color="default" variant="contained" className={styles.editButton}>
						Edit
					</Button>
				</Link>
			)}
		</Box>
	);
});
