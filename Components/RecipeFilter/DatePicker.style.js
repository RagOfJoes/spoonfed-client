import makeStyles from '@material-ui/core/styles/makeStyles';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
		},
	},
};

const dateTimePickerStyle = (theme) => ({
	formControl: {
		width: '100%',
	},
	label: {
		color: theme.palette.text.secondary,
	},
	endDateContainer: {
		width: '100%',
		display: ({ condition }) => (condition === 'between' ? 'flex' : 'none'),
	},
});

const useDateTimePickerStyle = makeStyles(dateTimePickerStyle, {name: 'timelineFilterDateTimePicker'});

export { MenuProps, dateTimePickerStyle, useDateTimePickerStyle };

export default { MenuProps, dateTimePickerStyle, useDateTimePickerStyle };
