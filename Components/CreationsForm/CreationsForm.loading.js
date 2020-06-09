import React, { memo } from 'react';
import Grid from '@material-ui/core/Grid';
import Skeleton from '@material-ui/lab/Skeleton';

/**
 * TODO: Make initialValue for Editing Event's date to be restricted only to Creation Date of the Event
 */
export default memo(({}) => {
	return (
		<>
			<Grid item>
				<Skeleton width={220} height={48} variant="rect" />
			</Grid>

			<Grid item>
				<Skeleton width="100%" height={200} variant="rect" />
			</Grid>

			<Grid item>
				<Skeleton width="100%" height={52} variant="rect" />
			</Grid>

			<Grid item>
				<Skeleton width="100%" height={52} variant="rect" />
			</Grid>

			<Grid item>
				<Skeleton width="100%" height={52} variant="rect" />
			</Grid>
		</>
	);
});
