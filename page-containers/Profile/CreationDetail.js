import { useUser } from 'lib/user';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { useState, useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import { useMutation } from '@apollo/react-hooks';
import { UNAUTHENTICATED_MSG } from 'constants/index';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { handleAuthError, isAuthError } from 'graphql/handlers';
import { useAllRecipes } from 'lib/Providers/AllRecipesProvider';
import CreationDetail from 'Components/CreationDetail/CreationDetail';
import { LikeRecipeMutation, UnlikeRecipeMutation } from 'graphql/Mutations';

const useStyles = makeStyles(
	(theme) => ({
		container: {
			width: '100%',
			overflow: 'hidden',
			[theme.breakpoints.down('xs')]: {
				margin: theme.spacing(2),
				maxWidth: `calc(100% - ${theme.spacing(4)}px) !important`,
			},
		},
	}),
	{ name: 'CreationDetailDialog' }
);

export default () => {
	const { user } = useUser();
	const router = useRouter();
	const classes = useStyles();
	const { sort } = useAllRecipes();
	const { enqueueSnackbar } = useSnackbar();
	const [hasError, toggleError] = useState(false);

	useEffect(() => () => toggleError(false), []);
	const onClose = () =>
		!hasError &&
		router.push(
			{ pathname: '/u/[username]/creations', query: { username: router.query.username } },
			`/u/${router.query.username}/creations`,
			{
				scroll: false,
				shallow: true,
			}
		);
	return (
		<Dialog
			maxWidth="md"
			scroll="body"
			onClose={onClose}
			onBackdropClick={onClose}
			disableBackdropClick={hasError}
			disableEscapeKeyDown={hasError}
			open={!!router?.query?.creationSlug}
			PaperProps={{
				className: classes.container,
			}}
		>
			<CreationDetail
				onError={(e) => {
					if (isAuthError(e)) toggleError(true);
				}}
			/>
		</Dialog>
	);
};
