/**
 *
 * @param {Object} imgRef ref to the React-Crop Element
 * @param {Object} crop
 * @param {Function} onBlob allows the extraction of the canvas' blob
 */
export const makeClientCrop = async (imgRef, crop, onBlob) => {
	if (imgRef.current && crop.width && crop.height) {
		createCropPreview(imgRef.current, crop, onBlob);
	}
};

const createCropPreview = async (image, crop, onBlob) => {
	const canvas = document.createElement('canvas');
	const scaleX = image.naturalWidth / image.width;
	const scaleY = image.naturalHeight / image.height;

	canvas.width = crop.width;
	canvas.height = crop.height;
	const ctx = canvas.getContext('2d');

	ctx.drawImage(
		image,
		crop.x * scaleX,
		crop.y * scaleY,
		crop.width * scaleX,
		crop.height * scaleY,
		0,
		0,
		crop.width,
		crop.height
	);

	return new Promise((resolve, reject) => {
		canvas.toBlob((blob) => {
			if (!blob) {
				reject(new Error('Canvas is empty'));
				return;
			}

			typeof onBlob === 'function' && onBlob(blob);
		}, 'image/jpeg');
	});
};
