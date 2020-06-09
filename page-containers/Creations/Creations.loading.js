import Grid from '@material-ui/core/Grid';
import CreationCard from 'views/CreationCard';

export default () => {
	return (
		<>
			<Grid item xs={12}>
				<CreationCard skeleton />
			</Grid>
			<Grid item xs={12}>
				<CreationCard skeleton />
			</Grid>
			<Grid item xs={12}>
				<CreationCard skeleton />
			</Grid>
			<Grid item xs={12}>
				<CreationCard skeleton />
			</Grid>
			<Grid item xs={12}>
				<CreationCard skeleton />
			</Grid>
			<Grid item xs={12}>
				<CreationCard skeleton />
			</Grid>
		</>
	);
};
