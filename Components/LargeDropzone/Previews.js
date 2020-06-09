import React, { memo } from 'react';
import Grid from '@material-ui/core/Grid';
import { getPreview } from 'lib/getPreview';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles(
	(theme) => ({
		container: ({ files }) => ({
			marginTop: files.length > 0 ? theme.spacing(2) : 0,
		}),
		outer: {
			display: 'flex',
			alignItems: 'center',
			position: 'relative',
			flexDirection: 'column',
			marginRight: theme.spacing(2),
		},
		thumb: {
			height: 100,
			overflow: 'hidden',
			display: 'inline-flex',
			boxSizing: 'border-box',
			borderRadius: theme.shape.borderRadius,

			'&:hover': {
				cursor: 'pointer',
			},
		},
		inner: {
			minWidth: 0,
			width: '100%',
			height: '100%',
			display: 'flex',
			overflow: 'hidden',
			justifyContent: 'center',
		},
		img: {
			height: '100%',
			display: 'block',
		},
		progress: {
			top: 0,
			width: '100%',
			position: 'absolute',
			borderTopLeftRadius: theme.shape.borderRadius,
			borderTopRightRadius: theme.shape.borderRadius,
		},
	}),
	{ name: 'LargeDropzonePreview' }
);

export default memo(({ disabled, files, setFiles, uploadSize, setUploadSize }) => {
	const classes = useStyles({ files });

	return (
		<Grid xs={12} item container className={classes.container}>
			{files.length > 0 &&
				files.map((file, index) => {
					return (
						<Grid item key={`${file.name}-${index}`} className={classes.outer}>
							{file.progress && (
								<LinearProgress
									color="primary"
									variant="determinate"
									value={file.progress}
									className={classes.progress}
								/>
							)}
							<div
								className={classes.thumb}
								onClick={() => {
									if (disabled) return;

									const filtered = files.filter((v, i) => {
										if (i === index && v.name === file.name) {
											setUploadSize(uploadSize - v.size);
											if (!v.preview) return false;
											URL.revokeObjectURL(v.preview);
											return false;
										}
										return true;
									});
									return setFiles(filtered);
								}}
							>
								<div className={classes.inner}>
									<img src={file.preview || getPreview(file).preview} className={classes.img} />
								</div>
							</div>

							<Grid
								item
								style={{
									maxWidth: 200,
									overflow: 'hidden',
									overflow: 'hidden',
									whiteSpace: 'nowrap',
									textOverflow: 'ellipsis',
								}}
							>
								<Typography variant="overline">{file.name}</Typography>
							</Grid>
						</Grid>
					);
				})}
		</Grid>
	);
});
