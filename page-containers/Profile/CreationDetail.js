import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import { isAuthError } from 'graphql/handlers';
import makeStyles from '@material-ui/core/styles/makeStyles';
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
	const router = useRouter();
	const classes = useStyles();
	const [hasError, toggleError] = useState(false);

	useEffect(() => () => toggleError(false), []);
	const onClose = () =>
		!hasError &&
		router.push(
			{ pathname: '/u/[username]/t/[tab]', query: { username: router.query.username, tab: 'creations' } },
			`/u/${router.query.username}/t/creations`,
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

export default CreationDetailComponent;
