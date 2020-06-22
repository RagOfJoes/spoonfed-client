import { memo } from 'react';
import Link from 'next/link';
import LazyLoad from 'react-lazyload';
import Box from '@material-ui/core/Box';
import { fade } from '@material-ui/core/styles';
import Skeleton from '@material-ui/lab/Skeleton';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { useCardMedia } from 'lib/hooks/useCardMedia';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(
	({ palette }) => ({
		main: {
			cursor: 'pointer',
			overflow: 'hidden',
			borderTopLeftRadius: 4,
			borderTopRightRadius: 4,
			zIndex: 1,
			'&:after': {
				bottom: 0,
				width: '100%',
				content: '""',
				height: '100%',
				display: 'block',
				position: 'absolute',
				background: `linear-gradient(to top, ${palette.background.default}, ${fade(palette.background.default, 0)})`,
			},
		},
		content: {
			bottom: 0,
			zIndex: 1,
			width: '100%',
			position: 'absolute',
			padding: '1.5rem 1.5rem 1rem',
		},
		title: {
			fontWeight: 800,
			fontSize: '2rem',
			color: palette.text.primary,

			'user-select': 'none',
			'-ms-user-select': 'none' /* Internet Explorer/Edge */,
			'-moz-user-select': 'none' /* Old versions of Firefox */,
			'-khtml-user-select': 'none' /* Konqueror HTML */,
			'-webkit-user-select': 'none' /* Safari */,
			'-webkit-touch-callout': 'none' /* iOS Safari */,
		},
	}),
	{ name: 'CreationCardMedia' }
);

export default memo(({ as, href, slug, title, image: { name, url } }) => {
	const styles = useStyles();
	const mediaStyles = useCardMedia({ bgPosition: 'unset' });
	return (
		<Link shallow scroll={false} href={href || `/?creationSlug=${slug}`} as={as || `/c/${slug}`}>
			<Box className={styles.main} minHeight={300} position={'relative'}>
				<LazyLoad height={300} debounce placeholder={<Skeleton variant="rect" width="100%" height={300} />}>
					<CardMedia alt={title} image={url} classes={mediaStyles} />
				</LazyLoad>
				<div className={styles.content}>
					<Typography variant="h2" className={styles.title}>
						{title}
					</Typography>
				</div>
			</Box>
		</Link>
	);
});
