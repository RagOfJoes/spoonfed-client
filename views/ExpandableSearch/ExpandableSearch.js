import React from 'react';
import Input from '@material-ui/core/Input';
import SearchIcon from '@material-ui/icons/Search';
import { fade, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(
	(theme) => {
		const bgColor = theme.palette.type === 'light' ? theme.palette.grey[700] : theme.palette.common.white;
		return {
			root: {
				height: '100%',
				position: 'relative',
				backgroundColor: fade(bgColor, 0.15),
				borderRadius: theme.shape.borderRadius,
				fontFamily: theme.typography.fontFamily,
				transition: theme.transitions.create('background-color'),
				'&:hover': {
					backgroundColor: fade(bgColor, 0.25),
				},
				'& $inputInput': {
					width: 120,
					transition: theme.transitions.create('width'),
					'&:focus': {
						width: 150,
					},
				},
				[theme.breakpoints.down('xs')]: {
					'& $inputInput': {
						width: 90,
						transition: theme.transitions.create('width'),
						'&:focus': {
							width: '120px !important',
						},
					},
				},
			},
			search: {
				height: '100%',
				display: 'flex',
				position: 'absolute',
				alignItems: 'center',
				pointerEvents: 'none',
				width: theme.spacing(6),
				justifyContent: 'center',

				[theme.breakpoints.down('xs')]: {
					width: theme.spacing(4),
				},
			},
			inputRoot: {
				color: 'inherit',
			},
			inputInput: {
				padding: theme.spacing(1.5, 1, 1.5, 6),

				[theme.breakpoints.down('xs')]: {
					padding: theme.spacing(1.5, 1, 1.5, 4),
				},
			},
		};
	},
	{ name: 'ExpandableSearch' }
);

const ExpandableSearch = ({ value, onChange }) => {
	const classes = useStyles();
	const inputRef = React.useRef(null);

	return (
		<div className={classes.root}>
			<div className={classes.search}>
				<SearchIcon />
			</div>
			<Input
				type="text"
				value={value}
				disableUnderline
				inputRef={inputRef}
				placeholder="Search..."
				onChange={typeof onChange === 'function' && onChange}
				classes={{
					root: classes.inputRoot,
					input: classes.inputInput,
				}}
			/>
		</div>
	);
};

export default ExpandableSearch;
