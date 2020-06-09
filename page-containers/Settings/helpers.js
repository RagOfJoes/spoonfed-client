/**
 *
 * @param {String} filename
 * @param {Object|string} avatar
 * @param {Function} signS3
 * @returns {String}
 */
export const handleUpload = async (filename, avatar, signS3) => {
	// If Initial Avatar wasn't transformed
	// by AvatarEditor
	if (typeof avatar === 'string') return avatar;

	// If Avatar was deleted or
	// was reseted by User
	if (!avatar) return '';

	const upload = await signS3({
		variables: { file: { filename, filetype: avatar.type } },
	});

	const { fileUrl, signedUrl } = upload.data.signS3Single;

	const xhr = new XMLHttpRequest();
	xhr.open('PUT', signedUrl);
	xhr.setRequestHeader('Content-Type', avatar.type);
	xhr.send(avatar);

	return fileUrl;
};

/**
 *
 * @param {Object|string} avatar
 * @returns {string|null}
 */
export const getAvatarSrc = (avatar) => {
	if (typeof avatar === 'object') return window.URL.createObjectURL(avatar);
	else if (typeof avatar === 'string') return avatar;

	return null;
};
