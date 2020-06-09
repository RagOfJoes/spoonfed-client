import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import { useFormikContext } from 'formik';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import { useMutation } from '@apollo/react-hooks';
import { handleAuthError } from 'graphql/handlers';
import InputBase from '@material-ui/core/InputBase';
import { formatFileName } from 'lib/formatFileName';
import { makeStyles } from '@material-ui/core/styles';
import { ParseRecipeURLMutation } from 'graphql/Mutations';
import { Button, useTheme, useMediaQuery, Typography, Grid } from '@material-ui/core';

const useStyles = makeStyles(
	(theme) => ({
		root: {
			display: 'flex',
			alignItems: 'center',
			padding: theme.spacing(1),
			backgroundColor: theme.palette.type === 'light' ? 'rgba(0, 0, 0, .09)' : 'rgba(255, 255, 255, .09)',
		},
		input: {
			flex: 1,
			height: '1.1876em',
			marginLeft: theme.spacing(1),
		},
		divider: {
			height: 28,
			margin: theme.spacing(0.5),
		},
		button: {
			padding: theme.spacing(1, 2),

			[theme.breakpoints.down('xs')]: {
				padding: theme.spacing(1),
			},
		},
		errorContainer: {
			padding: theme.spacing(1),
		},
		error: {
			fontWeight: theme.typography.fontWeightMedium,
		},
	}),
	{ name: 'RecipeFormImport' }
);

export default ({ setTab, setFiles, setUploadSize, isImporting, toggleImporting }) => {
	const theme = useTheme();
	const classes = useStyles();
	const [error, setError] = useState();
	const { enqueueSnackbar } = useSnackbar();
	const isSmallDevice = useMediaQuery(theme.breakpoints.down('xs'));

	const [parsedRecipe] = useMutation(ParseRecipeURLMutation, {
		onError: async (e) => await handleAuthError(e, null, enqueueSnackbar, { disableRedirect: true }),
	});
	const { setFieldValue, initialValues } = useFormikContext();
	const [url, setUrl] = useState(() => (initialValues?.importUrl ? initialValues.importUrl : ''));

	return (
		<>
			<Paper
				elevation={2}
				component="form"
				className={classes.root}
				onSubmit={async (e) => {
					e.preventDefault();
					if (isImporting) return;

					setError('');
					toggleImporting(true);

					if (!url) return setError('Must provide a URL');

					try {
						const { data, errors } = await parsedRecipe({ variables: { url } });

						if (errors && errors.length > 0) {
							setError('Something went wrong when importing. Please try again later.');
							toggleImporting(false);
							return;
						}
						const { name, image, ingredients, instructions, servings, time } = data.parseRecipeUrl;

						const file = { name: formatFileName(name), url: image };
						setFieldValue('name', name);
						setFieldValue('time', time);
						setFieldValue('images', [file]);
						setFieldValue('importUrl', url);
						setFieldValue('ingredients', ingredients);
						setFieldValue('instructions', instructions);
						setFieldValue('servings', servings);

						setTab(0);
						setUploadSize(0);
						setFiles([file]);
						toggleImporting(false);
						return;
					} catch (e) {}
					toggleImporting(false);
					setError('Something went wrong when importing. Please try again later.');
				}}
			>
				<InputBase
					value={url}
					className={classes.input}
					placeholder="Import a Recipe"
					onChange={(e) => setUrl(e.target.value)}
				/>
				<Divider light className={classes.divider} orientation="vertical" />
				<Button type="submit" color="primary" className={classes.button} size={isSmallDevice ? 'small' : 'medium'}>
					Import
				</Button>
			</Paper>
			{error && error.length > 0 && (
				<Grid item className={classes.errorContainer}>
					<Typography color="error" variant="body2" className={classes.error}>
						{error}
					</Typography>
				</Grid>
			)}
		</>
	);
};
