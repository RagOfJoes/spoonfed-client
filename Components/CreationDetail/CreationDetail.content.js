import Meta from './Meta';
import Head from 'next/head';
import { memo } from 'react';
import Media from './Media';
import { useUser } from 'lib/user';
import { useSnackbar } from 'notistack';
import Grid from '@material-ui/core/Grid';
import { fade } from '@material-ui/core/styles';
import { useMutation } from '@apollo/react-hooks';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { LikeCreationMutation, UnlikeCreationMutation } from 'graphql/Mutations';

const useStyles = makeStyles(
	(theme) => ({
		container: { overflow: 'hidden', borderRadius: theme.shape.borderRadius },
		content: {
			overflow: 'hidden',
			padding: theme.spacing(2),
		},
		editButton: {
			position: 'absolute',
			right: theme.spacing(1),
			bottom: theme.spacing(0.5),
			color: theme.palette.text.primary,
			transition: theme.transitions.create('background-color'),
			backgroundColor: fade(theme.palette.background.paper, 0.8),

			'&:hover': {
				backgroundColor: fade(theme.palette.background.paper, 1),
			},
		},
	}),
	{ name: 'CreationDetailContent' }
);

export default memo((props) => {
	const { user } = useUser();
	const classes = useStyles();
	const { enqueueSnackbar } = useSnackbar();

	const { id, title, images, recipe, isLiked, createdBy, description } = props;

	const [likeCreationMutation] = useMutation(LikeCreationMutation, {
		onError: async (e) => {
			if (user) return await handleAuthError(e, null, enqueueSnackbar);
		},
	});
	const [unlikeCreationMutation] = useMutation(UnlikeCreationMutation, {
		onError: async (e) => {
			if (user) return await handleAuthError(e, null, enqueueSnackbar);
		},
	});

	const onLike = async () => {
		if (!user) {
			enqueueSnackbar(UNAUTHENTICATED_MSG, {
				variant: 'error',
			});
			return;
		}
		const variables = { creationId: id };
		const optimisticResponse = {
			__typename: 'Mutation',
			[isLiked ? 'unlikeCreation' : 'likeCreation']: {
				id,
				isLiked: !isLiked,
				__typename: 'Creation',
			},
		};

		if (isLiked) await unlikeCreationMutation({ variables, optimisticResponse });
		else await likeCreationMutation({ variables, optimisticResponse });
	};
	return (
		<>
			<Head>
				<title>{title || 'Creation Detail'} | Spoonfed</title>
				<meta key="image" property="og:image" content={images[0].url || '/images/favicon-64.png'} />
			</Head>
			<Grid container direction="column" alignItems="center" className={classes.container}>
				<Media title={title} images={images} createdBy={createdBy} />
				<Meta {...createdBy} title={title} recipe={recipe} description={description} onLike={onLike} isLiked={isLiked} />
			</Grid>
		</>
	);
});
