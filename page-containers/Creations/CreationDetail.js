import { useUser } from 'lib/user';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { useState, useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import { UNAUTHENTICATED_MSG } from 'constants/index';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { handleAuthError, isAuthError } from 'graphql/handlers';
import CreationDetail from 'Components/CreationDetail/CreationDetail';

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

const CreationDetailComponent = () => {
	const { user } = useUser();
	const router = useRouter();
	const classes = useStyles();
	const { enqueueSnackbar } = useSnackbar();
	const [hasError, toggleError] = useState(false);

	useEffect(() => () => toggleError(false), []);

	return (
		<Dialog
			maxWidth="md"
			scroll="body"
			disableBackdropClick={hasError}
			disableEscapeKeyDown={hasError}
			open={!!router?.query?.creationSlug}
			onClose={() => !hasError && router.push('/creations', '/creations', { scroll: false, shallow: true })}
			onBackdropClick={() => !hasError && router.push('/creations', '/creations', { scroll: false, shallow: true })}
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

export default CreationDetailComponent;
