import ReactCrop from 'react-image-crop';
import Grid from '@material-ui/core/Grid';
import { makeClientCrop } from './helpers';
import { useDropzone } from 'react-dropzone';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import makeStyles from '@material-ui/core/styles/makeStyles';
import React, { memo, useState, useCallback, useRef } from 'react';

const useStyles = makeStyles(({ palette }) => ({
	avatarContainer: {
		height: '100%',
		backgroundColor: palette.background.default,
	},
}));

export default memo(({ image, onSave, onError }) => {
	const imgRef = useRef(null);
	const classes = useStyles();
	const [upImg, setUpImg] = useState(image);
	const [resizedImage, setResizedImage] = useState();
	const [openEditor, toggleOpenEditor] = useState(false);
	const [crop, setCrop] = useState({ aspect: 1, width: 35, unit: '%' });

	const onLoad = useCallback((img) => {
		imgRef.current = img;
	}, []);

	const { open, getRootProps, getInputProps } = useDropzone({
		noClick: true,
		maxSize: 800000,
		noKeyboard: true,
		accept: ['image/png', 'image/jpeg'],
		onDropRejected: (files) => {
			if (files.length > 0) {
				try {
					onError(files[0].errors[0].message);
				} catch {}
			}
		},
		onDropAccepted: (files) => {
			const reader = new FileReader();
			reader.addEventListener('load', () => setUpImg(reader.result));
			reader.readAsDataURL(files[0]);
			toggleOpenEditor(true);
		},
	});
	return (
		<>
			<Grid item container spacing={1} direction="column" justify="space-between" {...getRootProps()}>
				<input {...getInputProps()} />
				<Grid item>
					<Button color="primary" variant="contained" onClick={open}>
						Upload now
					</Button>
				</Grid>

				<Grid item>
					<Typography variant="caption">JPG or PNG. Max size of 800K</Typography>
				</Grid>
			</Grid>
			<Dialog
				fullWidth
				scroll="body"
				maxWidth="sm"
				open={openEditor}
				disableEscapeKeyDown
				onClose={() => toggleOpenEditor(false)}
			>
				<DialogTitle>Edit</DialogTitle>

				<DialogContent>
					<Grid container justify="center" className={classes.avatarContainer}>
						<ReactCrop
							crop={crop}
							src={upImg}
							circularCrop
							maxHeight={300}
							onImageLoaded={onLoad}
							imageAlt="user_avatar"
							onChange={(c) => setCrop(c)}
							imageStyle={{ minHeight: 300 }}
							onComplete={() => makeClientCrop(imgRef, crop, (blob) => setResizedImage(blob))}
						/>
					</Grid>
				</DialogContent>

				<DialogActions>
					<Button onClick={() => toggleOpenEditor(false)}>Cancel</Button>
					<Button
						color="primary"
						variant="contained"
						onClick={() => {
							onSave(resizedImage);
							toggleOpenEditor(false);
						}}
					>
						Save
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
});
