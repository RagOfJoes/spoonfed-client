import Time from './Time';
import Tabs from './Tabs';
import Import from './Import';
import FieldArray from './FieldArray';
import Grid from '@material-ui/core/Grid';
import profaneScan from 'lib/profaneScan';
import { init, schema } from './constants';
import { Formik, Form, Field } from 'formik';
import { handleImageUpload } from './helpers';
import Button from '@material-ui/core/Button';
import TextFormField from 'views/TextFormField';
import { useMutation } from '@apollo/react-hooks';
import { formatRecipes } from 'lib/formatFileName';
import LargeDropzone from 'Components/LargeDropzone';
import RecipeFormLoading from './RecipeForm.loading';
import Typography from '@material-ui/core/Typography';
import { useRecipeFormStyle } from './RecipeForm.style';
import React, { memo, useState, useEffect } from 'react';
import { SignS3MultipleMutation } from 'graphql/Mutations';
import { Box } from '@material-ui/core';

/**
 * TODO: Make initialValue for Editing Event's date to be restricted only to Creation Date of the Event
 */
export default memo(({ Header, mutation, onError, onSubmitted, onSubmitting, initialValues = init }) => {
	const classes = useRecipeFormStyle();

	const [tab, setTab] = useState(0);
	const [progress, setProgress] = useState([]);
	const [uploadSize, setUploadSize] = useState(0);
	const [isMounted, toggleMounted] = useState(false);
	const [isImporting, toggleImporting] = useState(false);
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

				try {
					if (typeof onSubmitting === 'function') await onSubmitting();

					// Clean Images
					const cleanedImages = await handleImageUpload(
						files,
						setFiles,
						signS3Mutation,
						isMounted,
						values,
						initialValues
					);

					if (values.time?.__typename) delete values.time.__typename;

					await mutation({
						variables: {
							recipe: {
								...values,
								images: cleanedImages,
							},
						},
					});

					actions.resetForm();
					setTab(0);
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
			{({ values, errors, touched }) => (
				<Grid container wrap="nowrap" spacing={3} direction="column" className={classes.content}>
					{Header}

					<Grid item xs={12}>
						<Import
							setTab={setTab}
							setFiles={setFiles}
							setUploadSize={setUploadSize}
							isImporting={isImporting}
							toggleImporting={toggleImporting}
						/>
					</Grid>

					<Grid item container spacing={1} wrap="nowrap" component={Form} direction="column">
						{isImporting && <RecipeFormLoading />}
						{!isImporting && (
							<>
								<Grid item>
									<Typography variant="h6">Start from scratch</Typography>
								</Grid>

								{errors && Object.keys(errors).length > 0 && (
									<Grid item>
										<Box padding={1.5} bgcolor="error.main" borderRadius={4}>
											<Typography variant="subtitle1">
												Please check these inputs for specific errors:
											</Typography>
											{Object.keys(errors).map((e) => {
												if (touched[e])
													return (
														<Typography
															key={e}
															variant="subtitle2"
															style={{ textTransform: 'capitalize' }}
														>
															- {e}
														</Typography>
													);

												return null;
											})}
										</Box>
									</Grid>
								)}

								<Grid item xs={12}>
									<Tabs tab={tab} setTab={setTab} />
								</Grid>

								{tab === 0 && (
									<>
										<Grid item>
											<Field
												name="name"
												label="Name"
												margin="dense"
												variant="filled"
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
												label="Servings"
												name="servings"
												margin="dense"
												variant="filled"
												component={TextFormField}
											/>
										</Grid>

										<Grid item className={classes.dropzone}>
											<LargeDropzone
												maxFiles={3}
												files={files}
												multiple={true}
												progress={progress}
												maxSize={1000000 * 5}
												format={formatRecipes}
												uploadSize={uploadSize}
												setUploadSize={setUploadSize}
												setFiles={(images) => {
													setProgress([]);
													setFiles(images);
												}}
											/>
										</Grid>

										<Time time={values.time} />
									</>
								)}

								{tab === 1 && <FieldArray name="ingredients" array={values.ingredients || []} />}

								{tab === 2 && (
									<FieldArray
										name="instructions"
										array={values.instructions || []}
										fieldProps={{
											multiline: true,
										}}
										InputProps={{
											classes: {
												input: classes.multiline,
											},
										}}
									/>
								)}

								<Grid item xs={12}>
									<Button size="large" color="primary" type="submit" variant="contained">
										Submit
									</Button>
								</Grid>
							</>
						)}
					</Grid>
				</Grid>
			)}
		</Formik>
	);
});
