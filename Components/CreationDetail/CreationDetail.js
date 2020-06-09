import { memo } from 'react';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';
import Grid from '@material-ui/core/Grid';
import { useQuery } from '@apollo/react-hooks';
import Typography from '@material-ui/core/Typography';
import { GetCreationDetailQuery } from 'graphql/Queries';
import CreationDetailLoading from './CreationDetail.loading';
import CreationDetailContent from './CreationDetail.content';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { handleAuthError, isAuthError } from 'graphql/handlers';

const useStyles = makeStyles(
	(theme) => ({
		content: {
			overflow: 'hidden',
			padding: theme.spacing(2),
		},
	}),
	{ name: 'RecipeDetail' }
);

export default memo(({ onLike, onError }) => {
	const router = useRouter();
	const classes = useStyles();
	const { enqueueSnackbar } = useSnackbar();
	const { data, error, loading } = useQuery(GetCreationDetailQuery, {
		skip: !router.query.creationSlug,
		variables: {
			slug: router?.query?.creationSlug,
		},
		onError: async (e) => {
			if (onError && typeof onError === 'function') await onError(e);

			await handleAuthError(e, null, enqueueSnackbar);
		},
	});

	if (error) {
		if (isAuthError(error)) return <CreationDetailLoading />;

		return (
			<Grid container direction="column" className={classes.content}>
				<Typography>An Error has Occured</Typography>
			</Grid>
		);
	}

	if (!loading && data?.getCreationDetail) return <CreationDetailContent {...data?.getCreationDetail} onLike={onLike} />;

	if (!loading && !error && router?.query?.creationSlug && !data?.getCreationDetail) return <h1>Error</h1>;

	if (loading) return <CreationDetailLoading />;

	return null;
});
