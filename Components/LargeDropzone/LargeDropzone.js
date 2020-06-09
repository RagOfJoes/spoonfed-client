import Previews from './Previews';
import Box from '@material-ui/core/Box';
import useDropzone from './useDropzone';
import Grid from '@material-ui/core/Grid';
import { getPreview } from 'lib/getPreview';
import Typography from '@material-ui/core/Typography';
import React, { memo, useEffect, useState } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(
	(theme) => ({
		textField: {
			cursor: 'pointer',
		},
		box: {
			borderWidth: 2,
			borderStyle: 'dashed',
			borderColor: theme.palette.divider,
		},
		labelContainer: {
			height: '100%',
			position: 'absolute',
		},
		label: {
			fontWeight: theme.typography.fontWeightMedium,
		},
		sublabel: {
			color: theme.palette.grey[500],
			fontWeight: theme.typography.fontWeightMedium,
		},
		mark: {
			backgroundColor: 'transparent',
			color: theme.palette.info.light,
		},
		helper: {
			color: theme.palette.grey[400],
		},
		error: {
			marginTop: theme.spacing(1),
		},
	}),
	{ name: 'LargeDropzone' }
);

const acceptedFiles = ['image/png', 'image/jpeg'];
export default memo(({ format, disabled, maxSize, multiple, maxFiles, files, setFiles, uploadSize, setUploadSize }) => {
	const classes = useStyles();
	const [error, setError] = useState('');
	const { getRootProps, getInputProps } = useDropzone(
		{
			maxSize,
			multiple,
			disabled,
			accept: acceptedFiles,
		},
		format,
		maxFiles,
		files,
		setError,
		setFiles,
		setUploadSize
	);

	const { ref, ...rootProps } = getRootProps();

	useEffect(() => {
		// On mount create thumbnail previews for images
		if (files && files.length > 0) {
			setFiles(files.map((file) => getPreview(file)));
		}

		return () => {
			files.forEach((file) => {
				if (file.type !== 'image/png' && file.type !== 'image/jpeg') return;

				// Revoke Object URL to prevent memory leaks
				URL.revokeObjectURL(file.preview);
			});
		};
	}, []);

	return (
		<>
			<Grid xs={12} item container innerRef={ref}>
				<input {...getInputProps()} />
				<Grid xs={12} item className={classes.textField}>
					<Box
						{...rootProps}
						height={200}
						borderRadius={4}
						position="relative"
						className={classes.box}
						bgcolor="background.default"
					>
						<Grid
							container
							justify="center"
							direction="column"
							alignItems="center"
							className={classes.labelContainer}
						>
							<Grid item>
								<Typography variant="body1" className={classes.label}>
									Drop your images here or <mark className={classes.mark}>Browse</mark>
								</Typography>
							</Grid>

							<Grid item>
								<Typography variant="caption" className={classes.sublabel}>
									Supported types: .jpg, .png
								</Typography>
							</Grid>
						</Grid>
					</Box>

					{error && (
						<Grid item className={classes.error}>
							<Typography color="error" variant="subtitle2">
								{error}
							</Typography>
						</Grid>
					)}
				</Grid>
			</Grid>

			<Previews
				files={files}
				disabled={disabled}
				setFiles={setFiles}
				uploadSize={uploadSize}
				setUploadSize={setUploadSize}
			/>
		</>
	);
});
