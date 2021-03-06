import { schema } from './constants';
import Grid from '@material-ui/core/Grid';
import profaneScan from 'lib/profaneScan';
import RecipeFinder from './RecipeFinder';
import { Formik, Form, Field } from 'formik';
import { handleImageUpload } from './helpers';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';
import TextFormField from 'views/TextFormField';
import { useMutation } from '@apollo/react-hooks';
import LargeDropzone from 'Components/LargeDropzone';
import { formatCreations } from 'lib/formatFileName';
import Typography from '@material-ui/core/Typography';
import React, { memo, useState, useEffect } from 'react';
import { SignS3MultipleMutation } from 'graphql/Mutations';

const init = {
	title: '',
	images: [],
	recipe: '',
	description: '',
};

const useStyles = makeStyles(
	(theme) => ({
		content: {
			padding: theme.spacing(3, 4),

			[theme.breakpoints.down('xs')]: {
				padding: theme.spacing(2),
			},
		},
		helperText: {
			color: theme.palette.grey[500],
		},
	}),
	{ name: 'CreationsForm' }
);

/**
 * TODO: Make initialValue for Editing Event's date to be restricted only to Creation Date of the Event
 */
export default memo(({ edit = false, Header, mutation, onError, onSubmitted, onSubmitting, initialValues = init }) => {
	const classes = useStyles();

	const [progress, setProgress] = useState([]);
	const [uploadSize, setUploadSize] = useState(0);
	const [isMounted, toggleMounted] = useState(false);
	const [recipeDialogOpen, toggleRecipeDialog] = useState(false);
	const [files, setFiles] = useState(() => (initialValues?.images?.length > 0 ? initialValues.images : []));

	const [signS3Mutation] = useMutation(SignS3MultipleMutation);
	useEffect(() => {
		toggleMounted(true);

		return () => {
			toggleMounted(false);
		};
	}, []);
	return (
		<Formik
			validationSchema={schema}
			initialValues={initialValues}
			onSubmit={async (values, actions) => {
				if (!isMounted) return;
				actions.setSubmitting(true);

				try {
					if (typeof onSubmitting === 'function') await onSubmitting();

					if (files.length === 0) return actions.setFieldError('images', 'Must provide atleast one image!');

					// Clean Images
					const cleanedImages = await handleImageUpload(
						files,
						setFiles,
						signS3Mutation,
						isMounted,
						values,
						initialValues
					);

					await mutation({
						variables: {
							creation: {
								...values,
								images: cleanedImages,
							},
						},
					});

					actions.resetForm();
					setFiles([]);
					setProgress([]);
					setUploadSize(0);
					if (typeof onSubmitted === 'function') onSubmitted();
				} catch (e) {
					typeof onError === 'function' && (await onError(e));
				}
				actions.setSubmitting(false);
			}}
		>
			{({ setFieldValue, setFieldError, isSubmitting }) => (
				<Grid container wrap="nowrap" spacing={3} direction="column" className={classes.content}>
					{Header}

					<Grid item container spacing={1} wrap="nowrap" component={Form} direction="column">
						<Grid item xs={12}>
							<LargeDropzone
								maxFiles={3}
								files={files}
								multiple={true}
								progress={progress}
								maxSize={1000000 * 5}
								uploadSize={uploadSize}
								format={formatCreations}
								setUploadSize={setUploadSize}
								setFiles={(images) => {
									setProgress([]);
									setFiles(images);
								}}
							/>
							<Typography variant="caption" className={classes.helperText}>
								* Requires at least one image
							</Typography>
						</Grid>
						<Grid item>
							<Field
								label="Title"
								name="title"
								margin="dense"
								variant="filled"
								autoComplete="off"
								component={TextFormField}
								validate={(value) => {
									if (profaneScan.profane(value)) {
										return 'Contains invalid words';
									}

									return undefined;
								}}
							/>
						</Grid>

						<Grid item>
							<Field
								disabled
								name="recipe"
								label="Recipe"
								margin="dense"
								variant="filled"
								component={TextFormField}
							/>
						</Grid>

						<Grid item>
							<Button color="primary" disabled={edit} onClick={() => toggleRecipeDialog(true)}>
								Find Recipe
							</Button>
						</Grid>

						<Grid item xs={12}>
							<Field
								multiline
								margin="dense"
								variant="filled"
								name="description"
								label="Description"
								component={TextFormField}
							/>
						</Grid>

						<Grid item xs={12}>
							<Button size="large" color="primary" type="submit" variant="contained" disabled={isSubmitting}>
								Submit
							</Button>
						</Grid>
					</Grid>

					{!edit && (
						<RecipeFinder
							open={recipeDialogOpen}
							toggleOpen={toggleRecipeDialog}
							onRecipeSelect={(r) => {
								try {
									setFieldError('recipe', '');

									const { slug } = r;
									setFieldValue('recipe', new URL(`/r/${slug}`, window.location.href));
									toggleRecipeDialog(false);
									return;
								} catch (e) {
									console.log(e);
								}

								setFieldError('recipe', 'Invalid Recipe Provided');
								toggleRecipeDialog(false);
							}}
						/>
					)}
				</Grid>
			)}
		</Formik>
	);
});
